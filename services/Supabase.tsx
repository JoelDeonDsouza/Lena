/**
 * @author: Joel Deon Dsouza
 * @description: This file contains the Supabase client configuration for interacting with the database.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
