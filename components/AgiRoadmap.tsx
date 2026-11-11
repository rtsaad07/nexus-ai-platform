'use client';

import { AgiMilestone } from '../lib/types';
import { Compass, CheckCircle2, Clock, AlertTriangle, Zap, Database, Globe, Shield, Plus } from 'lucide-react';

interface AgiRoadmapProps {
  milestones: AgiMilestone[];
  onOpenAddModal: () => void;
}

export default function AgiRoadmap({
  milestones,
  onOpenAddModal,
}: AgiRoadmapProps) {
  const levels = [
    {
      level: 1,
      name: 'Level 1: Emerging Generalist',
      threshold: 'Equal to unskilled human',
      status: 'Achieved (2022-2023)',
      badgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60',
      description: 'Open-domain conversation, universal knowledge QA, creative writing.',
    },
    {
      level: 2,
      name: 'Level 2: Competent Reasoner',
      threshold: '50th percentile skilled human',
      status: 'Achieved (2024-2025)',
      badgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60',
      description: 'Multi-step deductive logic, formal math proofing, autonomous self-correction (R1, o1/o3).',
    },
    {
      level: 3,
      name: 'Level 3: Expert Autonomous Agent',
      threshold: '90th percentile skilled human',
      status: 'In Progress (2025-2026)',
      badgeClass: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60',
      description: 'Long-horizon scientific experiments, autonomous repository maintenance, desktop UI mastery.',
    },
    {
      level: 4,
      name: 'Level 4: Virtuoso Polymath',
      threshold: '99th percentile across all domains',
      status: 'Projected (2026-2028)',
      badgeClass: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60',
      description: 'Unified physical world simulation, robotics dexterous transfer, autonomous theorem invention.',
    },
    {
      level: 5,
      name: 'Level 5: Superintelligence (ASI)',
      threshold: 'Superhuman execution beyond all humanity',
      status: 'Projected (2028+)',
      badgeClass: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60',
      description: 'Surpasses aggregate intellectual capacity of all humans combined; requires solved superalignment.',
    },
  ];

  const bottlenecks = [
    {
      title: 'Electrical Grid & Energy Capacity',
      icon: Zap,
      desc: 'Next-gen gigawatt datacenter clusters require dedicated nuclear small modular reactors (SMRs) or grid overhauls.',
    },
    {
      title: 'High-Quality Human Data Exhaustion',
      icon: Database,
      desc: 'Internet text tokens are essentially exhausted; frontier models now scale via RL environments and synthetic self-play.',
    },
    {
      title: 'Physical World Spatial Grounding',
      icon: Globe,
      desc: 'Bridging digital tokens to real-world continuous dynamics, robotics contact physics, and spatial safety.',
    },
    {
      title: 'Provable Superalignment & Control',
      icon: Shield,
      desc: 'Ensuring autonomous systems exceeding human intelligence remain provably aligned with human flourishing and intent.',
    },
  ];

  return (
    <section id="agi" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">
            Roadmap 2026 - 2030+
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Artificial General Intelligence (AGI) Trajectory
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track five progressive stages of artificial general capability, verified evidence, and physical bottlenecks.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add AGI Milestone</span>
        </button>
      </div>

      {/* Levels Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">0{lvl.level}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${lvl.badgeClass}`}>
                  {lvl.status.split(' ')[0]}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {lvl.name}
              </h3>
              <div className="text-[11px] font-mono text-slate-500">
                {lvl.threshold}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                {lvl.description}
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
              {lvl.status}
            </div>
          </div>
        ))}
      </div>

      {/* Verified Milestones & User Additions List */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Verified Breakthroughs & Progress Log ({milestones.length})
          </h3>
          <span className="text-xs text-slate-400">Updated in real-time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  Level {milestone.level} · {milestone.category}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{milestone.timeframe}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {milestone.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {milestone.summary}
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                <strong>Evidence:</strong> {milestone.keyEvidence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining Bottlenecks Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Major Physical & Architectural Bottlenecks:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bottlenecks.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {b.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
