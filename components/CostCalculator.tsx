'use client';

import { useState } from 'react';
import { ModelItem } from '../lib/types';
import { calculateInferenceCost, formatTokenCount } from '../lib/calculator';
import { Calculator, DollarSign, Zap, TrendingDown, Layers } from 'lucide-react';

interface CostCalculatorProps {
  models: ModelItem[];
}

export default function CostCalculator({ models }: CostCalculatorProps) {
  const [promptTokens, setPromptTokens] = useState<number>(100000); // 100k default
  const [completionTokens, setCompletionTokens] = useState<number>(4000); // 4k default
  const [cachingRatio, setCachingRatio] = useState<number>(0.5); // 50% cached default

  // Presets
  const applyPreset = (prompt: number, completion: number, cached: number) => {
    setPromptTokens(prompt);
    setCompletionTokens(completion);
    setCachingRatio(cached);
  };

  const calculatedCosts = models.map((model) => {
    const cost = calculateInferenceCost(
      promptTokens,
      completionTokens,
      model.inputPricePerMillion,
      model.outputPricePerMillion,
      cachingRatio
    );
    return {
      model,
      ...cost,
    };
  }).sort((a, b) => a.totalCost - b.totalCost);

  const cheapestCost = calculatedCosts[0]?.totalCost || 0.001;

  return (
    <section id="calculator" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Inference Economics
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Token Inference Cost Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Simulate real-world token consumption, evaluate prompt caching discounts, and observe the
          massive price divergence between frontier reasoning titans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls Column */}
        <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Calculator className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Workload Parameters
            </h3>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Workload Presets:
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset(25000, 2000, 0.2)}
                className="px-3 py-1.5 text-xs text-left rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                1. Standard Chat Turn (25K in / 2K out)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(150000, 8000, 0.6)}
                className="px-3 py-1.5 text-xs text-left rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                2. Full Repository Audit (150K in / 8K out)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(1000000, 16000, 0.8)}
                className="px-3 py-1.5 text-xs text-left rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                3. Million-Token Video Archive (1M in / 16K out)
              </button>
            </div>
          </div>

          {/* Input Prompt Tokens Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Prompt Tokens:
              </span>
              <span className="font-mono font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                {promptTokens.toLocaleString()} ({formatTokenCount(promptTokens)})
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={2000000}
              step={1000}
              value={promptTokens}
              onChange={(e) => setPromptTokens(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1K</span>
              <span>500K</span>
              <span>1M</span>
              <span>2M (Gemini max)</span>
            </div>
          </div>

          {/* Completion Output Tokens Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Completion Tokens:
              </span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                {completionTokens.toLocaleString()} ({formatTokenCount(completionTokens)})
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={64000}
              step={500}
              value={completionTokens}
              onChange={(e) => setCompletionTokens(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>500</span>
              <span>16K</span>
              <span>32K</span>
              <span>64K</span>
            </div>
          </div>

          {/* Prompt Caching Discount Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Prompt Cache Hit Rate:
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {Math.round(cachingRatio * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={cachingRatio}
              onChange={(e) => setCachingRatio(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-normal">
              Prompt caching saves up to 75% on repeated system prompts and document context.
            </p>
          </div>
        </div>

        {/* Results Comparison Column */}
        <div className="lg:col-span-2 rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Calculated Cost Comparison (Per Query)
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Ranked from lowest cost to highest
              </div>
            </div>
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              USD ($) Tabular Figures
            </div>
          </div>

          {/* Table / List */}
          <div className="space-y-3">
            {calculatedCosts.map((item, idx) => {
              const multiple = (item.totalCost / cheapestCost).toFixed(1);

              return (
                <div
                  key={item.model.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.model.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({item.model.provider})
                      </span>
                      {idx === 0 && (
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          Lowest Cost
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      In: ${item.model.inputPricePerMillion}/M · Out: ${item.model.outputPricePerMillion}/M
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:text-right font-mono">
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                        ${item.totalCost < 0.0001 ? '<$0.0001' : item.totalCost.toFixed(4)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {idx === 0 ? 'Baseline' : `${multiple}x baseline`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>
              DeepSeek & Gemini Flash provide up to <strong>20x–40x cost reduction</strong> compared
              to flagship frontier endpoints for high-throughput automated workloads.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
