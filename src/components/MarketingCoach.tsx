import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { BrandSettings } from '../types';

interface MarketingCoachProps {
  brand: BrandSettings;
  darkMode: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  time: string;
}

const PRESET_QUESTIONS = [
  'How do I double my DM sales conversion rate for pantry container sets?',
  'What is the best 3-second Reel hook for selling premium bento boxes?',
  'How to handle customers who say "I can find cheaper containers on Amazon"?',
  'How to run an Instagram giveaway that attracts actual buyers, not freebie hunters?',
];

export const MarketingCoach: React.FC<MarketingCoachProps> = ({ brand, darkMode }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'coach',
      text: `Hello! I am your 24/7 Tupperware AI Marketing Coach for ${brand.businessName || 'FreshLuxe Kitchen'}. Ask me anything about Instagram reels growth, DM sales scripts, pricing objections, or content hooks!`,
      time: 'Just now',
    },
  ]);

  const handleSend = async (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          brandInfo: brand,
        }),
      });

      const resData = await response.json();
      const coachReply: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: 'coach',
        text: resData.data?.advice || 'Here is my strategic recommendation for your kitchen container brand...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, coachReply]);
    } catch (e) {
      console.error('Coach failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Bot size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">24/7 AI Marketing Coach</h2>
            <p className="text-xs text-slate-500">
              Get instant tailored advice on Instagram growth algorithms, objection handling & high-ticket sales strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Strategy Question Pills */}
      <div className="flex flex-wrap gap-2">
        {PRESET_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className={`text-xs px-3.5 py-2 rounded-2xl border font-semibold text-left transition-all hover:scale-[1.01] ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-500'
                : 'bg-white border-slate-200 text-slate-700 hover:border-rose-500 shadow-sm'
            }`}
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className={`p-6 rounded-3xl border flex flex-col justify-between h-[480px] ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  m.sender === 'user' ? 'bg-slate-800' : 'bg-rose-500'
                }`}
              >
                {m.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-rose-500 text-white font-medium rounded-tr-none'
                    : darkMode
                    ? 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none font-medium'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1.5 ${
                    m.sender === 'user' ? 'text-rose-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-rose-500 font-bold p-3">
              <RefreshCw size={14} className="animate-spin" />
              <span>Analyzing Instagram Strategy...</span>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI Marketing Coach a question..."
            className={`flex-1 px-4 py-3 text-xs rounded-2xl border focus:ring-2 focus:ring-rose-500 ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="p-3 rounded-2xl text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 disabled:opacity-50 transition-all shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
