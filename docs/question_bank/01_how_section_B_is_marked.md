# How Section B is marked, and how this question bank marks you

*Written 24 November 2026. The question bank and mock papers in this folder are original practice material, not official IB questions. Nobody outside the IB knows the real questions. 2027 is the first exam on this syllabus, so there are no past papers yet.*

## 1. The format

| What | SL | HL | How sure? |
|---|---|---|---|
| Where the case study is examined | Paper 1, Section B | Paper 1, Section B | **Official**: IB subject brief and curriculum page (`official/`) |
| Paper 1 length and weighting | 1 h 15 min, 35% of grade | 2 h, 40% of grade | **Official**: subject brief |
| Number of case-study questions in Paper 1 | 3 | 3 | **Official**: subject brief ("three questions related to the case study") |
| Section B marks | 12 (of 50) | 24 (of 80) | Reported from the IB guide by several teacher sites; consistent everywhere |
| Short-answer part (AO1/AO2: identify, outline, describe, explain) | about 6 marks | about 12 marks | Reported; the guide says the split can change |
| Extended response (AO3: discuss, evaluate, justify, to what extent) | about 6 marks | about 12 marks | Reported; marked with level bands, not point by point |
| Challenges you must prepare | 1 and 2 | 1, 2, 3 and 4 | **Official**: booklet |
| Booklet in the exam | A clean copy is provided | Same | **Official**: booklet cover ("required for… paper 1 examinations") |
| Time to spend | about 18–20 min | about 36–40 min | About 1.5 min per mark |

**What this means for you:**
- **HL:** the 12-mark question is worth about 15% of Paper 1. It almost certainly targets challenge 3 (GANs) or challenge 4 (hybrids), because those are the HL-only challenges. It could combine them with challenge 1 (diffusion), since a hybrid question needs diffusion knowledge anyway.
- **SL:** the 6-mark question will be about challenge 1 (diffusion and its computational demands) or challenge 2 (dataset ethics: IP and bias). There's nothing else it can be about.
- **The booklet is on your desk.** You can refer to it ("as the booklet notes, mode collapse…") and use its line numbers to orient yourself. But copying its sentences earns nothing: examiners want *your* explanation.

## 2. How the extended response is marked

Teacher sites that have seen the 2027 guide describe four bands. In my own words:

| HL [12] | SL [6] | Band | What it looks like |
|---|---|---|---|
| 0 | 0 | — | Nothing relevant |
| 1–3 | 1–2 | Basic | A few facts, close to a list. No real reference to Visionary Studios or to research. |
| 4–6 | 3–4 | Adequate | Descriptive. Some correct terminology and a little analysis, but mostly "what" not "why". Limited research. |
| 7–9 | 5–6 | Competent | Clear understanding. Some analysis of both sides, applied to the studio, with some research. A conclusion. (At SL this is the top band.) |
| 10–12 | n/a | Proficient | Detailed and accurate throughout. Terminology used naturally. Balanced analysis. The conclusion follows from the weighing. Extensive, relevant research beyond the booklet. |

The past HL Paper 3 (the case-study paper before 2027) used the same kind of bands. There, answers that referred to neither the case study nor research were stuck in the bottom band.

## 3. The harsh rules this question bank uses

These rules are **stricter than an examiner is likely to be**, on purpose. If you score well under them, you're safe.

**Short answers** (identify, outline, describe, explain, define):
1. **One mark per *distinct*, *correct* point.** Saying the same thing twice in different words scores once.
2. **"Two" means two *different* things.** "It is slow" and "it takes a long time" are one point.
3. **Expansions must be linked.** "Diffusion is expensive [1] because it uses many steps [1]" works. "Diffusion is expensive. Also it uses many steps." scores [1].
4. **Vague words score zero:** "the AI", "it is complex", "it is slow", "bad images", "better quality" with no mechanism.
5. **A wrong mechanism cancels the point.** Examples: "the discriminator makes images", "diffusion adds noise to create the image", "mode collapse is overfitting".
6. **Follow the command term.** A *define* doesn't need an essay (wasted time). An *explain* without a reason ("because…", "so…") is capped at half marks.

**Extended answers** (discuss, evaluate, to what extent, justify):

| If your answer… | …it can't score more than |
|---|---|
| never mentions Visionary Studios or its needs (ads, concept art, brand consistency, deadlines, infrastructure) | Basic (HL 3, SL 2) |
| has no conclusion or judgement | Adequate (HL 6, SL 4) |
| argues only one side | Adequate (HL 6, SL 4) |
| has a conclusion that doesn't follow from what you argued, or adds a new idea | Competent (HL 9) |
| has no research beyond the booklet (no named method, study, case, law or real product) | Competent (HL 9, SL 4) |
| contains a serious technical error in a core mechanism | one band lower |
| is two separate lists (pros, then cons) with no weighing | Adequate (HL 6, SL 4) |

**Self-marking checklist for an extended answer.** Tick each before you give yourself a top-band mark:
- [ ] The first sentence states a position as a decision for Visionary Studios.
- [ ] Each paragraph has a claim, the mechanism, the consequence for the studio, and a limitation.
- [ ] At least three specific, checkable research points (named method, paper, case or law), each explained rather than just name-dropped.
- [ ] Both sides are developed, not token objections that you instantly dismiss.
- [ ] Explicit weighing ("this matters more than X because the studio…").
- [ ] A conditional conclusion ("…provided that…", "for final ad assets, but not for…") that follows from the weighing.
- [ ] Booklet terminology used accurately and in context. At least 5 terms for HL.

## 4. What other people advise

Summarised from sources in this folder, plus one I could only link to:

- **RevisionDojo** (27 posts in `study_guides/revisiondojo/`):
  - Structure every evaluation as *position → evidence for → evidence against → weighing → conclusion*.
  - Name the mechanism instead of saying "slow".
  - Copyright law differs by country, so don't present it as universal.
  - Avoid absolute conclusions; a model is "suitable *for* something".
  - Prepare a small set of reliable research per challenge.
  - Never invent statistics or citations.
- **educs.me exam-prep page** (teacher site: <https://educs.me/topics/IBCS/case-study/2027-generative-ai/exam-prep/>). It asks AI tools not to copy it, so it isn't saved here; read it yourself. It covers:
  - the markbands,
  - worked SL and HL Section B examples,
  - common mistakes: repeating the question, restating the booklet, fence-sitting, unverified chatbot "facts", and two disconnected lists.
- **computersciencewiki** (`study_guides/computersciencewiki/command-terms-dos-and-donts.md`): a do/don't table for every command term.
- **The old HL Paper 3** (2017–2026) is the closest precedent. It opened with 2-mark define/identify/outline questions, had 4–6-mark describe/explain questions in the middle, and ended with a 12-mark *To what extent / Evaluate / Discuss* question. Expect the same style compressed into Section B.

## 5. Research to have ready (named, real, checkable)

You need research for the top bands. Here's a starter set per challenge; most of it is in the library (papers as arXiv links). Learn *what each shows*, not just the name, and only use what you can explain. A half-remembered "fact" is worse than none.

**Challenge 1: denoising and computational demands (SL + HL)**
- **DDPM** (Ho et al., 2020): the original method. It used 1,000 noising/denoising steps, so one image means 1,000 network passes.
- **DDIM** (Song et al., 2020): a sampler that skips steps; it generates in about 50 steps with similar quality (10–50× faster).
- **Latent diffusion / Stable Diffusion** (Rombach et al., 2022): denoises a compressed latent instead of pixels. A 512×512×3 image becomes 64×64×4, about 48× fewer values per step.
- **Progressive distillation** (Salimans & Ho, 2022) and **consistency models** (Song et al., 2023): train a model to do in 1–8 steps what used to take hundreds.
- **SDXL Turbo / adversarial diffusion distillation** (Sauer et al., 2023): 1–4 step generation using a GAN-style loss. This is also a hybrid, useful for HL.
- **Classifier-free guidance** (Ho & Salimans, 2022): improves prompt adherence but needs two network passes per step, so it doubles the cost.
- **Energy:** Luccioni et al. (2023, "Power Hungry Processing") found image generation the most energy-intensive of the common AI tasks they measured.

**Challenge 2: dataset ethics, IP and bias (SL + HL)**
- **LAION-5B:** a 5-billion-pair web-scraped dataset used to train Stable Diffusion. In December 2023 the Stanford Internet Observatory found child-abuse material links in it and it was taken down. It returned in 2024 as a cleaned "Re-LAION" version, which shows why curation matters.
- **Getty Images v Stability AI** (UK and US) and **Andersen v Stability AI** (US artists' class action): lawsuits over training on copyrighted images without permission. Distorted Getty watermarks even appeared in generated images.
- **Carlini et al. (2023):** extracted near-copies of training images from diffusion models, showing that memorisation is real, especially for images duplicated in the dataset.
- **US Copyright Office, Part 2 report (2025)** and **Thaler v Perlmutter (2025):** images generated purely from prompts lack the human authorship copyright needs. That matters if clients expect to *own* the ads.
- **Bias:** Bianchi et al. (2023) and Luccioni et al. ("Stable Bias", 2023) showed text-to-image models amplify demographic stereotypes (e.g., who appears for "CEO"). Google's Gemini paused generating people in February 2024 after over-correcting into historically inaccurate images: mitigation can backfire too.
- **Licensed-data alternatives:** Adobe Firefly (trained on licensed Adobe Stock and public-domain content) and Getty's own generator, both offering commercial IP indemnity.
- **Disclosure:** EU AI Act Article 50 (machine-readable marking; deepfake disclosure from August 2026), C2PA content credentials, Google's SynthID watermarks. The backlash to Coca-Cola's AI-made Christmas ad (2024) shows the reputational risk in advertising.
- **Artists' tools:** Glaze (Shan et al., 2023) protects artists against style mimicry, evidence that creators object.

**Challenge 3: GAN balance and mode collapse (HL)**
- **Goodfellow et al. (2014):** the original GAN and its minimax game. If the discriminator wins too easily, the generator's gradients vanish.
- **Improved techniques** (Salimans et al., 2016): minibatch discrimination (the discriminator looks at a whole batch, so a lack of variety is detectable) and feature matching.
- **WGAN** (Arjovsky et al., 2017) and **WGAN-GP** (Gulrajani et al., 2017): Wasserstein distance with a critic gives smoother, more meaningful gradients. The gradient penalty replaces weight clipping.
- **Spectral normalisation** (Miyato et al., 2018): limits how sharply the discriminator can change, a cheap stabiliser.
- **TTUR** (Heusel et al., 2017): different learning rates for generator and discriminator. The same paper introduced **FID**, the standard quality-and-diversity metric.
- **Unrolled GANs** (Metz et al., 2016): the generator looks a few discriminator updates ahead, aimed directly at mode collapse.

**Challenge 4: hybrids (HL)**
- **Generative learning trilemma** (Xiao et al., 2022): you want quality, diversity and speed. GANs give quality and speed, VAEs and flows give speed and diversity, diffusion gives quality and diversity. Hybrids try to get all three.
- **Stable Diffusion is a hybrid:** a VAE-style autoencoder (itself trained with a GAN loss for sharpness) plus a diffusion model in its latent space.
- **VAE-GAN** (Larsen et al., 2016) and **VQGAN** (Esser et al., 2021): adversarial loss sharpens VAE outputs.
- **Denoising Diffusion GANs** (Xiao et al., 2022): a GAN does big denoising jumps, so a few steps instead of a thousand.
- **Diffusion-GAN** (Wang et al., 2022): diffusion-style noise on the discriminator's inputs stabilises GAN training.
- **DiffuseVAE** (Pandey et al., 2022): a VAE gives a controllable low-dimensional latent that conditions a diffusion model.
- **Rectified flow** (Stable Diffusion 3, Esser et al., 2024): modern models blur the line between flow-based and diffusion models.
