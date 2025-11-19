// script.js — clean & pastel pink version
// Fitur: localStorage, notifikasi, animasi, reset, smooth UI

const form = document.getElementById('emotionForm');
const entries = document.getElementById('entries');
const totalEl = document.getElementById('total');
const liquid = document.getElementById('liquid');
const resetBtn = document.getElementById('resetBtn');

let total = parseInt(localStorage.getItem('totalEmotion')) || 0;
let history = JSON.parse(localStorage.getItem('emotionHistory')) || [];
const GOAL = 100;

function updateUI() {
  totalEl.textContent = `Saldo: ${total}`;

  const pct = Math.min(100, Math.round((total / GOAL) * 100));
  liquid.style.height = pct + "%";

  liquid.animate([
    { transform: "scaleY(1)" },
    { transform: "scaleY(1.05)" },
    { transform: "scaleY(1)" }
  ], {
    duration: 300,
    easing: "ease-out"
  });

  entries.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement('li');
    li.className = 'entry';
    li.innerHTML = `<strong>${item.emotion}</strong> — +${item.value}`;
    entries.appendChild(li);
  });
}

function showNotif(text) {
  const n = document.createElement('div');
  n.className = 'notif';
  n.textContent = text;
  document.body.appendChild(n);

  setTimeout(() => {
    n.style.opacity = 0;
    n.style.transform = "translateY(-20px)";
  }, 10);

  setTimeout(() => n.remove(), 1500);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const emotion = document.getElementById('emotion').value;
  const value = parseInt(document.getElementById('value').value) || 0;
  if (value <= 0) return;

  total += value;
  history.unshift({ emotion, value });

  localStorage.setItem('totalEmotion', total);
  localStorage.setItem('emotionHistory', JSON.stringify(history));

  showNotif("✨ Kamu menabung emosi positif!");
  updateUI();

  form.reset();
  document.getElementById('value').value = 5;
});

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    total = 0;
    history = [];

    localStorage.removeItem('totalEmotion');
    localStorage.removeItem('emotionHistory');

    showNotif("🔄 Data berhasil direset");
    updateUI();
  });
}

setInterval(() => {
  const face = document.querySelector('.jar .face');
  if (face) {
    face.style.transform = `translateY(${Math.sin(Date.now()/600)*6}px)`;
  }
}, 60);

updateUI();
