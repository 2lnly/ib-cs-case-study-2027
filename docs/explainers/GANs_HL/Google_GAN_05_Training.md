Source: https://developers.google.com/machine-learning/gan/training

![Spark icon](/_static/images/icons/spark.svg)

## Page Summary

outlined_flag

- Generative Adversarial Networks (GANs) employ two neural networks, a generator and a discriminator, trained in alternating periods to create realistic data.

- GAN training involves a dynamic where the discriminator learns to distinguish real from fake data, while the generator learns to produce increasingly realistic data to fool the discriminator.

- A key challenge in GAN training is identifying convergence, as the discriminator's performance degrades as the generator improves, potentially leading to unstable training and a collapse in the generator's quality.

- While GANs can solve complex generative problems, their success relies on a balance between the generator and discriminator, with the discriminator providing meaningful feedback to guide the generator's learning.

Because a GAN contains two separately trained networks, its training algorithm must address two complications:

- GANs must juggle two different kinds of training (generator and discriminator).
- GAN convergence is hard to identify.

## Alternating Training

The generator and the discriminator have different training processes. So how do we train the GAN as a whole?

GAN training proceeds in alternating periods:

1.  The discriminator trains for one or more epochs.
2.  The generator trains for one or more epochs.
3.  Repeat steps 1 and 2 to continue to train the generator and discriminator networks.

We keep the generator constant during the discriminator training phase. As discriminator training tries to figure out how to distinguish real data from fake, it has to learn how to recognize the generator's flaws. That's a different problem for a thoroughly trained generator than it is for an untrained generator that produces random output.

Similarly, we keep the discriminator constant during the generator training phase. Otherwise the generator would be trying to hit a moving target and might never converge.

It's this back and forth that allows GANs to tackle otherwise intractable generative problems. We get a toehold in the difficult generative problem by starting with a much simpler classification problem. Conversely, if you can't train a classifier to tell the difference between real and generated data even for the initial random generator output, you can't get the GAN training started.

## Convergence

As the generator improves with training, the discriminator performance gets worse because the discriminator can't easily tell the difference between real and fake. If the generator succeeds perfectly, then the discriminator has a 50% accuracy. In effect, the discriminator flips a coin to make its prediction.

This progression poses a problem for convergence of the GAN as a whole: the discriminator feedback gets less meaningful over time. If the GAN continues training past the point when the discriminator is giving completely random feedback, then the generator starts to train on junk feedback, and its own quality may collapse.

For a GAN, convergence is often a fleeting, rather than stable, state.
