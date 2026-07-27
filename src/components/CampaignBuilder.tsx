import React, { useState } from 'react';
import { TrendingUp, Sparkles, Copy, Check, Mail, MessageSquare, Calendar, RefreshCw } from 'lucide-react';
import { GeneratedCampaign, BrandSettings } from '../types';

interface CampaignBuilderProps {
  brand: BrandSettings;
  darkMode: boolean;
}

const CAMPAIGN_TYPES = [
  '30-Day Growth',
  'Product Launch',
  'Holiday Special',
  'Flash Sale',
  'Clearance',
  'Giveaway',
  'Referral',
  'Bundle Offer',
  'Back to School',
  'Mother\'s Day',
  'Black Friday',
] as const;

export const CampaignBuilder: React.FC<CampaignBuilderProps> = ({ brand, darkMode }) => {
  const [campaignType, setCampaignType] = useState<GeneratedCampaign['type']>('30-Day Growth');
  const [goal, setGoal] = useState('Sell 200 Airtight Modular Sets ($10,000 revenue) in 30 days');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<GeneratedCampaign | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);

  const handleBuildCampaign = async () => {
    setLoading(true);
    setCopiedEmail(false);
    setCopiedWa(false);

    try {
      const response = await fetch('/api/ai/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignType,
          durationDays,
          goal,
          brandName: brand.businessName || 'FreshLuxe Kitchen',
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const d = resData.data;
        setCampaign({
          id: `camp-${Date.now()}`,
          name: d.name || `${campaignType} Campaign`,
          type: campaignType,
          durationDays,
          goal,
          dailyContentSchedule: d.dailyContentSchedule || [],
          emailCopy: d.emailCopy || '',
          whatsappMessages: d.whatsappMessages || [],
          dmSequence: d.dmSequence || [],
          createdAt: new Date().toISOString().split('T')[0],
        });
      }
    } catch (e) {
      console.error('Campaign creation error', e);
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    if (!campaign) return;
    navigator.clipboard.writeText(campaign.emailCopy);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyWhatsApp = () => {
    if (!campaign) return;
    navigator.clipboard.writeText(campaign.whatsappMessages.join('\n\n'));
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <TrendingUp size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Marketing Campaign Builder</h2>
            <p className="text-xs text-slate-500">
              Generate end-to-end multi-channel campaigns (Reels, Stories, Meta Ads, Email copy, WhatsApp broadcasts & DMs).
            </p>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Campaign Type
            </label>
            <select
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value as any)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {CAMPAIGN_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type} Campaign
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Campaign Primary Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Sell 200 Airtight Sets in 30 days..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <button
          onClick={handleBuildCampaign}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Architecting Campaign Blueprint...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Full Campaign Roadmap</span>
            </>
          )}
        </button>
      </div>

      {/* Campaign Results */}
      {campaign && (
        <div className="space-y-6">
          {/* Campaign Overview Card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase tracking-wider">
                  {campaign.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{campaign.name}</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Duration: {campaign.durationDays} Days</span>
            </div>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 font-medium">Goal: {campaign.goal}</p>
          </div>

          {/* Daily Roadmap Schedule */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-rose-500" />
              <span>Campaign Daily Content Roadmap</span>
            </h4>

            <div className="space-y-3">
              {campaign.dailyContentSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500 text-white font-mono">
                        Day {item.day}
                      </span>
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Topic: {item.topic}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    "{item.captionSnippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Email & WhatsApp Copy Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Copy Card */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-rose-500" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Campaign Email Copy</h4>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                  >
                    {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {campaign.emailCopy}
                </p>
              </div>
            </div>

            {/* WhatsApp Broadcast Card */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-emerald-500" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">WhatsApp Broadcast Messages</h4>
                  </div>
                  <button
                    onClick={copyWhatsApp}
                    className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 flex items-center gap-1"
                  >
                    {copiedWa ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedWa ? 'Copied' : 'Copy Broadcast'}</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {campaign.whatsappMessages.map((msg, idx) => (
                    <p
                      key={idx}
                      className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 leading-relaxed"
                    >
                      {msg}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
