"""Build the offline study website for the case study.

Usage (from anywhere):  python3 -I tools/build_site.py [--public]
Writes index.html at the project root and one HTML page per Markdown/text
file under site/pages/. PDFs are linked in place, not copied.

--public builds the GitHub Pages copy in docs/ instead (it replaces docs/).
It only hosts material that may be republished (see licence()); everything
else becomes a link to its original source.
"""
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
from urllib.parse import urljoin, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = ROOT  # where index.html and site/ are written; docs/ for --public
SITE = os.path.join(OUT, "site")
PAGES = os.path.join(SITE, "pages")
SKIP_DIRS = {"site", "tools", "docs", ".git"}
PUBLIC = False
LINKED = {}  # public build: local page href -> original URL, for the template's links

# Original URLs for files that have no "Source:" line.
ORIGINAL_URLS = {
    "case_study_booklet_2027.pdf": "https://faq.computersciencewiki.org/images/uploads/d_4_comsc_css_2606_1_e.pdf",
    "IB_CS_subject_brief_first_assessment_2027.pdf": "https://www.ibo.org/globalassets/new-structure/university-admission/pdfs/dp_comp_sci_subjectbrief_en.pdf",
}

LOCAL_TEXT = {
    "{{STORAGE}}": "documents are stored locally and papers link to arXiv.",
    "{{FOOTER}}": "Collected 23 November 2026 for personal study. Copyright in each document belongs to its author or publisher. Each converted page links to its original.",
}
PUBLIC_TEXT = {
    "{{STORAGE}}": "openly licensed documents are hosted here, and everything else links to its original source.",
    "{{FOOTER}}": "The practice questions, mock papers and notes are original. Hosted copies are openly licensed "
                  "(Wikipedia: CC BY-SA 4.0; Google for Developers and C2PA: CC BY 4.0) or US government works; "
                  "every other document links to its publisher. Not affiliated with or endorsed by the International Baccalaureate.",
}


def licence(reldir, stem):
    """Why a copy may be republished ("" for original work), or None if it may not."""
    if reldir == "question_bank" or stem.startswith("EU_AI_Act"):
        return ""
    if stem.startswith("Wikipedia_"):
        return "Text from Wikipedia, licensed CC BY-SA 4.0."
    if stem.startswith("Google_GAN"):
        return "From Google for Developers, licensed CC BY 4.0."
    if stem.startswith("C2PA"):
        return "From the C2PA specifications, licensed CC BY 4.0."
    if stem.startswith(("NIST_", "US_Copyright_Office")):
        return "A US government work, in the public domain."
    return None

# Section order, label and blurb for each top-level folder (or sub-folder).
SECTIONS = [
    ("official", "Official IB documents", "The booklet is the authority. Read it first, then the subject brief for how it is assessed."),
    ("question_bank", "Question bank & mock papers", "Original practice questions with hidden, harshly marked mark schemes, plus timed mock Section B papers. Start with how Section B is marked."),
    ("study_guides/revisiondojo", "Study guides: RevisionDojo", "Summaries, challenge breakdowns, practice questions, an annotated model answer and exam technique. Secondary source: check facts against the booklet."),
    ("study_guides/computersciencewiki", "Study guides: computersciencewiki", "A teacher-run IB CS wiki. Terminology list, a Generative AI overview and a command-terms table."),
    ("explainers/diffusion", "Explainers: diffusion models", "SL + HL. How denoising works, why it is slow, and how latent diffusion and guidance help."),
    ("explainers/CNN", "Explainers: CNNs", "SL + HL. The denoiser inside a diffusion model is typically a CNN (U-Net)."),
    ("explainers/GANs_HL", "Explainers: GANs", "HL. Generator vs discriminator, training instability and mode collapse."),
    ("explainers/VAE_HL", "Explainers: VAEs", "HL (broad). Latent space and how VAEs generate."),
    ("explainers/flow_based_HL", "Explainers: flow-based models", "HL (broad). Exact, reversible mapping between noise and images."),
    ("explainers/stanford_cs236", "Explainers: Stanford CS236 notes", "University course notes covering VAEs, flows and GANs in one consistent framework."),
    ("papers/01_diffusion", "Papers: diffusion", "DDPM and the work on reducing computational cost (DDIM, distillation, consistency models, latent diffusion)."),
    ("papers/02_text_to_image_conditional", "Papers: text-to-image and conditional generation", "CLIP, DALL·E, Imagen, ControlNet (sketches and segmentation maps), pix2pix and CycleGAN (image-to-image)."),
    ("papers/03_consistency_embeddings", "Papers: character consistency and embeddings", "Embedding-based approaches for keeping characters and styles consistent."),
    ("papers/04_GANs_HL", "Papers: GANs", "HL. The original GAN, stabilisation techniques and mode-collapse mitigation."),
    ("papers/05_VAE_HL", "Papers: VAEs", "HL (broad)."),
    ("papers/06_flow_based_HL", "Papers: flow-based models", "HL (broad)."),
    ("papers/07_hybrid_HL", "Papers: hybrid models", "HL challenge 4. Models that combine VAEs, GANs, flows and diffusion."),
    ("papers/08_ethics_legal", "Papers: ethics, datasets and bias", "Challenge 2. Dataset documentation, LAION, measured bias, memorisation, artist protection, watermarking."),
    ("ethics_legal", "Ethics and law", "Challenge 2. NIST, the US Copyright Office, the EU AI Act's disclosure rules, C2PA content credentials."),
    ("wikipedia_quickref", "Wikipedia quick reference", "Short definitions for booklet terminology."),
]

TAGS = {
    "official": ["SL", "HL"], "question_bank": ["SL", "HL"], "explainers/diffusion": ["SL", "HL"], "explainers/CNN": ["SL", "HL"],
    "explainers/GANs_HL": ["HL"], "explainers/VAE_HL": ["HL"], "explainers/flow_based_HL": ["HL"],
    "papers/01_diffusion": ["SL", "HL"], "papers/02_text_to_image_conditional": ["SL", "HL"],
    "papers/03_consistency_embeddings": ["SL", "HL"], "papers/04_GANs_HL": ["HL"], "papers/05_VAE_HL": ["HL"],
    "papers/06_flow_based_HL": ["HL"], "papers/07_hybrid_HL": ["HL"], "papers/08_ethics_legal": ["SL", "HL"],
    "ethics_legal": ["SL", "HL"],
}

OFFICIAL_TITLES = {
    "case_study_booklet_2027.pdf": "Case study booklet: Generative AI for image creation, a diffuse vision (PDF)",
    "case_study_booklet_2027.txt": "Case study booklet: plain text with line numbers",
    "IB_CS_subject_brief_first_assessment_2027.pdf": "IB subject brief, first assessment 2027 (PDF)",
    "IB_CS_subject_brief_first_assessment_2027.txt": "IB subject brief: plain text",
    "IB_computer_science_curriculum_updates.md": "IB computer science curriculum updates",
}

SOURCE_NAMES = {
    "LilianWeng": "Lilian Weng", "HuggingFace": "Hugging Face", "JayAlammar": "Jay Alammar",
    "YangSong": "Yang Song", "SanderDieleman": "Sander Dieleman", "Google": "Google ML course",
    "CS236": "Stanford CS236", "CS231n": "Stanford CS231n", "Wikipedia": "Wikipedia",
    "NIST": "NIST", "US": "US Copyright Office", "EU": "EU AI Act", "C2PA": "C2PA",
}


def load_arxiv_ids():
    ids = {}
    tsv = os.path.join(ROOT, "tools", "papers.tsv")
    if os.path.exists(tsv):
        for line in open(tsv, encoding="utf-8"):
            parts = line.rstrip("\n").split("\t")
            if len(parts) == 3:
                ids[parts[2]] = parts[1]
    return ids


def words(s):
    return s.replace("_", " ").strip()


def paper_meta(stem):
    m = re.match(r"([A-Za-z]+?)(\d{4})_(.*)", stem)
    if not m:
        return words(stem), ""
    return words(m.group(3)), f"{m.group(1)} et al. · {m.group(2)}"


def web_meta(stem):
    prefix, _, rest = stem.partition("_")
    src = SOURCE_NAMES.get(prefix)
    if not src:
        return words(stem), ""
    if prefix == "Google":
        rest = re.sub(r"^GAN_\d+_", "", rest)
    if prefix == "CS236":
        rest = re.sub(r"^\d+_", "", rest)
    if prefix in ("US", "EU"):
        rest = re.sub(r"^(Copyright_Office_|AI_Act_)", "", rest)
    return words(rest), src


def first_heading_and_source(text):
    title = source = None
    for line in text.splitlines()[:8]:
        if line.startswith("# ") and not title:
            title = re.sub(r"\s*\|\s*RevisionDojo\s*$", "", line[2:]).replace("&amp;", "&").strip()
        if line.startswith("Source: ") and not source:
            source = line[8:].strip()
    return title, source


def rel(from_dir, target):
    return os.path.relpath(target, from_dir).replace(os.sep, "/")


# The theme choice is kept in localStorage and also in window.name: browsers often
# don't share localStorage between file:// pages, but window.name survives
# navigating between pages in the same tab.
CSS_THEME_SCRIPT = """<script>
function getTheme(){var t=null;try{t=localStorage.getItem('theme');}catch(e){}var m=/(?:^|;)theme=(light|dark)(?:;|$)/.exec(window.name||'');return m?m[1]:t;}
function keepTheme(n){try{localStorage.setItem('theme',n);}catch(e){}var rest=(window.name||'').split(';').filter(function(p){return p&&p.indexOf('theme=')!==0;});rest.push('theme='+n);window.name=rest.join(';');}
(function(){var t=getTheme();if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);keepTheme(t);}})();
function toggleTheme(){var r=document.documentElement;var dark=r.getAttribute('data-theme')==='dark'||(!r.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);var n=dark?'light':'dark';r.setAttribute('data-theme',n);keepTheme(n);}
</script>"""


MATHJAX = '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"></script>'


QUESTIONS_PAGE = "site/pages/question_bank/02_question_bank.html"


def css_version():
    """Short hash of style.css, added to its URL so browsers drop stale cached copies."""
    with open(os.path.join(SITE, "style.css"), "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


def page_shell(title, css_href, home_href, body, source=None, original=None, note=""):
    links = []
    if source:
        links.append(f'<a href="{html.escape(source)}" target="_blank" rel="noopener">Original page ↗</a>')
    if original:
        links.append(f'<a href="{html.escape(original)}">Raw file</a>')
    # home_href points at the root index.html, so the question bank sits beside it.
    questions_href = home_href[: -len("index.html")] + QUESTIONS_PAGE
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title><link rel="stylesheet" href="{css_href}">{CSS_THEME_SCRIPT}{MATHJAX if "class=\"math" in body else ""}</head>
<body><header class="bar"><a class="home" href="{home_href}">← A Diffuse Vision</a>
<nav>{' · '.join(links)}<a class="topcta" href="{questions_href}">Questions</a><button class="toggle" onclick="toggleTheme()" aria-label="Toggle light or dark">◐</button></nav></header>
<main class="doc"><h1 class="doc-title">{html.escape(title)}</h1>{f'<p class="licence">{html.escape(note)}</p>' if note else ""}{body}</main></body></html>"""


def unescape_math(md):
    """HTML-to-Markdown conversion escaped the LaTeX in scraped blogs (\\$, \\_, \\\\beta).
    Restore the $...$ delimiters and undo Markdown escapes inside them."""
    # Only pages that really contain LaTeX; elsewhere "\$" is a price.
    if not re.search(r"\\\$\\+(mathbf|mathcal|frac|sum|theta|log|sim|alpha|beta|mu|sigma|nabla|int|prod|epsilon|left|text)\b", md):
        return md
    md = md.replace("\\$", "$")

    def fix(m):
        s = m.group(0)
        s = re.sub(r"\\{2,}(?=[A-Za-z{}])", r"\\", s)
        return re.sub(r"\\+([_*\[\]#^~|<>`])", r"\1", s)
    return re.sub(r"\$\$.+?\$\$|\$[^$\n]+?\$", fix, md, flags=re.S)


def markdown_body(md_path, source=None):
    """Convert a Markdown file to an HTML fragment (also used by the app backend)."""
    text = open(md_path, encoding="utf-8").read()
    # Drop the leading "# title" / "Source:" lines; the shell shows them.
    lines = text.splitlines()
    while lines and (lines[0].startswith("# ") or lines[0].startswith("Source:") or not lines[0].strip()):
        lines.pop(0)
    md = unescape_math("\n".join(lines))
    body = subprocess.run(["pandoc", "-f", "gfm+tex_math_dollars", "-t", "html", "--mathjax", "--wrap=none"],
                          input=md, capture_output=True, text=True, check=True).stdout
    # Heading permalinks scraped from blogs show up as a bare "#".
    body = re.sub(r'<a href="#[^"]*">#</a>', "", body)
    if source:
        # Scraped pages link relative to their own site; point those links back there.
        def absolute(m):
            url = html.unescape(m.group(2))
            if url.startswith(("#", "mailto:", "data:")):
                return m.group(0)
            if url.startswith("javascript:"):
                return f'{m.group(1)}="#"'
            return f'{m.group(1)}="{html.escape(urljoin(source, url))}"'
        body = re.sub(r'\b(href|src)="([^"]*)"', absolute, body)
    return re.sub(r'<a href="http', '<a target="_blank" rel="noopener" href="http', body)


def render_markdown(md_path, out_path, title, source, raw_path=None, note=""):
    body = markdown_body(md_path, source)
    out_dir = os.path.dirname(out_path)
    os.makedirs(out_dir, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(page_shell(title, rel(out_dir, os.path.join(SITE, "style.css")) + "?v=" + css_version(),
                           rel(out_dir, os.path.join(OUT, "index.html")), body, source,
                           rel(out_dir, raw_path or md_path), note))


def render_text(txt_path, out_path, title):
    text = open(txt_path, encoding="utf-8").read()
    out_dir = os.path.dirname(out_path)
    os.makedirs(out_dir, exist_ok=True)
    body = f'<pre class="plain">{html.escape(text)}</pre>'
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(page_shell(title, rel(out_dir, os.path.join(SITE, "style.css")) + "?v=" + css_version(),
                           rel(out_dir, os.path.join(OUT, "index.html")), body, None,
                           rel(out_dir, txt_path)))


def collect():
    arxiv = load_arxiv_ids()
    items = {}
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS and not d.startswith("."))
        reldir = os.path.relpath(dirpath, ROOT).replace(os.sep, "/")
        if reldir == ".":
            continue
        for fn in sorted(filenames):
            stem, ext = os.path.splitext(fn)
            if ext not in (".pdf", ".md", ".txt"):
                continue
            path = os.path.join(dirpath, fn)
            item = {"ext": ext[1:].upper(), "kb": os.path.getsize(path) // 1024, "extra": None}
            out = os.path.join(PAGES, reldir, stem + ".html")
            item["href"] = rel(OUT, path if ext == ".pdf" else out)
            text = open(path, encoding="utf-8").read() if ext != ".pdf" else ""
            heading, source = first_heading_and_source(text) if ext == ".md" else (None, None)
            if reldir == "official":
                title, by = OFFICIAL_TITLES.get(fn, words(stem)), "International Baccalaureate"
            elif reldir.startswith("papers/"):
                title, by = paper_meta(stem)
                if stem in arxiv:
                    item["extra"] = ("arXiv ↗", f"https://arxiv.org/abs/{arxiv[stem]}")
            elif reldir == "question_bank":
                title, by = heading or words(stem), "Practice (original)"
            elif reldir.startswith("study_guides/"):
                title = heading or words(stem).replace("-", " ").capitalize()
                by = "RevisionDojo" if "revisiondojo" in reldir else "computersciencewiki"
            else:
                title, by = web_meta(stem)
            item.update(title=title, by=by)
            note = licence(reldir, stem)
            raw = None
            if PUBLIC:
                if note is None:
                    # Not ours to republish: link to the original instead.
                    url = source or ORIGINAL_URLS.get(fn)
                    if not url:
                        continue
                    item.update(href=url, external=True, site=urlparse(url).netloc.removeprefix("www."),
                                ext="LINK" if ext != ".pdf" else "PDF")
                    LINKED[rel(OUT, out)] = url
                    items.setdefault(reldir, []).append(item)
                    continue
                raw = os.path.join(OUT, reldir, fn)
                os.makedirs(os.path.dirname(raw), exist_ok=True)
                shutil.copy2(path, raw)
                if ext == ".pdf":
                    item["href"] = rel(OUT, raw)
            if ext == ".md":
                render_markdown(path, out, title, source, raw, note or "")
                item["words"] = len(text.split())
            elif ext == ".txt":
                render_text(path, out, title)
                item["words"] = len(text.split())
            items.setdefault(reldir, []).append(item)
    items.update(paper_links())
    return items


def paper_links():
    """Papers aren't stored locally; list them as arXiv links from tools/papers.tsv."""
    out = {}
    tsv = os.path.join(ROOT, "tools", "papers.tsv")
    for line in open(tsv, encoding="utf-8"):
        parts = line.rstrip("\n").split("\t")
        if len(parts) != 3:
            continue
        folder, arxiv_id, stem = parts
        title, by = paper_meta(stem)
        out.setdefault(f"papers/{folder}", []).append({
            "ext": "LINK", "kb": 0, "title": title, "by": by,
            "href": f"https://arxiv.org/abs/{arxiv_id}", "external": True,
            "extra": ("PDF ↗", f"https://arxiv.org/pdf/{arxiv_id}")})
    for lst in out.values():
        lst.sort(key=lambda i: i["title"].lower())
    return out


def item_html(it):
    if it.get("external"):
        size = it.get("site", "arXiv")
    else:
        size = f'{it["words"]:,} words' if it.get("words") else f'{it["kb"]:,} KB'
    target = ' target="_blank" rel="noopener"' if it.get("external") else ""
    extra = ""
    if it["extra"]:
        extra = f' · <a href="{it["extra"][1]}" target="_blank" rel="noopener">{it["extra"][0]}</a>'
    by = f'{html.escape(it["by"])} · ' if it["by"] else ""
    return (f'<li class="item" data-q="{html.escape((it["title"] + " " + it["by"]).lower())}">'
            f'<a class="t" href="{it["href"]}"{target}>{html.escape(it["title"])}</a>'
            f'<span class="m">{by}<span class="fmt">{it["ext"]}</span> {size}{extra}</span></li>')


def build_index(items):
    total = sum(len(v) for v in items.values())
    toc, secs = [], []
    for key, label, blurb in SECTIONS:
        lst = items.get(key)
        if not lst:
            continue
        sid = key.replace("/", "-")
        tags = "".join(f'<span class="tag tag-{t.lower()}">{t}</span>' for t in TAGS.get(key, []))
        toc.append(f'<a href="#{sid}">{html.escape(label)} <span>{len(lst)}</span></a>')
        secs.append(f'<section class="lib" id="{sid}"><div class="lib-head"><h3>{html.escape(label)}</h3>{tags}'
                    f'<span class="count">{len(lst)}</span></div><p class="blurb">{html.escape(blurb)}</p>'
                    f'<ul>{"".join(item_html(i) for i in lst)}</ul></section>')
    tmpl = open(os.path.join(ROOT, "tools", "index_template.html"), encoding="utf-8").read()
    out = (tmpl.replace("{{THEME_SCRIPT}}", CSS_THEME_SCRIPT)
               .replace("{{CSSV}}", css_version())
               .replace("{{TOTAL}}", str(total))
               .replace("{{TOC}}", "".join(toc))
               .replace("{{SECTIONS}}", "".join(secs)))
    for key, text in (PUBLIC_TEXT if PUBLIC else LOCAL_TEXT).items():
        out = out.replace(key, html.escape(text))
    if PUBLIC:
        # Glossary and challenge links that point at pages not hosted here.
        out = re.sub(r'href="([^"]+)"', lambda m: (f'href="{html.escape(LINKED[m.group(1)])}" target="_blank" rel="noopener"'
                                                   if m.group(1) in LINKED else m.group(0)), out)
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(out)
    return total


if __name__ == "__main__":
    if "--public" in sys.argv:
        PUBLIC = True
        OUT = os.path.join(ROOT, "docs")
        SITE = os.path.join(OUT, "site")
        PAGES = os.path.join(SITE, "pages")
        # .nojekyll marks docs/ as ours (and stops GitHub Pages running Jekyll on it).
        if os.path.isdir(OUT) and not os.path.exists(os.path.join(OUT, ".nojekyll")):
            sys.exit("docs/ exists but wasn't made by this script; move it away first.")
        shutil.rmtree(OUT, ignore_errors=True)
        os.makedirs(PAGES)
        shutil.copy2(os.path.join(ROOT, "site", "style.css"), SITE)
        open(os.path.join(OUT, ".nojekyll"), "w").close()
    os.makedirs(PAGES, exist_ok=True)
    found = collect()
    n = build_index(found)
    print(json.dumps({k: len(v) for k, v in found.items()}, indent=1))
    print("items:", n)
