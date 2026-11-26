Source: https://en.wikipedia.org/wiki/Generative_adversarial_network

Machine learning framework

Not to be confused with [Adversarial machine learning](https://en.wikipedia.org/wiki/Adversarial_machine_learning "Adversarial machine learning"), [GaN](https://en.wikipedia.org/wiki/GaN "GaN"), or [Generic Access Network](https://en.wikipedia.org/wiki/Generic_Access_Network "Generic Access Network").

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Generative_adversarial_network.svg/250px-Generative_adversarial_network.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Generative_adversarial_network.svg)

An illustration of how a GAN works

[TABLE]

A **generative adversarial network** (**GAN**) is a class of [machine learning](https://en.wikipedia.org/wiki/Machine_learning "Machine learning") frameworks and a prominent framework for approaching [generative AI](https://en.wikipedia.org/wiki/Generative_AI "Generative AI"). The concept was initially developed by [Ian Goodfellow](https://en.wikipedia.org/wiki/Ian_Goodfellow "Ian Goodfellow") and his colleagues at [Université de Montréal](https://en.wikipedia.org/wiki/Université_de_Montréal "Université de Montréal") in June 2014.^([\[1\]](#cite_note-GANnips-1)) In a GAN, two [neural networks](https://en.wikipedia.org/wiki/Neural_network "Neural network") compete with each other in the form of a [zero-sum game](https://en.wikipedia.org/wiki/Zero-sum_game "Zero-sum game"), where one agent's gain is another agent's loss.

Given a training set, this technique learns to generate new data with the same statistics as the training set. For example, a GAN trained on photographs can generate new photographs that look at least superficially authentic to human observers, having many realistic characteristics. Though originally proposed as a form of [generative model](https://en.wikipedia.org/wiki/Generative_model "Generative model") for [unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning "Unsupervised learning"), GANs have also proved useful for [semi-supervised learning](https://en.wikipedia.org/wiki/Semi-supervised_learning "Semi-supervised learning"),^([\[2\]](#cite_note-ITT_GANs-2)) fully [supervised learning](https://en.wikipedia.org/wiki/Supervised_learning "Supervised learning"),^([\[3\]](#cite_note-3)) and [reinforcement learning](https://en.wikipedia.org/wiki/Reinforcement_learning "Reinforcement learning").^([\[4\]](#cite_note-4))

The core idea of a GAN is based on the "indirect" training through the discriminator, another neural network that can tell how "realistic" the input seems, which itself is also being updated dynamically.^([\[5\]](#cite_note-5)) This means that the generator is not trained to minimize the distance to a specific image, but rather to fool the discriminator. This enables the model to learn in an unsupervised manner.

GANs are similar to [mimicry](https://en.wikipedia.org/wiki/Mimicry "Mimicry") in [evolutionary biology](https://en.wikipedia.org/wiki/Evolutionary_biology "Evolutionary biology"), with an [evolutionary arms race](https://en.wikipedia.org/wiki/Evolutionary_arms_race "Evolutionary arms race") between both networks.

## Definition

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=1 "Edit section: Definition")\]

### Mathematical

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=2 "Edit section: Mathematical")\]

The original GAN is defined as the following [game](https://en.wikipedia.org/wiki/Game_theory "Game theory"):^([\[1\]](#cite_note-GANnips-1))

> Each [probability space](https://en.wikipedia.org/wiki/Probability_space "Probability space") $(\Omega,\mu_{\text{ref}})$ defines a GAN game.
>
> There are 2 players: generator and discriminator.
>
> The generator's [strategy set](https://en.wikipedia.org/wiki/Strategy_(game_theory) "Strategy (game theory)") is $\mathcal{P}(\Omega)$, the set of all probability measures $\mu_{G}$ on $\Omega$.
>
> The discriminator's strategy set is the set of [Markov kernels](https://en.wikipedia.org/wiki/Markov_kernel "Markov kernel") $\mu_{D}:\Omega\rightarrow\mathcal{P}\lbrack 0,1\rbrack$, where $\mathcal{P}\lbrack 0,1\rbrack$ is the set of probability measures on $\lbrack 0,1\rbrack$.
>
> The GAN game is a [zero-sum game](https://en.wikipedia.org/wiki/Zero-sum_game "Zero-sum game"), with objective function$$L(\mu_{G},\mu_{D}):=E_{x \sim \mu_{\text{ref}},y \sim \mu_{D}(x)}\lbrack\ln y\rbrack + E_{x \sim \mu_{G},y \sim \mu_{D}(x)}\lbrack\ln(1 - y)\rbrack.$$ The generator aims to minimize the objective, and the discriminator aims to maximize the objective.

The generator's task is to approach $\mu_{G} \approx \mu_{\text{ref}}$, that is, to match its own output distribution as closely as possible to the reference distribution. The discriminator's task is to output a value close to 1 when the input appears to be from the reference distribution, and to output a value close to 0 when the input looks like it came from the generator distribution.

### In practice

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=3 "Edit section: In practice")\]

The [*generative* network](https://en.wikipedia.org/wiki/Generative_model "Generative model") generates candidates while the [*discriminative* network](https://en.wikipedia.org/wiki/Discriminative_model "Discriminative model") evaluates them.^([\[1\]](#cite_note-GANnips-1)) This creates a contest based on data distributions, where the generator learns to map from a [latent space](https://en.wikipedia.org/wiki/Latent_space "Latent space") to the true data distribution, aiming to produce candidates that the discriminator cannot distinguish from real data. The discriminator's goal is to correctly identify these candidates, but as the generator improves, its task becomes more challenging, increasing the discriminator's error rate.^([\[1\]](#cite_note-GANnips-1)[\[6\]](#cite_note-6))

A known dataset serves as the initial training data for the discriminator. Training involves presenting it with samples from the training dataset until it achieves acceptable accuracy. The generator is trained based on whether it succeeds in fooling the discriminator. Typically, the generator is seeded with randomized input that is sampled from a predefined [latent space](https://en.wikipedia.org/wiki/Latent_space "Latent space") (e.g. a [multivariate normal distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution "Multivariate normal distribution")). Thereafter, candidates synthesized by the generator are evaluated by the discriminator. Independent [backpropagation](https://en.wikipedia.org/wiki/Backpropagation "Backpropagation") procedures are applied to both networks so that the generator produces better samples, while the discriminator becomes more skilled at flagging synthetic samples.^([\[7\]](#cite_note-OpenAI_com-7)) When used for image generation, the generator is typically a [deconvolutional neural network](https://en.wikipedia.org/wiki/Deconvolutional_neural_network "Deconvolutional neural network"), and the discriminator is a [convolutional neural network](https://en.wikipedia.org/wiki/Convolutional_neural_network "Convolutional neural network").

### Relation to other statistical machine learning methods

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=4 "Edit section: Relation to other statistical machine learning methods")\]

GANs are **implicit generative models**,^([\[8\]](#cite_note-8)) which means that they do not explicitly model the likelihood function nor provide a means for finding the latent variable corresponding to a given sample, unlike alternatives such as [flow-based generative model](https://en.wikipedia.org/wiki/Flow-based_generative_model "Flow-based generative model").

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Types_of_deep_generative_models.png/250px-Types_of_deep_generative_models.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Types_of_deep_generative_models.png)

Main types of deep generative models that perform maximum likelihood estimation^([\[9\]](#cite_note-:5-9))

Compared to fully visible belief networks such as [WaveNet](https://en.wikipedia.org/wiki/WaveNet "WaveNet") and PixelRNN and autoregressive models in general, GANs can generate one complete sample in one pass, rather than multiple passes through the network.

Compared to [Boltzmann machines](https://en.wikipedia.org/wiki/Boltzmann_machine "Boltzmann machine") and linear [ICA](https://en.wikipedia.org/wiki/Independent_component_analysis "Independent component analysis"), there is no restriction on the type of function used by the network.

Since neural networks are [universal approximators](https://en.wikipedia.org/wiki/Universal_approximation_theorem "Universal approximation theorem"), GANs are [asymptotically consistent](https://en.wikipedia.org/wiki/Asymptotic_theory_(statistics)#Consistency "Asymptotic theory (statistics)"). As of 2026, [variational autoencoders](https://en.wikipedia.org/wiki/Variational_autoencoder "Variational autoencoder") have been proven to be universal approximators.^([\[10\]](#cite_note-KingmaWelling2019-10))

## Mathematical properties

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=5 "Edit section: Mathematical properties")\]

### Measure-theoretic considerations

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=6 "Edit section: Measure-theoretic considerations")\]

This section provides some of the mathematical theory behind these methods.

In [modern probability theory](https://en.wikipedia.org/wiki/Probability_axioms "Probability axioms") based on [measure theory](https://en.wikipedia.org/wiki/Measure_theory "Measure theory"), a probability space also needs to be equipped with a [σ-algebra](https://en.wikipedia.org/wiki/Σ-algebra "Σ-algebra"). As a result, a more rigorous definition of the GAN game would make the following changes:

> Each probability space $(\Omega,\mathcal{B},\mu_{\text{ref}})$ defines a GAN game.
>
> The generator's strategy set is $\mathcal{P}(\Omega,\mathcal{B})$, the set of all probability measures $\mu_{G}$ on the measure-space $(\Omega,\mathcal{B})$.
>
> The discriminator's strategy set is the set of [Markov kernels](https://en.wikipedia.org/wiki/Markov_kernel "Markov kernel") $\mu_{D}:(\Omega,\mathcal{B})\rightarrow\mathcal{P}(\lbrack 0,1\rbrack,\mathcal{B}(\lbrack 0,1\rbrack))$, where $\mathcal{B}(\lbrack 0,1\rbrack)$ is the [Borel σ-algebra](https://en.wikipedia.org/wiki/Borel_Algebra "Borel Algebra") on $\lbrack 0,1\rbrack$.

Since issues of measurability never arise in practice, these will not concern us further.

### Choice of the strategy set

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=7 "Edit section: Choice of the strategy set")\]

In the most generic version of the GAN game described above, the strategy set for the discriminator contains all Markov kernels $\mu_{D}:\Omega\rightarrow\mathcal{P}\lbrack 0,1\rbrack$, and the strategy set for the generator contains arbitrary [probability distributions](https://en.wikipedia.org/wiki/Probability_distribution "Probability distribution") $\mu_{G}$ on $\Omega$.

However, as shown below, the optimal discriminator strategy against any $\mu_{G}$ is deterministic, so there is no loss of generality in restricting the discriminator's strategies to deterministic functions $D:\Omega\rightarrow\lbrack 0,1\rbrack$. In most applications, $D$ is a [deep neural network](https://en.wikipedia.org/wiki/Deep_neural_network "Deep neural network") function.

As for the generator, while $\mu_{G}$ could theoretically be any computable probability distribution, in practice, it is usually implemented as a [pushforward](https://en.wikipedia.org/wiki/Pushforward_measure "Pushforward measure"): $\mu_{G} = \mu_{Z} \circ G^{- 1}$. That is, start with a random variable $z \sim \mu_{Z}$, where $\mu_{Z}$ is a probability distribution that is easy to compute (such as the [uniform distribution](https://en.wikipedia.org/wiki/Continuous_uniform_distribution "Continuous uniform distribution"), or the [Gaussian distribution](https://en.wikipedia.org/wiki/Normal_distribution "Normal distribution")), then define a function $G:\Omega_{Z}\rightarrow\Omega$. Then the distribution $\mu_{G}$ is the distribution of $G(z)$.

Consequently, the generator's strategy is usually defined as just $G$, leaving $z \sim \mu_{Z}$ implicit. In this formalism, the GAN game objective is$$L(G,D):=E_{x \sim \mu_{\text{ref}}}\lbrack\ln D(x)\rbrack + E_{z \sim \mu_{Z}}\lbrack\ln(1 - D(G(z)))\rbrack.$$

### Generative reparametrization

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=8 "Edit section: Generative reparametrization")\]

The GAN architecture has two main components. One is casting optimization into a game, of form $\min\limits_{G}\max\limits_{D}L(G,D)$, which is different from the usual kind of optimization, of form $\min\limits_{\theta}L(\theta)$. The other is the decomposition of $\mu_{G}$ into $\mu_{Z} \circ G^{- 1}$, which can be understood as a reparametrization trick.

To see its significance, one must compare GAN with previous methods for learning generative models, which were plagued with "intractable probabilistic computations that arise in maximum likelihood estimation and related strategies".^([\[1\]](#cite_note-GANnips-1))

At the same time, Kingma and Welling^([\[11\]](#cite_note-11)) and Rezende et al.^([\[12\]](#cite_note-12)) developed the same idea of reparametrization into a general stochastic backpropagation method. Among its first applications was the [variational autoencoder](https://en.wikipedia.org/wiki/Variational_autoencoder "Variational autoencoder").

### Move order and strategic equilibria

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=9 "Edit section: Move order and strategic equilibria")\]

In the original paper, as well as most subsequent papers, it is usually assumed that the generator *moves first*, and the discriminator *moves second*, thus giving the following minimax game:$$\min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D}):=E_{x \sim \mu_{\text{ref}},y \sim \mu_{D}(x)}\lbrack\ln y\rbrack + E_{x \sim \mu_{G},y \sim \mu_{D}(x)}\lbrack\ln(1 - y)\rbrack.$$

If both the generator's and the discriminator's strategy sets are spanned by a finite number of strategies, then by the [minimax theorem](https://en.wikipedia.org/wiki/Minimax_theorem "Minimax theorem"),$$\min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D}) = \max\limits_{\mu_{D}}\min\limits_{\mu_{G}}L(\mu_{G},\mu_{D})$$that is, the move order does not matter.

However, since the strategy sets are both not finitely spanned, the minimax theorem does not apply, and the idea of an "equilibrium" becomes delicate. To wit, there are the following different concepts of equilibrium:

- Equilibrium when generator moves first, and discriminator moves second:$${\widehat{\mu}}_{G} \in \arg\min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D}),\quad{\widehat{\mu}}_{D} \in \arg\max\limits_{\mu_{D}}L({\widehat{\mu}}_{G},\mu_{D}),\quad$$
- Equilibrium when discriminator moves first, and generator moves second:$${\widehat{\mu}}_{D} \in \arg\max\limits_{\mu_{D}}\min\limits_{\mu_{G}}L(\mu_{G},\mu_{D}),\quad{\widehat{\mu}}_{G} \in \arg\min\limits_{\mu_{G}}L(\mu_{G},{\widehat{\mu}}_{D}),$$
- [Nash equilibrium](https://en.wikipedia.org/wiki/Nash_equilibrium "Nash equilibrium") $({\widehat{\mu}}_{D},{\widehat{\mu}}_{G})$, which is stable under simultaneous move order:$${\widehat{\mu}}_{D} \in \arg\max\limits_{\mu_{D}}L({\widehat{\mu}}_{G},\mu_{D}),\quad{\widehat{\mu}}_{G} \in \arg\min\limits_{\mu_{G}}L(\mu_{G},{\widehat{\mu}}_{D})$$

For general games, these equilibria do not have to agree, or even to exist. For the original GAN game, these equilibria all exist, and are all equal. However, for more general GAN games, these do not necessarily exist, or agree.^([\[13\]](#cite_note-:2-13))

### Main theorems for GAN game

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=10 "Edit section: Main theorems for GAN game")\]

The original GAN paper proved the density-based optimal-discriminator formula and global minimax optimum.^([\[1\]](#cite_note-GANnips-1)) A measure-theoretic treatment gives the same binary adversarial calculation using Radon–Nikodym derivatives.^([\[14\]](#cite_note-BiGANmeasure-14))

**Theorem** (the optimal discriminator computes the Jensen–Shannon divergence)—For any fixed generator strategy $\mu_{G}$, let $D^{\ast} \in \arg\max\limits_{D}L(\mu_{G},D)$ be an optimal deterministic discriminator. Then

$$\begin{matrix}
{D^{\ast}(x)} & {= \frac{d\mu_{\text{ref}}}{d(\mu_{\text{ref}} + \mu_{G})}\quad(\mu_{\text{ref}} + \mu_{G})\text{-almost everywhere}} \\
{L(\mu_{G},D^{\ast})} & {= 2D_{JS}(\mu_{\text{ref}};\mu_{G}) - 2\ln 2}
\end{matrix}$$

where the derivative is the [Radon–Nikodym derivative](https://en.wikipedia.org/wiki/Radon–Nikodym_derivative "Radon–Nikodym derivative"), and $D_{JS}$ is the [Jensen–Shannon divergence](https://en.wikipedia.org/wiki/Jensen–Shannon_divergence "Jensen–Shannon divergence").^([\[15\]](#cite_note-Kallenberg2021-15))

**Proof**

By Jensen's inequality,

$$E_{x \sim \mu_{\text{ref}},y \sim \mu_{D}(x)}\lbrack\ln y\rbrack \leq E_{x \sim \mu_{\text{ref}}}\lbrack\ln E_{y \sim \mu_{D}(x)}\lbrack y\rbrack\rbrack$$ and similarly for the other term. The endpoint cases follow by applying Jensen's inequality to $\ln(y + \varepsilon)$ and $\ln(1 - y + \varepsilon)$ and letting $\varepsilon \downarrow 0$. The kernel mean is measurable, so replacing $\mu_{D}(x)$ by the deterministic kernel at its mean cannot decrease the discriminator's payoff.^([\[15\]](#cite_note-Kallenberg2021-15)[\[16\]](#cite_note-BergerRandomization-16)) Thus an optimal reply can be written as $\mu_{D}(x) = \delta_{D(x)}$ for a measurable function $D:\Omega\rightarrow\lbrack 0,1\rbrack$, in which case

$$L(\mu_{G},\mu_{D}):=E_{x \sim \mu_{\text{ref}}}\lbrack\ln D(x)\rbrack + E_{x \sim \mu_{G}}\lbrack\ln(1 - D(x))\rbrack.$$

To define suitable density functions, we define a base measure $\mu:=\mu_{\text{ref}} + \mu_{G}$, which allows us to take the Radon–Nikodym derivatives

$$\rho_{\text{ref}} = \frac{d\mu_{\text{ref}}}{d\mu}\quad\rho_{G} = \frac{d\mu_{G}}{d\mu}$$ with $\rho_{\text{ref}} + \rho_{G} = 1$ $\mu$-almost everywhere.

We then have

$$L(\mu_{G},\mu_{D}):=\int\mu(dx)\left\lbrack \rho_{\text{ref}}(x)\ln(D(x)) + \rho_{G}(x)\ln(1 - D(x)) \right\rbrack.$$

The integrand is just the negative [cross-entropy](https://en.wikipedia.org/wiki/Cross-entropy "Cross-entropy") between two Bernoulli random variables with parameters $\rho_{\text{ref}}(x)$ and $D(x)$. We can write this as $- H(\rho_{\text{ref}}(x)) - D_{KL}(\rho_{\text{ref}}(x) \parallel D(x))$, where $H$ is the [binary entropy function](https://en.wikipedia.org/wiki/Binary_entropy_function "Binary entropy function"), so

$$L(\mu_{G},\mu_{D}) = - \int\mu(dx)(H(\rho_{\text{ref}}(x)) + D_{KL}(\rho_{\text{ref}}(x) \parallel D(x))).$$

This means that the optimal strategy for the discriminator is $D(x) = \rho_{\text{ref}}(x)$ $\mu$-almost everywhere, with $$L(\mu_{G},\mu_{D}^{\ast}) = - \int\mu(dx)H(\rho_{\text{ref}}(x)) = 2D_{JS}(\mu_{\text{ref}} \parallel \mu_{G}) - 2\ln 2$$

after routine calculation.

**Interpretation**: For any fixed generator strategy $\mu_{G}$, the optimal discriminator keeps track of the likelihood ratio between the reference distribution and the generator distribution. Since $D^{\ast} = \rho_{\text{ref}}$ and $1 - D^{\ast} = \rho_{G}$, $$\frac{D^{\ast}(x)}{1 - D^{\ast}(x)} = \frac{\rho_{\text{ref}}(x)}{\rho_{G}(x)}\quad\mu\text{-almost everywhere on~}\{\rho_{G} > 0\}.$$ On $\{\rho_{G} = 0\}$, $D^{\ast} = 1$; on $\{\rho_{\text{ref}} = 0\}$, $D^{\ast} = 0$, in each case $\mu$-almost everywhere. If $\mu_{\text{ref}} \ll \mu_{G}$, the displayed ratio is a version of $d\mu_{\text{ref}}/d\mu_{G}$ $\mu_{G}$-almost everywhere. Where both densities are positive, $$D^{\ast}(x) = \sigma\left( \ln\rho_{\text{ref}}(x) - \ln\rho_{G}(x) \right)\quad\mu\text{-almost everywhere},$$ where $\sigma$ is the [logistic function](https://en.wikipedia.org/wiki/Logistic_function "Logistic function"). In the equal-prior mixture model $M = (\mu_{\text{ref}} + \mu_{G})/2$, $D^{\ast}$ is a version of the posterior probability that an observation came from the reference distribution, $M$-almost everywhere.^([\[15\]](#cite_note-Kallenberg2021-15))

**Theorem** (an equilibrium point)—For the unrestricted GAN game defined above, there exists a pair $({\widehat{\mu}}_{D},{\widehat{\mu}}_{G})$ that is both a saddle point and a Nash equilibrium:^([\[1\]](#cite_note-GANnips-1)[\[13\]](#cite_note-:2-13))

$$\begin{matrix}
 & {L({\widehat{\mu}}_{G},{\widehat{\mu}}_{D}) = \min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D}) =} & {\max\limits_{\mu_{D}}\inf\limits_{\mu_{G}}L(\mu_{G},\mu_{D}) = - 2\ln 2} \\
 & {{\widehat{\mu}}_{D} \in \arg\max\limits_{\mu_{D}}\inf\limits_{\mu_{G}}L(\mu_{G},\mu_{D}),} & {\quad{\widehat{\mu}}_{G} \in \arg\min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D})} \\
 & {{\widehat{\mu}}_{D} \in \arg\max\limits_{\mu_{D}}L({\widehat{\mu}}_{G},\mu_{D}),} & {\quad{\widehat{\mu}}_{G} \in \arg\min\limits_{\mu_{G}}L(\mu_{G},{\widehat{\mu}}_{D})} \\
 & {\forall x \in \Omega,{\widehat{\mu}}_{D}(x) = \delta_{\frac{1}{2}},} & {\quad{\widehat{\mu}}_{G} = \mu_{\text{ref}}}
\end{matrix}$$

That is, the generator perfectly mimics the reference, and the discriminator outputs $\frac{1}{2}$ deterministically on all inputs.

**Proof**

From the previous theorem,

$$\arg\min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D}) = \{\mu_{\text{ref}}\};\quad\min\limits_{\mu_{G}}\max\limits_{\mu_{D}}L(\mu_{G},\mu_{D}) = - 2\ln 2.$$

For any fixed discriminator strategy $\mu_{D}$, $$\inf\limits_{\mu_{G}}L(\mu_{G},\mu_{D}) = E_{x \sim \mu_{\text{ref}},\, y \sim \mu_{D}(x)}\lbrack\ln y\rbrack + \inf\limits_{x \in \Omega}E_{y \sim \mu_{D}(x)}\lbrack\ln(1 - y)\rbrack.$$ Thus, $$\arg\max\limits_{\mu_{D}}\inf\limits_{\mu_{G}}L(\mu_{G},\mu_{D}) = \arg\max\limits_{\mu_{D}}E_{x \sim \mu_{\text{ref}},y \sim \mu_{D}(x)}\lbrack\ln y\rbrack + \inf\limits_{x}E_{y \sim \mu_{D}(x)}\lbrack\ln(1 - y)\rbrack.$$

By Jensen's inequality, the discriminator can only improve by adopting the deterministic strategy of always playing $D(x) = E_{y \sim \mu_{D}(x)}\lbrack y\rbrack$.^([\[15\]](#cite_note-Kallenberg2021-15)[\[16\]](#cite_note-BergerRandomization-16)) Therefore,

$$\arg\max\limits_{\mu_{D}}\inf\limits_{\mu_{G}}L(\mu_{G},\mu_{D}) = \arg\max\limits_{D}E_{x \sim \mu_{\text{ref}}}\lbrack\ln D(x)\rbrack + \inf\limits_{x}\ln(1 - D(x))$$

By Jensen's inequality,

$$\begin{matrix}
 & {E_{x \sim \mu_{\text{ref}}}\lbrack\ln D(x)\rbrack + \inf\limits_{x}\ln(1 - D(x))} \\
 \leq & {\ln E_{x \sim \mu_{\text{ref}}}\lbrack D(x)\rbrack + \inf\limits_{x}\ln(1 - D(x))} \\
 = & {\ln E_{x \sim \mu_{\text{ref}}}\lbrack D(x)\rbrack + \ln(1 - \sup\limits_{x}D(x))} \\
 = & {\ln\lbrack E_{x \sim \mu_{\text{ref}}}\lbrack D(x)\rbrack(1 - \sup\limits_{x}D(x))\rbrack \leq \ln\lbrack\sup\limits_{x}D(x)(1 - \sup\limits_{x}D(x))\rbrack \leq \ln\frac{1}{4},}
\end{matrix}$$

with equality if $D(x) = \frac{1}{2}$, so

$$\forall x \in \Omega,{\widehat{\mu}}_{D}(x) = \delta_{\frac{1}{2}};\quad\max\limits_{\mu_{D}}\inf\limits_{\mu_{G}}L(\mu_{G},\mu_{D}) = - 2\ln 2.$$

Finally, to check that this is a Nash equilibrium, note that when $\mu_{G} = \mu_{\text{ref}}$, we have

$$L(\mu_{G},\mu_{D}):=E_{x \sim \mu_{\text{ref}},y \sim \mu_{D}(x)}\lbrack\ln(y(1 - y))\rbrack$$ which is always maximized by $y = \frac{1}{2}$.

When $\forall x \in \Omega,\mu_{D}(x) = \delta_{\frac{1}{2}}$, any strategy is optimal for the generator.

## Training and evaluating GAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=11 "Edit section: Training and evaluating GAN")\]

### Training

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=12 "Edit section: Training")\]

#### Unstable convergence

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=13 "Edit section: Unstable convergence")\]

While the GAN game has a unique global equilibrium point when both the generator and discriminator have access to their entire strategy sets, the equilibrium is no longer guaranteed when they have a restricted strategy set.^([\[13\]](#cite_note-:2-13))

In practice, the generator has access only to measures of form $\mu_{Z} \circ G_{\theta}^{- 1}$, where $G_{\theta}$ is a function computed by a neural network with parameters $\theta$, and $\mu_{Z}$ is an easily sampled distribution, such as the uniform or normal distribution. Similarly, the discriminator has access only to functions of form $D_{\zeta}$, a function computed by a neural network with parameters $\zeta$. These restricted strategy sets take up a *vanishingly small proportion* of their entire strategy sets.^([\[17\]](#cite_note-:3-17))

Further, even if an equilibrium still exists, it can only be found by searching in the high-dimensional space of all possible neural network functions. The standard strategy of using [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent "Gradient descent") to find the equilibrium often does not work for GAN, and often the game "collapses" into one of several failure modes. To improve the convergence stability, some training strategies start with an easier task, such as generating low-resolution images^([\[18\]](#cite_note-:1-18)) or simple images (one object with uniform background),^([\[19\]](#cite_note-19)) and gradually increase the difficulty of the task during training. This essentially translates to applying a curriculum learning scheme.^([\[20\]](#cite_note-20))

#### Mode collapse

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=14 "Edit section: Mode collapse")\]

Main article: [Mode collapse](https://en.wikipedia.org/wiki/Mode_collapse "Mode collapse")

GANs often suffer from **mode collapse** where they fail to generalize properly, missing entire modes from the input data. For example, a GAN trained on the [MNIST](https://en.wikipedia.org/wiki/MNIST "MNIST") dataset containing many samples of each digit might only generate pictures of digit 0. This was termed "the Helvetica scenario".^([\[1\]](#cite_note-GANnips-1))

A typical mechanism for mode collapse is the generator only generating one or a few of the likely values, or a very incomplete picture of the target distribution. As the discriminator is only trained to distinguish real from fake samples, it will correctly identify the generated samples as real, but no penalty is imposed on the GAN's ability to generate data that represents the full range of the target distribution.

Weak discriminators, for instance underparametrized ones, or ones trained too slow compared to the generator, may as well be unable to fully discriminate over the entire support of the distribution, and only become able to correctly discriminate a very incomplete part of the target distribution.

Some researchers perceive the root problem to be a weak discriminative network that fails to notice the pattern of omission, while others assign blame to a bad choice of [objective function](https://en.wikipedia.org/wiki/Objective_function "Objective function"). Many solutions have been proposed, but it is still an open problem.^([\[21\]](#cite_note-21)[\[22\]](#cite_note-22))

Even the state-of-the-art architecture, BigGAN (2019), could not avoid mode collapse. The authors resorted to "allowing collapse to occur at the later stages of training, by which time a model is sufficiently trained to achieve good results".^([\[23\]](#cite_note-:0-23))

#### Two time-scale update rule

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=15 "Edit section: Two time-scale update rule")\]

The **two time-scale update rule (TTUR)** is proposed to make GAN convergence more stable by making the learning rate of the generator lower than that of the discriminator. They prove that when trained this way, GANs "converge, under mild assumptions to a stationary local Nash equilibrium".^([\[24\]](#cite_note-24)) They further show that this property extends to the use of the Adam optimizer, which is commonly used in stochastic gradient descent.

A local Nash equilibrium in no way signifies an absence of mode collapse - for instance, a GAN trained on MNIST collapsed to generating a single digit may satisfy the hypotheses of the paper, while still presenting mode collapse.

#### Vanishing gradient

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=16 "Edit section: Vanishing gradient")\]

Conversely, if the discriminator learns too fast compared to the generator, then the discriminator could almost perfectly distinguish $\mu_{G_{\theta}},\mu_{\text{ref}}$. In such case, the generator $G_{\theta}$ could be stuck with a very high loss no matter which direction it changes its $\theta$, meaning that the gradient $\nabla_{\theta}L(G_{\theta},D_{\zeta})$ would be close to zero. In such case, the generator cannot learn, a case of the [**vanishing gradient** problem](https://en.wikipedia.org/wiki/Vanishing_gradient_problem "Vanishing gradient problem").^([\[17\]](#cite_note-:3-17))

Intuitively speaking, the discriminator is too good, and since the generator cannot take any small step (only small steps are considered in gradient descent) to improve its payoff, it does not even try.

One important method for solving this problem is the [Wasserstein GAN](https://en.wikipedia.org/wiki/Wasserstein_GAN "Wasserstein GAN").

### Evaluation

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=17 "Edit section: Evaluation")\]

GANs are usually evaluated by [Inception score](https://en.wikipedia.org/wiki/Inception_score "Inception score") (IS), which measures how varied the generator's outputs are (as classified by an image classifier, usually [Inception-v3](https://en.wikipedia.org/wiki/Inceptionv3 "Inceptionv3")), or [Fréchet inception distance](https://en.wikipedia.org/wiki/Fréchet_inception_distance "Fréchet inception distance") (FID), which measures how similar the generator's outputs are to a reference set (as classified by a learned image featurizer, such as Inception-v3 without its final layer). Many papers that propose new GAN architectures for image generation report how their architectures break the [state of the art](https://en.wikipedia.org/wiki/State_of_the_art "State of the art") on FID or IS.

Another evaluation method is the Learned Perceptual Image Patch Similarity (LPIPS), which starts with a learned image featurizer $f_{\theta}:\text{Image}\rightarrow{\mathbb{R}}^{n}$, and finetunes it by supervised learning on a set of $(x,x^{\prime},{perceptual\sim difference}(x,x^{\prime}))$, where $x$ is an image, $x^{\prime}$ is a perturbed version of it, and ${perceptual\sim difference}(x,x^{\prime})$ is how much they differ, as reported by human subjects. The model is finetuned so that it can approximate $\| f_{\theta}(x) - f_{\theta}(x^{\prime})\| \approx {perceptual\sim difference}(x,x^{\prime})$. This finetuned model is then used to define ${LPIPS}(x,x^{\prime}):=\| f_{\theta}(x) - f_{\theta}(x^{\prime})\|$.^([\[25\]](#cite_note-25))

Other evaluation methods are reviewed in.^([\[26\]](#cite_note-26))

## Variants

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=18 "Edit section: Variants")\]

There is a veritable zoo of GAN variants.^([\[27\]](#cite_note-27)) Some of the most prominent are as follows:

### Conditional GAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=19 "Edit section: Conditional GAN")\]

Conditional GANs are similar to standard GANs except they allow the model to conditionally generate samples based on additional information. For example, if we want to generate a cat face given a dog picture, we could use a conditional GAN.

The generator in a GAN game generates $\mu_{G}$, a probability distribution on the probability space $\Omega$. This leads to the idea of a conditional GAN, where instead of generating one probability distribution on $\Omega$, the generator generates a different probability distribution $\mu_{G}(c)$ on $\Omega$, for each given class label $c$.

For example, for generating images that look like [ImageNet](https://en.wikipedia.org/wiki/ImageNet "ImageNet"), the generator should be able to generate a picture of cat when given the class label "cat".

In the original paper,^([\[1\]](#cite_note-GANnips-1)) the authors noted that GAN can be trivially extended to conditional GAN by providing the labels to both the generator and the discriminator.

Concretely, the conditional GAN game is just the GAN game with class labels provided:$$L(\mu_{G},D):=E_{c \sim \mu_{C},x \sim \mu_{\text{ref}}(c)}\lbrack\ln D(x,c)\rbrack + E_{c \sim \mu_{C},x \sim \mu_{G}(c)}\lbrack\ln(1 - D(x,c))\rbrack$$where $\mu_{C}$ is a probability distribution over classes, $\mu_{\text{ref}}(c)$ is the probability distribution of real images of class $c$, and $\mu_{G}(c)$ the probability distribution of images generated by the generator when given class label $c$.

In 2017, a conditional GAN learned to generate 1000 image classes of [ImageNet](https://en.wikipedia.org/wiki/ImageNet "ImageNet").^([\[28\]](#cite_note-28))

### GANs with alternative architectures

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=20 "Edit section: GANs with alternative architectures")\]

The GAN game is a general framework and can be run with any reasonable parametrization of the generator $G$ and discriminator $D$. In the original paper, the authors demonstrated it using [multilayer perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron "Multilayer perceptron") networks and [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network "Convolutional neural network"). Many alternative architectures have been tried.

**Deep convolutional GAN (DCGAN):**^([\[29\]](#cite_note-29)) For both generator and discriminator, uses only deep networks consisting entirely of convolution-deconvolution layers, that is, fully convolutional networks.^([\[30\]](#cite_note-30))

**Self-attention GAN (SAGAN):**^([\[31\]](#cite_note-31)) Starts with the DCGAN, then adds residually-connected standard [self-attention modules](https://en.wikipedia.org/wiki/Attention_mechanism "Attention mechanism") to the generator and discriminator.

**Variational autoencoder GAN (VAEGAN):^([\[32\]](#cite_note-32))** Uses a [variational autoencoder](https://en.wikipedia.org/wiki/Variational_autoencoder "Variational autoencoder") (VAE) for the generator.

**Transformer GAN (TransGAN):**^([\[33\]](#cite_note-33)) Uses the pure [transformer](https://en.wikipedia.org/wiki/Transformer_(machine_learning_model) "Transformer (machine learning model)") architecture for both the generator and discriminator, entirely devoid of convolution-deconvolution layers.

**Flow-GAN:**^([\[34\]](#cite_note-34)) Uses [flow-based generative model](https://en.wikipedia.org/wiki/Flow-based_generative_model "Flow-based generative model") for the generator, allowing efficient computation of the likelihood function.

### GANs with alternative objectives

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=21 "Edit section: GANs with alternative objectives")\]

Many GAN variants are merely obtained by changing the loss functions for the generator and discriminator.

**Original GAN:**

We recast the original GAN objective into a form more convenient for comparison:$$\left\{ \begin{matrix}
{\min_{D}L_{D}(D,\mu_{G}) = - E_{x \sim \mu_{G}}\lbrack\ln D(x)\rbrack - E_{x \sim \mu_{\text{ref}}}\lbrack\ln(1 - D(x))\rbrack} \\
{\min_{G}L_{G}(D,\mu_{G}) = - E_{x \sim \mu_{G}}\lbrack\ln(1 - D(x))\rbrack}
\end{matrix} \right.$$

**Original GAN, non-saturating loss:**

This objective for generator was recommended in the original paper for faster convergence.^([\[1\]](#cite_note-GANnips-1))$$L_{G} = E_{x \sim \mu_{G}}\lbrack\ln D(x)\rbrack$$The effect of using this objective is analyzed in Section 2.2.2 of Arjovsky et al.^([\[35\]](#cite_note-35))

**Original GAN, maximum likelihood:**

$$L_{G} = E_{x \sim \mu_{G}}\lbrack(\exp \circ \sigma^{- 1} \circ D)(x)\rbrack$$where $\sigma$ is the logistic function. When the discriminator is optimal, the generator gradient is the same as in [maximum likelihood estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation "Maximum likelihood estimation"), even though GAN cannot perform maximum likelihood estimation *itself*.^([\[36\]](#cite_note-36)[\[37\]](#cite_note-37))

**[Hinge loss](https://en.wikipedia.org/wiki/Hinge_loss "Hinge loss") GAN**:^([\[38\]](#cite_note-38))$$L_{D} = - E_{x \sim p_{\text{ref}}}\left\lbrack \min\left( 0, - 1 + D(x) \right) \right\rbrack - E_{x \sim \mu_{G}}\left\lbrack \min\left( 0, - 1 - D(x) \right) \right\rbrack$$$$L_{G} = - E_{x \sim \mu_{G}}\lbrack D(x)\rbrack$$**Least squares GAN:**^([\[39\]](#cite_note-39))$$L_{D} = E_{x \sim \mu_{\text{ref}}}\lbrack(D(x) - b)^{2}\rbrack + E_{x \sim \mu_{G}}\lbrack(D(x) - a)^{2}\rbrack$$$$L_{G} = E_{x \sim \mu_{G}}\lbrack(D(x) - c)^{2}\rbrack$$where $a,b,c$ are parameters to be chosen. The authors recommended $a = - 1,b = 1,c = 0$.

### Wasserstein GAN (WGAN)

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=22 "Edit section: Wasserstein GAN (WGAN)")\]

Main article: [Wasserstein GAN](https://en.wikipedia.org/wiki/Wasserstein_GAN "Wasserstein GAN")

The Wasserstein GAN modifies the GAN game at two points:

- The discriminator's strategy set is the set of measurable functions of type $D:\Omega\rightarrow{\mathbb{R}}$ with bounded [Lipschitz norm](https://en.wikipedia.org/wiki/Lipschitz_norm?action=edit&redlink=1 "Lipschitz norm (page does not exist)"): $\| D\|_{L} \leq K$, where $K$ is a fixed positive constant.
- The objective is$$L_{WGAN}(\mu_{G},D):=E_{x \sim \mu_{G}}\lbrack D(x)\rbrack - {\mathbb{E}}_{x \sim \mu_{\text{ref}}}\lbrack D(x)\rbrack$$

One of its purposes is to solve the problem of mode collapse (see above).^([\[17\]](#cite_note-:3-17)) The authors claim "In no experiment did we see evidence of mode collapse for the WGAN algorithm".

### GANs with more than two players

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=23 "Edit section: GANs with more than two players")\]

#### Adversarial autoencoder

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=24 "Edit section: Adversarial autoencoder")\]

An adversarial autoencoder (AAE)^([\[40\]](#cite_note-40)) is more autoencoder than GAN. The idea is to start with a plain [autoencoder](https://en.wikipedia.org/wiki/Autoencoder "Autoencoder"), but train a discriminator to discriminate the latent vectors from a reference distribution (often the normal distribution).

#### InfoGAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=25 "Edit section: InfoGAN")\]

In conditional GAN, the generator receives both a noise vector $z$ and a label $c$, and produces an image $G(z,c)$. The discriminator receives image-label pairs $(x,c)$, and computes $D(x,c)$.

When the training dataset is unlabeled, conditional GAN does not work directly.

The idea of InfoGAN is to decree that every latent vector in the latent space can be decomposed as $(z,c)$: an incompressible noise part $z$, and an informative label part $c$, and encourage the generator to comply with the decree, by encouraging it to maximize $I(c,G(z,c))$, the [mutual information](https://en.wikipedia.org/wiki/Mutual_information "Mutual information") between $c$ and $G(z,c)$, while making no demands on the mutual information $z$ between $G(z,c)$.

Unfortunately, $I(c,G(z,c))$ is intractable in general, The key idea of InfoGAN is Variational Mutual Information Maximization:^([\[41\]](#cite_note-41)) indirectly maximize it by maximizing a lower bound$$\widehat{I}(G,Q) = {\mathbb{E}}_{z \sim \mu_{Z},c \sim \mu_{C}}\lbrack\ln Q(c \mid G(z,c))\rbrack;\quad I(c,G(z,c)) \geq \sup\limits_{Q}\widehat{I}(G,Q)$$where $Q$ ranges over all [Markov kernels](https://en.wikipedia.org/wiki/Markov_kernel "Markov kernel") of type $Q:\Omega_{Y}\rightarrow\mathcal{P}(\Omega_{C})$.

The InfoGAN game is defined as follows:^([\[42\]](#cite_note-42))

> Three probability spaces define an InfoGAN game:
>
> - $(\Omega_{X},\mu_{\text{ref}})$, the space of reference images.
> - $(\Omega_{Z},\mu_{Z})$, the fixed random noise generator.
> - $(\Omega_{C},\mu_{C})$, the fixed random information generator.
>
> There are 3 players in 2 teams: generator, Q, and discriminator. The generator and Q are on one team, and the discriminator on the other team.
>
> The objective function is$$L(G,Q,D) = L_{GAN}(G,D) - \lambda\widehat{I}(G,Q)$$where $L_{GAN}(G,D) = E_{x \sim \mu_{\text{ref}},}\lbrack\ln D(x)\rbrack + E_{z \sim \mu_{Z}}\lbrack\ln(1 - D(G(z,c)))\rbrack$ is the original GAN game objective, and $\widehat{I}(G,Q) = {\mathbb{E}}_{z \sim \mu_{Z},c \sim \mu_{C}}\lbrack\ln Q(c \mid G(z,c))\rbrack$
>
> Generator-Q team aims to minimize the objective, and discriminator aims to maximize it:$$\min\limits_{G,Q}\max\limits_{D}L(G,Q,D)$$

#### Bidirectional GAN (BiGAN)

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=26 "Edit section: Bidirectional GAN (BiGAN)")\]

The standard GAN generator is a function of type $G:\Omega_{Z}\rightarrow\Omega_{X}$, that is, it is a mapping from a latent space $\Omega_{Z}$ to the image space $\Omega_{X}$. This can be understood as a "decoding" process, whereby every latent vector $z \in \Omega_{Z}$ is a code for an image $x \in \Omega_{X}$, and the generator performs the decoding. This naturally leads to the idea of training another network that performs "encoding", creating an [autoencoder](https://en.wikipedia.org/wiki/Autoencoder "Autoencoder") out of the encoder-generator pair.

Already in the original paper,^([\[1\]](#cite_note-GANnips-1)) the authors noted that "Learned approximate inference can be performed by training an auxiliary network to predict $z$ given $x$". The bidirectional GAN architecture performs exactly this.^([\[43\]](#cite_note-43))

The BiGAN is defined as follows:

> Two probability spaces define a BiGAN game:
>
> - $(\Omega_{X},\mu_{X})$, the space of reference images.
> - $(\Omega_{Z},\mu_{Z})$, the latent space.
>
> There are 3 players in 2 teams: generator, encoder, and discriminator. The generator and encoder are on one team, and the discriminator on the other team.
>
> The generator's strategies are functions $G:\Omega_{Z}\rightarrow\Omega_{X}$, and the encoder's strategies are functions $E:\Omega_{X}\rightarrow\Omega_{Z}$. The discriminator's strategies are functions $D:\Omega_{X}\rightarrow\lbrack 0,1\rbrack$.
>
> The objective function is$$L(G,E,D) = {\mathbb{E}}_{x \sim \mu_{X}}\lbrack\ln D(x,E(x))\rbrack + {\mathbb{E}}_{z \sim \mu_{Z}}\lbrack\ln(1 - D(G(z),z))\rbrack$$
>
> Generator-encoder team aims to minimize the objective, and discriminator aims to maximize it:$$\min\limits_{G,E}\max\limits_{D}L(G,E,D)$$

In the paper, they gave a more abstract definition of the objective as:$$L(G,E,D) = {\mathbb{E}}_{(x,z) \sim \mu_{E,X}}\lbrack\ln D(x,z)\rbrack + {\mathbb{E}}_{(x,z) \sim \mu_{G,Z}}\lbrack\ln(1 - D(x,z))\rbrack$$where $\mu_{E,X}(dx,dz) = \mu_{X}(dx) \cdot \delta_{E(x)}(dz)$ is the probability distribution on $\Omega_{X} \times \Omega_{Z}$ obtained by [pushing $\mu_{X}$ forward](https://en.wikipedia.org/wiki/Pushforward_measure "Pushforward measure") via $x\mapsto(x,E(x))$, and $\mu_{G,Z}(dx,dz) = \delta_{G(z)}(dx) \cdot \mu_{Z}(dz)$ is the probability distribution on $\Omega_{X} \times \Omega_{Z}$ obtained by pushing $\mu_{Z}$ forward via $z\mapsto(G(x),z)$.

Applications of bidirectional models include [semi-supervised learning](https://en.wikipedia.org/wiki/Semi-supervised_learning "Semi-supervised learning"),^([\[44\]](#cite_note-44)) [interpretable machine learning](https://en.wikipedia.org/wiki/Explainable_artificial_intelligence "Explainable artificial intelligence"),^([\[45\]](#cite_note-45)) and [neural machine translation](https://en.wikipedia.org/wiki/Neural_machine_translation "Neural machine translation").^([\[46\]](#cite_note-46))

#### CycleGAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=27 "Edit section: CycleGAN")\]

CycleGAN is an architecture for performing translations between two domains, such as between photos of horses and photos of zebras, or photos of night cities and photos of day cities.

The CycleGAN game is defined as follows:^([\[47\]](#cite_note-47))

> There are two probability spaces $(\Omega_{X},\mu_{X}),(\Omega_{Y},\mu_{Y})$, corresponding to the two domains needed for translations fore-and-back.
>
> There are 4 players in 2 teams: generators $G_{X}:\Omega_{X}\rightarrow\Omega_{Y},G_{Y}:\Omega_{Y}\rightarrow\Omega_{X}$, and discriminators $D_{X}:\Omega_{X}\rightarrow\lbrack 0,1\rbrack,D_{Y}:\Omega_{Y}\rightarrow\lbrack 0,1\rbrack$.
>
> The objective function is$$L(G_{X},G_{Y},D_{X},D_{Y}) = L_{GAN}(G_{X},D_{X}) + L_{GAN}(G_{Y},D_{Y}) + \lambda L_{cycle}(G_{X},G_{Y})$$
>
> where $\lambda$ is a positive adjustable parameter, $L_{GAN}$ is the GAN game objective, and $L_{cycle}$ is the *cycle consistency loss*:$$L_{cycle}(G_{X},G_{Y}) = E_{x \sim \mu_{X}}\| G_{X}(G_{Y}(x)) - x\| + E_{y \sim \mu_{Y}}\| G_{Y}(G_{X}(y)) - y\|$$The generators aim to minimize the objective, and the discriminators aim to maximize it:$$\min\limits_{G_{X},G_{Y}}\max\limits_{D_{X},D_{Y}}L(G_{X},G_{Y},D_{X},D_{Y})$$

Unlike previous work like pix2pix,^([\[48\]](#cite_note-48)) which requires paired training data, cycleGAN requires no paired data. For example, to train a pix2pix model to turn a summer scenery photo to winter scenery photo and back, the dataset must contain pairs of the same place in summer and winter, shot at the same angle; cycleGAN would only need a set of summer scenery photos, and an unrelated set of winter scenery photos.

### GANs with particularly large or small scales

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=28 "Edit section: GANs with particularly large or small scales")\]

#### BigGAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=29 "Edit section: BigGAN")\]

The BigGAN is essentially a self-attention GAN trained on a large scale (up to 80 million parameters) to generate large images of ImageNet (up to 512 x 512 resolution), with numerous engineering tricks to make it converge.^([\[23\]](#cite_note-:0-23)[\[49\]](#cite_note-49))

#### Invertible data augmentation

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=30 "Edit section: Invertible data augmentation")\]

When there is insufficient training data, the reference distribution $\mu_{\text{ref}}$ cannot be well-approximated by the [empirical distribution](https://en.wikipedia.org/wiki/Empirical_measure "Empirical measure") given by the training dataset. In such cases, [data augmentation](https://en.wikipedia.org/wiki/Data_augmentation "Data augmentation") can be applied, to allow training GAN on smaller datasets. Naïve data augmentation, however, brings its problems.

Consider the original GAN game, slightly reformulated as follows:$$\left\{ \begin{matrix}
{\min_{D}L_{D}(D,\mu_{G}) = - E_{x \sim \mu_{\text{ref}}}\lbrack\ln D(x)\rbrack - E_{x \sim \mu_{G}}\lbrack\ln(1 - D(x))\rbrack} \\
{\min_{G}L_{G}(D,\mu_{G}) = - E_{x \sim \mu_{G}}\lbrack\ln(1 - D(x))\rbrack}
\end{matrix} \right.$$Now we use data augmentation by randomly sampling semantic-preserving transforms $T:\Omega\rightarrow\Omega$ and applying them to the dataset, to obtain the reformulated GAN game:$$\left\{ \begin{matrix}
{\min_{D}L_{D}(D,\mu_{G}) = - E_{x \sim \mu_{\text{ref}},T \sim \mu_{\text{trans}}}\lbrack\ln D(T(x))\rbrack - E_{x \sim \mu_{G}}\lbrack\ln(1 - D(x))\rbrack} \\
{\min_{G}L_{G}(D,\mu_{G}) = - E_{x \sim \mu_{G}}\lbrack\ln(1 - D(x))\rbrack}
\end{matrix} \right.$$This is equivalent to a GAN game with a different distribution ${\mu_{\text{ref}}}^{\prime}$, sampled by $T(x)$, with $x \sim \mu_{\text{ref}},T \sim \mu_{\text{trans}}$. For example, if $\mu_{\text{ref}}$ is the distribution of images in ImageNet, and $\mu_{\text{trans}}$ samples identity-transform with probability 0.5, and horizontal-reflection with probability 0.5, then ${\mu_{\text{ref}}}^{\prime}$ is the distribution of images in ImageNet and horizontally-reflected ImageNet, combined.

The result of such training would be a generator that mimics ${\mu_{\text{ref}}}^{\prime}$. For example, it would generate images that look like they are randomly cropped, if the data augmentation uses random cropping.

The solution is to apply data augmentation to both generated and real images:$$\left\{ \begin{matrix}
{\min_{D}L_{D}(D,\mu_{G}) = - E_{x \sim \mu_{\text{ref}},T \sim \mu_{\text{trans}}}\lbrack\ln D(T(x))\rbrack - E_{x \sim \mu_{G},T \sim \mu_{\text{trans}}}\lbrack\ln(1 - D(T(x)))\rbrack} \\
{\min_{G}L_{G}(D,\mu_{G}) = - E_{x \sim \mu_{G},T \sim \mu_{\text{trans}}}\lbrack\ln(1 - D(T(x)))\rbrack}
\end{matrix} \right.$$The authors demonstrated high-quality generation using just 100-picture-large datasets.^([\[50\]](#cite_note-50))

The StyleGAN-2-ADA paper points out a further point on data augmentation: it must be *invertible*.^([\[51\]](#cite_note-:4-51)) Continue with the example of generating ImageNet pictures. If the data augmentation is "randomly rotate the picture by 0, 90, 180, 270 degrees with *equal* probability", then there is no way for the generator to know which is the true orientation: Consider two generators $G,G^{\prime}$, such that for any latent $z$, the generated image $G(z)$ is a 90-degree rotation of $G^{\prime}(z)$. They would have exactly the same expected loss, and so neither is preferred over the other.

The solution is to only use invertible data augmentation: instead of "randomly rotate the picture by 0, 90, 180, 270 degrees with *equal* probability", use "randomly rotate the picture by 90, 180, 270 degrees with 0.1 probability, and keep the picture as it is with 0.7 probability". This way, the generator is still rewarded to keep images oriented the same way as un-augmented ImageNet pictures.

Abstractly, the effect of randomly sampling transformations $T:\Omega\rightarrow\Omega$ from the distribution $\mu_{\text{trans}}$ is to define a Markov kernel $K_{\text{trans}}:\Omega\rightarrow\mathcal{P}(\Omega)$. Then, the data-augmented GAN game pushes the generator to find some ${\widehat{\mu}}_{G} \in \mathcal{P}(\Omega)$, such that $$K_{\text{trans}} \ast \mu_{\text{ref}} = K_{\text{trans}} \ast {\widehat{\mu}}_{G}$$where $\ast$ is the [Markov kernel convolution](https://en.wikipedia.org/wiki/Convolution_of_probability_distributions "Convolution of probability distributions"). A data-augmentation method is defined to be *invertible* if its Markov kernel $K_{\text{trans}}$ satisfies$$\left. K_{\text{trans}} \ast \mu = K_{\text{trans}} \ast \mu^{\prime}\;\Longrightarrow\;\mu = \mu^{\prime}\quad\forall\mu,\mu^{\prime} \in \mathcal{P}(\Omega) \right.$$Immediately by definition, we see that composing multiple invertible data-augmentation methods results in yet another invertible method. Also by definition, if the data-augmentation method is invertible, then using it in a GAN game does not change the optimal strategy ${\widehat{\mu}}_{G}$ for the generator, which is still $\mu_{\text{ref}}$.

There are two prototypical examples of invertible Markov kernels:

**Discrete case**: Invertible [stochastic matrices](https://en.wikipedia.org/wiki/Stochastic_matrix "Stochastic matrix"), when $\Omega$ is finite.

For example, if $\Omega = \{ \uparrow , \downarrow ,\leftarrow,\rightarrow\}$ is the set of four images of an arrow, pointing in 4 directions, and the data augmentation is "randomly rotate the picture by 90, 180, 270 degrees with probability $p$, and keep the picture as it is with probability $(1 - 3p)$", then the Markov kernel $K_{\text{trans}}$ can be represented as a stochastic matrix:$$\lbrack K_{\text{trans}}\rbrack = \begin{bmatrix}
{(1 - 3p)} & p & p & p \\
p & {(1 - 3p)} & p & p \\
p & p & {(1 - 3p)} & p \\
p & p & p & {(1 - 3p)}
\end{bmatrix}$$ and $K_{\text{trans}}$ is an invertible kernel iff $\lbrack K_{\text{trans}}\rbrack$ is an invertible matrix, that is, $p \neq 1/4$.

**Continuous case**: The gaussian kernel, when $\Omega = {\mathbb{R}}^{n}$ for some $n \geq 1$.

For example, if $\Omega = {\mathbb{R}}^{256^{2}}$ is the space of 256x256 images, and the data-augmentation method is "generate a gaussian noise $z \sim \mathcal{N}(0,I_{256^{2}})$, then add $\epsilon z$ to the image", then $K_{\text{trans}}$ is just convolution by the density function of $\mathcal{N}(0,\epsilon^{2}I_{256^{2}})$. This is invertible, because convolution by a gaussian is just convolution by the [heat kernel](https://en.wikipedia.org/wiki/Heat_kernel "Heat kernel"), so given any $\mu \in \mathcal{P}({\mathbb{R}}^{n})$, the convolved distribution $K_{\text{trans}} \ast \mu$ can be obtained by heating up ${\mathbb{R}}^{n}$ precisely according to $\mu$, then wait for time $\epsilon^{2}/4$. With that, we can recover $\mu$ by running the [heat equation](https://en.wikipedia.org/wiki/Heat_equation "Heat equation") *backwards in time* for $\epsilon^{2}/4$.

More examples of invertible data augmentations are found in the paper.^([\[51\]](#cite_note-:4-51))

#### SinGAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=31 "Edit section: SinGAN")\]

SinGAN pushes data augmentation to the limit, by using only a single image as training data and performing data augmentation on it. The GAN architecture is adapted to this training method by using a multi-scale pipeline.

The generator $G$ is decomposed into a pyramid of generators $G = G_{1} \circ G_{2} \circ \cdots \circ G_{N}$, with the lowest one generating the image $G_{N}(z_{N})$ at the lowest resolution, then the generated image is scaled up to $r(G_{N}(z_{N}))$, and fed to the next level to generate an image $G_{N - 1}(z_{N - 1} + r(G_{N}(z_{N})))$ at a higher resolution, and so on. The discriminator is decomposed into a pyramid as well.^([\[52\]](#cite_note-52))

### StyleGAN series

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=32 "Edit section: StyleGAN series")\]

Main article: [StyleGAN](https://en.wikipedia.org/wiki/StyleGAN "StyleGAN")

The StyleGAN family is a series of architectures published by [Nvidia](https://en.wikipedia.org/wiki/Nvidia "Nvidia")'s research division.

#### Progressive GAN

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=33 "Edit section: Progressive GAN")\]

Progressive GAN^([\[18\]](#cite_note-:1-18)) is a method for training GAN for large-scale image generation stably, by growing a GAN generator from small to large scale in a pyramidal fashion. Like SinGAN, it decomposes the generator as$G = G_{1} \circ G_{2} \circ \cdots \circ G_{N}$, and the discriminator as $D = D_{1} \circ D_{2} \circ \cdots \circ D_{N}$.

During training, at first only $G_{N},D_{N}$ are used in a GAN game to generate 4x4 images. Then $G_{N - 1},D_{N - 1}$ are added to reach the second stage of GAN game, to generate 8x8 images, and so on, until we reach a GAN game to generate 1024x1024 images.

To avoid shock between stages of the GAN game, each new layer is "blended in" (Figure 2 of the paper^([\[18\]](#cite_note-:1-18))). For example, this is how the second stage GAN game starts:

- Just before, the GAN game consists of the pair $G_{N},D_{N}$ generating and discriminating 4x4 images.
- Just after, the GAN game consists of the pair $((1 - \alpha) + \alpha \cdot G_{N - 1}) \circ u \circ G_{N},D_{N} \circ d \circ ((1 - \alpha) + \alpha \cdot D_{N - 1})$ generating and discriminating 8x8 images. Here, the functions $u,d$ are image up- and down-sampling functions, and $\alpha$ is a blend-in factor (much like an [alpha](https://en.wikipedia.org/wiki/Alpha_compositing "Alpha compositing") in image composing) that smoothly glides from 0 to 1.

#### StyleGAN-1

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=34 "Edit section: StyleGAN-1")\]

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/9/97/StyleGAN-1_and_StyleGAN-2.png/500px-StyleGAN-1_and_StyleGAN-2.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:StyleGAN-1_and_StyleGAN-2.png)

The main architecture of StyleGAN-1 and StyleGAN-2

StyleGAN-1 is designed as a combination of Progressive GAN with [neural style transfer](https://en.wikipedia.org/wiki/Neural_style_transfer "Neural style transfer").^([\[53\]](#cite_note-53))

The key architectural choice of StyleGAN-1 is a progressive growth mechanism, similar to Progressive GAN. Each generated image starts as a constant $4 \times 4 \times 512$ array, and repeatedly passed through style blocks. Each style block applies a "style latent vector" via affine transform ("adaptive instance normalization"), similar to how neural style transfer uses [Gramian matrix](https://en.wikipedia.org/wiki/Gramian_matrix "Gramian matrix"). It then adds noise, and normalize (subtract the mean, then divide by the variance).

At training time, usually only one style latent vector is used per image generated, but sometimes two ("mixing regularization") in order to encourage each style block to independently perform its stylization without expecting help from other style blocks (since they might receive an entirely different style latent vector).

After training, multiple style latent vectors can be fed into each style block. Those fed to the lower layers control the large-scale styles, and those fed to the higher layers control the fine-detail styles.

Style-mixing between two images $x,x^{\prime}$ can be performed as well. First, run a gradient descent to find $z,z^{\prime}$ such that $G(z) \approx x,G(z^{\prime}) \approx x^{\prime}$. This is called "projecting an image back to style latent space". Then, $z$ can be fed to the lower style blocks, and $z^{\prime}$ to the higher style blocks, to generate a composite image that has the large-scale style of $x$, and the fine-detail style of $x^{\prime}$. Multiple images can also be composed this way.

#### StyleGAN-2

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=35 "Edit section: StyleGAN-2")\]

StyleGAN-2 improves upon StyleGAN-1, by using the style latent vector to transform the convolution layer's weights instead, thus solving the "blob" problem.^([\[54\]](#cite_note-54))

This was updated by the StyleGAN-2-ADA ("ADA" stands for "adaptive"),^([\[51\]](#cite_note-:4-51)) which uses invertible data augmentation as described above. It also tunes the amount of data augmentation applied by starting at zero, and gradually increasing it until an "overfitting heuristic" reaches a target level, thus the name "adaptive".

#### StyleGAN-3

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=36 "Edit section: StyleGAN-3")\]

StyleGAN-3^([\[55\]](#cite_note-55)) improves upon StyleGAN-2 by solving the "texture sticking" problem, which can be seen in the official videos.^([\[56\]](#cite_note-56)) They analyzed the problem by the [Nyquist–Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist–Shannon_sampling_theorem "Nyquist–Shannon sampling theorem"), and argued that the layers in the generator learned to exploit the high-frequency signal in the pixels they operate upon.

To solve this, they proposed imposing strict [lowpass filters](https://en.wikipedia.org/wiki/Low-pass_filter "Low-pass filter") between each generator's layers, so that the generator is forced to operate on the pixels in a way [faithful](https://en.wikipedia.org/wiki/Faithful_representation "Faithful representation") to the continuous signals they represent, rather than operate on them as merely discrete signals. They further imposed rotational and translational invariance by using more [signal filters](https://en.wikipedia.org/wiki/Filter_(signal_processing) "Filter (signal processing)"). The resulting StyleGAN-3 is able to solve the texture sticking problem, as well as generating images that rotate and translate smoothly.

## Other uses

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=37 "Edit section: Other uses")\]

Other than for generative and discriminative modelling of data, GANs have been used for other things.

GANs have been used for [transfer learning](https://en.wikipedia.org/wiki/Transfer_learning "Transfer learning") to enforce the alignment of the latent feature space, such as in [deep reinforcement learning](https://en.wikipedia.org/wiki/Deep_reinforcement_learning "Deep reinforcement learning").^([\[57\]](#cite_note-57)) This works by feeding the embeddings of the source and target task to the discriminator which tries to guess the context. The resulting loss is then (inversely) backpropagated through the encoder.

## Applications

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=38 "Edit section: Applications")\]

### Science

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=39 "Edit section: Science")\]

- [Iteratively reconstruct](https://en.wikipedia.org/wiki/Iterative_reconstruction "Iterative reconstruction") [astronomical images](https://en.wikipedia.org/wiki/Astrophotography "Astrophotography")^([\[58\]](#cite_note-58))
- Simulate [gravitational lensing](https://en.wikipedia.org/wiki/Gravitational_lens "Gravitational lens") for dark matter research.^([\[59\]](#cite_note-59)[\[60\]](#cite_note-60)[\[61\]](#cite_note-61))
- Model the distribution of [dark matter](https://en.wikipedia.org/wiki/Dark_matter "Dark matter") in a particular direction in space and to predict the gravitational lensing that will occur.^([\[62\]](#cite_note-62)[\[63\]](#cite_note-63))
- Model high energy jet formation^([\[64\]](#cite_note-64)) and [showers](https://en.wikipedia.org/wiki/Particle_shower "Particle shower") through [calorimeters](https://en.wikipedia.org/wiki/Calorimeter_(particle_physics) "Calorimeter (particle physics)") of [high-energy physics](https://en.wikipedia.org/wiki/Particle_physics "Particle physics") experiments.^([\[65\]](#cite_note-65)[\[66\]](#cite_note-66)[\[67\]](#cite_note-67)[\[68\]](#cite_note-68))
- Approximate bottlenecks in computationally expensive simulations of particle physics experiments. Applications in the context of present and proposed [CERN](https://en.wikipedia.org/wiki/CERN "CERN") experiments have demonstrated the potential of these methods for accelerating simulation and/or improving simulation fidelity.^([\[69\]](#cite_note-69)[\[70\]](#cite_note-70))
- Reconstruct velocity and scalar fields in turbulent flows.^([\[71\]](#cite_note-71)[\[72\]](#cite_note-72)[\[73\]](#cite_note-73))
- GAN-generated molecules were validated experimentally in mice.^([\[74\]](#cite_note-74)[\[75\]](#cite_note-75))

### Medical

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=40 "Edit section: Medical")\]

GAN has been used for generating [synthetic medical images](https://en.wikipedia.org/wiki/Synthetic_data "Synthetic data"), such as [MRI](https://en.wikipedia.org/wiki/Magnetic_resonance_imaging "Magnetic resonance imaging") and [PET](https://en.wikipedia.org/wiki/Positron_emission_tomography "Positron emission tomography") images.^([\[76\]](#cite_note-76))

GAN can be used to detect [glaucomatous](https://en.wikipedia.org/wiki/Glaucoma "Glaucoma") images helping the early diagnosis which is essential to avoid partial or total loss of vision.^([\[77\]](#cite_note-77))

GANs have been used to create [forensic facial reconstructions](https://en.wikipedia.org/wiki/Forensic_facial_reconstruction "Forensic facial reconstruction") of deceased historical figures.^([\[78\]](#cite_note-78))

### Malicious

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=41 "Edit section: Malicious")\]

Main article: [Deepfake](https://en.wikipedia.org/wiki/Deepfake "Deepfake")

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/250px-Woman_1.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Woman_1.jpg)

An image generated by a [StyleGAN](https://en.wikipedia.org/wiki/StyleGAN "StyleGAN") that looks deceptively like a photograph of a real person. This image was generated by a StyleGAN based on an analysis of portraits.

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/GAN_deepfake_white_girl.jpg/250px-GAN_deepfake_white_girl.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:GAN_deepfake_white_girl.jpg)

Another example of a GAN-generated portrait

Concerns have been raised about the potential use of GAN-based [human image synthesis](https://en.wikipedia.org/wiki/Human_image_synthesis "Human image synthesis") for sinister purposes, e.g., to produce fake, possibly incriminating, photographs and videos.^([\[79\]](#cite_note-TPDNEwuaitcryhf%7C-79)) GANs can be used to generate unique, realistic profile photos of people who do not exist, in order to automate creation of fake social media profiles.^([\[80\]](#cite_note-80))

In 2019 the state of California considered^([\[81\]](#cite_note-81)) and passed on October 3, 2019, the [bill AB-602](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201920200AB602), which bans the use of human image synthesis technologies to make fake pornography without the consent of the people depicted, and [bill AB-730](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201920200AB730), which prohibits distribution of manipulated videos of a political candidate within 60 days of an election. Both bills were authored by Assembly member [Marc Berman](https://en.wikipedia.org/wiki/Marc_Berman "Marc Berman") and signed by Governor [Gavin Newsom](https://en.wikipedia.org/wiki/Gavin_Newsom "Gavin Newsom"). The laws went into effect in 2020.^([\[82\]](#cite_note-CNET2019-82))

DARPA's Media Forensics program studies ways to counteract fake media, including fake media produced using GANs.^([\[83\]](#cite_note-83))

### Fashion, art and advertising

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=42 "Edit section: Fashion, art and advertising")\]

GANs can be used to generate art; *[The Verge](https://en.wikipedia.org/wiki/The_Verge "The Verge")* wrote in March 2019 that "The images created by GANs have become the defining look of contemporary AI art."^([\[84\]](#cite_note-84)) GANs can also be used to

- [inpaint](https://en.wikipedia.org/wiki/Inpainting "Inpainting") photographs^([\[85\]](#cite_note-85))
- generate fashion models,^([\[86\]](#cite_note-86)) shadows,^([\[87\]](#cite_note-87)) photorealistic renders of [interior design](https://en.wikipedia.org/wiki/Interior_design "Interior design"), [industrial design](https://en.wikipedia.org/wiki/Industrial_design "Industrial design"), shoes, etc.^([\[88\]](#cite_note-88)) Such networks were reported to be used by [Facebook](https://en.wikipedia.org/wiki/Facebook "Facebook").^([\[89\]](#cite_note-89))

Some have worked with using GAN for artistic creativity, as "creative adversarial network".^([\[90\]](#cite_note-90)[\[91\]](#cite_note-91)) A GAN, trained on a set of 15,000 portraits from [WikiArt](https://en.wikipedia.org/wiki/WikiArt "WikiArt") from the 14th to the 19th century, created the 2018 painting *[Edmond de Belamy](https://en.wikipedia.org/wiki/Edmond_de_Belamy "Edmond de Belamy"),* which sold for US\$432,500.^([\[92\]](#cite_note-92))

GANs were used by the [video game modding](https://en.wikipedia.org/wiki/Mod_(video_gaming) "Mod (video gaming)") community to [up-scale](https://en.wikipedia.org/wiki/Image_scaling "Image scaling") low-resolution 2D textures in old video games by recreating them in [4k](https://en.wikipedia.org/wiki/4K_resolution "4K resolution") or higher resolutions via image training, and then down-sampling them to fit the game's native resolution (resembling [supersampling](https://en.wikipedia.org/wiki/Supersampling "Supersampling") [anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing "Spatial anti-aliasing")).^([\[93\]](#cite_note-93))

In 2020, [Artbreeder](https://en.wikipedia.org/wiki/Artbreeder "Artbreeder") was used to create the main antagonist in the sequel to the psychological web horror series *[Ben Drowned](https://en.wikipedia.org/wiki/Ben_Drowned "Ben Drowned")*. The author would later go on to praise GAN applications for their ability to help generate assets for independent artists who are short on budget and manpower.^([\[94\]](#cite_note-94)[\[95\]](#cite_note-95))

In May 2020, [Nvidia](https://en.wikipedia.org/wiki/Nvidia "Nvidia") researchers taught an AI system (termed "GameGAN") to recreate the game of *[Pac-Man](https://en.wikipedia.org/wiki/Pac-Man "Pac-Man")* simply by watching it being played.^([\[96\]](#cite_note-96)[\[97\]](#cite_note-97))

In August 2019, a large dataset consisting of 12,197 MIDI songs each with paired lyrics and melody alignment was created for neural melody generation from lyrics using conditional GAN-LSTM (refer to sources at GitHub [AI Melody Generation from Lyrics](https://github.com/yy1lab/Lyrics-Conditioned-Neural-Melody-Generation)).^([\[98\]](#cite_note-98))

### Miscellaneous

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=43 "Edit section: Miscellaneous")\]

GANs have been used to

- show how an individual's appearance might change with age.^([\[99\]](#cite_note-99))
- [reconstruct 3D models of objects from images](https://en.wikipedia.org/wiki/3D_reconstruction_from_multiple_images "3D reconstruction from multiple images"),^([\[100\]](#cite_note-100))
- generate novel objects as 3D point clouds,^([\[101\]](#cite_note-101))
- model patterns of motion in video.^([\[102\]](#cite_note-102))
- inpaint missing features in maps, transfer map styles in cartography^([\[103\]](#cite_note-103)) or augment street view imagery.^([\[104\]](#cite_note-104))
- use feedback to generate images and replace image search systems.^([\[105\]](#cite_note-105))
- visualize the effect that climate change will have on specific houses.^([\[106\]](#cite_note-106))
- reconstruct an image of a person's face after listening to their voice.^([\[107\]](#cite_note-107))
- produces videos of a person speaking, given only a single photo of that person.^([\[108\]](#cite_note-108))
- recurrent sequence generation.^([\[109\]](#cite_note-109))
- improve the perceptual quality of reconstructed images at low bitrates while supporting controllable compression.^([\[110\]](#cite_note-110)[\[111\]](#cite_note-111))

## History

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=44 "Edit section: History")\]

In 1991, [Juergen Schmidhuber](https://en.wikipedia.org/wiki/Jürgen_Schmidhuber "Jürgen Schmidhuber") published "artificial curiosity", [neural networks](https://en.wikipedia.org/wiki/Neural_network "Neural network") in a [zero-sum game](https://en.wikipedia.org/wiki/Zero-sum_game "Zero-sum game").^([\[112\]](#cite_note-curiosity1991-112)) The first network is a [generative model](https://en.wikipedia.org/wiki/Generative_model "Generative model") that models a [probability distribution](https://en.wikipedia.org/wiki/Probability_distribution "Probability distribution") over output patterns. The second network learns by [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent "Gradient descent") to predict the reactions of the environment to these patterns. GANs can be regarded as a case where the environmental reaction is 1 or 0 depending on whether the first network's output is in a given set.^([\[113\]](#cite_note-gancurpm2020-113))

Other people had similar ideas but did not develop them similarly. An idea involving adversarial networks was published in a 2010 blog post by Olli Niemitalo.^([\[114\]](#cite_note-olli2010-114)) This idea was never implemented and did not involve [stochasticity](https://en.wikipedia.org/wiki/Stochasticity "Stochasticity") in the generator and thus was not a generative model. An idea similar to GANs was used to model animal behavior by Wei Li, Melvin Gauci and Roderich Gross in 2013.^([\[115\]](#cite_note-Li-etal-GECCO2013-115))

Another inspiration for GANs was noise-contrastive estimation,^([\[116\]](#cite_note-116)) which uses the same loss function as GANs and which Goodfellow studied during his PhD in 2010–2014.

[Adversarial machine learning](https://en.wikipedia.org/wiki/Adversarial_machine_learning "Adversarial machine learning") has other uses besides generative modeling and can be applied to models other than neural networks. In control theory, adversarial learning based on neural networks was used in 2006 to train robust controllers in a game theoretic sense, by alternating the iterations between a minimizer policy, the controller, and a maximizer policy, the disturbance.^([\[117\]](#cite_note-117)[\[118\]](#cite_note-118))

In 2017, a GAN was used for image enhancement focusing on realistic textures rather than pixel-accuracy, producing a higher image quality at high magnification.^([\[119\]](#cite_note-119)) In 2017, the first faces were generated.^([\[120\]](#cite_note-120)) These were exhibited in February 2018 at the Grand Palais.^([\[121\]](#cite_note-121)[\[122\]](#cite_note-122)) Faces generated by [StyleGAN](https://en.wikipedia.org/wiki/StyleGAN "StyleGAN")^([\[123\]](#cite_note-123)) in 2019 drew comparisons with [Deepfakes](https://en.wikipedia.org/wiki/Deepfake "Deepfake").^([\[124\]](#cite_note-TPDNEitboowo2019-124)[\[125\]](#cite_note-TPDNE-125)[\[126\]](#cite_note-Style-based_GANs_–_Generating_and_Tuning_Realistic_Artificial_Faces-126))

## See also

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=45 "Edit section: See also")\]

- [Artificial intelligence art](https://en.wikipedia.org/wiki/Artificial_intelligence_art "Artificial intelligence art") – Visual content generation through artificial intelligencePages displaying short descriptions of redirect targets
- [Deepfake](https://en.wikipedia.org/wiki/Deepfake "Deepfake") – Realistic artificially generated media
- [Deep learning](https://en.wikipedia.org/wiki/Deep_learning "Deep learning") – Branch of machine learning
- [Diffusion model](https://en.wikipedia.org/wiki/Diffusion_model "Diffusion model") – Technique for the generative modeling of a continuous probability distribution
- [Generative AI](https://en.wikipedia.org/wiki/Generative_AI "Generative AI") – AI that generates content
- [Synthetic media](https://en.wikipedia.org/wiki/Synthetic_media "Synthetic media") – Artificial production of media by automated means

## References

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=46 "Edit section: References")\]

1.  [1](#cite_ref-GANnips_1-0) [2](#cite_ref-GANnips_1-1) [3](#cite_ref-GANnips_1-2) [4](#cite_ref-GANnips_1-3) [5](#cite_ref-GANnips_1-4) [6](#cite_ref-GANnips_1-5) [7](#cite_ref-GANnips_1-6) [8](#cite_ref-GANnips_1-7) [9](#cite_ref-GANnips_1-8) [10](#cite_ref-GANnips_1-9) [11](#cite_ref-GANnips_1-10)
    Goodfellow, Ian; Pouget-Abadie, Jean; Mirza, Mehdi; Xu, Bing; Warde-Farley, David; Ozair, Sherjil; Courville, Aaron; Bengio, Yoshua (2014). [*Generative Adversarial Nets*](https://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf) (PDF). Proceedings of the International Conference on Neural Information Processing Systems (NIPS 2014). pp. 2672–2680.
2.  [↑](#cite_ref-ITT_GANs_2-0) Salimans, Tim; Goodfellow, Ian; Zaremba, Wojciech; Cheung, Vicki; Radford, Alec; Chen, Xi (2016). "Improved Techniques for Training GANs". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1606.03498](https://arxiv.org/abs/1606.03498) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
3.  [↑](#cite_ref-3) Isola, Phillip; Zhu, Jun-Yan; Zhou, Tinghui; Efros, Alexei (2017). ["Image-to-Image Translation with Conditional Adversarial Nets"](https://phillipi.github.io/pix2pix/). *Computer Vision and Pattern Recognition*.
4.  [↑](#cite_ref-4) Ho, Jonathon; Ermon, Stefano (2016). ["Generative Adversarial Imitation Learning"](http://papers.nips.cc/paper/6391-generative-adversarial-imitation-learning). *Advances in Neural Information Processing Systems*. **29**: 4565–4573. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1606.03476](https://arxiv.org/abs/1606.03476).
5.  [↑](#cite_ref-5) ["Vanilla GAN (GANs in computer vision: Introduction to generative learning)"](https://theaisummer.com/gan-computer-vision/#vanilla-gan-generative-adversarial-networks-2014). *theaisummer.com*. AI Summer. April 10, 2020. [Archived](https://web.archive.org/web/20200603130655/https://theaisummer.com/gan-computer-vision/) from the original on June 3, 2020. Retrieved September 20, 2020.
6.  [↑](#cite_ref-6) Luc, Pauline; Couprie, Camille; Chintala, Soumith; Verbeek, Jakob (November 25, 2016). "Semantic Segmentation using Adversarial Networks". *NIPS Workshop on Adversarial Training, Dec, Barcelona, Spain*. **2016**. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1611.08408](https://arxiv.org/abs/1611.08408).
7.  [↑](#cite_ref-OpenAI_com_7-0) [Andrej Karpathy](https://en.wikipedia.org/wiki/Andrej_Karpathy "Andrej Karpathy"); [Pieter Abbeel](https://en.wikipedia.org/wiki/Pieter_Abbeel "Pieter Abbeel"); Greg Brockman; Peter Chen; Vicki Cheung; Rocky Duan; Ian Goodfellow; Durk Kingma; Jonathan Ho; Rein Houthooft; Tim Salimans; John Schulman; Ilya Sutskever; Wojciech Zaremba, [*Generative Models*](https://openai.com/blog/generative-models/), [OpenAI](https://en.wikipedia.org/wiki/OpenAI "OpenAI"), retrieved April 7, 2016
8.  [↑](#cite_ref-8) Mohamed, Shakir; Lakshminarayanan, Balaji (2016). "Learning in Implicit Generative Models". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1610.03483](https://arxiv.org/abs/1610.03483) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
9.  [↑](#cite_ref-:5_9-0) Goodfellow, Ian (April 3, 2017). "NIPS 2016 Tutorial: Generative Adversarial Networks". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1701.00160](https://arxiv.org/abs/1701.00160) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
10. [↑](#cite_ref-KingmaWelling2019_10-0) Kingma, Diederik P.; Welling, Max (2019). "An Introduction to Variational Autoencoders". *Foundations and Trends in Machine Learning*. **12** (4): 307–392. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1906.02691](https://arxiv.org/abs/1906.02691). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1561/2200000056](https://doi.org/10.1561%2F2200000056).
11. [↑](#cite_ref-11) Kingma, Diederik P.; Welling, Max (May 1, 2014). "Auto-Encoding Variational Bayes". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1312.6114](https://arxiv.org/abs/1312.6114) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
12. [↑](#cite_ref-12) Rezende, Danilo Jimenez; Mohamed, Shakir; Wierstra, Daan (2014). ["Stochastic Backpropagation and Approximate Inference in Deep Generative Models"](https://proceedings.mlr.press/v32/rezende14.html). *Journal of Machine Learning Research*. **32** (2): 1278–1286. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1401.4082](https://arxiv.org/abs/1401.4082).
13. [1](#cite_ref-:2_13-0) [2](#cite_ref-:2_13-1) [3](#cite_ref-:2_13-2) Farnia, Farzan; Ozdaglar, Asuman (November 21, 2020). ["Do GANs always have Nash equilibria?"](https://proceedings.mlr.press/v119/farnia20a.html). *Proceedings of the 37th International Conference on Machine Learning*. Vol. 119. PMLR. pp. 3029–3039.
14. [↑](#cite_ref-BiGANmeasure_14-0) Donahue, Jeff; Krähenbühl, Philipp; [Darrell, Trevor](https://en.wikipedia.org/wiki/Trevor_Darrell "Trevor Darrell") (2017). [*Adversarial Feature Learning*](https://arxiv.org/abs/1605.09782). International Conference on Learning Representations. Propositions 1–2 and Theorem 1, p. 4.
15. [1](#cite_ref-Kallenberg2021_15-0) [2](#cite_ref-Kallenberg2021_15-1) [3](#cite_ref-Kallenberg2021_15-2) [4](#cite_ref-Kallenberg2021_15-3) Kallenberg, Olav (2021). *Foundations of Modern Probability* (3rd ed.). Springer. pp. 40–41, 55–57, 86, and 167–168. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/978-3-030-61871-1](https://doi.org/10.1007%2F978-3-030-61871-1).
16. [1](#cite_ref-BergerRandomization_16-0) [2](#cite_ref-BergerRandomization_16-1) Berger, James O. (1985). *Statistical Decision Theory and Bayesian Analysis* (2nd ed.). Springer. p. 40. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/978-1-4757-4286-2](https://doi.org/10.1007%2F978-1-4757-4286-2).
17. [1](#cite_ref-:3_17-0) [2](#cite_ref-:3_17-1) [3](#cite_ref-:3_17-2) Weng, Lilian (April 18, 2019). "From GAN to WGAN". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1904.08994](https://arxiv.org/abs/1904.08994) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
18. [1](#cite_ref-:1_18-0) [2](#cite_ref-:1_18-1) [3](#cite_ref-:1_18-2) Karras, Tero; Aila, Timo; Laine, Samuli; Lehtinen, Jaakko (October 1, 2017). "Progressive Growing of GANs for Improved Quality, Stability, and Variation". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1710.10196](https://arxiv.org/abs/1710.10196) \[[cs.NE](https://arxiv.org/archive/cs.NE)\].
19. [↑](#cite_ref-19) Soviany, Petru; Ardei, Claudiu; Ionescu, Radu Tudor; Leordeanu, Marius (October 22, 2019). "Image Difficulty Curriculum for Generative Adversarial Networks (CuGAN)". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1910.08967](https://arxiv.org/abs/1910.08967) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
20. [↑](#cite_ref-20) Hacohen, Guy; Weinshall, Daphna (May 24, 2019). ["On The Power of Curriculum Learning in Training Deep Networks"](https://proceedings.mlr.press/v97/hacohen19a.html). *International Conference on Machine Learning*. PMLR: 2535–2544. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1904.03626](https://arxiv.org/abs/1904.03626).
21. [↑](#cite_ref-21) Lin, Zinan; et al. (December 2018). [*PacGAN: the power of two samples in generative adversarial networks*](https://dl.acm.org/doi/10.5555/3326943.3327081). 32nd International Conference on Neural Information Processing Systems. pp. 1505–1514. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1712.04086](https://arxiv.org/abs/1712.04086).
22. [↑](#cite_ref-22) Mescheder, Lars; Geiger, Andreas; Nowozin, Sebastian (July 31, 2018). "Which Training Methods for GANs do actually Converge?". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1801.04406](https://arxiv.org/abs/1801.04406) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
23. [1](#cite_ref-:0_23-0) [2](#cite_ref-:0_23-1) Brock, Andrew; Donahue, Jeff; Simonyan, Karen (September 1, 2018). [*Large Scale GAN Training for High Fidelity Natural Image Synthesis*](https://ui.adsabs.harvard.edu/abs/2018arXiv180911096B). International Conference on Learning Representations 2019. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1809.11096](https://arxiv.org/abs/1809.11096).
24. [↑](#cite_ref-24) Heusel, Martin; Ramsauer, Hubert; Unterthiner, Thomas; Nessler, Bernhard; Hochreiter, Sepp (2017). ["GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium"](https://proceedings.neurips.cc/paper/2017/hash/8a1d694707eb0fefe65871369074926d-Abstract.html). *Advances in Neural Information Processing Systems*. **30**. Curran Associates, Inc. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1706.08500](https://arxiv.org/abs/1706.08500).
25. [↑](#cite_ref-25) Zhang, Richard; Isola, Phillip; Efros, Alexei A.; Shechtman, Eli; Wang, Oliver (2018). "The Unreasonable Effectiveness of Deep Features as a Perceptual Metric". pp. 586–595. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1801.03924](https://arxiv.org/abs/1801.03924) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
26. [↑](#cite_ref-26) Borji, Ali (February 1, 2019). ["Pros and cons of GAN evaluation measures"](https://www.sciencedirect.com/science/article/pii/S1077314218304272). *Computer Vision and Image Understanding*. **179**: 41–65. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1802.03446](https://arxiv.org/abs/1802.03446). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2019CVIU..179...41B](https://scixplorer.org/abs/2019CVIU..179...41B). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.cviu.2018.10.009](https://doi.org/10.1016%2Fj.cviu.2018.10.009). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1077-3142](https://search.worldcat.org/issn/1077-3142). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [3627712](https://api.semanticscholar.org/CorpusID:3627712).
27. [↑](#cite_ref-27) Hindupur, Avinash (July 15, 2022), [*The GAN Zoo*](https://github.com/hindupuravinash/the-gan-zoo), retrieved July 15, 2022
28. [↑](#cite_ref-28) Odena, Augustus; Olah, Christopher; Shlens, Jonathon (July 17, 2017). ["Conditional Image Synthesis with Auxiliary Classifier GANs"](https://proceedings.mlr.press/v70/odena17a.html). *International Conference on Machine Learning*. PMLR: 2642–2651. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1610.09585](https://arxiv.org/abs/1610.09585).
29. [↑](#cite_ref-29) Radford, Alec; Metz, Luke; Chintala, Soumith (2016). "Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks". *ICLR*. [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [11758569](https://api.semanticscholar.org/CorpusID:11758569).
30. [↑](#cite_ref-30) Long, Jonathan; Shelhamer, Evan; Darrell, Trevor (2015). ["Fully Convolutional Networks for Semantic Segmentation"](https://openaccess.thecvf.com/content_cvpr_2015/html/Long_Fully_Convolutional_Networks_2015_CVPR_paper.html). *CVF*: 3431–3440.
31. [↑](#cite_ref-31) Zhang, Han; Goodfellow, Ian; Metaxas, Dimitris; Odena, Augustus (May 24, 2019). ["Self-Attention Generative Adversarial Networks"](https://proceedings.mlr.press/v97/zhang19d.html). *International Conference on Machine Learning*. PMLR: 7354–7363.
32. [↑](#cite_ref-32) Larsen, Anders Boesen Lindbo; Sønderby, Søren Kaae; Larochelle, Hugo; Winther, Ole (June 11, 2016). ["Autoencoding beyond pixels using a learned similarity metric"](https://proceedings.mlr.press/v48/larsen16.html). *International Conference on Machine Learning*. PMLR: 1558–1566. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1512.09300](https://arxiv.org/abs/1512.09300).
33. [↑](#cite_ref-33) Jiang, Yifan; Chang, Shiyu; Wang, Zhangyang (December 8, 2021). "TransGAN: Two Pure Transformers Can Make One Strong GAN, and That Can Scale Up". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2102.07074](https://arxiv.org/abs/2102.07074) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
34. [↑](#cite_ref-34) Grover, Aditya; Dhar, Manik; Ermon, Stefano (May 1, 2017). "Flow-GAN: Combining Maximum Likelihood and Adversarial Learning in Generative Models". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1705.08868](https://arxiv.org/abs/1705.08868) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
35. [↑](#cite_ref-35) Arjovsky, Martin; Bottou, Léon (January 1, 2017). "Towards Principled Methods for Training Generative Adversarial Networks". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1701.04862](https://arxiv.org/abs/1701.04862) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
36. [↑](#cite_ref-36) Goodfellow, Ian J. (December 1, 2014). "On distinguishability criteria for estimating generative models". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1412.6515](https://arxiv.org/abs/1412.6515) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
37. [↑](#cite_ref-37) Goodfellow, Ian (August 31, 2016). ["Generative Adversarial Networks (GANs), Presentation at Berkeley Artificial Intelligence Lab"](https://www.iangoodfellow.com/slides/2016-08-31-Berkeley.pdf) (PDF). [Archived](https://web.archive.org/web/20220508101103/https://www.iangoodfellow.com/slides/2016-08-31-Berkeley.pdf) (PDF) from the original on May 8, 2022.
38. [↑](#cite_ref-38) Lim, Jae Hyun; Ye, Jong Chul (May 8, 2017). "Geometric GAN". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1705.02894](https://arxiv.org/abs/1705.02894) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
39. [↑](#cite_ref-39) Mao, Xudong; Li, Qing; Xie, Haoran; Lau, Raymond Y. K.; Wang, Zhen; Paul Smolley, Stephen (2017). ["Least Squares Generative Adversarial Networks"](https://openaccess.thecvf.com/content_iccv_2017/html/Mao_Least_Squares_Generative_ICCV_2017_paper.html). *2017 IEEE International Conference on Computer Vision (ICCV)*. pp. 2794–2802. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1611.04076](https://arxiv.org/abs/1611.04076). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/ICCV.2017.304](https://doi.org/10.1109%2FICCV.2017.304). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-5386-1032-9](https://en.wikipedia.org/wiki/Special:BookSources/978-1-5386-1032-9 "Special:BookSources/978-1-5386-1032-9").
40. [↑](#cite_ref-40) Makhzani, Alireza; Shlens, Jonathon; Jaitly, Navdeep; [Goodfellow, Ian](https://en.wikipedia.org/wiki/Ian_Goodfellow "Ian Goodfellow"); [Frey, Brendan](https://en.wikipedia.org/wiki/Brendan_Frey "Brendan Frey") (2016). "Adversarial Autoencoders". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1511.05644](https://arxiv.org/abs/1511.05644) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
41. [↑](#cite_ref-41) Barber, David; Agakov, Felix (December 9, 2003). ["The IM algorithm: a variational approach to Information Maximization"](https://dl.acm.org/doi/abs/10.5555/2981345.2981371). *Proceedings of the 16th International Conference on Neural Information Processing Systems*. NIPS'03. Cambridge, MA, USA: MIT Press: 201–208.
42. [↑](#cite_ref-42) Chen, Xi; Duan, Yan; Houthooft, Rein; Schulman, John; Sutskever, Ilya; Abbeel, Pieter (2016). ["InfoGAN: Interpretable Representation Learning by Information Maximizing Generative Adversarial Nets"](https://proceedings.neurips.cc/paper/2016/hash/7c9d0b1f96aebd7b5eca8c3edaa19ebb-Abstract.html). *Advances in Neural Information Processing Systems*. **29**. Curran Associates, Inc. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1606.03657](https://arxiv.org/abs/1606.03657).
43. [↑](#cite_ref-43) Donahue, Jeff; Krähenbühl, Philipp; [Darrell, Trevor](https://en.wikipedia.org/wiki/Trevor_Darrell "Trevor Darrell") (2016). "Adversarial Feature Learning". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1605.09782](https://arxiv.org/abs/1605.09782) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
44. [↑](#cite_ref-44) Dumoulin, Vincent; Belghazi, Ishmael; Poole, Ben; Mastropietro, Olivier; Arjovsky, Alex; Courville, Aaron (2016). "Adversarially Learned Inference". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1606.00704](https://arxiv.org/abs/1606.00704) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
45. [↑](#cite_ref-45) Xi Chen; Yan Duan; Rein Houthooft; John Schulman; [Ilya Sutskever](https://en.wikipedia.org/wiki/Ilya_Sutskever "Ilya Sutskever"); [Pieter Abeel](https://en.wikipedia.org/wiki/Pieter_Abbeel "Pieter Abbeel") (2016). "InfoGAN: Interpretable Representation Learning by Information Maximizing Generative Adversarial Nets". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1606.03657](https://arxiv.org/abs/1606.03657) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
46. [↑](#cite_ref-46) Zhirui Zhang; Shujie Liu; Mu Li; Ming Zhou; Enhong Chen (October 2018). ["Bidirectional Generative Adversarial Networks for Neural Machine Translation"](https://www.aclweb.org/anthology/K18-1019.pdf) (PDF). pp. 190–199.
47. [↑](#cite_ref-47) Zhu, Jun-Yan; Park, Taesung; Isola, Phillip; Efros, Alexei A. (2017). "Unpaired Image-To-Image Translation Using Cycle-Consistent Adversarial Networks". pp. 2223–2232. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1703.10593](https://arxiv.org/abs/1703.10593) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
48. [↑](#cite_ref-48) Isola, Phillip; Zhu, Jun-Yan; Zhou, Tinghui; Efros, Alexei A. (2017). "Image-To-Image Translation With Conditional Adversarial Networks". pp. 1125–1134. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1611.07004](https://arxiv.org/abs/1611.07004) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
49. [↑](#cite_ref-49) Brownlee, Jason (August 22, 2019). ["A Gentle Introduction to BigGAN the Big Generative Adversarial Network"](https://machinelearningmastery.com/a-gentle-introduction-to-the-biggan/). *Machine Learning Mastery*. Retrieved July 15, 2022.
50. [↑](#cite_ref-50) Shengyu, Zhao; Zhijian, Liu; Ji, Lin; Jun-Yan, Zhu; Song, Han (2020). ["Differentiable Augmentation for Data-Efficient GAN Training"](https://proceedings.neurips.cc/paper/2020/hash/55479c55ebd1efd3ff125f1337100388-Abstract.html). *Advances in Neural Information Processing Systems*. **33**. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2006.10738](https://arxiv.org/abs/2006.10738).
51. [1](#cite_ref-:4_51-0) [2](#cite_ref-:4_51-1) [3](#cite_ref-:4_51-2) Tero, Karras; Miika, Aittala; Janne, Hellsten; Samuli, Laine; Jaakko, Lehtinen; Timo, Aila (2020). ["Training Generative Adversarial Networks with Limited Data"](https://proceedings.neurips.cc/paper/2020/hash/8d30aa96e72440759f74bd2306c1fa3d-Abstract.html). *Advances in Neural Information Processing Systems*. **33**.
52. [↑](#cite_ref-52) Shaham, Tamar Rott; Dekel, Tali; Michaeli, Tomer (October 2019). ["SinGAN: Learning a Generative Model from a Single Natural Image"](https://dx.doi.org/10.1109/iccv.2019.00467). *2019 IEEE/CVF International Conference on Computer Vision (ICCV)*. IEEE. pp. 4569–4579. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1905.01164](https://arxiv.org/abs/1905.01164). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/iccv.2019.00467](https://doi.org/10.1109%2Ficcv.2019.00467). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-7281-4803-8](https://en.wikipedia.org/wiki/Special:BookSources/978-1-7281-4803-8 "Special:BookSources/978-1-7281-4803-8"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [145052179](https://api.semanticscholar.org/CorpusID:145052179).
53. [↑](#cite_ref-53) Karras, Tero; Laine, Samuli; Aila, Timo (June 2019). ["A Style-Based Generator Architecture for Generative Adversarial Networks"](https://dx.doi.org/10.1109/cvpr.2019.00453). *2019 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*. IEEE. pp. 4396–4405. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1812.04948](https://arxiv.org/abs/1812.04948). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/cvpr.2019.00453](https://doi.org/10.1109%2Fcvpr.2019.00453). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-7281-3293-8](https://en.wikipedia.org/wiki/Special:BookSources/978-1-7281-3293-8 "Special:BookSources/978-1-7281-3293-8"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [54482423](https://api.semanticscholar.org/CorpusID:54482423).
54. [↑](#cite_ref-54) Karras, Tero; Laine, Samuli; Aittala, Miika; Hellsten, Janne; Lehtinen, Jaakko; Aila, Timo (June 2020). ["Analyzing and Improving the Image Quality of StyleGAN"](https://dx.doi.org/10.1109/cvpr42600.2020.00813). *2020 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*. IEEE. pp. 8107–8116. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1912.04958](https://arxiv.org/abs/1912.04958). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/cvpr42600.2020.00813](https://doi.org/10.1109%2Fcvpr42600.2020.00813). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-7281-7168-5](https://en.wikipedia.org/wiki/Special:BookSources/978-1-7281-7168-5 "Special:BookSources/978-1-7281-7168-5"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [209202273](https://api.semanticscholar.org/CorpusID:209202273).
55. [↑](#cite_ref-55) Timo, Karras, Tero Aittala, Miika Laine, Samuli Härkönen, Erik Hellsten, Janne Lehtinen, Jaakko Aila (June 23, 2021). *Alias-Free Generative Adversarial Networks*. [OCLC](https://en.wikipedia.org/wiki/OCLC_(identifier) "OCLC (identifier)") [1269560084](https://search.worldcat.org/oclc/1269560084).`{{`[`cite book`](https://en.wikipedia.org/wiki/Template:Cite_book "Template:Cite book")`}}`: CS1 maint: multiple names: authors list ([link](https://en.wikipedia.org/wiki/Category:CS1_maint:_multiple_names:_authors_list "Category:CS1 maint: multiple names: authors list"))
56. [↑](#cite_ref-56) Karras, Tero; Aittala, Miika; Laine, Samuli; Härkönen, Erik; Hellsten, Janne; Lehtinen, Jaakko; Aila, Timo. ["Alias-Free Generative Adversarial Networks (StyleGAN3)"](https://nvlabs.github.io/stylegan3). *nvlabs.github.io*. Retrieved July 16, 2022.
57. [↑](#cite_ref-57) Li, Bonnie; François-Lavet, Vincent; Doan, Thang; Pineau, Joelle (February 14, 2021). "Domain Adversarial Reinforcement Learning". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2102.07097](https://arxiv.org/abs/2102.07097) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
58. [↑](#cite_ref-58) Schawinski, Kevin; Zhang, Ce; Zhang, Hantian; Fowler, Lucas; Santhanam, Gokula Krishnan (February 1, 2017). ["Generative Adversarial Networks recover features in astrophysical images of galaxies beyond the deconvolution limit"](https://doi.org/10.1093%2Fmnrasl%2Fslx008). *Monthly Notices of the Royal Astronomical Society: Letters*. **467** (1): L110–L114. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1702.00403](https://arxiv.org/abs/1702.00403). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2017MNRAS.467L.110S](https://scixplorer.org/abs/2017MNRAS.467L.110S). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1093/mnrasl/slx008](https://doi.org/10.1093%2Fmnrasl%2Fslx008). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [7213940](https://api.semanticscholar.org/CorpusID:7213940).
59. [↑](#cite_ref-59) Kincade, Kathy. ["Researchers Train a Neural Network to Study Dark Matter"](https://www.rdmag.com/news/2019/05/researchers-train-neural-network-study-dark-matter). R&D Magazine.
60. [↑](#cite_ref-60) Kincade, Kathy (May 16, 2019). ["CosmoGAN: Training a neural network to study dark matter"](https://phys.org/news/2019-05-cosmogan-neural-network-dark.html). *Phys.org*.
61. [↑](#cite_ref-61) ["Training a neural network to study dark matter"](https://www.sciencedaily.com/releases/2019/05/190516145206.htm). *Science Daily*. May 16, 2019.
62. [↑](#cite_ref-62) at 06:13, Katyanna Quach 20 May 2019. ["Cosmoboffins use neural networks to build dark matter maps the easy way"](https://www.theregister.com/software/2019/05/20/cosmoboffins-use-neural-networks-to-build-dark-matter-maps-the-easy-way/546174). *The Register*. Retrieved May 20, 2019.`{{`[`cite web`](https://en.wikipedia.org/wiki/Template:Cite_web "Template:Cite web")`}}`: CS1 maint: numeric names: authors list ([link](https://en.wikipedia.org/wiki/Category:CS1_maint:_numeric_names:_authors_list "Category:CS1 maint: numeric names: authors list"))
63. [↑](#cite_ref-63) Mustafa, Mustafa; Bard, Deborah; Bhimji, Wahid; Lukić, Zarija; Al-Rfou, Rami; Kratochvil, Jan M. (May 6, 2019). ["CosmoGAN: creating high-fidelity weak lensing convergence maps using Generative Adversarial Networks"](https://doi.org/10.1186%2Fs40668-019-0029-9). *Computational Astrophysics and Cosmology*. **6** (1) 1. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1706.02390](https://arxiv.org/abs/1706.02390). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2019ComAC...6....1M](https://scixplorer.org/abs/2019ComAC...6....1M). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1186/s40668-019-0029-9](https://doi.org/10.1186%2Fs40668-019-0029-9). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2197-7909](https://search.worldcat.org/issn/2197-7909). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [126034204](https://api.semanticscholar.org/CorpusID:126034204).
64. [↑](#cite_ref-64) Paganini, Michela; de Oliveira, Luke; Nachman, Benjamin (2017). "Learning Particle Physics by Example: Location-Aware Generative Adversarial Networks for Physics Synthesis". *Computing and Software for Big Science*. **1** (1): 4. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1701.05927](https://arxiv.org/abs/1701.05927). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2017CSBS....1....4D](https://scixplorer.org/abs/2017CSBS....1....4D). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s41781-017-0004-6](https://doi.org/10.1007%2Fs41781-017-0004-6). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [88514467](https://api.semanticscholar.org/CorpusID:88514467).
65. [↑](#cite_ref-65) Paganini, Michela; de Oliveira, Luke; Nachman, Benjamin (2018). "Accelerating Science with Generative Adversarial Networks: An Application to 3D Particle Showers in Multi-Layer Calorimeters". *Physical Review Letters*. **120** (4) 042003. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1705.02355](https://arxiv.org/abs/1705.02355). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2018PhRvL.120d2003P](https://scixplorer.org/abs/2018PhRvL.120d2003P). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1103/PhysRevLett.120.042003](https://doi.org/10.1103%2FPhysRevLett.120.042003). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [29437460](https://pubmed.ncbi.nlm.nih.gov/29437460). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [3330974](https://api.semanticscholar.org/CorpusID:3330974).
66. [↑](#cite_ref-66) Paganini, Michela; de Oliveira, Luke; Nachman, Benjamin (2018). "CaloGAN: Simulating 3D High Energy Particle Showers in Multi-Layer Electromagnetic Calorimeters with Generative Adversarial Networks". *Phys. Rev. D*. **97** (1) 014021. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1712.10321](https://arxiv.org/abs/1712.10321). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2018PhRvD..97a4021P](https://scixplorer.org/abs/2018PhRvD..97a4021P). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1103/PhysRevD.97.014021](https://doi.org/10.1103%2FPhysRevD.97.014021). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [41265836](https://api.semanticscholar.org/CorpusID:41265836).
67. [↑](#cite_ref-67) Erdmann, Martin; Glombitza, Jonas; Quast, Thorben (2019). "Precise Simulation of Electromagnetic Calorimeter Showers Using a Wasserstein Generative Adversarial Network". *Computing and Software for Big Science*. **3** (1): 4. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1807.01954](https://arxiv.org/abs/1807.01954). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2019CSBS....3....4E](https://scixplorer.org/abs/2019CSBS....3....4E). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s41781-018-0019-7](https://doi.org/10.1007%2Fs41781-018-0019-7). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [54216502](https://api.semanticscholar.org/CorpusID:54216502).
68. [↑](#cite_ref-68) Musella, Pasquale; Pandolfi, Francesco (2018). "Fast and Accurate Simulation of Particle Detectors Using Generative Adversarial Networks". *Computing and Software for Big Science*. **2** (1): 8. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1805.00850](https://arxiv.org/abs/1805.00850). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2018CSBS....2....8M](https://scixplorer.org/abs/2018CSBS....2....8M). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s41781-018-0015-y](https://doi.org/10.1007%2Fs41781-018-0015-y). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [119474793](https://api.semanticscholar.org/CorpusID:119474793).
69. [↑](#cite_ref-69) ["Deep generative models for fast shower simulation in ATLAS"](https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/PUBNOTES/ATL-SOFT-PUB-2018-001/). 2018.
70. [↑](#cite_ref-70) SHiP, Collaboration (2019). "Fast simulation of muons produced at the SHiP experiment using Generative Adversarial Networks". *Journal of Instrumentation*. **14** (11) 11028. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1909.04451](https://arxiv.org/abs/1909.04451). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2019JInst..14P1028A](https://scixplorer.org/abs/2019JInst..14P1028A). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1088/1748-0221/14/11/P11028](https://doi.org/10.1088%2F1748-0221%2F14%2F11%2FP11028). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [202542604](https://api.semanticscholar.org/CorpusID:202542604).
71. [↑](#cite_ref-71) Nista, Ludovico; Pitsch, Heinz; Schumann, Christoph D. K.; Bode, Mathis; Grenga, Temistocle; MacArt, Jonathan F.; Attili, Antonio (June 4, 2024). ["Influence of adversarial training on super-resolution turbulence reconstruction"](https://link.aps.org/doi/10.1103/PhysRevFluids.9.064601). *Physical Review Fluids*. **9** (6) 064601. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2308.16015](https://arxiv.org/abs/2308.16015). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2024PhRvF...9f4601N](https://scixplorer.org/abs/2024PhRvF...9f4601N). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1103/PhysRevFluids.9.064601](https://doi.org/10.1103%2FPhysRevFluids.9.064601).
72. [↑](#cite_ref-72) Nista, L.; Schumann, C. D. K.; Grenga, T.; Attili, A.; Pitsch, H. (January 1, 2023). ["Investigation of the generalization capability of a generative adversarial network for large eddy simulation of turbulent premixed reacting flows"](https://www.sciencedirect.com/science/article/pii/S1540748922002851). *Proceedings of the Combustion Institute*. **39** (4): 5279–5288. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2023PComI..39.5279N](https://scixplorer.org/abs/2023PComI..39.5279N). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.proci.2022.07.244](https://doi.org/10.1016%2Fj.proci.2022.07.244). [hdl](https://en.wikipedia.org/wiki/Hdl_(identifier) "Hdl (identifier)"):[20.500.11820/d36801a4-ead5-4379-92a4-020a509112ec](https://hdl.handle.net/20.500.11820%2Fd36801a4-ead5-4379-92a4-020a509112ec). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1540-7489](https://search.worldcat.org/issn/1540-7489).
73. [↑](#cite_ref-73) Fukami, Kai; Fukagata, Koji; Taira, Kunihiko (August 1, 2020). "Assessment of supervised machine learning methods for fluid flows". *Theoretical and Computational Fluid Dynamics*. **34** (4): 497–519. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2001.09618](https://arxiv.org/abs/2001.09618). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2020ThCFD..34..497F](https://scixplorer.org/abs/2020ThCFD..34..497F). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s00162-020-00518-y](https://doi.org/10.1007%2Fs00162-020-00518-y). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1432-2250](https://search.worldcat.org/issn/1432-2250).
74. [↑](#cite_ref-74) Zhavoronkov, Alex (2019). "Deep learning enables rapid identification of potent DDR1 kinase inhibitors". *Nature Biotechnology*. **37** (9): 1038–1040. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1038/s41587-019-0224-x](https://doi.org/10.1038%2Fs41587-019-0224-x). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [31477924](https://pubmed.ncbi.nlm.nih.gov/31477924). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [201716327](https://api.semanticscholar.org/CorpusID:201716327).
75. [↑](#cite_ref-75) Barber, Gregory. ["A Molecule Designed By AI Exhibits "Druglike" Qualities"](https://www.wired.com/story/molecule-designed-ai-exhibits-druglike-qualities/). *Wired*.
76. [↑](#cite_ref-76) Moradi, M; Demirel, H (2024). "Alzheimer's disease classification using 3D conditional progressive GAN-and LDA-based data selection". *Signal, Image and Video Processing*. **18** (2): 1847–1861. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s11760-023-02878-4](https://doi.org/10.1007%2Fs11760-023-02878-4).
77. [↑](#cite_ref-77) Bisneto, Tomaz Ribeiro Viana; de Carvalho Filho, Antonio Oseas; Magalhães, Deborah Maria Vieira (February 2020). "Generative adversarial network and texture features applied to automatic glaucoma detection". *Applied Soft Computing*. **90** 106165. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.asoc.2020.106165](https://doi.org/10.1016%2Fj.asoc.2020.106165). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [214571484](https://api.semanticscholar.org/CorpusID:214571484).
78. [↑](#cite_ref-78) [*Reconstruction of the Roman Emperors: Interview with Daniel Voshart*](https://www.youtube.com/watch?v=5mr6-JbuLrQ), November 16, 2020, retrieved June 3, 2022
79. [↑](#cite_ref-TPDNEwuaitcryhf%7C_79-0) msmash (February 14, 2019). ["'This Person Does Not Exist' Website Uses AI To Create Realistic Yet Horrifying Faces"](https://tech.slashdot.org/story/19/02/14/199200/this-person-does-not-exist-website-uses-ai-to-create-realistic-yet-horrifying-faces). *Slashdot*. Retrieved February 16, 2019.
80. [↑](#cite_ref-80) Doyle, Michael (May 16, 2019). ["John Beasley lives on Saddlehorse Drive in Evansville. Or does he?"](https://www.courierpress.com/story/news/crime/2019/05/16/john-beasley-lives-saddlehorse-drive-evansville-does-he/3700111002/). Courier and Press.
81. [↑](#cite_ref-81) Targett, Ed (May 16, 2019). "California moves closer to making deepfake pornography illegal". Computer Business Review.
82. [↑](#cite_ref-CNET2019_82-0) Mihalcik, Carrie (October 4, 2019). ["California laws seek to crack down on deepfakes in politics and porn"](https://www.cnet.com/news/california-laws-seek-to-crack-down-on-deepfakes-in-politics-and-porn/). *[cnet.com](https://en.wikipedia.org/wiki/Cnet.com "Cnet.com")*. [CNET](https://en.wikipedia.org/wiki/CNET "CNET"). Retrieved October 13, 2019.
83. [↑](#cite_ref-83) Knight, Will (August 7, 2018). ["The Defense Department has produced the first tools for catching deepfakes"](https://www.technologyreview.com/s/611726/the-defense-department-has-produced-the-first-tools-for-catching-deepfakes/). *MIT Technology Review*.
84. [↑](#cite_ref-84) Vincent, James (March 5, 2019). ["A never-ending stream of AI art goes up for auction"](https://www.theverge.com/2019/3/5/18251267/ai-art-gans-mario-klingemann-auction-sothebys-technology). *The Verge*. Retrieved June 13, 2020.
85. [↑](#cite_ref-85) Yu, Jiahui, et al. "[Generative image inpainting with contextual attention](http://openaccess.thecvf.com/content_cvpr_2018/papers/Yu_Generative_Image_Inpainting_CVPR_2018_paper.pdf)." Proceedings of the IEEE conference on computer vision and pattern recognition. 2018.
86. [↑](#cite_ref-86) Wong, Ceecee (May 27, 2019). ["The Rise of AI Supermodels"](https://www.cdotrends.com/story/14300/rise-ai-supermodels). *CDO Trends*.
87. [↑](#cite_ref-87) Taif, K.; Ugail, H.; Mehmood, I. (2020). "Cast Shadow Generation Using Generative Adversarial Networks". *Computational Science – ICCS 2020*. Lecture Notes in Computer Science. Vol. 12141. pp. 481–495. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/978-3-030-50426-7_36](https://doi.org/10.1007%2F978-3-030-50426-7_36). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-3-030-50425-0](https://en.wikipedia.org/wiki/Special:BookSources/978-3-030-50425-0 "Special:BookSources/978-3-030-50425-0"). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [7302543](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7302543).
88. [↑](#cite_ref-88) Wei, Jerry (July 3, 2019). ["Generating Shoe Designs with Machine Learning"](https://web.archive.org/web/20200430163354/https://towardsdatascience.com/generating-shoe-designs-with-deep-learning-5dde432a23b8). *Medium*. Archived from [the original](https://towardsdatascience.com/generating-shoe-designs-with-deep-learning-5dde432a23b8) on April 30, 2020. Retrieved November 6, 2019.
89. [↑](#cite_ref-89) Greenemeier, Larry (June 20, 2016). ["When Will Computers Have Common Sense? Ask Facebook"](https://www.scientificamerican.com/article/when-will-computers-have-common-sense-ask-facebook/). *Scientific American*. Retrieved July 31, 2016.
90. [↑](#cite_ref-90) Elgammal, Ahmed; Liu, Bingchen; Elhoseiny, Mohamed; Mazzone, Marian (2017). "CAN: Creative Adversarial Networks, Generating "Art" by Learning About Styles and Deviating from Style Norms". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1706.07068](https://arxiv.org/abs/1706.07068) \[[cs.AI](https://arxiv.org/archive/cs.AI)\].
91. [↑](#cite_ref-91) Mazzone, Marian; Ahmed Elgammal (February 21, 2019). ["Art, Creativity, and the Potential of Artificial Intelligence"](https://doi.org/10.3390%2Farts8010026). *Arts*. **8**: 26. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.3390/arts8010026](https://doi.org/10.3390%2Farts8010026).
92. [↑](#cite_ref-92) Cohn, Gabe (October 25, 2018). ["AI Art at Christie's Sells for \$432,500"](https://www.nytimes.com/2018/10/25/arts/design/ai-art-sold-christies.html). *The New York Times*.
93. [↑](#cite_ref-93) Tang, Xiaoou; Qiao, Yu; Loy, Chen Change; Dong, Chao; Liu, Yihao; Gu, Jinjin; Wu, Shixiang; Yu, Ke; Wang, Xintao (September 1, 2018). "ESRGAN: Enhanced Super-Resolution Generative Adversarial Networks". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1809.00219](https://arxiv.org/abs/1809.00219) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
94. [↑](#cite_ref-94) Allen, Eric Van (July 8, 2020). ["An Infamous Zelda Creepypasta Saga Is Using Artificial Intelligence to Craft Its Finale"](https://web.archive.org/web/20221107030028/https://www.usgamer.net/articles/ben-drowned-zelda-creepypasta-finale-artificial-intelligence). *USgamer*. Archived from [the original](https://www.usgamer.net/articles/ben-drowned-zelda-creepypasta-finale-artificial-intelligence) on November 7, 2022. Retrieved November 7, 2022.
95. [↑](#cite_ref-95) arcadeattack (September 28, 2020). ["Arcade Attack Podcast – September (4 of 4) 2020 - Alex Hall (Ben Drowned) - Interview"](https://www.arcadeattack.co.uk/podcast-september-4-2020/). *Arcade Attack*. Retrieved November 7, 2022.
96. [↑](#cite_ref-96) ["Nvidia's AI recreates Pac-Man from scratch just by watching it being played"](https://www.theverge.com/2020/5/22/21266251/nvidia-ai-gamegan-recreate-pac-man-virutal-environment). *The Verge*. May 22, 2020.
97. [↑](#cite_ref-97) Seung Wook Kim; Zhou, Yuhao; Philion, Jonah; Torralba, Antonio; Fidler, Sanja (2020). "Learning to Simulate Dynamic Environments with GameGAN". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2005.12126](https://arxiv.org/abs/2005.12126) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
98. [↑](#cite_ref-98) Yu, Yi; Canales, Simon (2021). "Conditional LSTM-GAN for Melody Generation from Lyrics". *ACM Transactions on Multimedia Computing, Communications, and Applications*. **17**: 1–20. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1908.05551](https://arxiv.org/abs/1908.05551). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1145/3424116](https://doi.org/10.1145%2F3424116). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1551-6857](https://search.worldcat.org/issn/1551-6857). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [199668828](https://api.semanticscholar.org/CorpusID:199668828).
99. [↑](#cite_ref-99) Antipov, Grigory; Baccouche, Moez; Dugelay, Jean-Luc (2017). "Face Aging With Conditional Generative Adversarial Networks". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1702.01983](https://arxiv.org/abs/1702.01983) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
100. [↑](#cite_ref-100) ["3D Generative Adversarial Network"](http://3dgan.csail.mit.edu/). *3dgan.csail.mit.edu*.
101. [↑](#cite_ref-101) Achlioptas, Panos; Diamanti, Olga; Mitliagkas, Ioannis; Guibas, Leonidas (2018). "Learning Representations and Generative Models for 3D Point Clouds". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1707.02392](https://arxiv.org/abs/1707.02392) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
102. [↑](#cite_ref-102) Vondrick, Carl; Pirsiavash, Hamed; Torralba, Antonio (2016). ["Generating Videos with Scene Dynamics"](https://www.cs.columbia.edu/~vondrick/tinyvideo/). *carlvondrick.com*. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1609.02612](https://arxiv.org/abs/1609.02612). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2016arXiv160902612V](https://scixplorer.org/abs/2016arXiv160902612V).
103. [↑](#cite_ref-103) Kang, Yuhao; Gao, Song; Roth, Rob (2019). ["Transferring Multiscale Map Styles Using Generative Adversarial Networks"](https://geods.geography.wisc.edu/archives/1192). *International Journal of Cartography*. **5** (2–3): 115–141. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1905.02200](https://arxiv.org/abs/1905.02200). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2019IJCar...5..115K](https://scixplorer.org/abs/2019IJCar...5..115K). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1080/23729333.2019.1615729](https://doi.org/10.1080%2F23729333.2019.1615729). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [146808465](https://api.semanticscholar.org/CorpusID:146808465).
104. [↑](#cite_ref-104) Wijnands, Jasper; Nice, Kerry; Thompson, Jason; Zhao, Haifeng; Stevenson, Mark (2019). "Streetscape augmentation using generative adversarial networks: Insights related to health and wellbeing". *Sustainable Cities and Society*. **49** 101602. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1905.06464](https://arxiv.org/abs/1905.06464). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2019SusCS..4901602W](https://scixplorer.org/abs/2019SusCS..4901602W). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.scs.2019.101602](https://doi.org/10.1016%2Fj.scs.2019.101602). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [155100183](https://api.semanticscholar.org/CorpusID:155100183).
105. [↑](#cite_ref-105) Ukkonen, Antti; Joona, Pyry; Ruotsalo, Tuukka (2020). ["Generating Images Instead of Retrieving Them"](https://doi.org/10.1145/3397271.3401129). *Proceedings of the 43rd International ACM SIGIR Conference on Research and Development in Information Retrieval*. pp. 1329–1338. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1145/3397271.3401129](https://doi.org/10.1145%2F3397271.3401129). [hdl](https://en.wikipedia.org/wiki/Hdl_(identifier) "Hdl (identifier)"):[10138/328471](https://hdl.handle.net/10138%2F328471). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-4503-8016-4](https://en.wikipedia.org/wiki/Special:BookSources/978-1-4503-8016-4 "Special:BookSources/978-1-4503-8016-4"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [220730163](https://api.semanticscholar.org/CorpusID:220730163).
106. [↑](#cite_ref-106) ["AI can show us the ravages of climate change"](https://www.technologyreview.com/f/613547/ai-can-show-us-the-ravages-of-climate-change/). *MIT Technology Review*. May 16, 2019.
107. [↑](#cite_ref-107) Christian, Jon (May 28, 2019). ["ASTOUNDING AI GUESSES WHAT YOU LOOK LIKE BASED ON YOUR VOICE"](https://futurism.com/the-byte/ai-guesses-appearance-voice). Futurism.
108. [↑](#cite_ref-108) Kulp, Patrick (May 23, 2019). ["Samsung's AI Lab Can Create Fake Video Footage From a Single Headshot"](https://www.adweek.com/digital/samsungs-ai-lab-can-create-fake-video-footage-from-a-single-headshot/). *AdWeek*.
109. [↑](#cite_ref-109) Mohammad Navid Fekri; Ananda Mohon Ghosh; Katarina Grolinger (2020). ["Generating Energy Data for Machine Learning with Recurrent Generative Adversarial Networks"](https://doi.org/10.3390%2Fen13010130). *Energies*. **13** (1): 130. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.3390/en13010130](https://doi.org/10.3390%2Fen13010130).
110. [↑](#cite_ref-110) Iwai, Shoma; Miyazaki, Tomo; Omachi, Shinichiro (2024). ["Dual-Conditioned Training to Exploit Pre-Trained Codebook-Based Generative Model in Image Compression"](https://ieeexplore.ieee.org/document/10815956). *IEEE Access*. **12**: 198184–198200. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/ACCESS.2024.3522238](https://doi.org/10.1109%2FACCESS.2024.3522238). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2169-3536](https://search.worldcat.org/issn/2169-3536).
111. [↑](#cite_ref-111) Pei, Yifei; Liu, Ying; Ling, Nam (2026). ["Adaptive Fused Prior Transfer for Controllable Generative Image Compression"](https://ieeexplore.ieee.org/document/11712133). *IEEE Access*. **14**: 150315–150337. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2605.16817](https://arxiv.org/abs/2605.16817). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/ACCESS.2026.3737467](https://doi.org/10.1109%2FACCESS.2026.3737467). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2169-3536](https://search.worldcat.org/issn/2169-3536).
112. [↑](#cite_ref-curiosity1991_112-0) [Schmidhuber, Jürgen](https://en.wikipedia.org/wiki/Juergen_Schmidhuber "Juergen Schmidhuber") (1991). "A possibility for implementing curiosity and boredom in model-building neural controllers". *Proc. SAB'1991*. MIT Press/Bradford Books. pp. 222–227.
113. [↑](#cite_ref-gancurpm2020_113-0) [Schmidhuber, Jürgen](https://en.wikipedia.org/wiki/Juergen_Schmidhuber "Juergen Schmidhuber") (2020). "Generative Adversarial Networks are Special Cases of Artificial Curiosity (1990) and also Closely Related to Predictability Minimization (1991)". *Neural Networks*. **127**: 58–66. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1906.04493](https://arxiv.org/abs/1906.04493). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.neunet.2020.04.008](https://doi.org/10.1016%2Fj.neunet.2020.04.008). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [32334341](https://pubmed.ncbi.nlm.nih.gov/32334341). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [216056336](https://api.semanticscholar.org/CorpusID:216056336).
114. [↑](#cite_ref-olli2010_114-0) Niemitalo, Olli (February 24, 2010). ["A method for training artificial neural networks to generate missing data within a variable context"](http://yehar.com:80/blog/?p=167). *Internet Archive (Wayback Machine)*. [Archived](https://web.archive.org/web/20120312111546/http://yehar.com/blog/?p=167) from the original on March 12, 2012. Retrieved February 22, 2019.
115. [↑](#cite_ref-Li-etal-GECCO2013_115-0) Li, Wei; Gauci, Melvin; Gross, Roderich (July 6, 2013). "A Coevolutionary Approach to Learn Animal Behavior Through Controlled Interaction". *Proceedings of the 15th Annual Conference on Genetic and Evolutionary Computation (GECCO 2013)*. Amsterdam, the Netherlands: ACM. pp. 223–230. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1145/2463372.2465801](https://doi.org/10.1145%2F2463372.2465801). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-4503-1963-8](https://en.wikipedia.org/wiki/Special:BookSources/978-1-4503-1963-8 "Special:BookSources/978-1-4503-1963-8").
116. [↑](#cite_ref-116) Gutmann, Michael; Hyvärinen, Aapo. ["Noise-Contrastive Estimation"](http://proceedings.mlr.press/v9/gutmann10a/gutmann10a.pdf) (PDF). *International Conference on AI and Statistics*.
117. [↑](#cite_ref-117) Abu-Khalaf, Murad; Lewis, Frank L.; Huang, Jie (July 1, 2008). "Neurodynamic Programming and Zero-Sum Games for Constrained Control Systems". *IEEE Transactions on Neural Networks*. **19** (7): 1243–1252. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2008ITNN...19.1243A](https://scixplorer.org/abs/2008ITNN...19.1243A). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/TNN.2008.2000204](https://doi.org/10.1109%2FTNN.2008.2000204). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [15680448](https://api.semanticscholar.org/CorpusID:15680448).
118. [↑](#cite_ref-118) Abu-Khalaf, Murad; Lewis, Frank L.; Huang, Jie (December 1, 2006). "Policy Iterations on the Hamilton–Jacobi–Isaacs Equation for *H*_(∞) State Feedback Control With Input Saturation". *IEEE Transactions on Automatic Control*. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/TAC.2006.884959](https://doi.org/10.1109%2FTAC.2006.884959). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [1338976](https://api.semanticscholar.org/CorpusID:1338976).
119. [↑](#cite_ref-119) Sajjadi, Mehdi S. M.; Schölkopf, Bernhard; Hirsch, Michael (December 23, 2016). "EnhanceNet: Single Image Super-Resolution Through Automated Texture Synthesis". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1612.07919](https://arxiv.org/abs/1612.07919) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
120. [↑](#cite_ref-120) ["This Person Does Not Exist: Neither Will Anything Eventually with AI"](https://medium.com/@alagraphy/this-person-does-not-exist-neither-will-anything-if-artificial-intelligence-keeps-learning-1a9fcba728f). March 20, 2019.
121. [↑](#cite_ref-121) ["ARTificial Intelligence enters the History of Art"](https://www.issuewire.com/artificial-intelligence-enters-the-history-of-art-1620667772563815). December 28, 2018.
122. [↑](#cite_ref-122) Tom Février (February 17, 2019). ["Le scandale de l'intelligence ARTificielle"](https://link.medium.com/MYqBrGHIKV).
123. [↑](#cite_ref-123) ["StyleGAN: Official TensorFlow Implementation"](https://github.com/NVlabs/stylegan). March 2, 2019 – via GitHub.
124. [↑](#cite_ref-TPDNEitboowo2019_124-0) Paez, Danny (February 13, 2019). ["This Person Does Not Exist Is the Best One-Off Website of 2019"](https://www.inverse.com/article/53280-this-person-does-not-exist-gans-website=website=Inverse). Retrieved February 16, 2019.
125. [↑](#cite_ref-TPDNE_125-0) Beschizza, Rob (February 15, 2019). ["This Person Does Not Exist"](https://boingboing.net/2019/02/15/this-person-does-not-exist.html). *Boing-Boing*. Retrieved February 16, 2019.
126. [↑](#cite_ref-Style-based_GANs_–_Generating_and_Tuning_Realistic_Artificial_Faces_126-0) Horev, Rani (December 26, 2018). ["Style-based GANs – Generating and Tuning Realistic Artificial Faces"](https://web.archive.org/web/20201105101517/https://www.lyrn.ai/2018/12/26/a-style-based-generator-architecture-for-generative-adversarial-networks/). *Lyrn.AI*. Archived from [the original](https://www.lyrn.ai/2018/12/26/a-style-based-generator-architecture-for-generative-adversarial-networks/) on November 5, 2020. Retrieved February 16, 2019.

## External links

\[[edit](/w/index.php?title=Generative_adversarial_network&action=edit&section=47 "Edit section: External links")\]

- [![icon](//thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Ballerina-icon.jpg/40px-Ballerina-icon.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Ballerina-icon.jpg)[Art portal](https://en.wikipedia.org/wiki/Portal:Art "Portal:Art")

&nbsp;

- Knight, Will. ["5 Big Predictions for Artificial Intelligence in 2017"](https://www.technologyreview.com/s/603216/5-big-predictions-for-artificial-intelligence-in-2017/). *MIT Technology Review*. Retrieved January 5, 2017.
- Karras, Tero; Laine, Samuli; Aila, Timo (2018). "A Style-Based Generator Architecture for Generative Adversarial Networks". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1812.04948](https://arxiv.org/abs/1812.04948) \[[cs.NE](https://arxiv.org/archive/cs.NE)\].
- [This Person Does Not Exist](https://www.thispersondoesnotexist.com/) – photorealistic images of people who do not exist, generated by [StyleGAN](https://en.wikipedia.org/wiki/StyleGAN "StyleGAN")
- [This Cat Does Not Exist](https://thiscatdoesnotexist.com/) [Archived](https://web.archive.org/web/20190305040119/https://thiscatdoesnotexist.com/) March 5, 2019, at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine") – photorealistic images of cats who do not exist, generated by [StyleGAN](https://en.wikipedia.org/wiki/StyleGAN "StyleGAN")
- Wang, Zhengwei; She, Qi; Ward, Tomas E. (2019). "Generative Adversarial Networks in Computer Vision: A Survey and Taxonomy". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1906.01529](https://arxiv.org/abs/1906.01529) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].

[TABLE]

[TABLE]

![](https://en.wikipedia.org/wiki/Special:CentralAutoLogin/start?useformat=desktop&type=1x1&usesul3=1)

Retrieved from "[https://en.wikipedia.org/w/index.php?title=Generative_adversarial_network&oldid=1386173849](https://en.wikipedia.org/w/index.php?title=Generative_adversarial_network&oldid=1386173849)"
