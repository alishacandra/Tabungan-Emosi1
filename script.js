// Tabungan Emosi – Versi Progress Harian + Centang
// ==================================================

// Ambil elemen\const form = document.getElementById("emotionForm");
const resultBox = document.getElementById("result");
const motivasiText = document.getElementById("motivasiText");
const progressFill = document.getElementById("progressFill");
const progressPct = document.getElementById("progressPct");
const cumulativeDisplay = document.getElementById("cumulative");
const targetDisplay = document.getElementById("targetDisplay");
const dayChecks = document.getElementById("dayChecks");

// Load penyimpanan
let savedData = JSON.parse(localStorage.getItem("emosiSavings")) || {
  target: 0,
  cumulative: 0,
  days: {}
};

// Generate checklist 31 hariunction generateDayChecks() {
  dayChecks.innerHTML = "";
  for (let d = 1; d <= 31; d++) {
    const div = document.createElement("div");
    div.className = "day-box";

    const status = savedData.days[d] ? "checked" : "";

    div.innerHTML = `
      <span>${d}</span>
      <span class="check ${status}">✔</span>
    `;

    if (savedData.days[d]) div.classList.add("done");

    dayChecks.appendChild(div);
  }
}

generateDayChecks();

// Update progress barunction updateProgress() {
  const percent = savedData.target
    ? Math.min(100, Math.round((savedData.cumulative / savedData.target) * 100))
    : 0;

  progressFill.style.width = percent + "%";
  progressPct.textContent = percent + "%";

  cumulativeDisplay.textContent = 
    "Rp " + savedData.cumulative.toLocaleString("id-ID");

  targetDisplay.textContent = 
    "Rp " + savedData.target.toLocaleString("id-ID");
}

updateProgress();

// Motivasi berdasarkan mood
function getMotivation(mood) {
  const words = {
    "1.2": "Hari yang cerah untuk hatimu! Simpan energimu dalam bentuk tabungan. 💖", 
    "1.0": "Tenang itu indah. Langkahmu stabil, tabunganmu ikut stabil. ✨", 
    "0.9": "Hari biasa juga tetap berarti. Yang penting kamu tetap berjalan. 🌿", 
    "0.8": "Capek itu wajar, tapi kamu tetap berharga. Ayo perlahan kita bangkit lagi. 💕", 
    "0.7": "Meski stress, kamu masih mau berusaha. Itu keberanian besar. 🌸" 
  };
  return words[mood];
}

// Event submitorm.addEventListener("submit", function (e) {
  e.preventDefault();

  const mood = parseFloat(document.getElementById("mood").value);
  const income = parseFloat(document.getElementById("income").value);
  const expense = parseFloat(document.getElementById("expense").value);
  const target = parseFloat(document.getElementById("target").value);

  // Hitung tabungan hari ini
  const sisaBulanan = income - expense;
  const harian = Math.max(0, (sisaBulanan / 30) * mood);

  // Simpan target baru jika berubah
  savedData.target = target;

  // Tandai hari ini
  const today = new Date().getDate();

  if (!savedData.days[today]) {
    savedData.days[today] = true;
    savedData.cumulative += Math.round(harian);
  }

  // Simpan ke localStorage
  localStorage.setItem("emosiSavings", JSON.stringify(savedData));

  // Update UI
  generateDayChecks();
  updateProgress();

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <strong>Tabungan Hari Ini:</strong> Rp ${Math.round(harian).toLocaleString("id-ID")}<br>
    <strong>Total Terkumpul:</strong> Rp ${savedData.cumulative.toLocaleString("id-ID")}
  `;

  motivasiText.textContent = getMotivation(mood.toString());
});
