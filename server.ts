import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/db';
import { askTheDesiAI, generateAINewsArticle, applyAITransform } from './src/server/gemini';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API ROUTES

  // Health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', name: 'TheDesi.news API Server' });
  });

  // News
  app.get('/api/news', (req, res) => {
    const { status, category, search } = req.query;
    const articles = db.getNews(status as string, category as string, search as string);
    res.json(articles);
  });

  app.get('/api/news/:id', (req, res) => {
    const article = db.getNewsById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'News article not found' });
    }
    res.json(article);
  });

  app.post('/api/news', (req, res) => {
    const userEmail = (req.headers['x-user-email'] as string) || 'editor@thedesi.news';
    const userRole = (req.headers['x-user-role'] as string) || 'EDITOR';
    const saved = db.saveNewsArticle(req.body, userEmail, userRole);
    res.json(saved);
  });

  // Help Articles
  app.get('/api/help', (req, res) => {
    const { category, search } = req.query;
    const articles = db.getHelpArticles(category as string, search as string);
    res.json(articles);
  });

  app.get('/api/help/:id', (req, res) => {
    const article = db.getHelpArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Help guide not found' });
    }
    res.json(article);
  });

  app.post('/api/help', (req, res) => {
    const userEmail = (req.headers['x-user-email'] as string) || 'manager@thedesi.news';
    const userRole = (req.headers['x-user-role'] as string) || 'HELP_CENTRE_MANAGER';
    const saved = db.saveHelpArticle(req.body, userEmail, userRole);
    res.json(saved);
  });

  // Resources
  app.get('/api/resources', (req, res) => {
    const { municipality, category, search } = req.query;
    const items = db.getResources(municipality as string, category as string, search as string);
    res.json(items);
  });

  // Appointments
  app.get('/api/appointments', (req, res) => {
    const { memberId } = req.query;
    const list = db.getAppointments(memberId as string);
    res.json(list);
  });

  app.post('/api/appointments', (req, res) => {
    const created = db.createAppointment(req.body);
    res.json(created);
  });

  app.patch('/api/appointments/:id', (req, res) => {
    const { status, staffNotes } = req.body;
    const updated = db.updateAppointmentStatus(req.params.id, status, staffNotes);
    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(updated);
  });

  // Events
  app.get('/api/events', (req, res) => {
    res.json(db.getEvents());
  });

  app.post('/api/events/:id/register', (req, res) => {
    const { userId, userName, userEmail } = req.body;
    const success = db.registerForEvent(req.params.id, userId, userName, userEmail);
    if (!success) {
      return res.status(400).json({ error: 'Event full or invalid' });
    }
    res.json({ success: true, message: 'Registration confirmed' });
  });

  // Saved Items
  app.post('/api/saved/news', (req, res) => {
    const { userId, newsId } = req.body;
    const updated = db.toggleSaveNews(userId, newsId);
    res.json({ savedNewsIds: updated });
  });

  app.get('/api/saved/news/:userId', (req, res) => {
    const items = db.getSavedNews(req.params.userId);
    res.json(items);
  });

  app.post('/api/saved/resources', (req, res) => {
    const { userId, resId } = req.body;
    const updated = db.toggleSaveResource(userId, resId);
    res.json({ savedResourceIds: updated });
  });

  app.get('/api/saved/resources/:userId', (req, res) => {
    const items = db.getSavedResources(req.params.userId);
    res.json(items);
  });

  // AI ENDPOINTS
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { question, language, municipality } = req.body;
      const response = await askTheDesiAI(question, language || 'en', municipality || 'Lisbon');
      res.json(response);
    } catch (err) {
      console.error('AI Ask Error:', err);
      res.status(500).json({ error: 'Failed to process AI query' });
    }
  });

  app.post('/api/ai/generate-news', async (req, res) => {
    try {
      const { sourceUrl, rawSourceText, category } = req.body;
      const result = await generateAINewsArticle(sourceUrl, rawSourceText, category);
      res.json(result);
    } catch (err) {
      console.error('AI News Generation Error:', err);
      res.status(500).json({ error: 'Failed to generate news with AI' });
    }
  });

  app.post('/api/ai/transform', async (req, res) => {
    try {
      const { action, text, targetLang } = req.body;
      const result = await applyAITransform(action, text, targetLang || 'en');
      res.json(result);
    } catch (err) {
      console.error('AI Transform Error:', err);
      res.status(500).json({ error: 'Failed AI transform' });
    }
  });

  // Audit Logs & Support Cases
  app.get('/api/audit-logs', (req, res) => {
    res.json(db.getAuditLogs());
  });

  app.get('/api/support-cases', (req, res) => {
    res.json(db.getSupportCases());
  });

  app.get('/api/users', (req, res) => {
    res.json(db.getUsers());
  });

  // VITE MIDDLEWARE (DEV) OR STATIC FILES (PROD)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
