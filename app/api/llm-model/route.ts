/**
 * @author: Joel Deon Dsouza
 * @description: This file contains API routes for the LLM model, which is used to handle requests related to AI models in the application.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { searchInput, recordId } = await req.json();
  const inngestRunId = await inngest.send({
    name: 'llm-model',
    data: {
      searchInput: searchInput,
      recordId: recordId,
    },
  });
  return NextResponse.json(inngestRunId.ids[0]);
}
