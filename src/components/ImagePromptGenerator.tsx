import React, { useState } from 'react';
import { Camera, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

interface ImagePromptGeneratorProps {
  darkMode: boolean;
}

const STYLES = [
  'Aesthetic Minimalist Pantry',
  'Luxury Glass Bento Meal Prep',
  'ASMR Fridge Produce Restock',
  'Modern Kitchen Cabinet Organisation',
  'Eco-Friendly Bamboo Lid Containers',
  'Crisp Salad Freshness Close-up',
];

export const ImagePromptGenerator: React.FC<ImagePromptGeneratorProps> = ({ darkMode }) => {
  const [selectedStyle, setSelectedStyle] = useState('Aesthetic Minimalist Pantry');
  const [aspectRatio, setAspectRatio] = useState('4:5 (Instagram Feed)');
  const [lighting, setLighting] = useState('Soft Natural Morning Sunlight');
  const [props, setProps] = useState('Fresh herbs, whole oats, linen table runner, clear acrylic labels');

  const [loading, setLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState(
    'Professional high-end commercial food photography of airtight glass containers filled with colorful organic grains and dried pasta in an aesthetic Scandinavian pantry. Soft natural morning sunlight filtering through, clean minimalist wooden shelving, 8k resolution, ultra-detailed glass reflections, Hasselblad medium format camera --ar 4:5'
  );
  const [copied, setCopied] = useState(false);

  const handleGeneratePrompt = async () => {
    setLoading(true);
    setCopied(false);

    setTimeout(() => {
      const promptText = `Professional commercial studio product photography of a ${selectedStyle.toLowerCase()} featuring premium airtight food storage containers with ${props}. ${lighting}, hyper-realistic glass transparency, clean editorial aesthetic, shot on 85mm lens f/1.8, 8k --ar ${aspectRatio.split(' ')[0]}`;
      setGeneratedPrompt(promptText);
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Camera size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI Image Prompt Generator</h2>
            <p className="text-xs text-slate-500">
              Generate commercial-grade Midjourney & Imagen prompts for high-end kitchen product photography.
            </p>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Visual Scene Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Aspect Ratio
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="4:5 (Instagram Feed)">4:5 (Instagram Feed)</option>
              <option value="9:16 (Instagram Reel / Story)">9:16 (Instagram Reel / Story)</option>
              <option value="1:1 (Square Grid)">1:1 (Square Grid)</option>
              <option value="16:9 (Landscape Banner)">16:9 (Landscape Banner)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Lighting & Vibe
            </label>
            <input
              type="text"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              placeholder="e.g. Soft morning light, studio editorial key light..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Styling Props & Details
            </label>
            <input
              type="text"
              value={props}
              onChange={(e) => setProps(e.target.value)}
              placeholder="e.g. Fresh rosemary, marble countertop..."
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-2 focus:ring-rose-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <button
          onClick={handleGeneratePrompt}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Synthesizing Image Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate AI Image Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Result Prompt Box */}
      {generatedPrompt && (
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase">
              Midjourney / DALL-E / Gemini Prompt
            </span>
            <button
              onClick={handleCopy}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
            </button>
          </div>

          <p className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-mono leading-relaxed select-all">
            {generatedPrompt}
          </p>
        </div>
      )}
    </div>
  );
};
