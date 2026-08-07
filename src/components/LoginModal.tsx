import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/mockData';
import { User, ShieldCheck, X, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, currentUser } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-white">Member Login / Switch Persona</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Select a demo account below to experience member features, appointments, interest-based personalization, or CMS admin workflows:
          </p>

          <div className="space-y-2">
            {DEMO_USERS.map((u) => {
              const isSelected = currentUser?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    login(u.email);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-stone-900 font-bold'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={u.avatarUrl} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold">{u.name}</h4>
                      <p className="text-[10px] text-stone-500">{u.email} • {u.municipality}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                    {u.role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
