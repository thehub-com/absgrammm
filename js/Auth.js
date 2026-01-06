// js/Auth.js

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Auth.js загружен');

  // Проверка активной сессии
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    window.location.href = 'messenger.html';
  }
});

// DOM
const emailBox = document.getElementById('authEmail');
const codeBox  = document.getElementById('authCode');
const emailInp = document.getElementById('emailInput');
const codeInp  = document.getElementById('codeInput');

let currentEmail = '';

// ===== ОТПРАВКА КОДА =====
async function sendCode() {
  const email = emailInp.value.trim();
  if (!email) return;

  currentEmail = email;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true
    }
  });

  if (error) {
    console.error(error.message);
    return;
  }

  emailBox.style.display = 'none';
  codeBox.style.display  = 'block';
}

// ===== ПРОВЕРКА КОДА =====
async function verifyCode() {
  const code = codeInp.value.trim();
  if (!code) return;

  const { data, error } = await supabase.auth.verifyOtp({
    email: currentEmail,
    token: code,
    type: 'email'
  });

  if (error) {
    console.error(error.message);
    return;
  }

  // редирект в мессенджер
  window.location.href = 'messenger.html';
}
