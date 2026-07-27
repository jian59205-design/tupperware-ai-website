import React, { useState } from 'react';
import { Video, Sparkles, Copy, Check, Music, Camera, Mic, Film, RefreshCw } from 'lucide-react';
import { GeneratedReel, ToneType, BrandSettings } from '../types';

interface ReelGeneratorProps {
  brand: BrandSettings;
  darkMode: boolean;
}

export const ReelGenerator: React.FC<ReelGeneratorProps> = ({ brand, darkMode }) => {
  const [topic, setTopic] = useState('3 Pantry Organisation Hacks to Stop Soggy Salad & Food Waste');
  const [tone, setTone] = useState<ToneType>('Exciting');
  const [loading, setLoading] = useState(false);
  const [reelResult, setReelResult] = useState<GeneratedReel | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const handleGenerateReel = async () => {
    setLoading(true);
    setCopiedScript(false);
    setCopiedCaption(false);

    try {
      const response = await fetch('/api/ai/reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          tone,
          brandName: brand.businessName || 'FreshLuxe Kitchen',
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const d = resData.data;
        setReelResult({
          id: `reel-${Date.now()}`,
          title: d.title || `Reel Script: ${topic}`,
          hook: d.hook || 'Stop doing soggy meal prep!',
          scenes: d.scenes || [],
          musicSuggestion: d.musicSuggestion || 'Aesthetic Upbeat Lofi Beat',
          endingCta: d.endingCta || 'Tap link in bio to shop pantry sets!',
          voiceoverScript: d.voiceoverScript || '',
          caption: d.caption || '',
          hashtags: d.hashtags || ['#ReelInspo', '#PantryOrganisation', '#TupperwareHacks'],
          createdAt: new Date().toISOString().split('T')[0],
        });
      }
    } catch (e) {
      console.error('Reel generation error:', e);
    } finally {
      setLoading(false);
    }
  };

  const copyVoiceover = () => {
    if (!reelResult) return;
    navigator.clipboard.writeText(reelResult.voiceoverScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyCaption = () => {
    if (!reelResult) return;
    navigator.clipboard.writeText(`${reelResult.caption}\n\n${reelResult.hashtags.join(' ')}`);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500 to-rose-500 text-white shadow-md shadow-rose-500/20">
            <Video size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI Reel Generator</h2>
            <p className="text-xs text-slate-500">
              Generate scene-by-scene viral Instagram Reel scripts with hooks, camera angles, voiceovers & b-roll.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Reel Concept / Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. ASMR Produce Restock in Glass Containers..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneType)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="Exciting">Exciting & Fast-Paced</option>
              <option value="Friendly">Friendly & Conversational</option>
              <option value="Luxury">Luxury & Aesthetic ASMR</option>
              <option value="Educational">Educational Step-by-Step</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateReel}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Directing Scene Script...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Viral Reel Script</span>
            </>
          )}
        </button>
      </div>

      {/* Reel Script Results */}
      {reelResult && (
        <div className="space-y-6">
          {/* Reel High-level overview card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 uppercase tracking-wider">
                  Instagram Reel Script
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{reelResult.title}</h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <Music size={14} className="text-rose-500" />
                  <span>{reelResult.musicSuggestion}</span>
                </span>
              </div>
            </div>

            {/* Hook Line Card */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-purple-500/10 border border-rose-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
                Visual & Audio Hook (First 3 Seconds)
              </span>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">"{reelResult.hook}"</p>
            </div>
          </div>

          {/* Scene-by-Scene Script Table */}
          <div className={`p-6 rounded-3xl border overflow-x-auto custom-scrollbar ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Film size={18} className="text-rose-500" />
              <span>Scene-by-Scene Breakdown ({reelResult.scenes.length} Scenes)</span>
            </h4>

            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3 w-16">Scene</th>
                  <th className="py-2.5 px-3 w-24">Timeframe</th>
                  <th className="py-2.5 px-3">Visual Action</th>
                  <th className="py-2.5 px-3 w-36">Camera Angle</th>
                  <th className="py-2.5 px-3">Voiceover / Audio</th>
                  <th className="py-2.5 px-3">On-Screen Text</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {reelResult.scenes.map((sc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-rose-500">#{sc.sceneNumber}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono">{sc.timeframe}</td>
                    <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-medium">{sc.visual}</td>
                    <td className="py-3 px-3 text-slate-500 flex items-center gap-1">
                      <Camera size={12} className="text-slate-400 shrink-0" />
                      <span>{sc.cameraAngle}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{sc.voiceoverText}</td>
                    <td className="py-3 px-3 font-semibold text-rose-500">{sc.onScreenText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Voiceover Script & Reel Caption */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Voiceover Box */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mic size={18} className="text-rose-500" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Voiceover Script</h4>
                  </div>
                  <button
                    onClick={copyVoiceover}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                  >
                    {copiedScript ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedScript ? 'Copied Script' : 'Copy Script'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans">
                  {reelResult.voiceoverScript}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Ending CTA:</span>
                {reelResult.endingCta}
              </div>
            </div>

            {/* Reel Caption Box */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Reel Caption & Hashtags</h4>
                  <button
                    onClick={copyCaption}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                  >
                    {copiedCaption ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCaption ? 'Copied Caption' : 'Copy Caption'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{reelResult.caption}</p>
                  <p className="text-xs font-medium text-rose-500">{reelResult.hashtags.join(' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
