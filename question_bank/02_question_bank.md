# Case study question bank: Generative AI for image creation

**How to use this:**
- Cover the mark scheme, write your answer, then click **Mark scheme** to open it.
- Mark yourself *harshly* with the rules in `01_how_section_B_is_marked.md`. If you're unsure whether a point counts, it doesn't.

**Tags:**
- **SL+HL** or **HL**: which level must prepare it.
- **C1–C4**: which booklet challenge it belongs to.
- **★**: I think it's likely to come up.
- **⚠**: a curveball: harder, or needs knowledge beyond the booklet.

These are original questions written for practice, not leaked or official ones.

**Contents:**
- 0: The most likely themes, ranked
- A: Definitions (what gets 2/2 and what gets 0)
- B: Image generation techniques
- C: Diffusion models and computational demands (Challenge 1)
- D: Evaluating models: the five factors and consistency
- E: Ethics and law: datasets, IP, bias, disclosure (Challenge 2)
- F: GANs (Challenge 3, HL)
- G: VAEs, flow-based models and hybrids (Challenge 4, HL)
- H: Curveballs: Theme A links and calculations
- I: Extended responses (SL 6-mark and HL 12-mark)

---

## 0. The most likely themes, ranked

This is my judgement from the booklet's wording, the four challenges and how the old Paper 3 was set. It's not inside knowledge.

| # | Theme | Level | Likely form | Why I think so |
|---|---|---|---|---|
| 1 | How iterative denoising turns noise into an image | SL+HL | Describe/Explain [2–4] | Challenge 1 plus Figure 1. Almost certain to be tested somewhere. |
| 2 | Why diffusion is computationally expensive, and how to reduce it | SL+HL | Explain [4] or extended | Challenge 1 says "addressing their computational demands" directly. |
| 3 | Dataset curation and intellectual property | SL+HL | Outline [4] or extended [6/12] | Challenge 2. The most natural SL 6-marker. |
| 4 | Bias in datasets and how to mitigate it | SL+HL | Explain [4] or extended | Challenge 2 names bias mitigation explicitly. |
| 5 | Hybrid model evaluation | HL | **Evaluate [12]** | Challenge 4 already uses the word "evaluating". The strongest clue in the booklet. |
| 6 | Generator/discriminator balance and mode collapse | HL | Define [2], Explain [4], or the 12-marker | Challenge 3, and the booklet has a whole HL section on it. |
| 7 | Conditional vs unconditional vs text-to-image | SL+HL | Distinguish/Outline [2–3] | Easy opener material with lots of booklet terms. |
| 8 | Character consistency and embedding-based approaches | SL+HL | Outline/Explain [2–4] | A named term with almost no explanation in the booklet: an examiner's favourite. |
| 9 | Transparency and AI disclosure | SL+HL | Outline [2–4] or part of an extended | Named in the ethics section. |
| 10 | VAE latent space / flow-based reversibility | HL | Outline [2–3] | HL "broad understanding" terms; short questions likely. |

---

## A. Definitions

Expect at least one *define/identify/outline* opener worth [2]. Rule of thumb: **[1] for the core idea, [1] for the precise qualifier that shows you understand it.** Using the word to define itself ("a diffusion model diffuses…") scores 0.

### Both levels

| Term | 2/2 answer | Scores 0–1 because… |
|---|---|---|
| **Noise injection** | Adding random (usually Gaussian) noise to image data. In training, a known amount is added to real images so the model can learn to predict it; in generation, pure random noise is the starting point. | "Adding noise to an image" [1] max: no purpose. |
| **Denoising** | A trained network predicts the noise present in an image and removes part of it, producing a slightly cleaner image. This is repeated over many steps. | "Cleaning up an image" [0]. Must mention *predicting* the noise or the trained network. |
| **Diffusion model** | A generative model that learns to reverse a gradual noising process, so it can create new images by starting from random noise and iteratively denoising it. | "A model that diffuses images" [0]. Missing "starts from noise" [1]. |
| **DDPM** | The formal framework modern diffusion models build on. A fixed forward process adds Gaussian noise over many steps, and a learned reverse process removes it step by step; the network is trained to predict the added noise. | Just expanding the acronym [0]. |
| **CNN** | A neural network whose convolutional layers slide small learned filters over an image to detect local features (edges, then textures, then objects), reusing the same weights across positions. In diffusion models it acts as the denoiser. | "A network for images" [0]. Needs filters/convolution or feature detection. |
| **Conditional image generation** | Generating images controlled by an extra input (class label, text, sketch, segmentation map) so the output matches that input. | Giving only an example of an input [1]. |
| **Unconditional image generation** | Generating images with no input except random noise, so the output reflects only patterns learned from the training data. | "Random images" [0]. |
| **Image-to-image translation** | Turning an input image from one form into another while keeping its structure (e.g., sketch to realistic render, black-and-white to colour). | Must say the structure/content is *preserved*. |
| **Segmentation map** | An image in which every pixel (or region) is labelled with a class such as sky, road or person; used as a layout to condition generation. | "A map of segments" [0]. |
| **Text-to-image generation** | Producing an image from a natural-language prompt: the text is encoded into a numerical representation (embedding) that guides generation. | Examples only (DALL·E) [0]. |
| **Character consistency** | The ability to generate the same recurring character or motif with a uniform appearance across many different images and scenes. | Confusing it with style adherence [0]. |
| **Embedding-based approach** | Representing a concept such as a character or style as a learned vector (embedding) that is reused to condition every generation, keeping outputs consistent. | Must say *learned vector/numerical representation*. |
| **Training stability** | How reliably training converges to a good model without oscillating, diverging or collapsing, giving consistent results across runs. | "Training is stable" [0]. |
| **Dataset curation** | Selecting, filtering, licensing, cleaning and documenting training data so it is lawful, representative and suitable for the purpose. | "Choosing data" [1] max. |
| **Bias mitigation** | Identifying and reducing systematic unfairness in training data or model outputs, e.g., rebalancing data and auditing outputs across groups. | "Removing bias" [1] max, with no *how*. |

### HL only

| Term | 2/2 answer | Scores 0–1 because… |
|---|---|---|
| **GAN** | Two neural networks trained against each other: a generator creates synthetic images from random noise to fool a discriminator, which tries to tell real images from generated ones. | Missing *either* network's role [1]. |
| **Generator** | The network that transforms a random noise vector into a synthetic image. It is trained to make the discriminator classify its outputs as real. | "Generates images" [1] max. |
| **Discriminator** | A classifier network that outputs the probability that an image is real (from the training data) rather than generated. Its feedback trains the generator, and it is discarded after training. | Saying it "generates", or "compares to the dataset" with no classifier idea [0]. |
| **Adversarial dynamic** | The competitive training relationship in which each network's improvement changes the other's objective. Training only progresses well while the two stay balanced. | "They fight" [0]. |
| **D-dimensional noise vector** | A list of D random numbers (e.g., D = 100), sampled from a simple distribution such as a Gaussian, used as the generator's input. Each different vector maps to a different image. | "Noise with D dimensions" [0]: you've just repeated the term. |
| **Mode collapse** | The generator produces only a small range of similar outputs instead of covering the diversity of the training data, because those outputs reliably fool the discriminator. | "Producing bad images" [0]. "Overfitting" [0]: wrong concept. |
| **VAE** | An encoder maps an image to a probability distribution in a latent space, and a decoder reconstructs images from points sampled from it. Training regularises the latent space so that new points decode into new, plausible images. | Missing the latent space or the encode/decode idea [1] max. |
| **Latent space** | A compressed, lower-dimensional representation where each image is a point (vector) and similar images lie close together, so moving through it changes images smoothly. | "Hidden space" [0]. |
| **Flow-based model** | A model built from a chain of invertible transformations that map simple random noise to images *exactly*, and can be run backwards to recover the exact noise for any image. | Missing invertibility/exactness [0–1]. |
| **Hybrid model** | A system that combines two or more types of generative model (e.g., a VAE with a diffusion model) to exploit their complementary strengths. | "Mix of AIs" [0]. |

---

## B. Image generation techniques (SL + HL)

### B1 ★ Distinguish between conditional and unconditional image generation. [2]

<details>
<summary>Mark scheme</summary>

- **Conditional:** the output is controlled by an extra input such as a label, text prompt, sketch or segmentation map [1].
- **Unconditional:** the only input is random noise, so the output is driven purely by patterns learned from the training data [1].

**Harsh notes:**
- "Distinguish" needs *both* sides. Describing only one scores [1] max.
- "Unconditional has no rules" scores [0].

</details>

### B2 Identify two types of input, other than text, that a conditional image generation model can use. [2]

<details>
<summary>Mark scheme</summary>

Any two, [1] each:
- class label
- sketch / line drawing
- segmentation map
- reference image / photo
- depth map
- human pose skeleton
- edge map

**Harsh notes:**
- "Images" and "pictures" count as one point.
- "Prompt" counts as text, so it's excluded.

</details>

### B3 ★ Outline how a text-to-image model uses a prompt to influence the image it generates. [3]

<details>
<summary>Mark scheme</summary>

Up to [3]:
- The prompt is converted by a text encoder (e.g., CLIP or a language model) into an embedding: a numerical representation of its meaning [1].
- That embedding is fed into the denoiser at every denoising step (e.g., through cross-attention) [1].
- So each noise prediction is pushed toward image content that matches the text, and the final image reflects the description [1].
- A guidance setting controls how strongly the image follows the prompt, trading prompt adherence against variety [1].

**Harsh notes:**
- "The AI reads the prompt and draws it" scores [0].
- Must show the text becomes *numbers that steer the denoising*.

</details>

### B4 Describe one way image-to-image translation could be used in Visionary Studios' workflow. [3]

<details>
<summary>Mark scheme</summary>

Example answer:
- A designer draws a rough layout sketch of an advert [1].
- The model turns it into a realistic rendering while keeping the composition and positions from the sketch [1].
- So the art director can check many rendered versions quickly, while the human still controls the layout. This speeds up the concept stage [1].

Also accept: colourising black-and-white or archive images for a campaign; converting a product photo into the brand's illustration style.

**Harsh notes:**
- A generic "it turns one image into another" with no workflow scores [1] max.

</details>

### B5 Explain one benefit and one risk of using unconditional generation to create a synthetic dataset for training another AI model. [4]

<details>
<summary>Mark scheme</summary>

**Benefit** (up to [2]):
- Large numbers of new, varied images can be produced cheaply [1]
- without collecting or licensing more real photos, so there are fewer privacy/IP issues and rare cases can be added [1].

**Risk** (up to [2]):
- The generator can only reproduce patterns (and biases) from its own training data [1].
- So the synthetic dataset may amplify those biases or lack real variety, or may contain near-copies of memorised training images, so it isn't truly "new" or IP-free [1].
- Also accept: errors and artefacts get learned by the next model.

**Harsh notes:**
- "Synthetic data is fake so it's bad" scores [0].

</details>

### B6 ⚠ A client asks for "our new running shoe on a mountain at sunrise, in our brand's flat illustration style". Explain which image generation techniques Visionary Studios should combine to meet this brief. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- Text-to-image generation for the scene: mountain, sunrise, composition [1].
- Pure text-to-image cannot guarantee the *real* product looks exactly right; a shoe the model invents would mislead customers [1].
- So use conditional/image-to-image generation with the client's product photo as an input (or inpaint the real product into the scene) [1].
- The brand style should come from an embedding-based approach or a fine-tuned style model trained on approved brand assets, ensuring style adherence [1].

**Harsh notes:**
- Answering "text-to-image" alone scores [1] max. The point of the question is that the product must be *accurate*.

</details>

---

## C. Diffusion models and computational demands (Challenge 1, SL + HL)

### C1 ★ Describe the process shown in Figure 1 of the case study. [3]

<details>
<summary>Mark scheme</summary>

Up to [3]:
- Generation begins with an image of pure random noise (noise injection as the starting point) [1].
- At each step, the neural denoiser predicts part of the noise and removes it [1].
- This is repeated many times, so features gradually emerge until a coherent, detailed image is produced [1].
- The final content depends on what the denoiser learned from its training data (e.g., animals or cityscapes) [1].

**Harsh notes:**
- The arrows in Figure 1 go noise → image: this is *generation*, not training.
- Saying "noise is added at each step" here scores [0] for that point.

</details>

### C2 ★ Explain how a diffusion model is trained to denoise images. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- Take a real training image and choose a random step/noise level [1].
- Add a known amount of Gaussian noise to it (noise injection) [1].
- The denoiser network (a CNN/U-Net) is given the noisy image and the step number, and predicts the noise that was added [1].
- The prediction is compared with the actual noise using a loss such as mean squared error [1].
- Backpropagation/gradient descent adjusts the network's weights to reduce this error. Repeated over millions of images and noise levels, the network learns to denoise at every level [1].

**Harsh notes:**
- Mixing up training and generation costs a mark. In training you start from a *real image*, not pure noise.
- "It learns from the data" with no mechanism scores [0].

</details>

### C3 Explain why a diffusion model trained only on images of cities could not generate a convincing image of a cat. [3]

<details>
<summary>Mark scheme</summary>

Up to [3]:
- The denoiser learns the statistical patterns of its training data only [1].
- At each step it predicts noise so as to move the image toward features it has learned: buildings, roads, windows [1].
- It has never learned cat features (fur, faces, shapes), so denoising steers toward urban structures; any cat would be distorted or absent [1].

**Harsh notes:**
- "It doesn't know what a cat is" alone scores [1].
- Must link the output to the *learned distribution*.

</details>

### C4 ★ Explain why generating images with a diffusion model requires significant computational resources. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- Each image requires many denoising steps; the original DDPM used 1,000 [1].
- Every step is a complete forward pass through a large neural network (a CNN/U-Net with millions to billions of parameters) over the whole image [1].
- The steps are sequential, because each depends on the previous one, so they cannot run in parallel and the time adds up [1].
- Higher resolutions mean far more values to process per step, needing more GPU memory and time [1].
- Techniques such as classifier-free guidance need two network passes per step, doubling the work [1].

**Harsh notes:**
- "Diffusion models are slow because they are complex" scores [0].
- "Uses a lot of data" is about *training* data and doesn't answer a question about generation.

</details>

### C5 Compare the computational demands of training a diffusion model with those of using it to generate images. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]. Must refer to both throughout.
- **Similarity:** both run the same denoiser network on GPUs, so both need specialised hardware and memory [1].
- **Training:** needs huge datasets and very long GPU time (weeks across many GPUs for a large model), but is done once or occasionally [1].
- **Generation:** each image needs only a fraction of that, but the cost recurs for *every* image the studio makes, so over many campaigns it becomes an ongoing operating cost [1].
- **Sequential vs parallel:** a training step uses one random noise level per image, so work parallelises easily across a batch, whereas generation must run its many steps in sequence, which causes latency [1].
- **Application:** Visionary Studios can avoid most training cost by fine-tuning an existing pre-trained model, but cannot avoid generation cost [1].

**Harsh notes:**
- Two separate descriptions with no comparison words ("whereas", "both", "unlike") scores [2] max.

</details>

### C6 ★ Describe two techniques that reduce the time taken to generate an image with a diffusion model. [4]

<details>
<summary>Mark scheme</summary>

Two techniques, [1] for naming each and [1] for describing how it saves time:
- **Fewer-step samplers (e.g., DDIM):** skip many intermediate steps, e.g., about 50 instead of 1,000, so far fewer network passes.
- **Latent diffusion:** denoise a compressed latent representation (e.g., 64×64×4 instead of 512×512×3) rather than full-size pixels, so each step is much cheaper; a decoder produces the final image once.
- **Distillation / consistency models:** a "student" model is trained to do in 1–8 steps what the original did in many.
- **Lower-resolution drafts plus upscaling:** generate small, then upscale only the chosen image.
- **Hardware/precision:** run on more powerful GPUs, batch many images together, use half-precision arithmetic.

**Harsh notes:**
- "Use a faster computer" alone scores [1].
- "Use fewer steps" with no explanation of *how* quality is kept scores [1].
- Two hardware answers count as one technique.

</details>

### C7 ★ Explain one trade-off Visionary Studios faces when reducing the number of denoising steps. [3]

<details>
<summary>Mark scheme</summary>

- **Benefit:** fewer steps means fewer network passes, so faster, cheaper generation and quicker iteration for clients [1].
- **Cost:** each step must remove more noise at once, leaving less refinement, so fine detail or prompt accuracy can suffer and artefacts can appear [1].
- **Application:** acceptable for rough concept drafts, but possibly not for final photorealistic advertising assets where output quality is the priority [1].

**Harsh notes:**
- Without applying it to the studio's two kinds of work (drafts vs final assets), max [2].

</details>

### C8 ⚠ Outline why a latent diffusion model (such as Stable Diffusion) needs less computation per denoising step than a model that denoises pixels directly. [3]

<details>
<summary>Mark scheme</summary>

- An autoencoder (VAE) compresses the image into a much smaller latent representation, e.g., 512×512×3 = 786,432 values down to 64×64×4 = 16,384, about 48× fewer [1].
- The denoising network works on this small latent at every step, so each step is much cheaper [1].
- The decoder converts the final latent back into a full-resolution image only once, at the end [1].

**Harsh notes:**
- This goes beyond the booklet, but the booklet's line that "optimization of this process" is crucial (end of the diffusion section, around lines 39–41) invites it. A strong answer brings it in unprompted.

</details>

### C9 Explain why the same prompt can produce a different image each time, and how Visionary Studios could make a particular result reproducible. [3]

<details>
<summary>Mark scheme</summary>

- Generation starts from randomly sampled noise, so each run follows a different denoising path to a different image [1]. Some samplers also add fresh random noise at every step.
- To reproduce a result, fix the random seed so the same starting noise is used [1]
- and keep the model version, sampler, step count and settings identical, ideally with a deterministic sampler such as DDIM [1].

**Harsh notes:**
- "AI is random" scores [0].

</details>

### C10 "The iterative nature of diffusion models is both their greatest strength and their greatest weakness." Explain this statement with reference to Visionary Studios. [4]

<details>
<summary>Mark scheme</summary>

**Strength** (up to [2]):
- Gradual refinement over many small steps lets the model correct errors and build fine detail [1]
- giving the photorealistic, high-quality, stylistically coherent images advertising needs; training is also stable because each step is a simple prediction task [1].

**Weakness** (up to [2]):
- The same repetition means many sequential network passes per image [1]
- so generation is slow and GPU-, energy- and cost-intensive, which limits fast iteration and large campaigns on the studio's existing infrastructure [1].

**Harsh notes:**
- Both halves are needed, and each must name the *mechanism* (repeated denoising).

</details>

---

## D. Evaluating models: the five factors and consistency (SL + HL)

### D1 Identify two factors Visionary Studios uses to evaluate generative AI models. [2]

<details>
<summary>Mark scheme</summary>

Any two, [1] each:
- output quality
- computational efficiency
- training stability
- flexibility and scalability
- consistency

**Harsh notes:**
- Only the booklet's factors score.
- "Cost" alone scores [0]; "computational efficiency" is the term.

</details>

### D2 ⚠ Distinguish between flexibility and scalability in the context of Visionary Studios. [2]

<details>
<summary>Mark scheme</summary>

- **Flexibility:** how well the model adapts to *different kinds* of task (advertising campaigns, concept art, branded assets, different styles) [1].
- **Scalability:** how well it copes with *more* work (more images, more users, higher resolution, future projects) without disproportionate increases in time or cost [1].

**Harsh notes:**
- Students often treat these as one idea. If your two definitions could swap places, you get [0].

</details>

### D3 Outline why consistency is important to Visionary Studios. [2]

<details>
<summary>Mark scheme</summary>

- Campaigns use recurring characters, mascots, products and motifs that must look identical across many images [1].
- Inconsistent outputs damage brand identity and client trust, and need costly manual correction [1].

</details>

### D4 ★ Explain how an embedding-based approach could help Visionary Studios keep a recurring character consistent across a campaign. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- A few reference images of the character are used to learn a new embedding: a vector, or a special token, representing that character [1]. Examples: textual inversion, or DreamBooth/LoRA fine-tuning.
- That embedding is included in every prompt, so the denoiser is conditioned on the same learned features (face, clothing, colours) each time [1].
- The character then looks the same across different scenes, poses and backgrounds [1].
- **Limitation:** consistency isn't guaranteed. The character can drift, or the model can overfit to the reference images (same pose or background every time), so human review is still needed [1].

**Harsh notes:**
- "Use the same prompt each time" scores [1] max. Prompts alone don't fix appearance; that's exactly why embeddings are used.

</details>

### D5 Distinguish between character consistency and style adherence. [2]

<details>
<summary>Mark scheme</summary>

- **Character consistency:** the *same subject* (person, mascot, motif) looks identical across images [1].
- **Style adherence:** images follow the *intended artistic style or theme* given in the prompt (e.g., flat illustration, watercolour), whatever the subject [1].

</details>

### D6 ⚠ Suggest two measurable ways Visionary Studios could compare the output quality of two models, and outline one limitation of one of them. [4]

<details>
<summary>Mark scheme</summary>

Two measures, [1] each (max [2]):
- **FID** (Fréchet Inception Distance): compares statistics of generated and real images; lower is better; captures realism and diversity.
- **CLIP score:** how well images match their prompts.
- **Blind preference tests:** art directors choose between paired outputs.
- **Defect rate:** % of images needing manual fixes.
- **Time/cost per accepted image.**

Limitation, up to [2], e.g.:
- FID needs thousands of samples and doesn't measure brand style or prompt accuracy [1], so a model can score well yet be wrong for a client [1].
- Human ratings are subjective, slow and costly.

**Harsh notes:**
- "Look at the pictures" scores [0] unless it's made systematic (blind, paired, criteria).

</details>

### D7 ⚠ Explain why training stability matters to Visionary Studios even if it never trains a model from scratch. [3]

<details>
<summary>Mark scheme</summary>

- The studio will still *fine-tune* pre-trained models on brand styles and characters, and fine-tuning is training too [1].
- Unstable fine-tuning can produce repetitive or degraded outputs, or overfit to the reference images [1].
- Failed runs waste GPU time and money and delay campaigns, so a model that fine-tunes reliably is more valuable [1].

</details>

---

## E. Ethics and law (Challenge 2, SL + HL)

### E1 ★ Outline two ways Visionary Studios could make sure its training data complies with intellectual property law. [4]

<details>
<summary>Mark scheme</summary>

Two methods, [1] for each plus [1] for each expansion:
- **Licensing:** license stock libraries that explicitly allow AI training, so permission is documented.
- **Own content:** use its own or commissioned work, with contracts granting training rights.
- **Public domain / open licences:** use public-domain or permissively licensed (e.g., CC0) images, checking licence terms.
- **Provenance records** (e.g., datasheets): the source and licence of every image is recorded, so use can be shown to be lawful and content removed on request.
- **Respect opt-outs** (e.g., EU text-and-data-mining reservations, robots.txt) and filter out known copyrighted or trademarked material.
- **Legal review** before training and before client delivery.

**Harsh notes:**
- "Don't use copyrighted images" scores [0]. Almost every image is copyrighted automatically; the answer is *permission*, not avoidance.

</details>

### E2 ★ Explain how bias in a training dataset can lead to biased generated images. Use an example relevant to advertising. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- The model learns the statistical patterns and frequencies in its training data [1].
- If some groups are over- or under-represented (e.g., most "CEO" or "doctor" images show white men), those patterns are learned [1].
- When a prompt doesn't specify, the model reproduces and can *amplify* the most common pattern [1].
- **Advertising example:** a campaign for "a family enjoying our product" might show only one ethnicity, body type or age group. That excludes customers, reinforces stereotypes and harms the client's reputation [1].
- **Research:** Bianchi et al. (2023) and Luccioni et al. ("Stable Bias", 2023) found exactly this in Stable Diffusion and DALL·E [1].

**Harsh notes:**
- "The AI is biased because humans are biased" scores [0]. The mechanism is *learned frequencies in the data*.

</details>

### E3 Describe two methods of bias mitigation Visionary Studios could use. [4]

<details>
<summary>Mark scheme</summary>

Two methods, [1] each plus [1] for each description:
- **Dataset audit and rebalancing:** measure how groups are represented, then add images of under-represented groups or reduce over-represented ones.
- **Output auditing:** generate many images from neutral prompts and measure the spread of genders, skin tones and ages; fix and repeat.
- **Diverse human review panel** before client delivery.
- **Fine-tuning on a balanced, curated set.**
- **Prompt guidelines:** specify diversity deliberately where appropriate.
- **Documentation** of known limitations.

**Harsh notes:**
- "Remove biased images" scores [1] max: how do you find them?
- Bonus insight: automatic "diversity" prompt rewriting can backfire, e.g., Google Gemini's historically inaccurate images, which led to a pause in February 2024. This makes a good balancing point in a longer answer.

</details>

### E4 Explain why "publicly available online" does not mean "free to use for training". [3]

<details>
<summary>Mark scheme</summary>

- Copyright exists automatically when a work is created, so being visible online is not permission to copy it [1].
- Training involves copying images into a dataset. Whether that's allowed depends on licences, website terms and each country's law (US fair use is contested; the EU allows text-and-data mining unless owners opt out) [1].
- Artists and Getty Images have sued Stability AI over exactly this, so the studio could face legal action and reputational damage [1].

</details>

### E5 ⚠ Outline why Visionary Studios might not own the copyright in an image generated purely from a text prompt. [2]

<details>
<summary>Mark scheme</summary>

- In many jurisdictions (e.g., the US) copyright requires *human* authorship. The US Copyright Office (2025) and *Thaler v Perlmutter* found prompts alone aren't enough [1].
- So clients may not get exclusive rights to an advert image and competitors could reuse it. Substantial human editing or arrangement can be protected [1].

**Harsh notes:**
- Many students only think about the *inputs* (training data). This tests the *outputs*, a real commercial problem for an ad agency.

</details>

### E6 ★ Explain the risk that a diffusion model reproduces copyrighted material from its training data, and outline one way to reduce it. [4]

<details>
<summary>Mark scheme</summary>

**Risk** (up to [2]):
- Models can memorise training images, especially ones duplicated many times in the dataset [1].
- They can then output near-copies: Carlini et al. (2023) extracted training images from Stable Diffusion, and distorted Getty watermarks appeared in outputs. If the studio publishes such an image, it may infringe copyright [1].

**Reduction** (up to [2]), e.g.:
- De-duplicate the training set so no image is over-learned [1]
- check outputs with similarity search against the training data, or reverse-image search, before delivery [1].
- Also accept: licensed data only; blocking prompts that name living artists or brands.

</details>

### E7 Outline two reasons Visionary Studios should disclose its use of AI-generated content to clients. [4]

<details>
<summary>Mark scheme</summary>

Two reasons, [1] each plus [1] for each expansion:
- **Trust:** clients are paying for creative work; finding out later damages the relationship.
- **IP/contract:** AI images may not be copyrightable or may carry infringement risk, which affects what the client can legally own.
- **Legal duty:** e.g., EU AI Act Article 50 requires disclosure of deepfake-style content. Clients may have their own disclosure duties to advertising regulators.
- **Reputation:** public backlash against undisclosed AI ads (e.g., Coca-Cola's 2024 AI Christmas ad) shows the risk.

</details>

### E8 Identify two stakeholders affected by Visionary Studios' choice of training data, and outline one impact on each. [4]

<details>
<summary>Mark scheme</summary>

[1] for each stakeholder, [1] for each impact:
- **Artists/photographers:** their work may be used without consent or payment; possible loss of commissions.
- **Clients:** legal and reputational exposure if outputs infringe or are biased.
- **The audience/public:** how they are represented in adverts.
- **The studio's own designers:** their roles change; their style may be copied.
- **People pictured in the data:** privacy, consent.

**Harsh notes:**
- "Society" is too vague [0]. Name a group.

</details>

### E9 Explain how documenting the provenance of training data supports both intellectual property compliance and bias mitigation. [4]

<details>
<summary>Mark scheme</summary>

**IP** (up to [2]):
- A record of each image's source, licence and consent [1]
- lets the studio prove lawful use, honour removal requests and retrain without disputed images [1].

**Bias** (up to [2]):
- Recording the dataset's composition (who and what is pictured, where it came from) [1]
- shows gaps and skews before training, so they can be fixed, e.g., "Datasheets for Datasets" (Gebru et al.) [1].

**Harsh notes:**
- Answering only one half scores [2] max.

</details>

---

## F. GANs (Challenge 3, HL only)

### F1 ★ Describe the roles of the generator and the discriminator in a GAN. [4]

<details>
<summary>Mark scheme</summary>

**Generator** (up to [2]):
- Takes a random D-dimensional noise vector and transforms it into a candidate (fake) image [1]
- and is trained to produce images the discriminator will classify as real [1].

**Discriminator** (up to [2]):
- A classifier that receives both real training images and generated ones and outputs a probability that each is real [1]
- and is trained to tell them apart; its judgements provide the learning signal for the generator [1].

**Harsh notes:**
- "The discriminator compares the fake image to the real images" scores [0] for that point. It *classifies*; it doesn't look things up.

</details>

### F2 ★ Explain how the generator learns to produce more realistic images even though it never sees the training images. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- The discriminator is trained on real and fake images, so it learns which features make an image look real [1].
- The generator's output is passed to the discriminator, and the generator's loss is based on how "fake" the discriminator judges it [1].
- The gradient of that loss is backpropagated *through the discriminator into the generator*, telling the generator how to change its weights to look more real [1].
- Alternating discriminator and generator updates, repeated many times, gradually improves realism [1].

**Harsh notes:**
- "The generator copies real images" scores [0], and it's a serious error.

</details>

### F3 ★ Explain what happens if the discriminator becomes much stronger than the generator. [3]

<details>
<summary>Mark scheme</summary>

- The discriminator confidently rejects every generated image, outputting near zero [1].
- The generator's loss saturates, so the gradients it receives become tiny (vanishing gradients) [1].
- The generator stops improving: training stalls and images stay poor, wasting the studio's compute [1].

</details>

### F4 Explain what happens if the generator becomes much stronger than the discriminator. [3]

<details>
<summary>Mark scheme</summary>

- The discriminator can no longer tell real from fake, so its feedback is uninformative [1].
- The generator can exploit the discriminator's weaknesses with images that fool *it* but contain artefacts humans notice [1].
- It may settle on a few "safe" outputs (mode collapse), or training oscillates instead of converging [1].

</details>

### F5 ★ Explain why mode collapse happens during GAN training. [3]

<details>
<summary>Mark scheme</summary>

- The generator is rewarded only for fooling the discriminator on each image, not for variety [1].
- If a few outputs fool the discriminator reliably, the generator maps many different noise vectors to those same outputs [1].
- When the discriminator learns to reject them, the generator often jumps to *another* narrow set ("mode hopping") rather than learning the full range of the data [1].

**Harsh notes:**
- Defining mode collapse without explaining *why* it happens scores [1] max.

</details>

### F6 Outline why mode collapse is a particular problem for Visionary Studios. [2]

<details>
<summary>Mark scheme</summary>

- The studio needs many distinct variations for campaigns and concept art (different models, poses, settings) [1].
- A collapsed GAN keeps producing near-identical images, so the outputs are unusable and the compute spent training it is wasted [1].

</details>

### F7 ★ Describe two techniques that reduce mode collapse or instability in GAN training. [4]

<details>
<summary>Mark scheme</summary>

Two techniques, [1] each plus [1] for each mechanism:
- **WGAN / WGAN-GP:** replaces the real/fake classifier with a "critic" that estimates the Wasserstein distance between real and generated images. It gives smooth, meaningful gradients even when the generator is poor. The gradient penalty enforces the needed constraint without weight clipping.
- **Spectral normalisation:** limits how sharply the discriminator's output can change, stopping it overpowering the generator. Cheap to compute.
- **Minibatch discrimination:** the discriminator looks at a whole batch, so it can detect lack of variety and penalise collapse directly.
- **Two time-scale update rule (TTUR):** different learning rates for the two networks to keep them balanced. A related trick is several discriminator/critic updates per generator update (WGAN uses 5).
- **Unrolled GANs:** the generator optimises against a few future discriminator updates, so it can't just exploit the current one.
- **Label smoothing / instance noise / data augmentation:** stop the discriminator becoming over-confident.

**Harsh notes:**
- "Train for longer" and "use more data" score [0] without a mechanism.

</details>

### F8 Explain why a trained GAN can generate images faster than a diffusion model. [3]

<details>
<summary>Mark scheme</summary>

- A GAN generates an image in a *single* forward pass of the generator, from noise vector to image [1].
- A diffusion model needs many sequential denoising passes (tens to a thousand) per image [1].
- So GAN latency and cost per image are far lower, useful for real-time or very large batches [1].
- Accept also: the discriminator isn't needed after training.

</details>

### F9 Outline the purpose of the D-dimensional noise vector in a GAN. [2]

<details>
<summary>Mark scheme</summary>

- It provides the randomness that makes each output different: each vector maps to a different image [1].
- The vectors form a latent space: nearby vectors give similar images, so moving between vectors changes images smoothly [1].

</details>

### F10 ⚠ Explain why loss values alone cannot show whether a GAN has suffered mode collapse. [3]

<details>
<summary>Mark scheme</summary>

- GAN losses are relative to a moving opponent, so they fluctuate and don't steadily fall as quality improves [1].
- A collapsed generator can have a *good* loss because its few outputs fool the discriminator [1].
- Diversity must be checked directly: inspect many samples, use metrics such as FID (which penalises lack of variety), or compare outputs with training images [1].

</details>

### F11 ★ Compare GANs and diffusion models in terms of training stability, output diversity and generation speed. [6]

<details>
<summary>Mark scheme</summary>

Up to [6], [2] per criterion with both models referred to:
- **Stability:**
  - A GAN trains two networks in a minimax game with a moving target, so it's unstable and sensitive to settings.
  - Diffusion trains one network on a fixed prediction task (predict the noise), so it's stable and predictable.
- **Diversity:**
  - GANs are prone to mode collapse.
  - Diffusion models cover the training data's variety well, because they must learn to denoise *every* image.
- **Speed:**
  - A GAN generates in one pass.
  - Diffusion needs many sequential passes, so it's much slower (though DDIM and distillation narrow the gap).

**Harsh notes:**
- A table of words without explanation scores [3] max.
- A comparison must refer to *both* models within each point.

</details>

### F12 Explain why diffusion model training is usually more stable than GAN training. [3]

<details>
<summary>Mark scheme</summary>

- Diffusion trains a single network to predict the noise that was added: a fixed target with a simple regression loss (e.g., mean squared error) [1].
- GANs train two networks against each other, so each network's target keeps moving as the other changes [1].
- There is no balance to maintain, so diffusion loss falls predictably, without oscillation or mode collapse [1].

</details>

---

## G. VAEs, flow-based models and hybrids (Challenge 4, HL only)

### G1 Describe how a variational autoencoder generates a new image once trained. [3]

<details>
<summary>Mark scheme</summary>

- A point is sampled from the latent space (from the simple prior distribution, e.g., a standard Gaussian) [1].
- The decoder network maps that latent vector to an image [1].
- Because training regularised the latent space to be smooth and continuous, a new point decodes to a new but plausible image [1].

**Harsh notes:**
- Describing the encoder alone misses the point: generation uses the *decoder*.

</details>

### G2 Explain why images produced by a VAE are often blurrier than those produced by a GAN. [3]

<details>
<summary>Mark scheme</summary>

- A VAE is trained with a pixel-by-pixel reconstruction loss, which rewards the *average* of the plausible outputs [1].
- Averaging many possible sharp details produces blur [1].
- A GAN's discriminator, by contrast, penalises anything that doesn't look real, pushing the generator toward sharp textures [1].

</details>

### G3 Outline one advantage of a VAE's organised latent space for artistic exploration at Visionary Studios. [2]

<details>
<summary>Mark scheme</summary>

- Similar designs sit close together, so the studio can interpolate between two concepts or move in a direction to change one attribute [1]
- producing smooth, controllable variations for brainstorming, which suits the booklet's "flexibility, experimentation or artistic exploration" [1].

</details>

### G4 ★ Describe how the structure of a flow-based model makes it suitable when reproducibility and transparency matter. [3]

<details>
<summary>Mark scheme</summary>

- It is built from invertible transformations, so the mapping between noise and images works exactly in both directions [1].
- Any image can be mapped back to the exact noise vector that produces it, then regenerated identically, so it is reproducible and you can trace how it was formed [1].
- It computes the exact likelihood of an image, so the studio can measure how typical an image is for the model, useful for auditing [1].

</details>

### G5 Outline one limitation of flow-based models. [2]

<details>
<summary>Mark scheme</summary>

- Invertibility means the latent must be the same size as the image, so there's no compression [1]
- making them memory- and compute-heavy. Their restricted architectures also give lower image quality than diffusion or GANs [1].

</details>

### G6 ★ Explain how latent diffusion (as used in Stable Diffusion) is an example of a hybrid model. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- A VAE-style autoencoder compresses images into a smaller latent space [1].
- A diffusion model does all the iterative denoising inside that latent space [1].
- The decoder turns the final latent back into a full-resolution image [1].
- The autoencoder itself is trained with a GAN-style adversarial loss for sharpness, so three model types are combined [1].
- **Benefit:** much lower computation per step than pixel-space diffusion, while keeping diffusion's quality and diversity [1].

</details>

### G7 ★ Explain one way in which a hybrid model could address a limitation of a GAN. [3]

<details>
<summary>Mark scheme</summary>

Any one, explained, up to [3]:
- **VAE-GAN:**
  - adds an encoder and a reconstruction loss, so every training image must be reconstructable [1]
  - and the generator can't ignore parts of the data [1]
  - which reduces mode collapse while keeping GAN sharpness [1].
- **Diffusion-GAN:**
  - adds diffusion-style noise to the images the discriminator sees [1]
  - stopping it becoming over-confident, so gradients stay useful [1]
  - which gives more stable training [1].

</details>

### G8 Explain one way in which a hybrid model could address a limitation of a diffusion model. [3]

<details>
<summary>Mark scheme</summary>

- **Denoising diffusion GANs:** a GAN models each large denoising jump, so only a handful of steps are needed instead of hundreds [1], cutting generation time dramatically [1] while keeping most of diffusion's diversity [1].
- **Or adversarial diffusion distillation (SDXL Turbo):** an adversarial loss trains a model to generate in 1–4 steps.
- **Or DiffuseVAE:** a VAE provides a small, controllable latent that conditions the diffusion model, adding control over attributes.

</details>

### G9 ⚠ Outline the "generative learning trilemma" and how it motivates hybrid models. [4]

<details>
<summary>Mark scheme</summary>

- Three desired properties: high-quality samples, coverage of the data's diversity, and fast sampling [1].
- **GANs:** quality and speed, but poor coverage (mode collapse) [1].
- **VAEs/flows:** speed and coverage, but lower quality. **Diffusion:** quality and coverage, but slow [1].
- No single family achieves all three, so hybrids combine families to get closer, e.g., denoising diffusion GANs [1].
- **Research:** Xiao et al., 2022.

</details>

### G10 Identify the model described in the booklet that best suits each need, and justify each choice. [4]
(i) rapid exploration of many artistic variations of a concept;
(ii) a client who requires that any delivered image can be exactly regenerated and its creation traced.

<details>
<summary>Mark scheme</summary>

- **(i) VAE** [1]: its organised latent space allows smooth interpolation and controllable variation, and generation is fast (a single decoder pass) [1].
- **(ii) Flow-based model** [1]: its invertible mapping lets each image be mapped back to its exact noise and regenerated identically [1].

**Harsh notes:**
- "Diffusion model" for (i) scores [0] for that part: it isn't fast. GAN for (ii) scores [0]: a GAN isn't invertible.

</details>

### G11 Outline two disadvantages of using a hybrid model rather than a single model. [4]

<details>
<summary>Mark scheme</summary>

Two disadvantages, [1] each plus [1] for each expansion:
- **Complexity:** more components and loss terms to design, tune and debug, so it's harder to find what went wrong.
- **Training difficulty:** several objectives can conflict or destabilise each other (a GAN component brings GAN instability with it).
- **Cost:** more models mean more memory and compute, and possibly more training stages.
- **Expertise:** needs specialist staff the studio may not have.
- **Uncertain benefit:** a well-tuned single diffusion model may already be good enough.
- **Transparency:** harder to explain to clients how an image was made.

</details>

### G12 ⚠ Explain why a flow-based model can trace how a given image was formed but a GAN generally cannot. [4]

<details>
<summary>Mark scheme</summary>

- A flow model's transformations are all invertible, so running it backwards on an image gives the exact noise vector that produces it [1], [1].
- A GAN's generator only maps noise to image; it has no inverse and no encoder [1].
- Many noise vectors can produce similar images, and some images can't be produced exactly at all, so finding "the" input means slow, approximate searching [1].

</details>

---

## H. Curveballs: Theme A links and calculations (SL + HL unless marked)

Section B examines "concepts of computer science" *through* the case study, so links to Theme A (computer fundamentals, networks, databases, machine learning) are fair game.

### H1 ★ Explain why GPUs rather than CPUs are used to run a diffusion model's denoiser. [4]

<details>
<summary>Mark scheme</summary>

Up to [4]:
- Convolutions and matrix multiplications involve millions of independent multiply-add operations [1].
- A GPU has thousands of simpler cores that perform the same operation on many data items in parallel [1].
- GPUs have high memory bandwidth and dedicated VRAM to hold the model's weights and the image being processed [1].
- A CPU has a few powerful cores optimised for sequential, branching work, so it would take far longer [1].

</details>

### H2 ★⚠ Calculation. A diffusion model uses 1,000 denoising steps, and each step takes 40 ms on the studio's GPU. [5]

(a) Calculate the time to generate 300 images, one at a time. [2]
(b) The studio switches to a sampler that needs 50 steps. Calculate the time saved for the 300 images. [2]
(c) Classifier-free guidance is then turned on, doubling the work per step. State the new total time for (b). [1]

<details>
<summary>Mark scheme</summary>

- **(a)** 1,000 × 0.04 s = 40 s per image [1]; × 300 = 12,000 s = 200 minutes (3 h 20 min) [1].
- **(b)** 50 × 0.04 s = 2 s per image; × 300 = 600 s (10 min) [1]. Saving = 11,400 s = 190 minutes [1].
- **(c)** 1,200 s = 20 minutes [1].

**Harsh notes:**
- No units scores [0] for that part.
- No working shown scores [1] max per part.

</details>

### H3 ⚠ Calculation. An autoencoder compresses a 512 × 512 RGB image into a 64 × 64 × 4 latent. Calculate how many times fewer values the denoiser processes per step, and state one possible downside. [3]

<details>
<summary>Mark scheme</summary>

- 512 × 512 × 3 = 786,432; 64 × 64 × 4 = 16,384 [1].
- 786,432 ÷ 16,384 = **48 times fewer** [1].
- **Downside:** fine detail can be lost in compression, so the decoder may produce artefacts in small text, hands or faces [1].

</details>

### H4 Distinguish between training and inference for Visionary Studios' image model. [2]

<details>
<summary>Mark scheme</summary>

- **Training:** adjusting the model's weights using a dataset, which is expensive and done once or occasionally [1].
- **Inference/generation:** using the fixed trained model to produce new images from prompts, which happens for every image the studio makes [1].

</details>

### H5 ⚠ Explain why a diffusion model can be trained on images without human labels, and why a text-to-image model still needs captioned images. [3]

<details>
<summary>Mark scheme</summary>

- The noise added during training is known, so the training target creates itself: this is self-supervised learning, with no human labels needed to learn what images look like [1].
- To follow prompts, the model must learn which words go with which visual features, which requires image–caption pairs [1].
- So caption quality and bias also shape the outputs, which is another dataset-curation issue [1].

</details>

### H6 Outline how overfitting in an image generator could cause an intellectual property problem. [3]

<details>
<summary>Mark scheme</summary>

- An overfitted model memorises specific training images rather than general patterns, especially duplicated ones [1].
- It can then reproduce near-copies of copyrighted works in its outputs [1].
- If the studio publishes these in a client's advert, the studio and client face infringement claims [1].

</details>

### H7 ⚠ Visionary Studios records the source, licence, consent status and content tags of every training image. Outline two benefits of storing this in a relational database rather than in separate spreadsheets. [4]

<details>
<summary>Mark scheme</summary>

Two benefits, [1] each plus [1] for each expansion:
- **Querying:** e.g., instantly find every image from a source whose licence has been withdrawn, so it can be removed and the model retrained.
- **Integrity constraints:** e.g., an image record can't exist without a valid licence record, preventing undocumented data.
- **Less redundancy:** licence details are stored once and linked to many images, so updates are consistent.
- **Concurrent multi-user access, with permissions and backups.**

</details>

### H8 Explain why data preprocessing is needed before training an image generator, giving two examples of preprocessing steps. [4]

<details>
<summary>Mark scheme</summary>

- **Why:** raw scraped or collected data is inconsistent and contains problems that the model would learn [1], [1].
- **Examples, [1] each:**
  - resizing/cropping to a fixed resolution
  - normalising pixel values (e.g., to −1…1)
  - removing duplicates (reduces memorisation)
  - filtering low-quality, harmful or watermarked images
  - cleaning and standardising captions
  - augmentation such as flipping

</details>

### H9 (HL) ⚠ Discuss whether Visionary Studios should run its models on its own workstations or on a cloud GPU service. [6]

<details>
<summary>Mark scheme</summary>

Markband [6] (see `01_how_section_B_is_marked.md`). Indicative content:
- **Own hardware:**
  - For: client images and unreleased products never leave the building (confidentiality); no per-image fees once bought; works offline.
  - Against: high upfront cost; limited GPU memory caps resolution and model size; slow for large batches; maintenance.
- **Cloud:**
  - For: scales up for campaign peaks; access to the newest GPUs; pay-as-you-go.
  - Against: ongoing costs that grow with use; client data sent to a third party (contracts, privacy law); needs reliable internet; vendor lock-in.
- **Good conclusion:** a split. Drafts and confidential work run locally; large final batches run in the cloud under data-protection contracts. Revisit as volumes grow.

</details>

---

## I. Extended responses

Mark these with the bands in `01_how_section_B_is_marked.md`. Each lists **indicative content**, **research you could use** and the **trap**. An answer can reach the top band without every point, but not without *weighing*.

### SL 6-mark questions (HL students should also practise these)

#### I1 ★ Discuss whether Visionary Studios should reduce the number of denoising steps to meet tight campaign deadlines. [6]

<details>
<summary>Indicative content</summary>

- **For:**
  - Generation time scales with the number of steps (each is a full network pass), so cutting 1,000 steps to about 50 with DDIM-style samplers cuts time and GPU cost dramatically.
  - More drafts can be shown to clients.
  - Deadlines are met on existing infrastructure.
- **Against:**
  - Fewer steps means less refinement, so detail, photorealism and prompt accuracy can drop.
  - Final advertising assets must meet high output-quality standards and brand consistency.
  - Fixing defects manually wastes the time saved.
- **Weighing / conclusion:** use few steps for exploration and drafts, and full quality for final assets. Or adopt distilled or latent models designed to keep quality at low step counts.
- **Research:** DDIM (10–50× faster); latent diffusion; distillation / consistency models.
- **Trap:** saying "fewer steps = worse" without explaining *why*, or ignoring the studio's two kinds of work.

</details>

#### I2 ★ Discuss whether Visionary Studios should train its image model only on licensed or self-created images. [6]

<details>
<summary>Indicative content</summary>

- **For:**
  - Clear legal permission, so a lower risk of lawsuits (Getty v Stability).
  - Provenance can be documented.
  - Clients get safer outputs, which some providers back with indemnity (Adobe Firefly).
  - It respects artists.
- **Against:**
  - Licensed data is expensive and smaller, so it may be less diverse. That raises *bias* risk and reduces flexibility across styles.
  - The studio may need a pre-trained base model that was itself trained on scraped data.
- **Weighing:** the two challenges pull against each other: IP safety vs dataset diversity and bias.
- **Conclusion example:** "Yes for fine-tuning data, which the studio controls. For the base model, choose one trained on licensed data where quality is sufficient, and audit outputs for bias, because a smaller dataset can narrow representation."

</details>

#### I3 Evaluate the use of diffusion models to produce final advertising assets, rather than only early concept art. [6]

<details>
<summary>Indicative content</summary>

- **Strengths:** photorealism and detail from iterative refinement; text-to-image and conditioning allow precise briefs; training is stable.
- **Limitations:**
  - computational cost per final high-resolution image;
  - product accuracy (the model invents details unless conditioned on real product photos);
  - character/brand consistency needs embeddings and review;
  - IP ownership of outputs may be weak (human authorship);
  - disclosure duties.
- **Judgement:** suitable for final assets when conditioned on real product imagery, reviewed by humans and disclosed. Otherwise better for concept work.

</details>

#### I4 ★ Discuss the ethical implications of using a model trained on web-scraped images for a client's advertising campaign. [6]

<details>
<summary>Indicative content</summary>

- **Benefits of scraped data:** huge variety, cheap, strong capabilities.
- **Ethical issues:**
  - consent and compensation for artists;
  - copyright uncertainty;
  - memorised near-copies (Carlini et al.);
  - harmful content in uncurated sets (the LAION-5B takedown in 2023);
  - learned stereotypes (Bianchi et al.);
  - the client's reputation if exposed.
- **Mitigations:** audits, output similarity checks, disclosure.
- **Conclusion:** for a commercial client, risks fall on someone else's brand, so the studio needs a higher standard than a hobbyist. Prefer licensed or curated models.

</details>

#### I5 To what extent can bias in generated images be eliminated through dataset curation alone? [6]

<details>
<summary>Indicative content</summary>

- **Curation helps:** rebalancing representation; removing stereotyped captions; documentation.
- **Limits:**
  - "neutral" is hard to define;
  - bias also enters through captions, text encoders and prompts;
  - balancing can reduce dataset size;
  - output-level fixes are still needed, and these can over-correct (Gemini, 2024).
- **Judgement:** "to a limited extent". Curation is necessary but not sufficient; it must be combined with output auditing and human review.
- **Trap:** answering "yes, remove biased images" with no "extent" judgement.

</details>

#### I6 Evaluate Visionary Studios' decision to use AI-generated people instead of hiring human models for a campaign. [6]

<details>
<summary>Indicative content</summary>

- **For:** cost and speed; full control over the look; no model-release paperwork.
- **Against:**
  - bias and representation risks;
  - possible resemblance to real people;
  - disclosure duties for realistic synthetic people (EU AI Act Article 50, consumer trust);
  - impact on models' and photographers' livelihoods;
  - public backlash risk (AI ad controversies).
- **Judgement:** depends on product and audience. Prefer disclosed use for stylised or concept work over photorealistic "real-looking" people in consumer adverts.

</details>

#### I7 "Visionary Studios should fine-tune an existing pre-trained model rather than train its own from scratch." Discuss. [6]

<details>
<summary>Indicative content</summary>

- **For:** training from scratch needs huge datasets and months of GPU time beyond the studio's infrastructure. Fine-tuning needs only a small brand dataset and is quick, and it brings character consistency and style adherence via embedding/LoRA methods.
- **Against:**
  - The studio inherits the base model's training data, including its IP and bias problems, which it can't fully audit.
  - It is less control and is dependent on the vendor's licence.
- **Conclusion:** fine-tune, but choose a base model with documented, licensed training data, and audit outputs.

</details>

### HL 12-mark questions

#### J1 ★★ Evaluate whether Visionary Studios should adopt a hybrid model rather than a single diffusion model for its creative work. [12]

<details>
<summary>Indicative content</summary>

**Set up the criteria (from the booklet):** output quality, computational efficiency, training stability, flexibility/scalability, consistency. Then weigh:

- **Single diffusion model:**
  - High quality and diversity.
  - Stable training (simple noise-prediction objective).
  - Flexible conditioning: text, sketches, segmentation maps.
  - **But** slow, compute-heavy iterative sampling. Consistency needs add-ons.
- **Hybrid options, each with a specific gain and cost:**
  - **Latent diffusion (VAE + diffusion):** about 48× fewer values per step, so far cheaper. Detail loss in the autoencoder. *Note: most "diffusion" products already are this hybrid*, which is a strong evaluative insight.
  - **Denoising diffusion GANs / adversarial distillation:** few-step generation. **But** this reintroduces GAN-style instability and some loss of diversity.
  - **VAE component / DiffuseVAE:** a controllable latent for exploring variations and attribute editing, which supports artistic exploration and consistency.
  - **Flow component:** exactness, reproducibility and traceability for clients who need audit trails. **But** heavy memory and compute.
- **Costs of hybridity:**
  - complexity and debugging;
  - multiple training objectives;
  - specialist expertise;
  - harder to explain to clients;
  - the benefit isn't guaranteed.
- **Research:** the generative learning trilemma (Xiao et al. 2022); Stable Diffusion (Rombach et al. 2022); DDGAN; SDXL Turbo (ADD); DiffuseVAE; rectified flow in SD3.
- **Strong conclusion (conditional):** adopt a *latent-diffusion* hybrid as the base, since it's already standard and gives the biggest efficiency gain at little quality cost. Add a distilled or adversarial few-step component only for high-volume drafting where speed matters more than peak quality. Do *not* build a complex custom hybrid unless testing shows the base can't meet consistency or speed targets.

**Traps:**
- Describing four models one after another with no criteria (Adequate max).
- Saying "a hybrid combines the best of everything" (no limitations means one-sided).
- Not noticing that latent diffusion *is* a hybrid.

</details>

#### J2 ★ Discuss how Visionary Studios could manage the computational demands of diffusion models without compromising the output quality its clients expect. [12]

<details>
<summary>Indicative content</summary>

- **Mechanism first:** many sequential passes of a large CNN; resolution; guidance doubling the work.
- **Options, each with a trade-off:**
  - **Fewer-step samplers (DDIM):** big speed-up, slight detail loss at very low step counts.
  - **Latent diffusion:** big per-step saving, autoencoder artefacts.
  - **Distillation / consistency models:** 1–8 steps, retraining effort, possible loss of diversity.
  - **Draft-then-upscale workflow:** cheap exploration, upscaler artefacts.
  - **Hardware:** cloud GPUs vs local, cost vs confidentiality.
  - **Batching and half precision.**
  - **Workflow:** humans choose among cheap drafts before an expensive final render.
- **Measuring "without compromising quality":** blind art-director tests, FID / CLIP score, defect rate. Quality loss must be *measured*, not assumed.
- **Research:** DDPM 1,000 steps; DDIM 10–50×; Rombach et al.; Salimans & Ho; Luccioni et al. on energy.
- **Conclusion:** combine latent diffusion + an efficient sampler for drafts, and a higher-step render only for approved finals. Decide using measured quality thresholds. Compute is managed by *workflow*, not just by technology.

</details>

#### J3 ★ To what extent is a GAN a suitable choice for producing a large, varied advertising campaign? [12]

<details>
<summary>Indicative content</summary>

- **For:** single-pass generation is very fast and cheap per image; sharp, high-quality images (StyleGAN-level faces/products); good within a narrow, well-defined domain.
- **Against:**
  - "Varied" is exactly where GANs struggle: mode collapse reduces diversity.
  - Training instability means costly failed runs.
  - Weak text conditioning compared with diffusion.
  - Hard to cover many styles and products at once.
- **Mitigations and their limits:** WGAN-GP, spectral normalisation, minibatch discrimination. These reduce but don't remove the risk, and add tuning cost.
- **Research:** Goodfellow 2014; Salimans 2016; Arjovsky / Gulrajani 2017; Miyato 2018; Dhariwal & Nichol 2021 ("Diffusion Models Beat GANs").
- **Judgement:** "to a limited extent". Suitable for a narrow, consistent visual domain (e.g., many variants of one product shot). Unsuitable as the main engine for a broad, varied campaign, where diffusion or a hybrid with a few-step component is better.

</details>

#### J4 ★ Evaluate approaches Visionary Studios could use to balance the generator and discriminator during GAN training. [12]

<details>
<summary>Indicative content</summary>

- **Why balance matters:**
  - A discriminator that's too strong means vanishing gradients.
  - One that's too weak means the generator exploits its flaws and mode collapse.
- **Approaches, each with mechanism + cost/limitation:**
  - **Loss changes (WGAN, WGAN-GP):** meaningful gradients; the gradient penalty adds compute.
  - **Constraining the discriminator (spectral normalisation):** cheap; architecture-dependent.
  - **Update schedules / TTUR:** simple; more hyperparameters to tune.
  - **Diversity-aware training (minibatch discrimination, unrolled GANs):** targets collapse; unrolling adds compute.
  - **Noise / augmentation (instance noise, Diffusion-GAN, label smoothing).**
  - **Monitoring:** FID and sample grids, not just losses.
- **Weighing against the studio's limited infrastructure and need for diversity.**
- **Conclusion:** start with spectral normalisation + TTUR (cheap). Escalate to WGAN-GP if instability persists. Always monitor diversity directly. Consider whether a diffusion model makes the problem disappear.

</details>

#### J5 ★ "The legal and ethical risks of training data outweigh the creative benefits of generative AI for a design company." To what extent do you agree, in the case of Visionary Studios? [12]

<details>
<summary>Indicative content</summary>

- **Creative benefits:** speed; exploring more concepts; personalised variants; cost savings; new styles.
- **Risks, with real cases:**
  - IP lawsuits (Getty v Stability, Andersen v Stability);
  - weak copyright in outputs (US Copyright Office 2025);
  - memorised copies (Carlini 2023);
  - harmful or biased data (the LAION-5B takedown; Bianchi 2023);
  - disclosure law (EU AI Act Article 50);
  - reputational backlash (AI ad controversies).
- **Mitigations change the balance:** licensed or curated data (Firefly-style); provenance records; output similarity checks; bias audits; disclosure policy; human creative control (which also strengthens copyright).
- **Judgement:** disagree *if* risks are actively managed; agree for unmanaged, scraped-data use. The risks are real but largely controllable, so the question becomes governance rather than whether to use the technology.
- **Trap:** a one-sided ethics rant (Adequate max), or law presented as the same everywhere.

</details>

#### J6 Evaluate how well diffusion models, GANs, VAEs and flow-based models each meet Visionary Studios' need for consistency across a branded campaign, and recommend an approach. [12]

<details>
<summary>Indicative content</summary>

- **Diffusion:** strong conditioning (text, reference images, embeddings, LoRA, IP-Adapter) gives good character and style consistency with tools. **But** random seeds cause drift, so review is needed.
- **GAN:** consistent within its trained domain; a fixed latent vector reproduces exactly. **But** hard to direct with text, and mode collapse gives the wrong kind of "consistency".
- **VAE:** a structured latent space allows controlled edits of one attribute while keeping the identity; blurrier output.
- **Flow:** exact reproducibility and traceability; lower quality and heavy compute.
- **Recommendation:** a conditional (latent) diffusion model plus an embedding-based approach for characters and style, with fixed seeds and settings for reproducibility, and human review. Possibly a VAE-style latent for controlled variation.

</details>

#### J7 ⚠ Discuss the extent to which Visionary Studios' existing infrastructure, rather than model quality, should determine its generative AI strategy. [12]

<details>
<summary>Indicative content</summary>

- **Infrastructure matters:**
  - GPU memory caps model size and resolution.
  - Diffusion's sequential steps make generation slow on modest hardware.
  - Training from scratch is impossible.
  - Cloud costs scale with volume.
- **But quality matters more to clients:**
  - Adverts must be photorealistic and on-brand.
  - Poor images cost more in rework than compute saves.
  - Infrastructure can be rented or upgraded; reputation can't.
- **Middle ground:** efficiency techniques (latent diffusion, few-step samplers, distillation) shift the trade-off; a hybrid local/cloud workflow.
- **Judgement:** quality should set the *target*, and infrastructure the *method*. Infrastructure is a constraint to engineer around, not the deciding factor.

</details>

#### J8 ⚠ Evaluate whether flow-based models have a meaningful role in a hybrid system for Visionary Studios, given their computational limitations. [12]

<details>
<summary>Indicative content</summary>

- **Value:** exact invertibility gives reproducibility and the ability to trace how an image formed (client audit trails, provenance); exact likelihood (spotting unusual outputs).
- **Limits:** no dimensionality reduction (memory-heavy); restricted architectures; quality historically below diffusion/GANs.
- **Hybrid roles:** flow-based priors inside VAEs; flows as a component for an invertible encoding step.
- **Modern link:** rectified flow / flow matching (Stable Diffusion 3) shows "flow" ideas now power state-of-the-art generators. They're no longer just the slow classical normalising flows.
- **Judgement:** classical normalising flows have a narrow role (auditable, reproducible pipelines). Flow-based *ideas* are central to modern models, so dismissing them entirely would be wrong.
- **Research:** NICE / RealNVP / Glow; Papamakarios review; Bond-Taylor comparative review; Esser et al. 2024.

</details>
