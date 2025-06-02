/**
 * @author: Joel Deon Dsouza
 * @description: This file contains a list of AI models with their respective API keys.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

export const AIModalsList = [
  {
    id: 1,
    name: 'DeepSeek',
    description: 'DeepSeek: R1 0528',
    modelAPI: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
  },
  {
    id: 2,
    name: 'Mistral',
    description: 'Mistral: Devstral',
    modelAPI: process.env.NEXT_PUBLIC_MISTRAL_API_KEY,
  },
  {
    id: 3,
    name: 'Gemini',
    description: 'Google: Gemini 2.0',
    modelAPI: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  {
    id: 4,
    name: 'Llama 4',
    description: 'Meta: Llama 4 Maverick ',
    modelAPI: process.env.NEXT_PUBLIC_LLAMA4_API_KEY,
  },
];
