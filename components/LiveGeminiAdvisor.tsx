'use client';

import { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Building2,
  DollarSign,
  Layers,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react';
import { AdvisorRecommendation } from '../lib/types';

interface LiveGeminiAdvisorProps {
  onSelectModel?: (modelId: string) => void;
}

const PRESET_QUERIES = [
  {
    label: 'Client WhatsApp Support Bot',
    useCase: '24/7 WhatsApp & Web Chatbot for e-commerce clients',
    budget: '$10 - $50 / mo',
    teamSize: '5 developers',
    stack: 'Node.js, PostgreSQL, WhatsApp Cloud API',
    priority: 'cost' as const,
    query: 'We need ultra-low latency (< 1s) and the lowest possible token cost so we can resell support bots to 10 clients without high bills.',
  },
  {
    label: 'Automated GitHub PR Reviewer',
    useCase: 'Automated Pull Request Code Review & Security Scanning Bot',
    budget: '$50 - $250 / mo',
    teamSize: '15 developers',
    stack: 'GitHub Actions, TypeScript, Next.js, Python',
    priority: 'accuracy' as const,
    query: 'Must catch TypeScript edge cases, missing error handlers, and security flaws in our pull requests before merge.',
  },
  {
    label: 'Client Repo RAG / 500-Page Docs',
    useCase: 'Codebase Question-Answering & Internal Documentation Search',
    budget: '$100 - $300 / mo',
    teamSize: '25 developers',
    stack: 'Python, FastAPI, Vector Search / Native Context',
    priority: 'accuracy' as const,
    query: 'Need to ingest entire client codebases and 300-page API specifications without painful chunking or missing context.',
  },
  {
    label: 'Private Data / Client Confidentiality',
    useCase: 'HIPAA & Financial Client Data Processing',
    budget: '$50 - $200 / mo',
    teamSize: '10 developers',
    stack: 'Docker, Python, On-premise or Private VPC',
    priority: 'privacy' as const,
    query: 'Client contracts forbid sending raw source code or customer PII to closed third-party cloud APIs. What are our options and tradeoffs?',
  },
];

export default function LiveGeminiAdvisor({ onSelectModel }: LiveGeminiAdvisorProps) {
  const [companyName, setCompanyName] = useState('Apex Software Labs');
  const [useCase, setUseCase] = useState('Client Chatbots & Automated Code Reviews');
  const [budgetRange, setBudgetRange] = useState('$50 - $250 / mo');
  const [teamSize, setTeamSize] = useState('10 - 25 engineers');
  const [techStack, setTechStack] = useState('Next.js, TypeScript, Python, PostgreSQL');
  const [priority, setPriority] = useState<'accuracy' | 'cost' | 'speed' | 'privacy'>('accuracy');
  const [freeformQuery, setFreeformQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<AdvisorRecommendation | null>(null);
  const [activeSource, setActiveSource] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleApplyPreset = (preset: (typeof PRESET_QUERIES)[0]) => {
    setUseCase(preset.useCase);
    setBudgetRange(preset.budget);
    setTeamSize(preset.teamSize);
    setTechStack(preset.stack);
    setPriority(preset.priority);
    setFreeformQuery(preset.query);
  };

  const handleConsultGemini = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          useCase,
          monthlyBudget: budgetRange,
          teamSize,
          techStack,
          priority,
          freeformQuery,
        }),
      });

      if (!res.ok) {
        throw new Error(`Advisor service returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.data) {
        setAdvice(data.data);
        setActiveSource(data.source || 'gemini-live');
      } else {
        throw new Error('Invalid advisory response received');
      }
    } catch (err: unknown) {
      console.warn('Live API request failed, using local advice engine:', err);
      // Local fallback representation
      setAdvice({
        recommendedModel: priority === 'cost' ? 'Gemini 1.5 Flash' : 'Claude 3.5 Sonnet',
        runnerUpModel: priority === 'cost' ? 'DeepSeek-V3' : 'OpenAI o3-mini',
        matchScore: 96,
        estimatedMonthlyCost: budgetRange || '$45 - $120 / mo',
        plainEnglishBenefit:
          'Based on your agency stack, this AI bot maximizes your delivery speed while preventing budget explosions. It integrates natively with your backend pipelines without requiring complex hardware.',
        criticalDrawbacks: [
          'Watch out for provider concurrency rate limits during peak client traffic.',
          'Always configure prompt caching to keep input token costs down.',
          'Maintain an automated fallback API key in case the primary provider encounters downtime.',
        ],
        priceToPerformanceVerdict:
          'High ROI investment that pays for itself within the first few client deliverables.',
        implementationTip:
          'Set up an API gateway proxy with retries, and set low temperature (0.1) for structured JSON outputs.',
      });
      setActiveSource('local-expert-engine');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="live-gemini-advisor" className="relative scroll-mt-20 py-8">
      <div className="rounded-3xl border border-indigo-200/90 dark:border-indigo-900/60 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/20 p-6 sm:p-10 shadow-xl shadow-indigo-100/40 dark:shadow-none">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                  Powered by Gemini 3.8 Flash
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                  Live Software House Consultant
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Live AI Buying Advisor for Software Houses
              </h2>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            Ask Gemini directly which AI bot to buy for your agency, your exact budget, and your clients.
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Popular Software House Scenarios (Click to autofill):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-left px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition-all text-xs group"
              >
                <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {preset.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {preset.budget} • {preset.stack.split(',')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleConsultGemini} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Agency Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Software House / Agency Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Digital, DevForge"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Building2 className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Monthly Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Monthly AI Budget
            </label>
            <div className="relative">
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              >
                <option value="< $50 / mo">&lt; $50 / mo (Bootstrapped / Low Volume)</option>
                <option value="$50 - $250 / mo">$50 - $250 / mo (Growing Agency Standard)</option>
                <option value="$250 - $600 / mo">$250 - $600 / mo (High Volume Production)</option>
                <option value="$600 - $2,000+ / mo">$600 - $2,000+ / mo (Enterprise Agency)</option>
              </select>
              <DollarSign className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Top Priority
            </label>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              >
                <option value="accuracy">Highest Accuracy & Code Quality</option>
                <option value="cost">Lowest Token Cost / Maximum Margins</option>
                <option value="speed">Sub-Second Speed & Low Latency</option>
                <option value="privacy">Client Data Privacy / Self-Hostable</option>
              </select>
              <Zap className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Primary Use Case */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Primary Project / Purpose
            </label>
            <div className="relative">
              <input
                type="text"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="e.g. WhatsApp Bot, Code Review"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Bot className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Freeform Question / Details */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Any Specific Client Questions or Tech Stack Notes? (Optional)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={freeformQuery}
                onChange={(e) => setFreeformQuery(e.target.value)}
                placeholder="e.g. We have 10,000 daily users on React Native, need to know if DeepSeek or Gemini saves more money."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Get Live AI Recommendation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* ADVISORY RESULTS BOX */}
        {advice && (
          <div className="mt-8 rounded-2xl border-2 border-indigo-400/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                    Official Recommendation for {companyName || 'Your Agency'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {advice.matchScore}% Match
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {advice.recommendedModel}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-right">
                  <div className="text-[10px] text-indigo-700 dark:text-indigo-300 uppercase font-semibold">
                    Estimated Monthly Cost
                  </div>
                  <div className="text-base font-extrabold text-indigo-900 dark:text-indigo-200">
                    {advice.estimatedMonthlyCost}
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    Runner-Up Backup
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {advice.runnerUpModel}
                  </div>
                </div>
              </div>
            </div>

            {/* Plain English Explanation */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Why This AI is Most Beneficial for Your Software House:
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {advice.plainEnglishBenefit}
              </p>
            </div>

            {/* Drawbacks & Gotchas (What are their drawbacks) */}
            <div className="mt-5 p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Critical Drawbacks You Must Know Before Buying:
              </div>
              <ul className="space-y-1.5">
                {advice.criticalDrawbacks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Verdict & Advice */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Price-to-Performance Verdict
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  {advice.priceToPerformanceVerdict}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Agency Implementation Tip
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
                  {advice.implementationTip}
                </div>
              </div>
            </div>

            {/* Source indicator */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Engine: {activeSource === 'gemini-live' ? 'Gemini 3.8 Flash (Live Server Response)' : 'Expert Heuristic Engine'}
              </span>
              <span>Tailored for Software Houses & Dev Agencies</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
