import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  activeRole: UserRole | 'GUEST';
  switchDemoRole: (role: UserRole | 'GUEST') => void;
  login: (email: string) => void;
  logout: () => void;
  updateUserInterests: (interests: string[]) => void;
  savedNewsIds: string[];
  savedResourceIds: string[];
  toggleSaveNews: (newsId: string) => Promise<void>;
  toggleSaveResource: (resId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS[5]); // Default to Community Member for full experience
  const [activeRole, setActiveRole] = useState<UserRole | 'GUEST'>('MEMBER');
  const [savedNewsIds, setSavedNewsIds] = useState<string[]>(['news-1', 'news-2']);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(['res-1']);

  const isLoggedIn = currentUser !== null && activeRole !== 'GUEST';

  useEffect(() => {
    if (currentUser) {
      fetchSavedItems(currentUser.id);
    }
  }, [currentUser?.id]);

  const fetchSavedItems = async (userId: string) => {
    try {
      const resNews = await fetch(`/api/saved/news/${userId}`);
      if (resNews.ok) {
        const newsItems = await resNews.json();
        setSavedNewsIds(newsItems.map((n: any) => n.id));
      }
      const resResources = await fetch(`/api/saved/resources/${userId}`);
      if (resResources.ok) {
        const resItems = await resResources.json();
        setSavedResourceIds(resItems.map((r: any) => r.id));
      }
    } catch (e) {
      console.error('Error fetching saved items:', e);
    }
  };

  const switchDemoRole = (role: UserRole | 'GUEST') => {
    setActiveRole(role);
    if (role === 'GUEST') {
      setCurrentUser(null);
    } else {
      const found = DEMO_USERS.find(u => u.role === role);
      if (found) {
        setCurrentUser(found);
      } else {
        setCurrentUser({
          ...DEMO_USERS[5],
          role: role
        });
      }
    }
  };

  const login = (email: string) => {
    const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setActiveRole(found.role);
    } else {
      const newMember: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'MEMBER',
        preferredLanguage: 'en',
        municipality: 'Lisbon',
        interests: ['Immigration', 'Healthcare'],
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newMember);
      setActiveRole('MEMBER');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRole('GUEST');
  };

  const updateUserInterests = (interests: string[]) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, interests });
    }
  };

  const toggleSaveNews = async (newsId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/saved/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, newsId })
      });
      if (res.ok) {
        const data = await res.json();
        setSavedNewsIds(data.savedNewsIds || []);
      }
    } catch (err) {
      console.error('Failed toggle save news:', err);
    }
  };

  const toggleSaveResource = async (resId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/saved/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, resId })
      });
      if (res.ok) {
        const data = await res.json();
        setSavedResourceIds(data.savedResourceIds || []);
      }
    } catch (err) {
      console.error('Failed toggle save resource:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        activeRole,
        switchDemoRole,
        login,
        logout,
        updateUserInterests,
        savedNewsIds,
        savedResourceIds,
        toggleSaveNews,
        toggleSaveResource
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
