export type ModelCategory = 'all' | 'gemini' | 'claude' | 'deepseek' | 'openai' | 'other';

export type SoftwareHousePurpose =
  | 'coding_pr_review'
  | 'customer_support_bot'
  | 'large_codebase_rag'
  | 'math_logic_reasoning'
  | 'agentic_tools_automation'
  | 'multimodal_creative';

export type BudgetTier = 'low' | 'mid' | 'high'; // low: <$50/mo, mid: $50-$300/mo, high: $300+/mo

export interface ModelItem {
  id: string;
  name: string;
  provider: string;
  providerCategory: 'gemini' | 'claude' | 'deepseek' | 'openai' | 'other';
  contextWindow: string;
  contextTokens: number;
  architecture: string;
  parameterDetails: string;
  priceTier: '$' | '$$' | '$$$';
  costPer1kQueries: string; // e.g. "$0.15 / 1,000 tasks"
  monthlyEstimateForAgency: string; // e.g. "$15 - $40 / month"
  strengths: string[];
  bestForSoftwareHouses: string; // Plain english explanation of why to buy
  drawbacks: string[]; // Crucial gotchas and limitations
  idealUseCases: string[];
  softwareHouseVerdict: string;
  benchmarks: {
    mmluPro?: number;
    math500?: number;
    sweBench?: number;
    gpqaDiamond?: number;
  };
  description: string;
  officialUrl?: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  multimodalCapabilities: string[];
  userContributed?: boolean;
}

export type AgiLevel = 1 | 2 | 3 | 4 | 5;

export interface AgiMilestone {
  id: string;
  title: string;
  category: 'Reasoning' | 'Autonomous Agents' | 'Scientific Discovery' | 'Robotics' | 'Superalignment';
  level: AgiLevel;
  status: 'achieved' | 'in_progress' | 'projected';
  timeframe: string;
  summary: string;
  keyEvidence: string;
  userContributed?: boolean;
}

export type UgiCategory = 'video' | 'voice' | 'avatar' | 'image' | 'code_agents' | '3d';

export interface UgiTool {
  id: string;
  name: string;
  category: UgiCategory;
  developer: string;
  description: string;
  capability: string;
  typicalWorkflow: string;
  url: string;
  userContributed?: boolean;
}

export interface ArchitectureTopic {
  id: string;
  title: string;
  subtitle: string;
  pillarNumber: number;
  summary: string;
  technicalDetails: string[];
  diagramType: 'attention' | 'moe' | 'cot' | 'multimodal';
  userContributed?: boolean;
}

export type InformationType = 'model' | 'agi_milestone' | 'ugi_tool' | 'architecture' | 'paper';

export interface UserSubmittedInformation {
  id: string;
  infoType: InformationType;
  title: string;
  submitterName?: string;
  organization?: string;
  description: string;
  categoryOrDomain: string;
  tags: string[];
  externalUrl?: string;
  specDetails?: Record<string, string | number>;
  createdAt: string;
}

export interface AdvisorRecommendation {
  recommendedModel: string;
  runnerUpModel: string;
  matchScore: number;
  estimatedMonthlyCost: string;
  plainEnglishBenefit: string;
  criticalDrawbacks: string[];
  priceToPerformanceVerdict: string;
  implementationTip: string;
  recommendedModelId?: string;
  recommendedModelName?: string;
}
