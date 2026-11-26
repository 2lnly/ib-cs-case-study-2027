Source: https://en.wikipedia.org/wiki/Variational_autoencoder

Deep learning generative model to encode data representation

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/VAE_Basic.png/500px-VAE_Basic.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:VAE_Basic.png)

The basic scheme of a variational autoencoder. The model receives $x$ as input. The encoder compresses it into the latent space. The decoder receives as input the information sampled from the latent space and produces $x^{\prime}$ as similar as possible to $x$.

[TABLE]

In [machine learning](https://en.wikipedia.org/wiki/Machine_learning "Machine learning"), a **variational autoencoder** (**VAE**) is an [artificial neural network](https://en.wikipedia.org/wiki/Artificial_neural_network "Artificial neural network") architecture introduced by [Diederik P. Kingma](https://en.wikipedia.org/wiki/Durk_Kingma "Durk Kingma") and [Max Welling](https://en.wikipedia.org/wiki/Max_Welling "Max Welling") in 2013.^([\[1\]](#cite_note-1)) It is part of the families of [probabilistic graphical models](https://en.wikipedia.org/wiki/Graphical_model "Graphical model") and [variational Bayesian methods](https://en.wikipedia.org/wiki/Variational_Bayesian_methods "Variational Bayesian methods").^([\[2\]](#cite_note-2))

In addition to being seen as an [autoencoder](https://en.wikipedia.org/wiki/Autoencoder "Autoencoder") neural network architecture, variational autoencoders can also be studied within the mathematical formulation of [variational Bayesian methods](https://en.wikipedia.org/wiki/Variational_Bayesian_methods "Variational Bayesian methods"), connecting a neural encoder network to its decoder through a probabilistic [latent space](https://en.wikipedia.org/wiki/Latent_space "Latent space") (for example, as a [multivariate Gaussian distribution](https://en.wikipedia.org/wiki/Multivariate_Gaussian_distribution "Multivariate Gaussian distribution")) that corresponds to the parameters of a variational distribution.

Thus, the encoder maps each point (such as an image) from a large complex dataset into a distribution within the latent space, rather than to a single point in that space. The decoder has the opposite function, which is to map from the latent space to the input space, again according to a distribution (although in practice, noise is rarely added during the decoding stage). By mapping a point to a distribution instead of a single point, the network can avoid [overfitting](https://en.wikipedia.org/wiki/Overfitting "Overfitting") the training data. Both networks are typically trained together with the usage of the [reparameterization trick](#Reparameterization), although the variance of the noise model can be learned separately.^(\[*[citation needed](https://en.wikipedia.org/wiki/Wikipedia:Citation_needed "Wikipedia:Citation needed")*\])

Although this type of model was initially designed for [unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning "Unsupervised learning"),^([\[3\]](#cite_note-3)[\[4\]](#cite_note-4)) its effectiveness has been proven for [semi-supervised learning](https://en.wikipedia.org/wiki/Semi-supervised_learning "Semi-supervised learning")^([\[5\]](#cite_note-5)[\[6\]](#cite_note-6)) and [supervised learning](https://en.wikipedia.org/wiki/Supervised_learning "Supervised learning").^([\[7\]](#cite_note-7))

## Overview of architecture and operation

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=1 "Edit section: Overview of architecture and operation")\]

A variational autoencoder is a generative model with a prior and noise distribution respectively. Usually such models are trained using the [expectation-maximization](https://en.wikipedia.org/wiki/Expectation–maximization_algorithm "Expectation–maximization algorithm") meta-algorithm (e.g. [probabilistic PCA](https://en.wikipedia.org/wiki/Principal_component_analysis "Principal component analysis"), (spike & slab) sparse coding). Such a scheme optimizes a lower bound of the data likelihood, which is usually computationally intractable, and in doing so requires the discovery of q-distributions, or variational [posteriors](https://en.wikipedia.org/wiki/Posterior_probability "Posterior probability"). These q-distributions are normally parameterized for each individual data point in a separate optimization process. However, variational autoencoders use a neural network as an amortized approach to jointly optimize across data points. In that way, the same parameters are reused for multiple data points, which can result in massive memory savings. The first neural network takes as input the data points themselves, and outputs parameters for the variational distribution. As it maps from a known input space to the low-dimensional latent space, it is called the encoder.

The decoder is the second neural network of this model. It is a function that maps from the latent space to the input space, e.g. as the means of the noise distribution. It is possible to use another neural network that maps to the variance, however this can be omitted for simplicity. In such a case, the variance can be optimized with gradient descent.

To optimize this model, one needs to know two terms: the "reconstruction error", and the [Kullback–Leibler divergence](https://en.wikipedia.org/wiki/Kullback–Leibler_divergence "Kullback–Leibler divergence") (KL-D). Both terms are derived from the free energy expression of the probabilistic model, and therefore differ depending on the noise distribution and the assumed prior of the data, here referred to as p-distribution. For example, a standard VAE task such as IMAGENET is typically assumed to have a gaussianly distributed noise; however, tasks such as binarized MNIST require a Bernoulli noise. The KL-D from the free energy expression maximizes the probability mass of the q-distribution that overlaps with the p-distribution, which unfortunately can result in mode-seeking behaviour. The "reconstruction" term is the remainder of the free energy expression, and requires a sampling approximation to compute its expectation value.^([\[8\]](#cite_note-Kingma2013-8))

More recent approaches replace [Kullback–Leibler divergence](https://en.wikipedia.org/wiki/Kullback–Leibler_divergence "Kullback–Leibler divergence") (KL-D) with [various statistical distances](https://en.wikipedia.org/wiki/Statistical_distance "Statistical distance"), see ["Statistical distance VAE variants"](#Statistical_distance_VAE_variants) below.

## Formulation

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=2 "Edit section: Formulation")\]

From the point of view of probabilistic modeling, one wants to maximize the likelihood of the data $x$ by their chosen parameterized probability distribution $p_{\theta}(x) = p(x|\theta)$. This distribution is usually chosen to be a Gaussian $N(x|\mu,\sigma)$ which is parameterized by $\mu$ and $\sigma$ respectively, and as a member of the exponential family it is easy to work with as a noise distribution. Simple distributions are easy enough to maximize, however distributions where a prior is assumed over the latents $z$ results in intractable integrals. Let us find $p_{\theta}(x)$ via [marginalizing](https://en.wikipedia.org/wiki/Marginal_distribution "Marginal distribution") over $z$.

$p_{\theta}(x) = \int_{z}p_{\theta}({x,z})\, dz,$

where $p_{\theta}({x,z})$ represents the [joint distribution](https://en.wikipedia.org/wiki/Joint_distribution "Joint distribution") under $p_{\theta}$ of the observable data $x$ and its latent representation or encoding $z$. According to the [chain rule](https://en.wikipedia.org/wiki/Chain_rule_(probability) "Chain rule (probability)"), the equation can be rewritten as

$p_{\theta}(x) = \int_{z}p_{\theta}({x|z})p_{\theta}(z)\, dz$

In the vanilla variational autoencoder, $z$ is usually taken to be a finite-dimensional vector of real numbers, and $p_{\theta}({x|z})$ to be a [Gaussian distribution](https://en.wikipedia.org/wiki/Gaussian_distribution "Gaussian distribution"). Then $p_{\theta}(x)$ is a mixture of Gaussian distributions.

It is now possible to define the set of the relationships between the input data and its latent representation as

- Prior $p_{\theta}(z)$
- Likelihood $p_{\theta}(x)$
- Posterior $p_{\theta}(z|x)$

Unfortunately, the computation of $p_{\theta}(z|x)$ is expensive and in most cases intractable. To speed up the calculus to make it feasible, it is necessary to introduce a further function to approximate the posterior distribution as

$q_{\phi}({z|x}) \approx p_{\theta}({z|x})$

with $\phi$ defined as the set of real values that parametrize $q$. This is sometimes called *amortized inference*, since by "investing" in finding a good $q_{\phi}$, one can later infer $z$ from $x$ quickly without doing any integrals.

In this way, the problem is to find a good probabilistic autoencoder, in which the conditional likelihood distribution $p_{\theta}(x|z)$ is computed by the *probabilistic decoder*, and the approximated posterior distribution $q_{\phi}(z|x)$ is computed by the *probabilistic encoder*.

Parametrize the encoder as $E_{\phi}$, and the decoder as $D_{\theta}$.

## Evidence lower bound (ELBO)

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=3 "Edit section: Evidence lower bound (ELBO)")\]

Main article: [Evidence lower bound](https://en.wikipedia.org/wiki/Evidence_lower_bound "Evidence lower bound")

Like many [deep learning](https://en.wikipedia.org/wiki/Deep_learning "Deep learning") approaches that use gradient-based optimization, VAEs require a differentiable loss function to update the network weights through [backpropagation](https://en.wikipedia.org/wiki/Backpropagation "Backpropagation").

For variational autoencoders, the idea is to jointly optimize the generative model parameters $\theta$ to reduce the reconstruction error between the input and the output, and $\phi$ to make $q_{\phi}({z|x})$ as close as possible to $p_{\theta}(z|x)$. As reconstruction loss, [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error "Mean squared error") and [cross entropy](https://en.wikipedia.org/wiki/Cross_entropy "Cross entropy") are often used.

The Kullback–Leibler divergence $D_{KL}(q_{\phi}({z|x}) \parallel p_{\theta}({z|x}))$ can be used as a loss function to squeeze $q_{\phi}({z|x})$ under $p_{\theta}(z|x)$.^([\[8\]](#cite_note-Kingma2013-8)[\[9\]](#cite_note-9)) This divergence loss expands to

$\begin{matrix}
{D_{KL}(q_{\phi}({z|x}) \parallel p_{\theta}({z|x}))} & {= {\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{q_{\phi}(z|x)}{p_{\theta}(z|x)} \right\rbrack} \\
 & {= {\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{q_{\phi}({z|x})p_{\theta}(x)}{p_{\theta}(x,z)} \right\rbrack} \\
 & {= \ln p_{\theta}(x) + {\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{q_{\phi}({z|x})}{p_{\theta}(x,z)} \right\rbrack.}
\end{matrix}$

Now, define the [evidence lower bound](https://en.wikipedia.org/wiki/Evidence_lower_bound "Evidence lower bound") (ELBO):$$L_{\theta,\phi}(x):={\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{p_{\theta}(x,z)}{q_{\phi}({z|x})} \right\rbrack = \ln p_{\theta}(x) - D_{KL}(q_{\phi}({\cdot |x}) \parallel p_{\theta}({\cdot |x}))$$Maximizing the ELBO$$\theta^{\ast},\phi^{\ast} = \underset{\theta,\phi}{argmax}\, L_{\theta,\phi}(x)$$is equivalent to simultaneously maximizing $\ln p_{\theta}(x)$ and minimizing $D_{KL}(q_{\phi}({z|x}) \parallel p_{\theta}({z|x}))$. That is, maximizing the log-likelihood of the observed data, and minimizing the divergence from the approximate posterior $q_{\phi}( \cdot |x)$ to the exact posterior $p_{\theta}( \cdot |x)$.

The form given is not very convenient for maximization, but the following, equivalent form, is:$$L_{\theta,\phi}(x) = {\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln p_{\theta}(x|z) \right\rbrack - D_{KL}(q_{\phi}({\cdot |x}) \parallel p_{\theta}( \cdot ))$$where $\ln p_{\theta}(x|z)$ is implemented as $- \frac{1}{2}\| x - D_{\theta}(z)\|_{2}^{2}$, since that is, up to an additive constant, what $x|z \sim \mathcal{N}(D_{\theta}(z),I)$ yields. That is, we model the distribution of $x$ conditional on $z$ to be a Gaussian distribution centered on $D_{\theta}(z)$. The distribution of $q_{\phi}(z|x)$ and $p_{\theta}(z)$ are often also chosen to be Gaussians as $z|x \sim \mathcal{N}(E_{\phi}(x),\sigma_{\phi}(x)^{2}I)$ and $z \sim \mathcal{N}(0,I)$, with which we obtain by the formula for [KL divergence of Gaussians](https://en.wikipedia.org/wiki/Kullback–Leibler_divergence#Multivariate_normal_distributions "Kullback–Leibler divergence"):$$L_{\theta,\phi}(x) = - \frac{1}{2}{\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \| x - D_{\theta}(z)\|_{2}^{2} \right\rbrack - \frac{1}{2}\left( N\sigma_{\phi}(x)^{2} + \| E_{\phi}(x)\|_{2}^{2} - 2N\ln\sigma_{\phi}(x) \right) + Const$$Here $N$ is the dimension of $z$. For a more detailed derivation and more interpretations of ELBO and its maximization, see [its main page](https://en.wikipedia.org/wiki/Evidence_lower_bound "Evidence lower bound").

## Reparameterization

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=4 "Edit section: Reparameterization")\]

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Reparameterization_Trick.png/330px-Reparameterization_Trick.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Reparameterization_Trick.png)

The scheme of the reparameterization trick. The randomness variable $\varepsilon$ is injected into the latent space $z$ as external input. In this way, it is possible to backpropagate the gradient without involving stochastic variable during the update.

To efficiently search for $$\theta^{\ast},\phi^{\ast} = \underset{\theta,\phi}{argmax}\, L_{\theta,\phi}(x)$$the typical method is [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent "Gradient descent").

It is straightforward to find$$\nabla_{\theta}{\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{p_{\theta}(x,z)}{q_{\phi}({z|x})} \right\rbrack = {\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \nabla_{\theta}\ln\frac{p_{\theta}(x,z)}{q_{\phi}({z|x})} \right\rbrack$$However, $$\nabla_{\phi}{\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{p_{\theta}(x,z)}{q_{\phi}({z|x})} \right\rbrack$$does not allow one to put the $\nabla_{\phi}$ inside the expectation, since $\phi$ appears in the probability distribution itself. The **reparameterization trick** (also known as stochastic backpropagation^([\[10\]](#cite_note-10))) bypasses this difficulty.^([\[8\]](#cite_note-Kingma2013-8)[\[11\]](#cite_note-11)[\[12\]](#cite_note-12))

The most important example is when $z \sim q_{\phi}( \cdot |x)$ is normally distributed, as $\mathcal{N}(\mu_{\phi}(x),\Sigma_{\phi}(x))$.

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Reparameterized_Variational_Autoencoder.png/330px-Reparameterized_Variational_Autoencoder.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Reparameterized_Variational_Autoencoder.png)

The scheme of a variational autoencoder after the reparameterization trick

This can be reparametrized by letting ${\mathbf{ε}} \sim \mathcal{N}(0,{\mathbf{I}})$ be a "standard [random number generator](https://en.wikipedia.org/wiki/Random_number_generation "Random number generation")", and construct $z$ as $z = \mu_{\phi}(x) + L_{\phi}(x)\epsilon$. Here, $L_{\phi}(x)$ is obtained by the [Cholesky decomposition](https://en.wikipedia.org/wiki/Cholesky_decomposition "Cholesky decomposition"):$$\Sigma_{\phi}(x) = L_{\phi}(x)L_{\phi}(x)^{T}$$Then we have$$\nabla_{\phi}{\mathbb{E}}_{z \sim q_{\phi}( \cdot |x)}\left\lbrack \ln\frac{p_{\theta}(x,z)}{q_{\phi}({z|x})} \right\rbrack = {\mathbb{E}}_{\epsilon}\left\lbrack \nabla_{\phi}\ln\frac{p_{\theta}(x,\mu_{\phi}(x) + L_{\phi}(x)\epsilon)}{q_{\phi}(\mu_{\phi}(x) + L_{\phi}(x)\epsilon|x)} \right\rbrack$$and so we obtained an unbiased estimator of the gradient, allowing [stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent "Stochastic gradient descent").

Since we reparametrized $z$, we need to find $q_{\phi}(z|x)$. Let $q_{0}$ be the probability density function for $\epsilon$, then^(\[*[clarification needed](https://en.wikipedia.org/wiki/Wikipedia:Please_clarify "Wikipedia:Please clarify")*\])$$\ln q_{\phi}(z|x) = \ln q_{0}(\epsilon) - \ln|\det(\partial_{\epsilon}z)|$$where $\partial_{\epsilon}z$ is the Jacobian matrix of $z$ with respect to $\epsilon$. Since $z = \mu_{\phi}(x) + L_{\phi}(x)\epsilon$, this is $$\ln q_{\phi}(z|x) = - \frac{1}{2}\|\epsilon\|^{2} - \ln|\det L_{\phi}(x)| - \frac{n}{2}\ln(2\pi)$$

## Variations

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=5 "Edit section: Variations")\]

Many variational autoencoders applications and extensions have been used to adapt the architecture to other domains and improve its performance.

$\beta$-VAE is an implementation with a weighted Kullback–Leibler divergence term to automatically discover and interpret factorised latent representations. With this implementation, it is possible to force manifold disentanglement for $\beta$ values greater than one. This architecture can discover disentangled latent factors without supervision.^([\[13\]](#cite_note-13)[\[14\]](#cite_note-14))

The conditional VAE (CVAE), inserts label information in the latent space to force a deterministic constrained representation of the learned data.^([\[15\]](#cite_note-15))

Some structures directly deal with the quality of the generated samples^([\[16\]](#cite_note-16)[\[17\]](#cite_note-17)) or implement more than one latent space to further improve the representation learning.

Some architectures mix VAE and [generative adversarial networks](https://en.wikipedia.org/wiki/Generative_adversarial_network "Generative adversarial network") to obtain hybrid models.^([\[18\]](#cite_note-18)[\[19\]](#cite_note-19)[\[20\]](#cite_note-20))

It is not necessary to use gradients to update the encoder. In fact, the encoder is not necessary for the generative model.^([\[21\]](#cite_note-21))

## Statistical distance VAE variants

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=6 "Edit section: Statistical distance VAE variants")\]

After the initial work of Diederik P. Kingma and [Max Welling](https://en.wikipedia.org/wiki/Max_Welling "Max Welling"),^([\[22\]](#cite_note-22)) several procedures were proposed to formulate in a more abstract way the operation of the VAE. In these approaches the loss function is composed of two parts:

- the usual reconstruction error part which seeks to ensure that the encoder-then-decoder mapping $x\mapsto D_{\theta}(E_{\psi}(x))$ is as close to the identity map as possible; the sampling is done at run time from the empirical distribution ${\mathbb{P}}^{real}$ of objects available (e.g., for MNIST or IMAGENET this will be the empirical probability law of all images in the dataset). This gives the term: ${\mathbb{E}}_{x \sim {\mathbb{P}}^{real}}\left\lbrack \| x - D_{\theta}(E_{\phi}(x))\|_{2}^{2} \right\rbrack$.
- a variational part that ensures that, when the empirical distribution ${\mathbb{P}}^{real}$ is passed through the encoder $E_{\phi}$, we recover the target distribution, denoted here $\mu(dz)$ that is usually taken to be a [Multivariate normal distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution "Multivariate normal distribution"). We will denote $E_{\phi}\sharp{\mathbb{P}}^{real}$ this [pushforward measure](https://en.wikipedia.org/wiki/Pushforward_measure "Pushforward measure") which in practice is just the empirical distribution obtained by passing all dataset objects through the encoder $E_{\phi}$. In order to make sure that $E_{\phi}\sharp{\mathbb{P}}^{real}$ is close to the target $\mu(dz)$, a [Statistical distance](https://en.wikipedia.org/wiki/Statistical_distance "Statistical distance") $d$ is invoked and the term $d\left( \mu(dz),E_{\phi}\sharp{\mathbb{P}}^{real} \right)^{2}$ is added to the loss.

We obtain the final formula for the loss: $$L_{\theta,\phi} = {\mathbb{E}}_{x \sim {\mathbb{P}}^{real}}\left\lbrack \| x - D_{\theta}(E_{\phi}(x))\|_{2}^{2} \right\rbrack + d\left( \mu(dz),E_{\phi}\sharp{\mathbb{P}}^{real} \right)^{2}$$

The statistical distance $d$ requires special properties, for instance it has to be possess a formula as expectation because the loss function will need to be optimized by [stochastic optimization algorithms](https://en.wikipedia.org/wiki/Stochastic_gradient_descent "Stochastic gradient descent"). Several distances can be chosen and this gave rise to several flavors of VAEs:

- the sliced Wasserstein distance used by S Kolouri, et al. in their VAE^([\[23\]](#cite_note-23))
- the [energy distance](https://en.wikipedia.org/wiki/Energy_distance "Energy distance") implemented in the Radon Sobolev Variational Auto-Encoder^([\[24\]](#cite_note-24))
- the [Maximum Mean Discrepancy](https://en.wikipedia.org/wiki/Maximum_Mean_Discrepancy?action=edit&redlink=1 "Maximum Mean Discrepancy (page does not exist)") distance used in the MMD-VAE^([\[25\]](#cite_note-25))
- the [Wasserstein distance](https://en.wikipedia.org/wiki/Wasserstein_distance "Wasserstein distance") used in the WAEs^([\[26\]](#cite_note-26))
- kernel-based distances used in the Kernelized Variational Autoencoder (K-VAE)^([\[27\]](#cite_note-27))

## See also

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=7 "Edit section: See also")\]

- [Artificial neural network](https://en.wikipedia.org/wiki/Artificial_neural_network "Artificial neural network")
- [Autoencoder](https://en.wikipedia.org/wiki/Autoencoder "Autoencoder")
- [Backpropagation](https://en.wikipedia.org/wiki/Backpropagation "Backpropagation")
- [Data augmentation](https://en.wikipedia.org/wiki/Data_augmentation "Data augmentation")
- [Deep learning](https://en.wikipedia.org/wiki/Deep_learning "Deep learning")
- [Generative adversarial network](https://en.wikipedia.org/wiki/Generative_adversarial_network "Generative adversarial network")
- [Representation learning](https://en.wikipedia.org/wiki/Representation_learning "Representation learning")
- [Sparse dictionary learning](https://en.wikipedia.org/wiki/Sparse_dictionary_learning "Sparse dictionary learning")

## References

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=8 "Edit section: References")\]

1.  [↑](#cite_ref-1)
    Kingma, Diederik P.; Welling, Max (2022-12-10). "Auto-Encoding Variational Bayes". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1312.6114](https://arxiv.org/abs/1312.6114) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
2.  [↑](#cite_ref-2) Pinheiro Cinelli, Lucas; et al. (2021). ["Variational Autoencoder"](https://books.google.com/books?id=N5EtEAAAQBAJ&pg=PA111). *Variational Methods for Machine Learning with Applications to Deep Networks*. Springer. pp. 111–149. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/978-3-030-70679-1_5](https://doi.org/10.1007%2F978-3-030-70679-1_5). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-3-030-70681-4](https://en.wikipedia.org/wiki/Special:BookSources/978-3-030-70681-4 "Special:BookSources/978-3-030-70681-4"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [240802776](https://api.semanticscholar.org/CorpusID:240802776).
3.  [↑](#cite_ref-3) Dilokthanakul, Nat; Mediano, Pedro A. M.; Garnelo, Marta; Lee, Matthew C. H.; Salimbeni, Hugh; Arulkumaran, Kai; Shanahan, Murray (2017-01-13). "Deep Unsupervised Clustering with Gaussian Mixture Variational Autoencoders". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1611.02648](https://arxiv.org/abs/1611.02648) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
4.  [↑](#cite_ref-4) Hsu, Wei-Ning; Zhang, Yu; Glass, James (December 2017). "Unsupervised domain adaptation for robust speech recognition via variational autoencoder-based data augmentation". *2017 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU)*. pp. 16–23. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1707.06265](https://arxiv.org/abs/1707.06265). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/ASRU.2017.8268911](https://doi.org/10.1109%2FASRU.2017.8268911). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-5090-4788-8](https://en.wikipedia.org/wiki/Special:BookSources/978-1-5090-4788-8 "Special:BookSources/978-1-5090-4788-8"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [22681625](https://api.semanticscholar.org/CorpusID:22681625).
5.  [↑](#cite_ref-5) Ehsan Abbasnejad, M.; Dick, Anthony; [van den Hengel, Anton](https://en.wikipedia.org/wiki/Anton_van_den_Hengel "Anton van den Hengel") (2017). [*Infinite Variational Autoencoder for Semi-Supervised Learning*](https://openaccess.thecvf.com/content_cvpr_2017/html/Abbasnejad_Infinite_Variational_Autoencoder_CVPR_2017_paper.html). pp. 5888–5897.
6.  [↑](#cite_ref-6) Xu, Weidi; Sun, Haoze; Deng, Chao; Tan, Ying (2017-02-12). ["Variational Autoencoder for Semi-Supervised Text Classification"](https://ojs.aaai.org/index.php/AAAI/article/view/10966). *Proceedings of the AAAI Conference on Artificial Intelligence*. **31** (1). [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1603.02514](https://arxiv.org/abs/1603.02514). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1609/aaai.v31i1.10966](https://doi.org/10.1609%2Faaai.v31i1.10966). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [2060721](https://api.semanticscholar.org/CorpusID:2060721).
7.  [↑](#cite_ref-7) Kameoka, Hirokazu; Li, Li; Inoue, Shota; Makino, Shoji (2019-09-01). ["Supervised Determined Source Separation with Multichannel Variational Autoencoder"](https://direct.mit.edu/neco/article/31/9/1891/8494/Supervised-Determined-Source-Separation-with). *Neural Computation*. **31** (9): 1891–1914. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1162/neco_a_01217](https://doi.org/10.1162%2Fneco_a_01217). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [31335290](https://pubmed.ncbi.nlm.nih.gov/31335290). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [198168155](https://api.semanticscholar.org/CorpusID:198168155).
8.  [1](#cite_ref-Kingma2013_8-0) [2](#cite_ref-Kingma2013_8-1) [3](#cite_ref-Kingma2013_8-2) Kingma, Diederik P.; Welling, Max (2013-12-20). "Auto-Encoding Variational Bayes". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1312.6114](https://arxiv.org/abs/1312.6114) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
9.  [↑](#cite_ref-9) ["From Autoencoder to Beta-VAE"](https://lilianweng.github.io/lil-log/2018/08/12/from-autoencoder-to-beta-vae.html). *Lil'Log*. 2018-08-12.
10. [↑](#cite_ref-10) Rezende, Danilo Jimenez; Mohamed, Shakir; Wierstra, Daan (2014-06-18). ["Stochastic Backpropagation and Approximate Inference in Deep Generative Models"](https://proceedings.mlr.press/v32/rezende14.html). *International Conference on Machine Learning*. PMLR: 1278–1286. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1401.4082](https://arxiv.org/abs/1401.4082).
11. [↑](#cite_ref-11) Bengio, Yoshua; Courville, Aaron; Vincent, Pascal (2013). "Representation Learning: A Review and New Perspectives". *IEEE Transactions on Pattern Analysis and Machine Intelligence*. **35** (8): 1798–1828. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1206.5538](https://arxiv.org/abs/1206.5538). [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2013ITPAM..35.1798B](https://scixplorer.org/abs/2013ITPAM..35.1798B). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/TPAMI.2013.50](https://doi.org/10.1109%2FTPAMI.2013.50). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1939-3539](https://search.worldcat.org/issn/1939-3539). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [23787338](https://pubmed.ncbi.nlm.nih.gov/23787338). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [393948](https://api.semanticscholar.org/CorpusID:393948).
12. [↑](#cite_ref-12) Kingma, Diederik P.; Rezende, Danilo J.; Mohamed, Shakir; Welling, Max (2014-10-31). "Semi-Supervised Learning with Deep Generative Models". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1406.5298](https://arxiv.org/abs/1406.5298) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
13. [↑](#cite_ref-13) Higgins, Irina; Matthey, Loic; Pal, Arka; Burgess, Christopher; Glorot, Xavier; Botvinick, Matthew; Mohamed, Shakir; Lerchner, Alexander (2016-11-04). [*beta-VAE: Learning Basic Visual Concepts with a Constrained Variational Framework*](https://openreview.net/forum?id=Sy2fzU9gl). NeurIPS.
14. [↑](#cite_ref-14) Burgess, Christopher P.; Higgins, Irina; Pal, Arka; Matthey, Loic; Watters, Nick; Desjardins, Guillaume; Lerchner, Alexander (2018-04-10). "Understanding disentangling in β-VAE". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1804.03599](https://arxiv.org/abs/1804.03599) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
15. [↑](#cite_ref-15) Sohn, Kihyuk; Lee, Honglak; Yan, Xinchen (2015-01-01). [*Learning Structured Output Representation using Deep Conditional Generative Models*](https://proceedings.neurips.cc/paper/2015/file/8d55a249e6baa5c06772297520da2051-Paper.pdf) (PDF). NeurIPS.
16. [↑](#cite_ref-16) Dai, Bin; Wipf, David (2019-10-30). "Diagnosing and Enhancing VAE Models". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1903.05789](https://arxiv.org/abs/1903.05789) \[[cs.LG](https://arxiv.org/archive/cs.LG)\].
17. [↑](#cite_ref-17) Dorta, Garoe; Vicente, Sara; Agapito, Lourdes; Campbell, Neill D. F.; Simpson, Ivor (2018-07-31). "Training VAEs Under Structured Residuals". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1804.01050](https://arxiv.org/abs/1804.01050) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
18. [↑](#cite_ref-18) Larsen, Anders Boesen Lindbo; Sønderby, Søren Kaae; Larochelle, Hugo; Winther, Ole (2016-06-11). ["Autoencoding beyond pixels using a learned similarity metric"](http://proceedings.mlr.press/v48/larsen16.html). *International Conference on Machine Learning*. PMLR: 1558–1566. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1512.09300](https://arxiv.org/abs/1512.09300).
19. [↑](#cite_ref-19) Bao, Jianmin; Chen, Dong; Wen, Fang; Li, Houqiang; Hua, Gang (2017). "CVAE-GAN: Fine-Grained Image Generation Through Asymmetric Training". pp. 2745–2754. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1703.10155](https://arxiv.org/abs/1703.10155) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
20. [↑](#cite_ref-20) Gao, Rui; Hou, Xingsong; Qin, Jie; Chen, Jiaxin; Liu, Li; Zhu, Fan; Zhang, Zhao; Shao, Ling (2020). "Zero-VAE-GAN: Generating Unseen Features for Generalized and Transductive Zero-Shot Learning". *IEEE Transactions on Image Processing*. **29**: 3665–3680. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2020ITIP...29.3665G](https://scixplorer.org/abs/2020ITIP...29.3665G). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/TIP.2020.2964429](https://doi.org/10.1109%2FTIP.2020.2964429). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1941-0042](https://search.worldcat.org/issn/1941-0042). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [31940538](https://pubmed.ncbi.nlm.nih.gov/31940538). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [210334032](https://api.semanticscholar.org/CorpusID:210334032).
21. [↑](#cite_ref-21) Drefs, J.; Guiraud, E.; Panagiotou, F.; Lücke, J. (2023). "Direct evolutionary optimization of variational autoencoders with binary latents". *Joint European Conference on Machine Learning and Knowledge Discovery in Databases*. Lecture Notes in Computer Science. Vol. 13715. Springer Nature Switzerland. pp. 357–372. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2011.13704](https://arxiv.org/abs/2011.13704). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/978-3-031-26409-2_22](https://doi.org/10.1007%2F978-3-031-26409-2_22). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-3-031-26408-5](https://en.wikipedia.org/wiki/Special:BookSources/978-3-031-26408-5 "Special:BookSources/978-3-031-26408-5").
22. [↑](#cite_ref-22) Kingma, Diederik P.; Welling, Max (2022-12-10). "Auto-Encoding Variational Bayes". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1312.6114](https://arxiv.org/abs/1312.6114) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
23. [↑](#cite_ref-23) Kolouri, Soheil; Pope, Phillip E.; Martin, Charles E.; Rohde, Gustavo K. (2019). ["Sliced Wasserstein Auto-Encoders"](https://openreview.net/forum?id=H1xaJn05FQ). *International Conference on Learning Representations*. International Conference on Learning Representations. ICPR.
24. [↑](#cite_ref-24) Turinici, Gabriel (2021). ["Radon-Sobolev Variational Auto-Encoders"](https://www.sciencedirect.com/science/article/pii/S0893608021001556). *Neural Networks*. **141**: 294–305. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1911.13135](https://arxiv.org/abs/1911.13135). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.neunet.2021.04.018](https://doi.org/10.1016%2Fj.neunet.2021.04.018). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [0893-6080](https://search.worldcat.org/issn/0893-6080). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [33933889](https://pubmed.ncbi.nlm.nih.gov/33933889).
25. [↑](#cite_ref-25) Gretton, A.; Li, Y.; Swersky, K.; Zemel, R.; Turner, R. (2017). "A Polya Contagion Model for Networks". *IEEE Transactions on Control of Network Systems*. **5** (4): 1998–2010. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1705.02239](https://arxiv.org/abs/1705.02239). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/TCNS.2017.2781467](https://doi.org/10.1109%2FTCNS.2017.2781467).
26. [↑](#cite_ref-26) Tolstikhin, I.; Bousquet, O.; Gelly, S.; Schölkopf, B. (2018). "Wasserstein Auto-Encoders". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1711.01558](https://arxiv.org/abs/1711.01558) \[[stat.ML](https://arxiv.org/archive/stat.ML)\].
27. [↑](#cite_ref-27) Louizos, C.; Shi, X.; Swersky, K.; Li, Y.; Welling, M. (2019). "Kernelized Variational Autoencoders". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1901.02401](https://arxiv.org/abs/1901.02401) \[[astro-ph.CO](https://arxiv.org/archive/astro-ph.CO)\].

## Further reading

\[[edit](/w/index.php?title=Variational_autoencoder&action=edit&section=9 "Edit section: Further reading")\]

[![Wikimedia Commons logo](//thumb.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/40px-Commons-logo.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Commons-logo.svg)

Wikimedia Commons has media related to [Variational autoencoder](https://commons.wikimedia.org/wiki/Category:Variational%20autoencoder "commons:Category:Variational autoencoder").

- Kingma, Diederik P.; Welling, Max (2019). "An Introduction to Variational Autoencoders". *Foundations and Trends in Machine Learning*. **12** (4). Now Publishers: 307–392. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1906.02691](https://arxiv.org/abs/1906.02691). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1561/2200000056](https://doi.org/10.1561%2F2200000056). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1935-8237](https://search.worldcat.org/issn/1935-8237).

[TABLE]

![](https://en.wikipedia.org/wiki/Special:CentralAutoLogin/start?useformat=desktop&type=1x1&usesul3=1)

Retrieved from "[https://en.wikipedia.org/w/index.php?title=Variational_autoencoder&oldid=1385104882](https://en.wikipedia.org/w/index.php?title=Variational_autoencoder&oldid=1385104882)"
