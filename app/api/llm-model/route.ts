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
