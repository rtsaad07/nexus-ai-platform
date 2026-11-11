'use client';

import { Cpu, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAddModal: () => void;
}

export default function Footer({ onOpenAddModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
            NEXUS AI 2026
          </span>
          <span className="text-xs text-slate-400 font-normal">
            · Frontier Models & Knowledge Platform
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <a
            href="https://deepmind.google/technologies/gemini/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Google Gemini
          </a>
          <a
            href="https://www.anthropic.com/claude"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Anthropic Claude
          </a>
          <a
            href="https://www.deepseek.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            DeepSeek AI
          </a>
          <a
            href="https://www.heygen.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            HeyGen
          </a>
          <button
            onClick={onOpenAddModal}
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            + Add Information
          </button>
        </div>

        {/* Copyright & Top */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>© 2026 NEXUS AI. Universal Knowledge Base.</span>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
