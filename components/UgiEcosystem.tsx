'use client';

import { useState } from 'react';
import { UgiTool, UgiCategory } from '../lib/types';
import { Video, Mic, UserCheck, Image as ImageIcon, Box, Code, ExternalLink, Plus, Workflow } from 'lucide-react';

interface UgiEcosystemProps {
  tools: UgiTool[];
  onOpenAddModal: () => void;
}

export default function UgiEcosystem({
  tools,
  onOpenAddModal,
}: UgiEcosystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<UgiCategory | 'all'>('all');

  const categories: { id: UgiCategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Media Suites', icon: Workflow },
    { id: 'video', label: 'Video (Veo, Sora, Runway)', icon: Video },
    { id: 'voice', label: 'Voice & Audio (ElevenLabs)', icon: Mic },
    { id: 'avatar', label: 'Digital Avatars (HeyGen)', icon: UserCheck },
    { id: 'image', label: 'Image & Art (Midjourney)', icon: ImageIcon },
    { id: '3d', label: '3D Meshes (Meshy)', icon: Box },
    { id: 'code_agents', label: 'Code & Web Agents', icon: Code },
  ];

  const filteredTools = tools.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <section id="ugi" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            User-Generated Intelligence (UGI)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            UGI Multi-Modal Creation Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Where creators orchestrate generative video, synthetic voice, digital avatars, and code agents
            into autonomous production pipelines.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add UGI Tool</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    By {tool.developer}
                  </div>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Visit Tool Portal"
                  aria-label={`Open ${tool.name} website`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Capability: </span>
                  <span className="text-slate-600 dark:text-slate-300">{tool.capability}</span>
                </div>
                <div className="pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span className="font-semibold text-slate-900 dark:text-white">Recipe: </span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {tool.typicalWorkflow}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-slate-400 capitalize">
                Category: {tool.category}
              </span>
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Launch Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Practical Multi-Modal Production Pipelines */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Workflow className="w-4 h-4 text-emerald-500" />
          <span>Curated Autonomous UGI Production Pipelines</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Pipeline A: 4K Cinematic AI Short Film
            </h4>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-decimal list-inside">
              <li>Draft script and shot list in <strong>Claude 3.5 Sonnet</strong>.</li>
              <li>Generate keyframes & concept aesthetics in <strong>Midjourney v6</strong>.</li>
              <li>Animate video clips with camera motion brush in <strong>Runway Gen-3 / Veo</strong>.</li>
              <li>Synthesize character voices and ambient Foley audio in <strong>ElevenLabs</strong>.</li>
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Pipeline B: Global Multilingual Video Localization
            </h4>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-decimal list-inside">
              <li>Record 2-minute English founder presentation video.</li>
              <li>Upload master footage into <strong>HeyGen Video Translate</strong>.</li>
              <li>Automatically generate clones in Japanese, German, Spanish, and Mandarin.</li>
              <li>Lip-sync perfectly aligned with translated audio wave cadence.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
