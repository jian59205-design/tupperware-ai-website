import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  Award,
  ArrowRight,
  Copy,
  Check,
  Eye,
  Flame,
  Bookmark,
  Share2
} from 'lucide-react';
import { TaskItem, HolidayEvent, GeneratedContent, BrandSettings, TabType } from '../types';
import { upcomingHolidays } from '../data/mockInitialData';

interface DashboardHomeProps {
  tasks?: TaskItem[];
  setTasks?: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  recentContent?: GeneratedContent[];
  savedContent?: GeneratedContent[];
  brand: BrandSettings;
  setCurrentTab?: (tab: any) => void;
  setActiveTab?: (tab: any) => void;
  onPreviewContent: (content: GeneratedContent) => void;
  darkMode?: boolean;
}

const defaultTasks: TaskItem[] = [
  { id: '1', title: 'Post Airtight Lunchbox Educational Reel', category: 'Reels', completed: false, dueDate: 'Today' },
  { id: '2', title: 'Reply to 12 pending Instagram DMs about pricing', category: 'DMs', completed: true, dueDate: 'Today' },
  { id: '3', title: 'Schedule 3 Pantry Organization Carousel posts', category: 'Content', completed: false, dueDate: 'Today' },
  { id: '4', title: 'Launch Mother\'s Day Early Bird Flash Sale Campaign', category: 'Campaigns', completed: false, dueDate: 'Tomorrow' },
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  tasks: externalTasks,
  setTasks: externalSetTasks,
  recentContent,
  savedContent,
  brand,
  setCurrentTab,
  setActiveTab,
  onPreviewContent,
}) => {
  const [internalTasks, setInternalTasks] = useState<TaskItem[]>(defaultTasks);
  const tasks = externalTasks || internalTasks;
  const setTasks = externalSetTasks || setInternalTasks;

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState(7);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayContent = recentContent || savedContent || [];

  const handleNavigate = (tab: string) => {
    if (setActiveTab) setActiveTab(tab);
    if (setCurrentTab) setCurrentTab(tab as any);
  };

  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      category: 'General',
      completed: false,
      dueDate: 'Today',
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const handleCopy = (content: GeneratedContent) => {
    const text = `${content.caption}\n\n${(content.hashtags || []).join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(content.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Weekly Goal</p>
          <p className="text-xl font-bold mt-1 text-white">4/{weeklyGoal} Posts</p>
          <div className="mt-2 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 rounded-full" style={{ width: `${(4 / weeklyGoal) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Engagement</p>
          <p className="text-xl font-bold mt-1 text-emerald-400">+18.4%</p>
          <p className="text-[10px] text-slate-400 mt-1">vs last 7 days</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">New Leads</p>
          <p className="text-xl font-bold mt-1 text-pink-400">142</p>
          <p className="text-[10px] text-slate-400 mt-1">via DM automation</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Marketing Score</p>
          <p className="text-xl font-bold mt-1 text-indigo-400">92/100</p>
          <p className="text-[10px] text-slate-400 mt-1">Optimal cadence</p>
        </div>
      </div>

      {/* Top Banner - AI Strategy & Suggestions */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 md:p-8 text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold">
              <Sparkles size={14} className="animate-spin-slow text-pink-400" />
              <span>AI Strategy Active for {brand?.businessName || 'FreshLuxe'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Ready to boost this week's pantry sales by 35%?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Based on top Instagram trends in food storage, 3-second ASMR pantry restock reels are getting 4.2x higher engagement this month!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavigate('reel-generator')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-500 shadow-lg shadow-pink-900/30 active:scale-95 transition-all"
            >
              <Zap size={16} />
              <span>Generate Reel Script</span>
            </button>
            <button
              onClick={() => handleNavigate('ai-content')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <span>Create Caption</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Recommended Strategy & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Today's AI Strategy & Tasks (8 cols) */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* Today's AI Recommended Strategy */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 md:p-8 relative overflow-hidden flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-xl">✨</span> Recommended AI Strategy for Today
              </h2>
              <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-pink-500/30">
                Live Recommendations
              </span>
            </div>

            <div className="space-y-3 flex-1">
              <div 
                onClick={() => handleNavigate('reel-generator')}
                className="group bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/5 transition-all cursor-pointer flex items-start justify-between"
              >
                <div>
                  <h3 className="font-semibold text-white group-hover:text-pink-300 transition-colors">Airtight Lunchbox Educational Reel</h3>
                  <p className="text-sm text-slate-400 mt-1">Create a "What's in my lunch" video using the Eco-Friendly series.</p>
                </div>
                <span className="text-pink-400 font-bold text-xs shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  GENERATE ↗
                </span>
              </div>

              <div 
                onClick={() => handleNavigate('campaign-builder')}
                className="group bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/5 transition-all cursor-pointer flex items-start justify-between"
              >
                <div>
                  <h3 className="font-semibold text-white group-hover:text-pink-300 transition-colors">Flash Sale Campaign</h3>
                  <p className="text-sm text-slate-400 mt-1">Mother's Day early access for organization bundles is trending.</p>
                </div>
                <span className="text-slate-400 font-bold text-xs shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  PLAN ↗
                </span>
              </div>

              <div 
                onClick={() => handleNavigate('dm-assistant')}
                className="group bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/5 transition-all cursor-pointer flex items-start justify-between"
              >
                <div>
                  <h3 className="font-semibold text-white group-hover:text-pink-300 transition-colors">DM Blitz: Restock Alert</h3>
                  <p className="text-sm text-slate-400 mt-1">82 customers waiting for the Glass Pantry Set update.</p>
                </div>
                <span className="text-slate-400 font-bold text-xs shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  AUTOMATE ↗
                </span>
              </div>
            </div>
          </div>

          {/* Action Items Box */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-pink-400" size={20} />
                <h3 className="font-bold text-base text-white">Today's Action Items</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                {tasks.filter((t) => !t.completed).length} Remaining
              </span>
            </div>

            {/* Add Task Input */}
            <form onSubmit={addTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new marketing task (e.g., Post Reel, Reply to DMs)..."
                className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-all shadow-md shadow-pink-900/30 flex items-center gap-1 shrink-0"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </form>

            {/* Task List */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-white/2 border-white/5 opacity-50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    ) : (
                      <Circle size={18} className="text-slate-400 shrink-0" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/5">
                    {task.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Posts & AI Coach (4 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* Upcoming Posts Preview Box */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 flex-1 flex flex-col">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Upcoming Posts</h2>
            
            <div className="flex-1 space-y-4">
              <div className="relative group cursor-pointer" onClick={() => displayContent.length > 0 && onPreviewContent(displayContent[0])}>
                <div className="w-full aspect-square bg-slate-900/80 rounded-2xl overflow-hidden border border-white/10 relative flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-slate-900/60 to-transparent">
                  <div className="absolute top-3 right-3 bg-pink-600 px-2.5 py-1 rounded-full text-[9px] font-bold text-white shadow-md">
                    CAROUSEL
                  </div>
                  <p className="text-xs font-medium text-white line-clamp-2">
                    "{displayContent[0]?.caption || 'Organizing my pantry was the single best decision for meal prep...'}"
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 italic flex items-center gap-1">
                    <Calendar size={12} /> Scheduled: Tomorrow, 9:00 AM
                  </p>
                </div>
              </div>

              {displayContent.slice(1, 3).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onPreviewContent(item)}
                  className="flex gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/5 transition-all cursor-pointer items-center"
                >
                  <div className="w-14 h-14 bg-slate-800 rounded-xl flex-shrink-0 flex items-center justify-center text-pink-400 font-bold text-xs border border-white/10">
                    IG
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.postType || 'Caption'}</p>
                    <div className="mt-2 flex gap-1">
                      <div className="w-3 h-1 bg-pink-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleNavigate('ai-content')}
              className="w-full mt-6 py-3.5 border border-dashed border-white/20 hover:border-pink-500/50 rounded-2xl text-xs text-slate-400 hover:text-white transition-all bg-white/2 hover:bg-white/5 font-medium"
            >
              + Generate More AI Posts
            </button>
          </div>

          {/* AI Marketing Coach Banner */}
          <div 
            onClick={() => handleNavigate('coach')}
            className="bg-indigo-900/40 backdrop-blur-md border border-indigo-500/30 rounded-[32px] p-6 text-white relative overflow-hidden cursor-pointer hover:border-indigo-400/50 transition-all group"
          >
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">AI Marketing Coach</p>
            <p className="mt-2 text-sm leading-relaxed font-medium text-slate-200">
              "Try adding more 'behind-the-scenes' packing clips. Your audience loves seeing real orders prepared!"
            </p>
            <div className="mt-4 flex items-center gap-2 text-pink-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
              <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-xs">✨</div>
              <span>Chat with Strategist ↗</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

