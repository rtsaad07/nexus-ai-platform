'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ModelItem,
  AgiMilestone,
  UgiTool,
  ArchitectureTopic,
  UserSubmittedInformation,
  InformationType,
} from './types';
import {
  INITIAL_MODELS,
  INITIAL_AGI_MILESTONES,
  INITIAL_UGI_TOOLS,
  INITIAL_ARCHITECTURE_TOPICS,
  INITIAL_USER_CONTRIBUTIONS,
} from './data';

interface DataContextType {
  isDark: boolean;
  toggleTheme: () => void;
  models: ModelItem[];
  milestones: AgiMilestone[];
  ugiTools: UgiTool[];
  architectureTopics: ArchitectureTopic[];
  contributions: UserSubmittedInformation[];
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addModel: (model: ModelItem) => void;
  addAgiMilestone: (milestone: AgiMilestone) => void;
  addUgiTool: (tool: UgiTool) => void;
  addGeneralInfo: (info: {
    type: InformationType;
    title: string;
    description: string;
    submitterName: string;
    category: string;
    tags: string[];
    url?: string;
  }) => void;
  deleteContribution: (id: string) => void;
  exportData: () => void;
  importData: (rawJson: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Light theme by default as requested
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_ai_theme');
        return saved === 'dark';
      } catch {}
    }
    return false;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [models, setModels] = useState<ModelItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_ai_models');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_MODELS;
  });

  const [milestones, setMilestones] = useState<AgiMilestone[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_ai_milestones');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_AGI_MILESTONES;
  });

  const [ugiTools, setUgiTools] = useState<UgiTool[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_ai_ugi');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_UGI_TOOLS;
  });

  const [architectureTopics] = useState<ArchitectureTopic[]>(INITIAL_ARCHITECTURE_TOPICS);

  const [contributions, setContributions] = useState<UserSubmittedInformation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_ai_contributions');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_USER_CONTRIBUTIONS;
  });

  // Theme synchronization with html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      localStorage.setItem('nexus_ai_theme', next ? 'dark' : 'light');
    } catch {}
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const addModel = (newModel: ModelItem) => {
    const updated = [newModel, ...models];
    setModels(updated);
    try {
      localStorage.setItem('nexus_ai_models', JSON.stringify(updated));
    } catch {}

    const newContrib: UserSubmittedInformation = {
      id: `contrib-${newModel.id}`,
      infoType: 'model',
      title: newModel.name,
      submitterName: 'User Contributor',
      organization: newModel.provider,
      categoryOrDomain: newModel.providerCategory,
      description: newModel.description,
      tags: [newModel.provider, newModel.architecture.split(' ')[0], 'Model'],
      externalUrl: newModel.officialUrl,
      specDetails: {
        'Context': newModel.contextWindow,
        'Price ($/1M)': `$${newModel.inputPricePerMillion} In / $${newModel.outputPricePerMillion} Out`,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedContrib = [newContrib, ...contributions];
    setContributions(updatedContrib);
    try {
      localStorage.setItem('nexus_ai_contributions', JSON.stringify(updatedContrib));
    } catch {}

    showToast(`Added "${newModel.name}" to Models Matrix!`);
  };

  const addAgiMilestone = (newMilestone: AgiMilestone) => {
    const updated = [newMilestone, ...milestones];
    setMilestones(updated);
    try {
      localStorage.setItem('nexus_ai_milestones', JSON.stringify(updated));
    } catch {}

    const newContrib: UserSubmittedInformation = {
      id: `contrib-${newMilestone.id}`,
      infoType: 'agi_milestone',
      title: newMilestone.title,
      submitterName: 'User Contributor',
      organization: 'Research Lab',
      categoryOrDomain: newMilestone.category,
      description: newMilestone.summary,
      tags: [`Level ${newMilestone.level}`, newMilestone.category, newMilestone.timeframe],
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedContrib = [newContrib, ...contributions];
    setContributions(updatedContrib);
    try {
      localStorage.setItem('nexus_ai_contributions', JSON.stringify(updatedContrib));
    } catch {}

    showToast(`Added "${newMilestone.title}" to AGI Roadmap!`);
  };

  const addUgiTool = (newTool: UgiTool) => {
    const updated = [newTool, ...ugiTools];
    setUgiTools(updated);
    try {
      localStorage.setItem('nexus_ai_ugi', JSON.stringify(updated));
    } catch {}

    const newContrib: UserSubmittedInformation = {
      id: `contrib-${newTool.id}`,
      infoType: 'ugi_tool',
      title: newTool.name,
      submitterName: 'Creative User',
      organization: newTool.developer,
      categoryOrDomain: newTool.category,
      description: newTool.description,
      tags: [newTool.category.toUpperCase(), 'Creative Studio'],
      externalUrl: newTool.url,
      specDetails: {
        'Capability': newTool.capability,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedContrib = [newContrib, ...contributions];
    setContributions(updatedContrib);
    try {
      localStorage.setItem('nexus_ai_contributions', JSON.stringify(updatedContrib));
    } catch {}

    showToast(`Added "${newTool.name}" to UGI Studio!`);
  };

  const addGeneralInfo = (info: {
    type: InformationType;
    title: string;
    description: string;
    submitterName: string;
    category: string;
    tags: string[];
    url?: string;
  }) => {
    const newContrib: UserSubmittedInformation = {
      id: `contrib-${Date.now()}`,
      infoType: info.type,
      title: info.title,
      submitterName: info.submitterName,
      categoryOrDomain: info.category,
      description: info.description,
      tags: info.tags,
      externalUrl: info.url,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedContrib = [newContrib, ...contributions];
    setContributions(updatedContrib);
    try {
      localStorage.setItem('nexus_ai_contributions', JSON.stringify(updatedContrib));
    } catch {}

    showToast(`Added "${info.title}" to Knowledge Base!`);
  };

  const deleteContribution = (id: string) => {
    const updated = contributions.filter((c) => c.id !== id);
    setContributions(updated);
    try {
      localStorage.setItem('nexus_ai_contributions', JSON.stringify(updated));
    } catch {}
    showToast('Entry removed from Knowledge Base.');
  };

  const exportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      models,
      milestones,
      ugiTools,
      contributions,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-ai-database-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported complete Knowledge Base JSON!');
  };

  const importData = (rawJson: string) => {
    try {
      const data = JSON.parse(rawJson);
      if (Array.isArray(data.models)) setModels(data.models);
      if (Array.isArray(data.milestones)) setMilestones(data.milestones);
      if (Array.isArray(data.ugiTools)) setUgiTools(data.ugiTools);
      if (Array.isArray(data.contributions)) setContributions(data.contributions);
      showToast('Successfully imported and merged Knowledge Base entries!');
    } catch {
      showToast('Error importing JSON data.');
    }
  };

  const resetData = () => {
    if (confirm('Reset database back to initial curated dataset?')) {
      setModels(INITIAL_MODELS);
      setMilestones(INITIAL_AGI_MILESTONES);
      setUgiTools(INITIAL_UGI_TOOLS);
      setContributions(INITIAL_USER_CONTRIBUTIONS);
      try {
        localStorage.removeItem('nexus_ai_models');
        localStorage.removeItem('nexus_ai_milestones');
        localStorage.removeItem('nexus_ai_ugi');
        localStorage.removeItem('nexus_ai_contributions');
      } catch {}
      showToast('Reset database to curated default state.');
    }
  };

  return (
    <DataContext.Provider
      value={{
        isDark,
        toggleTheme,
        models,
        milestones,
        ugiTools,
        architectureTopics,
        contributions,
        isAddModalOpen,
        openAddModal,
        closeAddModal,
        toastMessage,
        showToast,
        addModel,
        addAgiMilestone,
        addUgiTool,
        addGeneralInfo,
        deleteContribution,
        exportData,
        importData,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within a DataProvider');
  }
  return ctx;
}
