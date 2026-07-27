import React, { useState } from 'react';
import { MessageSquare, Sparkles, Copy, Check, RefreshCw, Send, ShieldCheck, Heart, Crown } from 'lucide-react';
import { GeneratedDmReply, BrandSettings } from '../types';

interface DmAssistantProps {
  brand: BrandSettings;
  darkMode: boolean;
}

const PRESET_CATEGORIES = [
  'Price Enquiries',
  'Shipping & Delivery',
  'Bulk & Wholesale',
  'Sizes & Colour Options',
  'Microwave / Dishwasher Safety',
  'Complaints & Returns',
  'Upsell & Cross-sell',
  'Abandoned Cart Follow-up',
];

export const DmAssistant: React.FC<DmAssistantProps> = ({ brand, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('Price Enquiries');
  const [queryText, setQueryText] = useState('Hi! How much is the 7-piece airtight pantry set and do you ship to Canada?');
  const [loading, setLoading] = useState(false);
  const [dmReply, setDmReply] = useState<GeneratedDmReply | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleGenerateDm = async () => {
    setLoading(true);
    setCopiedType(null);

    try {
      const response = await fetch('/api/ai/dm-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          category: selectedCategory,
          brandName: brand.businessName || 'FreshLuxe Kitchen',
          currency: brand.currency?.includes('EUR') ? '€' : '$',
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setDmReply({
          id: `dm-${Date.now()}`,
          category: resData.data.category || selectedCategory,
          userQuery: queryText,
          friendlyVersion: resData.data.friendlyVersion || '',
          professionalVersion: resData.data.professionalVersion || '',
          luxuryVersion: resData.data.luxuryVersion || '',
        });
      }
    } catch (e) {
      console.error('DM response generation failed', e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <MessageSquare size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI DM Assistant</h2>
            <p className="text-xs text-slate-500">
              Generate 3 distinct tone variations (Friendly, Professional, Luxury) for customer DMs in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Buttons & Input Box */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Select Customer Inquiry Category
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat === 'Shipping & Delivery') setQueryText('How long does shipping take to my state and is tracking provided?');
                  else if (cat === 'Bulk & Wholesale') setQueryText('Do you offer bulk wholesale discounts for catering companies or home organisers?');
                  else if (cat === 'Microwave / Dishwasher Safety') setQueryText('Are these containers 100% BPA free and dishwasher safe?');
                  else if (cat === 'Complaints & Returns') setQueryText('My container lid arrived with a broken latch hinge. Can I get a replacement?');
                  else setQueryText('How much is the 7-piece airtight pantry set and do you ship to Canada?');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : darkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Customer Message / Question
          </label>
          <textarea
            rows={3}
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Paste customer DM message here..."
            className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-emerald-500 ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          onClick={handleGenerateDm}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Drafting 3 Response Variations...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate 3 DM Replies</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Tier Response Cards */}
      {dmReply && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Friendly Version */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-rose-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Friendly & Warm</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                  Best for IG DMs
                </span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans">
                {dmReply.friendlyVersion}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(dmReply.friendlyVersion, 'friendly')}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedType === 'friendly' ? <Check size={15} /> : <Copy size={15} />}
              <span>{copiedType === 'friendly' ? 'Copied Friendly!' : 'Copy Friendly Reply'}</span>
            </button>
          </div>

          {/* Professional Version */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-sky-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Professional</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500">
                  Complaints & B2B
                </span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans">
                {dmReply.professionalVersion}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(dmReply.professionalVersion, 'professional')}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedType === 'professional' ? <Check size={15} /> : <Copy size={15} />}
              <span>{copiedType === 'professional' ? 'Copied Professional!' : 'Copy Professional Reply'}</span>
            </button>
          </div>

          {/* Luxury Version */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Crown size={18} className="text-amber-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Luxury Brand</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                  High Ticket
                </span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans">
                {dmReply.luxuryVersion}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(dmReply.luxuryVersion, 'luxury')}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20 transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedType === 'luxury' ? <Check size={15} /> : <Copy size={15} />}
              <span>{copiedType === 'luxury' ? 'Copied Luxury!' : 'Copy Luxury Reply'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
