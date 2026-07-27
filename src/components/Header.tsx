import React from 'react';
import { Sparkles, Moon, Sun, Instagram, ExternalLink, Plus } from 'lucide-react';
import { TabType, BrandSettings } from '../types';

interface HeaderProps {
  currentTab?: TabType | string;
  activeTab?: TabType | string;
  brand: BrandSettings;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onQuickGenerate?: () => void;
  onNewContentClick?: () => void;
  onOpenIgPreview?: () => void;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Hello, Sarah! 👋',
    subtitle: 'Your kitchen organization store is trending +12% this week.',
  },
  'ai-content': {
    title: 'AI Content Studio',
    subtitle: 'Generate high-converting Instagram captions, carousels, and stories',
  },
  'reel-generator': {
    title: 'AI Reel Script Generator',
    subtitle: 'Viral scene-by-scene script builder with hooks, camera angles & voiceover',
  },
  calendar: {
    title: 'Content Calendar',
    subtitle: 'Plan, drag-and-drop, and color-code 30 days of Instagram posts',
  },
  'content-calendar': {
    title: 'Content Calendar',
    subtitle: 'Plan, drag-and-drop, and color-code 30 days of Instagram posts',
  },
  'dm-assistant': {
    title: 'AI DM Assistant',
    subtitle: 'Friendly, Professional, and Luxury response generator for customer DMs',
  },
  'comment-replies': {
    title: 'Comment Reply Generator',
    subtitle: 'Instant high-converting responses to price, shipping, and product questions',
  },
  'campaign-builder': {
    title: 'Marketing Campaign Builder',
    subtitle: 'Complete 30-day multi-channel roadmaps, launch funnels & flash sales',
  },
  'ad-generator': {
    title: 'AI Ad Generator',
    subtitle: 'Meta, Instagram, and Facebook ad headlines, primary copy & CTA variations',
  },
  hashtags: {
    title: 'Hashtag Suite Generator',
    subtitle: 'High, medium, and low competition hashtags for food container & home niches',
  },
  'hashtag-generator': {
    title: 'Hashtag Suite Generator',
    subtitle: 'High, medium, and low competition hashtags for food container & home niches',
  },
  'product-library': {
    title: 'Product Library',
    subtitle: 'Catalog your container sets & generate full SEO product descriptions',
  },
  personas: {
    title: 'Customer Personas',
    subtitle: 'Deep buyer insights, pain points, objections & targeted hooks',
  },
  'customer-personas': {
    title: 'Customer Personas',
    subtitle: 'Deep buyer insights, pain points, objections & targeted hooks',
  },
  analytics: {
    title: 'Analytics & Insights',
    subtitle: 'Predictive engagement, hashtag reach metrics & campaign breakdown',
  },
  'image-prompts': {
    title: 'Image Prompt Studio',
    subtitle: 'Generative AI prompts for lifestyle kitchen photography & product mockups',
  },
  'image-prompt': {
    title: 'Image Prompt Studio',
    subtitle: 'Generative AI prompts for lifestyle kitchen photography & product mockups',
  },
  coach: {
    title: 'AI Marketing Strategist',
    subtitle: 'Personalized growth coach & instagram audit for container brands',
  },
  'marketing-coach': {
    title: 'AI Marketing Strategist',
    subtitle: 'Personalized growth coach & instagram audit for container brands',
  },
  'brand-settings': {
    title: 'Brand Settings',
    subtitle: 'Configure logo, brand colors, fonts, handles, currency & delivery regions',
  },
  'saved-content': {
    title: 'Saved Content & Folders',
    subtitle: 'Organize favorite posts, captions, scripts, and multi-format exports',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeTab,
  brand,
  darkMode,
  setDarkMode,
  onQuickGenerate,
  onNewContentClick,
}) => {
  const selectedTab = activeTab || currentTab || 'dashboard';
  const currentInfo = TAB_TITLES[selectedTab] || {
    title: `Hello, ${brand?.ownerName || 'Sarah'}! 👋`,
    subtitle: 'Your kitchen organization store is trending +12% this week.',
  };

  const handleAction = onNewContentClick || onQuickGenerate;

  return (
    <header className="h-20 border-b border-white/5 px-6 md:px-10 flex items-center justify-between backdrop-blur-md bg-black/30 text-white z-20 transition-all">
      {/* Header Greeting / Title */}
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
          {currentInfo.title}
        </h1>
        <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Instagram Link Badge */}
        <a
          href={`https://instagram.com/${brand?.instagramUsername?.replace('@', '') || 'freshluxekitchen'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 transition-all"
        >
          <Instagram size={14} className="text-pink-400" />
          <span>{brand?.instagramUsername || '@tupperware.ai'}</span>
          <ExternalLink size={12} className="opacity-60" />
        </a>

        {/* Create Content CTA Button */}
        {handleAction && (
          <button
            onClick={handleAction}
            className="bg-pink-600 hover:bg-pink-500 text-white px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-pink-900/30 transition-all active:scale-95 flex items-center gap-2"
          >
            <Sparkles size={15} />
            <span>+ Create Content</span>
          </button>
        )}

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all"
          title={darkMode ? 'Switch Theme' : 'Switch Theme'}
        >
          {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-300" />}
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center font-bold text-xs text-pink-400 shadow-sm">
          {brand?.businessName ? brand.businessName.charAt(0) : 'S'}
        </div>
      </div>
    </header>
  );
};

