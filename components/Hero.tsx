'use client';

import { Search, Plus, Sparkles, Zap, Bot, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
  totalModels: number;
  totalContributions: number;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  totalModels,
  totalContributions,
}: HeroProps) {
  return (
    <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        {/* Soft light pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
          <Building className="w-3.5 h-3.5" />
          <span>Tailored for Software Houses, Dev Agencies & Tech Startups</span>
          <span className="text-indigo-400">·</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">2026 AI Buyer Guide</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] text-balance">
          Which AI should your <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 dark:from-indigo-400 dark:via-sky-400 dark:to-indigo-300">
            Software House Buy & Deploy?
          </span>
        </h1>

        {/* Value Proposition in plain, understandable English */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-balance">
          Stop overpaying for AI tokens. Discover which AI bot gives you the highest ROI in your price range, compare critical drawbacks before signing contracts, and get instant recommendations from our live Gemini AI advisor.
        </p>

        {/* Hero Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#purpose-finder"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Your Purpose (Interactive)</span>
          </a>

          <a
            href="#live-gemini-advisor"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-all"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Ask Live Gemini Advisor</span>
          </a>

          <a
            href="#models"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shadow-xs"
          >
            <span>Compare {totalModels} Models & Drawbacks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by purpose, model (e.g. Gemini Flash, Claude Sonnet), or price..."
              className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs transition-all"
              aria-label="Search models and advice"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-24 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onOpenAddModal}
              className="absolute right-2 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Spec</span>
            </button>
          </div>
        </div>
      </div>

      {/* Proof Metrics Strip for Software Houses */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            $0.075 / 1M
          </div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
            Ultra-Low Support Bot Cost
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Gemini 1.5 Flash input rate
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 font-mono tabular-nums">
            49.0% SWE-bench
          </div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
            Industry Benchmark for Coding
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Claude 3.5 Sonnet leader
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 font-mono tabular-nums">
            2,000,000 Tokens
          </div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
            Full Codebase Ingestion (RAG)
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Gemini 1.5 Pro context window
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
            Open Weights
          </div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
            Self-Hostable for Privacy
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            DeepSeek-V3 / R1 on-prem
          </div>
        </div>
      </div>
    </section>
  );
}
