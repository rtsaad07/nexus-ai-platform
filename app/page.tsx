'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useData } from '../lib/DataContext';
import Hero from '../components/Hero';
import PurposeSelector from '../components/PurposeSelector';
import LiveGeminiAdvisor from '../components/LiveGeminiAdvisor';
import UserContributionsFeed from '../components/UserContributionsFeed';
import {
  Grid,
  Film,
  Milestone,
  BookOpen,
  Calculator,
  ArrowRight,
  Sparkles,
  Zap,
  Building,
  TrendingUp,
  Cpu,
} from 'lucide-react';

const DEDICATED_PAGES = [
  {
    href: '/models',
    title: 'Frontier AI Models Matrix',
    subtitle: '8 Frontier models, benchmarks (SWE-bench, MATH-500), software house pricing, and critical drawbacks.',
    icon: Grid,
    badge: 'Compare Models',
    color: 'indigo',
    stat: '8 Models Spec',
  },
  {
    href: '/ugi',
    title: 'UGI AI Media Studio',
    subtitle: 'Dedicated page for generative video (Veo, Sora), voice (ElevenLabs), avatars (HeyGen), and 3D pipelines.',
    icon: Film,
    badge: 'Media Suites',
    color: 'rose',
    stat: '8 Creative Tools',
  },
  {
    href: '/agi',
    title: 'AGI Milestones Roadmap',
    subtitle: 'DeepMind 5-level trajectory, physical bottlenecks (grid power, data exhaustion), and evidence trackers.',
    icon: Milestone,
    badge: 'Progress Tracker',
    color: 'emerald',
    stat: '5 AGI Levels',
  },
  {
    href: '/papers',
    title: 'Frontier Research Papers',
    subtitle: 'DeepSeek MLA architecture, RingAttention distributed scaling, KV-cache memory slashes, and paper archives.',
    icon: BookOpen,
    badge: 'Deep Architecture',
    color: 'purple',
    stat: '4 Major Reports',
  },
  {
    href: '/calculator',
    title: 'Token Economics Lab',
    subtitle: 'Simulate monthly bills, calculate prompt caching discounts (up to 75%), and model agency profit margins.',
    icon: Calculator,
    badge: 'Cost Simulator',
    color: 'sky',
    stat: 'Dynamic ROI Lab',
  },
];

export default function HomePage() {
  const {
    models,
    contributions,
    openAddModal,
    exportData,
    importData,
    resetData,
    deleteContribution,
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="space-y-12 pb-16">
      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={openAddModal}
        totalModels={models.length}
        totalContributions={contributions.length}
      />

      {/* Multi-Page Navigation Hub Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              Dedicated Intelligence Hubs
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Explore Dedicated Pages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Access individual specialized sections across models, multi-modal UGI suites, AGI milestones, and research papers.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">Click any card to open dedicated view</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEDICATED_PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/80 dark:border-indigo-800/80 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {page.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {page.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">{page.stat}</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Feature 1: Interactive Purpose & Budget Matchmaker for Software Houses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PurposeSelector
          models={models}
          onConsultLiveGemini={() => scrollToSection('live-gemini-advisor')}
          onSelectModelForCalculator={() => {
            window.location.href = '/calculator';
          }}
        />
      </div>

      {/* Feature 2: Live Server-Side Gemini Advisor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveGeminiAdvisor
          onSelectModel={() => {
            window.location.href = '/models';
          }}
        />
      </div>

      {/* Feature 3: Global Knowledge DB Feed & Data Manager */}
      <UserContributionsFeed
        contributions={contributions}
        onOpenAddModal={openAddModal}
        onExportData={exportData}
        onImportData={importData}
        onResetData={resetData}
        onDeleteContribution={deleteContribution}
      />
    </main>
  );
}
