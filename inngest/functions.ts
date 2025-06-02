/**
 * @author: Joel Deon Dsouza
 * @description: This file contains Ingest functions for handling AI model queries and saving responses to the database.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { supabase } from '@/services/Supabase';
import { inngest } from './client';

export const llmModel = inngest.createFunction(
  { id: 'llm-model' },
  { event: 'llm-model' },
  async ({ event, step }) => {
    const aiResponse = await step.ai.infer('generate-ai-llm-model-query', {
      model: step.ai.models.gemini({
        model: 'gemini-1.5-flash',
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      }),
      body: {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a helpful AI assistant that provides accurate and relevant information about: ${event.data.searchInput}`,
              },
            ],
          },
        ],
      },
    });

    // Save the AI response to the database with libId validation //
    await step.run('save-to-db', async () => {
      // Check if the record exists with the given libId //
      const { data: existingRecord, error: fetchError } = await supabase
        .from('Library')
        .select('libId')
        .eq('libId', event.data.recordId)
        .single();
      if (fetchError) {
        console.error('Record not found or fetch error:', fetchError);
        throw new Error(
          `Record with libId ${event.data.recordId} not found: ${fetchError.message}`,
        );
      }
      if (!existingRecord) {
        throw new Error(`No record found with libId: ${event.data.recordId}`);
      }
      const part = aiResponse?.candidates?.[0]?.content?.parts?.[0];
      const aiText = part && 'text' in part ? part.text : null;
      const { data, error } = await supabase
        .from('Library')
        .update({ aiResp: aiText })
        .eq('libId', event.data.recordId)
        .select();
      if (error) {
        console.error('Supabase update error:', error);
        throw new Error(`Failed to update Supabase: ${error.message}`);
      }
      if (!data || data.length === 0) {
        throw new Error(
          `Update succeeded but no rows were affected for libId: ${event.data.recordId}`,
        );
      }
      return data;
    });
    return aiResponse;
  },
);
