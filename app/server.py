"""Backend for the editable case-study site.

Run:   python3 -I app/server.py            (then open http://127.0.0.1:8765)
       python3 -I app/server.py --port 8080

Standard library only (plus pandoc for Markdown). Binds to 127.0.0.1, so it is
reachable only from this computer.
"""
import argparse
import hashlib
import html
import json
import mimetypes
import os
import re
import shutil
import sys
import threading
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote, urlparse

APP = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(APP)
STATIC = os.path.join(APP, "static")
DATA = os.path.join(APP, "data")
HISTORY = os.path.join(DATA, "history")
CONTENT = os.path.join(DATA, "content.json")
SEED = os.path.join(DATA, "seed.json")
UPLOADS = os.path.join(ROOT, "uploads")
KEEP_HISTORY = 100
MAX_UPLOAD = 300 * 1024 * 1024
# Folders that hold the app itself, not library material.
NOT_LIBRARY = {"app", "site", "tools", "docs", "backups", ".git"}
LIBRARY_EXTS = {".pdf", ".md", ".txt", ".html", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
                ".docx", ".pptx", ".xlsx", ".csv", ".mp4", ".mp3", ".zip", ".epub"}

sys.path.insert(0, os.path.join(ROOT, "tools"))
import build_site  # noqa: E402  (shared Markdown → HTML conversion)

_doc_cache = {}


def safe_path(rel):
    """Resolve a project-relative path, refusing anything outside the project."""
    full = os.path.realpath(os.path.join(ROOT, rel.lstrip("/")))
    if full != ROOT and not full.startswith(ROOT + os.sep):
        return None
    return full


def read_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def write_json_atomic(path, obj):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=1, ensure_ascii=False)
    os.replace(tmp, path)


def snapshot(label="save"):
    """Copy the current content.json into history before it is replaced."""
    if not os.path.exists(CONTENT):
        return
    os.makedirs(HISTORY, exist_ok=True)
    stamp = time.strftime("%Y%m%d-%H%M%S")
    name = f"{stamp}-{label}.json"
    n = 1
    while os.path.exists(os.path.join(HISTORY, name)):
        n += 1
        name = f"{stamp}-{label}-{n}.json"
    shutil.copy2(CONTENT, os.path.join(HISTORY, name))
    old = sorted(os.listdir(HISTORY))
    for stale in old[:-KEEP_HISTORY]:
        os.remove(os.path.join(HISTORY, stale))


_write_lock = threading.Lock()


def content_version():
    """Short hash of content.json; a save must name the version it was based on."""
    src = CONTENT if os.path.exists(CONTENT) else SEED
    with open(src, "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()[:12]


def valid_content(obj):
    return (isinstance(obj, dict) and isinstance(obj.get("settings"), dict)
            and isinstance(obj.get("blocks"), list) and isinstance(obj.get("library"), list))


def render_doc(rel):
    full = safe_path(rel)
    if not full or not os.path.isfile(full):
        return None
    ext = os.path.splitext(full)[1].lower()
    mtime = os.path.getmtime(full)
    cached = _doc_cache.get(full)
    if cached and cached[0] == mtime:
        return cached[1]
    text = open(full, encoding="utf-8", errors="replace").read() if ext in (".md", ".txt") else ""
    if ext == ".md":
        title, source = build_site.first_heading_and_source(text)
        body = build_site.markdown_body(full, source)
        doc = {"html": body, "title": title, "source": source, "math": 'class="math' in body}
    elif ext == ".txt":
        doc = {"html": f'<pre class="plain">{html.escape(text)}</pre>', "title": None, "source": None, "math": False}
    else:
        return None
    _doc_cache[full] = (mtime, doc)
    return doc


def scan_unlisted(content):
    listed = {i.get("path") for s in content.get("library", []) for i in s.get("items", [])}
    found = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        rel_dir = os.path.relpath(dirpath, ROOT)
        top = rel_dir.split(os.sep)[0]
        if top in NOT_LIBRARY or top.startswith("."):
            dirnames[:] = []
            continue
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in LIBRARY_EXTS or rel_dir == "." and fn in ("index.html", "README.md"):
                continue
            rel = os.path.normpath(os.path.join(rel_dir, fn)).replace(os.sep, "/")
            if rel not in listed:
                found.append({"path": rel, "size": os.path.getsize(os.path.join(dirpath, fn)), "kind": ext[1:]})
    return sorted(found, key=lambda f: f["path"])


def safe_filename(name):
    name = os.path.basename(name or "").strip().replace(" ", "_")
    name = re.sub(r"[^A-Za-z0-9._()-]", "", name)
    return name.lstrip(".") or f"upload-{int(time.time())}"


class Handler(BaseHTTPRequestHandler):
    server_version = "CaseStudySite/1.0"

    def log_message(self, fmt, *args):
        if "--quiet" not in sys.argv:
            sys.stderr.write("%s %s\n" % (self.command, fmt % args))

    # ---- helpers -------------------------------------------------------
    def host_ok(self):
        host = (self.headers.get("Host") or "").split(":")[0]
        return host in ("127.0.0.1", "localhost")

    def write_ok(self):
        """Writes need our custom header: browsers won't send it cross-site
        without a CORS preflight, which this server never approves."""
        if self.headers.get("X-Case-Study") != "1":
            return False
        origin = self.headers.get("Origin")
        if origin:
            o = urlparse(origin)
            if o.hostname not in ("127.0.0.1", "localhost"):
                return False
        return True

    def send_json(self, obj, status=200, headers=None):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        for k, v in (headers or {}).items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(body)

    def error(self, status, msg):
        self.send_json({"error": msg}, status)

    def read_body(self, limit):
        length = int(self.headers.get("Content-Length") or 0)
        if length > limit:
            raise ValueError("too large")
        return self.rfile.read(length)

    def send_file(self, full, cache=False):
        ctype = mimetypes.guess_type(full)[0] or "application/octet-stream"
        if ctype.startswith("text/") or ctype in ("application/javascript", "application/json"):
            ctype += "; charset=utf-8"
        size = os.path.getsize(full)
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(size))
        self.send_header("Cache-Control", "max-age=3600" if cache else "no-cache")
        self.send_header("X-Content-Type-Options", "nosniff")
        if full.lower().endswith((".html", ".svg")) and full.startswith(ROOT) and not full.startswith(STATIC):
            # Library HTML/SVG files are shown sandboxed so they can't call the API.
            self.send_header("Content-Security-Policy", "sandbox")
        self.end_headers()
        with open(full, "rb") as f:
            shutil.copyfileobj(f, self.wfile, 1024 * 256)

    # ---- routes ----------------------------------------------------------
    def do_GET(self):
        if not self.host_ok():
            return self.error(HTTPStatus.FORBIDDEN, "bad host")
        url = urlparse(self.path)
        path = unquote(url.path)
        qs = parse_qs(url.query)

        if path in ("/", "/index.html"):
            return self.send_file(os.path.join(STATIC, "index.html"))
        if path.startswith("/static/"):
            full = os.path.realpath(os.path.join(STATIC, path[len("/static/"):]))
            if full.startswith(STATIC + os.sep) and os.path.isfile(full):
                return self.send_file(full)
            return self.error(404, "not found")
        if path.startswith("/files/"):
            full = safe_path(path[len("/files/"):])
            top = os.path.relpath(full, ROOT).split(os.sep)[0] if full else ""
            if full and os.path.isfile(full) and top not in ("app", ".git"):
                return self.send_file(full)
            return self.error(404, "not found")

        if path == "/api/content":
            with _write_lock:
                src = CONTENT if os.path.exists(CONTENT) else SEED
                return self.send_json(read_json(src), headers={"X-Version": content_version()})
        if path == "/api/seed":
            return self.send_json(read_json(SEED))
        if path == "/api/doc":
            doc = render_doc(qs.get("path", [""])[0])
            return self.send_json(doc) if doc else self.error(404, "not a readable document")
        if path == "/api/scan":
            return self.send_json({"files": scan_unlisted(read_json(CONTENT))})
        if path == "/api/history":
            os.makedirs(HISTORY, exist_ok=True)
            items = [{"name": n, "size": os.path.getsize(os.path.join(HISTORY, n))}
                     for n in sorted(os.listdir(HISTORY), reverse=True) if n.endswith(".json")]
            return self.send_json({"history": items})
        return self.error(404, "not found")

    def do_PUT(self):
        if not (self.host_ok() and self.write_ok()):
            return self.error(HTTPStatus.FORBIDDEN, "forbidden")
        if urlparse(self.path).path != "/api/content":
            return self.error(404, "not found")
        try:
            obj = json.loads(self.read_body(20 * 1024 * 1024))
        except (ValueError, json.JSONDecodeError):
            return self.error(400, "invalid JSON")
        if not valid_content(obj):
            return self.error(400, "content must have settings, blocks and library")
        with _write_lock:
            # Refuse to overwrite changes made elsewhere (another tab, an edit on disk)
            # unless the browser explicitly asks to.
            current = content_version()
            if self.headers.get("X-Force") != "1" and self.headers.get("X-Base-Version") != current:
                return self.send_json({"error": "The site was changed elsewhere since this page loaded.",
                                       "conflict": True, "version": current}, 409)
            snapshot("save")
            obj["savedAt"] = time.strftime("%Y-%m-%dT%H:%M:%S")
            write_json_atomic(CONTENT, obj)
            return self.send_json({"ok": True, "savedAt": obj["savedAt"], "version": content_version()})

    def do_POST(self):
        if not (self.host_ok() and self.write_ok()):
            return self.error(HTTPStatus.FORBIDDEN, "forbidden")
        url = urlparse(self.path)
        qs = parse_qs(url.query)

        if url.path == "/api/restore":
            try:
                name = os.path.basename(json.loads(self.read_body(4096))["name"])
            except (ValueError, KeyError, TypeError):
                return self.error(400, "need {name}")
            src = SEED if name == "seed" else os.path.join(HISTORY, name)
            if not os.path.isfile(src):
                return self.error(404, "no such revision")
            obj = read_json(src)
            with _write_lock:
                snapshot("before-restore")
                write_json_atomic(CONTENT, obj)
                return self.send_json(obj, headers={"X-Version": content_version()})

        if url.path == "/api/upload":
            name = safe_filename(qs.get("name", [""])[0])
            if os.path.splitext(name)[1].lower() not in LIBRARY_EXTS:
                return self.error(400, "file type not allowed")
            try:
                data = self.read_body(MAX_UPLOAD)
            except ValueError:
                return self.error(413, "file too large (max 300 MB)")
            os.makedirs(UPLOADS, exist_ok=True)
            base, ext = os.path.splitext(name)
            target, n = os.path.join(UPLOADS, name), 1
            while os.path.exists(target):
                n += 1
                target = os.path.join(UPLOADS, f"{base}-{n}{ext}")
            with open(target, "wb") as f:
                f.write(data)
            rel = os.path.relpath(target, ROOT).replace(os.sep, "/")
            return self.send_json({"path": rel, "size": len(data), "kind": ext[1:].lower()})

        return self.error(404, "not found")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()
    if not os.path.exists(CONTENT):
        if not os.path.exists(SEED):
            sys.exit("No content yet: run  python3 -I app/seed.py  first.")
        shutil.copy2(SEED, CONTENT)
    srv = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Case study site running at http://127.0.0.1:{args.port}  (Ctrl+C to stop)", flush=True)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
