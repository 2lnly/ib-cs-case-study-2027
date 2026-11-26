"""Create app/data/seed.json (and content.json if missing) from the files on disk
and the static site's overview, challenges and glossary.

Usage: python3 -I app/seed.py [--force]   (--force overwrites content.json)
"""
import html
import json
import os
import re
import sys
import uuid

APP = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(APP)
sys.path.insert(0, os.path.join(ROOT, "tools"))
import build_site as bs  # noqa: E402

DATA = os.path.join(APP, "data")


def uid():
    return uuid.uuid4().hex[:10]


def file_item(reldir, fn, arxiv):
    stem, ext = os.path.splitext(fn)
    path = f"{reldir}/{fn}"
    full = os.path.join(ROOT, path)
    item = {"id": uid(), "title": "", "by": "", "path": path, "kind": ext[1:].lower(),
            "size": os.path.getsize(full), "description": "", "starred": False, "hidden": False}
    text = open(full, encoding="utf-8").read() if ext in (".md", ".txt") else ""
    if text:
        item["words"] = len(text.split())
    heading, source = bs.first_heading_and_source(text) if ext == ".md" else (None, None)
    if source:
        item["source"] = source
    if reldir == "official":
        item["title"], item["by"] = bs.OFFICIAL_TITLES.get(fn, bs.words(stem)), "International Baccalaureate"
    elif reldir.startswith("papers/"):
        item["title"], item["by"] = bs.paper_meta(stem)
        if stem in arxiv:
            item["source"] = f"https://arxiv.org/abs/{arxiv[stem]}"
    elif reldir == "question_bank":
        item["title"], item["by"] = heading or bs.words(stem), "Practice (original)"
    elif reldir.startswith("study_guides/"):
        item["title"] = heading or bs.words(stem).replace("-", " ").capitalize()
        item["by"] = "RevisionDojo" if "revisiondojo" in reldir else "computersciencewiki"
    else:
        item["title"], item["by"] = bs.web_meta(stem)
    return item


def library():
    arxiv = bs.load_arxiv_ids()
    sections = []
    papers = paper_links()
    for key, label, blurb in bs.SECTIONS:
        folder = os.path.join(ROOT, key)
        if key in papers:
            items = papers[key]
        elif os.path.isdir(folder):
            files = sorted(f for f in os.listdir(folder)
                           if os.path.splitext(f)[1] in (".pdf", ".md", ".txt") and os.path.isfile(os.path.join(folder, f)))
            items = [file_item(key, f, arxiv) for f in files]
        else:
            continue
        sections.append({"id": uid(), "title": label, "blurb": blurb, "folder": key,
                         "tags": bs.TAGS.get(key, []), "hidden": False, "items": items})
    return sections


def paper_links():
    """Papers are arXiv links (tools/papers.tsv), not local files."""
    out = {}
    for line in open(os.path.join(ROOT, "tools", "papers.tsv"), encoding="utf-8"):
        parts = line.rstrip("\n").split("\t")
        if len(parts) != 3:
            continue
        folder, arxiv_id, stem = parts
        title, by = bs.paper_meta(stem)
        out.setdefault(f"papers/{folder}", []).append({
            "id": uid(), "title": title, "by": by, "kind": "link",
            "url": f"https://arxiv.org/abs/{arxiv_id}", "pdfUrl": f"https://arxiv.org/pdf/{arxiv_id}",
            "description": "", "starred": False, "hidden": False})
    for lst in out.values():
        lst.sort(key=lambda i: i["title"].lower())
    return out


def glossary_from_template():
    tmpl = open(os.path.join(ROOT, "tools", "index_template.html"), encoding="utf-8").read()
    groups = []
    gloss = tmpl.split('<div class="gloss">', 1)[1].split('<h2 class="sec" id="library">', 1)[0]
    for chunk in gloss.split('<div class="gloss-group">')[1:]:
        head = re.search(r"<h4>(.*?)</h4>", chunk, re.S).group(1)
        tags = ["HL"] if "tag-hl" in head and 'class="tag"' not in head else ["SL", "HL"]
        title = html.unescape(re.sub(r"<span[^>]*>.*?</span>|<[^>]+>", "", head)).strip()
        terms = [{"id": uid(), "term": html.unescape(t), "href": h, "def": html.unescape(d)}
                 for h, t, d in re.findall(r'<div class="term"><a href="([^"]+)"[^>]*>(.*?)</a><p>(.*?)</p></div>', chunk)]
        groups.append({"id": uid(), "title": title, "tags": tags, "terms": terms})
    return groups


def content():
    return {
        "version": 1,
        "settings": {
            "siteTitle": "A Diffuse Vision",
            "brand": "A DIFFUSE VISION",
            "themeMode": "auto",
            "accent": "",
            "headingFont": "serif",
            "bodyFont": "sans",
            "baseSize": 16,
            "width": 1080,
            "radius": 0,
            "density": "comfortable",
            "showToc": True,
            "showMeta": True,
            "showStarredSection": True,
            "pdfNewTab": True,
            "defaultLevel": "all",
            "autosave": False,
            "topButtonLabel": "Questions",
            "topButtonHref": "question_bank/02_question_bank.md",
            "footer": "Collected 23 November 2026 for personal study. Copyright in each document belongs to its author or publisher.",
        },
        "blocks": [
            {"id": uid(), "type": "hero", "nav": "", "hidden": False,
             "kicker": "IB Computer Science · Case study · May & November 2027",
             "title": "Generative AI for image creation: a diffuse vision",
             "lede": "Everything collected for the Visionary Studios case study: the official booklet and subject brief, study guides, explainers, the original research papers (linked to arXiv), and the ethics and legal sources."},
            {"id": uid(), "type": "buttons", "nav": "", "hidden": False, "items": [
                {"id": uid(), "label": "Practice questions →", "href": "question_bank/02_question_bank.md", "primary": True},
                {"id": uid(), "label": "Mock papers", "href": "question_bank/03_mock_section_B_papers.md", "primary": False},
                {"id": uid(), "label": "How it's marked", "href": "question_bank/01_how_section_B_is_marked.md", "primary": False}]},
            {"id": uid(), "type": "text", "nav": "Overview", "hidden": False, "title": "Overview",
             "subtitle": "from the booklet & subject brief", "columns": 2,
             "html": "<p><b>Visionary Studios</b> is a creative design company. It is evaluating generative AI to produce high-quality images for <b>advertising campaigns, concept art and digital media</b>, and is weighing <b>diffusion models</b>, <b>GANs</b> and <b>hybrid models</b> against each other.</p>"
                     "<p>The company assesses each model on five factors: <b>output quality</b>, <b>computational efficiency</b>, <b>training stability</b>, <b>flexibility and scalability</b>, and <b>consistency</b> (character consistency and style adherence).</p>"
                     "<p>It also has to handle three ethical and legal concerns:</p><ol><li><b>Dataset curation:</b> avoid copyrighted material and respect intellectual property law.</li><li><b>Bias and fairness:</b> check datasets for bias that leads to exclusionary or inaccurate outputs.</li><li><b>Transparency and AI disclosure:</b> set clear rules for disclosing AI-generated content.</li></ol>"
                     "<p><i>The GAN section (booklet lines 48–59) and the hybrid models section (lines 60–75) are HL only.</i></p>"},
            {"id": uid(), "type": "facts", "nav": "", "hidden": False, "title": "Exam facts", "subtitle": "",
             "note": "RevisionDojo says the case study is worth 12 marks at SL and 24 at HL. The IB documents here don't state marks, so treat that figure as unofficial.",
             "items": [{"id": uid(), "big": b, "small": s} for b, s in [
                 ("Paper 1", "Section B holds the case study, for both SL and HL"),
                 ("3 questions", "on the case study in Paper 1 (subject brief)"),
                 ("1h15 · 35%", "SL Paper 1 time and weighting"),
                 ("2h · 40%", "HL Paper 1 time and weighting"),
                 ("15h / 30h", "recommended teaching hours, SL / HL")]]},
            {"id": uid(), "type": "cards", "nav": "Challenges", "hidden": False, "title": "The four challenges",
             "subtitle": "SL: 1–2 · HL: 1–4",
             "items": [
                 {"id": uid(), "num": "1", "tags": ["SL", "HL"], "inverted": False,
                  "title": "Managing the iterative denoising process in diffusion models and its computational demands",
                  "text": "Many denoising steps mean slow, expensive generation. Research step reduction (DDIM, distillation, consistency models) and latent diffusion.",
                  "links": [{"label": "Diffusion explainers", "href": "#sec:explainers/diffusion"}, {"label": "Diffusion papers", "href": "#sec:papers/01_diffusion"}]},
                 {"id": uid(), "num": "2", "tags": ["SL", "HL"], "inverted": False,
                  "title": "The ethics of training on large datasets: intellectual property and bias mitigation",
                  "text": "Copyright of training data, memorisation, bias in outputs, disclosure and content credentials.",
                  "links": [{"label": "Ethics and law", "href": "#sec:ethics_legal"}, {"label": "Ethics papers", "href": "#sec:papers/08_ethics_legal"}]},
                 {"id": uid(), "num": "3", "tags": ["HL"], "inverted": True,
                  "title": "Balancing generator and discriminator performance in GANs to produce realistic images",
                  "text": "The adversarial dynamic, unstable training and mode collapse, plus fixes such as WGAN, spectral normalisation and TTUR.",
                  "links": [{"label": "GAN explainers", "href": "#sec:explainers/GANs_HL"}, {"label": "GAN papers", "href": "#sec:papers/04_GANs_HL"}]},
                 {"id": uid(), "num": "4", "tags": ["HL"], "inverted": True,
                  "title": "How a hybrid model could balance the strengths and weaknesses of VAEs, GANs, flows and diffusion",
                  "text": "Each model's trade-off between quality, speed, diversity, control and exactness, and how combining them helps.",
                  "links": [{"label": "Hybrid papers", "href": "#sec:papers/07_hybrid_HL"}, {"label": "CS236 notes", "href": "#sec:explainers/stanford_cs236"}]}]},
            {"id": uid(), "type": "glossary", "nav": "Glossary", "hidden": False, "title": "Glossary",
             "subtitle": "booklet terminology · plain-language summaries", "groups": glossary_from_template()},
            {"id": uid(), "type": "library", "nav": "Library", "hidden": False, "title": "Library", "subtitle": ""},
        ],
        "library": library(),
        "notes": {},
    }


if __name__ == "__main__":
    os.makedirs(DATA, exist_ok=True)
    c = content()
    with open(os.path.join(DATA, "seed.json"), "w", encoding="utf-8") as f:
        json.dump(c, f, indent=1, ensure_ascii=False)
    target = os.path.join(DATA, "content.json")
    if "--force" in sys.argv or not os.path.exists(target):
        with open(target, "w", encoding="utf-8") as f:
            json.dump(c, f, indent=1, ensure_ascii=False)
        print("wrote content.json")
    n = sum(len(s["items"]) for s in c["library"])
    print(f"seed: {len(c['library'])} sections, {n} items, {sum(len(g['terms']) for b in c['blocks'] if b['type'] == 'glossary' for g in b['groups'])} glossary terms")
