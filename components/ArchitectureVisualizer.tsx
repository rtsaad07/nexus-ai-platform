'use client';

import { useState } from 'react';
import { ArchitectureTopic } from '../lib/types';
import { Cpu, Zap, GitBranch, Layers, Play, CheckCircle2, RefreshCw } from 'lucide-react';

interface ArchitectureVisualizerProps {
  topics: ArchitectureTopic[];
}

export default function ArchitectureVisualizer({
  topics,
}: ArchitectureVisualizerProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || 'arch-mla');

  // Interactive MoE Simulator state
  const [activeToken, setActiveToken] = useState<string>('Code Synthesis: def quicksort()');
  const [routedExperts, setRoutedExperts] = useState<number[]>([12, 45, 88, 142, 199, 210, 230, 255]);
  const [isSimulating, setIsSimulating] = useState(false);

  const sampleTokens = [
    { label: 'Code Synthesis', token: 'def solve_graph_cycles(adj):', experts: [14, 45, 88, 112, 160, 201, 230, 254] },
    { label: 'Mathematical Logic', token: '∫ (x² · eˣ) dx = ?', experts: [3, 29, 67, 102, 155, 188, 220, 249] },
    { label: 'Creative Writing', token: 'The starlight flickered over obsidian peaks...', experts: [8, 33, 77, 95, 134, 172, 215, 240] },
    { label: 'Multimodal Audio/Video', token: '[Audio frame 44.1kHz speech segment]', experts: [19, 52, 91, 125, 166, 190, 222, 250] },
  ];

  const handleSimulateRouting = (item: (typeof sampleTokens)[0]) => {
    setActiveToken(item.token);
    setIsSimulating(true);
    setTimeout(() => {
      setRoutedExperts(item.experts);
      setIsSimulating(false);
    }, 450);
  };

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <section id="architecture" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
          Core Engine Foundations
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          How Modern Large AI Models Work
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          From raw Transformer attention matrices to low-rank latent KV-cache compression (MLA),
          256-expert sparse routing (MoE), and test-time chain-of-thought verification.
        </p>
      </div>

      {/* Pillar Cards Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-sky-500 shadow-md ring-2 ring-sky-500/20'
                  : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                      isSelected
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    0{topic.pillarNumber}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {topic.diagramType.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {topic.title}
                </h3>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">
                {topic.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Deep Explainer & Interactive Diagram */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="text-xs font-mono text-sky-600 dark:text-sky-400">
              Pillar 0{currentTopic.pillarNumber} Deep Dive
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {currentTopic.title}
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentTopic.subtitle}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-200">
            <span>Inference Efficiency Paradigm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Explanatory Breakdown */}
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentTopic.summary}
            </p>

            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Key Technical Mechanics:
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {currentTopic.technicalDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Live Interactive Visualizer Simulator */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Interactive DeepSeekMoE & MLA Token Router
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                256 Total Experts (8 Active / Token)
              </span>
            </div>

            {/* Token Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Test Input Token Vector:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {sampleTokens.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulateRouting(item)}
                    className={`px-2.5 py-1.5 text-xs text-left rounded-lg border transition-all ${
                      activeToken === item.token
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-700 dark:text-sky-300 font-semibold'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Token Feed */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 truncate">
              <span className="text-sky-500 mr-2">&gt;</span>
              {activeToken}
            </div>

            {/* Simulated 256 Expert Subnetworks Grid representation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Expert Sub-Network Activation Array:</span>
                <span className="font-mono text-emerald-500">
                  {routedExperts.length} Active / 248 Dormant
                </span>
              </div>

              <div className="grid grid-cols-16 gap-1 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {Array.from({ length: 64 }).map((_, i) => {
                  const isActive = routedExperts.includes(i * 4);
                  return (
                    <div
                      key={i}
                      title={`Expert Sub-Network #${i * 4} (${isActive ? 'Active' : 'Dormant'})`}
                      className={`h-3 rounded-xs transition-all duration-300 ${
                        isActive
                          ? 'bg-emerald-500 scale-110 shadow-xs shadow-emerald-500/50'
                          : 'bg-slate-200 dark:bg-slate-800 opacity-60'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                <span>Active Compute: 37B params</span>
                <span>Active KV Memory: -93% via MLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
