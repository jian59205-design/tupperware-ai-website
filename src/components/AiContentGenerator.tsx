import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Eye,
  Calendar,
  FolderHeart,
  RefreshCw,
  Sliders,
  Type,
  Send,
  CheckCircle2,
  Package
} from 'lucide-react';
import { PostType, ToneType, LengthType, CtaStyle, Product, GeneratedContent, BrandSettings } from '../types';

interface AiContentGeneratorProps {
  products: Product[];
  brand: BrandSettings;
  onSaveContent: (content: GeneratedContent) => void;
  onPreviewContent: (content: GeneratedContent) => void;
  onAddToCalendar: (title: string, snippet: string) => void;
  darkMode: boolean;
}

const POST_TYPES: PostType[] = [
  'Instagram Caption',
  'Carousel Caption',
  'Story Caption',
  'Reel Script',
  'Educational Post',
  'Promotional Post',
  'Seasonal Campaign',
  'Holiday Campaign',
  'Customer Testimonial',
  'FAQ Post',
  'Problem/Solution Post',
  'Product Highlight',
  'Lifestyle Post',
  'Before & After Organisation',
  'Launch Post',
];

const TONES: ToneType[] = ['Professional', 'Friendly', 'Luxury', 'Funny', 'Minimal', 'Exciting', 'Educational'];
const LENGTHS: LengthType[] = ['Short', 'Medium', 'Long'];
const CTA_STYLES: CtaStyle[] = ['Soft', 'Strong', 'Sales', 'Urgent'];

export const AiContentGenerator: React.FC<AiContentGeneratorProps> = ({
  products,
  brand,
  onSaveContent,
  onPreviewContent,
  onAddToCalendar,
  darkMode,
}) => {
  const [postType, setPostType] = useState<PostType>('Instagram Caption');
  const [tone, setTone] = useState<ToneType>('Friendly');
  const [length, setLength] = useState<LengthType>('Medium');
  const [ctaStyle, setCtaStyle] = useState<CtaStyle>('Strong');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [topic, setTopic] = useState<string>('How airtight modular containers keep pantry dry goods crisp & pest-free');

  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [includeSeo, setIncludeSeo] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeQuestion, setIncludeQuestion] = useState(true);

  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);
    setSaved(false);
    setScheduled(false);

    const selectedProd = products.find((p) => p.id === selectedProductId);

    try {
      const response = await fetch('/api/ai/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postType,
          tone,
          length,
          ctaStyle,
          includeEmoji,
          includeSeo,
          includeHashtags,
          includeQuestion,
          topic,
          productName: selectedProd?.name || '',
          brandInfo: brand,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const d = resData.data;
        const newContent: GeneratedContent = {
          id: `gen-${Date.now()}`,
          title: d.title || `${postType}: ${topic.substring(0, 30)}`,
          postType,
          tone,
          caption: d.caption || '',
          hook: d.hook || '',
          callToAction: d.callToAction || '',
          hashtags: d.hashtags || ['#PantryGoals', '#Tupperware', '#KitchenInspo'],
          seoKeywords: d.seoKeywords || ['food containers', 'pantry storage'],
          emojis: d.emojis || ['✨', '🔒', '📦'],
          engagementQuestion: d.engagementQuestion || '',
          productId: selectedProductId,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setGeneratedResult(newContent);
      }
    } catch (err) {
      console.error('Generation failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    const fullText = `${generatedResult.caption}\n\n${(generatedResult.hashtags || []).join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!generatedResult) return;
    onSaveContent(generatedResult);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCalendarAdd = () => {
    if (!generatedResult) return;
    onAddToCalendar(generatedResult.title, generatedResult.caption.substring(0, 100));
    setScheduled(true);
    setTimeout(() => setScheduled(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[32px] text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Content Studio</h2>
            <p className="text-xs text-slate-400">
              Generate tailor-made Instagram captions, reel scripts, before/after posts & product highlights.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[32px] space-y-5 text-white">
          {/* Post Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              1. Choose Post Type
            </label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as PostType)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500/50 focus:bg-white/10 transition-all font-medium"
            >
              {POST_TYPES.map((pt) => (
                <option key={pt} value={pt} className="bg-slate-900 text-white">
                  {pt}
                </option>
              ))}
            </select>
          </div>

          {/* Product Library Context Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
              <span>2. Select Product (Optional)</span>
              <span className="text-[10px] text-pink-400 font-bold">Auto-injects specs</span>
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500/50 focus:bg-white/10 transition-all font-medium"
            >
              <option value="" className="bg-slate-900 text-white">-- General / Brand Wide Post --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} (${p.price})
                </option>
              ))}
            </select>
          </div>

          {/* Topic / Angle */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              3. Topic or Marketing Hook
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 5 pantry organisation secrets to double cabinet space..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-pink-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Tone & Length */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneType)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500/50 focus:bg-white/10 transition-all"
              >
                {TONES.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as LengthType)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500/50 focus:bg-white/10 transition-all"
              >
                {LENGTHS.map((l) => (
                  <option key={l} value={l} className="bg-slate-900 text-white">
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CTA Style */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">CTA Style</label>
            <div className="grid grid-cols-2 gap-2">
              {CTA_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setCtaStyle(style)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    ctaStyle === style
                      ? 'bg-pink-600 border-pink-500 text-white shadow-md shadow-pink-900/30'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {style} CTA
                </button>
              ))}
            </div>
          </div>

          {/* Include Toggles */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-xs font-bold text-slate-300 block">Includes & Extras</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeEmoji}
                  onChange={(e) => setIncludeEmoji(e.target.checked)}
                  className="rounded text-pink-500 focus:ring-pink-500 bg-white/5 border-white/20"
                />
                <span>Emoji Suggestions</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeSeo}
                  onChange={(e) => setIncludeSeo(e.target.checked)}
                  className="rounded text-pink-500 focus:ring-pink-500 bg-white/5 border-white/20"
                />
                <span>SEO Keywords</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeHashtags}
                  onChange={(e) => setIncludeHashtags(e.target.checked)}
                  className="rounded text-pink-500 focus:ring-pink-500 bg-white/5 border-white/20"
                />
                <span>Hashtags</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeQuestion}
                  onChange={(e) => setIncludeQuestion(e.target.checked)}
                  className="rounded text-pink-500 focus:ring-pink-500 bg-white/5 border-white/20"
                />
                <span>Engagement Question</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-500 shadow-lg shadow-pink-900/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Crafting AI Caption...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate High-Converting Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Results Display Column (7 cols) */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[32px] flex flex-col justify-between text-white">
          {generatedResult ? (
            <div className="space-y-4">
              {/* Output Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 uppercase tracking-wider border border-pink-500/30">
                    {generatedResult.postType}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">
                    {generatedResult.title}
                  </h3>
                </div>

                <span className="text-xs font-semibold text-slate-400">Tone: {generatedResult.tone}</span>
              </div>

              {/* Hook Spotlight */}
              {generatedResult.hook && (
                <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                    Attention Hook Line
                  </span>
                  <p className="text-xs font-bold text-white">{generatedResult.hook}</p>
                </div>
              )}

              {/* Caption Text Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Full Caption Body
                </span>
                <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {generatedResult.caption}
                </p>
              </div>

              {/* Hashtags Section */}
              {generatedResult.hashtags && generatedResult.hashtags.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Suggested Hashtags ({generatedResult.hashtags.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedResult.hashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Keywords & Engagement Question */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                {generatedResult.seoKeywords && generatedResult.seoKeywords.length > 0 && (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span className="font-bold text-slate-300 block mb-1">SEO Keywords</span>
                    <span className="text-slate-400">{generatedResult.seoKeywords.join(', ')}</span>
                  </div>
                )}
                {generatedResult.engagementQuestion && (
                  <div className="p-3 rounded-2xl bg-indigo-900/30 border border-indigo-500/30 text-indigo-200">
                    <span className="font-bold block mb-1">Engagement Question</span>
                    <span>{generatedResult.engagementQuestion}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Sparkles size={28} />
              </div>
              <h3 className="font-bold text-white">Ready to Generate Content</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Select your post type, pick a product, and hit "Generate High-Converting Copy" to produce instant engaging posts!
              </p>
            </div>
          )}

          {/* Action Bar */}
          {generatedResult && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 mt-6">
              <button
                onClick={() => onPreviewContent(generatedResult)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Eye size={15} />
                <span>Simulate on Instagram</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCalendarAdd}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-sky-300 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 transition-all"
                >
                  {scheduled ? <Check size={14} /> : <Calendar size={14} />}
                  <span>{scheduled ? 'Scheduled!' : 'Schedule'}</span>
                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 transition-all"
                >
                  {saved ? <Check size={14} /> : <FolderHeart size={14} />}
                  <span>{saved ? 'Saved!' : 'Save Folder'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 shadow-md shadow-pink-900/30 active:scale-95 transition-all"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Full Text!' : 'Copy Copy'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
