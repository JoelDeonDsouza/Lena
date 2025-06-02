/**
 * @author: Joel Deon Dsouza
 * @description: This file containes API routes for Inngest, which is used to handle serverless functions in the application.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { serve } from 'inngest/next';
import { inngest } from '../../../inngest/client';
import { llmModel } from '../../../inngest/functions';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [llmModel],
});
