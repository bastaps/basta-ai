# 🚀 Basta AI — Free AI-Powered App Development Workflow

## 🤖 AGENT INSTRUCTIONS — READ THIS FIRST (For Qwen Code Agent)

> This README is a **code generation blueprint**. You are an autonomous code agent (Qwen).
> Your mission: generate **every single file** listed in the File Tree below, with complete, working code.
> **Rules:**
> - Do NOT skip any file.
> - Do NOT ask for clarification — infer everything from this document.
> - Do NOT use placeholder comments like `// TODO` — write real, functional code.
> - Every file must be production-ready and work after `npm install` + `.env` config.
> - Backend: Node.js + Express. Frontend: HTML + CSS + Vanilla JS (single-page, no framework).
> - The `.env` file is NEVER generated — only `.env.example` with placeholder values.

---

## 📋 Project Overview

| Property       | Value                                                                 |
|----------------|-----------------------------------------------------------------------|
| **App Name**   | Basta AI                                                              |
| **Type**       | AI-Powered App Development Workflow Assistant (100% free stack)       |
| **Owner**      | bastaps (GitHub)                                                      |
| **Backend**    | Node.js + Express                                                     |
| **AI Engine**  | Mistral AI API (`mistral-large-latest`) — called server-side only     |
| **Local Server** | Laragon 6.0 on Windows — install path: `E:\laragontest\www\basta-ai` |
| **Design**     | Colorful, dynamic, vibrant — retro-futuristic neon aesthetic          |
| **Purpose**    | Guide developers through building AI apps using a free distributed workflow: Claude (architect) → Qwen (code generator) → Mistral API (AI brain) → Laragon (local server) |

---

## 🗂️ File Tree — Generate ALL these files

```
/basta-ai
├── .env.example
├── .gitignore
├── package.json
├── server.js
├── /routes
│   └── mistral.js
├── /utils
│   └── mistralClient.js
├── /public
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

---

## ⚙️ File Specifications — Generate Each File Exactly as Described

---

### 📄 `.gitignore`
```
.env
node_modules/
*.log
.DS_Store
```

---

### 📄 `.env.example`
```
MISTRAL_API_KEY=your_mistral_api_key_here
MISTRAL_MODEL=mistral-large-latest
PORT=3000
```

---

### 📄 `package.json`
Generate a valid package.json with:
- `name`: "basta-ai"
- `version`: "1.0.0"
- `description`: "Basta AI - Free AI-Powered App Development Workflow"
- `main`: "server.js"
- `scripts`: `{ "start": "node server.js", "dev": "nodemon server.js" }`
- `dependencies`: `express`, `axios`, `dotenv`, `cors`
- `devDependencies`: `nodemon`

---

### 📄 `server.js`
Generate a complete Express server that:
1. Loads `.env` via `require('dotenv').config()`
2. Uses `cors()` middleware
3. Parses JSON body with `express.json()`
4. Serves static files from `/public`
5. Mounts the Mistral router at `/api`
6. Listens on `process.env.PORT || 3000`
7. Logs `🚀 Basta AI running on http://localhost:${PORT}` on start

---

### 📄 `utils/mistralClient.js`
Generate a module that exports an async function `callMistral(messages, options)`:
- Makes a POST request to `https://api.mistral.ai/v1/chat/completions`
- Uses `axios` with headers: `Authorization: Bearer ${process.env.MISTRAL_API_KEY}` and `Content-Type: application/json`
- Body: `{ model: process.env.MISTRAL_MODEL || 'mistral-large-latest', messages, temperature: options.temperature || 0.7, max_tokens: options.max_tokens || 2000 }`
- Returns `response.data.choices[0].message.content`
- Wraps the call in try/catch and throws a descriptive error on failure

---

### 📄 `routes/mistral.js`
Generate an Express Router with two endpoints:

**POST `/api/chat`**
- Receives `{ message: string, history: array, mode: string }` from request body
- Builds system prompt based on `mode`:
  - `"architect"` → system prompt: *"You are Basta AI, an expert software architect. Help the user design app structures, file trees, and README blueprints for AI-powered applications. Be precise, structured, and always output markdown."*
  - `"coder"` → system prompt: *"You are Basta AI, an expert full-stack developer. Generate clean, complete, production-ready code based on the user's specifications. Always explain what each file does."*
  - `"workflow"` → system prompt: *"You are Basta AI, a workflow consultant specializing in free AI development stacks. Guide the user through using Claude, Qwen, Mistral API, GitHub, and Laragon to build apps at zero cost."*
  - default → system prompt: *"You are Basta AI, a helpful AI development assistant."*
- Prepends system message to history
- Appends new user message
- Calls `callMistral(messages)`
- Returns `{ reply: string, role: 'assistant' }`
- On error: returns HTTP 500 with `{ error: 'Mistral API error', detail: error.message }`

**GET `/api/health`**
- Returns `{ status: 'ok', app: 'Basta AI', version: '1.0.0' }`

---

### 📄 `public/index.html`
Generate a complete single-page HTML file with:

**Structure:**
- `<head>`: charset UTF-8, viewport, title "Basta AI", link to `style.css`
- `<body>` layout:
  - `#sidebar`: left panel with app logo ("⚡ BASTA AI"), tagline ("Free AI Dev Workflow"), and 3 mode buttons: `[🏗️ Architect]` `[💻 Coder]` `[🔄 Workflow]`
  - `#main`: top header bar showing current mode name, `#chat-window` (scrollable message list), `#input-area` with a textarea and send button
  - `#status-bar`: bottom bar showing "Powered by Mistral AI · Built with Claude + Qwen · Running on Laragon"
- Script tag linking `app.js`

---

### 📄 `public/style.css`
Generate a complete CSS file with this exact aesthetic:

**Theme: Retro-futuristic neon on deep dark background**
- CSS Variables:
  ```css
  --bg-deep: #0a0a0f;
  --bg-panel: #12121a;
  --bg-card: #1a1a28;
  --neon-cyan: #00ffff;
  --neon-pink: #ff00aa;
  --neon-yellow: #ffee00;
  --neon-green: #00ff88;
  --text-primary: #e8e8ff;
  --text-muted: #7a7a9a;
  --border: #2a2a4a;
  --radius: 8px;
  ```
- Layout: CSS Grid, sidebar 260px fixed left, main fills remaining space, full viewport height
- Sidebar: dark panel with neon cyan logo text (font-family: 'Courier New', monospace), glowing text-shadow on logo
- Mode buttons: outlined style, each with its own neon color (cyan/pink/yellow), active state has filled neon background + glow box-shadow, hover animates with scale(1.03)
- Chat window: scrollable, messages styled as bubbles — user messages aligned right with neon-pink background, assistant messages aligned left with bg-card background and cyan left border
- Input area: dark textarea with neon cyan border on focus, send button with gradient from neon-cyan to neon-pink, glowing on hover
- Typing indicator: 3 animated dots bouncing with CSS keyframes
- Status bar: small text, neon green color, centered
- Scrollbar: custom thin scrollbar with neon cyan thumb
- Animations: `@keyframes glow` (pulsing box-shadow), `@keyframes fadeInUp` (messages appear), `@keyframes bounce` (typing dots)
- Google Fonts import: `Orbitron` for headings, `Share Tech Mono` for body

---

### 📄 `public/app.js`
Generate a complete Vanilla JS file with:

**State:**
- `currentMode`: string, default `"workflow"`
- `conversationHistory`: array of `{ role, content }` objects
- `isLoading`: boolean

**Functions:**

`setMode(mode)`:
- Updates `currentMode`
- Updates header to show mode name
- Clears conversation history
- Updates active button styling
- Adds a system welcome message in the chat for each mode:
  - architect: "🏗️ **Architect Mode** — Tell me what app you want to build. I'll design the structure, file tree, and README blueprint for Qwen."
  - coder: "💻 **Coder Mode** — Paste your README or describe what to code. I'll generate clean, complete code files."
  - workflow: "🔄 **Workflow Mode** — Ask me anything about the free AI dev stack: Claude → Qwen → Mistral → GitHub → Laragon."

`sendMessage()`:
- Reads textarea value, trims, returns if empty or loading
- Appends user message to `#chat-window` with `fadeInUp` animation
- Adds to `conversationHistory`
- Shows typing indicator
- Fetches `POST /api/chat` with `{ message, history: conversationHistory, mode: currentMode }`
- On success: removes typing indicator, appends assistant reply, adds to history
- On error: shows error message in chat
- Scrolls chat to bottom after each message
- Clears textarea

`appendMessage(role, content)`:
- Creates message bubble div with correct class
- Parses basic markdown: `**bold**` → `<strong>`, ` ```code``` ` → `<pre><code>`, newlines → `<br>`
- Appends with animation

`showTypingIndicator()` / `removeTypingIndicator()`:
- Shows/hides a div with 3 animated dots

**Event Listeners:**
- Send button click → `sendMessage()`
- Textarea keydown: `Enter` (without Shift) → `sendMessage()`
- Mode buttons: each calls `setMode(mode)`

**Init:**
- On `DOMContentLoaded`: call `setMode('workflow')` to show welcome message

---

## 🚀 Local Deployment on Laragon

### Step 1 — Clone the repo
```bash
# Open Laragon terminal
cd E:\laragontest\www
git clone https://github.com/bastaps/basta-ai.git
cd basta-ai
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Configure environment
```bash
copy .env.example .env
# Open .env in any text editor and fill in your Mistral API key
```

### Step 4 — Run the app
```bash
node server.js
# OR for development with auto-reload:
npx nodemon server.js
```

### Step 5 — Access the app
Open browser → `http://localhost:3000`

---

## 🔄 The Basta AI Free Workflow

```
[You] Describe your app idea
      ↓
[Claude AI] — Architect
  → Designs structure, file tree, README blueprint
      ↓
[GitHub] — Bridge
  → Push README to repo
      ↓
[Qwen] — Code Generator
  → Reads README, generates all code files, pushes to GitHub
      ↓
[Laragon] — Local Server
  → git pull, npm install, node server.js
      ↓
[Mistral API] — AI Brain
  → Powers the intelligence of the running app
      ↓
[Your App] — Live and FREE 🎉
```

---

## 🛡️ Security Rules (Enforce in all generated code)

- API keys are ALWAYS loaded from `process.env` — NEVER hardcoded
- `.env` is ALWAYS in `.gitignore`
- All Mistral API calls are made server-side (backend) — NEVER from frontend JS
- The frontend communicates only with `/api/chat` on the local Express server

---

## 🧩 Tech Stack Summary

| Layer | Technology | Cost |
|-------|-----------|------|
| Architect | Claude AI | Free (claude.ai) |
| Code Generator | Qwen (via GitHub) | Free |
| AI Brain | Mistral API | Free tier |
| Local Server | Laragon 6.0 | Free |
| Version Control | GitHub (bastaps) | Free |
| Backend | Node.js + Express | Free / Open Source |
| Frontend | HTML + CSS + JS | Free |

**Total cost: $0** ✅

---

## ⚠️ Constraints Checklist for Code Agent (Qwen)

- [ ] All 8 files in the File Tree must be generated
- [ ] No hardcoded API keys anywhere
- [ ] No placeholder `// TODO` comments — real code only
- [ ] `package.json` must have valid JSON syntax
- [ ] CSS must import Google Fonts (Orbitron + Share Tech Mono)
- [ ] JS must work without any npm frontend packages (vanilla only)
- [ ] App must run successfully with just `npm install && node server.js`
#   S S H   C o n n e c t i o n   V e r i f i e d  
 #   S S H   V e r i f i e d  
 