import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NewsArticle, HelpArticle, ResourceItem, Appointment, User, UserRole } from '../../types';
import { GeminiAINewsEditor } from './GeminiAINewsEditor';
import { 
  ShieldCheck, 
  Users, 
  Newspaper, 
  HelpCircle, 
  Building2, 
  Calendar, 
  Wand2, 
  Activity, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, activeRole, switchDemoRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'news' | 'help' | 'resources' | 'appointments' | 'users' | 'ai-analytics'>('news');

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [help, setHelp] = useState<HelpArticle[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Editing state
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isCreatingNews, setIsCreatingNews] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [resN, resH, resR, resA, resU, resLogs] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/help'),
        fetch('/api/resources'),
        fetch('/api/appointments'),
        fetch('/api/users'),
        fetch('/api/audit-logs')
      ]);

      if (resN.ok) setNews(await resN.json());
      if (resH.ok) setHelp(await resH.json());
      if (resR.ok) setResources(await resR.json());
      if (resA.ok) setAppointments(await resA.json());
      if (resU.ok) setUsers(await resU.json());
      if (resLogs.ok) setAuditLogs(await resLogs.json());
    } catch (e) {
      console.error('Fetch admin data error:', e);
    }
  };

  const handleSaveNews = async (article: Partial<NewsArticle>) => {
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      if (res.ok) {
        setIsCreatingNews(false);
        setEditingNews(null);
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="font-serif font-bold text-2xl text-white">TheDesi.news CMS & Staff Portal</h1>
            <span className="bg-purple-950 text-purple-300 border border-purple-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              {activeRole}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Role-Based Access Control: Manage news, Gemini AI editorial pipeline, Help Centre verification, appointment cases, and system security.
          </p>
        </div>

        {/* Quick Role Switch Buttons */}
        <div className="flex items-center gap-1.5 bg-stone-950 p-2 rounded-xl border border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-400 mr-1">Role:</span>
          {(['SUPER_ADMIN', 'EDITOR', 'SUPPORT_STAFF', 'HELPER', 'HELP_CENTRE_MANAGER'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => switchDemoRole(r)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                activeRole === r ? 'bg-purple-600 text-white shadow' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {r.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        {['SUPER_ADMIN', 'EDITOR'].includes(activeRole) && (
          <button
            onClick={() => { setActiveTab('news'); setIsCreatingNews(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'news' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            News Articles ({news.length})
          </button>
        )}

        {['SUPER_ADMIN', 'HELP_CENTRE_MANAGER'].includes(activeRole) && (
          <button
            onClick={() => setActiveTab('help')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'help' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Help Centre Guides ({help.length})
          </button>
        )}

        {['SUPER_ADMIN', 'HELP_CENTRE_MANAGER'].includes(activeRole) && (
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'resources' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Directory Resources ({resources.length})
          </button>
        )}

        {['SUPER_ADMIN', 'SUPPORT_STAFF', 'HELPER'].includes(activeRole) && (
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'appointments' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Helper Appointments ({appointments.length})
          </button>
        )}

        {activeRole === 'SUPER_ADMIN' && (
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'users' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Users & Roles ({users.length})
          </button>
        )}

        {activeRole === 'SUPER_ADMIN' && (
          <button
            onClick={() => setActiveTab('ai-analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'ai-analytics' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            AI Token Usage & Audit Logs
          </button>
        )}
      </div>

      {/* GEMINI NEWS EDITOR MODAL / INLINE */}
      {(isCreatingNews || editingNews) && (
        <GeminiAINewsEditor
          initialArticle={editingNews}
          onSaveArticle={handleSaveNews}
          onCancel={() => {
            setIsCreatingNews(false);
            setEditingNews(null);
          }}
        />
      )}

      {/* NEWS TAB */}
      {activeTab === 'news' && !isCreatingNews && !editingNews && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-stone-900">News Articles & AI Workflow</h2>
            <button
              onClick={() => setIsCreatingNews(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-amber-300" />
              <span>Create News with Gemini AI</span>
            </button>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-100 uppercase text-[10px] font-bold text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Editor Verified</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="p-3.5 font-bold text-stone-900 max-w-xs truncate">{item.title}</td>
                    <td className="p-3.5 font-semibold text-emerald-800">{item.category}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        item.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {item.verifiedByEditor ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-amber-600 font-semibold">Pending Factcheck</span>
                      )}
                    </td>
                    <td className="p-3.5 text-stone-500">{item.authorName}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setEditingNews(item)}
                        className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HELP TAB */}
      {activeTab === 'help' && (
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-lg text-stone-900">Help Centre Knowledge Base</h2>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-100 uppercase text-[10px] font-bold text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Last Verified Date</th>
                  <th className="p-3.5">Official Source Provider</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {help.map((h) => (
                  <tr key={h.id} className="hover:bg-stone-50">
                    <td className="p-3.5 font-bold text-stone-900">{h.title}</td>
                    <td className="p-3.5 font-semibold text-emerald-800">{h.category}</td>
                    <td className="p-3.5 text-stone-600">{h.lastVerifiedDate}</td>
                    <td className="p-3.5 text-stone-600">{h.officialSourceTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* APPOINTMENTS TAB */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-lg text-stone-900">Helper Appointments Queue</h2>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-100 uppercase text-[10px] font-bold text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Member Name</th>
                  <th className="p-3.5">Service Requested</th>
                  <th className="p-3.5">Assigned Helper</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-stone-50">
                    <td className="p-3.5 font-bold text-stone-900">{apt.memberName} ({apt.memberEmail})</td>
                    <td className="p-3.5 text-stone-800 font-semibold">{apt.serviceType}</td>
                    <td className="p-3.5 text-stone-600">{apt.helperName}</td>
                    <td className="p-3.5 text-stone-600">{apt.date} at {apt.timeSlot}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USERS & ROLES TAB */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-lg text-stone-900">User Accounts & Role Permissions</h2>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-100 uppercase text-[10px] font-bold text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Municipality</th>
                  <th className="p-3.5">Current Role</th>
                  <th className="p-3.5 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50">
                    <td className="p-3.5 font-bold text-stone-900">{u.name}</td>
                    <td className="p-3.5 text-stone-600">{u.email}</td>
                    <td className="p-3.5 text-stone-600">{u.municipality}</td>
                    <td className="p-3.5 font-bold text-purple-700">{u.role}</td>
                    <td className="p-3.5 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="bg-stone-100 border border-stone-300 rounded px-2 py-1 text-xs focus:outline-none"
                      >
                        <option value="MEMBER">MEMBER</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="SUPPORT_STAFF">SUPPORT_STAFF</option>
                        <option value="HELPER">HELPER</option>
                        <option value="HELP_CENTRE_MANAGER">HELP_CENTRE_MANAGER</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI ANALYTICS & AUDIT LOGS TAB */}
      {activeTab === 'ai-analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold uppercase text-stone-500 block">Server Model</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">gemini-3.6-flash</h3>
              <p className="text-xs text-stone-500 mt-1">Strictly server-side execution via Express API</p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold uppercase text-stone-500 block">API Key Protection</span>
              <h3 className="text-xl font-bold text-emerald-600 mt-1">100% Server Encapsulated</h3>
              <p className="text-xs text-stone-500 mt-1">Key never exposed to browser client</p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold uppercase text-stone-500 block">AI Requests Today</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">128 Queries</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Cost est: €0.04</p>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-3">System Audit Trail</h3>
            <div className="bg-stone-950 text-stone-200 rounded-2xl p-4 font-mono text-xs space-y-2 max-h-80 overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="border-b border-stone-800 pb-2">
                  <span className="text-stone-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                  <strong className="text-purple-400">{log.action}</strong> by{' '}
                  <span className="text-emerald-400">{log.userId}</span> - {log.details}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
