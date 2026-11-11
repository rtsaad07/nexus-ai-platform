import { GoogleGenAI, Type, Schema } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

interface AdvisorRequestBody {
  companyName?: string;
  useCase?: string;
  monthlyBudget?: string; // e.g. "< $50", "$50 - $300", "$300 - $1,000", "$1,000+"
  teamSize?: string;
  techStack?: string;
  priority?: 'cost' | 'accuracy' | 'speed' | 'privacy';
  freeformQuery?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AdvisorRequestBody;
    const {
      companyName = 'Software House',
      useCase = 'Automated Code Review & Customer Support',
      monthlyBudget = '$50 - $300',
      teamSize = '5 - 20 developers',
      techStack = 'Next.js, Python, Node.js, PostgreSQL',
      priority = 'accuracy',
      freeformQuery = '',
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Structured prompt for a software house CTO
    const prompt = `
You are the Chief AI Architect advising a Software House / Dev Agency (${companyName}).
The software house wants to purchase or integrate AI models/bots for their engineering and client projects.

Client Details:
- Primary Purpose / Use Case: ${useCase}
- Monthly AI Budget: ${monthlyBudget}
- Team / Agency Size: ${teamSize}
- Engineering Stack: ${techStack}
- Highest Priority: ${priority}
${freeformQuery ? `- Custom Requirements / Question: "${freeformQuery}"` : ''}

Available Frontier AI Models for Software Houses in 2026:
1. Claude 3.5 Sonnet (Anthropic) - Unbeatable coding/refactoring and SWE-bench, but expensive ($3.00/M in, $15.00/M out), strict rate limits.
2. Gemini 1.5 Flash (Google) - Super-fast, ultra-cheap ($0.075/M in, $0.30/M out), 1M token context, ideal for client support bots and live chat.
3. DeepSeek-V3 (DeepSeek) - Extremely cost-effective ($0.14/M in, $0.28/M out), strong general coding, open weights for private self-hosting.
4. DeepSeek-R1 (DeepSeek) - Heavy reasoning & algorithm generation ($0.55/M in, $2.19/M out), slow generation due to chain-of-thought tokens.
5. Gemini 1.5 Pro (Google) - Massive 2M context window, ingest entire Git repos and client databases, higher cost than Flash.
6. OpenAI o3-mini (OpenAI) - Fast STEM reasoning, code architecture, competitive pricing ($1.10/M in, $4.40/M out).
7. Claude 3.5 Haiku (Anthropic) - Fast, strong lightweight agent, but higher price than Gemini Flash ($0.80/M in, $4.00/M out).
8. OpenAI GPT-4o (OpenAI) - Reliable multi-modal, universal tool calling, industry standard SDK, medium-high price.

Analyze and recommend:
1. Top Recommended Model
2. Runner-Up / Fallback Model
3. Match Score (number between 85 and 99)
4. Estimated Monthly Bill for their volume and budget
5. Plain English Explanation of why this model is most beneficial for their exact software house setup
6. Critical Drawbacks & Gotchas they must know before buying/integrating
7. Actionable Implementation Advice (caching, routing, fallback architecture)
8. Price-to-Performance Verdict

Return clear, plain English that any non-technical agency manager or client can understand, with technical precision where it counts.
`;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim().length === 0) {
      // Deterministic expert fallback if API key is not configured
      return NextResponse.json(generateFallbackAdvice(body));
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const responseSchema: Schema = {
        type: Type.OBJECT,
        properties: {
          recommendedModel: {
            type: Type.STRING,
            description: 'Name of the top recommended model',
          },
          runnerUpModel: {
            type: Type.STRING,
            description: 'Name of the runner-up model',
          },
          matchScore: {
            type: Type.INTEGER,
            description: 'Percentage match between 80 and 99',
          },
          estimatedMonthlyCost: {
            type: Type.STRING,
            description: 'Estimated monthly cost string e.g. "$45 - $120 / mo"',
          },
          plainEnglishBenefit: {
            type: Type.STRING,
            description: 'Simple, jargon-free explanation of why this AI is most beneficial',
          },
          criticalDrawbacks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: '2 to 4 real-world drawbacks or gotchas',
          },
          priceToPerformanceVerdict: {
            type: Type.STRING,
            description: 'Summary verdict on cost efficiency vs value',
          },
          implementationTip: {
            type: Type.STRING,
            description: 'Specific advice for the software house stack',
          },
        },
        required: [
          'recommendedModel',
          'runnerUpModel',
          'matchScore',
          'estimatedMonthlyCost',
          'plainEnglishBenefit',
          'criticalDrawbacks',
          'priceToPerformanceVerdict',
          'implementationTip',
        ],
      };

      const genPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
          temperature: 0.2,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API call timed out')), 5000)
      );

      const result: any = await Promise.race([genPromise, timeoutPromise]);

      if (result && result.text) {
        const parsed = JSON.parse(result.text);
        return NextResponse.json({
          success: true,
          source: 'gemini-live',
          data: parsed,
        });
      }
    } catch (genError: unknown) {
      console.warn('Gemini API call failed, falling back to local heuristic advisor:', genError);
      return NextResponse.json({
        success: true,
        source: 'local-heuristic-fallback',
        data: generateFallbackAdvice(body).data,
      });
    }

    return NextResponse.json(generateFallbackAdvice(body));
  } catch (err: unknown) {
    console.error('Advisor route error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process AI advisory request',
      },
      { status: 500 }
    );
  }
}

function generateFallbackAdvice(body: AdvisorRequestBody) {
  const { useCase = '', monthlyBudget = '', priority = 'accuracy' } = body;
  const isBudgetLow = monthlyBudget.includes('< $50') || priority === 'cost';
  const isCoding = useCase.toLowerCase().includes('code') || useCase.toLowerCase().includes('pr') || useCase.toLowerCase().includes('dev');
  const isSupport = useCase.toLowerCase().includes('support') || useCase.toLowerCase().includes('chat') || useCase.toLowerCase().includes('customer');
  const isRag = useCase.toLowerCase().includes('rag') || useCase.toLowerCase().includes('codebase') || useCase.toLowerCase().includes('repo');

  if (isBudgetLow || isSupport) {
    return {
      success: true,
      source: 'local-expert-engine',
      data: {
        recommendedModel: 'Gemini 1.5 Flash',
        runnerUpModel: 'DeepSeek-V3',
        matchScore: 96,
        estimatedMonthlyCost: '$15 - $45 / mo',
        plainEnglishBenefit:
          'Gemini 1.5 Flash is 20x cheaper than traditional flagship models while delivering sub-second response times. For client chatbots, customer support, and high-frequency webhook bots, your software house will barely spend $30/month while serving thousands of happy users.',
        criticalDrawbacks: [
          'Less nuanced with complex full-stack codebase refactoring compared to Claude 3.5 Sonnet.',
          'Occasional tendency to give overly concise answers if temperature is not tuned.',
          'Requires structured JSON schemas for rock-solid tool calling.',
        ],
        priceToPerformanceVerdict:
          'Maximum ROI. You can mark up client bot maintenance subscriptions by 5x while your actual API cost remains under $25/month.',
        implementationTip:
          'Enable Google AI Studio prompt caching for repetitive system prompts and integrate a retry fallback to DeepSeek-V3 if you hit API concurrency limits.',
      },
    };
  }

  if (isRag) {
    return {
      success: true,
      source: 'local-expert-engine',
      data: {
        recommendedModel: 'Gemini 1.5 Pro',
        runnerUpModel: 'Claude 3.5 Sonnet',
        matchScore: 94,
        estimatedMonthlyCost: '$75 - $220 / mo',
        plainEnglishBenefit:
          'Gemini 1.5 Pro features a game-changing 2,000,000 token context window. Software houses can dump entire client GitHub repos, documentation folders, or complex monolithic files directly into one prompt without needing complex vector database chunking.',
        criticalDrawbacks: [
          'Noticeably slower time-to-first-token when feeding multi-hundred-thousand token prompts.',
          'Pricing is higher ($1.25/M tokens in) compared to Flash ($0.075/M).',
          'Context caching is essential to avoid compounding costs on large code repositories.',
        ],
        priceToPerformanceVerdict:
          'High Value for RAG. Replaces expensive vector database maintenance pipelines with direct native context processing.',
        implementationTip:
          'Use context caching on your primary repository snapshots. This reduces ongoing prompt reading costs by 75%.',
      },
    };
  }

  // Default: Coding / Agency general flagship
  return {
    success: true,
    source: 'local-expert-engine',
    data: {
      recommendedModel: isCoding && !isBudgetLow ? 'Claude 3.5 Sonnet' : 'DeepSeek-V3',
      runnerUpModel: isCoding && !isBudgetLow ? 'OpenAI o3-mini' : 'Gemini 1.5 Flash',
      matchScore: 97,
      estimatedMonthlyCost: isCoding && !isBudgetLow ? '$120 - $350 / mo' : '$25 - $75 / mo',
      plainEnglishBenefit:
        'Claude 3.5 Sonnet is recognized across the industry as the undisputed king of clean code, pull request reviews, and bug fixing. It understands complex TypeScript, architectural diagrams, and rarely hallucinates libraries.',
      criticalDrawbacks: [
        'Anthropic rate limits (tokens per minute) can choke high-concurrency agency automated workflows.',
        'Expensive at scale ($3.00/M in, $15.00/M out) — 10x more costly than DeepSeek-V3 or Gemini Flash.',
        'No open-source self-hosting option if a client demands HIPAA or strict on-premise confidentiality.',
      ],
      priceToPerformanceVerdict:
        'Premium Investment. It costs more, but saves your senior engineers 15+ hours per week in code reviews and debugging.',
      implementationTip:
        'Use Claude 3.5 Sonnet for master PR reviews and complex architecture, but route routine linting and unit test generation to Gemini Flash or DeepSeek-V3.',
    },
  };
}
