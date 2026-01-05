const chatList = document.getElementById('chatList');
const search = document.getElementById('search');

search.oninput = () => {
  chatList.innerHTML = `<div>Поиск: ${search.value}</div>`;
};

window.supabase.auth.getUser().then(({ data }) => {
  if (!data.user) {
    window.location.href = 'auth.html';
  }
});
