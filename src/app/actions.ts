
'use server';

import { generateLanguageSpecificCode } from '@/ai/flows/generate-language-specific-code';

interface GenerateCodeParams {
  prompt: string;
  language: string;
}

export async function generateCode(
  params: GenerateCodeParams
): Promise<
  { code: string; error?: undefined } | { code?: undefined; error: string }
> {
  try {
    const { prompt, language } = params;
    if (!prompt || !language) {
      return { error: 'Prompt and language are required.' };
    }
    const result = await generateLanguageSpecificCode({ prompt, language });
    if (result.code) {
      return { code: result.code };
    }
    return {
      error: 'Failed to generate code. The model did not return any code.',
    };
  } catch (error) {
    console.error('Code generation error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
