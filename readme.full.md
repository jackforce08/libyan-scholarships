# 🇱🇾 Libyan Scholarships Portal

**Libyan Scholarships Portal** is a public, open‑source web platform that helps Libyan students easily discover local and international scholarship opportunities in one place.

🔗 **Live Website:** [https://jackforce08.github.io/libyan-scholarships/](https://jackforce08.github.io/libyan-scholarships/)

---

## 🎯 Purpose & Vision (Academic Perspective)

The **Libyan Scholarships Portal** was designed as a socially driven technical project that applies modern software engineering to a real access-to-education problem.

Rather than focusing solely on presentation, the project emphasizes **data reliability, scalability, multilingual accessibility, and maintainability**. It demonstrates how front-end systems can be engineered to support real users, real constraints (such as GitHub Pages routing), and live data sources, while remaining performant and secure.

This project reflects my interest in using computer science not only to build products, but to design **robust systems that lower barriers and expand opportunity**.

---

## 🚀 Features

* 🔍 Filter scholarships by **field of study**, **country**, and **deadline**
* 🌓 **Dark / Light mode** toggle
* 🌐 **Arabic / English** language switch (bilingual support)
* 📡 **Live data integration** via Google Sheets / Airtable
* ⚡ Fast, responsive UI built with modern React tooling
* 📱 Mobile-friendly and accessible design

All scholarship data is managed **externally via private spreadsheets**, allowing safe updates without exposing the data source publicly.

---

## 🛠️ Tech Stack

This project is built using a **modern React + TypeScript stack**, with most of the codebase written in TypeScript.

* **TypeScript (~97%)** – Main language for safety, scalability, and maintainability
* **React** – Component-based UI development
* **Vite** – Fast development server and build tool
* **React Router (HashRouter)** – Client-side routing compatible with GitHub Pages
* **Tailwind CSS** – Utility-first styling
* **shadcn/ui** – Accessible, reusable UI components
* **PostCSS** – CSS processing
* **ESLint** – Code quality and linting
* **GitHub Actions** – Automated deployment workflow
* **GitHub Pages** – Hosting and deployment

This stack reflects **real-world front-end engineering practices**.

---

## 📂 Project Structure

```
libyan-scholarships/
│
├── .github/workflows/     # GitHub Actions (auto-deploy)
│   └── deploy.yml
│
├── public/                # Static assets
├── scripts/               # Helper / build scripts
├── src/                   # Main application source
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities & helpers
│   └── main.tsx           # App entry point
│
├── index.html             # HTML entry
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
├── postcss.config.js      # PostCSS config
├── tsconfig*.json         # TypeScript configs
├── eslint.config.js       # ESLint rules
├── package.json           # Project metadata & scripts
├── bun.lockb / package-lock.json
└── README.md              # Documentation
```

libyan-scholarships/
│
├── index.html        # Main website page
├── style.css         # Global styles
├── script.js         # JavaScript logic
├── data/             # Scholarship data files
├── assets/           # Icons, images, and media
└── README.md         # Project documentation

```

---

## 🌐 Live Deployment

The project is deployed using **GitHub Pages** and is accessible at:

👉 https://jackforce08.github.io/libyan-scholarships/

Any updates pushed to the `main` branch are automatically reflected on the live site.

---

## 🧠 Learning Outcomes

Through this project, I developed skills aligned with **university-level computer science and professional software engineering**:

- Architecting a **React + TypeScript** application with clear separation of concerns
- Designing bilingual interfaces with shared state and consistent UX
- Implementing client-side routing under static-hosting constraints
- Integrating live external data while keeping sources private and secure
- Applying Tailwind and component systems for scalable UI design
- Using AI-assisted tooling responsibly through **prompt engineering and verification**

This project strengthened both my **technical depth** and my ability to reason about system design choices.

---

## 🔮 Project Status

This project is **actively developed** and already includes its core planned functionality.

Future updates will focus on:

- Performance and UX improvements
- Better accessibility (a11y)
- Codebase refactoring and maintainability
- UI/UX polish based on user feedback

---

## 🤝 Contributing

At this stage, scholarship data is **not open for public submission**.

This decision was made to:

- Prevent spam or malicious edits
- Protect the integrity of the data
- Ensure consistency and accuracy

The data source is managed privately via Google Sheets.

However, contributions related to **code quality, UI/UX, performance, or bug fixes** are welcome via pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project with proper attribution.

---

## 👤 Author

**Jack Force**  
Aspiring Computer Science student & front-end developer

### 🧩 Development Note (AI-Assisted Engineering)

This project was developed using **Cursor (AI-powered code editor)** as a learning and productivity tool.

Beyond implementation, I intentionally developed **prompt engineering skills**, learning how to:

- Formulate precise technical prompts
- Iteratively refine AI output
- Debug non-trivial issues by providing structured context
- Critically evaluate and correct AI-generated code

All architectural decisions, feature implementations, and refinements were **understood, verified, and controlled by me**. This reflects how modern engineers responsibly integrate AI into real development workflows.

- GitHub: https://github.com/jackforce08

---

## 🌍 Why This Project Matters for Libya

For many Libyan students, access to scholarship information is fragmented, outdated, or difficult to navigate—particularly for those without strong English proficiency.

This project addresses that gap by:

- Centralizing opportunities in one accessible platform
- Supporting **Arabic and English** equally
- Reducing reliance on informal or unreliable sources
- Promoting merit-based access to international education

By combining technical rigor with local context, the project demonstrates how software can be used as a **tool for educational equity and social impact** in Libya.

---
```
