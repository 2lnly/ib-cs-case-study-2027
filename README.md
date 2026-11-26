# IB Computer Science Case Study 2027: Generative AI for image creation, "a diffuse vision"

Resources for the case study assessed in Paper 1, Section B (May and November 2027).
HL students cover all four challenges. SL students cover only the first two (diffusion, ethics).

## Question bank (question_bank/)
- `01_how_section_B_is_marked.md`: the exam format (what's official and what's only reported), the extended-response bands, the harsh marking rules used here, other people's advice, and a list of research to learn per challenge.
- `02_question_bank.md`: a ranked list of likely themes, a definitions table (what gets 2/2 vs 0), questions for every challenge plus Theme A curveballs and calculations, and 6- and 12-mark extended questions. Every mark scheme is hidden until you click it.
- `03_mock_section_B_papers.md`: two timed SL mocks (12 marks, 18 min) and two HL mocks (24 marks, 36 min), with mark schemes and notes on common weak answers.

All questions are original practice material, not official IB questions. They show up in both websites under "Question bank & mock papers"; the app's reader has a notes panel for drafting answers.

## Editable website (app/)
Double-click **`Start editable site.command`**, or run `python3 -I app/server.py`, then open http://127.0.0.1:8765. Stop it with Ctrl+C in that window.
- Press **✎ Edit** (or the E key) to edit any text in place: titles, descriptions, glossary terms and card text. Text blocks get a formatting toolbar.
- Add, move, duplicate, hide or delete blocks (text, facts, cards, glossary, link list, callout, image, big title, divider, buttons). The button row under the title ("Practice questions →" etc.) is a Buttons block; the "Questions" button in the top bar is set in ⚙ Settings → Top bar button. Library sections and items work the same way, and items can be starred and given descriptions.
- Add items as web links, uploaded files (stored in `uploads/`), or files already in the folder.
- **⚙ Settings**: theme, accent colour, fonts, text size, page width, corner rounding, spacing, library display options, autosave, export/import, revision history and reset to the original.
- Markdown and text files open in a built-in reader with a notes panel.
- Content is saved in `app/data/content.json`. Every save keeps the previous version in `app/data/history/` (the last 100).
- Only reachable from this computer (it binds to 127.0.0.1). Needs Python 3 and pandoc; equations need internet, because MathJax loads from cdnjs.

## Static website (index.html)
The original read-only site: open `index.html` directly. Rebuild it after adding files with `python3 -I tools/build_site.py`. A copy of the first version is in `backups/`.

## Public website (docs/, GitHub Pages)
https://2lnly.github.io/ib-cs-case-study-2027/ is built from `docs/`. To rebuild it, run `python3 -I tools/build_site.py --public`, then commit and push `docs/`.
- It hosts the question bank and the openly licensed material: Wikipedia (CC BY-SA 4.0), Google's GAN course and the C2PA explainer (CC BY 4.0), and the NIST and US Copyright Office reports (US government works). Everything else, including the IB booklet, RevisionDojo and the blog explainers, links to its original source. `licence()` in `tools/build_site.py` decides which is which.
- The repository leaves out the downloaded third-party folders, the local builds and the editable app's saved content and notes (see `.gitignore`). In a fresh clone the app starts with only the question bank and the paper links.

## Suggested order
1. `official/case_study_booklet_2027.pdf`: the booklet itself, plus a `.txt` copy that keeps the line numbers. Read this first and treat it as the authority.
2. `study_guides/revisiondojo/a-diffuse-vision-case-study-summary-2027.md`, then `2027-ib-computer-science-case-study-four-challenges.md`.
3. Explainers for each topic (see the map below).
4. Exam technique: in `study_guides/revisiondojo/`, read `*practice-questions*`, `*model-answer-annotated*`, `*mark-allocation*`, `*discuss-evaluate*` and `*terminology*`.
5. Papers, for depth and for research beyond the booklet.

## Where to find each booklet topic
Papers are no longer stored locally. They are arXiv links listed in `tools/papers.tsv` and shown in both websites; the folder names below are their library sections.

| Booklet topic | Explainers | Papers |
|---|---|---|
| Diffusion models, DDPM, denoising, noise injection, CNN denoiser | `explainers/diffusion/` (Lilian Weng, HF Annotated Diffusion, Jay Alammar), `explainers/CNN/` | `papers/01_diffusion/` (DDPM, DDIM and distillation for fewer steps, Latent Diffusion) |
| Computational demands (challenge 1) | Sander Dieleman, HF Stable Diffusion | DDIM, Progressive Distillation, Consistency Models, Latent Diffusion, SDXL Turbo (in 07) |
| Text-to-image, conditional, class-conditional, image-to-image, segmentation maps | `wikipedia_quickref/` | `papers/02_text_to_image_conditional/` (CLIP, DALL·E 1/2, Imagen, ControlNet, pix2pix, CycleGAN, SPADE) |
| Character consistency, style adherence, embedding-based approaches | Sander Dieleman on guidance | `papers/03_consistency_embeddings/` (DreamBooth, Textual Inversion, LoRA, IP-Adapter), Classifier-Free Guidance |
| GANs, generator/discriminator, adversarial dynamic, mode collapse (HL) | `explainers/GANs_HL/` (Google GAN course, Lilian Weng) | `papers/04_GANs_HL/` (Goodfellow, DCGAN, WGAN, Improved Techniques, Unrolled GANs, Spectral Norm, StyleGAN) |
| VAEs, latent space (HL, broad) | `explainers/VAE_HL/`, `explainers/stanford_cs236/` | `papers/05_VAE_HL/` |
| Flow-based models (HL, broad) | `explainers/flow_based_HL/`, CS236 notes | `papers/06_flow_based_HL/` (NICE, RealNVP, Glow, review) |
| Hybrid models (HL challenge 4) | | `papers/07_hybrid_HL/` (VAE-GAN, VQGAN, Denoising Diffusion GANs, Diffusion-GAN, DiffuseVAE, comparative review) |
| Dataset curation, IP, bias, AI disclosure (challenge 2) | `ethics_legal/` (NIST AI 600-1, US Copyright Office reports, EU AI Act Art. 50, C2PA) | `papers/08_ethics_legal/` (Datasheets, LAION-5B, Stable Bias, Carlini extraction, Glaze, watermarks) |

## Notes
- The RevisionDojo posts are converted to Markdown from their page data. A few paragraphs may be out of order, and the source URL is at the top of each file.
- `official/IB_computer_science_curriculum_updates.md`: the IB's course page, covering teaching hours (case study is 15 h SL, 30 h HL) and the Paper 1 structure.
- `study_guides/computersciencewiki/`: the wiki's case study terminology list, a summary of its Generative AI article (with exam-style questions), and its command-terms do's and don'ts table.
- `official/IB_CS_subject_brief_first_assessment_2027.pdf` (+ `.txt`): the IB subject brief, the authority on assessment. Paper 1 has **three case-study questions**. Paper 1 is 1h15 (35%) at SL and 2h (40%) at HL. Final grade split: SL 70% exams / 30% IA, HL 80/20.
