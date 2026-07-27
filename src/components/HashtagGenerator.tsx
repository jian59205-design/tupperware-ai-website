import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Check, Bookmark, RefreshCw } from 'lucide-react';
import { BrandSettings } from '../types';

interface HashtagGeneratorProps {
  brand: BrandSettings;
  darkMode: boolean;
}

const CATEGORIES = [
  'Pantry Organisation',
  'Food Storage & Freshness',
  'Meal Prepping & Bentos',
  'Aesthetic Kitchen Lifestyle',
  'BPA Free & Eco Living',
  'Home & Cleaning Hacks',
];

export const HashtagGenerator: React.FC<HashtagGeneratorProps> = ({ brand, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('Pantry Organisation');
  const [region, setRegion] = useState('USA & Global');
  const [loading, setLoading] = useState(false);

  const [hashtagsData, setHashtagsData] = useState<{
    highCompetition: string[];
    mediumCompetition: string[];
    lowCompetition: string[];
  }>({
    highCompetition: [
      '#PantryGoals',
      '#HomeOrganisation',
      '#KitchenInspo',
      '#KitchenDesign',
      '#PantryRestock',
      '#MealPrep',
      '#Tupperware',
      '#StorageSolutions',
      '#AestheticHome',
      '#OrganisedLife',
    ],
    mediumCompetition: [
      '#AirtightContainers',
      '#PantryOrganiser',
      '#GlassBento',
      '#FoodStorageHacks',
      '#KitchenStorage',
      '#FridgeOrganisation',
      '#BPAFreeContainers',
      '#MealPrepContainers',
      '#FreshnessKeeper',
      '#KitchenOrder',
    ],
    lowCompetition: [
      '#FreshLuxeKitchen',
      '#ModularPantrySet',
      '#ShatterproofAcrylicStorage',
      '#ZeroSoggySalads',
      '#PantryReset2026',
      '#CrispProduceKeeper',
      '#OrganisedPantryInspo',
      '#SiliconeSealedContainers',
      '#CleanKitchenHacks',
      '#PantryLabelsInspo',
    ],
  });

  const [copiedGroup, setCopiedGroup] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setCopiedGroup(null);

    try {
      const response = await fetch('/api/ai/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, region }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setHashtagsData({
          highCompetition: resData.data.highCompetition || [],
          mediumCompetition: resData.data.mediumCompetition || [],
          lowCompetition: resData.data.lowCompetition || [],
        });
      }
    } catch (e) {
      console.error('Hashtag generation error', e);
    } finally {
      setLoading(false);
    }
  };

  const copySet = (tags: string[], name: string) => {
    navigator.clipboard.writeText(tags.join(' '));
    setCopiedGroup(name);
    setTimeout(() => setCopiedGroup(null), 2000);
  };

  const copyAll = () => {
    const all = [
      ...hashtagsData.highCompetition,
      ...hashtagsData.mediumCompetition,
      ...hashtagsData.lowCompetition,
    ];
    navigator.clipboard.writeText(all.join(' '));
    setCopiedGroup('all');
    setTimeout(() => setCopiedGroup(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Hash size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Hashtag Suite Generator</h2>
            <p className="text-xs text-slate-500">
              Generate 30 high-ranking hashtags categorized into High, Medium, and Niche competition tiers.
            </p>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Category Focus
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Region / Audience</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. USA, UK, Australia, Worldwide..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Searching Hashtags...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate 30 Hashtags</span>
              </>
            )}
          </button>

          <button
            onClick={copyAll}
            className="px-5 py-3 rounded-2xl font-bold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copiedGroup === 'all' ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedGroup === 'all' ? 'Copied All 30!' : 'Copy All 30'}</span>
          </button>
        </div>
      </div>

      {/* 3 Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Competition */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase">
                High Volume (&gt;500k Posts)
              </span>
              <span className="text-xs text-slate-400 font-bold">{hashtagsData.highCompetition.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {hashtagsData.highCompetition.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => copySet(hashtagsData.highCompetition, 'high')}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-rose-500 hover:bg-rose-600 flex items-center justify-center gap-1.5"
          >
            {copiedGroup === 'high' ? <Check size={15} /> : <Copy size={15} />}
            <span>{copiedGroup === 'high' ? 'Copied High Tier!' : 'Copy High Tier'}</span>
          </button>
        </div>

        {/* Medium Competition */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 uppercase">
                Medium Volume (50k - 500k)
              </span>
              <span className="text-xs text-slate-400 font-bold">{hashtagsData.mediumCompetition.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {hashtagsData.mediumCompetition.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => copySet(hashtagsData.mediumCompetition, 'medium')}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-purple-500 hover:bg-purple-600 flex items-center justify-center gap-1.5"
          >
            {copiedGroup === 'medium' ? <Check size={15} /> : <Copy size={15} />}
            <span>{copiedGroup === 'medium' ? 'Copied Medium Tier!' : 'Copy Medium Tier'}</span>
          </button>
        </div>

        {/* Low / Niche Competition */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 uppercase">
                Niche / Low Competition (&lt;50k)
              </span>
              <span className="text-xs text-slate-400 font-bold">{hashtagsData.lowCompetition.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {hashtagsData.lowCompetition.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => copySet(hashtagsData.lowCompetition, 'low')}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center gap-1.5"
          >
            {copiedGroup === 'low' ? <Check size={15} /> : <Copy size={15} />}
            <span>{copiedGroup === 'low' ? 'Copied Niche Tier!' : 'Copy Niche Tier'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
