<p align="center">
  <picture>
    <source media="(max-width: 600px)" srcset="./assets/header-mobile.svg" />
    <img src="./assets/header.svg" width="100%" alt="Kim Woonki — M.S. Student in AI at Oregon State University. Applied AI, language model privacy, and machine learning optimization." />
  </picture>
</p>

<p align="center">
  <a href="#selected-work">Selected work</a> &nbsp; · &nbsp;
  <a href="#optimization--computer-vision">Optimization &amp; vision</a> &nbsp; · &nbsp;
  <a href="#methods--tools">Methods &amp; tools</a> &nbsp; · &nbsp;
  <a href="https://github.com/woonki94?tab=repositories">All repositories ↗</a>
</p>

<p align="center">
  <picture>
    <source media="(max-width: 600px)" srcset="./assets/about-mobile.svg" />
    <img src="./assets/about.svg" width="100%" alt="Research and engineering. I build LLM-powered retrieval and recommendation systems and study how language models memorize training data. My projects span grant discovery, privacy-preserving training, numerical optimization, and computer vision." />
  </picture>
</p>

## Selected work

<a href="https://github.com/woonki94/grant-matching-agent">
  <picture>
    <source media="(max-width: 600px)" srcset="./assets/project-grant-mobile.svg" />
    <img src="./assets/project-grant.svg" width="100%" alt="01 — GrantFetcher. Research funding discovery with LLMs and semantic matching." />
  </picture>
</a>

A system for matching faculty research profiles with grant opportunities. The pipeline combines data ingestion, document extraction, keyword generation, embedding-based matching, reranking, and recommendation explanations.

- **System:** PostgreSQL + pgvector for structured data and embeddings, S3 for extracted content, and AWS Bedrock for model calls.
- **Application:** Flask APIs with streaming chat, collaborator discovery, and team recommendations; a separate React + TypeScript frontend.

**[Backend & setup guide ↗](https://github.com/woonki94/grant-matching-agent)** &nbsp; · &nbsp; [Frontend ↗](https://github.com/woonki94/grant-matching-agent-frontend)

<br />

<a href="https://github.com/woonki94/privacy-defense-gpt2">
  <picture>
    <source media="(max-width: 600px)" srcset="./assets/project-privacy-mobile.svg" />
    <img src="./assets/project-privacy.svg" width="100%" alt="02 — Data Extraction and Defense in LLMs. Memorization, extraction attacks, and differential privacy." />
  </picture>
</a>

Experiments with NanoGPT trained from scratch and GPT-2 Large fine-tuned with LoRA, comparing private and non-private training. The project includes DP-SGD, memory-efficient gradient clipping, extraction analysis, and generation-quality evaluation.

**[Code & experiment guide ↗](https://github.com/woonki94/privacy-defense-gpt2)** &nbsp; · &nbsp; [Final report ↗](https://github.com/woonki94/privacy-defense-gpt2/blob/master/report/Data_Extraction_and_Defense.pdf)

## Optimization & computer vision

| Project | Technical focus |
| :--- | :--- |
| **[SCCA ↗](https://github.com/woonki94/SCCA)** | Stochastic optimization for canonical correlation analysis using SVRG and shift-and-invert methods. |
| **[SMRS ↗](https://github.com/woonki94/SMRS)** | Sparse representative selection with ADMM; experiments on synthetic data and Fashion-MNIST. |
| **[Convex Optimization for SVMs ↗](https://github.com/woonki94/ConvexOptimization-SVM)** | Convex-hull classifiers with projected gradient descent, Nesterov acceleration, and ADMM. |
| **[Segment Style Transfer ↗](https://github.com/woonki94/Segment-Style-Transfer)** | Segmentation-guided neural style transfer for images and video. |

## Methods & tools

<p>
  <img src="./assets/icons/Python.svg" width="44" height="44" alt="Python" title="Python" /> &nbsp;
  <img src="./assets/icons/PyTorch.svg" width="44" height="44" alt="PyTorch" title="PyTorch" /> &nbsp;
  <img src="./assets/icons/AWS.svg" width="44" height="44" alt="AWS" title="AWS" /> &nbsp;
  <img src="./assets/icons/PostgreSQL.svg" width="44" height="44" alt="PostgreSQL" title="PostgreSQL" /> &nbsp;
  <img src="./assets/icons/Flask.svg" width="44" height="44" alt="Flask" title="Flask" /> &nbsp;
  <img src="./assets/icons/React.svg" width="44" height="44" alt="React" title="React" /> &nbsp;
  <img src="./assets/icons/TypeScript.svg" width="44" height="44" alt="TypeScript" title="TypeScript" />
</p>

- **Language models:** PyTorch, Hugging Face Transformers, LoRA, Opacus / DP-SGD.
- **Retrieval & recommendations:** embeddings, cross-encoder reranking, PostgreSQL, pgvector, AWS Bedrock.
- **Applications & infrastructure:** Python, Flask, SQLAlchemy, AWS S3, React, TypeScript.
- **Optimization:** ADMM, variance reduction, convex optimization, MATLAB.

<br />

<a href="https://github.com/woonki94?tab=repositories">
  <picture>
    <source media="(max-width: 600px)" srcset="./assets/footer-mobile.svg" />
    <img src="./assets/footer.svg" width="100%" alt="Research. Implement. Evaluate. — Explore all repositories." />
  </picture>
</a>

<details>
<summary>Design credits</summary>

Header and introduction adapted from [RyMe.md — Sleek](https://github.com/ryanpolasky/ryme.md). Technology icons from [Skill Icons](https://github.com/tandpfun/skill-icons). Both are used under the MIT license; notices are included in [vendor/ryme/LICENSE](./vendor/ryme/LICENSE) and [assets/icons/LICENSE](./assets/icons/LICENSE).

The profile uses repository-hosted SVG assets. See [design notes](./DESIGN.md) for regeneration and customization.

</details>
