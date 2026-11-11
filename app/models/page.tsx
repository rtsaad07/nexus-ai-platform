'use client';

import { useState } from 'react';
import { useData } from '../../lib/DataContext';
import FrontierTrio from '../../components/FrontierTrio';
import ModelMatrix from '../../components/ModelMatrix';
import Link from 'next/link';
import { Grid, ArrowRight, Search, Plus, Sparkles, Building, DollarSign } from 'lucide-react';

export default function ModelsMatrixPage() {
  const { models, openAddModal } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="pt-8 pb-16 space-y-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                <Grid className="w-3.5 h-3.5" />
                Dedicated Frontier AI Models Matrix
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Frontier AI Models & Pricing Matrix
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Comprehensive technical parameters, pricing per 1M tokens, agency monthly estimates, and benchmark scores across Claude 3.5 Sonnet, Gemini 1.5 Pro &amp; Flash, DeepSeek-V3 &amp; R1, and OpenAI o3-mini.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                + Add Model Spec
              </button>
              <Link
                href="/calculator"
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <span>Cost Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, providers (e.g. Claude, Gemini, DeepSeek), or benefits..."
                className="w-full pl-11 pr-20 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Frontier Trio Section */}
      <FrontierTrio />

      {/* Complete Models Matrix Component */}
      <ModelMatrix
        models={models}
        searchQuery={searchQuery}
        onOpenAddModal={openAddModal}
      />
    </main>
  );
}
