import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  FileText,
  Video,
  Calendar,
  MessageSquare,
  TrendingUp,
  Package,
  Users,
  Settings,
  Bot,
  ArrowRight,
  Zap,
  HelpCircle,
  Copy,
  ChevronRight,
  Flame,
  LayoutDashboard
} from 'lucide-react';

interface UserManualProps {
  setActiveTab?: (tab: string) => void;
  darkMode?: boolean;
}

interface ManualSection {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
  steps: { title: string; detail: string }[];
  proTips: string[];
  actionTab?: string;
  actionLabel?: string;
}

export const UserManual: React.FC<UserManualProps> = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const manualSections: ManualSection[] = [
    {
      id: 'quick-start',
      title: '1. Quick Start & Brand Setup',
      category: 'getting-started',
      icon: Settings,
      description: 'Configure your business profile, tone of voice, and Instagram handle so every piece of generated content matches your brand identity perfectly.',
      steps: [
        { title: 'Configure Business Name & Handle', detail: 'Navigate to "Brand Settings" in the left sidebar. Input your brand name (e.g. FreshLuxe Kitchen) and Instagram handle (@freshluxekitchen).' },
        { title: 'Define Primary Tone of Voice', detail: 'Select your default brand personality (e.g. Friendly & Enthusiastic, Professional, Premium Luxury, or Direct & Punchy).' },
        { title: 'Set Core Value Propositions', detail: 'List key product benefits such as "Airtight seal", "BPA-Free materials", "100% Leakproof", and "Shatterproof durability".' }
      ],
      proTips: [
        'Setting your brand settings first ensures all AI generators produce copy tailored to your specific product catalog automatically.'
      ],
      actionTab: 'brand-settings',
      actionLabel: 'Go to Brand Settings'
    },
    {
      id: 'ai-content',
      title: '2. AI Content Studio & Captions',
      category: 'content-creation',
      icon: FileText,
      badge: 'Core Feature',
      description: 'Generate high-converting Instagram captions, attention-grabbing hooks, SEO keywords, and tailored hashtags in seconds.',
      steps: [
        { title: 'Choose Post Type & Product', detail: 'Select post format (e.g. Instagram Caption, Product Highlight, Before & After, Reel Caption) and select an item from your Product Library.' },
        { title: 'Enter Hook or Topic', detail: 'Type a short topic like "5 pantry organization hacks" or "Mother’s Day gift guide for organized kitchens".' },
        { title: 'Customize Tone & CTA Style', detail: 'Choose your desired length, call-to-action style (DM Keyword, Save/Share, Link in Bio), and click "Generate Copy".' },
        { title: 'Simulate on Instagram', detail: 'Click "Simulate on Instagram" to preview exactly how your caption and image will look in a live Instagram feed!' }
      ],
      proTips: [
        'Use the "Comment Keyword CTA" option to trigger DM automations whenever followers comment a target word on your post.',
        'Save generated posts directly to your Saved Folders or schedule them directly to your Content Calendar.'
      ],
      actionTab: 'ai-content',
      actionLabel: 'Open AI Content Studio'
    },
    {
      id: 'reel-generator',
      title: '3. Viral Reel Generator',
      category: 'content-creation',
      icon: Video,
      badge: 'Viral',
      description: 'Create complete 15-30 second viral Instagram Reel concepts including audio hooks, shot-by-shot visual instructions, and spoken voiceover scripts.',
      steps: [
        { title: 'Select Reel Theme', detail: 'Choose from viral formats like "Pantry Transformation ASMR", "Water Tightness Test", "Snack Pack Prep", or "Organization Before/After".' },
        { title: 'Generate Script & Visual Breakdown', detail: 'The AI builds a timing chart (0-3s Hook, 3-10s Demonstration, 10-25s Value Add, 25-30s CTA) with camera angle tips.' },
        { title: 'Copy Voiceover & Text Overlays', detail: 'Use the one-click copy buttons to copy on-screen text overlays or spoken audio narration into Instagram or CapCut.' }
      ],
      proTips: [
        'Reels featuring satisfying snap/click sound effects of airtight container lids achieve 3x higher completion rates on Instagram!'
      ],
      actionTab: 'reel-generator',
      actionLabel: 'Generate Reel Concept'
    },
    {
      id: 'content-calendar',
      title: '4. Content Calendar & Scheduling',
      category: 'planning',
      icon: Calendar,
      description: 'Plan your weekly posting cadence, view upcoming national food & kitchen holidays, and track scheduled vs published content.',
      steps: [
        { title: 'View Calendar Grid', detail: 'Inspect your scheduled posts across the month. Color-coded badges indicate Reels, Carousels, Stories, and Sales Campaigns.' },
        { title: 'Add New Post Event', detail: 'Click any date cell or click "Schedule Event" to input a post title, snippet, and posting time.' },
        { title: 'Incorporate Kitchen Holidays', detail: 'Check the "Upcoming Holidays" sidebar widget (e.g. National Meal Prep Day) and click "Build Holiday Campaign" to auto-generate seasonal posts.' }
      ],
      proTips: [
        'Aim for a goal of 5-7 posts per week to maximize Instagram algorithm reach for kitchen products.'
      ],
      actionTab: 'calendar',
      actionLabel: 'Open Content Calendar'
    },
    {
      id: 'dm-and-comments',
      title: '5. DM & Comment Automation',
      category: 'sales-automation',
      icon: MessageSquare,
      description: 'Convert comments and direct messages into instant sales using AI auto-replies and automated DM sales funnels.',
      steps: [
        { title: 'Set Up DM Keyword Triggers', detail: 'In "DM Assistant", create triggers like "PANTRY" or "CONTAINER". When followers DM or comment this word, an instant response with a discount link is sent.' },
        { title: 'Generate Friendly Comment Responses', detail: 'Use "Comment Replies" to turn casual praise like "Where can I buy these?" into helpful, engaging customer responses.' }
      ],
      proTips: [
        'Asking users to "Comment PANTRY for 15% off" boosts comment count, signals engagement to Instagram, and closes sales in DMs!'
      ],
      actionTab: 'dm-assistant',
      actionLabel: 'Setup DM Automation'
    },
    {
      id: 'product-and-personas',
      title: '6. Product Library & Customer Personas',
      category: 'brand-management',
      icon: Package,
      description: 'Manage your product catalog SKUs and target audience avatars for hyper-personalized marketing copy.',
      steps: [
        { title: 'Add Product SKUs', detail: 'In "Product Library", add products with names, prices, key features (e.g. 7-Piece Airtight Container Set) and unique selling points.' },
        { title: 'Target Buyer Personas', detail: 'In "Customer Personas", review target buyers like "The Busy Meal Prep Mom", "The Eco-Conscious Homeowner", or "The Organized Pantry Enthusiast".' }
      ],
      proTips: [
        'When generating captions, selecting a specific product auto-populates all material specs, pricing, and key features into the prompt!'
      ],
      actionTab: 'product-library',
      actionLabel: 'View Product Library'
    },
    {
      id: 'marketing-coach',
      title: '7. AI Marketing Coach',
      category: 'strategy',
      icon: Bot,
      badge: 'Coach',
      description: 'Get real-time 24/7 strategic advice, campaign critiques, and Instagram growth audits tailored specifically to your food container business.',
      steps: [
        { title: 'Ask Any Marketing Question', detail: 'Type questions like "How can I boost my Mother’s Day sales?" or "What hashtags are best for glass bento boxes?"' },
        { title: 'Receive Actionable Advice', detail: 'The Coach analyzes your brand profile and provides step-by-step tactics, ideal posting times, and content angles.' }
      ],
      proTips: [
        'Ask the Marketing Coach to perform a weekly Instagram strategy checkup to ensure your conversion rate stays high.'
      ],
      actionTab: 'coach',
      actionLabel: 'Chat with AI Coach'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'content-creation', label: 'Content Creation' },
    { id: 'planning', label: 'Calendar & Planning' },
    { id: 'sales-automation', label: 'Sales & DM Automation' },
    { id: 'brand-management', label: 'Products & Personas' },
    { id: 'strategy', label: 'Strategy & Coach' },
  ];

  const filteredSections = manualSections.filter((section) => {
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.steps.some(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.detail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 text-white">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold">
              <BookOpen size={14} className="text-pink-400" />
              <span>Official System Guide</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              User Manual & Knowledge Base
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Master the Tupperware Social Marketing Assistant. Learn how to generate viral reels, schedule campaigns, automate sales DMs, and scale your kitchen organization brand.
            </p>
          </div>

          <button
            onClick={() => setActiveTab && setActiveTab('ai-content')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-500 shadow-lg shadow-pink-900/30 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Launch AI Studio</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guide (e.g. reels, DMs, calendar)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto custom-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-900/30 border border-pink-500'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Content Sections */}
      <div className="space-y-6">
        {filteredSections.map((section) => {
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6 hover:border-white/20 transition-all"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{section.title}</h2>
                      {section.badge && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>

                {section.actionTab && setActiveTab && (
                  <button
                    onClick={() => setActiveTab(section.actionTab!)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    <span>{section.actionLabel || 'Open Tool'}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Step-by-Step Workflow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {section.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20 inline-block mb-1">
                          Step 0{idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-1">{step.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips Box */}
              {section.proTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-indigo-900/30 border border-indigo-500/30 space-y-1">
                  <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
                    <Zap size={14} className="text-indigo-400" />
                    Pro Strategy Tip
                  </span>
                  {section.proTips.map((tip, idx) => (
                    <p key={idx} className="text-xs text-slate-300 leading-relaxed">
                      • {tip}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10">
            <HelpCircle size={32} className="mx-auto text-slate-500 mb-2" />
            <p className="text-sm font-semibold text-white">No guide section found</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for a different keyword like "reels", "hashtags", or "calendar".</p>
          </div>
        )}
      </div>

      {/* Quick Reference Summary Card */}
      <div className="bg-gradient-to-r from-pink-900/30 via-slate-900/80 to-purple-900/30 border border-pink-500/20 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame size={18} className="text-pink-400" />
            Need instant marketing advice?
          </h3>
          <p className="text-xs text-slate-300">
            Ask our dedicated AI Marketing Coach anytime for personalized strategy recommendations, holiday campaign ideas, or Instagram feedback.
          </p>
        </div>

        <button
          onClick={() => setActiveTab && setActiveTab('coach')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-all shrink-0 cursor-pointer shadow-md"
        >
          Ask AI Coach ↗
        </button>
      </div>
    </div>
  );
};
