import test from 'node:test';
import assert from 'node:assert/strict';
import { matchAiForPurpose } from './recommender';
import { INITIAL_MODELS } from './data';

test('matchAiForPurpose recommends Gemini 1.5 Flash for high-frequency customer support bots on low budget', () => {
  const result = matchAiForPurpose(INITIAL_MODELS, 'customer_support_bot', 'low', 'cost');
  assert.equal(result.topModel.id, 'gemini-1-5-flash');
  assert.ok(result.matchScore >= 80);
  assert.ok(result.drawbacksToWatch.length > 0);
});

test('matchAiForPurpose recommends Claude 3.5 Sonnet for coding and PR review on high budget', () => {
  const result = matchAiForPurpose(INITIAL_MODELS, 'coding_pr_review', 'high', 'accuracy');
  assert.equal(result.topModel.id, 'claude-3-5-sonnet');
  assert.ok(result.matchScore >= 85);
  assert.ok(result.drawbacksToWatch.some((d) => d.toLowerCase().includes('rate limit') || d.toLowerCase().includes('token pricing')));
});

test('matchAiForPurpose recommends Gemini 1.5 Pro for large codebase RAG', () => {
  const result = matchAiForPurpose(INITIAL_MODELS, 'large_codebase_rag', 'mid', 'accuracy');
  assert.equal(result.topModel.id, 'gemini-1-5-pro');
  assert.ok(result.topModel.contextTokens >= 1_000_000);
});

test('matchAiForPurpose prioritizes open weights (DeepSeek) when privacy is the top priority', () => {
  const result = matchAiForPurpose(INITIAL_MODELS, 'coding_pr_review', 'low', 'privacy');
  assert.ok(result.topModel.id === 'deepseek-v3' || result.topModel.id === 'deepseek-r1');
});
