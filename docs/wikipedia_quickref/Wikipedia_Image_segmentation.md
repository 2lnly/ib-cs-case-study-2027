Source: https://en.wikipedia.org/wiki/Image_segmentation

Partitioning a digital image into segments

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Model_of_a_segmented_femur_-_journal.pone.0079004.g005.png/250px-Model_of_a_segmented_femur_-_journal.pone.0079004.g005.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Model_of_a_segmented_femur_-_journal.pone.0079004.g005.png)

Model of a segmented left human [femur](https://en.wikipedia.org/wiki/Femur "Femur"). It shows the outer surface (red), the surface between compact bone and spongy bone (green) and the surface of the bone marrow (blue).

In [digital image processing](https://en.wikipedia.org/wiki/Digital_image_processing "Digital image processing") and [computer vision](https://en.wikipedia.org/wiki/Computer_vision "Computer vision"), **image segmentation** is the process of partitioning a [digital image](https://en.wikipedia.org/wiki/Digital_image "Digital image") into multiple **image segments**, also known as **image regions** or **image objects** ([sets](https://en.wikipedia.org/wiki/Set_(mathematics) "Set (mathematics)") of [pixels](https://en.wikipedia.org/wiki/Pixel "Pixel")). The goal of segmentation is to simplify and/or change the representation of an image into something that is more meaningful and easier to analyze.^([\[1\]](#cite_note-computervision-1)[\[2\]](#cite_note-2)) Image segmentation is typically used to locate objects and [boundaries](https://en.wikipedia.org/wiki/Boundary_tracing "Boundary tracing") (lines, curves, etc.) in images. More precisely, image segmentation is the process of assigning a label to every pixel in an image such that pixels with the same label share certain characteristics.

The result of image segmentation is a set of segments that collectively cover the entire image, or a set of [contours](https://en.wikipedia.org/wiki/Contour_line "Contour line") extracted from the image (see [edge detection](https://en.wikipedia.org/wiki/Edge_detection "Edge detection")). Each of the pixels in a region are similar with respect to some characteristic or computed property,^([\[3\]](#cite_note-3)) such as [color](https://en.wikipedia.org/wiki/Color "Color"), [intensity](https://en.wikipedia.org/wiki/Luminous_intensity "Luminous intensity"), or [texture](https://en.wikipedia.org/wiki/Image_texture "Image texture"). Adjacent regions are significantly different with respect to the same characteristic(s).^([\[1\]](#cite_note-computervision-1)) When applied to a stack of images, typical in [medical imaging](https://en.wikipedia.org/wiki/Medical_imaging "Medical imaging"), the resulting contours after image segmentation can be used to create [3D reconstructions](https://en.wikipedia.org/wiki/3D_reconstruction "3D reconstruction") with the help of geometry reconstruction algorithms like [marching cubes](https://en.wikipedia.org/wiki/Marching_cubes "Marching cubes").^([\[4\]](#cite_note-4))

## Applications

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=1 "Edit section: Applications")\]

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/3D_CT_of_thorax.jpg/250px-3D_CT_of_thorax.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:3D_CT_of_thorax.jpg)

Volume segmentation of a 3D-rendered [CT scan](https://en.wikipedia.org/wiki/CT_scan "CT scan") of the [thorax](https://en.wikipedia.org/wiki/Thorax "Thorax"): The anterior thoracic wall, the airways and the pulmonary vessels anterior to the root of the lung have been digitally removed in order to visualize thoracic contents:  
– blue: [pulmonary arteries](https://en.wikipedia.org/wiki/Pulmonary_arteries "Pulmonary arteries")  
– red: [pulmonary veins](https://en.wikipedia.org/wiki/Pulmonary_veins "Pulmonary veins") (and also the [abdominal wall](https://en.wikipedia.org/wiki/Abdominal_wall "Abdominal wall"))  
– yellow: the [mediastinum](https://en.wikipedia.org/wiki/Mediastinum "Mediastinum")  
– violet: the [diaphragm](https://en.wikipedia.org/wiki/Thoracic_diaphragm "Thoracic diaphragm")

Some of the practical applications of image segmentation are:

- [Content-based image retrieval](https://en.wikipedia.org/wiki/Content-based_image_retrieval "Content-based image retrieval")^([\[5\]](#cite_note-5))
- [Machine vision](https://en.wikipedia.org/wiki/Machine_vision "Machine vision")
- [Medical imaging](https://en.wikipedia.org/wiki/Medical_imaging "Medical imaging"),^([\[6\]](#cite_note-6)[\[7\]](#cite_note-7)) and imaging studies in biomedical research, including [volume rendered](https://en.wikipedia.org/wiki/Volume_rendering "Volume rendering") images from [computed tomography](https://en.wikipedia.org/wiki/CT_scan "CT scan"), [magnetic resonance imaging](https://en.wikipedia.org/wiki/Magnetic_resonance_imaging "Magnetic resonance imaging"), as well as volume electron microscopy techniques such as FIB-SEM.^([\[8\]](#cite_note-8))
  - Locate tumors and other pathologies^([\[9\]](#cite_note-9)[\[10\]](#cite_note-10))
  - Measure tissue volumes^([\[11\]](#cite_note-11)[\[12\]](#cite_note-12))
  - Diagnosis, study of anatomical structure^([\[13\]](#cite_note-13))
  - Surgery planning
  - Virtual surgery simulation
  - Intra-surgery navigation
  - Radiotherapy^([\[14\]](#cite_note-14))
  - [Digital Pathology](https://en.wikipedia.org/wiki/Digital_pathology "Digital pathology") and [Histopathology](https://en.wikipedia.org/wiki/Histopathology "Histopathology"). Nuclei [instance](https://en.wikipedia.org/wiki/Instance_variable "Instance variable") segmentation in variously [stained](https://en.wikipedia.org/wiki/Staining "Staining") [whole slide images](https://en.wikipedia.org/wiki/Whole-slide_image "Whole-slide image") (WSIs) refers to the automatic delineation of individual cells' nuclei borders. This task is a specialized subproblem of instance segmentation, with high practical importance in biomedical research and diagnostics (e.g. cell counting, morphometric feature extraction, tumor grading, prognostic biomarker extraction).^([\[15\]](#cite_note-15)) The modern approach to the problem is the use of [deep learning](https://en.wikipedia.org/wiki/Deep_learning "Deep learning") architectures developed to encompass the main challenges of separating overlapping or fused nuclei.^([\[16\]](#cite_note-16)[\[17\]](#cite_note-17)[\[18\]](#cite_note-18)) The availability of few humanly-annotated datasets poses another challenge to the problem.^([\[19\]](#cite_note-19)[\[20\]](#cite_note-20)[\[21\]](#cite_note-21))
- [Monitoring](https://en.wikipedia.org/wiki/Monitoring "Monitoring") of [ecosystems](https://en.wikipedia.org/wiki/Ecosystem "Ecosystem") and [land cover](https://en.wikipedia.org/wiki/Land_cover "Land cover") (relative cover of [species](https://en.wikipedia.org/wiki/Species "Species") or land cover classes on [UAV](https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle "Unmanned aerial vehicle") or satellite images)^([\[22\]](#cite_note-22))
- [Object detection](https://en.wikipedia.org/wiki/Object_detection "Object detection")^([\[23\]](#cite_note-23))
  - [Pedestrian detection](https://en.wikipedia.org/wiki/Pedestrian_detection "Pedestrian detection")
  - [Face detection](https://en.wikipedia.org/wiki/Face_detection "Face detection")
  - Brake light detection
  - Locate objects in satellite images (roads, forests, crops, etc.)
- Recognition Tasks
  - [Face recognition](https://en.wikipedia.org/wiki/Face_recognition "Face recognition")
  - [Fingerprint recognition](https://en.wikipedia.org/wiki/Fingerprint_recognition "Fingerprint recognition")
  - [Iris recognition](https://en.wikipedia.org/wiki/Iris_recognition "Iris recognition")
  - Prohibited Item at [Airport security](https://en.wikipedia.org/wiki/Airport_security "Airport security") checkpoints
- Traffic control systems
- [Video surveillance](https://en.wikipedia.org/wiki/Video_surveillance "Video surveillance")
- [Video object co-segmentation and action localization](https://en.wikipedia.org/wiki/Object_co-segmentation "Object co-segmentation")^([\[24\]](#cite_note-Liu_Wang_Hua_Zhang_2018_pp._5840–5853-24)[\[25\]](#cite_note-Wang_Duan_Zhang_Niu_p=1657-25))

Several general-purpose [algorithms](https://en.wikipedia.org/wiki/Algorithm "Algorithm") and techniques have been developed for image segmentation. To be useful, these techniques must typically be combined with a domain's specific knowledge in order to effectively solve the domain's segmentation problems.

## Classes of segmentation techniques

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=2 "Edit section: Classes of segmentation techniques")\]

There are two classes of segmentation techniques.

- Classical computer vision approaches
- AI based techniques

## Groups of image segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=3 "Edit section: Groups of image segmentation")\]

- **Semantic segmentation** is an approach detecting, for every pixel, the belonging class.^([\[26\]](#cite_note-26)) For example, in a figure with many people, all the pixels belonging to persons will have the same class id and the pixels in the background will be classified as background.^([\[27\]](#cite_note-27))
- **Instance segmentation** is an approach that identifies, for every pixel, the specific belonging instance of the object. It detects each distinct object of interest in the image.^([\[28\]](#cite_note-28)) For example, when each person in a figure is segmented as an individual object.
- **Panoptic segmentation** combines both semantic and instance segmentation. Like semantic segmentation, panoptic segmentation is an approach that identifies, for every pixel, the belonging class. Moreover, like in instance segmentation, panoptic segmentation distinguishes different instances of the same class.^([\[29\]](#cite_note-Panoptic_Segmentation-29))

## Thresholding

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=4 "Edit section: Thresholding")\]

Main article: [Thresholding (image processing)](https://en.wikipedia.org/wiki/Thresholding_(image_processing) "Thresholding (image processing)")

The simplest method of image segmentation is called the [thresholding](https://en.wikipedia.org/wiki/Thresholding_(image_processing) "Thresholding (image processing)") method. This method is based on a clip-level (or a threshold value) to turn a gray-scale image into a binary image.

The key of this method is to select the threshold value (or values when multiple-levels are selected). Several popular methods are used in industry including the maximum entropy method, [balanced histogram thresholding](https://en.wikipedia.org/wiki/Balanced_histogram_thresholding "Balanced histogram thresholding"), [Otsu's method](https://en.wikipedia.org/wiki/Otsu's_method "Otsu's method") (maximum variance), and [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering "K-means clustering").

Recently, methods have been developed for thresholding computed tomography (CT) images. The key idea is that, unlike Otsu's method, the thresholds are derived from the radiographs instead of the (reconstructed) image.^([\[30\]](#cite_note-30)[\[31\]](#cite_note-31))

New methods suggest the use of multi-dimensional, fuzzy rule-based, non-linear thresholds. In these approaches, the decision regarding each pixel's membership in a segment is based on multi-dimensional rules derived from fuzzy logic and evolutionary algorithms, considering factors such as image lighting, environment, and application.^([\[32\]](#cite_note-32))

## Clustering methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=5 "Edit section: Clustering methods")\]

Main article: [Data clustering](https://en.wikipedia.org/wiki/Data_clustering "Data clustering")

[![Original image](//thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Aurora_borealis_over_Eielson_Air_Force_Base%2C_Alaska.jpg/330px-Aurora_borealis_over_Eielson_Air_Force_Base%2C_Alaska.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Aurora_borealis_over_Eielson_Air_Force_Base,_Alaska.jpg)

Source image

[![Processed image](//thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Polarlicht_2_kmeans_16_large.png/330px-Polarlicht_2_kmeans_16_large.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Polarlicht_2_kmeans_16_large.png)

Image after running *k*-means with *k = 16*. Note that a common technique to improve performance for large images is to downsample the image, compute the clusters, and then reassign the values to the larger image if necessary.

The [K-means algorithm](https://en.wikipedia.org/wiki/K-means_algorithm "K-means algorithm") is an [iterative](https://en.wikipedia.org/wiki/Iterative "Iterative") technique that is used to [partition an image](https://en.wikipedia.org/wiki/Cluster_analysis "Cluster analysis") into *K* clusters.^([\[33\]](#cite_note-33)) The basic [algorithm](https://en.wikipedia.org/wiki/Algorithm "Algorithm") is

1.  Pick *K* cluster centers, either [randomly](https://en.wikipedia.org/wiki/Random "Random") or based on some [heuristic](https://en.wikipedia.org/wiki/Heuristic "Heuristic") method, for example [K-means++](https://en.wikipedia.org/wiki/K-means++ "K-means++")
2.  Assign each pixel in the image to the cluster that minimizes the [distance](https://en.wikipedia.org/wiki/Distance "Distance") between the pixel and the cluster center
3.  Re-compute the cluster centers by averaging all of the pixels in the cluster
4.  Repeat steps 2 and 3 until convergence is attained (i.e. no pixels change clusters)

In this case, [distance](https://en.wikipedia.org/wiki/Distance "Distance") is the squared or absolute difference between a pixel and a cluster center. The difference is typically based on pixel [color](https://en.wikipedia.org/wiki/Hue "Hue"), [intensity](https://en.wikipedia.org/wiki/Brightness "Brightness"), [texture](https://en.wikipedia.org/wiki/Texture_(computer_graphics) "Texture (computer graphics)"), and location, or a weighted combination of these factors. *K* can be selected manually, [randomly](https://en.wikipedia.org/wiki/Random "Random"), or by a [heuristic](https://en.wikipedia.org/wiki/Heuristic "Heuristic"). This algorithm is guaranteed to converge, but it may not return the [optimal](https://en.wikipedia.org/wiki/Global_optimum "Global optimum") solution. The quality of the solution depends on the initial set of clusters and the value of *K*.

The [Mean Shift](https://en.wikipedia.org/wiki/Mean_shift "Mean shift") algorithm is a technique that is used to partition an image into an unknown [apriori](https://en.wikipedia.org/wiki/A_priori_and_a_posteriori "A priori and a posteriori") number of clusters. This has the advantage of not having to start with an initial guess of such parameter which makes it a better general solution for more diverse cases.

## Motion and interactive segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=6 "Edit section: Motion and interactive segmentation")\]

Motion based segmentation is a technique that relies on motion in the image to perform segmentation.

The idea is simple: look at the differences between a pair of images. Assuming the object of interest is moving, the difference will be exactly that object.

Improving on this idea, Kenney et al. proposed interactive segmentation [](http://www.robotics.tu-berlin.de/fileadmin/fg170/Publikationen_pdf/2009-icra.pdf). They use a robot to poke objects in order to generate the motion signal necessary for motion-based segmentation.

Interactive segmentation follows the interactive perception framework proposed by Dov Katz [](http://www.dubikatz.com) and Oliver Brock [](http://www.robotics.tu-berlin.de/menue/team/oliver_brock).

Another technique that is based on motion is [rigid motion segmentation](https://en.wikipedia.org/wiki/Rigid_motion_segmentation "Rigid motion segmentation").

## Compression-based methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=7 "Edit section: Compression-based methods")\]

Compression based methods postulate that the optimal segmentation is the one that minimizes, over all possible segmentations, the coding length of the data.^([\[34\]](#cite_note-34)[\[35\]](#cite_note-35)) The connection between these two concepts is that segmentation tries to find patterns in an image and any regularity in the image can be used to compress it. The method describes each segment by its texture and boundary shape. Each of these components is modeled by a probability distribution function and its coding length is computed as follows:

1.  The boundary encoding leverages the fact that regions in natural images tend to have a smooth contour. This prior is used by [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding "Huffman coding") to encode the difference [chain code](https://en.wikipedia.org/wiki/Chain_code "Chain code") of the contours in an image. Thus, the smoother a boundary is, the shorter coding length it attains.
2.  Texture is encoded by [lossy compression](https://en.wikipedia.org/wiki/Lossy_compression "Lossy compression") in a way similar to [minimum description length](https://en.wikipedia.org/wiki/Minimum_description_length "Minimum description length") (MDL) principle, but here the length of the data given the model is approximated by the number of samples times the [entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory) "Entropy (information theory)") of the model. The texture in each region is modeled by a [multivariate normal distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution "Multivariate normal distribution") whose entropy has a closed form expression. An interesting property of this model is that the estimated entropy bounds the true entropy of the data from above. This is because among all distributions with a given mean and covariance, normal distribution has the largest entropy. Thus, the true coding length cannot be more than what the algorithm tries to minimize.

For any given segmentation of an image, this scheme yields the number of bits required to encode that image based on the given segmentation. Thus, among all possible segmentations of an image, the goal is to find the segmentation which produces the shortest coding length. This can be achieved by a simple agglomerative clustering method. The distortion in the lossy compression determines the coarseness of the segmentation and its optimal value may differ for each image. This parameter can be estimated heuristically from the contrast of textures in an image. For example, when the textures in an image are similar, such as in camouflage images, stronger sensitivity and thus lower quantization is required.

## Histogram-based methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=8 "Edit section: Histogram-based methods")\]

[Histogram](https://en.wikipedia.org/wiki/Histogram "Histogram")-based methods are very efficient compared to other image segmentation methods because they typically require only one pass through the [pixels](https://en.wikipedia.org/wiki/Pixel "Pixel"). In this technique, a histogram is computed from all of the pixels in the image, and the peaks and valleys in the histogram are used to locate the [clusters](https://en.wikipedia.org/wiki/Cluster_analysis "Cluster analysis") in the image.^([\[1\]](#cite_note-computervision-1)) [Color](https://en.wikipedia.org/wiki/Hue "Hue") or [intensity](https://en.wikipedia.org/wiki/Brightness "Brightness") can be used as the measure.

A refinement of this technique is to [recursively](https://en.wikipedia.org/wiki/Recursion_(computer_science) "Recursion (computer science)") apply the histogram-seeking method to clusters in the image in order to divide them into smaller clusters. This operation is repeated with smaller and smaller clusters until no more clusters are formed.^([\[1\]](#cite_note-computervision-1)[\[36\]](#cite_note-36))

One disadvantage of the histogram-seeking method is that it may be difficult to identify significant peaks and valleys in the image.

Histogram-based approaches can also be quickly adapted to apply to multiple frames, while maintaining their single pass efficiency. The histogram can be done in multiple fashions when multiple frames are considered. The same approach that is taken with one frame can be applied to multiple, and after the results are merged, peaks and valleys that were previously difficult to identify are more likely to be distinguishable. The histogram can also be applied on a per-pixel basis where the resulting information is used to determine the most frequent color for the pixel location. This approach segments based on active objects and a static environment, resulting in a different type of segmentation useful in [video tracking](https://en.wikipedia.org/wiki/Video_tracking "Video tracking").

## Edge detection

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=9 "Edit section: Edge detection")\]

[Edge detection](https://en.wikipedia.org/wiki/Edge_detection "Edge detection") is a well-developed field on its own within image processing. Region boundaries and edges are closely related, since there is often a sharp adjustment in intensity at the region boundaries. Edge detection techniques have therefore been used as the base of another segmentation technique.

The edges identified by edge detection are often disconnected. To segment an object from an image however, one needs closed region boundaries. The desired edges are the boundaries between such objects or spatial-taxons.^([\[37\]](#cite_note-37)[\[38\]](#cite_note-38))

Spatial-taxons^([\[39\]](#cite_note-39)) are information granules,^([\[40\]](#cite_note-40)) consisting of a crisp pixel region, stationed at abstraction levels within a hierarchical nested scene architecture. They are similar to the [Gestalt](https://en.wikipedia.org/wiki/Gestalt_psychology "Gestalt psychology") psychological designation of figure-ground, but are extended to include foreground, object groups, objects and salient object parts. Edge detection methods can be applied to the spatial-taxon region, in the same manner they would be applied to a silhouette. This method is particularly useful when the disconnected edge is part of an illusory contour^([\[41\]](#cite_note-41)[\[42\]](#cite_note-42))

Segmentation methods can also be applied to edges obtained from edge detectors. Lindeberg and Li^([\[43\]](#cite_note-43)) developed an integrated method that segments edges into straight and curved edge segments for parts-based object recognition, based on a minimum description length (M_(DL)) criterion that was optimized by a split-and-merge-like method with candidate breakpoints obtained from complementary junction cues to obtain more likely points at which to consider partitions into different segments.

## Isolated Point Detection

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=10 "Edit section: Isolated Point Detection")\]

The detection of isolated points in an image is a fundamental part of image segmentation. This process primarily depends on the second derivative, indicating the use of the Laplacian operator. The Laplacian of a function $f(x,y)$ is given by:

$\nabla^{2}f(x,y) = \frac{\partial^{2}f}{\partial x^{2}} + \frac{\partial^{2}f}{\partial y^{2}}$

The Laplacian operator is employed such that the partial derivatives are derived from a specific equation. The second [partial derivative](https://en.wikipedia.org/wiki/Partial_derivative "Partial derivative") of $f(x,y)$ with respect to $x$ and $y$ are given by:

$\frac{\partial^{2}f(x,y)}{\partial x^{2}} = f(x + 1,y) + f(x - 1,y) - 2f(x,y)$

$\frac{\partial^{2}f(x,y)}{\partial y^{2}} = f(x,y + 1) + f(x,y - 1) - 2f(x,y)$

These partial derivatives are then used to compute the Laplacian as:

$\nabla^{2}f(x,y) = f(x + 1,y) + f(x - 1,y) + f(x,y + 1) + f(x,y - 1) - 4f(x,y)$

This mathematical expression can be implemented by convolving with an appropriate mask. If we extend this equation to three dimensions (x,y,z), the intensity at each pixel location around a central pixel at (x, y, z) is replaced by their corresponding values. This equation becomes particularly useful when we assume that all pixels have unit spacing along each axis.

A sphere mask has been developed for use with three-dimensional datasets. The sphere mask is designed to use only integer arithmetic during calculations, thereby eliminating the need for floating-point hardware or software.

When applying these concepts to actual images represented as arrays of numbers, we need to consider what happens when we reach an edge or border region. The function $g(x,y)$ is defined as:

$g(x,y) = \left\{ \begin{matrix}
1 & {\text{if~}|R(x,y)| \geq T} \\
0 & \text{otherwise}
\end{matrix} \right.$

This above equation is used to determine whether a point in the image is an isolated point based on the response magnitude $|R(x,y)|$ and a threshold value $T$. If the response magnitude is greater than or equal to the threshold, the function returns 1, indicating the presence of an isolated point; otherwise, it returns 0. This helps in the effective detection and segmentation of isolated points in the image.^([\[44\]](#cite_note-Digital_Image_Processing_2007-44))

## Application of Isolated Point Detection in X-ray Image Processing

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=11 "Edit section: Application of Isolated Point Detection in X-ray Image Processing")\]

The detection of isolated points has significant applications in various fields, including X-ray image processing. For instance, an original X-ray image of a turbine blade can be examined pixel-by-pixel to detect porosity in the upper-right quadrant of the blade. The result of applying an edge detector's response to this X-ray image can be approximated. This demonstrates the segmentation of isolated points in an image with the aid of single-pixel probes.^([\[44\]](#cite_note-Digital_Image_Processing_2007-44))

## Dual clustering method

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=12 "Edit section: Dual clustering method")\]

This method is a combination of three characteristics of the image: partition of the image based on histogram analysis is checked by high compactness of the clusters (objects), and high gradients of their borders. For that purpose two spaces have to be introduced: one space is the one-dimensional histogram of brightness *H* = *H*(*B*); the second space is the dual 3-dimensional space of the original image itself *B* = *B*(*x*, *y*). The first space allows to measure how compactly the brightness of the image is distributed by calculating a minimal clustering kmin. Threshold brightness T corresponding to kmin defines the binary (black-and-white) image – bitmap *b* = *φ*(*x*, *y*), where *φ*(*x*, *y*) = 0, if *B*(*x*, *y*) \< *T*, and *φ*(*x*, *y*) = 1, if *B*(*x*, *y*) ≥ *T*. The bitmap *b* is an object in [dual space](https://en.wikipedia.org/wiki/Dual_space "Dual space"). On that bitmap a measure has to be defined reflecting how compact distributed black (or white) pixels are. So, the goal is to find objects with good borders. For all *T* the measure *M*_(DC) = *G*/(*k* × *L*) has to be calculated (where *k* is difference in brightness between the object and the background, *L* is length of all borders, and *G* is mean gradient on the borders). Maximum of MDC defines the segmentation.^([\[45\]](#cite_note-45))

## Region-growing methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=13 "Edit section: Region-growing methods")\]

[Region-growing](https://en.wikipedia.org/wiki/Region-growing "Region-growing") methods rely mainly on the assumption that the neighboring pixels within one region have similar values. The common procedure is to compare one pixel with its neighbors. If a similarity criterion is satisfied, the pixel can be set to belong to the same cluster as one or more of its neighbors. The selection of the similarity criterion is significant and the results are influenced by noise in all instances.

The method of [Statistical Region Merging](https://en.wikipedia.org/wiki/Statistical_region_merging "Statistical region merging")^([\[46\]](#cite_note-SRM-46)) (SRM) starts by building the graph of pixels using 4-connectedness with edges weighted by the absolute value of the intensity difference. Initially each pixel forms a single pixel region. SRM then sorts those edges in a [priority queue](https://en.wikipedia.org/wiki/Priority_queue "Priority queue") and decides whether or not to merge the current regions belonging to the edge pixels using a statistical predicate.

One [region-growing](https://en.wikipedia.org/wiki/Region-growing "Region-growing") method is the seeded region growing method. This method takes a set of seeds as input along with the image. The seeds mark each of the objects to be segmented. The regions are iteratively grown by comparison of all unallocated neighboring pixels to the regions. The difference between a pixel's intensity value and the region's mean, $\delta$, is used as a [measure of similarity](https://en.wikipedia.org/wiki/Similarity_measure "Similarity measure"). The pixel with the smallest difference measured in this way is assigned to the respective region. This process continues until all pixels are assigned to a region. Because seeded region growing requires seeds as additional input, the segmentation results are dependent on the choice of seeds, and noise in the image can cause the seeds to be poorly placed.

Another [region-growing](https://en.wikipedia.org/wiki/Region-growing "Region-growing") method is the unseeded region growing method. It is a modified algorithm that does not require explicit seeds. It starts with a single region $A_{1}$—the pixel chosen here does not markedly influence the final segmentation. At each iteration it considers the neighboring pixels in the same way as seeded region growing. It differs from seeded region growing in that if the minimum $\delta$ is less than a predefined threshold $T$ then it is added to the respective region $A_{j}$. If not, then the pixel is considered different from all current regions $A_{i}$ and a new region $A_{n + 1}$ is created with this pixel.

One variant of this technique, proposed by [Haralick](https://en.wikipedia.org/wiki/Haralick "Haralick") and Shapiro (1985),^([\[1\]](#cite_note-computervision-1)) is based on pixel [intensities](https://en.wikipedia.org/wiki/Brightness "Brightness"). The [mean](https://en.wikipedia.org/wiki/Arithmetic_mean "Arithmetic mean") and [scatter](https://en.wikipedia.org/wiki/Statistical_dispersion "Statistical dispersion") of the region and the intensity of the candidate pixel are used to compute a [test statistic](https://en.wikipedia.org/wiki/Test_statistic "Test statistic"). If the test statistic is sufficiently small, the pixel is added to the region, and the region's mean and scatter are recomputed. Otherwise, the pixel is rejected, and is used to form a new region.

A special region-growing method is called $\lambda$-connected segmentation (see also [lambda-connectedness](https://en.wikipedia.org/wiki/Lambda-connectedness "Lambda-connectedness")). It is based on pixel [intensities](https://en.wikipedia.org/wiki/Brightness "Brightness") and neighborhood-linking paths. A degree of connectivity (connectedness) is calculated based on a path that is formed by pixels. For a certain value of $\lambda$, two pixels are called $\lambda$-connected if there is a path linking those two pixels and the connectedness of this path is at least $\lambda$. $\lambda$-connectedness is an [equivalence relation](https://en.wikipedia.org/wiki/Equivalence_relation "Equivalence relation").^([\[47\]](#cite_note-lambda-connectedness-47))

[Split-and-merge segmentation](https://en.wikipedia.org/wiki/Split_and_merge_segmentation "Split and merge segmentation") is based on a [quadtree](https://en.wikipedia.org/wiki/Quadtree "Quadtree") partition of an image. It is sometimes called quadtree segmentation.

This method starts at the root of the tree that represents the whole image. If it is found non-uniform (not homogeneous), then it is split into four child squares (the splitting process), and so on. If, in contrast, four child squares are homogeneous, they are merged as several connected components (the merging process). The node in the tree is a segmented node. This process continues recursively until no further splits or merges are possible.^([\[48\]](#cite_note-split-and-merge1-48)[\[49\]](#cite_note-split-and-merge2-49)) When a special data structure is involved in the implementation of the algorithm of the method, its time complexity can reach $O(n\log n)$, an optimal algorithm of the method.^([\[50\]](#cite_note-split-and-merge3-50))

## Partial differential equation-based methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=14 "Edit section: Partial differential equation-based methods")\]

Using a [partial differential equation](https://en.wikipedia.org/wiki/Partial_differential_equation "Partial differential equation") (PDE)-based method and solving the PDE equation by a numerical scheme, one can segment the image.^([\[51\]](#cite_note-51)) Curve propagation is a popular technique in this category, with numerous applications to object extraction, object tracking, stereo reconstruction, etc. The central idea is to evolve an initial curve towards the lowest potential of a cost function, where its definition reflects the task to be addressed. As for most [inverse problems](https://en.wikipedia.org/wiki/Inverse_problems "Inverse problems"), the minimization of the cost functional is non-trivial and imposes certain smoothness constraints on the solution, which in the present case can be expressed as geometrical constraints on the evolving curve.

### Parametric methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=15 "Edit section: Parametric methods")\]

[Lagrangian](https://en.wikipedia.org/wiki/Lagrangian_relaxation "Lagrangian relaxation") techniques are based on parameterizing the contour according to some sampling strategy and then evolving each element according to image and internal terms. Such techniques are fast and efficient, however the original "purely parametric" formulation (due to Kass, [Witkin](https://en.wikipedia.org/wiki/Andrew_Witkin "Andrew Witkin") and [Terzopoulos](https://en.wikipedia.org/wiki/Demetri_Terzopoulos "Demetri Terzopoulos") in 1987 and known as "[snakes](https://en.wikipedia.org/wiki/Snake_(computer_vision) "Snake (computer vision)")"), is generally criticized for its limitations regarding the choice of sampling strategy, the internal geometric properties of the curve, topology changes (curve splitting and merging), addressing problems in higher dimensions, etc.. Nowadays, efficient "discretized" formulations have been developed to address these limitations while maintaining high efficiency. In both cases, energy minimization is generally conducted using a steepest-gradient descent, whereby derivatives are computed using, e.g., finite differences.

### Level-set methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=16 "Edit section: Level-set methods")\]

The [level-set method](https://en.wikipedia.org/wiki/Level-set_method "Level-set method") was initially proposed to track moving interfaces by Dervieux and Thomasset^([\[52\]](#cite_note-52)[\[53\]](#cite_note-53)) in 1979 and 1981 and was later reinvented by Osher and Sethian in 1988.^([\[54\]](#cite_note-OsherSethian1988-54)) This has spread across various imaging domains in the late 1990s. It can be used to efficiently address the problem of curve/surface/etc. propagation in an implicit manner. The central idea is to represent the evolving contour using a signed function whose zero corresponds to the actual contour. Then, according to the motion equation of the contour, one can easily derive a similar flow for the implicit surface that when applied to the zero level will reflect the propagation of the contour. The level-set method affords numerous advantages: it is implicit, is parameter-free, provides a direct way to estimate the geometric properties of the evolving structure, allows for change of topology, and is intrinsic. It can be used to define an optimization framework, as proposed by Zhao, Merriman and Osher in 1996. One can conclude that it is a very convenient framework for addressing numerous applications of computer vision and medical image analysis.^([\[55\]](#cite_note-55)) Research into various [level-set data structures](https://en.wikipedia.org/wiki/Level-set_data_structures "Level-set data structures") has led to very efficient implementations of this method.

### Fast marching methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=17 "Edit section: Fast marching methods")\]

The [fast marching method](https://en.wikipedia.org/wiki/Fast_marching_method "Fast marching method") has been used in image segmentation,^([\[56\]](#cite_note-56)) and this model has been improved (permitting both positive and negative propagation speeds) in an approach called the generalized fast marching method.^([\[57\]](#cite_note-57))

## Variational methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=18 "Edit section: Variational methods")\]

The goal of variational methods is to find a segmentation which is optimal with respect to a specific energy functional. The functionals consist of a data fitting term and a regularizing terms. A classical representative is the [Potts model](https://en.wikipedia.org/wiki/Potts_model "Potts model") defined for an image $f$ by

${argmin}_{u}\gamma\|\nabla u\|_{0} + \int(u - f)^{2}\, dx.$

A minimizer $u^{\ast}$ is a piecewise constant image which has an optimal tradeoff between the squared L2 distance to the given image $f$ and the total length of its jump set. The jump set of $u^{\ast}$ defines a segmentation. The relative weight of the energies is tuned by the parameter $\gamma > 0$. The binary variant of the Potts model, i.e., if the range of $u$ is restricted to two values, is often called Chan-[Vese](https://en.wikipedia.org/wiki/Luminița_Vese "Luminița Vese") model.^([\[58\]](#cite_note-58)) An important generalization is the [Mumford-Shah model](https://en.wikipedia.org/wiki/Mumford–Shah_functional "Mumford–Shah functional")^([\[59\]](#cite_note-59)) given by

${argmin}_{u,K}\gamma|K| + \mu\int_{K^{C}}|\nabla u|^{2}\, dx + \int(u - f)^{2}\, dx.$

The functional value is the sum of the total length of the segmentation curve $K$, the smoothness of the approximation $u$, and its distance to the original image $f$. The weight of the smoothness penalty is adjusted by $\mu > 0$. The Potts model is often called piecewise constant Mumford-Shah model as it can be seen as the degenerate case $\mu\rightarrow\infty$. The optimization problems are known to be NP-hard in general but near-minimizing strategies work well in practice. Classical algorithms are [graduated non-convexity](https://en.wikipedia.org/wiki/Graduated_optimization "Graduated optimization") and [Ambrosio-Tortorelli approximation](https://en.wikipedia.org/wiki/Mumford–Shah_functional "Mumford–Shah functional").

## Graph partitioning methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=19 "Edit section: Graph partitioning methods")\]

[Graph](https://en.wikipedia.org/wiki/Graph_(data_structure) "Graph (data structure)") partitioning methods are an effective tools for image segmentation since they model the impact of pixel neighborhoods on a given cluster of pixels or pixel, under the assumption of homogeneity in images. In these methods, the image is modeled as a weighted, [undirected graph](https://en.wikipedia.org/wiki/Undirected_graph "Undirected graph"). Usually a pixel or a group of pixels are associated with [nodes](https://en.wikipedia.org/wiki/Vertex_(graph_theory) "Vertex (graph theory)") and [edge](https://en.wikipedia.org/wiki/Glossary_of_graph_theory#Basics "Glossary of graph theory") weights define the (dis)similarity between the neighborhood pixels. The graph (image) is then partitioned according to a criterion designed to model "good" clusters. Each partition of the nodes (pixels) output from these algorithms are considered an object segment in the image; see [Segmentation-based object categorization](https://en.wikipedia.org/wiki/Segmentation-based_object_categorization "Segmentation-based object categorization"). Some popular algorithms of this category are normalized cuts,^([\[60\]](#cite_note-60)) [random walker](https://en.wikipedia.org/wiki/Random_walker_(computer_vision) "Random walker (computer vision)"),^([\[61\]](#cite_note-61)) minimum cut,^([\[62\]](#cite_note-62)) isoperimetric partitioning,^([\[63\]](#cite_note-63)) [minimum spanning tree-based segmentation](https://en.wikipedia.org/wiki/Minimum_spanning_tree-based_segmentation "Minimum spanning tree-based segmentation"),^([\[64\]](#cite_note-64)) and [segmentation-based object categorization](https://en.wikipedia.org/wiki/Segmentation-based_object_categorization "Segmentation-based object categorization").

### Markov random fields

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=20 "Edit section: Markov random fields")\]

The application of [Markov random fields](https://en.wikipedia.org/wiki/Markov_random_field "Markov random field") (MRF) for images was suggested in early 1984 by Geman and Geman.^([\[65\]](#cite_note-65)) Their strong mathematical foundation and ability to provide a global optimum even when defined on local features proved to be the foundation for novel research in the domain of image analysis, de-noising and segmentation. MRFs are completely characterized by their prior probability distributions, marginal probability distributions, [cliques](https://en.wikipedia.org/wiki/Clique_(graph_theory) "Clique (graph theory)"), smoothing constraint as well as criterion for updating values. The criterion for image segmentation using MRFs is restated as finding the labelling scheme which has maximum probability for a given set of features. The broad categories of image segmentation using MRFs are supervised and unsupervised segmentation.

#### Supervised image segmentation using MRF and MAP

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=21 "Edit section: Supervised image segmentation using MRF and MAP")\]

In terms of image segmentation, the function that MRFs seek to maximize is the probability of identifying a labelling scheme given a particular set of features are detected in the image. This is a restatement of the [maximum a posteriori estimation](https://en.wikipedia.org/wiki/Maximum_a_posteriori_estimation "Maximum a posteriori estimation") method.

[![](//upload.wikimedia.org/wikipedia/commons/3/35/MRF_neighborhood.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled)](https://en.wikipedia.org/wiki/File:MRF_neighborhood.png)

MRF neighborhood for a chosen pixel

The generic algorithm for image segmentation using MAP is given below:

1.  Define the neighborhood of each feature (random variable in MRF terms).  
    Generally this includes 1st-order or 2nd-order neighbors.
2.  Set initial probabilities
    *P*(*f_(i)*)\> for each feature as 0 or
3.  where *f_(i)* ∈ Σ is the set containing features extracted  
    for pixel i and define an initial set of clusters.
4.  Using the training data compute the mean (*μ*_(*ℓ*_(*i*))) and variance (σ_(*ℓ*_(*i*))) for each label. This is termed as class statistics.
5.  Compute the marginal distribution for the given labeling scheme *P*(*f_(i)* \| *ℓ*_(*i*)) using [Bayes' theorem](https://en.wikipedia.org/wiki/Bayes'_theorem "Bayes' theorem") and the class statistics calculated earlier. A Gaussian model is used for the marginal distribution.
    $\frac{1}{\sigma(\ell_{i})\sqrt{2\pi}}e^{- (f_{i} - \mu(\ell_{i}))^{2}/(2\sigma(\ell_{i})^{2})}\, d\ell_{i}$
6.  Calculate the probability of each class label given the neighborhood defined previously.  
    [Clique](https://en.wikipedia.org/wiki/Clique_(graph_theory) "Clique (graph theory)") potentials are used to model the social impact in labeling.
7.  Iterate over new prior probabilities and redefine clusters such that these probabilities are maximized.  
    This is done using a variety of optimization algorithms described below.
8.  Stop when probability is maximized and labeling scheme does not change.  
    The calculations can be implemented in [log likelihood](https://en.wikipedia.org/wiki/Log-likelihood "Log-likelihood") terms as well.

#### Optimization algorithms

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=22 "Edit section: Optimization algorithms")\]

Each optimization algorithm is an adaptation of models from a variety of fields and they are set apart by their unique cost functions. The common trait of cost functions is to penalize change in pixel value as well as difference in pixel label when compared to labels of neighboring pixels.

##### Iterated conditional modes/gradient descent

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=23 "Edit section: Iterated conditional modes/gradient descent")\]

The [iterated conditional modes](https://en.wikipedia.org/wiki/Iterated_conditional_modes "Iterated conditional modes") (ICM) algorithm tries to reconstruct the ideal labeling scheme by changing the values of each pixel over each iteration and evaluating the energy of the new labeling scheme using the cost function given below,

$\alpha(1 - \delta(\ell_{i} - \ell_{\text{initial~}i}) + \beta\Sigma_{q \in N(i)}(1 - \delta(\ell_{i},\ell_{q(i)})).$

where α is the penalty for change in pixel label and β is the penalty for difference in label between neighboring pixels and chosen pixel. Here $N(i)$ is neighborhood of pixel i and δ is the [Kronecker delta](https://en.wikipedia.org/wiki/Kronecker_delta "Kronecker delta") function. A major issue with ICM is that, similar to gradient descent, it has a tendency to rest over local maxima and thus not obtain a globally optimal labeling scheme.

##### Simulated annealing (SA)

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=24 "Edit section: Simulated annealing (SA)")\]

Derived as an analogue of annealing in metallurgy, [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing "Simulated annealing") (SA) uses change in pixel label over iterations and estimates the difference in energy of each newly formed graph to the initial data. If the newly formed graph is more profitable, in terms of low energy cost, given by:

$\Delta U = U^{\text{new}} - U^{\text{old}}$

$\ell_{i} = \left\{ \begin{matrix}
{\ell_{i}^{\text{new}},} & {\text{if~}\Delta U \leq 0,} \\
{\ell_{i}^{\text{new}},} & {\text{if~}\Delta U > 0\text{~and~}\delta < e^{- \Delta U/T},\ell_{i}^{\text{old}}}
\end{matrix} \right.$

the algorithm selects the newly formed graph. Simulated annealing requires the input of temperature schedules which directly affects the speed of convergence of the system, as well as energy threshold for minimization to occur.

##### Alternative algorithms

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=25 "Edit section: Alternative algorithms")\]

A range of other methods exist for solving simple as well as higher order MRFs. They include Maximization of Posterior Marginal, Multi-scale MAP estimation,^([\[66\]](#cite_note-66)) Multiple Resolution segmentation^([\[67\]](#cite_note-67)) and more. Apart from likelihood estimates, graph-cut using maximum flow^([\[68\]](#cite_note-68)) and other highly constrained graph based methods^([\[69\]](#cite_note-69)[\[70\]](#cite_note-70)) exist for solving MRFs.

#### Image segmentation using MAP and expectation–maximization

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=26 "Edit section: Image segmentation using MAP and expectation–maximization")\]

The [expectation–maximization algorithm](https://en.wikipedia.org/wiki/Expectation–maximization_algorithm "Expectation–maximization algorithm") is utilized to iteratively estimate the a posterior probabilities and distributions of labeling when no training data is available and no estimate of segmentation model can be formed. A general approach is to use histograms to represent the features of an image and proceed as outlined briefly in this three-step algorithm:

1\. A random estimate of the model parameters is utilized.

2\. E step: Estimate class statistics based on the random segmentation model defined. Using these, compute the [conditional probability](https://en.wikipedia.org/wiki/Conditional_probability "Conditional probability") of belonging to a label given the feature set is calculated using naive [Bayes' theorem](https://en.wikipedia.org/wiki/Bayes'_theorem "Bayes' theorem").

$P(\lambda \mid f_{i}) = \frac{P(f_{i} \mid \lambda)P(\lambda)}{\Sigma_{\lambda \in \Lambda}P(f_{i} \mid \lambda)P(\lambda)}$

Here $\lambda \in \Lambda$, the set of all possible labels.

3\. M step: The established relevance of a given feature set to a labeling scheme is now used to compute the a priori estimate of a given label in the second part of the algorithm. Since the actual number of total labels is unknown (from a training data set), a hidden estimate of the number of labels given by the user is utilized in computations.

$P(\lambda) = \frac{\Sigma_{\lambda \in \Lambda}P(\lambda \mid f_{i})}{|\Omega|}$

where $\Omega$ is the set of all possible features.

[![](//thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Sample_segmentation_HMRF-EM.png/250px-Sample_segmentation_HMRF-EM.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail)](https://en.wikipedia.org/wiki/File:Sample_segmentation_HMRF-EM.png)

Segmentation of color image using HMRF-EM model

#### Disadvantages of MAP and EM based image segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=27 "Edit section: Disadvantages of MAP and EM based image segmentation")\]

1.  Exact MAP estimates cannot be easily computed.
2.  Approximate MAP estimates are computationally expensive to calculate.
3.  Extension to multi-class labeling degrades performance and increases storage required.
4.  Reliable estimation of parameters for EM is required for global optima to be achieved.
5.  Based on method of optimization, segmentation may cluster to local minima.

## Watershed transformation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=28 "Edit section: Watershed transformation")\]

The [watershed transformation](https://en.wikipedia.org/wiki/Watershed_(algorithm) "Watershed (algorithm)") considers the gradient magnitude of an image as a topographic surface. Pixels having the highest gradient magnitude intensities (GMIs) correspond to watershed lines, which represent the region boundaries. Water placed on any pixel enclosed by a common watershed line flows downhill to a common local intensity minimum (LIM). Pixels draining to a common minimum form a catch basin, which represents a segment.

## Model-based segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=29 "Edit section: Model-based segmentation")\]

The central assumption of model-based approaches is that the structures of interest have a tendency towards a particular shape. Therefore, one can seek a probabilistic model that characterizes the shape and its variation. When segmenting an image, constraints can be imposed using this model as a prior.^([\[71\]](#cite_note-StaibDuncan1992-71)) Such a task may involve (i) registration of the training examples to a common pose, (ii) probabilistic representation of the variation of the registered samples, and (iii) statistical inference between the model and the image. Other important methods in the literature for model-based segmentation include [active shape models](https://en.wikipedia.org/wiki/Active_shape_model "Active shape model") and [active appearance models](https://en.wikipedia.org/wiki/Active_appearance_model "Active appearance model").

## Multi-scale segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=30 "Edit section: Multi-scale segmentation")\]

Image segmentations are computed at multiple scales in [scale space](https://en.wikipedia.org/wiki/Scale_space "Scale space") and sometimes propagated from coarse to fine scales; see [scale-space segmentation](https://en.wikipedia.org/wiki/Scale-space_segmentation "Scale-space segmentation").

Segmentation criteria can be arbitrarily complex and may take into account global as well as local criteria. A common requirement is that each region must be connected in some sense.

### One-dimensional hierarchical signal segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=31 "Edit section: One-dimensional hierarchical signal segmentation")\]

Witkin's seminal work^([\[72\]](#cite_note-72)[\[73\]](#cite_note-73)) in scale space included the notion that a one-dimensional signal could be unambiguously segmented into regions, with one scale parameter controlling the scale of segmentation.

A key observation is that the zero-crossings of the second derivatives (minima and maxima of the first derivative or slope) of multi-scale-smoothed versions of a signal form a nesting tree, which defines hierarchical relations between segments at different scales. Specifically, slope extrema at coarse scales can be traced back to corresponding features at fine scales. When a slope maximum and slope minimum annihilate each other at a larger scale, the three segments that they separated merge into one segment, thus defining the hierarchy of segments.

### Image segmentation and primal sketch

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=32 "Edit section: Image segmentation and primal sketch")\]

There have been numerous research works in this area, out of which a few have now reached a state where they can be applied either with interactive manual intervention (usually with application to medical imaging) or fully automatically. The following is a brief overview of some of the main research ideas that current approaches are based upon.

The nesting structure that Witkin described is, however, specific for one-dimensional signals and does not trivially transfer to higher-dimensional images. Nevertheless, this general idea has inspired several other authors to investigate coarse-to-fine schemes for image segmentation. Koenderink^([\[74\]](#cite_note-74)) proposed to study how iso-intensity contours evolve over scales and this approach was investigated in more detail by Lifshitz and Pizer.^([\[75\]](#cite_note-75)) Unfortunately, however, the intensity of image features changes over scales, which implies that it is hard to trace coarse-scale image features to finer scales using iso-intensity information.

Lindeberg^([\[76\]](#cite_note-76)[\[77\]](#cite_note-lin94-77)) studied the problem of linking local extrema and saddle points over scales, and proposed an image representation called the scale-space primal sketch which makes explicit the relations between structures at different scales, and also makes explicit which image features are stable over large ranges of scale including locally appropriate scales for those. Bergholm proposed to detect edges at coarse scales in scale-space and then trace them back to finer scales with manual choice of both the coarse detection scale and the fine localization scale.

Gauch and Pizer^([\[78\]](#cite_note-78)) studied the complementary problem of ridges and valleys at multiple scales and developed a tool for interactive image segmentation based on multi-scale watersheds. The use of multi-scale watershed with application to the gradient map has also been investigated by Olsen and Nielsen^([\[79\]](#cite_note-79)) and been carried over to clinical use by Dam.^([\[80\]](#cite_note-80)) Vincken et al.^([\[81\]](#cite_note-81)) proposed a hyperstack for defining probabilistic relations between image structures at different scales. The use of stable image structures over scales has been furthered by Ahuja^([\[82\]](#cite_note-82)[\[83\]](#cite_note-83)) and his co-workers into a fully automated system. A fully automatic brain segmentation algorithm based on closely related ideas of multi-scale watersheds has been presented by Undeman and Lindeberg^([\[84\]](#cite_note-84)) and been extensively tested in brain databases.

These ideas for multi-scale image segmentation by linking image structures over scales have also been picked up by Florack and Kuijper.^([\[85\]](#cite_note-85)) Bijaoui and Rué^([\[86\]](#cite_note-86)) associate structures detected in scale-space above a minimum noise threshold into an object tree which spans multiple scales and corresponds to a kind of feature in the original signal. Extracted features are accurately reconstructed using an iterative conjugate gradient matrix method.

## Semi-automatic segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=33 "Edit section: Semi-automatic segmentation")\]

In one kind of segmentation, the user outlines the region of interest with the mouse clicks and algorithms are applied so that the path that best fits the edge of the image is shown.

Techniques like [SIOX](https://en.wikipedia.org/wiki/Simple_Interactive_Object_Extraction "Simple Interactive Object Extraction"), [Livewire](https://en.wikipedia.org/wiki/Livewire_Segmentation_Technique "Livewire Segmentation Technique"), Intelligent Scissors or IT-SNAPS are used in this kind of segmentation. In an alternative kind of semi-automatic segmentation, the algorithms return a spatial-taxon (i.e. foreground, object-group, object or object-part) selected by the user or designated via prior probabilities.^([\[87\]](#cite_note-87)[\[88\]](#cite_note-88))

## Trainable segmentation

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=34 "Edit section: Trainable segmentation")\]

Most of the aforementioned segmentation methods are based only on color information of pixels in the image. Humans use much more knowledge when performing image segmentation, but implementing this knowledge would cost considerable human engineering and computational time, and would require a huge [domain knowledge](https://en.wikipedia.org/wiki/Domain_knowledge "Domain knowledge") database which does not currently exist. Trainable segmentation methods, such as [neural network](https://en.wikipedia.org/wiki/Neural_network "Neural network") segmentation, overcome these issues by modeling the domain knowledge from a dataset of labeled pixels.

An image segmentation [neural network](https://en.wikipedia.org/wiki/Neural_network "Neural network") can process small areas of an image to extract simple features such as edges.^([\[89\]](#cite_note-Transactions_on_Engineering,_Computing_and_Technology-89)) Another neural network, or any decision-making mechanism, can then combine these features to label the areas of an image accordingly. A type of network designed this way is the [Kohonen map](https://en.wikipedia.org/wiki/Kohonen_map "Kohonen map").

[Pulse-coupled neural networks (PCNNs)](https://en.wikipedia.org/wiki/Pulse-coupled_networks "Pulse-coupled networks") are neural models proposed by modeling a cat's visual cortex and developed for high-performance [biomimetic](https://en.wikipedia.org/wiki/Biomimetic "Biomimetic") [image processing](https://en.wikipedia.org/wiki/Image_processing "Image processing"). In 1989, Reinhard Eckhorn introduced a neural model to emulate the mechanism of a cat's visual cortex. The Eckhorn model provided a simple and effective tool for studying the visual cortex of small mammals, and was soon recognized as having significant application potential in image processing. In 1994, the Eckhorn model was adapted to be an image processing algorithm by John L. Johnson, who termed this algorithm Pulse-Coupled Neural Network.^([\[90\]](#cite_note-90)) Over the past decade, PCNNs have been utilized for a variety of image processing applications, including: image segmentation, feature generation, face extraction, motion detection, region growing, noise reduction, and so on. A PCNN is a two-dimensional neural network. Each neuron in the network corresponds to one pixel in an input image, receiving its corresponding pixel's color information (e.g. intensity) as an external stimulus. Each neuron also connects with its neighboring neurons, receiving local stimuli from them. The external and local stimuli are combined in an internal activation system, which accumulates the stimuli until it exceeds a dynamic threshold, resulting in a pulse output. Through iterative computation, PCNN neurons produce temporal series of pulse outputs. The temporal series of pulse outputs contain information of input images and can be utilized for various image processing applications, such as image segmentation and feature generation. Compared with conventional image processing means, PCNNs have several significant merits, including robustness against noise, independence of geometric variations in input patterns, capability of bridging minor intensity variations in input patterns, etc.

In 2015, [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network "Convolutional neural network") reached state of the art in semantic segmentation.^([\[91\]](#cite_note-91)) [U-Net](https://en.wikipedia.org/wiki/U-Net "U-Net") is an architecture which takes as input an image and outputs a label for each pixel.^([\[92\]](#cite_note-92)) U-Net initially was developed to detect cell boundaries in biomedical images. U-Net follows classical [autoencoder](https://en.wikipedia.org/wiki/Autoencoder "Autoencoder") architecture, as such it contains two sub-structures. The encoder structure follows the traditional stack of convolutional and max pooling layers to increase the receptive field as it goes through the layers. It is used to capture the context in the image. The decoder structure utilizes transposed convolution layers for upsampling so that the end dimensions are close to that of the input image. Skip connections are placed between convolution and transposed convolution layers of the same shape in order to preserve details that would have been lost otherwise.

In addition to pixel-level semantic segmentation tasks which assign a given category to each pixel, modern segmentation applications include instance-level semantic segmentation tasks in which each individual in a given category must be uniquely identified, as well as panoptic segmentation tasks which combines these two tasks to provide a more complete scene segmentation.^([\[29\]](#cite_note-Panoptic_Segmentation-29))

## Segmentation of related images and videos

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=35 "Edit section: Segmentation of related images and videos")\]

Main article: [Object co-segmentation](https://en.wikipedia.org/wiki/Object_co-segmentation "Object co-segmentation")

Related images such as a photo album or a sequence of video frames often contain semantically similar objects and scenes, therefore it is often beneficial to exploit such correlations.^([\[93\]](#cite_note-Vicente_Rother_Kolmogorov_2011_p.-93)) The task of simultaneously segmenting scenes from related images or video frames is termed [co-segmentation](https://en.wikipedia.org/wiki/Object_co-segmentation "Object co-segmentation"),^([\[24\]](#cite_note-Liu_Wang_Hua_Zhang_2018_pp._5840–5853-24)) which is typically used in [human action localization](https://en.wikipedia.org/wiki/Activity_recognition "Activity recognition"). Unlike conventional [bounding box](https://en.wikipedia.org/wiki/Minimum_bounding_box "Minimum bounding box")-based [object detection](https://en.wikipedia.org/wiki/Object_detection "Object detection"), human action localization methods provide finer-grained results, typically per-image segmentation masks delineating the human object of interest and its action category (e.g., *Segment-Tube*^([\[25\]](#cite_note-Wang_Duan_Zhang_Niu_p=1657-25))). Techniques such as dynamic [Markov Networks](https://en.wikipedia.org/wiki/Markov_random_field "Markov random field"), [CNN](https://en.wikipedia.org/wiki/Convolutional_neural_network "Convolutional neural network") and [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory "Long short-term memory") are often employed to exploit the inter-frame correlations.

## Other methods

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=36 "Edit section: Other methods")\]

There are many other methods of segmentation like [multispectral segmentation](https://en.wikipedia.org/wiki/Multispectral_segmentation "Multispectral segmentation") or connectivity-based segmentation based on [DTI images](https://en.wikipedia.org/wiki/Diffusion_MRI#Diffusion_tensor_imaging "Diffusion MRI").^([\[94\]](#cite_note-94)[\[95\]](#cite_note-95))

## See also

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=37 "Edit section: See also")\]

- [Object co-segmentation](https://en.wikipedia.org/wiki/Object_co-segmentation "Object co-segmentation") – Image segmentation in computer vision
- [Computer vision](https://en.wikipedia.org/wiki/Computer_vision "Computer vision") – Computerized information extraction from images
- [Image-based meshing](https://en.wikipedia.org/wiki/Image-based_meshing "Image-based meshing")
- [Range image segmentation](https://en.wikipedia.org/wiki/Range_image_segmentation "Range image segmentation")
- [Vector quantization](https://en.wikipedia.org/wiki/Vector_quantization "Vector quantization") – Classical quantization technique from signal processing
- [Image quantization](https://en.wikipedia.org/wiki/Image_quantization "Image quantization") – Lossy compression techniquePages displaying short descriptions of redirect targets
- [Color quantization](https://en.wikipedia.org/wiki/Color_quantization "Color quantization") – Image processing technique
- [Object-based image analysis](https://en.wikipedia.org/wiki/Object-based_image_analysis "Object-based image analysis") – Extraction of information from images via digital image processing techniquesPages displaying short descriptions of redirect targets
- [List of manual image annotation tools](https://en.wikipedia.org/wiki/List_of_manual_image_annotation_tools "List of manual image annotation tools")
- [Rigid motion segmentation](https://en.wikipedia.org/wiki/Rigid_motion_segmentation "Rigid motion segmentation")
- [Text segmentation](https://en.wikipedia.org/wiki/Text_segmentation "Text segmentation") – Human writing practice

## Notes

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=38 "Edit section: Notes")\]

1.  [1](#cite_ref-computervision_1-0) [2](#cite_ref-computervision_1-1) [3](#cite_ref-computervision_1-2) [4](#cite_ref-computervision_1-3) [5](#cite_ref-computervision_1-4) [Linda G. Shapiro](https://en.wikipedia.org/wiki/Linda_Shapiro "Linda Shapiro") and George C. Stockman (2001): "Computer Vision", pp 279–325, New Jersey, Prentice-Hall,
    [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [0-13-030796-3](https://en.wikipedia.org/wiki/Special:BookSources/0-13-030796-3 "Special:BookSources/0-13-030796-3")
2.  [↑](#cite_ref-2) Barghout, Lauren, and Lawrence W. Lee. "Perceptual information processing system." Paravue Inc. U.S. Patent Application 10/618,543, filed 11 July 2003.
3.  [↑](#cite_ref-3) Nielsen, Frank; Nock, Richard (2003). "On region merging: The statistical soundness of fast sorting, with applications". *2003 IEEE Computer Society Conference on Computer Vision and Pattern Recognition, 2003. Proceedings*. Vol. 2. IEEE. pp. II:19–26. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/CVPR.2003.1211447](https://doi.org/10.1109%2FCVPR.2003.1211447). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [0-7695-1900-8](https://en.wikipedia.org/wiki/Special:BookSources/0-7695-1900-8 "Special:BookSources/0-7695-1900-8").
4.  [↑](#cite_ref-4) Zachow, Stefan, Michael Zilske, and Hans-Christian Hege. "[3D reconstruction of individual anatomy from medical image data: Segmentation and geometry processing](https://opus4.kobv.de/opus4-zib/files/1044/ZR_07_41.pdf)^(\[*[permanent dead link](https://en.wikipedia.org/wiki/Wikipedia:Link_rot "Wikipedia:Link rot")*\])." (2007).
5.  [↑](#cite_ref-5) Belongie, Serge, et al. "[Color-and texture-based image segmentation using EM and its application to content-based image retrieval](http://people.eecs.berkeley.edu/~malik/papers/blobworld98.pdf)." Sixth International Conference on Computer Vision (IEEE Cat. No. 98CH36271). IEEE, 1998.
6.  [↑](#cite_ref-6) Pham, Dzung L.; Xu, Chenyang; Prince, Jerry L. (2000). "Current Methods in Medical Image Segmentation". *Annual Review of Biomedical Engineering*. **2**: 315–337. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1146/annurev.bioeng.2.1.315](https://doi.org/10.1146%2Fannurev.bioeng.2.1.315). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [11701515](https://pubmed.ncbi.nlm.nih.gov/11701515).
7.  [↑](#cite_ref-7) Forghani, M.; Forouzanfar, M.; Teshnehlab, M. (2010). "Parameter optimization of improved fuzzy c-means clustering algorithm for brain MR image segmentation". *Engineering Applications of Artificial Intelligence*. **23** (2): 160–168. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.engappai.2009.10.002](https://doi.org/10.1016%2Fj.engappai.2009.10.002).
8.  [↑](#cite_ref-8) Reznikov, Natalie; Buss, Dan J.; Provencher, Benjamin; McKee, Marc D.; Piché, Nicolas (October 2020). "Deep learning for 3D imaging and image analysis in biomineralization research". *Journal of Structural Biology*. **212** (1) 107598. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.jsb.2020.107598](https://doi.org/10.1016%2Fj.jsb.2020.107598). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1047-8477](https://search.worldcat.org/issn/1047-8477). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [32783967](https://pubmed.ncbi.nlm.nih.gov/32783967). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [221126896](https://api.semanticscholar.org/CorpusID:221126896).
9.  [↑](#cite_ref-9) Wu, Wei; Chen, Albert Y. C.; Zhao, Liang; Corso, Jason J. (2014). ["Brain tumor detection and segmentation in a CRF (Conditional random fields) framework with pixel-pairwise affinity and superpixel-level features"](https://link.springer.com/article/10.1007/s11548-013-0922-7). *International Journal of Computer Assisted Radiology and Surgery*. **9** (2): 241–253. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s11548-013-0922-7](https://doi.org/10.1007%2Fs11548-013-0922-7). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [23860630](https://pubmed.ncbi.nlm.nih.gov/23860630). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [13474403](https://api.semanticscholar.org/CorpusID:13474403).
10. [↑](#cite_ref-10) E. B. George and M. Karnan (2012): "[MR Brain image segmentation using Bacteria Foraging Optimization Algorithm](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.411.7411&rep=rep1&type=pdf)", *International Journal of Engineering and Technology*, Vol. 4.
11. [↑](#cite_ref-11) Ye, Run Zhou; Noll, Christophe; Richard, Gabriel; Lepage, Martin; Turcotte, Éric E.; Carpentier, André C. (February 2022). ["DeepImageTranslator: A free, user-friendly graphical interface for image translation using deep-learning and its applications in 3D CT image analysis"](https://doi.org/10.1016%2Fj.slast.2021.10.014). *SLAS Technology*. **27** (1): 76–84. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.slast.2021.10.014](https://doi.org/10.1016%2Fj.slast.2021.10.014). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2472-6303](https://search.worldcat.org/issn/2472-6303). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [35058205](https://pubmed.ncbi.nlm.nih.gov/35058205).
12. [↑](#cite_ref-12) Ye, En Zhou; Ye, En Hui; Bouthillier, Maxime; Ye, Run Zhou (18 February 2022). "DeepImageTranslator V2: analysis of multimodal medical images using semantic segmentation maps generated through deep learning". [bioRxiv](https://en.wikipedia.org/wiki/BioRxiv_(identifier) "BioRxiv (identifier)") [10.1101/2021.10.12.464160](https://doi.org/10.1101%2F2021.10.12.464160).
13. [↑](#cite_ref-13) Kamalakannan, Sridharan; Gururajan, Arunkumar; Sari-Sarraf, Hamed; Rodney, Long; Antani, Sameer (17 February 2010). "Double-Edge Detection of Radiographic Lumbar Vertebrae Images Using Pressurized Open DGVF Snakes". *IEEE Transactions on Biomedical Engineering*. **57** (6): 1325–1334. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2010ITBE...57.1325K](https://scixplorer.org/abs/2010ITBE...57.1325K). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/tbme.2010.2040082](https://doi.org/10.1109%2Ftbme.2010.2040082). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [20172792](https://pubmed.ncbi.nlm.nih.gov/20172792). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [12766600](https://api.semanticscholar.org/CorpusID:12766600).
14. [↑](#cite_ref-14) Georgescu, Mariana-Iuliana; Ionescu, Radu Tudor; Miron, Andreea-Iuliana (21 December 2022). "Diversity-Promoting Ensemble for Medical Image Segmentation". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2210.12388](https://arxiv.org/abs/2210.12388) \[[eess.IV](https://arxiv.org/archive/eess.IV)\].
15. [↑](#cite_ref-15) Basu, Anusua; Senapati, Pradip; Deb, Mainak; Rai, Rebika; Dhal, Krishna Gopal (6 March 2023). ["A survey on recent trends in deep learning for nucleus segmentation from histopathology images"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9987406). *Evolving Systems*. **15**: 203–248. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s12530-023-09491-3](https://doi.org/10.1007%2Fs12530-023-09491-3). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1868-6486](https://search.worldcat.org/issn/1868-6486). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [9987406](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9987406). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [38625364](https://pubmed.ncbi.nlm.nih.gov/38625364).
16. [↑](#cite_ref-16) Mahbod, Amirreza; Schaefer, Gerald; Dorffner, Georg; Hatamikia, Sepideh; Ecker, Rupert; Ellinger, Isabella (11 November 2022). ["A dual decoder U-Net-based model for nuclei instance segmentation in hematoxylin and eosin-stained histological images"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9691672). *Frontiers in Medicine*. **9** 978146. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.3389/fmed.2022.978146](https://doi.org/10.3389%2Ffmed.2022.978146). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2296-858X](https://search.worldcat.org/issn/2296-858X). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [9691672](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9691672). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [36438040](https://pubmed.ncbi.nlm.nih.gov/36438040).
17. [↑](#cite_ref-17) Ramakrishnan, Vignesh; Artinger, Annalena; Daza Barragan, Laura Alexandra; Daza, Jimmy; Winter, Lina; Niedermair, Tanja; Itzel, Timo; Arbelaez, Pablo; Teufel, Andreas; Cotarelo, Cristina L.; Brochhausen, Christoph (1 October 2024). ["Nuclei Detection and Segmentation of Histopathological Images Using a Feature Pyramidal Network Variant of a Mask R-CNN"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11504515). *Bioengineering*. **11** (10): 994. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.3390/bioengineering11100994](https://doi.org/10.3390%2Fbioengineering11100994). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2306-5354](https://search.worldcat.org/issn/2306-5354). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [11504515](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11504515). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [39451370](https://pubmed.ncbi.nlm.nih.gov/39451370).
18. [↑](#cite_ref-18) Shu, Jie; Fu, Hao; Qiu, Guoping; Kaye, Philip; Ilyas, Mohammad (2013). "Segmenting overlapping cell nuclei in digital histopathology images". *2013 35th Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC)*. Vol. 2013. pp. 5445–5448. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/EMBC.2013.6610781](https://doi.org/10.1109%2FEMBC.2013.6610781). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-4577-0216-7](https://en.wikipedia.org/wiki/Special:BookSources/978-1-4577-0216-7 "Special:BookSources/978-1-4577-0216-7"). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2694-0604](https://search.worldcat.org/issn/2694-0604). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [24110968](https://pubmed.ncbi.nlm.nih.gov/24110968).
19. [↑](#cite_ref-19) ["PAN-CANCER-NUCLEI-SEG"](https://www.cancerimagingarchive.net/analysis-result/pan-cancer-nuclei-seg/). *The Cancer Imaging Archive (TCIA)*. Retrieved 13 October 2025.
20. [↑](#cite_ref-20) Mahbod, Amirreza; Polak, Christine; Feldmann, Katharina; Khan, Rumsha; Gelles, Katharina; Dorffner, Georg; Woitek, Ramona; Hatamikia, Sepideh; Ellinger, Isabella (14 March 2024). ["NuInsSeg: A fully annotated dataset for nuclei instance segmentation in H&E-stained histological images"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10940572). *Scientific Data*. **11** (1): 295. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2024NatSD..11..295M](https://scixplorer.org/abs/2024NatSD..11..295M). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1038/s41597-024-03117-2](https://doi.org/10.1038%2Fs41597-024-03117-2). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2052-4463](https://search.worldcat.org/issn/2052-4463). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [10940572](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10940572). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [38486039](https://pubmed.ncbi.nlm.nih.gov/38486039).
21. [↑](#cite_ref-21) Yoo, Inwan; Yoo, Donggeun; Paeng, Kyunghyun (22 July 2019), *PseudoEdgeNet: Nuclei Segmentation only with Point Annotations*, [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1906.02924](https://arxiv.org/abs/1906.02924)
22. [↑](#cite_ref-22) Popp, Manuel R.; Kalwij, Jesse M. (24 August 2023). ["Consumer-grade UAV imagery facilitates semantic segmentation of species-rich savanna tree layers"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10449814). *Scientific Reports*. **13** (1). Nature Publishing Group: 13892. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2023NatSR..1313892P](https://scixplorer.org/abs/2023NatSR..1313892P). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1038/s41598-023-40989-7](https://doi.org/10.1038%2Fs41598-023-40989-7). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [2045-2322](https://search.worldcat.org/issn/2045-2322). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [10449814](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10449814). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [37620395](https://pubmed.ncbi.nlm.nih.gov/37620395).
23. [↑](#cite_ref-23) J. A. Delmerico, P. David and J. J. Corso (2011): "[Building façade detection, segmentation and parameter estimation for mobile robot localization and guidance](http://www.jeffdelmerico.com/wp-content/papercite-data/pdf/delmerico2011building.pdf)", International Conference on Intelligent Robots and Systems, pp. 1632–1639.
24. [1](#cite_ref-Liu_Wang_Hua_Zhang_2018_pp._5840–5853_24-0) [2](#cite_ref-Liu_Wang_Hua_Zhang_2018_pp._5840–5853_24-1) Liu, Ziyi; Wang, Le; Hua, Gang; Zhang, Qilin; Niu, Zhenxing; Wu, Ying; Zheng, Nanning (2018). ["Joint Video Object Discovery and Segmentation by Coupled Dynamic Markov Networks"](https://qilin-zhang.github.io/_pages/pdfs/Joint_Video_Object_Discovery_and_Segmentation_by_Coupled_Dynamic_Markov_Networks.pdf) (PDF). *IEEE Transactions on Image Processing*. **27** (12): 5840–5853. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2018ITIP...27.5840L](https://scixplorer.org/abs/2018ITIP...27.5840L). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/tip.2018.2859622](https://doi.org/10.1109%2Ftip.2018.2859622). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1057-7149](https://search.worldcat.org/issn/1057-7149). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [30059300](https://pubmed.ncbi.nlm.nih.gov/30059300). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [51867241](https://api.semanticscholar.org/CorpusID:51867241).
25. [1](#cite_ref-Wang_Duan_Zhang_Niu_p=1657_25-0) [2](#cite_ref-Wang_Duan_Zhang_Niu_p=1657_25-1) Wang, Le; Duan, Xuhuan; Zhang, Qilin; Niu, Zhenxing; Hua, Gang; Zheng, Nanning (22 May 2018). ["Segment-Tube: Spatio-Temporal Action Localization in Untrimmed Videos with Per-Frame Segmentation"](https://qilin-zhang.github.io/_pages/pdfs/Segment-Tube_Spatio-Temporal_Action_Localization_in_Untrimmed_Videos_with_Per-Frame_Segmentation.pdf) (PDF). *Sensors*. **18** (5): 1657. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2018Senso..18.1657W](https://scixplorer.org/abs/2018Senso..18.1657W). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.3390/s18051657](https://doi.org/10.3390%2Fs18051657). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1424-8220](https://search.worldcat.org/issn/1424-8220). [PMC](https://en.wikipedia.org/wiki/PMC_(identifier) "PMC (identifier)") [5982167](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5982167). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [29789447](https://pubmed.ncbi.nlm.nih.gov/29789447).
26. [↑](#cite_ref-26) Guo, Dazhou; Pei, Yanting; Zheng, Kang; Yu, Hongkai; Lu, Yuhang; Wang, Song (2020). ["Degraded Image Semantic Segmentation With Dense-Gram Networks"](https://doi.org/10.1109%2FTIP.2019.2936111). *IEEE Transactions on Image Processing*. **29**: 782–795. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2020ITIP...29..782G](https://scixplorer.org/abs/2020ITIP...29..782G). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/TIP.2019.2936111](https://doi.org/10.1109%2FTIP.2019.2936111). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [1057-7149](https://search.worldcat.org/issn/1057-7149). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [31449020](https://pubmed.ncbi.nlm.nih.gov/31449020). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [201753511](https://api.semanticscholar.org/CorpusID:201753511).
27. [↑](#cite_ref-27) Mesh Flinders (11 September 2023). ["What is semantic segmentation?"](https://www.ibm.com/think/topics/semantic-segmentation). *IBM Think*. International Business Machines Corporation. Retrieved 21 October 2025.
28. [↑](#cite_ref-28) Yi, Jingru; Wu, Pengxiang; Jiang, Menglin; Huang, Qiaoying; Hoeppner, Daniel J.; Metaxas, Dimitris N. (July 2019). ["Attentive neural cell instance segmentation"](https://doi.org/10.1016%2Fj.media.2019.05.004). *Medical Image Analysis*. **55**: 228–240. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.media.2019.05.004](https://doi.org/10.1016%2Fj.media.2019.05.004). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [31103790](https://pubmed.ncbi.nlm.nih.gov/31103790). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [159038604](https://api.semanticscholar.org/CorpusID:159038604).
29. [1](#cite_ref-Panoptic_Segmentation_29-0) [2](#cite_ref-Panoptic_Segmentation_29-1) Alexander Kirillov; Kaiming He; Ross Girshick; Carsten Rother; Piotr Dollár (2018). "Panoptic Segmentation". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1801.00868](https://arxiv.org/abs/1801.00868) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
30. [↑](#cite_ref-30) Batenburg, K J.; Sijbers, J. (2009). "Adaptive thresholding of tomograms by projection distance minimization". *Pattern Recognition*. **42** (10): 2297–2305. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2009PatRe..42.2297B](https://scixplorer.org/abs/2009PatRe..42.2297B). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/j.patcog.2008.11.027](https://doi.org/10.1016%2Fj.patcog.2008.11.027).
31. [↑](#cite_ref-31) Batenburg, K J.; Sijbers, J. (June 2009). ["Optimal Threshold Selection for Tomogram Segmentation by Projection Distance Minimization"](https://web.archive.org/web/20130503171943/http://www.visielab.ua.ac.be/publications/optimal-threshold-selection-tomogram-segmentation-projection-distance-minimization). *IEEE Transactions on Medical Imaging*. **28** (5): 676–686. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2009ITMI...28..676B](https://scixplorer.org/abs/2009ITMI...28..676B). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/tmi.2008.2010437](https://doi.org/10.1109%2Ftmi.2008.2010437). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [19272989](https://pubmed.ncbi.nlm.nih.gov/19272989). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [10994501](https://api.semanticscholar.org/CorpusID:10994501). Archived from [the original](http://www.visielab.ua.ac.be/publications/optimal-threshold-selection-tomogram-segmentation-projection-distance-minimization) (PDF) on 3 May 2013. Retrieved 31 July 2012.
32. [↑](#cite_ref-32) Kashanipour, A.; Milani, N; Kashanipour, A.; Eghrary, H. (May 2008). "Robust Color Classification Using Fuzzy Rule-Based Particle Swarm Optimization". *2008 Congress on Image and Signal Processing*. Vol. 2. IEEE Congress on Image and Signal Processing. pp. 110–114. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/CISP.2008.770](https://doi.org/10.1109%2FCISP.2008.770). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-0-7695-3119-9](https://en.wikipedia.org/wiki/Special:BookSources/978-0-7695-3119-9 "Special:BookSources/978-0-7695-3119-9"). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [8422475](https://api.semanticscholar.org/CorpusID:8422475).
33. [↑](#cite_ref-33) Barghout, Lauren; Sheynin, Jacob (2013). ["Real-world scene perception and perceptual organization: Lessons from Computer Vision"](https://doi.org/10.1167%2F13.9.709). *Journal of Vision*. **13** (9): 709. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1167/13.9.709](https://doi.org/10.1167%2F13.9.709).
34. [↑](#cite_ref-34) Hossein Mobahi; Shankar Rao; Allen Yang; Shankar Sastry; Yi Ma. (2011). ["Segmentation of Natural Images by Texture and Boundary Compression"](https://web.archive.org/web/20170808173212/http://perception.csl.illinois.edu/coding//papers/MobahiH2011-IJCV.pdf) (PDF). *International Journal of Computer Vision*. **95**: 86–98. [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1006.3679](https://arxiv.org/abs/1006.3679). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s11263-011-0444-0](https://doi.org/10.1007%2Fs11263-011-0444-0). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [11070572](https://api.semanticscholar.org/CorpusID:11070572). Archived from [the original](http://perception.csl.illinois.edu/coding/papers/MobahiH2011-IJCV.pdf) (PDF) on 8 August 2017. Retrieved 8 May 2011.
35. [↑](#cite_ref-35) Shankar Rao, Hossein Mobahi, Allen Yang, Shankar Sastry and Yi Ma [Natural Image Segmentation with Adaptive Texture and Boundary Encoding](http://perception.csl.illinois.edu/coding/papers/RaoS2009-ACCV.pdf) [Archived](https://web.archive.org/web/20160519101956/http://perception.csl.illinois.edu/coding/papers/RaoS2009-ACCV.pdf) 19 May 2016 at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine"), Proceedings of the Asian Conference on Computer Vision (ACCV) 2009, H. Zha, R.-i. Taniguchi, and S. Maybank (Eds.), Part I, LNCS 5994, pp. 135–146, Springer.
36. [↑](#cite_ref-36) Ohlander, Ron; Price, Keith; Reddy, D. Raj (1978). "Picture Segmentation Using a Recursive Region Splitting Method". *Computer Graphics and Image Processing*. **8** (3): 313–333. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[1978CGIP....8..313O](https://scixplorer.org/abs/1978CGIP....8..313O). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/0146-664X(78)90060-6](https://doi.org/10.1016%2F0146-664X%2878%2990060-6).
37. [↑](#cite_ref-37) [R. Kimmel and A.M. Bruckstein.](https://en.wikipedia.org/wiki/R._Kimmel_and_A.M._Bruckstein.?action=edit&redlink=1 "R. Kimmel and A.M. Bruckstein. (page does not exist)") [https://www.cs.technion.ac.il/~ron/PAPERS/Paragios_chapter2003.pdf](https://www.cs.technion.ac.il/~ron/PAPERS/Paragios_chapter2003.pdf), *International Journal of Computer Vision* 2003; 53(3):225–243.
38. [↑](#cite_ref-38) [R. Kimmel](https://en.wikipedia.org/wiki/R._Kimmel?action=edit&redlink=1 "R. Kimmel (page does not exist)"), [https://www.cs.technion.ac.il/~ron/PAPERS/laplacian_ijcv2003.pdf](https://www.cs.technion.ac.il/~ron/PAPERS/laplacian_ijcv2003.pdf), chapter in Geometric Level Set Methods in Imaging, Vision and Graphics, (S. Osher, N. Paragios, Eds.), Springer Verlag, 2003. [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [0387954880](https://en.wikipedia.org/wiki/Special:BookSources/0387954880 "Special:BookSources/0387954880")
39. [↑](#cite_ref-39) Barghout, Lauren. [Visual Taxometric approach Image Segmentation using Fuzzy-Spatial Taxon Cut Yields Contextually Relevant Regions](http://www.lirmm.fr/~lafourcade/pub/IPMU2014/papers/0443/04430163.pdf). Communications in Computer and Information Science (CCIS). Springer-Verlag. 2014
40. [↑](#cite_ref-40) Witold Pedrycz (Editor), Andrzej Skowron (Co-Editor), Vladik Kreinovich (Co-Editor). Handbook of Granular Computing. Wiley 2008
41. [↑](#cite_ref-41) Barghout, Lauren (2014). Vision. Global Conceptual Context Changes Local Contrast Processing (Ph.D. Dissertation 2003). Updated to include Computer Vision Techniques. Scholars' Press. [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-3-639-70962-9](https://en.wikipedia.org/wiki/Special:BookSources/978-3-639-70962-9 "Special:BookSources/978-3-639-70962-9").
42. [↑](#cite_ref-42) Barghout, Lauren, and Lawrence Lee. "Perceptual information processing system." Google Patents
43. [↑](#cite_ref-43) Lindeberg, T.; Li, M.-X. (1997). ["Segmentation and classification of edges using minimum description length approximation and complementary junction cues"](http://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A473385&dswid=-8029). *Computer Vision and Image Understanding*. **67** (1): 88–98. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1006/cviu.1996.0510](https://doi.org/10.1006%2Fcviu.1996.0510).
44. [1](#cite_ref-Digital_Image_Processing_2007_44-0) [2](#cite_ref-Digital_Image_Processing_2007_44-1) Digital Image Processing (2007, Pearson) by Rafael C. Gonzalez, Richard E. Woods
45. [↑](#cite_ref-45) [](http://gth.krammerbuch.at/sites/default/files/articles/AHAH%20callback/01_Guberman_KORR.pdf) [Archived](https://web.archive.org/web/20171013224758/http://gth.krammerbuch.at/sites/default/files/articles/AHAH%20callback/01_Guberman_KORR.pdf) 13 October 2017 at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine")[Shelia Guberman](https://en.wikipedia.org/wiki/Guberman_Shelia_(Shelija) "Guberman Shelia (Shelija)"), Vadim V. Maximov, Alex Pashintsev Gestalt and Image Understanding. GESTALT THEORY 2012, Vol. 34, No.2, 143–166.
46. [↑](#cite_ref-SRM_46-0) R. Nock and F. Nielsen, [Statistical Region Merging](http://www.academia.edu/download/3433683/Statistical_Region_Merging.pdf)^(\[*[dead link](https://en.wikipedia.org/wiki/Wikipedia:Link_rot "Wikipedia:Link rot")*\]), IEEE Transactions on Pattern Analysis and Machine Intelligence, Vol 26, No 11, pp 1452–1458, 2004.
47. [↑](#cite_ref-lambda-connectedness_47-0) L. Chen, H. D. Cheng, and J. Zhang, [Fuzzy subfiber and its application to seismic lithology classification](https://www.sciencedirect.com/science/article/pii/1069011594900094), Information Sciences: Applications, Vol 1, No 2, pp 77–95, 1994.
48. [↑](#cite_ref-split-and-merge1_48-0) S.L. Horowitz and T. Pavlidis, Picture Segmentation by a Directed Split and Merge Procedure, Proc. ICPR, 1974, Denmark, pp. 424–433.
49. [↑](#cite_ref-split-and-merge2_49-0) S.L. Horowitz and T. Pavlidis, Picture Segmentation by a Tree Traversal Algorithm, Journal of the ACM, 23 (1976), pp. 368–388.
50. [↑](#cite_ref-split-and-merge3_50-0) L. Chen, [The lambda-connected segmentation and the optimal algorithm for split-and-merge segmentation](http://www.spclab.com/research/lambda/lambdaConn91.pdf) [Archived](https://web.archive.org/web/20160310054934/http://www.spclab.com/research/lambda/lambdaConn91.pdf) 10 March 2016 at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine"), Chinese J. Computers, 14(1991), pp 321–331
51. [↑](#cite_ref-51) Caselles, V.; Kimmel, R.; Sapiro, G. (1997). ["Geodesic active contours"](https://www.cs.technion.ac.il/~ron/PAPERS/CasKimSap_IJCV1997.pdf) (PDF). *International Journal of Computer Vision*. **22** (1): 61–79. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1023/A:1007979827043](https://doi.org/10.1023%2FA%3A1007979827043). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [406088](https://api.semanticscholar.org/CorpusID:406088).
52. [↑](#cite_ref-52) Dervieux, A. and Thomasset, F. 1979. A finite element method for the simulation of Raleigh-Taylor instability. Springer Lect. Notes in Math., 771:145–158.
53. [↑](#cite_ref-53) Dervieux, A. and Thomasset, F. 1981. [Multifluid incompressible flows by a finite element method](https://www.researchgate.net/profile/Alain_Dervieux/publication/226529379_Multifluid_Incompressible_Flows_by_a_Finite_Element_Method/links/57176a3e08ae2679a8c766ac.pdf). Lecture Notes in Physics, 11:158–163.
54. [↑](#cite_ref-OsherSethian1988_54-0) Osher, Stanley; Sethian, James A (1988). "Fronts propagating with curvature-dependent speed: Algorithms based on Hamilton-Jacobi formulations". *Journal of Computational Physics*. **79** (1): 12–49. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[1988JCoPh..79...12O](https://scixplorer.org/abs/1988JCoPh..79...12O). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/0021-9991(88)90002-2](https://doi.org/10.1016%2F0021-9991%2888%2990002-2). [hdl](https://en.wikipedia.org/wiki/Hdl_(identifier) "Hdl (identifier)"):[2060/19880001113](https://hdl.handle.net/2060%2F19880001113). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [0021-9991](https://search.worldcat.org/issn/0021-9991).
55. [↑](#cite_ref-55) S. Osher and N. Paragios. [Geometric Level Set Methods in Imaging Vision and Graphics](http://www.mas.ecp.fr/vision/Personnel/nikos/osher-paragios/), Springer Verlag, [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [0-387-95488-0](https://en.wikipedia.org/wiki/Special:BookSources/0-387-95488-0 "Special:BookSources/0-387-95488-0"), 2003.
56. [↑](#cite_ref-56) James A. Sethian. ["Segmentation in Medical Imaging"](http://math.berkeley.edu/~sethian/2006/Applications/Medical_Imaging/artery.html). Retrieved 15 January 2012.
57. [↑](#cite_ref-57) Forcadel, Nicolas; Le Guyader, Carole; Gout, Christian (July 2008), "Generalized fast marching method: applications to image segmentation", *Numerical Algorithms*, **48** (1–3): 189–211, [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/s11075-008-9183-x](https://doi.org/10.1007%2Fs11075-008-9183-x), [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [7467344](https://api.semanticscholar.org/CorpusID:7467344)
58. [↑](#cite_ref-58) Chan, T.F.; [Vese, L.](https://en.wikipedia.org/wiki/Luminița_Vese "Luminița Vese") (2001). "Active contours without edges". *IEEE Transactions on Image Processing*. **10** (2): 266–277. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[2001ITIP...10..266C](https://scixplorer.org/abs/2001ITIP...10..266C). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/83.902291](https://doi.org/10.1109%2F83.902291). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [18249617](https://pubmed.ncbi.nlm.nih.gov/18249617). [S2CID](https://en.wikipedia.org/wiki/S2CID_(identifier) "S2CID (identifier)") [7602622](https://api.semanticscholar.org/CorpusID:7602622).
59. [↑](#cite_ref-59) [David Mumford](https://en.wikipedia.org/wiki/David_Mumford "David Mumford") and Jayant Shah (1989): [Optimal approximations by piecewise smooth functions and associated variational problems](https://dash.harvard.edu/bitstream/handle/1/3637121/Mumford_OptimalApproxPiece.pdf?sequence=1), *Communications on Pure and Applied Mathematics*, pp 577–685, Vol. 42, No. 5
60. [↑](#cite_ref-60) Jianbo Shi and [Jitendra Malik](https://en.wikipedia.org/wiki/Jitendra_Malik "Jitendra Malik") (2000): ["Normalized Cuts and Image Segmentation"](https://www.cs.cmu.edu/~jshi/papers/pami_ncut.pdf), *IEEE Transactions on Pattern Analysis and Machine Intelligence*, pp 888–905, Vol. 22, No. 8
61. [↑](#cite_ref-61) Leo Grady (2006): ["Random Walks for Image Segmentation"](http://vision.cse.psu.edu/people/chenpingY/paper/grady2006random.pdf), *IEEE Transactions on Pattern Analysis and Machine Intelligence*, pp. 1768–1783, Vol. 28, No. 11
62. [↑](#cite_ref-62) Z. Wu and R. Leahy (1993): ["An optimal graph theoretic approach to data clustering: Theory and its application to image segmentation"](ftp://sipi.usc.edu/pub/leahy/pdfs/MAP93.pdf)^(\[*[dead link](https://en.wikipedia.org/wiki/Wikipedia:Link_rot "Wikipedia:Link rot")*\]), *IEEE Transactions on Pattern Analysis and Machine Intelligence*, pp. 1101–1113, Vol. 15, No. 11
63. [↑](#cite_ref-63) Leo Grady and Eric L. Schwartz (2006): ["Isoperimetric Graph Partitioning for Image Segmentation"](http://www.cns.bu.edu/~lgrady/grady2006isoperimetric.pdf) [Archived](https://web.archive.org/web/20110719090404/http://www.cns.bu.edu/~lgrady/grady2006isoperimetric.pdf) 19 July 2011 at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine"), *IEEE Transactions on Pattern Analysis and Machine Intelligence*, pp. 469–475, Vol. 28, No. 3
64. [↑](#cite_ref-64) C. T. Zahn (1971): ["Graph-theoretical methods for detecting and describing gestalt clusters"](http://web.cse.msu.edu/~cse802/Papers/zahn.pdf), *IEEE Transactions on Computers*, pp. 68–86, Vol. 20, No. 1
65. [↑](#cite_ref-65) S. Geman and D. Geman (1984): "Stochastic relaxation, Gibbs Distributions and Bayesian Restoration of Images", IEEE Transactions on Pattern Analysis and Machine Intelligence, pp. 721–741, Vol. 6, No. 6.
66. [↑](#cite_ref-66) A. Bouman and M. Shapiro (2002): "A multiscale Random field model for Bayesian image segmentation", IEEE Transactions on Image Processing, pp. 162–177, Vol. 3.
67. [↑](#cite_ref-67) J. Liu and Y. H. Yang (1994): "[Multiresolution color image segmentation](https://ieeexplore.ieee.org/abstract/document/297949/)", IEEE Transactions on Pattern Analysis and Machine Intelligence, pp. 689–700, Vol. 16.
68. [↑](#cite_ref-68) S. Vicente, V. Kolmogorov and C. Rother (2008): "[Graph cut based image segmentation with connectivity priors](http://www0.cs.ucl.ac.uk/staff/s.vicente/papers/connectedGC-CVPR08-TR.pdf)", CVPR
69. [↑](#cite_ref-69) Corso, Z. Tu, and A. Yuille (2008): "MRF Labelling with Graph-Shifts Algorithm", Proceedings of International workshop on combinatorial Image Analysis
70. [↑](#cite_ref-70) B. J. Frey and D. MacKayan (1997): "[A Revolution: Belief propagation in Graphs with Cycles](http://papers.nips.cc/paper/1467-a-revolution-belief-propagation-in-graphs-with-cycles.pdf)", Proceedings of Neural Information Processing Systems (NIPS)
71. [↑](#cite_ref-StaibDuncan1992_71-0) Staib, L.H.; Duncan, J.S. (1992). "Boundary finding with parametrically deformable models". *IEEE Transactions on Pattern Analysis and Machine Intelligence*. **14** (11): 1061–1075. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[1992ITPAM..14.1061S](https://scixplorer.org/abs/1992ITPAM..14.1061S). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/34.166621](https://doi.org/10.1109%2F34.166621). [ISSN](https://en.wikipedia.org/wiki/ISSN_(identifier) "ISSN (identifier)") [0162-8828](https://search.worldcat.org/issn/0162-8828).
72. [↑](#cite_ref-72) Witkin, A. P. "Scale-space filtering", Proc. 8th Int. Joint Conf. Art. Intell., Karlsruhe, Germany,1019–1022, 1983.
73. [↑](#cite_ref-73) A. Witkin, "[Scale-space filtering: A new approach to multi-scale description](https://ieeexplore.ieee.org/abstract/document/1172729/)," in Proc. IEEE Int. Conf. Acoust., Speech, Signal Processing ([ICASSP](https://en.wikipedia.org/wiki/ICASSP "ICASSP")), vol. 9, San Diego, CA, March 1984, pp. 150–153.
74. [↑](#cite_ref-74) Koenderink, Jan "The structure of images", Biological Cybernetics, 50:363–370, 1984
75. [↑](#cite_ref-75) [Lifshitz, L. and Pizer, S.: A multiresolution hierarchical approach to image segmentation based on intensity extrema, IEEE Transactions on Pattern Analysis and Machine Intelligence, 12:6, 529–540, 1990.](http://portal.acm.org/citation.cfm?id=80964&dl=GUIDE&coll=GUIDE)
76. [↑](#cite_ref-76) [Lindeberg, T.: Detecting salient blob-like image structures and their scales with a scale-space primal sketch: A method for focus-of-attention, International Journal of Computer Vision, 11(3), 283–318, 1993.](http://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A472969&dswid=2693)
77. [↑](#cite_ref-lin94_77-0) [Lindeberg, Tony, Scale-Space Theory in Computer Vision, Kluwer Academic Publishers, 1994](http://www.csc.kth.se/~tony/book.html), [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [0-7923-9418-6](https://en.wikipedia.org/wiki/Special:BookSources/0-7923-9418-6 "Special:BookSources/0-7923-9418-6")
78. [↑](#cite_ref-78) [Gauch, J. and Pizer, S.: Multiresolution analysis of ridges and valleys in grey-scale images, IEEE Transactions on Pattern Analysis and Machine Intelligence, 15:6 (June 1993), pages: 635–646, 1993.](http://portal.acm.org/citation.cfm?coll=GUIDE&dl=GUIDE&id=628490)
79. [↑](#cite_ref-79) Olsen, O. and Nielsen, M.: [Multi-scale gradient magnitude watershed segmentation](https://link.springer.com/content/pdf/10.1007/3-540-63507-6_178.pdf), Proc. of ICIAP 97, Florence, Italy, Lecture Notes in Computer Science, pages 6–13. Springer Verlag, September 1997.
80. [↑](#cite_ref-80) Dam, E., Johansen, P., Olsen, O. Thomsen,, A. Darvann, T., Dobrzenieck, A., Hermann, N., Kitai, N., Kreiborg, S., Larsen, P., Nielsen, M.: "Interactive multi-scale segmentation in clinical use" in European Congress of Radiology 2000.
81. [↑](#cite_ref-81) Vincken, K.L.; Koster, A.S.E.; Viergever, M.A. (1997). "Probabilistic multiscale image segmentation". *IEEE Transactions on Pattern Analysis and Machine Intelligence*. **19** (2): 109–120. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[1997ITPAM..19..109V](https://scixplorer.org/abs/1997ITPAM..19..109V). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/34.574787](https://doi.org/10.1109%2F34.574787).
82. [↑](#cite_ref-82) [M. Tabb and N. Ahuja, Unsupervised multiscale image segmentation by integrated edge and region detection, IEEE Transactions on Image Processing, Vol. 6, No. 5, 642–655, 1997.](http://vision.ai.uiuc.edu/~msingh/segmen/seg/MSS.html) [Archived](https://web.archive.org/web/20110720084911/http://vision.ai.uiuc.edu/~msingh/segmen/seg/MSS.html) 20 July 2011 at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine")
83. [↑](#cite_ref-83) Akbas, Emre; Ahuja, Narendra (2010). ["From Ramp Discontinuities to Segmentation Tree"](https://doi.org/10.1007%2F978-3-642-12307-8_12). *Computer Vision – ACCV 2009*. Lecture Notes in Computer Science. Vol. 5994. pp. 123–134. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1007/978-3-642-12307-8_12](https://doi.org/10.1007%2F978-3-642-12307-8_12). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-3-642-12306-1](https://en.wikipedia.org/wiki/Special:BookSources/978-3-642-12306-1 "Special:BookSources/978-3-642-12306-1").
84. [↑](#cite_ref-84) [C. Undeman and T. Lindeberg (2003) "Fully Automatic Segmentation of MRI Brain Images using Probabilistic Anisotropic Diffusion and Multi-Scale Watersheds", Proc. Scale-Space'03, Isle of Skye, Scotland, Springer Lecture Notes in Computer Science, volume 2695, pages 641–656.](http://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A451266&dswid=-4540)
85. [↑](#cite_ref-85) Florack, L. and Kuijper, A.: The topological structure of scale-space images, Journal of Mathematical Imaging and Vision, 12:1, 65–79, 2000.
86. [↑](#cite_ref-86) Bijaoui, A.; Rué, F. (1995). "A Multiscale Vision Model". *Signal Processing*. **46** (3): 345. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1016/0165-1684(95)00093-4](https://doi.org/10.1016%2F0165-1684%2895%2900093-4).
87. [↑](#cite_ref-87) Barghout, Lauren. Visual Taxometric Approach to Image Segmentation using Fuzzy-Spatial Taxon Cut Yields Contextually Relevant Regions. IPMU 2014, Part II. A. Laurent et al (Eds.) CCIS 443, pp 163–173. Springer International Publishing Switzerland
88. [↑](#cite_ref-88) Barghout, Lauren (2014). [*Vision: How Global Perceptual Context Changes Local Contrast Processing (Ph.D. Dissertation 2003). Updated to include Computer Vision Techniques*](https://www.morebooks.de/store/gb/book/vision/isbn/978-3-639-70962-9). Scholars Press. [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-3-639-70962-9](https://en.wikipedia.org/wiki/Special:BookSources/978-3-639-70962-9 "Special:BookSources/978-3-639-70962-9").
89. [↑](#cite_ref-Transactions_on_Engineering,_Computing_and_Technology_89-0) [Mahinda Pathegama](https://en.wikipedia.org/wiki/Mahinda_Pathegama?action=edit&redlink=1 "Mahinda Pathegama (page does not exist)") & Ö Göl (2004): "Edge-end pixel extraction for edge-based image segmentation", *Transactions on Engineering, Computing and Technology,* vol. 2, pp 213–216, ISSN 1305-5313
90. [↑](#cite_ref-90) Johnson, John L. (September 1994). "Pulse-coupled neural nets: translation, rotation, scale, distortion, and intensity signal invariance for images". *Applied Optics*. **33** (26). OSA: 6239–6253. [Bibcode](https://en.wikipedia.org/wiki/Bibcode_(identifier) "Bibcode (identifier)"):[1994ApOpt..33.6239J](https://scixplorer.org/abs/1994ApOpt..33.6239J). [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1364/AO.33.006239](https://doi.org/10.1364%2FAO.33.006239). [PMID](https://en.wikipedia.org/wiki/PMID_(identifier) "PMID (identifier)") [20936043](https://pubmed.ncbi.nlm.nih.gov/20936043).
91. [↑](#cite_ref-91) Long, Jonathan; Shelhamer, Evan; Darrell, Trevor (2015). [*Fully Convolutional Networks for Semantic Segmentation*](https://openaccess.thecvf.com/content_cvpr_2015/html/Long_Fully_Convolutional_Networks_2015_CVPR_paper.html). Proceedings of the IEEE conference on computer vision and pattern recognition. pp. 3431–3440.
92. [↑](#cite_ref-92) Ronneberger, Olaf; Fischer, Philipp; [Brox, Thomas](https://en.wikipedia.org/wiki/Thomas_Brox "Thomas Brox") (2015). "U-Net: Convolutional Networks for Biomedical Image Segmentation". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[1505.04597](https://arxiv.org/abs/1505.04597) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
93. [↑](#cite_ref-Vicente_Rother_Kolmogorov_2011_p._93-0) Vicente, Sara; Rother, Carsten; Kolmogorov, Vladimir (2011). "Object cosegmentation". *CVPR 2011*. IEEE. pp. 2217–2224. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.1109/cvpr.2011.5995530](https://doi.org/10.1109%2Fcvpr.2011.5995530). [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-1-4577-0394-2](https://en.wikipedia.org/wiki/Special:BookSources/978-1-4577-0394-2 "Special:BookSources/978-1-4577-0394-2").
94. [↑](#cite_ref-94) Saygin, ZM, Osher, DE, Augustinack, J, Fischl, B, and Gabrieli, JDE.: [Connectivity-based segmentation of human amygdala nuclei using probabilistic tractography.](https://doi.org/10.1016%2Fj.neuroimage.2011.03.006), Neuroimage, 56:3, pp. 1353–61, 2011.
95. [↑](#cite_ref-95) Menke, RA, Jbabdi, S, Miller, KL, Matthews, PM and Zarei, M.: [Connectivity-based segmentation of the substantia nigra in human and its implications in Parkinson's disease](https://doi.org/10.1016%2Fj.neuroimage.2010.05.086), Neuroimage, 52:4, pp. 1175–80, 2010.\]

## References

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=39 "Edit section: References")\]

- [3D Entropy Based Image Segmentation](https://web.archive.org/web/20080314011622/http://instrumentation.hit.bg/Papers/2008-02-02%203D%20Multistage%20Entropy.htm)
- Frucci, Maria; [Sanniti di Baja, Gabriella](https://en.wikipedia.org/wiki/Gabriella_Sanniti_di_Baja "Gabriella Sanniti di Baja") (2008). "From Segmentation to Binarization of Gray-level Images". *[Journal of Pattern Recognition Research](https://en.wikipedia.org/wiki/Journal_of_Pattern_Recognition_Research?action=edit&redlink=1 "Journal of Pattern Recognition Research (page does not exist)")*. **3** (1): 1–13. [doi](https://en.wikipedia.org/wiki/Doi_(identifier) "Doi (identifier)"):[10.13176/11.54](https://doi.org/10.13176%2F11.54).

## External links

\[[edit](/w/index.php?title=Image_segmentation&action=edit&section=40 "Edit section: External links")\]

- [Some sample code that performs basic segmentation](https://web.archive.org/web/20100518124644/http://csc.fsksm.utm.my/syed/projects/image-processing.html), by Syed Zainudeen. University Technology of Malaysia.
- [Generalized Fast Marching method](https://rd.springer.com/article/10.1007/s11075-008-9183-x) by Forcadel et al. \[2008\] for applications in image segmentation.
- [Image Processing Research Group](https://web.archive.org/web/20201228051352/http://www.iprg.co.in/) An Online Open Image Processing Research Community.
- [Segmentation methods in image processing and analysis](https://www.mathworks.com/discovery/image-segmentation.html) and [Minimizing energy to segment images](https://blogs.mathworks.com/pick/2017/12/07/minimizing-energy-to-segment-images-or-cluster-data/) by Mathworks
- [More image segmentation methods with detailed algorithms](http://disp.ee.ntu.edu.tw/meeting/%E6%98%B1%E7%BF%94/Segmentation%20tutorial.pdf) [Archived](https://web.archive.org/web/20191101050028/http://disp.ee.ntu.edu.tw/meeting/%E6%98%B1%E7%BF%94/Segmentation%20tutorial.pdf) 1 November 2019 at the [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine "Wayback Machine") by Yu-Hsiang Wang (王昱翔), National Taiwan University, Taipei, Taiwan, ROC
- [Online demonstration of piecewise linear image segmentation](https://ipolcore.ipol.im/demo/clientApp/demo.html?id=295) by IPOL Journal

![](https://en.wikipedia.org/wiki/Special:CentralAutoLogin/start?useformat=desktop&type=1x1&usesul3=1)

Retrieved from "[https://en.wikipedia.org/w/index.php?title=Image_segmentation&oldid=1383966883](https://en.wikipedia.org/w/index.php?title=Image_segmentation&oldid=1383966883)"
