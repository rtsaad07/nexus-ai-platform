'use client';

import { useData } from '../../lib/DataContext';
import UgiEcosystem from '../../components/UgiEcosystem';
import Link from 'next/link';
import { Film, Sparkles, ArrowRight, Video, Mic, UserCheck, ImageIcon, Box, Code } from 'lucide-react';

export default function UgiPage() {
  const { ugiTools, openAddModal } = useData();

  return (
    <main className="pt-8 pb-16 space-y-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                <Film className="w-3.5 h-3.5" />
                Dedicated UGI AI Media Studio
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                User-Generated Intelligence (UGI) Suites
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore the complete ecosystem of multi-modal generative AI tools. From cinematic video generation (Veo, Sora, Runway) and photorealistic digital avatars (HeyGen) to emotional voice cloning (ElevenLabs) and 3D mesh engines (Meshy), orchestrate end-to-end creative production pipelines.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                + Add UGI Tool
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

          {/* Quick Category Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-800 dark:text-slate-200">
              <Video className="w-4 h-4 text-rose-500" />
              <span>Video AI</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-800 dark:text-slate-200">
              <Mic className="w-4 h-4 text-amber-500" />
              <span>Voice & Foley</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-800 dark:text-slate-200">
              <UserCheck className="w-4 h-4 text-sky-500" />
              <span>Digital Avatars</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-800 dark:text-slate-200">
              <ImageIcon className="w-4 h-4 text-emerald-500" />
              <span>Image & Concept</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-800 dark:text-slate-200">
              <Box className="w-4 h-4 text-purple-500" />
              <span>3D Meshes & PBR</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-800 dark:text-slate-200">
              <Code className="w-4 h-4 text-indigo-500" />
              <span>Live Artifacts</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Complete UGI Directory & Autonomous Pipelines */}
      <UgiEcosystem
        tools={ugiTools}
        onOpenAddModal={openAddModal}
      />
    </main>
  );
}
