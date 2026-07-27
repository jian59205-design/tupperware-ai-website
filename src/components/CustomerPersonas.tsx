import React, { useState } from 'react';
import { Users, Sparkles, AlertCircle, Target, ShoppingBag, Heart, ShieldAlert, Gift } from 'lucide-react';
import { CustomerPersona } from '../types';

interface CustomerPersonasProps {
  personas: CustomerPersona[];
  setPersonas: React.Dispatch<React.SetStateAction<CustomerPersona[]>>;
  darkMode: boolean;
}

export const CustomerPersonas: React.FC<CustomerPersonasProps> = ({
  personas,
  setPersonas,
  darkMode,
}) => {
  const [activePersonaId, setActivePersonaId] = useState<string>(personas[0]?.id || '');

  const activePersona = personas.find((p) => p.id === activePersonaId) || personas[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Users size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Customer Personas</h2>
            <p className="text-xs text-slate-500">
              Deep buyer profiles, pain points, objections & tailored hooks for food container shoppers.
            </p>
          </div>
        </div>
      </div>

      {/* Persona Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {personas.map((pers) => (
          <button
            key={pers.id}
            onClick={() => setActivePersonaId(pers.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-bold shrink-0 ${
              activePersonaId === pers.id
                ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20'
                : darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <img src={pers.avatarUrl} alt={pers.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="text-left">
              <span className="block leading-none">{pers.name}</span>
              <span className={`text-[10px] font-normal ${activePersonaId === pers.id ? 'text-rose-100' : 'text-slate-400'}`}>
                {pers.roleTitle}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Persona Deep Dive Card */}
      {activePersona && (
        <div className="space-y-6">
          {/* Overview Top Card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img src={activePersona.avatarUrl} alt={activePersona.name} className="w-20 h-20 rounded-2xl object-cover shadow-md shrink-0" />
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase">
                  Target Customer Profile
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{activePersona.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{activePersona.roleTitle}</p>

                <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800">Age: {activePersona.ageGroup}</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800">Income: {activePersona.incomeLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points & Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pain Points */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-rose-500" size={18} />
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Pain Points & Frustrations</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activePersona.painPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goals & Desires */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-emerald-500" size={18} />
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Goals & Desires</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activePersona.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Objections, Marketing Messages & Offers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Objections */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="text-amber-500" size={18} />
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Buying Objections</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activePersona.buyingObjections.map((obj, i) => (
                  <p key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    "{obj}"
                  </p>
                ))}
              </div>
            </div>

            {/* High-Converting Hook Messages */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-rose-500" size={18} />
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Tailored Marketing Messages</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activePersona.marketingMessages.map((msg, i) => (
                  <p key={i} className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200 italic font-medium">
                    {msg}
                  </p>
                ))}
              </div>
            </div>

            {/* Ideal Promo Offers */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Gift className="text-purple-500" size={18} />
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Ideal Promo Offers</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activePersona.idealOffers.map((off, i) => (
                  <p key={i} className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-purple-950 dark:text-purple-200 font-bold">
                    {off}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
