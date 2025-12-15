import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-code-improvements.ts';
import '@/ai/flows/generate-code-from-prompt.ts';
import '@/ai/flows/generate-language-specific-code.ts';