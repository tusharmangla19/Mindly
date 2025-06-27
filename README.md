# Mindly – Your AI-Powered Journal

Mindly is a modern journaling app that leverages cutting-edge AI to inspire your writing, analyze your moods, and help you reflect deeper. Capture your thoughts, extract text from images, and get smart suggestions—all in a beautiful, secure space.

## ✨ Features
- **AI-Powered Writing Suggestions:** Get context-aware, personalized prompts from Gemini AI to keep your journaling flowing.
- **Image to Text Conversion:** Upload a photo of handwritten or printed text and let Gemini AI extract it directly into your journal entry.
- **Mood & Sentiment Analytics:** Track your emotional journey with mood detection, sentiment analysis, and beautiful visualizations.
- **Daily Reflection Prompts:** Get inspired every day with unique, thought-provoking prompts.
- **Dark & Light Theme:** Seamless theme switching, with system preference support.
- **Secure & Private:** Your thoughts are safe with enterprise-grade security and privacy features.

## 🛠️ Tech Stack
- **Next.js 14** (App Router)
- **React 19**
- **Tailwind CSS**
- **Prisma + PostgreSQL**
- **Clerk** (authentication)
- **next-themes** (theme switching)
- **Gemini AI** (Google Generative AI)

## 🚀 Getting Started
1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/mindly.git
   cd mindly/app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your keys (Clerk, Database, Gemini, etc.)
4. **Run the app:**
   ```bash
   npm run dev
   ```
5. **Open in your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## 📸 Screenshots
- ![Light Theme](public/screenshot_light.png)
- ![Dark Theme](public/screenshot_dark.png)

## 🤖 AI Setup
- Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Add it to your `.env` as `GEMINI_API_KEY=your_key_here`

## 📄 License
MIT

---

> Made with ❤️ and AI by the Mindly team. 