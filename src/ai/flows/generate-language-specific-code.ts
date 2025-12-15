'use server';

/**
 * @fileOverview Generates code snippets based on a natural language prompt and a selected programming language.
 *
 * - generateLanguageSpecificCode - A function that generates code snippets based on the input.
 * - GenerateLanguageSpecificCodeInput - The input type for the generateLanguageSpecificCode function.
 * - GenerateLanguageSpecificCodeOutput - The return type for the generateLanguageSpecificCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLanguageSpecificCodeInputSchema = z.object({
  language: z
    .string()
    .describe('The programming language for which to generate the code.'),
  prompt: z.string().describe('The natural language prompt for the code generation.'),
});

export type GenerateLanguageSpecificCodeInput = z.infer<
  typeof GenerateLanguageSpecificCodeInputSchema
>;

const GenerateLanguageSpecificCodeOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
});

export type GenerateLanguageSpecificCodeOutput = z.infer<
  typeof GenerateLanguageSpecificCodeOutputSchema
>;

export async function generateLanguageSpecificCode(
  input: GenerateLanguageSpecificCodeInput
): Promise<GenerateLanguageSpecificCodeOutput> {
  return generateLanguageSpecificCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLanguageSpecificCodePrompt',
  input: {schema: GenerateLanguageSpecificCodeInputSchema},
  output: {schema: GenerateLanguageSpecificCodeOutputSchema},
  prompt: `You are an expert software engineer. Generate code in the specified language based on the prompt.

Language: {{{language}}}
Prompt: {{{prompt}}}

Ensure the generated code is valid and follows common conventions for the specified language.`,
});

const generateLanguageSpecificCodeFlow = ai.defineFlow(
  {
    name: 'generateLanguageSpecificCodeFlow',
    inputSchema: GenerateLanguageSpecificCodeInputSchema,
    outputSchema: GenerateLanguageSpecificCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
