import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Video,
  Calendar,
  MessageSquare,
  MessageCircle,
  TrendingUp,
  Target,
  Hash,
  Package,
  Users,
  BarChart3,
  Image,
  Sparkles,
  Settings,
  FolderHeart,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bot
} from 'lucide-react';
import { TabType, BrandSettings } from '../types';

interface SidebarProps {
  currentTab?: TabType | string;
  activeTab?: TabType | string;
  setCurrentTab?: (tab: any) => void;
  setActiveTab?: (tab: any) => void;
  brand?: BrandSettings;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  savedCount?: number;
  darkMode?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  activeTab,
  setCurrentTab,
  setActiveTab,
  brand,
  collapsed: externalCollapsed,
  setCollapsed: externalSetCollapsed,
  savedCount = 0,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const toggleCollapse = () => {
    if (externalSetCollapsed) {
      externalSetCollapsed(!isCollapsed);
    } else {
      setInternalCollapsed(!isCollapsed);
    }
  };

  const selectedTab = activeTab || currentTab || 'dashboard';
  const handleSelectTab = (tabId: string) => {
    if (setActiveTab) setActiveTab(tabId);
    if (setCurrentTab) setCurrentTab(tabId as any);
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-content', label: 'AI Content', icon: FileText, badge: 'AI' },
    { id: 'reel-generator', label: 'Reel Generator', icon: Video, badge: 'Viral' },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'dm-assistant', label: 'DM Assistant', icon: MessageSquare },
    { id: 'comment-replies', label: 'Comment Replies', icon: MessageCircle },
    { id: 'campaign-builder', label: 'Campaign Builder', icon: TrendingUp },
    { id: 'ad-generator', label: 'Ad Generator', icon: Target },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'product-library', label: 'Product Library', icon: Package },
    { id: 'personas', label: 'Customer Personas', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'image-prompts', label: 'Image Prompts', icon: Image },
    { id: 'coach', label: 'AI Marketing Coach', icon: Bot, badge: 'Coach' },
    { id: 'brand-settings', label: 'Brand Settings', icon: Settings },
    { id: 'saved-content', label: 'Saved Content', icon: FolderHeart, badge: savedCount > 0 ? `${savedCount}` : undefined },
    { id: 'user-manual', label: 'User Manual', icon: BookOpen, badge: 'Guide' },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen bg-black/40 backdrop-blur-2xl border-r border-white/5 text-slate-200 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-20 px-5 border-b border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 bg-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)] shrink-0 font-bold text-white text-base">
            {brand?.businessName ? brand.businessName.charAt(0) : 'T'}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-base tracking-tight text-white truncate">
                {brand?.businessName || 'TUPP'}<span className="text-pink-500">AI</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {brand?.instagramUsername || '@tupperware.ai'}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedTab === item.id || (item.id === 'calendar' && selectedTab === 'content-calendar') || (item.id === 'hashtags' && selectedTab === 'hashtag-generator') || (item.id === 'personas' && selectedTab === 'customer-personas') || (item.id === 'image-prompts' && selectedTab === 'image-prompt') || (item.id === 'coach' && selectedTab === 'marketing-coach');

          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] font-semibold'
                  : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} className={isActive ? 'text-pink-400' : 'text-slate-400 opacity-80'} />
              
              {!isCollapsed && (
                <span className="truncate flex-1 text-left text-xs font-medium">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Usage Limit / AI Credits Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">AI Usage Limit</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full mb-2 overflow-hidden">
              <div className="h-full w-3/4 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
            </div>
            <p className="text-xs text-slate-300 font-medium">750 / 1000 AI Credits</p>
          </div>
        </div>
      )}
    </aside>
  );
};

