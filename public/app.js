let currentMode = 'workflow';
let conversationHistory = [];
let isLoading = false;

const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const modeTitle = document.getElementById('mode-title');
const modeButtons = document.querySelectorAll('.mode-btn');

const modeNames = { architect: '🏗️ Architect Mode', coder: '💻 Coder Mode', workflow: '🔄 Workflow Mode' };
const welcomeMessages = {
  architect: "🏗️ Architect Mode — Tell me what app you want to build. I'll design the structure, file tree, and README blueprint for Qwen.",
  coder: "💻 Coder Mode — Paste your README or describe what to code. I'll generate clean, complete code files.",
  workflow: "🔄 Workflow Mode — Ask me anything about the free AI dev stack: Claude → Qwen → Mistral → GitHub → Laragon."
};

function setMode(mode) {
  currentMode = mode;
  modeTitle.textContent = modeNames[mode];
  conversationHistory = [];
  chatWindow.innerHTML = '';
  modeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  appendMessage('assistant', welcomeMessages[mode]);
}

function appendMessage(role, content) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', `${role}-message`);
  let parsed = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
  msgDiv.innerHTML = parsed;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typing-indicator';
  typingDiv.classList.add('typing-indicator');
  typingDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text || isLoading) return;

  isLoading = true;
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });
  userInput.value = '';
  showTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: conversationHistory, mode: currentMode })
    });
    const data = await response.json();
    removeTypingIndicator();
    if (!response.ok) throw new Error(data.error || 'Unknown error');
    appendMessage('assistant', data.reply);
    conversationHistory.push({ role: 'assistant', content: data.reply });
  } catch (error) {
    removeTypingIndicator();
    appendMessage('assistant', `⚠️ Error: ${error.message}`);
  } finally { isLoading = false; }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
modeButtons.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

document.addEventListener('DOMContentLoaded', () => setMode('workflow'));