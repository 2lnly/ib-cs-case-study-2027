Source: https://developers.google.com/machine-learning/gan/generator

![Spark icon](/_static/images/icons/spark.svg)

## Page Summary

outlined_flag

- Generative Adversarial Networks (GANs) consist of a generator and a discriminator, where the generator learns to create realistic fake data by incorporating feedback from the discriminator.

- The generator takes random noise as input and transforms it into a meaningful output, aiming to fool the discriminator into classifying it as real.

- Generator training involves backpropagating through both the discriminator and generator to adjust only the generator's weights, while keeping the discriminator's weights fixed.

- The generator is penalized for producing samples that the discriminator classifies as fake, driving it to generate increasingly realistic data.

- The training process involves a continuous interplay between the generator and discriminator, with each trying to outperform the other.

The generator part of a GAN learns to create fake data by incorporating feedback from the discriminator. It learns to make the discriminator classify its output as real.

Generator training requires tighter integration between the generator and the discriminator than discriminator training requires. The portion of the GAN that trains the generator includes:

- random input
- generator network, which transforms the random input into a data instance
- discriminator network, which classifies the generated data
- discriminator output
- generator loss, which penalizes the generator for failing to fool the discriminator

![A diagram of a generative adversarial network. At the center of the diagram is a box labeled 'discriminator'. Two branches feed into this box from the left. The top branch starts at the upper left of the diagram with a box labeled 'real world images'. An arrow leads from this cylinder to a box labeled 'Sample'. An arrow from the box labeled 'Sample' feeds into the 'Discriminator' box. The bottom branch feeds into the 'Discriminator' box starting with a box labeled 'Random Input'. An arrow leads from the 'Random Input' box to a box labeled 'Generator'. An arrow leads from the 'Generator' box to a second 'Sample' box. An arrow leads from the 'Sample' box to the 'Discriminator box. On the right side of the 'Discriminator' box,two arrows lead to two boxes on the right side of the diagram. One arrow leads to a box labeled 'Discriminator loss'. The other arrow leads to a box labeled 'Generator loss'. A yellow box labeled with a left-pointing arrow and the word 'Backpropagation' is drawn around the 'Random Input' box, the 'Generator' box, the bottom 'Sample' box, the 'Discriminator' box, the box labeled with 'Real' and 'Fake', and the 'Generator loss' box to indicate that backpropagation operates on the portion of the system enclosed in the yellow box.](/static/machine-learning/gan/images/gan_diagram_generator.svg)

**Figure 1: Backpropagation in generator training.**

## Random Input

Neural networks need some form of input. Normally we input data that we want to do something with, like an instance that we want to classify or make a prediction about. But what do we use as input for a network that outputs entirely new data instances?

In its most basic form, a GAN takes random noise as its input. The generator then transforms this noise into a meaningful output. By introducing noise, we can get the GAN to produce a wide variety of data, sampling from different places in the target distribution.

Experiments suggest that the distribution of the noise doesn't matter much, so we can choose something that's easy to sample from, like a uniform distribution. For convenience the space from which the noise is sampled is usually of smaller dimension than the dimensionality of the output space.

**Note:** Some GANs use non-random input to shape the output. See [GAN Variations](/machine-learning/gan/applications).

## Using the Discriminator to Train the Generator

To train a neural net, we alter the net's weights to reduce the error or loss of its output. In our GAN, however, the generator is not directly connected to the loss that we're trying to affect. The generator feeds into the discriminator net, and the *discriminator* produces the output we're trying to affect. The generator loss penalizes the generator for producing a sample that the discriminator network classifies as fake.

This extra chunk of network must be included in backpropagation. Backpropagation adjusts each weight in the right direction by calculating the weight's impact on the output — how the output would change if you changed the weight. But the impact of a generator weight depends on the impact of the discriminator weights it feeds into. So backpropagation starts at the output and flows back through the discriminator into the generator.

At the same time, we don't want the discriminator to change during generator training. Trying to hit a moving target would make a hard problem even harder for the generator.

So we train the generator with the following procedure:

1.  Sample random noise.
2.  Produce generator output from sampled random noise.
3.  Get discriminator "Real" or "Fake" classification for generator output.
4.  Calculate loss from discriminator classification.
5.  Backpropagate through both the discriminator and generator to obtain gradients.
6.  Use gradients to change only the generator weights.

This is one iteration of generator training. In the next section we'll see how to juggle the training of both the generator and the discriminator.
