'use client';

import { useData } from '../../lib/DataContext';
import ArchitectureVisualizer from '../../components/ArchitectureVisualizer';
import Link from 'next/link';
import { BookOpen, ArrowRight, FileText, Cpu, ExternalLink, Sparkles, Layers } from 'lucide-react';

const SEMINAL_PAPERS = [
  {
    title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
    authors: 'DeepSeek-AI Research Team',
    date: 'January 2025',
    category: 'Reasoning & Reinforcement Learning',
    summary:
      'Demonstrates that reasoning capabilities, multi-step self-correction, and long chain-of-thought verification emerge naturally through large-scale reinforcement learning without supervised fine-tuning.',
    keyTakeaway:
      'MATH-500 score of 97.3% and AIME parity with OpenAI o1, unlocked via GRPO (Group Relative Policy Optimization).',
    link: 'https://github.com/deepseek-ai/DeepSeek-R1',
  },
  {
    title: 'DeepSeek-V3 Technical Report: Architecture, Multi-Head Latent Attention & MoE',
    authors: 'DeepSeek-AI Architecture Group',
    date: 'December 2024',
    category: 'Architecture & Inference Efficiency',
    summary:
      'Introduces Multi-Head Latent Attention (MLA), compressing the KV-cache into low-rank latent vectors to slash serving memory by 93%, paired with 256 fine-grained MoE experts.',
    keyTakeaway:
      'Total 671B parameters with only 37B activated per token, trained for under $6M USD on consumer-scale clusters.',
    link: 'https://github.com/deepseek-ai/DeepSeek-V3',
  },
  {
    title: 'Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens of Context',
    authors: 'Google DeepMind Core Architecture Team',
    date: 'February 2024 (Updated 2025)',
    category: 'Long Context & Native Multimodality',
    summary:
      'Details RingAttention distributed scaling and native multi-modal unified token spaces, enabling continuous recall across 2,000,000 tokens of joint video, audio, code, and text.',
    keyTakeaway:
      '>99.7% needle-in-a-haystack retrieval across 1 hour of video or entire enterprise code repositories in a single prompt.',
    link: 'https://deepmind.google/technologies/gemini/',
  },
  {
    title: 'The Claude 3.5 Model Family: Sonnet & Haiku Architecture and Computer Use',
    authors: 'Anthropic Frontier Alignment & Systems Team',
    date: 'October 2024',
    category: 'Autonomous Agents & Constitutional AI',
    summary:
      'Introduces the Computer Use API, allowing the model to perceive desktop screenshots, calculate cursor coordinates, execute mouse clicks, and type keystrokes with Constitutional safety boundaries.',
    keyTakeaway:
      'Set the state-of-the-art on SWE-bench Verified (49.0%) and OSWorld desktop navigation benchmarks.',
    link: 'https://www.anthropic.com/news/3-5-models-and-computer-use',
  },
];

export default function ResearchPapersPage() {
  const { architectureTopics, openAddModal } = useData();

  return (
    <main className="pt-8 pb-16 space-y-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                Dedicated Frontier AI Research & Architecture
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Frontier AI Research Papers & Architecture
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Dive deep into the mathematical foundations, tensor routing, and published technical papers behind Gemini, Claude, and DeepSeek. Understand Multi-Head Latent Attention (MLA), RingAttention distributed scaling, and emergent chain-of-thought reasoning.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                + Contribute Paper
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
        </div>
      </section>

      {/* Published Technical Reports & Papers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Seminal Frontier Research Papers (2024-2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Peer-reviewed technical reports that shifted the compute, reasoning, and context boundaries of modern AI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEMINAL_PAPERS.map((paper, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold">
                    {paper.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{paper.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {paper.title}
                </h3>

                <div className="text-xs text-slate-500 font-mono">{paper.authors}</div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {paper.summary}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Key Empirical Finding:</span>
                  <span className="text-slate-600 dark:text-slate-300">{paper.keyTakeaway}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 transition-colors"
                >
                  <span>Read Full Paper / Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architectural Visualizer & Token Routing Simulator */}
      <ArchitectureVisualizer topics={architectureTopics} />
    </main>
  );
}
