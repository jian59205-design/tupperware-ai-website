import React, { useState } from 'react';
import { Settings, Check, Sparkles } from 'lucide-react';
import { BrandSettings } from '../types';

interface BrandSettingsProps {
  brand: BrandSettings;
  setBrand: React.Dispatch<React.SetStateAction<BrandSettings>>;
  darkMode: boolean;
}

export const BrandSettingsView: React.FC<BrandSettingsProps> = ({ brand, setBrand, darkMode }) => {
  const [formData, setFormData] = useState<BrandSettings>(brand);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBrand(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Settings size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Brand Identity & AI Memory</h2>
            <p className="text-xs text-slate-500">
              Configure your business voice, Instagram handle, and core audience details so AI generates accurate content.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`p-6 rounded-3xl border space-y-5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Business Name
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              required
              value={formData.instagramHandle}
              onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Niche / Product Type
            </label>
            <input
              type="text"
              value={formData.targetNiche}
              onChange={(e) => setFormData({ ...formData, targetNiche: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Brand Voice Tone
            </label>
            <select
              value={formData.brandVoice}
              onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="Friendly & Helpful">Friendly & Helpful</option>
              <option value="Luxury & Aesthetic">Luxury & Aesthetic</option>
              <option value="Educational & Informative">Educational & Informative</option>
              <option value="Bold & High-Energy">Bold & High-Energy</option>
            </select>
          </div>
        </div>

        <div className="text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Target Audience Description
          </label>
          <textarea
            rows={3}
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 flex items-center gap-1.5"
          >
            {saved ? <Check size={16} /> : <Sparkles size={16} />}
            <span>{saved ? 'Brand Profile Saved!' : 'Save Brand Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
