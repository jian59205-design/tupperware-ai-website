import React, { useState } from 'react';
import { MessageCircle, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { GeneratedCommentReply, BrandSettings } from '../types';

interface CommentRepliesProps {
  brand: BrandSettings;
  darkMode: boolean;
}

const FREQUENT_COMMENTS = [
  'Price?',
  'Available?',
  'Where are you located?',
  'How long delivery?',
  'How do I order?',
  'Is this microwave safe?',
  'Dishwasher safe?',
  'BPA free?',
  'Wholesale?',
];

export const CommentReplies: React.FC<CommentRepliesProps> = ({ brand, darkMode }) => {
  const [selectedComment, setSelectedComment] = useState('Price?');
  const [customComment, setCustomComment] = useState('Price?');
  const [productContext, setProductContext] = useState('Airtight Modular Pantry Set');
  const [loading, setLoading] = useState(false);
  const [replyResult, setReplyResult] = useState<GeneratedCommentReply | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateReply = async (commentToUse?: string) => {
    setLoading(true);
    setCopiedId(null);
    const textToQuery = commentToUse || customComment;

    try {
      const response = await fetch('/api/ai/comment-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: textToQuery,
          productContext,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setReplyResult({
          id: `comm-${Date.now()}`,
          comment: textToQuery,
          suggestedReply: resData.data.suggestedReply || '',
          friendlyReply: resData.data.friendlyReply || '',
          quickReply: resData.data.quickReply || '',
        });
      }
    } catch (e) {
      console.error('Comment reply generation failed', e);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-pink-500/10 text-pink-500">
            <MessageCircle size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI Comment Replies</h2>
            <p className="text-xs text-slate-500">
              Turn casual Instagram post comments into DM sales conversions with instant high-converting replies.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Select Frequent Comments */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Frequent Instagram Comment Triggers
          </label>
          <div className="flex flex-wrap gap-2">
            {FREQUENT_COMMENTS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedComment(c);
                  setCustomComment(c);
                  handleGenerateReply(c);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedComment === c
                    ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                    : darkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                "{c}"
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Custom Comment Text
            </label>
            <input
              type="text"
              value={customComment}
              onChange={(e) => setCustomComment(e.target.value)}
              placeholder="e.g. Does the 7-piece set come with labels?"
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Product Context
            </label>
            <input
              type="text"
              value={productContext}
              onChange={(e) => setProductContext(e.target.value)}
              placeholder="e.g. Airtight Glass Meal Prep Bento Box"
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <button
          onClick={() => handleGenerateReply()}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Generating Comment Replies...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Comment Replies</span>
            </>
          )}
        </button>
      </div>

      {/* Reply Options Display */}
      {replyResult && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Replies for: "{replyResult.comment}"</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Suggested DM Trigger Reply */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                    DM Trigger (High Conversion)
                  </span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 leading-relaxed font-sans">
                  {replyResult.suggestedReply}
                </p>
              </div>
              <button
                onClick={() => copyText(replyResult.suggestedReply, 'sug')}
                className="mt-3 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 flex items-center justify-center gap-1"
              >
                {copiedId === 'sug' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === 'sug' ? 'Copied!' : 'Copy Reply'}</span>
              </button>
            </div>

            {/* Friendly Informative Reply */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500">
                    Detailed & Friendly
                  </span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 leading-relaxed font-sans">
                  {replyResult.friendlyReply}
                </p>
              </div>
              <button
                onClick={() => copyText(replyResult.friendlyReply, 'friendly')}
                className="mt-3 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 flex items-center justify-center gap-1"
              >
                {copiedId === 'friendly' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === 'friendly' ? 'Copied!' : 'Copy Reply'}</span>
              </button>
            </div>

            {/* Quick One-Liner Reply */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                    Quick One-Liner
                  </span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 leading-relaxed font-sans">
                  {replyResult.quickReply}
                </p>
              </div>
              <button
                onClick={() => copyText(replyResult.quickReply, 'quick')}
                className="mt-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center gap-1"
              >
                {copiedId === 'quick' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === 'quick' ? 'Copied!' : 'Copy Reply'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
