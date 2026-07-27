import React, { useState } from 'react';
import { Target, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { AdVariation, BrandSettings } from '../types';

interface AdGeneratorProps {
  brand: BrandSettings;
  darkMode: boolean;
}

export const AdGenerator: React.FC<AdGeneratorProps> = ({ brand, darkMode }) => {
  const [productName, setProductName] = useState('7-Piece Airtight Modular Pantry Container Set');
  const [offer, setOffer] = useState('Buy 2 Get 1 FREE + Free Shipping Today');
  const [loading, setLoading] = useState(false);
  const [adVariations, setAdVariations] = useState<AdVariation[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerateAds = async () => {
    setLoading(true);
    setCopiedIdx(null);

    try {
      const response = await fetch('/api/ai/ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          brandName: brand.businessName || 'FreshLuxe Kitchen',
          offer,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setAdVariations(resData.data.variations || []);
      }
    } catch (e) {
      console.error('Ad generation failed', e);
    } finally {
      setLoading(false);
    }
  };

  const copyAd = (ad: AdVariation, idx: number) => {
    const text = `HEADLINE:\n${ad.headline}\n\nPRIMARY TEXT:\n${ad.primaryText}\n\nDESCRIPTION:\n${ad.description}\n\nCTA BUTTON:\n${ad.ctaText}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Target size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI Meta & Instagram Ad Generator</h2>
            <p className="text-xs text-slate-500">
              Generate high-ROAS headlines, primary text, descriptions & CTA button recommendations for Facebook & Instagram Ads.
            </p>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Featured Product / Container Set
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. 3-Compartment Glass Bento Set..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Special Offer / Hook Angle
            </label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="e.g. 20% OFF Code: PREP20..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <button
          onClick={handleGenerateAds}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Generating High-Converting Ad Copy...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Ad Copy Variations</span>
            </>
          )}
        </button>
      </div>

      {/* Ad Variations Display */}
      {adVariations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adVariations.map((ad, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase">
                    Ad Angle #{idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{ad.targetAngle}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Headline</span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{ad.headline}</h4>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Primary Text</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 leading-relaxed whitespace-pre-wrap">
                    {ad.primaryText}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Description</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{ad.description}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">CTA Button</span>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 font-bold">
                      {ad.ctaText}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => copyAd(ad, idx)}
                className="mt-5 w-full py-2.5 rounded-xl font-bold text-xs text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedIdx === idx ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedIdx === idx ? 'Copied Full Ad Copy!' : 'Copy Ad Copy'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
