import React, { useState } from 'react';
import { NewsArticle, EditorialStatus } from '../../types';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  Languages, 
  CheckCircle2, 
  FileText, 
  Link, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Share2, 
  Eye, 
  Save,
  Wand2,
  AlertCircle
} from 'lucide-react';

interface GeminiAINewsEditorProps {
  onSaveArticle: (article: Partial<NewsArticle>) => void;
  onCancel: () => void;
  initialArticle?: NewsArticle | null;
}

export const GeminiAINewsEditor: React.FC<GeminiAINewsEditorProps> = ({ onSaveArticle, onCancel, initialArticle }) => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [rawSourceText, setRawSourceText] = useState('');
  const [category, setCategory] = useState('AIMA');
  const [generating, setGenerating] = useState(false);
  const [transforming, setTransforming] = useState(false);

  // Editable Form State
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [summary60, setSummary60] = useState(initialArticle?.summary60 || '');
  const [content, setContent] = useState(initialArticle?.content || '');
  const [tags, setTags] = useState<string[]>(initialArticle?.tags || ['AIMA', 'Residency']);
  const [tagInput, setTagInput] = useState('');
  const [authorName, setAuthorName] = useState(initialArticle?.authorName || 'Editorial Team');
  const [status, setStatus] = useState<EditorialStatus>(initialArticle?.status || 'DRAFT');
  const [officialSourceUrl, setOfficialSourceUrl] = useState(initialArticle?.officialSourceUrl || 'https://aima.gov.pt');
  const [sourceName, setSourceName] = useState(initialArticle?.sourceName || 'AIMA Official Portal');
  const [affectedPeople, setAffectedPeople] = useState(initialArticle?.affectedPeople || '');
  const [requiredActions, setRequiredActions] = useState(initialArticle?.requiredActions || '');
  const [seoTitle, setSeoTitle] = useState(initialArticle?.seoTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialArticle?.metaDescription || '');
  const [suggestedSocialPost, setSuggestedSocialPost] = useState(initialArticle?.suggestedSocialPost || '');
  const [verifiedByEditor, setVerifiedByEditor] = useState(initialArticle?.verifiedByEditor || false);

  // Audit trail storage
  const [aiDraftSnapshot, setAiDraftSnapshot] = useState<string>('');

  const handleGenerateWithAI = async () => {
    if (!rawSourceText && !sourceUrl) {
      alert('Please paste a source URL or raw news/government update text.');
      return;
    }
    setGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceUrl, rawSourceText, category })
      });

      if (res.ok) {
        const data = await res.json();
        setTitle(data.headline || '');
        setSummary60(data.summary60 || '');
        setContent(data.fullDraft || '');
        if (data.tags) setTags(data.tags);
        if (data.officialSourceUrl) setOfficialSourceUrl(data.officialSourceUrl);
        if (data.officialSourceTitle) setSourceName(data.officialSourceTitle);
        setAffectedPeople(data.whoIsAffected || '');
        setRequiredActions(data.whatActionToTake || '');
        setSeoTitle(data.seoTitle || '');
        setMetaDescription(data.metaDescription || '');
        setSuggestedSocialPost(data.suggestedSocialPost || '');
        setAiDraftSnapshot(data.fullDraft || '');
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate news with AI.');
    } finally {
      setGenerating(false);
    }
  };

  const handleAITransform = async (action: 'rewrite' | 'summary60' | 'shorten' | 'expand' | 'simplify' | 'translate' | 'factcheck', targetLang: string = 'en') => {
    if (!content) return;
    setTransforming(true);

    try {
      const res = await fetch('/api/ai/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, text: content, targetLang })
      });

      if (res.ok) {
        const data = await res.json();
        if (action === 'summary60') {
          setSummary60(data.result);
        } else {
          setContent(data.result);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTransforming(false);
    }
  };

  const handleSave = (finalStatus: EditorialStatus) => {
    if (!verifiedByEditor && (finalStatus === 'PUBLISHED' || finalStatus === 'APPROVED')) {
      alert('Please check the editor verification box confirming you have reviewed facts before approving/publishing.');
      return;
    }

    onSaveArticle({
      id: initialArticle?.id,
      title,
      summary60,
      content,
      category,
      tags,
      authorName,
      status: finalStatus,
      sourceName,
      officialSourceUrl,
      affectedPeople,
      requiredActions,
      seoTitle,
      metaDescription,
      suggestedSocialPost,
      verifiedByEditor,
      imageUrl: initialArticle?.imageUrl || 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80'
    });
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-white">Gemini AI News Generator & CMS Editor</h2>
            <p className="text-xs text-stone-400">
              Paste source URL/text → AI Analysis → Editor Review & Fact Check → Editorial Approval → Publish
            </p>
          </div>
        </div>

        <button onClick={onCancel} className="text-stone-400 hover:text-white text-xs font-bold">
          ✕ Close
        </button>
      </div>

      {/* Step 1: AI Analysis Input Box */}
      <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            1. Create News with Gemini AI (Source Analysis)
          </span>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-stone-900 text-stone-200 border border-stone-700 text-xs rounded-lg px-3 py-1 focus:outline-none"
          >
            <option value="AIMA">AIMA & Residency</option>
            <option value="Immigration">Immigration Updates</option>
            <option value="Healthcare">Healthcare & SNS</option>
            <option value="Jobs">Jobs & Employment</option>
            <option value="Education">Education & PLA</option>
            <option value="Legal">Legal & Finanças</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="Source URL (e.g. https://aima.gov.pt/news/123)"
            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-purple-500"
          />

          <input
            type="text"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder="Official Source Title (e.g. AIMA Official Press Portal)"
            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <textarea
          rows={3}
          value={rawSourceText}
          onChange={(e) => setRawSourceText(e.target.value)}
          placeholder="Paste raw news text, government decree excerpt, or press release here..."
          className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none focus:border-purple-500"
        />

        <button
          onClick={handleGenerateWithAI}
          disabled={generating}
          className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing Source Facts & Generating Draft with Gemini...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 text-amber-300" />
              <span>Analyze Source & Generate News Draft with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Step 2: Editor AI Transformation Bar */}
      <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-bold text-stone-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          AI Actions:
        </span>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleAITransform('summary60')}
            disabled={transforming}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700"
          >
            60 Words
          </button>
          <button
            onClick={() => handleAITransform('simplify')}
            disabled={transforming}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700"
          >
            Simplify
          </button>
          <button
            onClick={() => handleAITransform('shorten')}
            disabled={transforming}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700"
          >
            Shorten
          </button>
          <button
            onClick={() => handleAITransform('expand')}
            disabled={transforming}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700"
          >
            Expand Context
          </button>
          <button
            onClick={() => handleAITransform('factcheck')}
            disabled={transforming}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700"
          >
            Fact Check
          </button>
          <button
            onClick={() => handleAITransform('translate', 'bn')}
            disabled={transforming}
            className="px-2.5 py-1 bg-purple-950 text-purple-300 rounded border border-purple-800"
          >
            Translate BN
          </button>
          <button
            onClick={() => handleAITransform('translate', 'hi')}
            disabled={transforming}
            className="px-2.5 py-1 bg-purple-950 text-purple-300 rounded border border-purple-800"
          >
            Translate HI
          </button>
        </div>
      </div>

      {/* Step 3: Editor Content Form */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Article Headline</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 font-bold focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* 60-Word Summary Box */}
        <div>
          <label className="block text-xs font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            60-Word Summary (Mandatory Reader Summary)
          </label>
          <textarea
            rows={2}
            value={summary60}
            onChange={(e) => setSummary60(e.target.value)}
            className="w-full bg-stone-950 border border-emerald-900/60 rounded-xl p-3 text-xs text-emerald-200 font-medium focus:outline-none"
          />
        </div>

        {/* Full Draft */}
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Full Article Draft</label>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs text-stone-200 leading-relaxed focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Key Facts & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Who Is Affected?</label>
            <input
              type="text"
              value={affectedPeople}
              onChange={(e) => setAffectedPeople(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-blue-400 uppercase mb-1">What Action Readers Must Take</label>
            <input
              type="text"
              value={requiredActions}
              onChange={(e) => setRequiredActions(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
            />
          </div>
        </div>

        {/* SEO Metadata & Social */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
          <span className="text-xs font-bold text-stone-400 uppercase">SEO & Social Media Preview</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="SEO Title"
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200"
            />
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200"
            />
          </div>
          <input
            type="text"
            value={suggestedSocialPost}
            onChange={(e) => setSuggestedSocialPost(e.target.value)}
            placeholder="Suggested Social Media Post text"
            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200"
          />
        </div>

        {/* Verification Checkbox */}
        <div className="p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-3">
          <input
            type="checkbox"
            id="editorVerify"
            checked={verifiedByEditor}
            onChange={(e) => setVerifiedByEditor(e.target.checked)}
            className="w-4 h-4 text-emerald-500 rounded bg-stone-900 border-stone-700"
          />
          <label htmlFor="editorVerify" className="text-xs text-emerald-200 font-bold cursor-pointer">
            Editor Verification: I confirm that official source, AIMA rules, dates, and facts have been manually reviewed and verified before publication.
          </label>
        </div>
      </div>

      {/* Action Workflow Buttons */}
      <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-xs font-bold text-stone-400 hover:text-stone-200"
        >
          Cancel
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave('DRAFT')}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('APPROVED')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl shadow"
          >
            Approve Article
          </button>
          <button
            type="button"
            onClick={() => handleSave('PUBLISHED')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow transition"
          >
            Publish Now
          </button>
        </div>
      </div>
    </div>
  );
};
