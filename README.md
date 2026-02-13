# ✦ Artifex UI Generator

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-blue?logo=google)


Artifex is a deterministic, AI-powered UI generation tool that converts natural language prompts into production-ready React components. 

Unlike standard AI coding assistants that hallucinate random libraries or tangle business logic with state, Artifex enforces strict generation rules. It utilizes a predefined custom `ComponentLibrary` to output purely presentational, stateless JSX—perfect for dropping directly into frontend applications and wiring up to your backend APIs or distributed services.

---

## 🚀 Features

* **Deterministic Output:** Strictly bound to a local, predefined component library (Cards, Tables, Charts, Inputs, Modals, etc.).
* **Multi-Agent AI Pipeline:** * **Planner Agent:** Analyzes intent and constructs a structured JSON layout plan.
  * **Generator Agent:** Converts the plan into pure, stateless React JSX without hallucinating imports.
  * **Explainer/Validator Agent:** Reviews the code to prevent syntax errors and explains the layout decisions.
* **Live In-Browser Transpilation:** Uses Babel Standalone within a secure iframe to transpile and render the AI-generated JSX on the fly.
* **Smart History Tracking:** Navigate backward and forward through your generation history without losing your work.
* **One-Click Export:** Instantly download the generated `GeneratedUI.jsx` file to your local machine.
* **Sleek Dark Mode Interface:** A highly polished, immersive workspace featuring a custom animated snow background and responsive split-pane design.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (Pages Router)
* **Styling:** Tailwind CSS
* **AI Model:** Google Gemini 2.5 Flash (`@google/generative-ai`)
* **Live Preview:** Babel Standalone (`@babel/standalone`), React Iframe integration
* **Icons & Charts:** Lucide React, Recharts

---

## 🧠 Architecture: How it Works

1. **Prompt Ingestion:** The user submits a natural language request (e.g., "Build a server health dashboard").
2. **Agentic Workflow:** The request is sent to an internal API route where the `geminiAgent.js` orchestrates the Planner, Generator, and Explainer prompts.
3. **Strict Validation:** The prompt instructions explicitly forbid the use of `useState`, custom CSS, or external React hooks.
4. **Sandboxed Rendering:** The generated code string is passed via `postMessage` to an isolated iframe (`preview.jsx`). Babel transforms the raw JSX string into executable JavaScript, which is then dynamically rendered using `new Function()`.

---

## 💻 Local Setup & Installation

Follow these steps to run Artifex on your local machine.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/aadithyaa9/artifex-ui-generator.git
cd artifex-ui-generator
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure Environment Variables
You need a free Google Gemini API key to run the AI generation. Get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

Create a `.env.local` file in the root directory:
\`\`\`bash
touch .env.local
\`\`\`
Add your API key to the file:
\`\`\`env
GEMINI_API_KEY=your_actual_api_key_here
\`\`\`

### 4. Start the Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Usage Examples

Try pasting these prompts into the Artifex chat interface to see the deterministic rendering in action:

* *"Create a pricing page with 3 tiers (Basic, Pro, Enterprise) using cards and primary/secondary buttons."*
* *"Build a layout for a Service Health Monitor. I need a sidebar on the left. In the main area, put a line chart at the top showing response times, and a table below it listing the status of various microservices."*

---
