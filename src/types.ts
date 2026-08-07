export type UserRole = 'SUPER_ADMIN' | 'EDITOR' | 'SUPPORT_STAFF' | 'HELPER' | 'HELP_CENTRE_MANAGER' | 'MEMBER';

export type LanguageCode = 'en' | 'pt' | 'bn' | 'hi' | 'ur' | 'ar';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  preferredLanguage: LanguageCode;
  municipality: string;
  interests: string[];
  avatarUrl?: string;
  createdAt: string;
}

export type EditorialStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary60: string; // Max 60-word summary
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  imageUrl: string;
  publishedAt: string;
  updatedAt: string;
  status: EditorialStatus;
  sourceName: string;
  sourceUrl?: string;
  officialSourceUrl?: string;
  isOfficialUpdate: boolean;
  relatedHelpArticleIds?: string[];
  relatedNewsIds?: string[];
  viewsCount: number;
  affectedPeople?: string;
  requiredActions?: string;
  seoTitle?: string;
  metaDescription?: string;
  suggestedSocialPost?: string;
  verifiedByEditor?: boolean;
}

export interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  steps?: string[];
  requiredDocuments?: string[];
  officialSourceUrl: string;
  officialSourceTitle: string;
  lastVerifiedDate: string;
  informationProvider: string;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'OUTDATED' | 'ARCHIVED';
  disclaimer: string;
  viewsCount: number;
}

export interface ResourceItem {
  id: string;
  name: string;
  category: 'Legal Help' | 'Healthcare' | 'Government Office' | 'Language Class' | 'Immigration Support' | 'Housing & Social';
  description: string;
  address: string;
  municipality: string; // e.g. Lisbon, Porto, Sintra, Oeiras, Amadora
  phone: string;
  email: string;
  website: string;
  openingHours: string;
  locationCoordinates?: { lat: number; lng: number };
  languagesSpoken: string[];
  servicesOffered: string[];
  eligibility: string;
  officialSource: string;
  lastVerifiedDate: string;
  isVerified: boolean;
}

export interface Appointment {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  serviceType: 'Immigration Info' | 'General Support' | 'Legal Referral' | 'Employment Support' | 'Language Support';
  helperId: string;
  helperName: string;
  date: string;
  timeSlot: string;
  notes: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  rescheduledTime?: string;
  staffNotes?: string;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  meetingUrl?: string;
  capacity: number;
  registeredCount: number;
  speaker: string;
  language: string;
  category: 'Immigration Workshop' | 'Legal Info' | 'Portuguese Class' | 'Business & Employment' | 'Community Gathering';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: string;
}

export interface SupportCase {
  id: string;
  memberId: string;
  memberName: string;
  subject: string;
  category: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  notes: { date: string; author: string; text: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  userRole: UserRole;
  action: string;
  details: string;
}

export interface AIConversationMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  summary60?: string;
  relevantHelpArticles?: HelpArticle[];
  relevantResources?: ResourceItem[];
  officialSources?: { title: string; url: string }[];
  suggestedAppointment?: boolean;
  timestamp: string;
}

export interface AIGeneratedNewsPayload {
  headline: string;
  summary60: string;
  fullDraft: string;
  category: string;
  tags: string[];
  keyFacts: string[];
  whoIsAffected: string;
  whatActionToTake: string;
  officialSourceUrl: string;
  officialSourceTitle: string;
  seoTitle: string;
  metaDescription: string;
  suggestedSocialPost: string;
  relatedHelpTopics: string[];
}
