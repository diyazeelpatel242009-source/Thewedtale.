
/* The Wed Tale Gujarat — Supabase configuration */

(function () {
  const SUPABASE_URL = "https://tvbkrnglhnxussexvixj.supabase.co";
  const SUPABASE_KEY = "sb_publishable_pEojTbwnAi3uN6H4BsDN5w_9OlmftNG";

  const configured =
    SUPABASE_URL.startsWith("https://") &&
    SUPABASE_URL.includes(".supabase.co") &&
    SUPABASE_KEY.length > 20 &&
    !SUPABASE_KEY.startsWith("PASTE_");

  window.supabaseClient =
    configured && window.supabase
      ? window.supabase.createClient(
          SUPABASE_URL,
          SUPABASE_KEY,
          {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true
            }
          }
        )
      : null;

  window.twtSupabaseConfigured =
    Boolean(window.supabaseClient);
})();
