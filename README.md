# ✦ Artifex UI Generator

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-blue?logo=google)

Artifex is a deterministic, AI-powered UI generation tool that converts natural language prompts into production-ready React components. 

Unlike standard AI coding assistants that hallucinate random libraries or tangle business logic with state, Artifex enforces strict generation rules. It utilizes a predefined custom `ComponentLibrary` to output purely presentational, stateless JSX—perfect for dropping directly into frontend applications and wiring up to your backend APIs or distributed services.

---

## 🚀 Features

* **Deterministic Output:** Strictly bound to a local, predefined component library (Cards, Tables, Charts, Inputs, Modals, etc.).
* **Multi-Agent AI Pipeline:** 
  * **Planner Agent:** Analyzes intent and constructs a structured JSON layout plan.
  * **Generator Agent:** Converts the plan into pure, stateless React JSX without hallucinating imports.
  * **Explainer/Validator Agent:** Reviews the code to prevent syntax errors and explains the layout decisions.
* **Live In-Browser Transpilation:** Uses a secure iframe to transpile and render the AI-generated JSX on the fly.
* **Smart History Tracking:** Navigate backward and forward through your generation history without losing your work.
* **One-Click Export:** Instantly download the generated `GeneratedUI.jsx` file to your local machine.
* **Sleek Dark Mode Interface:** A highly polished, immersive workspace featuring elegant typography and responsive split-pane design.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (Pages Router)
* **Styling:** Tailwind CSS + Custom CSS
* **Typography:** Google Fonts (Fraunces, Inter)
* **AI Model:** Google Gemini 1.5 Flash (`@google/generative-ai`)
* **Live Preview:** React Iframe integration with postMessage
* **Icons & Charts:** Lucide React, Recharts

---

## 🧠 Architecture: How it Works

1. **Prompt Ingestion:** The user submits a natural language request (e.g., "Build a server health dashboard").
2. **Agentic Workflow:** The request is sent to an internal API route where the `geminiAgent.js` orchestrates the Planner, Generator, and Explainer prompts.
3. **Strict Validation:** The prompt instructions explicitly forbid the use of `useState`, custom CSS, or external React hooks.
4. **Sandboxed Rendering:** The generated code string is passed via `postMessage` to an isolated iframe (`preview.jsx`) for secure execution.

---

## 💻 Installation & Setup

Follow these step-by-step instructions to get Artifex running on your local machine.

### Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A **Google Gemini API key** (free tier available)

Check your Node.js version:
```bash
node --version
# Should output v18.0.0 or higher
```

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/aadithyaa9/artifex-ui-generator.git
cd artifex-ui-generator
```

**Alternative:** If you downloaded a ZIP file, extract it and navigate to the folder:
```bash
unzip artifex-ui-generator.zip
cd artifex-ui-generator
```

---

### Step 2: Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- Tailwind CSS
- Google Generative AI SDK
- Recharts
- Lucide React
- All other dependencies

**Wait time:** Typically 1-2 minutes depending on your internet speed.

**Expected output:**
```
added 312 packages in 1m
```

---

### Step 3: Get Your Free Gemini API Key

Artifex uses Google's Gemini AI to power the generation. You need an API key to use the AI features.

#### Option A: Use Demo Mode (No API Key Required)

If you want to test the interface immediately without AI:

```bash
# Skip to Step 5 and run the app
# Demo mode will work with pre-built templates
npm run dev
```

#### Option B: Get Full AI Power (Recommended)

1. **Visit Google AI Studio:**
   - Go to: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. **Sign in with Google:**
   - Use any Google account (Gmail, etc.)

3. **Create API Key:**
   - Click **"Create API Key"** button
   - Select **"Create API key in new project"** (or use existing project)
   - Copy the generated key (starts with `AIza...`)

4. **Important:** Keep this key secure! Don't share it publicly or commit it to GitHub.

---

### Step 4: Configure Environment Variables

Now add your API key to the project:

#### On macOS/Linux:

```bash
# Create .env.local file
touch .env.local

# Open in text editor
nano .env.local
```

Add this line (replace with your actual key):
```env
GEMINI_API_KEY=AIzaSyD-your-actual-key-here
```

**Save and exit:**
- Press `Ctrl + O` to save
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

**OR** create it in one command:
```bash
echo "GEMINI_API_KEY=AIzaSyD-your-actual-key-here" > .env.local
```

#### On Windows (PowerShell):

```powershell
# Create .env.local file
New-Item .env.local -ItemType File

# Add your API key
Add-Content .env.local "GEMINI_API_KEY=AIzaSyD-your-actual-key-here"
```

#### On Windows (Command Prompt):

```cmd
echo GEMINI_API_KEY=AIzaSyD-your-actual-key-here > .env.local
```

#### Using VS Code or any Text Editor:

1. Create a new file named `.env.local` in the root folder
2. Add this line:
   ```
   GEMINI_API_KEY=AIzaSyD-your-actual-key-here
   ```
3. Save the file

**Verify your file was created:**
```bash
# On Mac/Linux
ls -la | grep .env.local

# On Windows
dir .env.local
```

You should see `.env.local` listed.

---

### Step 5: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
- wait  compiling...
- event compiled client and server successfully in 2.3s
```

**Leave this terminal window open!** This is your development server.

---

### Step 6: Open in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see:
- **Beautiful landing page** with elegant typography
- **"Try Demo"** button to access the generator
- Dark theme with Fraunces serif fonts

---

## 🎯 Verifying Your Setup

### Check if API Key is Working:

1. Click **"Try Demo"** or **"Launch Generator"** on the landing page
2. You'll be taken to `/app` (the generator interface)
3. Type a prompt in the chat input: `"Create a login form"`
4. Press **Send** or hit **Enter**

**If working correctly:**
- ✅ You'll see a "thinking" animation (3 bouncing dots)
- ✅ AI generates code in 3-8 seconds
- ✅ Code appears in the middle panel (editor)
- ✅ Explanation appears in the left panel (chat)
- ✅ Preview renders on the right panel
- ✅ NO "Demo Mode" badge in header

**If in Demo Mode:**
- ⚠️ You'll see yellow **"Demo Mode"** badge in header
- ⚠️ Limited to pre-built templates only
- ⚠️ Can only handle 5-6 specific prompts
- 💡 Add your API key to get full functionality

---

## 🔧 Troubleshooting

### Problem: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
```

**Alternative:** Use yarn instead:
```bash
npm install -g yarn
yarn install
yarn dev
```

---

### Problem: Port 3000 already in use

**Error message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Option 1: Use a different port
npm run dev -- -p 3001

# Then open http://localhost:3001
```

**Option 2: Kill process on port 3000:**
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

---

### Problem: API key not working (Still shows "Demo Mode")

**Check these in order:**

1. **Key format:** Should start with `AIza`
   ```bash
   # View your .env.local file
   cat .env.local  # Mac/Linux
   type .env.local  # Windows
   ```

2. **File location:** `.env.local` must be in root folder
   ```
   artifex-ui-generator/
   ├── .env.local          ← HERE (same level as package.json)
   ├── package.json
   └── src/
   ```

3. **No spaces:** Check for spaces around `=`
   ```env
   # ❌ WRONG
   GEMINI_API_KEY = AIza...
   GEMINI_API_KEY= AIza...
   
   # ✅ CORRECT
   GEMINI_API_KEY=AIza...
   ```

4. **Restart server:** 
   - Stop the server: Press `Ctrl + C` in terminal
   - Start again: `npm run dev`

5. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

6. **Test API key directly:**
   - Visit: https://aistudio.google.com/
   - Try generating something there with your key
   - If it works there, the key is valid

---

### Problem: Black screen or errors in preview

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

**If preview panel shows errors:**
- Check browser console (F12 → Console tab)
- Look for specific error messages
- Common issue: Syntax error in generated code

---

### Problem: TypeScript errors

**Solution:**
The project uses JavaScript. If you see TypeScript errors:
```bash
# Reinstall dependencies
npm install

# Or skip TypeScript checking
npm run dev
```

---

### Problem: Module not found errors

**Error like:** `Module not found: Can't resolve '@google/generative-ai'`

**Solution:**
```bash
# Install specific package
npm install @google/generative-ai

# Or reinstall everything
rm -rf node_modules package-lock.json
npm install
```

---

### Problem: Styles not loading (no dark theme)

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild styles
npm run dev
```

---

## 💡 Usage Examples

Once running, try these prompts in the chat interface:

### Basic Examples:
```
"Create a login form with email and password"
```
```
"Build a contact form with name, email, and message"
```
```
"Make a pricing table with 3 tiers"
```

### Intermediate Examples:
```
"Design a dashboard with 3 metric cards showing users, revenue, and orders"
```
```
"Create a team member grid with 6 cards, each showing a name and role"
```
```
"Build a feature comparison table with 4 products"
```

### Advanced Examples:
```
"Create a pricing page with 3 tiers (Basic, Pro, Enterprise) using cards and buttons. Basic should be $9/month, Pro $29/month, Enterprise $99/month"
```
```
"Build a layout for a Service Health Monitor. Sidebar on the left with navigation. Main area: line chart at the top showing response times over 6 months, and a table below listing microservice statuses (name, status, uptime)"
```
```
"Design a complete app layout with navbar at top (logo and menu), sidebar on left (5 nav items), and main content area with a dashboard showing 4 metric cards and 2 charts"
```

---

## 📂 Project Structure

```
artifex-ui-generator/
├── src/
│   ├── pages/
│   │   ├── index.jsx              # Landing page (Cartesia-inspired)
│   │   ├── app.jsx                # Main generator interface
│   │   ├── preview.jsx            # Preview renderer (iframe)
│   │   ├── _app.jsx               # Next.js app wrapper
│   │   └── api/
│   │       └── generate.js        # API endpoint for AI generation
│   ├── lib/
│   │   ├── geminiAgent.js         # Gemini AI integration
│   │   ├── mockAgent.js           # Demo mode templates
│   │   └── prompts.js             # AI prompt templates
│   ├── components/
│   │   └── ComponentLibrary.jsx   # 8 fixed UI components
│   └── styles/
│       └── globals.css            # Custom typography & theme
├── public/                        # Static assets
├── .env.local                     # Your API key (YOU CREATE THIS!)
├── .env.example                   # Template for .env.local
├── .gitignore                     # Git ignore rules
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended - Free Tier)

**Prerequisites:** Sign up at [vercel.com](https://vercel.com)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate

3. **Deploy (Development):**
   ```bash
   vercel
   ```
   - Select or create project
   - Follow prompts

4. **Add Environment Variable:**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   - Paste your API key when prompted
   - Select **"Production"** environment

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

Your app will be live at: `https://your-project.vercel.app`

---

### Deploy to Netlify

1. **Build the project locally first:**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login:**
   ```bash
   netlify login
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

5. **Set environment variable:**
   - Go to: https://app.netlify.com/
   - Select your site
   - Go to Site settings → Environment variables
   - Add `GEMINI_API_KEY` with your key

---

### Deploy Using GitHub (No CLI needed)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/artifex.git
   git push -u origin main
   ```

2. **Connect to Vercel/Netlify:**
   - Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add `GEMINI_API_KEY` environment variable
   - Deploy!

---

## 🎨 Design Philosophy

Inspired by **Cartesia.ai**:
- Sophisticated serif typography (Fraunces)
- Dark, refined color palette
- Subtle gradient accents
- Clean, minimal layouts
- Professional polish
- Elegant animations

---

## 📝 What Gets Generated

Artifex generates **pure, stateless layouts**:

### ✅ What You Get:
- Clean JSX structure
- Proper component composition
- Styled with Tailwind utilities
- No business logic
- No state management
- Production-ready markup
- Downloadable `.jsx` files

### ❌ What You Don't Get:
- `useState` or React hooks
- Event handlers (`onClick`, `onChange`)
- API calls or data fetching
- Form validation logic
- Complex state management

**Example Output:**
```jsx
import React from 'react';
import { Button, Card, Input } from './ComponentLibrary';

export default function GeneratedUI() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card title="Login" className="w-96">
        <div className="flex flex-col gap-4">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button variant="primary">Login</Button>
        </div>
      </Card>
    </div>
  );
}
```

**Notice:** No `useState`, no `onClick` handlers - just pure visual structure!

---

## 🎯 Common Workflows

### Workflow 1: Quick Prototype
1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Click "Try Demo"
4. Type prompt: "Create a dashboard"
5. Download code
6. Copy to your project

### Workflow 2: Iterative Design
1. Generate initial layout
2. Request modification: "Add a sidebar"
3. Review changes in preview
4. Navigate history with ◀️ ▶️ buttons
5. Download final version

### Workflow 3: Team Collaboration
1. Deploy to Vercel
2. Share URL with team
3. Everyone can generate layouts
4. Download and integrate code
5. Wire up backend logic separately

---

## 📚 Additional Resources

- **Google Gemini API Docs:** https://ai.google.dev/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Recharts Docs:** https://recharts.org/

---

## 🤝 Contributing

This project was built as a technical assessment for Ryze AI. Feel free to fork and extend!

**To contribute:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Built for Ryze AI technical assessment.

---

## 🙏 Acknowledgments

- **Design Inspiration:** Cartesia.ai
- **AI Provider:** Google Gemini
- **Framework:** Next.js
- **Typography:** Google Fonts (Fraunces, Inter)
- **Icons:** Lucide React
- **Charts:** Recharts

---

## 📞 Support & Contact

If you encounter issues not covered in Troubleshooting:

1. **Check all steps** in this README again
2. **Verify prerequisites** (Node.js 18+, npm)
3. **Check browser console** for specific errors
4. **Try Demo Mode** first to verify app works

**Debug Checklist:**
- [ ] Node.js 18+ installed
- [ ] `npm install` completed successfully
- [ ] `.env.local` file exists in root folder
- [ ] API key starts with `AIza`
- [ ] Server running on port 3000
- [ ] Browser can access localhost:3000
- [ ] No errors in terminal
- [ ] No errors in browser console (F12)

---

**Built with attention to detail and a focus on pure, deterministic layouts.** 🎨

**Ready to generate beautiful UIs? Run `npm run dev` and visit http://localhost:3000!** ✨
