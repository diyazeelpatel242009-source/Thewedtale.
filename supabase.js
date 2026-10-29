/* The Wed Tale Gujarat — Supabase client configuration.
   Replace both placeholders with your project's Project URL and publishable/anon key.
   NEVER use a service_role or secret key in browser code. */
(function () {
  const SUPABASE_URL = "https://tvbkrnglhnxussexvixj.supabase.co";
  const SUPABASE_KEY = "sb_publishable_pEojTbwnAi3uN6H4BsDN5w_9OlmftNG";
  const configured = !SUPABASE_URL.includes("YOUR_") && !SUPABASE_KEY.includes("YOUR_");
  window.supabaseClient = (configured && window.supabase)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;
  window.twtSupabaseConfigured = configured;
})();
