# Kim Woonki

**Applied AI · Language Model Privacy · Machine Learning Optimization**

M.S. Student in Artificial Intelligence at Oregon State University.

I build LLM-powered retrieval and recommendation systems and study how language models memorize training data. My projects span grant discovery, privacy-preserving training, numerical optimization, and computer vision.

[Selected work](#selected-work) · [Methods & tools](#methods--tools) · [All repositories](https://github.com/woonki94?tab=repositories)

## Selected work

### GrantFetcher
**Research funding discovery with LLMs and semantic matching**

A system for matching faculty research profiles with grant opportunities. The pipeline combines data ingestion, document extraction, keyword generation, embedding-based matching, reranking, and recommendation explanations.

- **System:** PostgreSQL + pgvector for structured data and embeddings, S3 for extracted content, and AWS Bedrock for model calls.
- **Application:** Flask APIs with streaming chat, collaborator discovery, and team recommendations; a separate React + TypeScript frontend.

[Backend & setup guide](https://github.com/woonki94/grant-matching-agent) · [Frontend](https://github.com/woonki94/grant-matching-agent-frontend)

### Data Extraction & Defense in LLMs
**Memorization, extraction attacks, and differential privacy**

Experiments with NanoGPT trained from scratch and GPT-2 Large fine-tuned with LoRA, comparing private and non-private training. The project includes DP-SGD, memory-efficient gradient clipping, extraction analysis, and generation-quality evaluation.

[Code & experiment guide](https://github.com/woonki94/privacy-defense-gpt2) · [Final report](https://github.com/woonki94/privacy-defense-gpt2/blob/master/report/Data_Extraction_and_Defense.pdf)

### Optimization & computer vision

| Project | Technical focus |
| :--- | :--- |
| [SCCA](https://github.com/woonki94/SCCA) | Stochastic optimization for canonical correlation analysis using SVRG and shift-and-invert methods. |
| [SMRS](https://github.com/woonki94/SMRS) | Sparse representative selection with ADMM; experiments on synthetic data and Fashion-MNIST. |
| [Convex Optimization for SVMs](https://github.com/woonki94/ConvexOptimization-SVM) | Convex-hull classifiers with projected gradient descent, Nesterov acceleration, and ADMM. |
| [Segment Style Transfer](https://github.com/woonki94/Segment-Style-Transfer) | Segmentation-guided neural style transfer for images and video. |

## Methods & tools

- **Language models:** PyTorch, Hugging Face Transformers, LoRA, Opacus / DP-SGD.
- **Retrieval & recommendations:** embeddings, cross-encoder reranking, PostgreSQL, pgvector, AWS Bedrock.
- **Applications & infrastructure:** Python, Flask, SQLAlchemy, AWS S3, React, TypeScript.
- **Optimization:** ADMM, variance reduction, convex optimization, MATLAB.
