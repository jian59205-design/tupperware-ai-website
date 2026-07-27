import React, { useState } from 'react';
import { Calendar, Plus, Filter, ChevronLeft, ChevronRight, Eye, Check, X, Sparkles } from 'lucide-react';
import { CalendarEvent } from '../types';

interface ContentCalendarProps {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  onPreviewSnippet: (snippet: string, title: string) => void;
  darkMode: boolean;
}

export const ContentCalendar: React.FC<ContentCalendarProps> = ({
  events,
  setEvents,
  onPreviewSnippet,
  darkMode,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'Story' | 'Post' | 'Reel' | 'Promotion'>('Post');
  const [newEventDate, setNewEventDate] = useState('2026-07-30');
  const [newEventSnippet, setNewEventSnippet] = useState('');

  const filteredEvents = events.filter((e) => (filterType === 'All' ? true : e.type === filterType));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const created: CalendarEvent = {
      id: `cal-${Date.now()}`,
      title: newEventTitle,
      type: newEventType,
      date: newEventDate,
      contentSnippet: newEventSnippet || newEventTitle,
      status: 'Scheduled',
    };

    setEvents([...events, created]);
    setNewEventTitle('');
    setNewEventSnippet('');
    setIsModalOpen(false);
  };

  const getTypeBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'Reel':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Story':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'Post':
        return 'bg-sky-500/10 text-sky-500 border-sky-500/20';
      case 'Promotion':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-500">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">30-Day Content Calendar</h2>
            <p className="text-xs text-slate-500">
              Schedule, color-code, and manage your Instagram posts, reels, stories, and promotions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            {['All', 'Post', 'Reel', 'Story', 'Promotion'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === type
                    ? 'bg-white dark:bg-slate-900 text-rose-500 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 shrink-0"
          >
            <Plus size={16} />
            <span>Schedule Content</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid Representation */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {evt.date}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTypeBadge(evt.type)}`}>
                  {evt.type}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">{evt.title}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">{evt.contentSnippet}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <span
                  className={`text-[10px] font-semibold ${
                    evt.status === 'Published'
                      ? 'text-emerald-500'
                      : evt.status === 'Scheduled'
                      ? 'text-sky-500'
                      : 'text-amber-500'
                  }`}
                >
                  ● {evt.status}
                </span>

                <button
                  onClick={() => onPreviewSnippet(evt.contentSnippet, evt.title)}
                  className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <Eye size={13} />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base">Schedule New Post</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Sunday Meal Prep Reel"
                  className={`w-full px-3.5 py-2 rounded-xl border ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Content Type</label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="Post">Post</option>
                    <option value="Reel">Reel</option>
                    <option value="Story">Story</option>
                    <option value="Promotion">Promotion</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Schedule Date</label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Caption / Snippet</label>
                <textarea
                  rows={3}
                  value={newEventSnippet}
                  onChange={(e) => setNewEventSnippet(e.target.value)}
                  placeholder="Paste or write caption snippet here..."
                  className={`w-full px-3.5 py-2 rounded-xl border ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-md shadow-rose-500/20"
                >
                  Save to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
