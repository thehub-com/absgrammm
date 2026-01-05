document.getElementById('logout').onclick = async () => {
  await window.supabase.auth.signOut();
  window.location.href = 'auth.html';
};
