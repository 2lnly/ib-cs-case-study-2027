Source: https://developers.google.com/machine-learning/gan/applications

![Spark icon](/_static/images/icons/spark.svg)

## Page Summary

outlined_flag

- Generative Adversarial Networks (GANs) are evolving with new techniques and applications, including progressive growing and conditional generation.

- GANs are capable of diverse tasks such as image-to-image translation (e.g., CycleGANs turning horses into zebras), text-to-image synthesis, and super-resolution.

- They can also be applied to tasks like face inpainting by filling in missing parts of images and even text-to-speech synthesis.

- While impressive, GANs still have limitations, such as difficulty in reproducing fine details and the need for large datasets.

Researchers continue to find improved GAN techniques and new uses for GANs. Here's a sampling of GAN variations to give you a sense of the possibilities.

## Progressive GANs

In a progressive GAN, the generator's first layers produce very low resolution images, and subsequent layers add details. This technique allows the GAN to train more quickly than comparable non-progressive GANs, and produces higher resolution images.

For more information see [Karras et al, 2017](https://arxiv.org/abs/1710.10196).

## Conditional GANs

Conditional GANs train on a labeled data set and let you specify the label for each generated instance. For example, an unconditional MNIST GAN would produce random digits, while a conditional MNIST GAN would let you specify which digit the GAN should generate.

Instead of modeling the joint probability P(X, Y), conditional GANs model the conditional probability P(X \| Y).

For more information about conditional GANs, see [Mirza et al, 2014](https://arxiv.org/abs/1411.1784).
