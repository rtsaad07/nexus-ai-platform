'use client';

import { useData } from '../../lib/DataContext';
import CostCalculator from '../../components/CostCalculator';
import Link from 'next/link';
import { Calculator, ArrowRight, DollarSign, Sparkles, TrendingDown } from 'lucide-react';

export default function CalculatorPage() {
  const { models } = useData();

  return (
    <main className="pt-8 pb-16 space-y-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                Dedicated Token Economics & Cost Lab
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Software House Token Economics Calculator
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Simulate exact monthly API bills for your client bots and internal engineering pipelines. Calculate prompt caching discounts (up to 75% savings on repeated system prompts), compare input vs. output token expenditure, and discover margin optimization strategies.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/models"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                View Models Matrix
              </Link>
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <span>Back to Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator Component */}
      <CostCalculator models={models} />
    </main>
  );
}
