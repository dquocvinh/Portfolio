# Dương Quốc Vinh — Portfolio Knowledge Base

## Personal Information

- **Full Name**: Dương Quốc Vinh (Vinh Duong)
- **Nickname/Brand**: DQuocVinh / Dx9029
- **Role**: AI Engineering Senior Student (Sinh viên năm 4 / năm cuối)
- **Tagline**: "Building Intelligence from Data."
- **Bio**: Hi, I'm Vinh. An AI Engineering Student passionate about Machine Learning, Deep Learning, and solving real-world problems with code.
- **Quote**: "I don't just build models — I build solutions that people can actually use." — From research to production.
- **Location**: Ho Chi Minh City, Vietnam
- **Status**: Available for Internships (Hiện đang tìm kiếm cơ hội thực tập, chưa có chỗ thực tập)
- **Email**: duongquocvinh9029@gmail.com
- **GitHub**: https://github.com/vinh9029
- **LinkedIn**: https://www.linkedin.com/in/d%C6%B0%C6%A1ng-qu%E1%BB%91c-vinh-619b51412/
- **Facebook**: https://www.facebook.com/8129029sng
- **Zalo**: https://zalo.me/0559149285
- **Phone (Zalo)**: 0559149285

---

## Education (Trình độ học vấn & Bằng cấp)

- **Trình độ học vấn / Degree**: Bachelor of Science in Computer Science — AI Specialization (Cử nhân Khoa học Máy tính — Chuyên ngành Trí tuệ nhân tạo AI)
- **Trường đại học / University**: Ton Duc Thang University (TDTU) — Trường Đại học Tôn Đức Thắng, TP. Hồ Chí Minh
- **Năm học / Current Status**: Sinh viên năm 4 / năm cuối (4th-year / Senior AI Engineering Student)
- **Thời gian dự kiến tốt nghiệp / Expected Graduation**: 2027
- **Chuyên ngành / Major**: Computer Science (AI) — Khoa học Máy tính
- **Lĩnh vực trọng tâm / Focus Areas**: Deep Learning & MLOps
- **Các môn học cốt lõi / Core Coursework**: Deep Learning, Natural Language Processing (NLP), Computer Vision, Machine Learning, Data Structures & Algorithms, Database Systems

---

## About Me (Giới thiệu bản thân)

I'm an AI Engineering student at Ton Duc Thang University (TDTU), building end-to-end machine learning solutions — from model training to production deployment.

My work spans NLP, Computer Vision, and Generative AI, with hands-on experience fine-tuning transformer models (BERT, BLIP), building RAG pipelines with LangChain, and deploying ML applications on cloud platforms. I'm driven by turning research into real-world impact.

Key highlights:
- Major: Computer Science (AI) — Sinh viên năm 4 Đại học Tôn Đức Thắng (TDTU)
- Focus: Deep Learning & MLOps
- Location: Ho Chi Minh City
- Status: Open for Internships (Đang tìm chỗ thực tập, chưa có chỗ thực tập)

---

## Technical Skills

### Core AI & ML
- PyTorch
- TensorFlow
- Scikit-learn
- OpenCV
- Transformers (Hugging Face)
- Large Language Models (LLMs)

### Programming Languages
- Python
- TypeScript
- SQL

### AI Engineering
- Pandas
- NumPy
- LangChain
- LangGraph
- Vector Databases (Pinecone, ChromaDB)
- Neo4J (Graph Database)

### DevOps & Tools
- Docker
- Git
- Linux
- AWS (Amazon Web Services)
- CI/CD

---

## Projects

### 1. Mental Health Screening & AI Virtual Assistant (Capstone Project)
- **Role**: Lead AI Developer
- **Tech Stack**: Python, PyTorch, HuggingFace (BERT), LangChain, Pinecone, ChromaDB, FastAPI, React, Next.js, TailwindCSS
- **Link**: https://github.com/dquocvinh/mental-health-project
- **Type**: Capstone Project / AI + Full-Stack
- **Highlights**:
  - Engineered a 5-layer end-to-end clinical AI system integrating passive NLP text analytics with standardized psychometric questionnaires (PHQ-9 & GAD-7) to generate dynamic composite user risk profiles.
  - Fine-tuned a BERT-base transformer model on 103,000+ annotated text records to classify 7 emotional/psychological states, achieving 83.6%–88.8% accuracy with optimized Macro-F1 for high-risk detection.
  - Built a therapeutic RAG virtual assistant using LangChain and Pinecone vector store, grounded in evidence-based CBT manuals to eliminate LLM hallucinations.
  - Implemented the MIND-SAFE ethical framework with a deterministic crisis override safety gate to automatically route suicidal/high-risk queries to emergency hotlines.

### 2. Dx9029 AI Portfolio Assistant & RAG System
- **Role**: AI & Full-Stack Developer
- **Tech Stack**: React, TypeScript, Tailwind CSS, FastAPI, LangChain, FAISS, Gemini API, Vite, GitHub Pages, Render
- **Link**: https://github.com/dquocvinh/Portfolio
- **Type**: RAG Application / Portfolio Integration
- **Highlights**:
  - Built a bilingual (English & Vietnamese) RAG chatbot combining a FastAPI backend, local FAISS vector store, and Gemini Flash LLM to answer visitor inquiries about Vinh's portfolio.
  - Designed a 3-stage RAG pipeline: text chunking (500 tokens/chunk) → Google gemini-embedding-2 (3072-dim) → FAISS cosine similarity (Top-4) → contextual prompt augmentation → LLM generation.
  - Optimized end-to-end latency by ~90% (from ~42s to ~3–5s) by migrating from local CPU embeddings & Pinecone cloud to Google Embedding API + local FAISS.
  - Developed interactive React/TypeScript UI with typewriter streaming, 4 zero-cost predefined Q&A pairs, custom Markdown parsing, and automated CI/CD via GitHub Pages and Render.

### 3. Vi-VQA Animal – Multimodal Visual Question Answering
- **Role**: AI Developer / Researcher
- **Tech Stack**: Python, PyTorch, ResNet50, BiLSTM, Transformer Decoder, Co-Attention Fusion, BLIP, MarianMT, Scikit-Learn
- **Link**: https://github.com/523h0195-byte/Final-DeepLearning
- **Type**: Academic Research / Deep Learning
- **Highlights**:
  - Engineered a custom multimodal seq2seq VQA framework for Vietnamese natural language queries on 32,400 animal image samples.
  - Developed a Co-Attention Fusion module integrating visual features from ResNet50 CNN backbone with BiLSTM text embeddings.
  - Achieved top benchmark performance: 0.5778 Exact Match, 0.4098 BLEU, 0.6763 ROUGE-L, 0.9062 BERTScore — significantly outperforming baseline models and zero-shot BLIP.
  - Built an automated translation-augmented evaluation pipeline comparing fine-tuned BLIP with MarianMT for cross-lingual benchmarking.

### 4. Heart Disease Prediction
- **Tech Stack**: Scikit-learn, Random Forest, Streamlit, Data Analysis, Python
- **Link**: https://heartdisease10.streamlit.app/
- **Description**: Developed a clinical decision support tool comparing 5+ ML algorithms for heart disease risk prediction, deployed as an interactive Streamlit web app.

### 5. DX Community
- **Tech Stack**: React, Gemini API, AI Chatbot, Full-Stack, Netlify
- **Link**: https://dxcommunity.netlify.app
- **Description**: Full-stack blog community platform with Gemini-powered AI Q&A chatbot integrated into messaging feature.

### 6. The Old Flavour Coffee Shop
- **Tech Stack**: PHP, MySQL, E-commerce, Web Development
- **Link**: http://dquocvinh.great-site.net/index.php
- **Description**: Full-featured e-commerce website for a local coffee shop with product catalog, pricing, and image galleries.

---

## Certificates

### 1. Build & Deploy Your Web Dev Portfolio
- **Issuer**: Scrimba / Coursera
- **Date**: Jul 2026
- **Description**: Completed an online course on building and deploying professional web developer portfolios, authorized by Scrimba and offered through Coursera.
- **Verify**: https://coursera.org/verify/PXHIE2FEFD3U

### 2. Google Workspace with Gemini
- **Issuer**: Google / Coursera
- **Date**: 2026
- **Description**: Completed the Google Workspace with Gemini certification authorized by Google and offered through Coursera.
- **Verify**: https://coursera.org/verify/9K830VKNA1CE

### 3. Google AI
- **Issuer**: Google / Coursera
- **Date**: 2026
- **Description**: Completed the Google AI certification authorized by Google and offered through Coursera.
- **Verify**: https://coursera.org/verify/KDE2FM7V2GKC

### 4. Vibe Coding for Developers
- **Issuer**: Coursera
- **Date**: 2026
- **Description**: Completed Vibe Coding for Developers course offered through Coursera.
- **Verify**: https://coursera.org/verify/VUDXK6LWG5WL

---

## Experience

### B.Sc. Computer Science — AI Specialization (2023 – Present)
- **Organization**: Ton Duc Thang University (TDTU), Ho Chi Minh City
- **Description**: Currently a 4th-year student (sinh viên năm 4) specializing in Artificial Intelligence. Core coursework includes Deep Learning, Natural Language Processing, Computer Vision, Machine Learning, and Database Systems. Expected graduation: 2027. Actively seeking internship opportunities in AI/ML engineering. (Chưa có kinh nghiệm đi làm chính thức, đang tìm kiếm cơ hội thực tập.)

---

## Personal Interests & Hobbies (Sở thích cá nhân)

- **Cờ vua (Chess)**: Vinh thích chơi cờ vua — bộ môn rèn luyện tư duy chiến lược, phân tích tình huống và khả năng lập kế hoạch dài hạn.
- **Học tập liên tục (Continuous Learning)**: Vinh thường xuyên theo dõi và hoàn thành các khóa học online trên **Coursera** và **Udemy**, vừa để ôn tập kiến thức chuyên môn, vừa để tiếp thu những công nghệ, xu hướng mới trong lĩnh vực AI và kỹ thuật phần mềm.
- **Personal Development & Career Growth**: Vinh quan tâm đến các chủ đề phát triển bản thân như productivity, tư duy tăng trưởng (growth mindset), kỹ năng giao tiếp và xây dựng sự nghiệp trong ngành công nghệ. Vinh chủ động đọc sách, nghe podcast và học các khóa học liên quan đến phát triển nghề nghiệp.

---

## Frequently Asked Questions

### What is Vinh currently looking for? (Vinh đang tìm kiếm gì? Vinh đã có chỗ thực tập chưa?)
Vinh is currently looking for internship opportunities or collaboration on AI projects. He is open for hire and available for internships. (Vinh hiện đang tìm kiếm cơ hội thực tập và làm việc trong lĩnh vực AI. Vinh chưa có chỗ thực tập và đang sẵn sàng cho công việc thực tập.)

### What makes Vinh stand out?
Vinh has hands-on experience across the full ML pipeline — from research and model training to deployment. He has worked with cutting-edge technologies like BERT, BLIP, RAG, LangChain, and LLMs. He builds end-to-end solutions, not just models.

### What is Vinh's strongest area?
Vinh's strongest areas are NLP (Natural Language Processing), Deep Learning, and AI Engineering, with specific expertise in transformer models, RAG pipelines, and full-stack AI application development.

### Can Vinh work with LLMs and Generative AI?
Yes. Vinh has direct experience building RAG-powered chatbots using LangChain, integrating Gemini API, fine-tuning models on Hugging Face, and working with LLMs like Qwen 3B for real applications.

### What programming languages does Vinh know?
Python (primary), TypeScript, and SQL. He also has experience with PHP for web development.

### Where is Vinh located?
Ho Chi Minh City, Vietnam. He is open to remote work and relocation for the right opportunity.

### How to contact Vinh?
- Email: duongquocvinh9029@gmail.com
- GitHub: https://github.com/dquocvinh
- LinkedIn: https://www.linkedin.com/in/d%C6%B0%C6%A1ng-qu%E1%BB%91c-vinh-619b51412/
- Facebook: https://www.facebook.com/8129029sng
- Zalo: 0559149285

---

## Blog Posts (Bài viết trên Blog cá nhân)

Vinh viết blog cá nhân chia sẻ về hành trình học tập, du lịch, và trải nghiệm trong ngành tech. Blog có thể truy cập tại phần Blogs trên portfolio website.

### Blog 1: Hành Trình Chinh Phục Google AI Professional Certificate
- **Category**: Learning
- **Tags**: Google Certificate, AI, Coursera, Gemini, Prompt Engineering
- **Summary**: Chia sẻ hành trình học và hoàn thành chứng chỉ Google AI Professional Certificate trên Coursera – chuỗi 8 khóa học xây dựng AI fluency, từ nền tảng đến ứng dụng thực tế, tạo ra 20+ giải pháp AI. Vinh hoàn thành trong khoảng 8 tuần.
- **Key Takeaways**: AI fluency là tư duy giải quyết vấn đề bằng AI. Hands-on projects mới là phần giá trị nhất. Prompt Engineering là kỹ năng nền tảng bắt buộc.

### Blog 2: Lần Đầu Một Mình Đi Đà Lạt – Cô Đơn Hay Tự Do?
- **Category**: Travel
- **Tags**: Đà Lạt, Solo Travel, Du lịch, Backpacking, Việt Nam
- **Summary**: Chuyến solo travel đầu tiên – 4 ngày 3 đêm ở Đà Lạt. Không có plan cụ thể, không có bạn đồng hành. Vinh chia sẻ về quán cafe ẩn mình, cung đường chinh phục một mình, và bài học về sự tự do.
- **Key Takeaways**: Solo travel giúp lắng nghe bản thân tốt hơn. Đi không kế hoạch mang lại trải nghiệm bất ngờ.

### Blog 3: Lần Đầu Contribute vào Open Source – Hồi Hộp Hơn Mình Nghĩ
- **Category**: Experience
- **Tags**: Open Source, GitHub, Python, Developer Journey, Community
- **Summary**: Câu chuyện lần đầu submit Pull Request vào dự án open source. Từ tìm issue phù hợp (good-first-issue), fork repo, fix bug, viết test, đến cảm giác khi PR được merge.
- **Key Takeaways**: Không cần là chuyên gia mới đóng góp Open Source. Bắt đầu từ bug nhỏ hoặc documentation.

### Blog 4: Hội An Cuối Tuần – Phố Cổ Dưới Ánh Đèn Lồng
- **Category**: Travel
- **Tags**: Hội An, Phố Cổ, Du lịch, Đèn Lồng, Việt Nam, Friends Trip
- **Summary**: 48 giờ ở Hội An với bạn bè sau mùa thi. Cảm xúc lần đầu thấy đèn lồng Hội An lung linh trong đêm, thả đèn hoa đăng trên sông Hoài.
- **Key Takeaways**: Budget ~500k-700k/ngày là thoải mái. Vào phố cổ buổi sáng sớm trước 8h để tránh đông.
