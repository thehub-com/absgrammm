document.getElementById('googleLogin').onclick = async () => {
  const { error } = await window.supabase.auth.signInWithOAuth({
    provider: 'google'
  });
  if (error) alert(error.message);
};

window.supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    window.location.href = 'messenger.html';
  }
});
