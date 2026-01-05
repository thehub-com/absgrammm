// ====== SUPABASE INIT (ОДИН РАЗ) ======
const SUPABASE_URL = "https://zdmtwnvaksdbvutrpcnr.supabase.co"; // ТВОЙ URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbXR3bnZha3NkYnZ1dHJwY25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1Mjg4NjcsImV4cCI6MjA4MzEwNDg2N30.QztruYbzPeF8CrZmT_FhMw6VHc1-289qqJ8Qs4Z7nVc"; // anon public key

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ====== GOOGLE LOGIN ======
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      alert(error.message);
    }
  });
}

// ====== EMAIL + PASSWORD LOGIN ======
const emailBtn = document.getElementById("emailLogin");
if (emailBtn) {
  emailBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Заполните email и пароль");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    }
  });
}

// ====== SESSION CHECK ======
document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    window.location.href = "messenger.html"; // или main.html
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      window.location.href = "messenger.html";
    }
  });
});
