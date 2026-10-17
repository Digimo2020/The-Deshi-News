# TheDesi.news - Quick Start Guide

Get up and running with TheDesi.news in 5 minutes! 🚀

## ⚡ 60-Second Setup

```bash
# 1. Clone & Install
git clone https://github.com/Digimo2020/The-Deshi-News.git
cd The-Deshi-News
npm install

# 2. Configure
cp .env.example .env
# Add your Google Gemini API key to .env

# 3. Run
npm run dev

# Done! Open http://localhost:5173
```

---

## 📋 Prerequisites

- **Node.js 16+** ([Download](https://nodejs.org/))
- **npm or Bun** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Google Gemini API Key** ([Get Key](https://aistudio.google.com/))

---

## 🚀 Step-by-Step Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/Digimo2020/The-Deshi-News.git
cd The-Deshi-News
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun (faster):
```bash
bun install
```

### Step 3: Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` and add:
```env
VITE_GOOGLE_API_KEY=your_google_gemini_api_key_here
```

[Get your free Google Gemini API key](https://aistudio.google.com/)

### Step 4: Start Development Server

```bash
npm run dev
```

You'll see:
```
VITE v6.2.3  ready in 450 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

### Step 5: Open in Browser

Visit: **http://localhost:5173**

---

## 🎯 First Steps

### 1. **Explore the Platform**
- Browse the News Portal
- Check out the Help Centre
- Read the Immigration Guide
- Try the AI Assistant

### 2. **Create Account** (Optional)
- Click "Login" in header
- Create new account
- Complete profile
- Unlock member features

### 3. **Try the AI**
- Click "Ask TheDesi AI" button
- Ask a question like:
  - "How do I register with SNS?"
  - "What visa do I need?"
  - "Where can I find a doctor?"

### 4. **Join Community**
- Browse the Community Hub
- Check upcoming Events
- Explore Resource Directory
- Browse Help Centre articles

---

## 📁 Project Structure (Quick Overview)

```
the-deshi-news/
├── src/
│   ├── components/          # React components
│   ├── context/             # State management
│   ├── types.ts             # TypeScript definitions
│   └── main.tsx             # Entry point
├── assets/                  # Images, icons, media
├── public/                  # Static files
├── server.ts                # Express backend
├── package.json             # Dependencies
└── README.md                # Full documentation
```

---

## 🔧 Common Development Commands

### Run Development Server
```bash
npm run dev
# Server at http://localhost:5173
```

### Build for Production
```bash
npm run build
# Creates optimized dist/ folder
```

### Start Production Build
```bash
npm start
# Runs compiled server
```

### Type Check
```bash
npm run lint
# Checks for TypeScript errors
```

### Preview Production Build
```bash
npm run preview
# Preview production build locally
```

### Clean Build Files
```bash
npm run clean
# Remove dist/ and compiled files
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
# Uses port 3000 instead
```

### API Key Issues
```
Error: VITE_GOOGLE_API_KEY is not set
```
**Solution**: Make sure `.env` file has:
```env
VITE_GOOGLE_API_KEY=your_actual_key_here
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

### Build Errors
```bash
npm run lint  # Check for type errors
npm run clean # Clean build artifacts
npm run build # Try building again
```

### Port Connection Refused
Make sure Node.js is properly installed:
```bash
node --version
npm --version
```

---

## 📚 Learning Resources

### Documentation
- [Full README](./README.md) - Complete project documentation
- [Features Guide](./FEATURES.md) - Detailed feature descriptions
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Architecture Guide](./docs/ARCHITECTURE.md) - System design

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Google Gemini API](https://ai.google.dev/docs)

---

## 🤝 Need Help?

### Community Support
- **Discord**: [Join Community](https://discord.gg/thedesi)
- **GitHub Issues**: [Report Issues](https://github.com/Digimo2020/The-Deshi-News/issues)
- **Email**: support@thedesi.news

### Getting More Help
1. Check [Troubleshooting](#-troubleshooting) section
2. Search [GitHub Issues](https://github.com/Digimo2020/The-Deshi-News/issues)
3. Join [Discord Community](https://discord.gg/thedesi)
4. Email support@thedesi.news

---

## 🎓 Next Steps

### For Contributors
1. Read [Contributing Guide](./CONTRIBUTING.md)
2. Find a [good first issue](https://github.com/Digimo2020/The-Deshi-News/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
3. Fork and create a branch
4. Make your changes
5. Submit a pull request

### For Users
1. Create an account
2. Join the community
3. Explore features
4. Share feedback
5. Invite friends

### For Organizations
1. Contact partnerships@thedesi.news
2. Explore integration opportunities
3. Discuss sponsorship
4. Collaborate on initiatives

---

## 💡 Tips & Tricks

### Faster Development
- Use [Bun](https://bun.sh/) instead of npm (5x faster)
- Use VS Code with TypeScript support
- Install [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### Code Quality
- Follow TypeScript strict mode
- Use meaningful variable names
- Write comments for complex logic
- Test in different browsers

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/awesome-feature

# Make changes and commit
git add .
git commit -m "feat: add awesome feature"

# Push to fork
git push origin feature/awesome-feature

# Create pull request on GitHub
```

---

## 📊 Development Statistics

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Server**: Express.js
- **AI**: Google Gemini API
- **Development Time**: ~5 minutes setup
- **Community**: 2,500+ members

---

## ✅ Checklist: First Development Session

- [ ] Cloned repository
- [ ] Installed dependencies
- [ ] Set up .env file
- [ ] Started dev server
- [ ] Opened in browser
- [ ] Explored platform
- [ ] Tried AI assistant
- [ ] Checked type errors: `npm run lint`
- [ ] Read contributing guide
- [ ] Joined Discord community

---

## 🎉 You're Ready!

You now have:
✅ Local development environment running
✅ Understanding of project structure
✅ Knowledge of key commands
✅ Troubleshooting resources
✅ Community support available

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Type check |
| `npm run preview` | Preview production |
| `npm run clean` | Clean build artifacts |

---

## 🚀 Next: Make Your First Contribution!

Ready to contribute? Check out [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Happy Coding! 🎉**

Made with ❤️ for the South Asian community in Portugal

Questions? Ask in [Discord](https://discord.gg/thedesi) or [email us](mailto:support@thedesi.news)
