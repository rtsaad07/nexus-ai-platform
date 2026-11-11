'use client';

import { useState, useMemo } from 'react';
import {
  Code,
  MessageSquare,
  FileCode2,
  Cpu,
  Bot,
  Sparkles,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Zap,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { ModelItem, SoftwareHousePurpose, BudgetTier } from '../lib/types';
import { matchAiForPurpose } from '../lib/recommender';

interface PurposeSelectorProps {
  models: ModelItem[];
  onConsultLiveGemini?: () => void;
  onSelectModelForCalculator?: (modelId: string) => void;
}

const PURPOSE_OPTIONS: {
  id: SoftwareHousePurpose;
  title: string;
  subtitle: string;
  icon: typeof Code;
  badge: string;
}[] = [
  {
    id: 'coding_pr_review',
    title: 'Coding & PR Review Bots',
    subtitle: 'Write clean code, review git pull requests, spot bugs, and write unit tests.',
    icon: Code,
    badge: 'Most Popular',
  },
  {
    id: 'customer_support_bot',
    title: 'Customer & Client Support Bots',
    subtitle: '24/7 web chat, WhatsApp client assistants, helpdesks, and booking bots.',
    icon: MessageSquare,
    badge: 'High ROI',
  },
  {
    id: 'large_codebase_rag',
    title: 'Huge Codebase & Document RAG',
    subtitle: 'Read whole repositories, long PDFs, client contracts, and system logs at once.',
    icon: FileCode2,
    badge: '1M - 2M Context',
  },
  {
    id: 'math_logic_reasoning',
    title: 'Algorithms & Deep Logic Reasoning',
    subtitle: 'Complex fintech math, architecture design, edge-case debugging, algorithms.',
    icon: Cpu,
    badge: 'Reasoning CoT',
  },
  {
    id: 'agentic_tools_automation',
    title: 'Autonomous Agents & Workflows',
    subtitle: 'Multi-step tasks, calling backend APIs, web scraping, and database syncs.',
    icon: Bot,
    badge: 'Tool Calling',
  },
  {
    id: 'multimodal_creative',
    title: 'Visuals, Audio & UI-to-Code',
    subtitle: 'Convert Figma screenshots into Tailwind, image understanding, audio transcribing.',
    icon: Sparkles,
    badge: 'Multi-Modal',
  },
];

const BUDGET_OPTIONS: {
  id: BudgetTier;
  label: string;
  monthlyRange: string;
  desc: string;
  color: string;
}[] = [
  {
    id: 'low',
    label: 'Startup / Low Budget',
    monthlyRange: '$10 - $50 / mo',
    desc: 'Keep API bills low while shipping functional client bots.',
    color: 'emerald',
  },
  {
    id: 'mid',
    label: 'Growing Software House',
    monthlyRange: '$50 - $250 / mo',
    desc: 'Best sweet spot of developer velocity, speed, and cost efficiency.',
    color: 'sky',
  },
  {
    id: 'high',
    label: 'Enterprise / Scale',
    monthlyRange: '$250 - $1,000+ / mo',
    desc: 'Zero compromises on reasoning, code benchmark quality, and heavy concurrency.',
    color: 'indigo',
  },
];

export default function PurposeSelector({
  models,
  onConsultLiveGemini,
  onSelectModelForCalculator,
}: PurposeSelectorProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<SoftwareHousePurpose>('coding_pr_review');
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('mid');
  const [selectedPriority, setSelectedPriority] = useState<'accuracy' | 'cost' | 'speed' | 'privacy'>('accuracy');

  // Compute recommendation
  const result = useMemo(() => {
    return matchAiForPurpose(models, selectedPurpose, selectedBudget, selectedPriority);
  }, [models, selectedPurpose, selectedBudget, selectedPriority]);

  const currentPurposeMeta = PURPOSE_OPTIONS.find((p) => p.id === selectedPurpose) || PURPOSE_OPTIONS[0];

  return (
    <section id="purpose-finder" className="relative scroll-mt-20 py-8">
      {/* Container with soft light background and crisp card */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Software House Matchmaker
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Which AI should your Software House buy?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Select your agency purpose and budget below. We instantly calculate the most profitable, cost-effective AI bot for your stack—along with the critical drawbacks to watch out for.
            </p>
          </div>

          {onConsultLiveGemini && (
            <button
              onClick={onConsultLiveGemini}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 whitespace-nowrap self-start md:self-auto"
            >
              <Zap className="w-4 h-4" />
              Ask Live Gemini AI
            </button>
          )}
        </div>

        {/* Step 1: Select Purpose */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 1: Choose Your Primary Purpose
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Click a card to compare
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PURPOSE_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedPurpose === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedPurpose(item.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-indigo-200/80 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-200'
                          : 'bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Budget and Priorities */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          {/* Budget */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              Step 2: Monthly Agency Budget
            </span>
            <div className="grid grid-cols-3 gap-2">
              {BUDGET_OPTIONS.map((b) => {
                const isSelected = selectedBudget === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{b.label.split('/')[0]}</div>
                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-extrabold mt-0.5">
                      {b.monthlyRange}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              Step 3: What Matters Most To You?
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { id: 'accuracy', label: 'Top Quality', icon: CheckCircle2 },
                  { id: 'cost', label: 'Lowest Cost', icon: DollarSign },
                  { id: 'speed', label: 'Fast Latency', icon: Zap },
                  { id: 'privacy', label: 'Data Privacy', icon: ShieldAlert },
                ] as const
              ).map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPriority === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPriority(p.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-[11px] font-semibold">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="mt-8 rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-indigo-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-indigo-600/30">
                #1
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Top Recommended AI for {currentPurposeMeta.title}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    {result.matchScore}% Agency Match
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {result.topModel.name}
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-2">
                    by {result.topModel.provider}
                  </span>
                </h3>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Estimated Monthly Bill</div>
                <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                  {result.monthlyEstimate}
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Cost per 1,000 Tasks</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {result.topModel.costPer1kQueries}
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Price Tier</div>
                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.topModel.priceTier === '$'
                    ? '$ Ultra Affordable'
                    : result.topModel.priceTier === '$$'
                    ? '$$ Moderate'
                    : '$$$ Premium Flagship'}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Breakdown: Benefits vs Drawbacks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Why Beneficial */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Why It’s Most Beneficial for Software Houses:
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.whyThisIsBest}
              </p>

              <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40">
                <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2">
                  Best Suited Client Projects:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.topModel.idealUseCases.map((useCase, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 text-xs font-medium border border-emerald-200 dark:border-emerald-800"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Critical Drawbacks (What are their drawbacks) */}
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Critical Drawbacks & Gotchas Before You Buy:
                </h4>
              </div>
              <ul className="space-y-2">
                {result.drawbacksToWatch.map((drawback, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 flex-shrink-0" />
                    <span>{drawback}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-800/40">
                <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">
                  Runner-Up Alternative:
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Consider <span className="font-semibold text-slate-900 dark:text-white">{result.runnerUpModel.name}</span> as an automatic backup route if you hit rate limits or need a lower price point.
                </p>
              </div>
            </div>
          </div>

          {/* Software House Architecture Pro-Tips */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Developer Agency Recommendation:
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {result.recommendedTechStackTips[0]}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {onSelectModelForCalculator && (
                <button
                  onClick={() => onSelectModelForCalculator(result.topModel.id)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all"
                >
                  Simulate Token Cost
                </button>
              )}
              {onConsultLiveGemini && (
                <button
                  onClick={onConsultLiveGemini}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Ask Live Gemini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
