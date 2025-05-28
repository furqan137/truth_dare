import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://waqckchohnzjscajnunb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcWNrY2hvaG56anNjYWpudW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTE0NzksImV4cCI6MjA1ODMyNzQ3OX0.CTi8LZ9V5joT770gTqQmxWfcHN61hz-Fu3u_NvxSmf8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);