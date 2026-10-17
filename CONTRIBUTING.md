# Contributing to TheDesi.news

Thank you for your interest in contributing to TheDesi.news! We're excited to work with community members to build a better platform for South Asian immigrants in Portugal.

## 🤝 Ways to Contribute

### 1. **Report Bugs**
Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots/videos if applicable
- Your environment (browser, OS, etc.)

### 2. **Suggest Features**
Have an idea? Open a feature request with:
- Clear description of the feature
- Why it would be useful for the community
- How it aligns with our mission
- Any relevant examples or references

### 3. **Improve Documentation**
- Fix typos and improve clarity
- Add missing information
- Translate docs to other languages
- Create guides and tutorials

### 4. **Translate Content**
Help us expand language support:
- Translate UI strings
- Translate articles and guides
- Proofread existing translations
- Email: translations@thedesi.news

### 5. **Code Contributions**
- Fix bugs
- Implement features
- Optimize performance
- Improve code quality
- Add tests

### 6. **Community Engagement**
- Moderate forums and discussions
- Help answer community questions
- Organize events and meetups
- Create educational content
- Share your story

## 📋 Getting Started with Code

### Prerequisites
- Node.js 16+ or Bun
- Git
- Basic understanding of React and TypeScript

### Setup Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/The-Deshi-News.git
cd The-Deshi-News

# Add upstream remote
git remote add upstream https://github.com/Digimo2020/The-Deshi-News.git

# Install dependencies
npm install
# or
bun install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Create a Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix-name
```

### Development Workflow

1. **Make your changes** - Write clean, well-commented code
2. **Test thoroughly** - Test on different browsers/devices
3. **Run type checking**: `npm run lint`
4. **Build locally**: `npm run build`
5. **Commit with clear messages**: `git commit -m "Clear description of changes"`

### Git Commit Guidelines

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (no logic change)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Build, dependencies, etc.
- `i18n:` Translation/localization

**Examples:**
```
feat(news): add search filters for news portal
fix(auth): resolve login token expiration issue
docs(immigration): update AIMA guide for 2024
i18n(ui): translate help centre to Bengali
```

## 🔄 Submitting Changes

### Create a Pull Request

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**:
   - Clear, descriptive title
   - Reference related issues (#123)
   - Describe your changes
   - Include screenshots/videos if relevant
   - Link to related documentation

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Related Issue
   Fixes #(issue number)

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## How Has This Been Tested?
   Describe testing steps

   ## Screenshots (if applicable)
   Add relevant images

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

## 🎨 Code Style Guidelines

### General
- Use TypeScript for all new code
- Write descriptive variable/function names
- Add comments for complex logic
- Keep functions focused and small
- DRY principle - Don't Repeat Yourself

### React Components
- Functional components with hooks
- Props validation with TypeScript
- Clear component structure
- Reusable components in `/components`
- Page components in `/pages`

### CSS
- Use Tailwind CSS utilities
- Follow naming conventions
- Mobile-first approach
- Responsive design
- Accessibility first

### Example Component

```typescript
import React, { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
  onAction?: () => void;
}

export const Card: FC<CardProps> = ({ 
  title, 
  description, 
  children, 
  onAction 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      
      {children && <div className="mt-4">{children}</div>}
      
      {onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Action
        </button>
      )}
    </div>
  );
};
```

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Test across browsers and devices
- Test with screen readers
- Test in different languages

## 📝 Documentation Standards

- Clear, concise writing
- Use examples where helpful
- Include relevant links
- Update relevant docs with changes
- Translate to supported languages (eventually)

## 🚫 Code of Conduct

### Be Respectful
- Treat everyone with respect
- Welcome diverse perspectives
- Be inclusive and welcoming
- Use inclusive language

### Be Helpful
- Help community members
- Answer questions patiently
- Provide constructive feedback
- Share knowledge

### Be Professional
- No harassment or discrimination
- No spam or self-promotion
- No sharing private information
- Report issues to maintainers

**Violations may result in:**
- Warning
- Temporary suspension
- Permanent removal

## 📬 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and discussions
- **Email**: contributors@thedesi.news
- **Discord**: [Join community Discord](https://discord.gg/thedesi)

## 🏆 Recognition

Contributors will be:
- Listed in [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- Thanked in release notes
- Recognized on our website
- Invited to community events

## 📚 Resources

- [Project README](./README.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Component Library](./docs/COMPONENTS.md)

## ❓ Questions?

Feel free to ask! We're here to help:
- Open a discussion
- Email: contributors@thedesi.news
- Join our Discord community

---

**Thank you for contributing to TheDesi.news! Together, we're building a better platform for South Asian communities in Portugal. 🙏**
