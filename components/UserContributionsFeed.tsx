'use client';

import { useState } from 'react';
import { UserSubmittedInformation, InformationType } from '../lib/types';
import { Database, Plus, Download, Upload, Trash2, Tag, Calendar, ExternalLink, Sparkles } from 'lucide-react';

interface UserContributionsFeedProps {
  contributions: UserSubmittedInformation[];
  onOpenAddModal: () => void;
  onExportData: () => void;
  onImportData: (data: string) => void;
  onResetData: () => void;
  onDeleteContribution: (id: string) => void;
}

export default function UserContributionsFeed({
  contributions,
  onOpenAddModal,
  onExportData,
  onImportData,
  onResetData,
  onDeleteContribution,
}: UserContributionsFeedProps) {
  const [selectedFilter, setSelectedFilter] = useState<InformationType | 'all'>('all');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  const filtered = contributions.filter(
    (c) => selectedFilter === 'all' || c.infoType === selectedFilter
  );

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');
    try {
      JSON.parse(importJsonText); // validate JSON
      onImportData(importJsonText);
      setImportModalOpen(false);
      setImportJsonText('');
    } catch {
      setImportError('Invalid JSON format. Please verify the raw JSON text.');
    }
  };

  return (
    <section id="community" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
            Open Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Community Knowledge & Contributed Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse, export, and contribute user-submitted information entries across frontier models,
            AGI breakthroughs, and UGI workflows.
          </p>
        </div>

        {/* Global DB Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onExportData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Download Knowledge Base JSON"
          >
            <Download className="w-3.5 h-3.5 text-sky-500" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => setImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Import custom entries from JSON"
          >
            <Upload className="w-3.5 h-3.5 text-purple-500" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={onResetData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Reset to initial curated dataset"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Entry</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto text-xs font-semibold">
        {(
          [
            { id: 'all', label: `All Entries (${contributions.length})` },
            { id: 'model', label: 'Models' },
            { id: 'agi_milestone', label: 'AGI Milestones' },
            { id: 'ugi_tool', label: 'UGI Tools' },
            { id: 'paper', label: 'Research Papers' },
          ] as { id: InformationType | 'all'; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedFilter === tab.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List of Contributions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase text-sky-600 dark:text-sky-400 text-[11px] font-semibold">
                  {entry.infoType.replace('_', ' ')}
                </span>
                <span className="font-mono text-[11px]">{entry.createdAt}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {entry.title}
                </h3>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Contributed by {entry.submitterName || 'Community Member'}
                  {entry.organization ? ` (${entry.organization})` : ''}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {entry.description}
              </p>

              {entry.specDetails && (
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 space-y-1">
                  {Object.entries(entry.specDetails).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-400">{k}:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Tag className="w-3 h-3" />
                  <span>{entry.tags.join(' · ')}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              {entry.externalUrl ? (
                <a
                  href={entry.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Source / Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-400 text-[11px]">Local Record</span>
              )}

              <button
                type="button"
                onClick={() => onDeleteContribution(entry.id)}
                className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                title="Remove entry"
                aria-label={`Remove entry ${entry.title}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No entries found for category &quot;{selectedFilter}&quot;.
          </p>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg"
          >
            Add New Contribution
          </button>
        </div>
      )}

      {/* JSON Import Modal */}
      {importModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Import Knowledge Base from JSON
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste exported JSON below to restore or merge external models and milestones.
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-3">
              <textarea
                rows={8}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[{"id":"custom-123","title":"Model Name",...}]'
                className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />

              {importError && (
                <div className="text-xs text-rose-500 font-medium">{importError}</div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setImportModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg"
                >
                  Import Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
