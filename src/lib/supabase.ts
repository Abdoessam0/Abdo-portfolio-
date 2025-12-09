import { createClient } from "@supabase/supabase-js";

// Use your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lkucqzmpjkwlhylyfxeh.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdWNxem1wamt3bGh5bHlmeGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzgwNDAsImV4cCI6MjA4MDg1NDA0MH0.fn8WfzdDhUPkhOsPzcGk9xgUsDvLTiD8n7DXVnn7yOw";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Using defaults for development.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});