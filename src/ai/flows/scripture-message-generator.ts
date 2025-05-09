'use server';

/**
 * @fileOverview Generates encouraging scripture messages based on a user-provided topic.
 *
 * - scriptureMessageGenerator - A function that generates a scripture message.
 * - ScriptureMessageGeneratorInput - The input type for the scriptureMessageGenerator function.
 * - ScriptureMessageGeneratorOutput - The return type for the scriptureMessageGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScriptureMessageGeneratorInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic or theme for which a scripture message is desired (e.g., hope, love, forgiveness).'),
});
export type ScriptureMessageGeneratorInput = z.infer<typeof ScriptureMessageGeneratorInputSchema>;

const ScriptureMessageGeneratorOutputSchema = z.object({
  message: z.string().describe('An encouraging and relevant message from scripture based on the provided topic.'),
  verse: z.string().describe('The specific Bible verse(s) used to generate the message.'),
});
export type ScriptureMessageGeneratorOutput = z.infer<typeof ScriptureMessageGeneratorOutputSchema>;

export async function scriptureMessageGenerator(input: ScriptureMessageGeneratorInput): Promise<ScriptureMessageGeneratorOutput> {
  return scriptureMessageGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scriptureMessageGeneratorPrompt',
  input: {schema: ScriptureMessageGeneratorInputSchema},
  output: {schema: ScriptureMessageGeneratorOutputSchema},
  prompt: `You are a helpful assistant that provides encouraging scripture messages based on a given topic.

  Topic: {{{topic}}}

  Generate an encouraging message from scripture that is relevant to the topic. Include the specific Bible verse(s) used to generate the message.
  Message:`, // Enforce the model to return the verse used
});

const scriptureMessageGeneratorFlow = ai.defineFlow(
  {
    name: 'scriptureMessageGeneratorFlow',
    inputSchema: ScriptureMessageGeneratorInputSchema,
    outputSchema: ScriptureMessageGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
