import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { AiContentGenerator } from './components/AiContentGenerator';
import { ReelGenerator } from './components/ReelGenerator';
import { ContentCalendar } from './components/ContentCalendar';
import { DmAssistant } from './components/DmAssistant';
import { CommentReplies } from './components/CommentReplies';
import { CampaignBuilder } from './components/CampaignBuilder';
import { AdGenerator } from './components/AdGenerator';
import { HashtagGenerator } from './components/HashtagGenerator';
import { ProductLibrary } from './components/ProductLibrary';
import { CustomerPersonas } from './components/CustomerPersonas';
import { AnalyticsView } from './components/AnalyticsView';
import { ImagePromptGenerator } from './components/ImagePromptGenerator';
import { MarketingCoach } from './components/MarketingCoach';
import { BrandSettingsView } from './components/BrandSettingsView';
import { SavedContentFolders } from './components/SavedContentFolders';
import { UserManual } from './components/UserManual';
import { InstagramPreviewModal } from './components/InstagramPreviewModal';

import {
  initialProducts,
  initialBrandSettings,
  sampleInitialCaptions,
  initialCalendarEvents,
  initialPersonas,
} from './data/mockInitialData';

import {
  Product,
  BrandSettings,
  GeneratedContent,
  CalendarEvent,
  CustomerPersona,
} from './types';

import { loadFromStorage, saveToStorage } from './lib/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Persistent States
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage('tupperware_ai_products', initialProducts)
  );
  const [brand, setBrand] = useState<BrandSettings>(() =>
    loadFromStorage('tupperware_ai_brand', initialBrandSettings)
  );
  const [savedContent, setSavedContent] = useState<GeneratedContent[]>(() =>
    loadFromStorage('tupperware_ai_saved', sampleInitialCaptions)
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() =>
    loadFromStorage('tupperware_ai_calendar', initialCalendarEvents)
  );
  const [personas, setPersonas] = useState<CustomerPersona[]>(() =>
    loadFromStorage('tupperware_ai_personas', initialPersonas)
  );

  // Instagram Preview Modal State
  const [previewContent, setPreviewContent] = useState<GeneratedContent | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // Persist state updates
  useEffect(() => {
    saveToStorage('tupperware_ai_products', products);
  }, [products]);

  useEffect(() => {
    saveToStorage('tupperware_ai_brand', brand);
  }, [brand]);

  useEffect(() => {
    saveToStorage('tupperware_ai_saved', savedContent);
  }, [savedContent]);

  useEffect(() => {
    saveToStorage('tupperware_ai_calendar', calendarEvents);
  }, [calendarEvents]);

  useEffect(() => {
    saveToStorage('tupperware_ai_personas', personas);
  }, [personas]);

  // Preview Handler
  const handlePreviewContent = (content: GeneratedContent) => {
    setPreviewContent(content);
    setIsPreviewOpen(true);
  };

  const handlePreviewSnippet = (snippet: string, title: string) => {
    setPreviewContent({
      id: `snippet-${Date.now()}`,
      title,
      postType: 'Instagram Caption',
      tone: 'Friendly',
      caption: snippet,
      hashtags: ['#PantryGoals', '#Tupperware', '#KitchenOrganisation'],
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsPreviewOpen(true);
  };

  // Add Generated Item to Saved Content
  const handleSaveContent = (content: GeneratedContent) => {
    setSavedContent((prev) => [content, ...prev]);
  };

  // Add Item to Calendar
  const handleAddToCalendar = (title: string, snippet: string) => {
    const newEvt: CalendarEvent = {
      id: `cal-${Date.now()}`,
      title,
      type: 'Post',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      contentSnippet: snippet,
      status: 'Scheduled',
    };
    setCalendarEvents((prev) => [...prev, newEvt]);
  };

  return (
    <div className={`min-h-screen font-sans bg-[#0a0a0c] text-slate-200 overflow-hidden relative`}>
      {/* Mesh Gradient Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed top-[40%] right-[15%] w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="flex h-screen overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} savedCount={savedContent.length} brand={brand} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header Bar */}
          <Header
            activeTab={activeTab}
            brand={brand}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onNewContentClick={() => setActiveTab('ai-content')}
          />

          {/* Tab View Container */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {(activeTab === 'dashboard' || activeTab === 'dashboard-home') && (
                <DashboardHome
                  brand={brand}
                  products={products}
                  savedContent={savedContent}
                  recentContent={savedContent}
                  calendarEvents={calendarEvents}
                  setActiveTab={setActiveTab}
                  setCurrentTab={setActiveTab}
                  onPreviewContent={handlePreviewContent}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'ai-content' && (
                <AiContentGenerator
                  products={products}
                  brand={brand}
                  onSaveContent={handleSaveContent}
                  onPreviewContent={handlePreviewContent}
                  onAddToCalendar={handleAddToCalendar}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'reel-generator' && (
                <ReelGenerator brand={brand} darkMode={darkMode} />
              )}

              {(activeTab === 'calendar' || activeTab === 'content-calendar') && (
                <ContentCalendar
                  events={calendarEvents}
                  setEvents={setCalendarEvents}
                  onPreviewSnippet={handlePreviewSnippet}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'dm-assistant' && (
                <DmAssistant brand={brand} darkMode={darkMode} />
              )}

              {activeTab === 'comment-replies' && (
                <CommentReplies brand={brand} darkMode={darkMode} />
              )}

              {activeTab === 'campaign-builder' && (
                <CampaignBuilder brand={brand} darkMode={darkMode} />
              )}

              {activeTab === 'ad-generator' && (
                <AdGenerator brand={brand} darkMode={darkMode} />
              )}

              {(activeTab === 'hashtags' || activeTab === 'hashtag-generator') && (
                <HashtagGenerator brand={brand} darkMode={darkMode} />
              )}

              {activeTab === 'product-library' && (
                <ProductLibrary
                  products={products}
                  setProducts={setProducts}
                  brand={brand}
                  darkMode={darkMode}
                />
              )}

              {(activeTab === 'personas' || activeTab === 'customer-personas') && (
                <CustomerPersonas
                  personas={personas}
                  setPersonas={setPersonas}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView darkMode={darkMode} />
              )}

              {(activeTab === 'image-prompts' || activeTab === 'image-prompt') && (
                <ImagePromptGenerator darkMode={darkMode} />
              )}

              {(activeTab === 'coach' || activeTab === 'marketing-coach') && (
                <MarketingCoach brand={brand} darkMode={darkMode} />
              )}

              {activeTab === 'brand-settings' && (
                <BrandSettingsView brand={brand} setBrand={setBrand} darkMode={darkMode} />
              )}

              {activeTab === 'saved-content' && (
                <SavedContentFolders
                  savedContent={savedContent}
                  setSavedContent={setSavedContent}
                  onPreviewContent={handlePreviewContent}
                  darkMode={darkMode}
                />
              )}

              {(activeTab === 'user-manual' || activeTab === 'manual') && (
                <UserManual setActiveTab={setActiveTab} darkMode={darkMode} />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Live Instagram Post Preview Modal */}
      {isPreviewOpen && (
        <InstagramPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          content={previewContent}
          brand={brand}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
