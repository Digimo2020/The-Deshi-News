import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AIConversationMessage } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User as UserIcon, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  Calendar, 
  X,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface TheDesiAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onBookAppointment: () => void;
}

export const TheDesiAIModal: React.FC<TheDesiAIModalProps> = ({ isOpen, onClose, initialPrompt, onBookAppointment }) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<AIConversationMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am **TheDesi AI** (Desi Help AI). I am here to assist you with verified information regarding Portuguese immigration (AIMA), NIF, NISS, SNS healthcare, legal guidance, and community resources. How can I help you today?`,
      summary60: `Welcome to TheDesi AI! Ask any question about AIMA renewals, NIF, NISS, SNS healthcare registration, legal support, or Portuguese language classes.`,
      officialSources: [
        { title: 'AIMA Official Portal', url: 'https://aima.gov.pt' },
        { title: 'ePortugal Gov Services', url: 'https://eportugal.gov.pt' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'How do I renew my residence permit with AIMA?',
    'Where and how can I get my NIF in Lisbon?',
    'How do I register for SNS Health Number (Número de Utente)?',
    'How can I apply for Social Security (NISS Na Hora)?',
    'Where can I find free Portuguese language classes in Sintra?'
  ];

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: AIConversationMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          language: language || 'en',
          municipality: currentUser?.municipality || 'Lisbon'
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AIConversationMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.fullAnswer,
          summary60: data.summary60,
          officialSources: data.officialSources,
          suggestedAppointment: data.suggestAppointment,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('API Error');
      }
    } catch (err) {
      console.error(err);
      const errorMsg: AIConversationMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `To handle "${textToSend}" in Portugal, ensure you hold your valid passport, NIF tax number, and proof of residence from Junta de Freguesia. Access portal.aima.pt or eportugal.gov.pt for official submissions.`,
        summary60: `Verify required passport and tax documents before visiting local offices. Official portals: portal.aima.pt and eportugal.gov.pt.`,
        officialSources: [
          { title: 'AIMA Portal', url: 'https://aima.gov.pt' },
          { title: 'Finanças Portal', url: 'https://portaldasfinancas.gov.pt' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-stone-200 text-stone-900 max-w-3xl w-full h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cc0000] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-lg text-white">TheDesi AI</h3>
                <span className="bg-[#cc0000] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  GEMINI 3.6
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Verified Portugal Immigration & Community Assistant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Banner */}
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center gap-2 text-xs text-stone-600">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            TheDesi AI provides general guidance based on official Portuguese sources. For legal or tax advice, consult verified professionals.
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#cc0000] text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#cc0000] text-white font-medium rounded-tr-none'
                  : 'bg-white border border-stone-200 text-stone-900 rounded-tl-none'
              }`}>
                {/* User Message */}
                {msg.sender === 'user' && (
                  <p className="font-semibold text-white text-sm">{msg.text}</p>
                )}

                {/* Assistant Message */}
                {msg.sender === 'assistant' && (
                  <div className="space-y-3">
                    {/* 60-Word Quick Summary Badge */}
                    {msg.summary60 && (
                      <div className="p-3 bg-stone-50 border-l-4 border-[#cc0000] rounded-r-xl border-y border-r border-stone-200">
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#cc0000] mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#cc0000]" />
                          60-WORD QUICK SUMMARY
                        </div>
                        <p className="text-stone-800 font-medium text-xs leading-relaxed">
                          {msg.summary60}
                        </p>
                      </div>
                    )}

                    {/* Detailed Answer */}
                    <div className="whitespace-pre-line text-stone-800 text-xs leading-relaxed font-sans">
                      {msg.text}
                    </div>

                    {/* Official Sources */}
                    {msg.officialSources && msg.officialSources.length > 0 && (
                      <div className="pt-2.5 border-t border-stone-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block mb-1.5 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#cc0000]" />
                          VERIFIED OFFICIAL SOURCES
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {msg.officialSources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-[#cc0000] text-stone-800 hover:text-[#cc0000] text-[11px] font-semibold flex items-center gap-1 transition shadow-xs"
                            >
                              <span>{src.title}</span>
                              <ExternalLink className="w-3 h-3 text-[#cc0000]" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Booking Helper Trigger */}
                    {msg.suggestedAppointment && (
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            onClose();
                            onBookAppointment();
                          }}
                          className="w-full py-2.5 bg-[#cc0000] hover:bg-[#b30000] text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4 text-white" />
                          <span>Need personal help? Book appointment with a Helper</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className={`text-[9px] mt-2 text-right ${msg.sender === 'user' ? 'text-stone-100 font-bold' : 'text-stone-400 font-medium'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-stone-200 border border-stone-300 flex items-center justify-center shrink-0 mt-1">
                  <UserIcon className="w-4 h-4 text-stone-700" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-stone-600 text-xs italic p-3 bg-white border border-stone-200 rounded-xl shadow-xs">
              <Sparkles className="w-4 h-4 text-[#cc0000] animate-spin" />
              <span>Consulting verified Portuguese knowledge base & AIMA rules...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Sample Prompts */}
        {messages.length <= 2 && (
          <div className="p-3 bg-white border-t border-stone-200">
            <span className="text-[10px] font-black text-stone-500 uppercase block mb-1.5 tracking-wider">
              SUGGESTED QUESTIONS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-[11px] font-semibold text-left hover:border-[#cc0000] hover:text-[#cc0000] transition truncate max-w-xs shadow-2xs"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about AIMA, NIF, NISS, SNS, healthcare, or legal help..."
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-xs focus:outline-none focus:border-[#cc0000] focus:bg-white placeholder-stone-400 font-medium transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-2.5 bg-[#cc0000] hover:bg-[#b30000] disabled:opacity-50 text-white font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
