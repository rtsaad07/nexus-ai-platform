'use client';

import { useState } from 'react';
import { Sparkles, Feather, Cpu, ExternalLink, ArrowRight, Check, X, Layers, Zap, Eye, ShieldCheck } from 'lucide-react';

export default function FrontierTrio() {
  const [activeModal, setActiveModal] = useState<'gemini' | 'claude' | 'deepseek' | null>(null);

  return (
    <section id="frontier" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
          The Frontier Trio
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Three Paradigms Defining Artificial Intelligence
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Google DeepMind, Anthropic, and DeepSeek represent three fundamentally distinct
          philosophies of scaling: massive multimodal context, constitutional autonomy, and
          hyper-efficient open-weights reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Gemini Card */}
        <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gemini</h3>
                  <div className="text-xs text-sky-600 dark:text-sky-400 font-mono">Google DeepMind</div>
                </div>
              </div>
              <a
                href="https://deepmind.google/technologies/gemini/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                title="Official Gemini Portal"
                aria-label="Official Gemini Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Built natively multimodal from inception. Gemini leads the industry in sustained active context
              capacity (up to 2,000,000 tokens), allowing entire video archives, full audio recordings, and
              sprawling code repositories to be ingested and cross-examined in a single prompt.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Native Joint Audio, Video, Code, and Text tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Industry-best 2M Token active context recall (&gt;99.7%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>TPU v5p superclusters driving high-throughput Flash variants</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => setActiveModal('gemini')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-900/60 transition-colors text-center"
            >
              Deep Dive Gemini Architecture
            </button>
          </div>
        </div>

        {/* Claude Card */}
        <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Claude</h3>
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-mono">Anthropic</div>
                </div>
              </div>
              <a
                href="https://www.anthropic.com/claude"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Official Claude Portal"
                aria-label="Official Claude Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Renowned for unmatched coding mastery, complex nuance comprehension, and Constitutional AI alignment.
              Claude 3.5 Sonnet is the gold standard for software development, live code execution in Artifacts,
              and autonomous desktop Computer Use.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>SWE-bench Verified Leader (Autonomous software fixes)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Interactive live Artifacts workspace for web & code previews</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Computer Use API (Autonomous desktop UI mouse/key navigation)</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => setActiveModal('claude')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-900/60 transition-colors text-center"
            >
              Deep Dive Claude Architecture
            </button>
          </div>
        </div>

        {/* DeepSeek Card */}
        <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">DeepSeek</h3>
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-mono">DeepSeek AI</div>
                </div>
              </div>
              <a
                href="https://www.deepseek.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Official DeepSeek Portal"
                aria-label="Official DeepSeek Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The open-weights disruptor that rewrote the economics of frontier intelligence. DeepSeek-R1 and V3
              introduced pure reinforcement learning reasoning, Multi-Head Latent Attention (MLA), and fine-grained
              MoE at a fraction of closed-source compute expenses.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Open Weights & Distilled models for consumer hardware</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Multi-Head Latent Attention slashes KV-cache memory by 93%</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>DeepSeekMoE: 671B parameters with 37B active per token</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => setActiveModal('deepseek')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/60 transition-colors text-center"
            >
              Deep Dive DeepSeek Architecture
            </button>
          </div>
        </div>
      </div>

      {/* Deep Dive Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    activeModal === 'gemini'
                      ? 'bg-sky-500/20 text-sky-500'
                      : activeModal === 'claude'
                      ? 'bg-purple-500/20 text-purple-500'
                      : 'bg-rose-500/20 text-rose-500'
                  }`}
                >
                  {activeModal === 'gemini' && <Sparkles className="w-4 h-4" />}
                  {activeModal === 'claude' && <Feather className="w-4 h-4" />}
                  {activeModal === 'deepseek' && <Cpu className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeModal === 'gemini' && 'Google Gemini Architecture Deep Dive'}
                    {activeModal === 'claude' && 'Anthropic Claude Architecture Deep Dive'}
                    {activeModal === 'deepseek' && 'DeepSeek MLA & Reasoning Architecture'}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Technical Specifications & Breakthrough Details
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Close architecture modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Content */}
            {activeModal === 'gemini' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  Unlike traditional language models retrofitted with visual encoders, Gemini is
                  trained natively multimodal across text, code, audio waveforms, video frames, and
                  PDF documents in a unified token space.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Architectural Innovations:</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li><strong>RingAttention Distributed Scaling:</strong> Allows chunked token attention calculation over TPU clusters, enabling 1M to 2M tokens without memory exhaustion.</li>
                    <li><strong>Audio/Video Temporal Synchronization:</strong> Understands timestamps, speech inflection, acoustic cues, and spatial video continuity.</li>
                    <li><strong>Sparse Mixture-of-Experts:</strong> Routes specialized queries to distinct expert pathways for low latency and high parameter capacity.</li>
                  </ul>
                </div>
                <div className="text-xs text-slate-500">
                  Ideal Workloads: Full codebase refactoring, long audiovisual analysis, enterprise search across million-token corpuses.
                </div>
              </div>
            )}

            {activeModal === 'claude' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  Anthropic’s Claude emphasizes rigorous alignment through Constitutional AI (RLAIF)
                  combined with unmatched autonomous code synthesis and real-time computer navigation.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Architectural Innovations:</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li><strong>Constitutional AI Self-Critique:</strong> AI evaluates its own responses against human rights and safety principles during training without needing manual human labeling for every edge case.</li>
                    <li><strong>Computer Use API:</strong> Native reasoning over desktop screenshots, moving mouse cursors, typing keystrokes, and executing terminal workflows.</li>
                    <li><strong>Artifacts Dynamic Workspace:</strong> Generates self-contained interactive React, SVG, and HTML modules that run side-by-side with conversation.</li>
                  </ul>
                </div>
                <div className="text-xs text-slate-500">
                  Ideal Workloads: Autonomous engineering, agentic desktop automation, complex nuanced writing, structured analytical reports.
                </div>
              </div>
            )}

            {activeModal === 'deepseek' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  DeepSeek challenged the conventional assumption that frontier AI requires tens of thousands
                  of state-of-the-art GPUs. Through Multi-Head Latent Attention (MLA) and fine-grained DeepSeekMoE,
                  they achieved parity with closed giants at 1/10th the inference compute.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Architectural Innovations:</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li><strong>Multi-Head Latent Attention (MLA):</strong> Compresses the KV cache into a low-dimensional latent space vector, slashing memory overhead by 93% and unlocking massive inference batch sizes.</li>
                    <li><strong>DeepSeekMoE:</strong> 256 fine-grained experts with 8 active per token (37B active out of 671B total parameters) plus dedicated shared experts.</li>
                    <li><strong>Pure RL Chain-of-Thought (R1):</strong> Proved that multi-step deductive reasoning and self-reflection emerge naturally from reinforcement rewards without human supervised examples.</li>
                  </ul>
                </div>
                <div className="text-xs text-slate-500">
                  Ideal Workloads: Competitive mathematics, formal theorem proving, budget-friendly high-throughput inference, self-hosted enterprise deployments.
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close Architecture Deep Dive
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
