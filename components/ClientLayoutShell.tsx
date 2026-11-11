'use client';

import React from 'react';
import { DataProvider, useData } from '../lib/DataContext';
import Navbar from './Navbar';
import NeuralCanvas from './NeuralCanvas';
import Footer from './Footer';
import AddInformationModal from './AddInformationModal';

function ShellInner({ children }: { children: React.ReactNode }) {
  const {
    isDark,
    toggleTheme,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    toastMessage,
    addModel,
    addAgiMilestone,
    addUgiTool,
    addGeneralInfo,
  } = useData();

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Ambient Neural particle canvas */}
      <NeuralCanvas isDark={isDark} />

      {/* Top Multi-Page Navbar */}
      <Navbar
        onOpenAddModal={openAddModal}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Page Content */}
      <div className="min-h-[calc(100vh-16rem)]">
        {children}
      </div>

      {/* Site Footer */}
      <Footer onOpenAddModal={openAddModal} />

      {/* Universal Add Information Modal */}
      <AddInformationModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddModel={addModel}
        onAddAgiMilestone={addAgiMilestone}
        onAddUgiTool={addUgiTool}
        onAddGeneralInfo={addGeneralInfo}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-xl border border-slate-700 dark:border-slate-200 transition-all animate-in fade-in slide-in-from-bottom-3"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <ShellInner>{children}</ShellInner>
    </DataProvider>
  );
}
