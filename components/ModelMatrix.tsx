'use client';

import { useState } from 'react';
import { ModelItem, ModelCategory } from '../lib/types';
import {
  ExternalLink,
  Plus,
  CheckSquare,
  Square,
  X,
  Scale,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  Zap,
} from 'lucide-react';

interface ModelMatrixProps {
  models: ModelItem[];
  searchQuery: string;
  onOpenAddModal: () => void;
  onSelectForCalculator?: (modelId: string) => void;
}

type SoftwareHouseFilter = 'all' | 'coding' | 'support' | 'rag' | 'budget';

export default function ModelMatrix({
  models,
  searchQuery,
  onOpenAddModal,
  onSelectForCalculator,
}: ModelMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory>('all');
  const [agencyFilter, setAgencyFilter] = useState<SoftwareHouseFilter>('all');
  const [comparedModelIds, setComparedModelIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);

  // Filter models
  const filteredModels = models.filter((model) => {
    // Provider category match
    const categoryMatch =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'other'
        ? model.userContributed || model.providerCategory === 'other'
        : model.providerCategory === selectedCategory;

    // Software house purpose match
    let agencyMatch = true;
    if (agencyFilter === 'coding') {
      agencyMatch =
        model.id === 'claude-3-5-sonnet' ||
        model.id === 'deepseek-r1' ||
        model.id === 'openai-o3-mini' ||
        model.id === 'deepseek-v3';
    } else if (agencyFilter === 'support') {
      agencyMatch =
        model.id === 'gemini-1-5-flash' ||
        model.id === 'claude-3-5-haiku' ||
        model.id === 'deepseek-v3' ||
        model.priceTier === '$';
    } else if (agencyFilter === 'rag') {
      agencyMatch =
        model.contextWindow.includes('2M') ||
        model.contextWindow.includes('1M') ||
        model.id === 'gemini-1-5-pro' ||
        model.id === 'gemini-1-5-flash';
    } else if (agencyFilter === 'budget') {
      agencyMatch = model.priceTier === '$';
    }

    // Search query match
    if (!searchQuery.trim()) return categoryMatch && agencyMatch;

    const q = searchQuery.toLowerCase();
    const textMatch =
      model.name.toLowerCase().includes(q) ||
      model.provider.toLowerCase().includes(q) ||
      model.architecture.toLowerCase().includes(q) ||
      model.description.toLowerCase().includes(q) ||
      model.strengths.some((s) => s.toLowerCase().includes(q)) ||
      (model.bestForSoftwareHouses && model.bestForSoftwareHouses.toLowerCase().includes(q)) ||
      (model.drawbacks && model.drawbacks.some((d) => d.toLowerCase().includes(q)));

    return categoryMatch && agencyMatch && textMatch;
  });

  const toggleCompare = (id: string) => {
    if (comparedModelIds.includes(id)) {
      setComparedModelIds(comparedModelIds.filter((item) => item !== id));
    } else {
      if (comparedModelIds.length >= 3) {
        setComparedModelIds([...comparedModelIds.slice(1), id]);
      } else {
        setComparedModelIds([...comparedModelIds, id]);
      }
    }
  };

  const comparedModels = models.filter((m) => comparedModelIds.includes(m.id));

  return (
    <section id="models" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Building className="w-3.5 h-3.5" />
            Software House Model Directory & Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Compare AI Bots: Benefits & Critical Drawbacks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            See exactly which AI is best for your price range, how much it will cost your agency per 1,000 requests, and the gotchas to watch out for before subscribing.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {comparedModelIds.length > 0 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Selected ({comparedModelIds.length})</span>
            </button>
          )}

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Model Spec</span>
          </button>
        </div>
      </div>

      {/* Agency Use Case Quick Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
          Quick View:
        </span>
        {(
          [
            { id: 'all', label: 'All Models' },
            { id: 'coding', label: '💻 Best for Coding & PRs' },
            { id: 'support', label: '💬 Best for Support Bots' },
            { id: 'rag', label: '📚 Best for Repo RAG' },
            { id: 'budget', label: '🟢 Low Budget ($10-$50)' },
          ] as { id: SoftwareHouseFilter; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAgencyFilter(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap shrink-0 ${
              agencyFilter === tab.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Provider Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl overflow-x-auto border border-slate-200/80 dark:border-slate-800">
        {(
          [
            { id: 'all', label: 'All Providers' },
            { id: 'gemini', label: 'Google Gemini' },
            { id: 'claude', label: 'Anthropic Claude' },
            { id: 'deepseek', label: 'DeepSeek AI' },
            { id: 'openai', label: 'OpenAI' },
            { id: 'other', label: 'Community Models' },
          ] as { id: ModelCategory; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === tab.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const isCompared = comparedModelIds.includes(model.id);
          const isExpanded = expandedModelId === model.id;

          const priceBadgeColor =
            model.priceTier === '$'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
              : model.priceTier === '$$'
              ? 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
              : 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300';

          return (
            <div
              key={model.id}
              className={`rounded-3xl p-6 bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                isCompared
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                  : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Card Top: Provider & Price tier badge */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {model.provider}
                    </span>
                    {model.userContributed && (
                      <span className="text-sky-600 dark:text-sky-400 font-mono text-[10px] px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950">
                        Community
                      </span>
                    )}
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${priceBadgeColor}`}>
                    {model.priceTier === '$' ? '$ Budget' : model.priceTier === '$$' ? '$$ Moderate' : '$$$ Flagship'}
                  </span>
                </div>

                {/* Model Title & Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {model.name}
                    </h3>
                    {model.officialUrl && (
                      <a
                        href={model.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                        title="Visit Official Documentation"
                        aria-label={`Official documentation for ${model.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    <span>{model.architecture.split(' ')[0]}</span>
                    <span>•</span>
                    <span>Context: {model.contextWindow}</span>
                  </div>
                </div>

                {/* Agency Pricing Metrics Box */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Cost / 1k Tasks</div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {model.costPer1kQueries}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Typical Agency Bill</div>
                    <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      {model.monthlyEstimateForAgency}
                    </div>
                  </div>
                </div>

                {/* Why Software Houses Buy It (Benefit) */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Why Software Houses Buy It:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                    {model.bestForSoftwareHouses}
                  </p>
                </div>

                {/* Critical Drawbacks (What are their drawbacks) */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Critical Drawbacks to Know:</span>
                  </div>
                  <ul className="space-y-1 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300">
                    {model.drawbacks.slice(0, isExpanded ? model.drawbacks.length : 2).map((drawback, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                        <span>{drawback}</span>
                      </li>
                    ))}
                  </ul>

                  {model.drawbacks.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setExpandedModelId(isExpanded ? null : model.id)}
                      className="mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>{isExpanded ? 'Show less' : `+ ${model.drawbacks.length - 2} more drawbacks`}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                {/* Ideal Use Cases Pill Tags */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Best For:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {model.idealUseCases.map((useCase, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Pricing per 1M & Compare Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                  <span className="text-slate-900 dark:text-white font-bold">
                    ${model.inputPricePerMillion}
                  </span>{' '}
                  / ${model.outputPricePerMillion}{' '}
                  <span className="text-[10px] text-slate-400">1M</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCompare(model.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      isCompared
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isCompared ? (
                      <>
                        <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Compared</span>
                      </>
                    ) : (
                      <>
                        <Square className="w-3.5 h-3.5" />
                        <span>Compare</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredModels.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No models found matching your current filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setAgencyFilter('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Head-to-Head Comparison Drawer / Modal */}
      {showComparisonModal && comparedModels.length >= 2 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <span>Software House Model Comparison</span>
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Side-by-side pricing, benefits, and critical drawbacks
                </div>
              </div>

              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Close comparison view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 w-44">
                      Agency Spec
                    </th>
                    {comparedModels.map((m) => (
                      <th
                        key={m.id}
                        className="py-3 px-4 font-bold text-slate-900 dark:text-white text-sm"
                      >
                        {m.name}
                        <div className="text-[11px] font-normal text-slate-500">{m.provider}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">Price Tier</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                        {m.priceTier} ({m.costPer1kQueries})
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">Monthly Agency Estimate</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {m.monthlyEstimateForAgency}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">Software House Benefit</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-xs leading-relaxed">
                        {m.bestForSoftwareHouses}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">Critical Drawback</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-xs text-amber-700 dark:text-amber-300">
                        {m.drawbacks[0]}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">Context Window</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 font-mono font-semibold">
                        {m.contextWindow}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">SWE-bench Coding</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 font-mono font-bold text-purple-600 tabular-nums">
                        {m.benchmarks.sweBench ? `${m.benchmarks.sweBench}%` : 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-500">MATH-500 Reasoning</td>
                    {comparedModels.map((m) => (
                      <td key={m.id} className="py-3 px-4 font-mono font-bold text-sky-600 tabular-nums">
                        {m.benchmarks.math500 ? `${m.benchmarks.math500}%` : 'N/A'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setComparedModelIds([])}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Clear all selections
              </button>

              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
