// js/Auth.js

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Auth.js загружен');

  // 🔒 Проверяем, что мы именно на auth.html
  if (!window.location.pathname.includes('auth.html')) {
    return;
  }

  // 1️⃣ Проверка существующей сессии
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Ошибка проверки сессии:', error);
    return;
  }

  // 2️⃣ Если пользователь уже вошёл — в мессенджер
  if (session) {
    console.log('Пользователь уже авторизован');
    window.location.href = 'messenger.html';
    return;
  }

  console.log('Пользователь НЕ авторизован');
});

// ======================
// ВХОД ПО EMAIL + PASSWORD
// ======================
async function loginWithEmail() {
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;

  if (!email || !password) {
    alert('Введите email и пароль');
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = 'messenger.html';
}

// ======================
// ВХОД ЧЕРЕЗ GOOGLE
// ======================
async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/messenger.html'
    }
  });

  if (error) {
    alert(error.message);
  }
}
