'use client';

import { useData } from '../../lib/DataContext';
import AgiRoadmap from '../../components/AgiRoadmap';
import Link from 'next/link';
import { Milestone, ArrowRight, Zap, ShieldAlert, Cpu, Activity } from 'lucide-react';

export default function AgiPage() {
  const { milestones, openAddModal } = useData();

  return (
    <main className="pt-8 pb-16 space-y-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <Milestone className="w-3.5 h-3.5" />
                Dedicated AGI Roadmap & Progression
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Artificial General Intelligence (AGI) Milestones
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Track humanity&apos;s systematic progression from conversational language models toward Artificial Superintelligence (ASI). Based on Google DeepMind&apos;s 5-level operational framework, assess current empirical evidence, autonomous agents, and real-world physical constraints.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                + Add Milestone
              </button>
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <span>Back to Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-400 uppercase">Current Stage</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">Level 2 → Level 3</div>
              <div className="text-xs text-slate-500 mt-0.5">Competent Reasoners to Autonomous Researchers</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-400 uppercase">Coding Autonomy</div>
              <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">49.0% SWE-bench</div>
              <div className="text-xs text-slate-500 mt-0.5">Autonomous pull request fix resolution</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-400 uppercase">Formal Math Proofs</div>
              <div className="text-xl font-black text-sky-600 dark:text-sky-400 mt-1">97.3% MATH-500</div>
              <div className="text-xs text-slate-500 mt-0.5">DeepSeek-R1 & Lean 4 verification</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-400 uppercase">Critical Bottleneck</div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">Multi-GW Energy</div>
              <div className="text-xs text-slate-500 mt-0.5">Datacenter clean power & nuclear SMRs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete AGI Roadmap Component */}
      <AgiRoadmap
        milestones={milestones}
        onOpenAddModal={openAddModal}
      />
    </main>
  );
}
