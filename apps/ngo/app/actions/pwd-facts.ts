'use server';

import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type PwDFact = {
  fact: string;
  source: string;
  region: 'india' | 'global';
};

const SYSTEM_PROMPT = `You are an expert on disability statistics and facts. Generate a single interesting, impactful fact about Persons with Disabilities (PwD).

Rules:
1. Facts must be accurate and from reputable sources (WHO, World Bank, Census of India, NSSO, UN, etc.)
2. Alternate between India-specific and global facts
3. Include statistics, percentages, or numbers when possible
4. Keep facts concise (under 100 words)
5. Make facts inspiring, informative, or thought-provoking - not negative or pitying
6. Focus on: accessibility, employment, education, technology, rights, achievements, or demographics

Respond in this exact JSON format:
{
  "fact": "The fact text here",
  "source": "Source name (e.g., WHO 2023, Census of India 2011)",
  "region": "india" or "global"
}`;

export async function generatePwDFact(preferredRegion?: 'india' | 'global'): Promise<PwDFact> {
  try {
    const userPrompt = preferredRegion
      ? `Generate a fact about PwD focusing on ${preferredRegion === 'india' ? 'India' : 'global/international'} context.`
      : `Generate a random fact about PwD, alternating between India and global context.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      model: 'openai/gpt-oss-120b',
      temperature: 0.9,
      max_completion_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in response');
    }

    const parsed = JSON.parse(content) as PwDFact;
    return parsed;
  } catch (error) {
    console.error('Error generating PwD fact:', error);
    // Return a fallback fact
    return {
      fact: "India has over 26.8 million persons with disabilities, representing 2.21% of the population. The Rights of Persons with Disabilities Act 2016 recognizes 21 types of disabilities and mandates 4% reservation in government jobs.",
      source: "Census of India 2011, RPwD Act 2016",
      region: "india"
    };
  }
}

// Generate multiple facts at once for initial load
export async function generateMultipleFacts(count: number = 5): Promise<PwDFact[]> {
  const facts: PwDFact[] = [];

  for (let i = 0; i < count; i++) {
    const region = i % 2 === 0 ? 'india' : 'global';
    const fact = await generatePwDFact(region);
    facts.push(fact);
  }

  return facts;
}
