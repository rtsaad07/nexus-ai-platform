'use client';

import { useState } from 'react';
import { X, Plus, Sparkles, Check, AlertCircle, FileText, Cpu, Compass, Video, BookOpen } from 'lucide-react';
import { InformationType, ModelItem, AgiMilestone, UgiTool } from '../lib/types';

interface AddInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModel: (model: ModelItem) => void;
  onAddAgiMilestone: (milestone: AgiMilestone) => void;
  onAddUgiTool: (tool: UgiTool) => void;
  onAddGeneralInfo: (info: {
    type: InformationType;
    title: string;
    description: string;
    submitterName: string;
    category: string;
    tags: string[];
    url?: string;
  }) => void;
}

export default function AddInformationModal({
  isOpen,
  onClose,
  onAddModel,
  onAddAgiMilestone,
  onAddUgiTool,
  onAddGeneralInfo,
}: AddInformationModalProps) {
  const [selectedType, setSelectedType] = useState<InformationType>('model');

  // Common fields
  const [title, setTitle] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [description, setDescription] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Model-specific fields
  const [provider, setProvider] = useState('Google DeepMind');
  const [providerCategory, setProviderCategory] = useState<'gemini' | 'claude' | 'deepseek' | 'openai' | 'other'>('other');
  const [contextWindow, setContextWindow] = useState('1,000,000 Tokens');
  const [contextTokens, setContextTokens] = useState(1000000);
  const [architecture, setArchitecture] = useState('Mixture-of-Experts (MoE)');
  const [inputPrice, setInputPrice] = useState(0.5);
  const [outputPrice, setOutputPrice] = useState(2.0);
  const [mathScore, setMathScore] = useState(75);
  const [sweScore, setSweScore] = useState(40);
  const [mmluScore, setMmluScore] = useState(78);

  // AGI-specific fields
  const [agiLevel, setAgiLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [agiCategory, setAgiCategory] = useState<'Reasoning' | 'Autonomous Agents' | 'Scientific Discovery' | 'Robotics' | 'Superalignment'>('Reasoning');
  const [timeframe, setTimeframe] = useState('2026-2027');
  const [keyEvidence, setKeyEvidence] = useState('');

  // UGI-specific fields
  const [ugiCategory, setUgiCategory] = useState<'video' | 'voice' | 'avatar' | 'image' | 'code_agents' | '3d'>('video');
  const [capability, setCapability] = useState('');
  const [typicalWorkflow, setTypicalWorkflow] = useState('');

  // Feedback states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Preset loaders for fast testing
  const handleLoadPreset = (preset: 'grok' | 'gemini_next' | 'robotics_agi' | 'tripo_3d') => {
    setErrorMsg('');
    if (preset === 'grok') {
      setSelectedType('model');
      setTitle('Grok 3 Reasoning Engine');
      setProvider('xAI');
      setProviderCategory('other');
      setContextWindow('1,000,000 Tokens');
      setContextTokens(1000000);
      setArchitecture('Massive Dense / MoE Cluster trained on Colossus');
      setDescription('100k H100 Colossus cluster trained frontier reasoning model targeting STEM, code synthesis, and deep logic.');
      setInputPrice(1.0);
      setOutputPrice(4.0);
      setMathScore(92.5);
      setSweScore(47.5);
      setMmluScore(82.0);
      setExternalUrl('https://x.ai/');
      setTagsInput('xAI, Colossus, STEM, Reasoning');
    } else if (preset === 'gemini_next') {
      setSelectedType('model');
      setTitle('Gemini 2.5 Flash Thinking');
      setProvider('Google DeepMind');
      setProviderCategory('gemini');
      setContextWindow('2,000,000 Tokens');
      setContextTokens(2000000);
      setArchitecture('Native Multimodal with Realtime CoT Verification');
      setDescription('Zero-latency multi-modal reasoning engine that thinks through audio, code, and vision frames in real time.');
      setInputPrice(0.15);
      setOutputPrice(0.6);
      setMathScore(88.0);
      setSweScore(45.0);
      setMmluScore(80.5);
      setExternalUrl('https://ai.google.dev/');
      setTagsInput('Google, Multimodal, Thinking, Flash');
    } else if (preset === 'robotics_agi') {
      setSelectedType('agi_milestone');
      setTitle('Autonomous Zero-Shot Humanoid Household Dexterity');
      setAgiCategory('Robotics');
      setAgiLevel(3);
      setTimeframe('2026');
      setDescription('Humanoid robot executes 50+ diverse household chores (cooking, folding laundry, tool handling) without teleoperation.');
      setKeyEvidence('Physical world model pre-training paired with real-time vision-language-action (VLA) foundation models.');
      setTagsInput('Robotics, Humanoid, VLA, Manipulation');
    } else if (preset === 'tripo_3d') {
      setSelectedType('ugi_tool');
      setTitle('Tripo AI 3D Studio');
      setUgiCategory('3d');
      setDescription('Instant text & image to fully production-ready 3D mesh with automatic UV unwrapping, PBR materials, and skeletal rigging.');
      setCapability('Generates game-ready 3D assets in 8 seconds with topology optimized for WebGL and Unreal Engine.');
      setTypicalWorkflow('Prompt 3D prop -> Tripo synthesizes quad mesh -> Download GLB -> Place into interactive canvas.');
      setExternalUrl('https://www.tripo3d.ai/');
      setTagsInput('3D, Mesh, Generative, WebGL');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a title or model name.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a brief description.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const generatedId = `custom-${Date.now()}`;

    if (selectedType === 'model') {
      const newModel: ModelItem = {
        id: generatedId,
        name: title.trim(),
        provider: provider.trim() || 'Independent Lab',
        providerCategory,
        contextWindow: contextWindow.trim() || '128,000 Tokens',
        contextTokens: Number(contextTokens) || 128000,
        architecture: architecture.trim() || 'Transformer MoE',
        parameterDetails: 'User Contributed Spec',
        strengths: [
          `Context: ${contextWindow}`,
          `Architecture: ${architecture}`,
          `Pricing: $${inputPrice}/M In, $${outputPrice}/M Out`,
        ],
        benchmarks: {
          mmluPro: Number(mmluScore) || undefined,
          math500: Number(mathScore) || undefined,
          sweBench: Number(sweScore) || undefined,
        },
        description: description.trim(),
        officialUrl: externalUrl.trim() || undefined,
        inputPricePerMillion: Number(inputPrice) || 0.5,
        outputPricePerMillion: Number(outputPrice) || 2.0,
        multimodalCapabilities: ['Text', 'Code'],
        userContributed: true,
        priceTier: (Number(inputPrice) || 0.5) < 0.3 ? '$' : (Number(inputPrice) || 0.5) < 1.5 ? '$$' : '$$$',
        costPer1kQueries: `~$${(((Number(inputPrice) || 0.5) * 0.8 + (Number(outputPrice) || 2.0) * 0.8) / 1000).toFixed(4)} / 1k`,
        monthlyEstimateForAgency: (Number(inputPrice) || 0.5) < 0.3 ? '$20 - $60 / mo' : '$60 - $250 / mo',
        bestForSoftwareHouses: description.trim() || 'Custom contributed AI model for developer workflows and bots.',
        drawbacks: [
          'Verify vendor SLA and rate limit quotas before putting into client production.',
          'Test output format stability with structured JSON schemas.',
        ],
        idealUseCases: ['Custom Client Bots', 'Specialized Workflows'],
        softwareHouseVerdict: 'Community or lab specification for software house evaluation.',
      };

      onAddModel(newModel);
    } else if (selectedType === 'agi_milestone') {
      const newMilestone: AgiMilestone = {
        id: generatedId,
        title: title.trim(),
        category: agiCategory,
        level: agiLevel,
        status: agiLevel <= 2 ? 'achieved' : agiLevel === 3 ? 'in_progress' : 'projected',
        timeframe: timeframe.trim() || '2026',
        summary: description.trim(),
        keyEvidence: keyEvidence.trim() || 'Community tracked research benchmark.',
        userContributed: true,
      };

      onAddAgiMilestone(newMilestone);
    } else if (selectedType === 'ugi_tool') {
      const newTool: UgiTool = {
        id: generatedId,
        name: title.trim(),
        category: ugiCategory,
        developer: provider.trim() || 'AI Tool Studio',
        description: description.trim(),
        capability: capability.trim() || description.trim(),
        typicalWorkflow:
          typicalWorkflow.trim() ||
          'Prompt asset in tool -> Review output variations -> Export to target creative suite.',
        url: externalUrl.trim() || '#',
        userContributed: true,
      };

      onAddUgiTool(newTool);
    } else {
      // General architecture / paper
      onAddGeneralInfo({
        type: selectedType,
        title: title.trim(),
        description: description.trim(),
        submitterName: submitterName.trim() || 'Anonymous Researcher',
        category: selectedType === 'architecture' ? 'Architecture' : 'Research Paper',
        tags: tags.length > 0 ? tags : ['Frontier AI', 'Community'],
        url: externalUrl.trim() || undefined,
      });
    }

    setSuccessMsg(`Successfully added "${title.trim()}" to the live knowledge base!`);
    setTimeout(() => {
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setExternalUrl('');
      setTagsInput('');
      setSuccessMsg('');
    }, 1100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contribute to Knowledge Base</span>
            </div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Add New Information
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select an information category and submit details to update the live app database.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>Quick Autofill Examples:</span>
            <span className="text-[11px] text-slate-400">Click to preview format</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleLoadPreset('grok')}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-500 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Grok 3 (Model)
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('gemini_next')}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-500 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Gemini 2.5 Flash (Model)
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('robotics_agi')}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Humanoid VLA (AGI)
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('tripo_3d')}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Tripo 3D (UGI Tool)
            </button>
          </div>
        </div>

        {/* Information Type Selector (Interactive segmented control) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Information Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setSelectedType('model')}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                selectedType === 'model'
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-700 dark:text-sky-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <Cpu className="w-4 h-4 text-sky-500 shrink-0" />
              <span>AI Model / LLM</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('agi_milestone')}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                selectedType === 'agi_milestone'
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <Compass className="w-4 h-4 text-purple-500 shrink-0" />
              <span>AGI Milestone</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('ugi_tool')}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                selectedType === 'ugi_tool'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>UGI Studio Tool</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('paper')}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                selectedType === 'paper'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Research Paper</span>
            </button>
          </div>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {selectedType === 'model'
                ? 'Model Name *'
                : selectedType === 'agi_milestone'
                ? 'Milestone / Breakthrough Title *'
                : selectedType === 'ugi_tool'
                ? 'Tool Name *'
                : 'Paper / Insight Title *'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                selectedType === 'model'
                  ? 'e.g. Grok 3 Reasoning'
                  : selectedType === 'agi_milestone'
                  ? 'e.g. Multi-Step Self-Reflecting Verification in Math'
                  : selectedType === 'ugi_tool'
                  ? 'e.g. Kling AI 1.5'
                  : 'e.g. Scaling Test-Time Compute on Reinforcement Horizons'
              }
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Model Specific Attributes */}
          {selectedType === 'model' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Provider / Lab
                </label>
                <input
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="e.g. xAI, Google, Meta, Mistral"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Provider Category
                </label>
                <select
                  value={providerCategory}
                  onChange={(e) =>
                    setProviderCategory(
                      e.target.value as 'gemini' | 'claude' | 'deepseek' | 'openai' | 'other'
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="gemini">Google Gemini</option>
                  <option value="claude">Anthropic Claude</option>
                  <option value="deepseek">DeepSeek AI</option>
                  <option value="openai">OpenAI</option>
                  <option value="other">Other Frontier Lab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Context Window
                </label>
                <input
                  type="text"
                  value={contextWindow}
                  onChange={(e) => {
                    setContextWindow(e.target.value);
                    const match = e.target.value.replace(/[^0-9]/g, '');
                    if (match) setContextTokens(Number(match));
                  }}
                  placeholder="e.g. 1,000,000 Tokens"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Architecture Type
                </label>
                <input
                  type="text"
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value)}
                  placeholder="e.g. DeepSeekMoE + MLA, Dense Transformer"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Input Price ($ / 1M Tokens)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Output Price ($ / 1M Tokens)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={outputPrice}
                  onChange={(e) => setOutputPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    MMLU-Pro (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={mmluScore}
                    onChange={(e) => setMmluScore(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    MATH-500 (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={mathScore}
                    onChange={(e) => setMathScore(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    SWE-bench (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={sweScore}
                    onChange={(e) => setSweScore(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* AGI Specific Attributes */}
          {selectedType === 'agi_milestone' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  AGI Level (1 to 5)
                </label>
                <select
                  value={agiLevel}
                  onChange={(e) => setAgiLevel(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value={1}>Level 1: Emerging Generalist</option>
                  <option value={2}>Level 2: Competent Reasoner</option>
                  <option value={3}>Level 3: Expert Autonomous Agent</option>
                  <option value={4}>Level 4: Virtuoso Polymath</option>
                  <option value={5}>Level 5: Superintelligence (ASI)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Domain Category
                </label>
                <select
                  value={agiCategory}
                  onChange={(e) =>
                    setAgiCategory(
                      e.target.value as
                        | 'Reasoning'
                        | 'Autonomous Agents'
                        | 'Scientific Discovery'
                        | 'Robotics'
                        | 'Superalignment'
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Reasoning">Complex Reasoning</option>
                  <option value="Autonomous Agents">Autonomous Agents</option>
                  <option value="Scientific Discovery">Scientific Discovery</option>
                  <option value="Robotics">Physical World Robotics</option>
                  <option value="Superalignment">Superalignment & Safety</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Timeframe / Horizon
                </label>
                <input
                  type="text"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  placeholder="e.g. 2026, 2027-2028"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Key Evidence or Validation Source
                </label>
                <input
                  type="text"
                  value={keyEvidence}
                  onChange={(e) => setKeyEvidence(e.target.value)}
                  placeholder="e.g. Passed SWE-bench 55% without human intervention"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* UGI Specific Attributes */}
          {selectedType === 'ugi_tool' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tool Media Category
                </label>
                <select
                  value={ugiCategory}
                  onChange={(e) =>
                    setUgiCategory(
                      e.target.value as 'video' | 'voice' | 'avatar' | 'image' | 'code_agents' | '3d'
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="video">Generative Video (Veo, Sora, Runway)</option>
                  <option value="voice">Audio & Voice Synthesis (ElevenLabs)</option>
                  <option value="avatar">Digital Avatars & Lip-Sync (HeyGen)</option>
                  <option value="image">Concept Art & Image Gen (Midjourney)</option>
                  <option value="code_agents">Code & Artifact Agents (Claude, v0)</option>
                  <option value="3d">3D Meshes & Worlds (Meshy, Tripo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Creator / Developer Company
                </label>
                <input
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="e.g. Runway, Google, Kling"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Core Generative Capability
                </label>
                <input
                  type="text"
                  value={capability}
                  onChange={(e) => setCapability(e.target.value)}
                  placeholder="e.g. 1080p 60fps high motion consistency from text prompts"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Practical Workflow Recipe
                </label>
                <input
                  type="text"
                  value={typicalWorkflow}
                  onChange={(e) => setTypicalWorkflow(e.target.value)}
                  placeholder="e.g. Script in Claude -> Voiceover in ElevenLabs -> Video render in Runway"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description & Architectural Significance *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive technical description, key innovations, and why this matters..."
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Links & Submitter metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Official URL or Source Paper
              </label>
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. Reasoning, MoE, SOTA, Open Weights"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Error / Success state */}
          {errorMsg && (
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit to Live Platform</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
