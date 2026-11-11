import { ModelItem } from './types';

/**
 * Calculates inference costs for an AI model based on token usage and caching.
 */
export function calculateInferenceCost(
  promptTokens: number,
  completionTokens: number,
  inputPricePerMillion: number,
  outputPricePerMillion: number,
  cachedTokenRatio: number = 0
): {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  cachedSavings: number;
} {
  const safeCachedRatio = Math.max(0, Math.min(1, cachedTokenRatio));
  const effectivePromptTokens = promptTokens * (1 - safeCachedRatio * 0.75); // Assume 75% discount on cached tokens
  const normalInputCost = (promptTokens / 1_000_000) * inputPricePerMillion;
  const inputCost = (effectivePromptTokens / 1_000_000) * inputPricePerMillion;
  const outputCost = (completionTokens / 1_000_000) * outputPricePerMillion;
  const totalCost = inputCost + outputCost;
  const cachedSavings = Math.max(0, normalInputCost - inputCost);

  return {
    inputCost: Number(inputCost.toFixed(6)),
    outputCost: Number(outputCost.toFixed(6)),
    totalCost: Number(totalCost.toFixed(6)),
    cachedSavings: Number(cachedSavings.toFixed(6)),
  };
}

/**
 * Searches and scores items by query across name, title, description, or tags.
 */
export function filterAndRankItems<
  T extends { name?: string; title?: string; description?: string; tags?: string[] }
>(items: T[], query: string): T[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return items;

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

  const scoredItems = items.map((item) => {
    let score = 0;
    const nameOrTitle = (item.name || item.title || '').toLowerCase();
    const description = (item.description || '').toLowerCase();
    const tags = (item.tags || []).map((t) => t.toLowerCase()).join(' ');

    for (const term of queryTerms) {
      if (nameOrTitle.includes(term)) {
        score += nameOrTitle.startsWith(term) ? 10 : 5;
      }
      if (tags.includes(term)) {
        score += 4;
      }
      if (description.includes(term)) {
        score += 2;
      }
    }

    return { item, score };
  });

  return scoredItems
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

/**
 * Compares two models across benchmarks and pricing metrics.
 */
export function compareModels(
  modelA: ModelItem,
  modelB: ModelItem
): {
  costRatio: number;
  contextRatio: number;
  mathAdvantage: string;
  sweAdvantage: string;
} {
  const costA = modelA.inputPricePerMillion + modelA.outputPricePerMillion;
  const costB = modelB.inputPricePerMillion + modelB.outputPricePerMillion;
  const costRatio = costB > 0 ? Number((costA / costB).toFixed(2)) : 1;

  const contextRatio =
    modelB.contextTokens > 0
      ? Number((modelA.contextTokens / modelB.contextTokens).toFixed(2))
      : 1;

  const mathA = modelA.benchmarks.math500 ?? 0;
  const mathB = modelB.benchmarks.math500 ?? 0;
  let mathAdvantage = 'Equal';
  if (mathA > mathB) {
    mathAdvantage = `${modelA.name} (+${(mathA - mathB).toFixed(1)}%)`;
  } else if (mathB > mathA) {
    mathAdvantage = `${modelB.name} (+${(mathB - mathA).toFixed(1)}%)`;
  }

  const sweA = modelA.benchmarks.sweBench ?? 0;
  const sweB = modelB.benchmarks.sweBench ?? 0;
  let sweAdvantage = 'Equal';
  if (sweA > sweB) {
    sweAdvantage = `${modelA.name} (+${(sweA - sweB).toFixed(1)}%)`;
  } else if (sweB > sweA) {
    sweAdvantage = `${modelB.name} (+${(sweB - sweA).toFixed(1)}%)`;
  }

  return {
    costRatio,
    contextRatio,
    mathAdvantage,
    sweAdvantage,
  };
}

/**
 * Formats token count to human-readable strings (e.g. 2,000,000 -> 2M).
 */
export function formatTokenCount(tokens: number): string {
  if (tokens >= 1_000_000) {
    return `${(tokens / 1_000_000).toFixed(tokens % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (tokens >= 1_000) {
    return `${(tokens / 1_000).toFixed(0)}K`;
  }
  return tokens.toString();
}

/**
 * Calculates a benchmark performance-to-price score.
 */
export function calculatePriceEfficiency(model: ModelItem): number {
  const avgBenchmark =
    ((model.benchmarks.mmluPro || 50) +
      (model.benchmarks.math500 || 50) +
      (model.benchmarks.sweBench || 30)) /
    3;
  const totalCost = model.inputPricePerMillion + model.outputPricePerMillion;
  if (totalCost <= 0) return 100;
  // Higher score = more benchmark accuracy points per dollar
  return Number((avgBenchmark / totalCost).toFixed(1));
}
