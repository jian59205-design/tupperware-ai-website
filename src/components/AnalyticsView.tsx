import React from 'react';
import { BarChart2, TrendingUp, Users, Eye, ShoppingCart, Award } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Cell } from 'recharts';

interface AnalyticsViewProps {
  darkMode: boolean;
}

const SALES_TREND_DATA = [
  { month: 'Jan', reach: 24000, sales: 3200 },
  { month: 'Feb', reach: 35000, sales: 4800 },
  { month: 'Mar', reach: 52000, sales: 7400 },
  { month: 'Apr', reach: 48000, sales: 6900 },
  { month: 'May', reach: 68000, sales: 9800 },
  { month: 'Jun', reach: 89000, sales: 13200 },
  { month: 'Jul', reach: 124000, sales: 18500 },
];

const FORMAT_PERFORMANCE_DATA = [
  { format: 'Reels', engagement: 8.8, color: '#f43f5e' },
  { format: 'Carousels', engagement: 6.2, color: '#ec4899' },
  { format: 'Stories', engagement: 5.4, color: '#a855f7' },
  { format: 'Single Posts', engagement: 3.1, color: '#38bdf8' },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ darkMode }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <BarChart2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Instagram Analytics & Revenue Impact</h2>
            <p className="text-xs text-slate-500">
              Track engagement rate, DM sales conversions, reel reach & top performing kitchen container content.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Account Reach</span>
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500"><Eye size={16} /></span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">124,500</p>
          <span className="text-[11px] font-bold text-emerald-500">↑ 34.2% vs last month</span>
        </div>

        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Avg Engagement Rate</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500"><TrendingUp size={16} /></span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">6.8%</p>
          <span className="text-[11px] font-bold text-emerald-500">3x Instagram Industry Avg</span>
        </div>

        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">DM Generated Revenue</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500"><ShoppingCart size={16} /></span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">$18,500</p>
          <span className="text-[11px] font-bold text-emerald-500">412 DM conversions</span>
        </div>

        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Top Performing Hook</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500"><Award size={16} /></span>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">"Stop soggy salads..."</p>
          <span className="text-[11px] font-bold text-rose-500">48,200 Reel Views</span>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reach vs DM Sales Growth Chart */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-4">Monthly Reach vs DM Sales Growth ($)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_TREND_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#f43f5e" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Format Engagement Rate Bar */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-4">Engagement Rate by Format (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FORMAT_PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="format" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="engagement" radius={[8, 8, 0, 0]}>
                  {FORMAT_PERFORMANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
