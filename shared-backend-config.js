// Patch O.1 shared-backend runtime configuration.
// Keep disabled until the private Supabase project, RLS policy, and parent authentication are configured.
// Never put a Supabase service-role key in browser code.
window.LEVEL_UP_SHARED_BACKEND_CONFIG = {
  enabled: false,
  url: "",
  anonKey: ""
};
