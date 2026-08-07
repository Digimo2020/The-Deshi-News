import { NewsArticle, HelpArticle, ResourceItem, EventItem, Appointment, AuditLog, User, SupportCase, EventRegistration } from '../types';
import { INITIAL_NEWS, INITIAL_HELP_ARTICLES, INITIAL_RESOURCES, INITIAL_EVENTS, DEMO_USERS } from '../data/mockData';

class DatabaseService {
  private news: NewsArticle[] = [...INITIAL_NEWS];
  private helpArticles: HelpArticle[] = [...INITIAL_HELP_ARTICLES];
  private resources: ResourceItem[] = [...INITIAL_RESOURCES];
  private events: EventItem[] = [...INITIAL_EVENTS];
  private appointments: Appointment[] = [
    {
      id: 'apt-1',
      memberId: 'user-member',
      memberName: 'Rashed Chowdhury',
      memberEmail: 'member@thedesi.news',
      memberPhone: '+351 967 890 123',
      serviceType: 'Immigration Info',
      helperId: 'user-helper',
      helperName: 'Priya Sharma (Community Helper)',
      date: '2026-08-15',
      timeSlot: '14:30',
      notes: 'Need guidance on NISS registration and SNS health card application in Sintra.',
      status: 'CONFIRMED',
      createdAt: '2026-08-06T10:00:00Z',
    }
  ];
  private eventRegistrations: EventRegistration[] = [];
  private users: User[] = [...DEMO_USERS];
  private supportCases: SupportCase[] = [
    {
      id: 'case-101',
      memberId: 'user-member',
      memberName: 'Rashed Chowdhury',
      subject: 'AIMA Appointment Notification Guidance',
      category: 'Immigration',
      assignedStaffId: 'user-support',
      assignedStaffName: 'Imran Hussain',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      notes: [
        { date: '2026-08-06T11:20:00Z', author: 'Rashed Chowdhury', text: 'Received an email from AIMA requiring document re-upload.' },
        { date: '2026-08-06T12:00:00Z', author: 'Imran Hussain', text: 'Reviewed portal attachments. Verified NIF and NISS tax status.' }
      ],
      createdAt: '2026-08-06T11:20:00Z',
      updatedAt: '2026-08-06T12:00:00Z'
    }
  ];
  private auditLogs: AuditLog[] = [
    {
      id: 'log-1',
      timestamp: '2026-08-07T09:00:00Z',
      userEmail: 'admin@thedesi.news',
      userRole: 'SUPER_ADMIN',
      action: 'SYSTEM_BOOT',
      details: 'TheDesi.news platform engine initialized with verified knowledge base.'
    }
  ];
  private savedNews: Record<string, string[]> = {
    'user-member': ['news-1', 'news-2']
  };
  private savedResources: Record<string, string[]> = {
    'user-member': ['res-1', 'res-2']
  };

  // NEWS
  getNews(status?: string, category?: string, search?: string): NewsArticle[] {
    let result = [...this.news];
    if (status && status !== 'ALL') {
      result = result.filter(n => n.status === status);
    } else if (!status) {
      result = result.filter(n => n.status === 'PUBLISHED');
    }
    if (category && category !== 'All') {
      result = result.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) ||
        n.summary60.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  getNewsById(id: string): NewsArticle | undefined {
    const item = this.news.find(n => n.id === id || n.slug === id);
    if (item) item.viewsCount++;
    return item;
  }

  saveNewsArticle(article: Partial<NewsArticle>, userEmail: string, userRole: string): NewsArticle {
    if (article.id) {
      const idx = this.news.findIndex(n => n.id === article.id);
      if (idx !== -1) {
        this.news[idx] = {
          ...this.news[idx],
          ...article,
          updatedAt: new Date().toISOString()
        } as NewsArticle;
        this.addAuditLog(userEmail, userRole as any, 'UPDATE_NEWS', `Updated article: ${this.news[idx].title}`);
        return this.news[idx];
      }
    }
    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: article.title || 'Untitled News',
      slug: (article.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary60: article.summary60 || '',
      content: article.content || '',
      category: article.category || 'Portugal News',
      tags: article.tags || ['General'],
      authorName: article.authorName || 'TheDesi.news Desk',
      imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: article.status || 'DRAFT',
      sourceName: article.sourceName || 'Editorial Team',
      sourceUrl: article.sourceUrl,
      officialSourceUrl: article.officialSourceUrl,
      isOfficialUpdate: article.isOfficialUpdate || false,
      viewsCount: 0,
      affectedPeople: article.affectedPeople,
      requiredActions: article.requiredActions,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      suggestedSocialPost: article.suggestedSocialPost,
      verifiedByEditor: article.verifiedByEditor || false
    };
    this.news.unshift(newArticle);
    this.addAuditLog(userEmail, userRole as any, 'CREATE_NEWS', `Created article: ${newArticle.title} (${newArticle.status})`);
    return newArticle;
  }

  // HELP ARTICLES
  getHelpArticles(category?: string, search?: string): HelpArticle[] {
    let result = [...this.helpArticles];
    if (category && category !== 'All') {
      result = result.filter(h => h.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(h => 
        h.title.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.content.toLowerCase().includes(q)
      );
    }
    return result;
  }

  getHelpArticleById(id: string): HelpArticle | undefined {
    const article = this.helpArticles.find(h => h.id === id || h.slug === id);
    if (article) article.viewsCount++;
    return article;
  }

  saveHelpArticle(article: Partial<HelpArticle>, userEmail: string, userRole: string): HelpArticle {
    if (article.id) {
      const idx = this.helpArticles.findIndex(h => h.id === article.id);
      if (idx !== -1) {
        this.helpArticles[idx] = { ...this.helpArticles[idx], ...article } as HelpArticle;
        this.addAuditLog(userEmail, userRole as any, 'UPDATE_HELP', `Updated help guide: ${this.helpArticles[idx].title}`);
        return this.helpArticles[idx];
      }
    }
    const newHelp: HelpArticle = {
      id: `help-${Date.now()}`,
      title: article.title || 'New Guidance',
      slug: (article.title || 'guidance').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: article.category || 'General',
      summary: article.summary || '',
      content: article.content || '',
      steps: article.steps || [],
      requiredDocuments: article.requiredDocuments || [],
      officialSourceUrl: article.officialSourceUrl || 'https://gov.pt',
      officialSourceTitle: article.officialSourceTitle || 'Official Portal',
      lastVerifiedDate: new Date().toISOString().slice(0, 10),
      informationProvider: article.informationProvider || 'TheDesi.news Legal Desk',
      status: 'VERIFIED',
      disclaimer: article.disclaimer || 'Verified general immigration guidance.',
      viewsCount: 0
    };
    this.helpArticles.unshift(newHelp);
    this.addAuditLog(userEmail, userRole as any, 'CREATE_HELP', `Created help guide: ${newHelp.title}`);
    return newHelp;
  }

  // RESOURCES
  getResources(municipality?: string, category?: string, search?: string): ResourceItem[] {
    let result = [...this.resources];
    if (municipality && municipality !== 'All') {
      result = result.filter(r => r.municipality.toLowerCase() === municipality.toLowerCase());
    }
    if (category && category !== 'All') {
      result = result.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.servicesOffered.some(s => s.toLowerCase().includes(q))
      );
    }
    return result;
  }

  // APPOINTMENTS
  getAppointments(memberId?: string): Appointment[] {
    if (memberId) {
      return this.appointments.filter(a => a.memberId === memberId);
    }
    return this.appointments;
  }

  createAppointment(apt: Partial<Appointment>): Appointment {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      memberId: apt.memberId || 'guest',
      memberName: apt.memberName || 'Member',
      memberEmail: apt.memberEmail || '',
      memberPhone: apt.memberPhone || '',
      serviceType: apt.serviceType || 'Immigration Info',
      helperId: apt.helperId || 'user-helper',
      helperName: apt.helperName || 'Community Helper Desk',
      date: apt.date || new Date().toISOString().slice(0, 10),
      timeSlot: apt.timeSlot || '10:00',
      notes: apt.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    this.appointments.unshift(newApt);
    this.addAuditLog(apt.memberEmail || 'member', 'MEMBER', 'BOOK_APPOINTMENT', `Booked ${newApt.serviceType} for ${newApt.date}`);
    return newApt;
  }

  updateAppointmentStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED', staffNotes?: string): Appointment | null {
    const apt = this.appointments.find(a => a.id === id);
    if (apt) {
      apt.status = status;
      if (staffNotes) apt.staffNotes = staffNotes;
      return apt;
    }
    return null;
  }

  // EVENTS
  getEvents(): EventItem[] {
    return this.events;
  }

  registerForEvent(eventId: string, userId: string, userName: string, userEmail: string): boolean {
    const evt = this.events.find(e => e.id === eventId);
    if (evt && evt.registeredCount < evt.capacity) {
      evt.registeredCount++;
      this.eventRegistrations.push({
        id: `reg-${Date.now()}`,
        eventId,
        userId,
        userName,
        userEmail,
        registeredAt: new Date().toISOString()
      });
      return true;
    }
    return false;
  }

  // SAVED ITEMS
  toggleSaveNews(userId: string, newsId: string): string[] {
    if (!this.savedNews[userId]) this.savedNews[userId] = [];
    const list = this.savedNews[userId];
    const idx = list.indexOf(newsId);
    if (idx > -1) list.splice(idx, 1);
    else list.push(newsId);
    return list;
  }

  getSavedNews(userId: string): NewsArticle[] {
    const ids = this.savedNews[userId] || [];
    return this.news.filter(n => ids.includes(n.id));
  }

  toggleSaveResource(userId: string, resId: string): string[] {
    if (!this.savedResources[userId]) this.savedResources[userId] = [];
    const list = this.savedResources[userId];
    const idx = list.indexOf(resId);
    if (idx > -1) list.splice(idx, 1);
    else list.push(resId);
    return list;
  }

  getSavedResources(userId: string): ResourceItem[] {
    const ids = this.savedResources[userId] || [];
    return this.resources.filter(r => ids.includes(r.id));
  }

  // AUDIT LOGS
  addAuditLog(userEmail: string, userRole: any, action: string, details: string) {
    this.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      userEmail,
      userRole,
      action,
      details
    });
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs.slice(0, 50);
  }

  // USERS
  getUsers(): User[] {
    return this.users;
  }

  // SUPPORT CASES
  getSupportCases(): SupportCase[] {
    return this.supportCases;
  }
}

export const db = new DatabaseService();
