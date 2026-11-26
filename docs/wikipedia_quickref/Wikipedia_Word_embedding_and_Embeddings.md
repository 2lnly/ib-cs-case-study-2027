Source: https://en.wikipedia.org/wiki/Embedding_(machine_learning)

Representation learning technique

In [machine learning](https://en.wikipedia.org/wiki/Machine_learning "Machine learning"), **embedding** is a [representation learning](https://en.wikipedia.org/wiki/Representation_learning "Representation learning") technique that maps complex, high-dimensional data into a lower-dimensional [vector space](https://en.wikipedia.org/wiki/Vector_space "Vector space") of numerical vectors.^([\[1\]](#cite_note-Bengio2003-1))

## Technique

\[[edit](/w/index.php?title=Embedding_(machine_learning)&action=edit&section=1 "Edit section: Technique")\]

It also denotes the resulting representation, where meaningful patterns or relationships are preserved. As a technique, it learns these vectors from data like words, images, or user interactions, differing from manually designed methods such as [one-hot encoding](https://en.wikipedia.org/wiki/One-hot_encoding "One-hot encoding").^([\[2\]](#cite_note-Mikolov2013-2)) This process reduces complexity and captures key features without needing prior knowledge of the domain.

## Similarity

\[[edit](/w/index.php?title=Embedding_(machine_learning)&action=edit&section=2 "Edit section: Similarity")\]

In [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing "Natural language processing"), words or concepts may be represented as [feature vectors](https://en.wikipedia.org/wiki/Feature_(machine_learning)#Feature_vectors "Feature (machine learning)"), where similar concepts are mapped to nearby vectors. The resulting embeddings vary by type, including [word embeddings](https://en.wikipedia.org/wiki/Word_embedding "Word embedding") for text (e.g., [Word2Vec](https://en.wikipedia.org/wiki/Word2Vec "Word2Vec")), image embeddings for visual data, and [knowledge graph embeddings](https://en.wikipedia.org/wiki/Knowledge_graph_embedding "Knowledge graph embedding") for [knowledge graphs](https://en.wikipedia.org/wiki/Knowledge_graph "Knowledge graph"), each tailored to tasks like natural language processing, [computer vision](https://en.wikipedia.org/wiki/Computer_vision "Computer vision"), or [recommendation systems](https://en.wikipedia.org/wiki/Recommendation_systems "Recommendation systems").^([\[3\]](#cite_note-3)) This dual role enhances model efficiency and accuracy by automating feature extraction and revealing latent similarities across diverse applications.

To measure the distance between two embeddings, a [similarity measure](https://en.wikipedia.org/wiki/Similarity_measure "Similarity measure") can be used to find the overall similarity of the concepts represented by the embeddings. If the vectors are normalized to have a magnitude of 1, then the similarity measures are proportional to $\cos\left( \theta_{ab} \right)$.^([\[4\]](#cite_note-googleml-4))

|  |  |  |  |  |
|----|----|----|----|----|
| Name | Meaning | Formula | Formula (Scalar) | Similarity Correlation |
| [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance "Euclidean distance") | Distance between ends of vectors | $|a - b|$ | $\sqrt{\sum\left( a_{n} - b_{n} \right)^{2}}$ | Negative Correlation |
| [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity "Cosine similarity") | Cosine of angle $\theta$ between vectors | $\frac{a \cdot b}{|a||b|}$ | $\frac{\sum a_{n}b_{n}}{\sqrt{\left( \sum a_{n}^{2} \right)\left( \sum b_{n}^{2} \right)}}$ | Positive Correlation |
| [Dot Product](https://en.wikipedia.org/wiki/Dot_product "Dot product") | Cosine similarity multiplied by the lengths of both vectors | $a \cdot b$ | $\sum a_{n}b_{n}$ | Positive Correlation |

Similarity Measures {#mwKQ}

The cosine similarity disregards the magnitude of the vector when determining similarity, so it is less biased towards training data that appears very frequently. The dot product includes the magnitude inherently, so it will tend to value more popular data.^([\[4\]](#cite_note-googleml-4)) Generally, for high-dimensional vector spaces, vectors tend to converge in distance, so Euclidean distance becomes less reliable for large embedding vectors.^([\[5\]](#cite_note-5))

## See also

\[[edit](/w/index.php?title=Embedding_(machine_learning)&action=edit&section=3 "Edit section: See also")\]

- [Latent space](https://en.wikipedia.org/wiki/Latent_space "Latent space")
- [Feature extraction](https://en.wikipedia.org/wiki/Feature_extraction "Feature extraction")
- [Dimensionality reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction "Dimensionality reduction")
- [Word embedding](https://en.wikipedia.org/wiki/Word_embedding "Word embedding")
- [Neural network](https://en.wikipedia.org/wiki/Neural_network_(machine_learning) "Neural network (machine learning)")
- [Reinforcement learning](https://en.wikipedia.org/wiki/Reinforcement_learning "Reinforcement learning")
- [Metric space#Metric embeddings and approximations](https://en.wikipedia.org/wiki/Metric_space#Metric_embeddings_and_approximations "Metric space")

## References

\[[edit](/w/index.php?title=Embedding_(machine_learning)&action=edit&section=4 "Edit section: References")\]

1.  [↑](#cite_ref-Bengio2003_1-0)
    Bengio, Yoshua; Ducharme, Réjean; Vincent, Pascal (2003). "A Neural Probabilistic Language Model". *Journal of Machine Learning Research*. **3**: 1137–1155.
2.  [↑](#cite_ref-Mikolov2013_2-0) Mikolov, Tomas; Chen, Kai; Corrado, Greg; Dean, Jeffrey (2013). [*Efficient Estimation of Word Representations in Vector Space*](https://arxiv.org/abs/1301.3781). International Conference on Learning Representations (ICLR).
3.  [↑](#cite_ref-3) ["What are Embedding in Machine Learning?"](https://www.geeksforgeeks.org/what-are-embeddings-in-machine-learning/). *GeeksforGeeks*. 2024-02-15. Retrieved 2025-02-28.
4.  [1](#cite_ref-googleml_4-0) [2](#cite_ref-googleml_4-1) ["Measuring similarity from embeddings"](https://developers.google.com/machine-learning/clustering/dnn-clustering/supervised-similarity). *Google Machine Learning Education*. Retrieved 21 September 2025.
5.  [↑](#cite_ref-5) Krantz, Tom; Jonker, Alexandra. ["What is cosine similarity?"](https://www.ibm.com/think/topics/cosine-similarity#:~:text=However,retrieval). *IBM Think*. Retrieved 21 September 2025.

![](https://en.wikipedia.org/wiki/Special:CentralAutoLogin/start?useformat=desktop&type=1x1&usesul3=1)

Retrieved from "[https://en.wikipedia.org/w/index.php?title=Embedding\_(machine_learning)&oldid=1375060623](https://en.wikipedia.org/w/index.php?title=Embedding_(machine_learning)&oldid=1375060623)"
