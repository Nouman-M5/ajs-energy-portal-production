/* Classic (non-module) script - works when the HTML is opened directly via
   file://, unlike an ES module import, which browsers block from file:// origins.
   Load the Supabase UMD build before this file; it exposes window.supabase. */
var sb = supabase.createClient(
  'https://wdpeddxrmqswfmavjzkf.supabase.co',
  'sb_publishable_zOT4eY9zoiToBv_MxdeNMw_Q7ximWNE'
);

async function ajsRequireSession(redirectTo) {
  redirectTo = redirectTo || 'login.html';
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = redirectTo; return null; }
  return session;
}

async function ajsGetMyProfile() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data, error } = await sb.from('profiles').select('*').eq('id', user.id).single();
  if (error) { console.error(error); return null; }
  return data;
}

async function ajsSignOut() {
  await sb.auth.signOut();
  window.location.href = 'login.html';
}
