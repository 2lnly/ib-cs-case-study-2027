Source: https://en.wikipedia.org/wiki/LAION

Non-profit German artificial intelligence organization

[TABLE]

**LAION** (acronym for **Large-scale Artificial Intelligence Open Network**) is a German non-profit organization which makes open-sourced [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence "Artificial intelligence") models and datasets.

^([\[1\]](#cite_note-About-1)) It is best known for releasing a number of large datasets of images and captions scraped from the web which have been used to train a number of high-profile [text-to-image models](https://en.wikipedia.org/wiki/Text-to-image_model "Text-to-image model"), including [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion "Stable Diffusion") and [Imagen](https://en.wikipedia.org/wiki/Imagen_(text-to-image_model) "Imagen (text-to-image model)").^([\[2\]](#cite_note-Ars-Trained-2)[\[3\]](#cite_note-BB_teacher-3))

In February 2023, LAION was named in the [Getty Images](https://en.wikipedia.org/wiki/Getty_Images "Getty Images") lawsuit against [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion "Stable Diffusion") as a non-party.^([\[4\]](#cite_note-4)) In April 2023, LAION was directly sued by a German photographer who wanted to have his images removed from the training set.^([\[5\]](#cite_note-5)) In September 2024, the [Regional Court of Hamburg](https://en.wikipedia.org/wiki/Regional_Court_of_Hamburg "Regional Court of Hamburg") dismissed the lawsuit, in what was described as a "landmark ruling on TDM \[[Text and data mining](https://en.wikipedia.org/wiki/Text_and_data_mining "Text and data mining")\] exceptions for AI training data" in Germany and the EU more generally.^([\[6\]](#cite_note-:2-6))

On April 15, 2023, LAION and contributors publicly released an open source AI assistant chatbot called [OpenAssistant](https://en.wikipedia.org/wiki/OpenAssistant "OpenAssistant").

## Image datasets

\[[edit](/w/index.php?title=LAION&action=edit&section=1 "Edit section: Image datasets")\]

LAION has publicly released a number of large datasets of image-caption pairs which have been widely used by AI researchers.^(\[*[citation needed](https://en.wikipedia.org/wiki/Wikipedia:Citation_needed "Wikipedia:Citation needed")*\]) The data is derived from the [Common Crawl](https://en.wikipedia.org/wiki/Common_Crawl "Common Crawl"), a dataset of scraped web pages. The developers searched the crawled html for `<img>` tags and treated their [alt attributes](https://en.wikipedia.org/wiki/Alt_attribute "Alt attribute") as captions. They used [CLIP](https://en.wikipedia.org/wiki/Contrastive_Language-Image_Pre-training "Contrastive Language-Image Pre-training") to identify and discard images whose content did not appear to match their captions.^([\[7\]](#cite_note-Infoq-5b-7)) LAION does not host the content of scraped images themselves; rather, the dataset contains [URLs](https://en.wikipedia.org/wiki/URL "URL") pointing to images, which researchers must download themselves.^([\[8\]](#cite_note-Ars-medical-8))

The first such dataset, LAION-400M, was released in August 2021 and consisted of 400 million image-caption pairs. The pairs were extracted from a random subset of webpages scraped by Common Crawl between 2014 and 2021.^([\[9\]](#cite_note-Laion-400m-blog-9)) It was an attempt to recreate the process used by [OpenAI](https://en.wikipedia.org/wiki/OpenAI "OpenAI") to collect the 400 million image-caption pairs they used to train the CLIP model - the company had chosen to open-source the model's code and weights, but not its training dataset.^([\[7\]](#cite_note-Infoq-5b-7)) [Imagen](https://en.wikipedia.org/wiki/Imagen_(Google_Brain) "Imagen (Google Brain)"), a text-to-image model announced by Google Brain in 2022, was trained on LAION-400M in combination with private internal datasets.^([\[10\]](#cite_note-imagen-paper-10))

A successor of more than 5 billion pairs, LAION-5B, was released in March 2022.^([\[11\]](#cite_note-Laion-5b-blog-11)) As of its release, it was the largest freely available dataset of image-caption pairs in existence.^([\[7\]](#cite_note-Infoq-5b-7)) Its creation was funded by Doodlebot, [Hugging Face](https://en.wikipedia.org/wiki/Hugging_Face "Hugging Face") and [Stability AI](https://en.wikipedia.org/wiki/Stability_AI "Stability AI"), the AI company behind the funding of the [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion "Stable Diffusion") text-to-image model, which was trained on it.^([\[12\]](#cite_note-tc-sai-12))

### Criticism

\[[edit](/w/index.php?title=LAION&action=edit&section=2 "Edit section: Criticism")\]

Several studies show that the images in LAION-5B contain problematic images and text pairs of rape, pornography, malign stereotypes, racist and ethnic slurs, and other extremely problematic content.^([\[13\]](#cite_note-13)[\[14\]](#cite_note-14))

An investigation by Bayerischer Rundfunk showed that LAION's datasets, hosted on Hugging Face, contain large amounts of private and sensitive data harvested from public websites.^([\[15\]](#cite_note-15))

In December 2023, the [Stanford Internet Observatory](https://en.wikipedia.org/wiki/Stanford_Internet_Observatory "Stanford Internet Observatory") released a report on LAION-5B that found 3,226 suspected instances of links to [child sexual abuse material](https://en.wikipedia.org/wiki/Child_sexual_abuse_material "Child sexual abuse material") with 1,008 of these being externally validated. In response, LAION temporarily removed LAION-5B and LAION-400M citing its "zero tolerance policy for illegal content" and "an abundance of caution".^([\[16\]](#cite_note-16)) In August 2024, LAION released a cleaned dataset called Re-LAION-5B.^([\[17\]](#cite_note-17))

## OpenAssistant

\[[edit](/w/index.php?title=LAION&action=edit&section=3 "Edit section: OpenAssistant")\]

[TABLE]

OpenAssistant was an [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence "Artificial intelligence") (AI) [open source](https://en.wikipedia.org/wiki/Open_source "Open source") chat-based assistant that could understand tasks, interact with third-party systems and retrieve information dynamically to do so. The project was developed by a group of volunteers in collaboration with LAION. One of the goals for development included free access to [large language models](https://en.wikipedia.org/wiki/Large_language_model "Large language model") that can be run locally on consumer hardware.^([\[18\]](#cite_note-18)[\[19\]](#cite_note-:0-19)) The project was backed by a worldwide [crowdsourcing](https://en.wikipedia.org/wiki/Crowdsourcing "Crowdsourcing") effort involving over 13,500 volunteers who have created 600k human-generated data points.^([\[19\]](#cite_note-:0-19)[\[20\]](#cite_note-20)) The project has since been shut down;^(\[*[when?](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Dates_and_numbers#Chronological_items "Wikipedia:Manual of Style/Dates and numbers")*\]) however, the datasets and models remain available on [Hugging Face](https://en.wikipedia.org/wiki/Hugging_Face "Hugging Face").

## See also

\[[edit](/w/index.php?title=LAION&action=edit&section=4 "Edit section: See also")\]

- [Artificial intelligence and copyright](https://en.wikipedia.org/wiki/Artificial_intelligence_and_copyright "Artificial intelligence and copyright")

## References

\[[edit](/w/index.php?title=LAION&action=edit&section=5 "Edit section: References")\]

1.  [↑](#cite_ref-About_1-0) ["About"](https://laion.ai/about/). *LAION.ai*. Retrieved 26 September 2022.
2.  [↑](#cite_ref-Ars-Trained_2-0) Edwards, Benj (15 September 2022). ["Have AI image generators assimilated your art? New tool lets you check"](https://arstechnica.com/information-technology/2022/09/have-ai-image-generators-assimilated-your-art-new-tool-lets-you-check/). *Ars Technica*.
3.  [↑](#cite_ref-BB_teacher_3-0) Newman, Marissa; Cantrill, Aggi (24 April 2023). ["The Future of AI Relies on a High School Teacher's Free Database"](https://www.bloomberg.com/news/features/2023-04-24/a-high-school-teacher-s-free-image-database-powers-ai-unicorns). *[Bloomberg News](https://en.wikipedia.org/wiki/Bloomberg_News "Bloomberg News")*. Retrieved 24 April 2023.
4.  [↑](#cite_ref-4) ["Getty Images (US), Inc. v. Stability AI, Inc., 1:23-cv-00135"](https://www.courtlistener.com/docket/66788385/getty-images-us-inc-v-stability-ai-inc/). *CourtListener*. Retrieved 2023-02-08.
5.  [↑](#cite_ref-5) ["A Photographer Tried to Get His Photos Removed from an AI Dataset. He Got an Invoice Instead"](https://www.vice.com/en/article/a-photographer-tried-to-get-his-photos-removed-from-an-ai-dataset-he-got-an-invoice-instead/). *Vice*. 28 April 2023. Retrieved 2023-05-04.
6.  [↑](#cite_ref-:2_6-0) [Goldstein, Paul](https://en.wikipedia.org/wiki/Paul_Goldstein_(law_professor) "Paul Goldstein (law professor)"); Stuetzle, Christiane; Bischoff, Susan (2024-11-13). ["Kneschke vs. LAION - Landmark Ruling on TDM exceptions for AI training data – Part 1"](https://copyrightblog.kluweriplaw.com/2024/11/13/kneschke-vs-laion-landmark-ruling-on-tdm-exceptions-for-ai-training-data-part-1/). *Kluwer Copyright Blog*. Retrieved 2024-11-25.
7.  [1](#cite_ref-Infoq-5b_7-0) [2](#cite_ref-Infoq-5b_7-1) [3](#cite_ref-Infoq-5b_7-2) Alford, Anthony (17 May 2022). ["LAION Releases Five Billion Image-Text Pair Dataset LAION-5B"](https://www.infoq.com/news/2022/05/laion-5b-image-text-dataset/). *InfoQ*.
8.  [↑](#cite_ref-Ars-medical_8-0) Edwards, Benj (21 September 2022). ["Artist finds private medical record photos in popular AI training data set"](https://arstechnica.com/information-technology/2022/09/artist-finds-private-medical-record-photos-in-popular-ai-training-data-set/). *Ars Technica*.
9.  [↑](#cite_ref-Laion-400m-blog_9-0) Schuhmann, Christoph (8 August 2021). ["LAION-400-Million Open Dataset"](https://laion.ai/blog/laion-400-open-dataset/). *LAION blog*. Retrieved 26 September 2022.
10. [↑](#cite_ref-imagen-paper_10-0) Saharia, Chitwan; Chan, William; Saxena, Saurabh; Li, Lala; Whang, Jay; Denton, Emily; Kamyar Seyed Ghasemipour, Seyed; Karagol Ayan, Burcu; Sara Mahdavi, S.; Gontijo Lopes, Rapha; Salimans, Tim; Ho, Jonathan; J Fleet, David; Norouzi, Mohammad (23 May 2022). "Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2205.11487](https://arxiv.org/abs/2205.11487) \[[cs.CV](https://arxiv.org/archive/cs.CV)\].
11. [↑](#cite_ref-Laion-5b-blog_11-0) Beaumont, Romain (3 March 2022). ["LAION-5B: A New Era of Open Large-Scale Multi-Modal Datasets"](https://laion.ai/blog/laion-5b/). *LAION blog*.
12. [↑](#cite_ref-tc-sai_12-0) Wiggers, Kyle (12 August 2022). ["This startup is setting a DALL-E 2-like AI free, consequences be damned"](https://techcrunch.com/2022/08/12/a-startup-wants-to-democratize-the-tech-behind-dall-e-2-consequences-be-damned/). *TechCrunch*.
13. [↑](#cite_ref-13) Birhane, Abeba; Prabhu, Vinay Uday; Kahembwe, Emmanuel (2021). "Multimodal datasets: misogyny, pornography, and malignant stereotypes". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2110.01963](https://arxiv.org/abs/2110.01963). `{{`[`cite journal`](https://en.wikipedia.org/wiki/Template:Cite_journal "Template:Cite journal")`}}`: Cite journal requires `|``journal=` ([help](https://en.wikipedia.org/wiki/Help:CS1_errors#missing_periodical "Help:CS1 errors"))
14. [↑](#cite_ref-14) Birhane, Abeba; Prabhu, Vinay; Han, Sang; Boddeti, Vishnu Naresh; [Luccioni, Alexandra Sasha](https://en.wikipedia.org/wiki/Sasha_Luccioni "Sasha Luccioni") (2023-11-06), *Into the LAIONs Den: Investigating Hate in Multimodal Datasets*, [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2311.03449](https://arxiv.org/abs/2311.03449)
15. [↑](#cite_ref-15) Brunner, Katharina; Harlan, Elisa (2023-06-07). ["We Are All Raw Material for AI"](https://interaktiv.br.de/ki-trainingsdaten/en/index.html). *Bayerischer Rundfunk*.
16. [↑](#cite_ref-16) Cole, Samantha (20 December 2023). ["Largest Dataset Powering AI Images Removed After Discovery of Child Sexual Abuse Material"](https://www.404media.co/laion-datasets-removed-stanford-csam-child-abuse/). *404 Media*. Retrieved 22 December 2023.
17. [↑](#cite_ref-17) Belanger, Ashley (2024-08-30). ["Nonprofit scrubs illegal content from controversial AI training dataset"](https://arstechnica.com/tech-policy/2024/08/nonprofit-scrubs-illegal-content-from-controversial-ai-training-dataset/). *Ars Technica*. Retrieved 2024-08-31.
18. [↑](#cite_ref-18) [*Open-Assistant*](https://github.com/LAION-AI/Open-Assistant), LAION AI, 2023-03-09, retrieved 2023-03-09
19. [1](#cite_ref-:0_19-0) [2](#cite_ref-:0_19-1) Köpf, Andreas; Kilcher, Yannic; von Rütte, Dimitri; Anagnostidis, Sotiris; Tam, Zhi-Rui; Stevens, Keith; Barhoum, Abdullah; Duc, Nguyen Minh; Stanley, Oliver; Nagyfi, Richárd; ES, Shahul; Suri, Sameer; Glushkov, David; Dantuluri, Arnav; Maguire, Andrew (2023-04-14). "OpenAssistant Conversations -- Democratizing Large Language Model Alignment". [arXiv](https://en.wikipedia.org/wiki/ArXiv_(identifier) "ArXiv (identifier)"):[2304.07327](https://arxiv.org/abs/2304.07327) \[[cs.CL](https://arxiv.org/archive/cs.CL)\].
20. [↑](#cite_ref-20) ["Open Assistant: Explore the Possibilities of Open and Collaborative Chatbot Development"](https://www.kdnuggets.com/open-assistant-explore-the-possibilities-of-open-and-collaborative-chatbot-development.html). *KDnuggets*. Retrieved 2023-05-05.^(\[*[permanent dead link](https://en.wikipedia.org/wiki/Wikipedia:Link_rot "Wikipedia:Link rot")*\])

[TABLE]

![](https://en.wikipedia.org/wiki/Special:CentralAutoLogin/start?useformat=desktop&type=1x1&usesul3=1)

Retrieved from "[https://en.wikipedia.org/w/index.php?title=LAION&oldid=1380002634](https://en.wikipedia.org/w/index.php?title=LAION&oldid=1380002634)"
