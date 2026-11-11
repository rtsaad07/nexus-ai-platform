import { ModelItem, SoftwareHousePurpose, BudgetTier } from './types';

export interface PurposeMatchResult {
  topModel: ModelItem;
  runnerUpModel: ModelItem;
  matchScore: number;
  monthlyEstimate: string;
  whyThisIsBest: string;
  drawbacksToWatch: string[];
  recommendedTechStackTips: string[];
}

export function matchAiForPurpose(
  models: ModelItem[],
  purpose: SoftwareHousePurpose,
  budget: BudgetTier,
  priority: 'cost' | 'accuracy' | 'speed' | 'privacy' = 'accuracy'
): PurposeMatchResult {
  const scored = models.map((model) => {
    let score = 50;

    // Purpose-specific alignments
    switch (purpose) {
      case 'coding_pr_review':
        if (model.id === 'claude-3-5-sonnet') score += 40;
        else if (model.id === 'deepseek-r1') score += 30;
        else if (model.id === 'openai-o3-mini') score += 25;
        else if (model.id === 'deepseek-v3') score += 20;
        else score += 10;
        break;

      case 'customer_support_bot':
        if (model.id === 'gemini-1-5-flash') score += 45;
        else if (model.id === 'claude-3-5-haiku') score += 30;
        else if (model.id === 'deepseek-v3') score += 28;
        else if (model.id === 'openai-gpt-4o') score += 20;
        else if (model.id === 'claude-3-5-sonnet') score -= 15; // too expensive for support bots
        break;

      case 'large_codebase_rag':
        if (model.id === 'gemini-1-5-pro') score += 55;
        else if (model.id === 'gemini-1-5-flash') score += 30;
        else if (model.id === 'claude-3-5-sonnet') score += 20;
        else score += 5;
        break;

      case 'math_logic_reasoning':
        if (model.id === 'deepseek-r1') score += 45;
        else if (model.id === 'openai-o3-mini') score += 40;
        else if (model.id === 'claude-3-5-sonnet') score += 30;
        else score += 10;
        break;

      case 'agentic_tools_automation':
        if (model.id === 'claude-3-5-sonnet') score += 40;
        else if (model.id === 'openai-o3-mini') score += 35;
        else if (model.id === 'gemini-1-5-flash') score += 30;
        else if (model.id === 'claude-3-5-haiku') score += 25;
        break;

      case 'multimodal_creative':
        if (model.id === 'gemini-1-5-pro' || model.id === 'openai-gpt-4o') score += 40;
        else if (model.id === 'gemini-1-5-flash') score += 35;
        else if (model.id === 'claude-3-5-sonnet') score += 30;
        break;
    }

    // Budget alignment
    if (budget === 'low') {
      if (model.priceTier === '$') score += 25;
      else if (model.priceTier === '$$') score -= 5;
      else if (model.priceTier === '$$$') score -= 35; // Claude 3.5 Sonnet hurts low budget
    } else if (budget === 'mid') {
      if (model.priceTier === '$$' || model.priceTier === '$') score += 15;
      else if (model.priceTier === '$$$') score += 5;
    } else {
      // high budget
      if (model.priceTier === '$$$') score += 20; // willingness to pay for peak quality
      if (model.benchmarks.sweBench && model.benchmarks.sweBench > 45) score += 15;
    }

    // Priority alignment
    if (priority === 'cost') {
      if (model.inputPricePerMillion < 0.2) score += 20;
      else if (model.inputPricePerMillion > 2.0) score -= 25;
    } else if (priority === 'accuracy') {
      if ((model.benchmarks.sweBench || 0) > 45 || (model.benchmarks.math500 || 0) > 90) {
        score += 20;
      }
    } else if (priority === 'speed') {
      if (model.id === 'gemini-1-5-flash' || model.id === 'claude-3-5-haiku') score += 25;
      if (model.id === 'deepseek-r1') score -= 20; // slow due to CoT thinking tokens
    } else if (priority === 'privacy') {
      if (model.id === 'deepseek-v3' || model.id === 'deepseek-r1') score += 30; // open weights
    }

    return {
      model,
      score: Math.min(99, Math.max(30, score)),
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored[0]?.model || models[0];
  const runnerUp = scored[1]?.model || models[1] || top;
  const matchScore = scored[0]?.score || 95;

  let whyThisIsBest = top.bestForSoftwareHouses;
  let estimated = top.monthlyEstimateForAgency;

  if (budget === 'low') {
    estimated = top.priceTier === '$' ? '$10 - $35 / mo' : '$40 - $80 / mo';
  } else if (budget === 'mid') {
    estimated = top.monthlyEstimateForAgency;
  } else {
    estimated = '$200 - $800+ / mo (High Volume Production)';
  }

  const tips: string[] = [
    `Use prompt caching where possible to reduce input costs by up to 75%.`,
    `Set temperature to 0.0 - 0.2 for deterministic code/JSON outputs in production.`,
    `Keep an automated fallback route to ${runnerUp.name} in case of rate limits.`,
  ];

  return {
    topModel: top,
    runnerUpModel: runnerUp,
    matchScore,
    monthlyEstimate: estimated,
    whyThisIsBest,
    drawbacksToWatch: top.drawbacks,
    recommendedTechStackTips: tips,
  };
}
