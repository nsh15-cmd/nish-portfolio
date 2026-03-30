
# 💻 Nishia Pinlac | Developer Portfolio

> A fully interactive, IDE-themed personal portfolio built from the ground up to showcase my skills in front-end development, UI design, and modern web architecture.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

🌐 **Live Demo:** [Insert Your Vercel Link Here]

---

## ✨ Key Features

* **🖥️ IDE Interface:** The entire application is styled to mimic a professional code editor (like VS Code), complete with dynamic file tabs, line numbers, and an interactive file explorer sidebar.
* **🕹️ Interactive Navigation:** React state manages complex UI interactions, allowing users to open/close folders, switch between text files, and filter project grids dynamically without page reloads.
* **🎨 Custom Theming:** A carefully curated dark-mode color palette (`#0F172B`, `#011221`) with neon purple and orange syntax-highlighting accents.
* **📱 Fully Responsive:** Built mobile-first using CSS Flexbox and CSS Grid to ensure the developer environment looks flawless on phones, tablets, and massive desktop monitors.
* **📧 Live Contact Form:** Integrated with **EmailJS** to allow visitors to send emails directly to my inbox with real-time form validation and a sleek syntax-typing animation.

---

## ⚙️ Vite + React + TS Documentation

*The following is the standard documentation provided by the Vite boilerplate used to initialize this project.*

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

---
*Designed & Built by Nishia*
```
