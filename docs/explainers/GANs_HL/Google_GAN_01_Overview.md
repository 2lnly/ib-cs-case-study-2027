Source: https://developers.google.com/machine-learning/gan/gan_structure

![Spark icon](/_static/images/icons/spark.svg)

## Page Summary

outlined_flag

- GANs consist of two neural networks: a generator creating data and a discriminator evaluating its authenticity.

- The generator and discriminator are trained against each other, with the generator aiming to produce realistic data and the discriminator aiming to identify fake data.

- Through continuous training, the generator improves its ability to create realistic data, while the discriminator struggles more with differentiation.

- The ultimate goal is for the generator to create data so realistic that the discriminator cannot distinguish it from real data.

A generative adversarial network (GAN) has two parts:

- The **generator** learns to generate plausible data. The generated instances become negative training examples for the discriminator.
- The **discriminator** learns to distinguish the generator's fake data from real data. The discriminator penalizes the generator for producing implausible results.

When training begins, the generator produces obviously fake data, and the discriminator quickly learns to tell that it's fake:

![Three columns are labeled 'Generated Data', 'Discriminator', and Real Data'. Under 'Generated Data' a blue rectangle contains a squiggle and a circle. The rectangle is the generator's first, bad attempt to draw a dollar bill. Under 'Real Data' there's a picture of a real ten dollar bill. Under 'Discriminator' are the words 'FAKE' and 'REAL'. An arrow points from the word 'FAKE' to the picture under 'Generated Data'. Another arrow points from the word 'REAL' to the picture under 'Real Data'.](/static/machine-learning/gan/images/bad_gan.svg)

As training progresses, the generator gets closer to producing output that can fool the discriminator:

![This image adds a new row under the 'Generated Data', 'Discriminator', and 'Real Data' headings in the previous image. Under 'Generated Data' there is a green rectangle with the number 10 in the upper left corner and a simple drawing of a face. Under 'Real Data' there's a picture of a real 100 dollar bill. Under 'Discriminator' is the word 'FAKE' with an arrow pointing to the picture under 'Generated Data' and the word 'REAL' with an arrow pointing to the picture under 'Real Data'. ](/static/machine-learning/gan/images/ok_gan.svg)

Finally, if generator training goes well, the discriminator gets worse at telling the difference between real and fake. It starts to classify fake data as real, and its accuracy decreases.

![This image adds a new row under the 'Generated Data', 'Discriminator', and 'Real Data' headings in first previous image. Under 'Generated Data' there is a picture of a twenty dollar bill. Under 'Real Data there's a picture of a twenty dollar bill. Under 'Discriminator' is the word 'REAL' with an arrow pointing to the picture under 'Generated Data' and the word 'REAL' with an arrow pointing to the picture under 'Real Data'.](/static/machine-learning/gan/images/good_gan.svg)

Here's a picture of the whole system:

![A diagram of a generative adversarial network. At the center of the diagram is a box labeled 'discriminator'. Two branches feed into this box from the left. The top branch starts at the upper left of the diagram with a cylinder labeled 'real world images'. An arrow leads from this cylinder to a box labeled 'Sample'. An arrow from the box labeled 'Sample' feeds into the 'Discriminator' box. The bottom branch feeds into the 'Discriminator' box starting with a box labeled 'Random Input'. An arrow leads from the 'Random Input' box to a box labeled 'Generator'. An arrow leads from the 'Generator' box to a second 'Sample' box. An arrow leads from the 'Sample' box to the 'Discriminator box. On the right side of the Discriminator box, an arrow leads to a box containing a green circle and a red circle. The word 'Real' appears in green text above the box and the word 'False' appears in red below the box. Two arrows lead from this box to two boxes on the right side of the diagram. One arrow leads to a box labeled 'Discriminator loss'. The other arrow leads to a box labeled 'Generator loss'.](/static/machine-learning/gan/images/gan_diagram.svg)

Both the generator and the discriminator are neural networks. The generator output is connected directly to the discriminator input. Through [backpropagation](/machine-learning/glossary#backpropagation), the discriminator's classification provides a signal that the generator uses to update its weights.

Let's explain the pieces of this system in greater detail.
