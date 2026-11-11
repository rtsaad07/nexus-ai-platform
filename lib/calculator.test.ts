import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInferenceCost,
  filterAndRankItems,
  compareModels,
  formatTokenCount,
  calculatePriceEfficiency,
} from './calculator';
import { ModelItem } from './types';

test('calculateInferenceCost computes correct normal cost without caching', () => {
  // 1M prompt @ $1.00/M + 100k completion @ $5.00/M
  const res = calculateInferenceCost(1_000_000, 100_000, 1.0, 5.0, 0);
  assert.equal(res.inputCost, 1.0);
  assert.equal(res.outputCost, 0.5);
  assert.equal(res.totalCost, 1.5);
  assert.equal(res.cachedSavings, 0);
});

test('calculateInferenceCost computes cached savings correctly', () => {
  // 1M prompt with 100% caching (75% discount) -> input should be 0.25
  const res = calculateInferenceCost(1_000_000, 0, 1.0, 5.0, 1.0);
  assert.equal(res.inputCost, 0.25);
  assert.equal(res.cachedSavings, 0.75);
  assert.equal(res.totalCost, 0.25);
});

test('filterAndRankItems correctly matches and ranks items by relevance', () => {
  const items = [
    { title: 'Gemini 1.5 Pro', description: 'Massive context window', tags: ['Google', 'Multimodal'] },
    { title: 'Claude 3.5 Sonnet', description: 'Autonomous coding master', tags: ['Anthropic', 'Coding'] },
    { title: 'DeepSeek-R1', description: 'Reasoning model matching o1', tags: ['DeepSeek', 'Math'] },
  ];

  const results = filterAndRankItems(items, 'DeepSeek');
  assert.equal(results.length, 1);
  assert.equal(results[0].title, 'DeepSeek-R1');

  const multiple = filterAndRankItems(items, 'Coding');
  assert.equal(multiple.length, 1);
  assert.equal(multiple[0].title, 'Claude 3.5 Sonnet');
});

test('formatTokenCount formats properly', () => {
  assert.equal(formatTokenCount(2_000_000), '2M');
  assert.equal(formatTokenCount(128_000), '128K');
  assert.equal(formatTokenCount(500), '500');
});

test('compareModels accurately calculates ratios and benchmark advantages', () => {
  const modelA: ModelItem = {
    id: 'a',
    name: 'Model A',
    provider: 'Test',
    providerCategory: 'other',
    contextWindow: '1M',
    contextTokens: 1_000_000,
    architecture: 'Transformer',
    parameterDetails: '100B',
    strengths: [],
    benchmarks: { mmluPro: 70, math500: 90, sweBench: 45 },
    description: '',
    inputPricePerMillion: 1.0,
    outputPricePerMillion: 2.0,
    multimodalCapabilities: [],
  };

  const modelB: ModelItem = {
    id: 'b',
    name: 'Model B',
    provider: 'Test',
    providerCategory: 'other',
    contextWindow: '200K',
    contextTokens: 200_000,
    architecture: 'Transformer',
    parameterDetails: '50B',
    strengths: [],
    benchmarks: { mmluPro: 65, math500: 80, sweBench: 35 },
    description: '',
    inputPricePerMillion: 0.5,
    outputPricePerMillion: 1.0,
    multimodalCapabilities: [],
  };

  const comparison = compareModels(modelA, modelB);
  assert.equal(comparison.costRatio, 2); // 3.0 / 1.5 = 2.0
  assert.equal(comparison.contextRatio, 5); // 1M / 200k = 5.0
  assert.match(comparison.mathAdvantage, /Model A/);
  assert.match(comparison.sweAdvantage, /Model A/);

  const effA = calculatePriceEfficiency(modelA);
  const effB = calculatePriceEfficiency(modelB);
  assert.ok(effB > effA); // Model B is cheaper per benchmark point
});
