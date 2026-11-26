# Mock Paper 1 Section B papers

These are four timed mocks: two SL and two HL. They follow the expected format, with **three case-study questions** worth **12 marks (SL)** or **24 marks (HL)**: short answers first, then one extended response. The questions are new; they don't repeat the question bank.

**How to sit them:**
1. Use a clean copy of the case study booklet and nothing else.
2. Set a timer: **18 minutes for SL**, **36 minutes for HL**.
3. Write by hand, on paper. Typing makes answers longer than you'll manage in the exam.
4. Mark with the harsh rules in `01_how_section_B_is_marked.md`. Each mark scheme also lists what weak answers did, the way an examiner's report would.

Questions are numbered 5–7, as if Section A were questions 1–4. The real numbering may differ.

---

## SL Mock 1 (12 marks, 18 minutes)

**5.** Identify **two** examples of inputs, other than a text prompt, that a conditional image generation model could use. **[2]**

**6.** Explain how noise injection is used when a diffusion model is being *trained*. **[4]**

**7.** Visionary Studios wants to fine-tune a diffusion model on a client's brand style using images collected from the internet. Discuss whether it should do this. **[6]**

<details>
<summary>Mark scheme: SL Mock 1</summary>

**Q5 [2].** Any two, [1] each: class label, sketch, segmentation map, reference/product photo, depth map, pose, edge map.
- *Weak answers wrote:* "a picture" and "an image" (counted once), or "a prompt" (excluded by the question).

**Q6 [4].** Up to [4]:
- A real training image is taken and a random noise level/step is chosen [1].
- A known amount of random (Gaussian) noise is added to it [1].
- The network is given the noisy image and must predict the noise that was added [1].
- The prediction error is used to update the weights, so the model learns to remove noise at every level [1].
- *Weak answers* described *generation* (starting from pure noise), which is not what was asked. Max [1] for that.

**Q7 [6] markband.** Indicative content:
- **For:**
  - Internet images give lots of examples of styles, so fine-tuning is quick and cheap.
  - It gives better style adherence and saves designers' time.
- **Against:**
  - Public ≠ licensed (copyright, terms of service).
  - The client's brand assets may be mixed with competitors' or artists' work.
  - Possible near-copies in outputs.
  - Bias in whatever was collected.
  - Legal action and reputational risk land on the *client*.
- **Better alternative:** fine-tune on the client's *own* approved brand assets plus licensed images, with provenance recorded.
- **Conclusion:** No, not with general internet images. Yes, with client-supplied and licensed material.
- *To reach 5–6:* both sides, applied to the studio and client, with at least one piece of research (e.g., Getty v Stability; US Copyright Office) and a conclusion.
- *Common cap:* a one-sided "it's illegal" answer, max 4.

</details>

---

## SL Mock 2 (12 marks, 18 minutes)

**5.** Outline what is meant by *character consistency*. **[2]**

**6.** Visionary Studios wants to produce low-resolution drafts with fewer denoising steps before producing final images. Explain why this workflow reduces the computational demands of using a diffusion model. **[4]**

**7.** To what extent can Visionary Studios ensure that its AI-generated advertising images are free from bias? **[6]**

<details>
<summary>Mark scheme: SL Mock 2</summary>

**Q5 [2].**
- The same recurring character or motif [1]
- looks uniform (face, clothing, colours) across many different images and scenes in a campaign [1].
- *Weak answers* described "consistent quality" or style. That's a different factor: [0].

**Q6 [4].** Up to [4]:
- Each denoising step is a full pass of the network, so fewer steps means less computation per draft [1].
- Lower resolution means fewer pixel values per step, so each step is cheaper and uses less GPU memory [1].
- Many drafts can be generated and reviewed quickly, and only the chosen few are rendered at full quality [1].
- So the expensive high-step, high-resolution generation is spent only on approved images, cutting total time and cost [1].
- *Weak answers* said "it's faster" four times in different words: [1].

**Q7 [6] markband.** Indicative content:
- **Can reduce bias:**
  - Curate and rebalance training data.
  - Audit outputs from neutral prompts across demographics.
  - Diverse human review before delivery.
  - Clear prompt guidelines.
- **Cannot fully ensure:**
  - The base model was trained on data the studio didn't choose (e.g., LAION-scale web data).
  - Bias also comes from captions and prompts.
  - "Unbiased" is contested.
  - Over-correction causes new errors (Gemini, 2024).
  - Bias research (Bianchi 2023; "Stable Bias" 2023) shows it is persistent.
- **Judgement:** "to a limited extent". The studio can *reduce and manage* bias, not guarantee its absence, so ongoing auditing and human review are essential.
- *Common cap:* a list of mitigations with no "extent" judgement, max 4.

</details>

---

## HL Mock 1 (24 marks, 36 minutes)

**5.** (a) Define *mode collapse*. **[2]**
(b) Outline why diffusion models are less affected by mode collapse than GANs. **[2]**

**6.** (a) Explain how the discriminator's output is used to improve the generator during GAN training. **[4]**
(b) Outline **two** ways Visionary Studios could reduce the risk of its model reproducing copyrighted images. **[4]**

**7.** Evaluate whether a hybrid model combining a variational autoencoder (VAE) with a diffusion model would meet Visionary Studios' needs better than a GAN. **[12]**

<details>
<summary>Mark scheme: HL Mock 1</summary>

**Q5(a) [2].**
- The generator produces only a narrow range of similar outputs [1]
- instead of the full diversity of the training data, because those outputs fool the discriminator [1].

**Q5(b) [2].**
- A diffusion model is trained to denoise *every* training image at every noise level, with no adversary to fool [1]
- so it must model the whole data distribution; there's no reward for settling on a few outputs [1].

**Q6(a) [4].** Up to [4]:
- Generated images are passed to the discriminator, which outputs the probability that each is real [1].
- The generator's loss is high when the discriminator judges its images fake [1].
- Gradients of this loss are backpropagated through the discriminator into the generator [1].
- The generator's weights are updated to make its images more likely to be judged real; the two networks alternate updates [1].
- *Weak answers* said the generator "compares its output with real images": [0] for that point.

**Q6(b) [4].** Two ways, [1] + [1] expansion each:
- de-duplicate training data (memorisation is strongest for duplicates);
- train only on licensed or owned images;
- check outputs by similarity / reverse-image search before delivery;
- block prompts naming specific artists or brands;
- human legal review of final assets.

**Q7 [12] markband.** Indicative content:
- **The VAE + diffusion hybrid (= latent diffusion / Stable Diffusion):**
  - The VAE compresses images, so diffusion runs on a small latent: much cheaper per step.
  - Keeps diffusion's quality, diversity and stable training.
  - Flexible conditioning (text, sketches) and good consistency tools.
  - The VAE latent supports exploring variations.
  - **But:** still several steps (slower than a GAN); autoencoder artefacts in fine detail; more components.
- **GAN:**
  - Single-pass speed and sharpness.
  - **But:** instability, mode collapse (bad for varied campaigns), weaker text control, costly failed training runs.
- **Weigh against the booklet's five factors:** the hybrid wins on quality, stability, flexibility and consistency; the GAN wins only on speed. Speed can be recovered with few-step samplers or distillation.
- **Research:** Rombach et al. 2022; Dhariwal & Nichol 2021; the trilemma (Xiao et al. 2022); DDIM; WGAN-GP for the GAN side.
- **Conclusion:** the hybrid is better for most of the studio's work. A GAN only for a narrow, high-volume, single-style task.
- *To reach 10–12:* explicit criteria, both models' weaknesses, real research explained, and a conditional conclusion. *Recognising that Stable Diffusion already is this hybrid* is a strong sign of research.
- *Common caps:* describing each model in turn without weighing (6); no limitations of the hybrid (6).

</details>

---

## HL Mock 2 (24 marks, 36 minutes)

**5.** (a) Define *latent space*. **[2]**
(b) Outline the purpose of the *D-dimensional noise vector* in a GAN. **[2]**

**6.** (a) Explain how training a diffusion model differs from training a GAN. **[4]**
(b) Explain why a flow-based model can trace how a generated image was formed, but a GAN generally cannot. **[4]**

**7.** To what extent should training stability be the deciding factor in Visionary Studios' choice between a diffusion model and a GAN? **[12]**

<details>
<summary>Mark scheme: HL Mock 2</summary>

**Q5(a) [2].**
- A compressed, lower-dimensional representation where each image is a point/vector [1]
- and similar images lie close together, so moving through the space changes images smoothly [1].

**Q5(b) [2].**
- It supplies the randomness that makes each generated image different [1]
- and acts as a latent space: nearby vectors give similar images, allowing interpolation and variation [1].

**Q6(a) [4].** Up to [4], must refer to both:
- A diffusion model trains **one** network; a GAN trains **two** networks (generator and discriminator) [1].
- The diffusion objective is a fixed regression target: predict the added noise (e.g., mean squared error) [1].
- A GAN's objective is adversarial: each network's target moves as the other improves [1].
- So diffusion training is stable and predictable, whereas GAN training needs careful balancing and can oscillate or collapse [1].

**Q6(b) [4].**
- A flow-based model is built from invertible transformations [1]
- so running it backwards maps an image to the exact noise vector that created it, and that vector regenerates the same image [1].
- A GAN's generator only maps noise to image; it has no inverse or encoder [1]
- so recovering the input requires slow, approximate search and may not find an exact match [1].

**Q7 [12] markband.** Indicative content:
- **Why stability matters:**
  - Failed or collapsed GAN runs waste GPU time on limited infrastructure.
  - Unpredictable outputs threaten deadlines.
  - Mode collapse ruins variety.
  - Diffusion's simple objective trains reliably (supports choosing diffusion).
- **Why it shouldn't be the *only* factor:**
  - The studio will mostly fine-tune pre-trained models, so stability matters less than *generation* efficiency.
  - GANs win on speed per image.
  - Output quality, consistency and flexibility (text conditioning) also matter, as do ethical and data constraints, which are the same for both.
  - GAN stabilisers (WGAN-GP, spectral normalisation) narrow the stability gap.
- **Weighing:** stability is a *threshold* criterion (an unreliable model is unusable), but once both are reliable enough, quality, flexibility and cost decide.
- **Research:** Goodfellow 2014; Arjovsky / Gulrajani 2017; Miyato 2018; Ho et al. 2020; Dhariwal & Nichol 2021.
- **Conclusion example:** "Training stability should not be the deciding factor on its own. It rules out an unmodified GAN for varied work, but diffusion should be chosen mainly for its quality and flexibility, with its computational cost managed by efficient sampling."
- *Common caps:* answering "which model is better" without addressing *"to what extent should stability decide"* (6–7 max: it misses the question); no research (9).

</details>
