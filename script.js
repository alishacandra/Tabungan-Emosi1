const form = document.getElementById("emotionForm");
const resultBox = document.getElementById("result");


form.addEventListener("submit", function(e) {
e.preventDefault();


const mood = parseFloat(document.getElementById("mood").value);
const income = parseFloat(document.getElementById("income").value);
const expense = parseFloat(document.getElementById("expense").value);
const target = parseFloat(document.getElementById("target").value);


const leftover = income - expense;
const effectiveSave = leftover * mood;


const months = Math.ceil(target / effectiveSave);

  // motivasi berdasarkan mood
function getMotivation(mood) {
  switch (mood) {
    case "1.2":
      return "Hari cerah dalam hatimu — teruslah menari bersama harapan. 🌼✨";
    case "1.0":
      return "Tenanglah, dunia berpihak pada jiwa yang damai. 🌙🌿";
    case "0.9":
      return "Tak tinggi, tak rendah — tetaplah melangkah. Biasa saja pun tetap berharga. ☁️💛";
    case "0.8":
      return "Capek itu wajar, tapi hatimu kuat. Istirahatlah, lalu bangkit lagi. 🌤️💪";
    case "0.7":
      return "Meski hari ini berat, kamu masih di sini — itu sudah luar biasa. Terus bertahan, cahaya akan datang. 🌒✨";
    default:
      return "Kamu hebat hanya dengan tetap berusaha. 💖";
  }
}


let moodText = "";
if (mood === 1.2) moodText = "😁 Senang";
else if (mood === 1.0) moodText = "🙂 Tenang";
else if (mood === 0.9) moodText = "😐 Biasa Saja";
else if (mood === 0.8) moodText = "😔 Capek";
else if (mood === 0.7) moodText = "😩 Stress";


resultBox.style.display = "block";
resultBox.innerHTML = `
Mood kamu hari ini: <strong>${moodText}</strong><br>
Sisa uang bulanan: <strong>Rp ${leftover.toLocaleString()}</strong><br>
Tabungan efektif (dipengaruhi mood): <strong>Rp ${effectiveSave.toLocaleString()}</strong><br><br>
Target Rp ${target.toLocaleString()} akan tercapai dalam sekitar:<br>
<strong>${months} bulan</strong><br><br>
<em>${generateMessage(mood)}</em>
`;
});


function generateMessage(mood) {
if (mood === 1.2) return "Semangat banget hari ini! Teruskan energi positifmu ✨";
if (mood === 1.0) return "Hari yang tenang cocok buat konsisten menabung 💗";
if (mood === 0.9) return "Pelan tapi pasti, kamu tetap maju 🍃";
if (mood === 0.8) return "Istirahat sebentar tidak apa-apa, kamu tetap hebat 💞";
if (mood === 0.7) return "Gak apa-apa stress, yang penting tetap pelan-pelan ya 💗";
}
