// =============================
// LOAD DATA DARI LOCAL STORAGE
// =============================
let cumulative = Number(localStorage.getItem("cumulative")) || 0;
let targetValue = Number(localStorage.getItem("targetValue")) || 0;
let dayChecks = JSON.parse(localStorage.getItem("dayChecks")) || Array(30).fill(false);

document.getElementById("cumulative").innerText = formatRupiah(cumulative);
document.getElementById("targetDisplay").innerText = formatRupiah(targetValue);

// =============================
// GENERATE TRACKER HARI 1─30
// =============================
const dayContainer = document.getElementById("dayChecks");
dayContainer.innerHTML = "";

function renderDayBoxes() {
  dayContainer.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const box = document.createElement("div");
    box.className = "day-box";
    box.innerText = i + 1;

    if (dayChecks[i]) box.classList.add("checked");

    dayContainer.appendChild(box);
  }
}
renderDayBoxes();

// =============================
// FORMAT RUPIAH
// =============================
function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

// =============================
// UPDATE PROGRESS BAR
// =============================
function updateProgress() {
  const pct = targetValue ? Math.min((cumulative / targetValue) * 100, 100) : 0;
  
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").innerText = Math.floor(pct) + "%";

  document.getElementById("cumulative").innerText = formatRupiah(cumulative);
  document.getElementById("targetDisplay").innerText = formatRupiah(targetValue);

  localStorage.setItem("cumulative", cumulative);
  localStorage.setItem("targetValue", targetValue);
}
updateProgress();

// =============================
// HITUNG TABUNGAN HARI INI
// =============================
document.getElementById("emotionForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const mood = Number(document.getElementById("mood").value);
  const income = Number(document.getElementById("income").value);
  const expense = Number(document.getElementById("expense").value);
  const target = Number(document.getElementById("target").value);

  targetValue = target;
  localStorage.setItem("targetValue", targetValue);

  let resultBox = document.getElementById("result");

  let dailySaving = (income - expense) * mood;
  if (dailySaving < 0) dailySaving = 0;

  cumulative += dailySaving;
  localStorage.setItem("cumulative", cumulative);

  updateProgress();

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <p><strong>Tabungan hari ini:</strong> ${formatRupiah(dailySaving)}</p>
    <p><strong>Total tabungan sekarang:</strong> ${formatRupiah(cumulative)}</p>
  `;
});

// =============================
// TOMBOL "✔ SUDAH MENABUNG HARI INI"
// =============================
document.getElementById("markToday").addEventListener("click", function () {
  const today = new Date().getDate(); // contoh: hari ke-16 dalam bulan
  const index = today - 1;

  dayChecks[index] = true;
  localStorage.setItem("dayChecks", JSON.stringify(dayChecks));

  renderDayBoxes();
});// =========================
// TANDAI HARI INI (DENGAN ANIMASI POP)
// =========================
document.getElementById("markToday").addEventListener("click", () => {
    const today = new Date().getDate() - 1; // 0–29

    if (today < 0 || today >= 30) return;

    if (!dayChecks[today]) {
        dayChecks[today] = true;
        localStorage.setItem("dayChecks", JSON.stringify(dayChecks));
    }

    const box = document.querySelectorAll(".day-box")[today];
    box.classList.add("checked");

    // tambah animasi biar selalu pop kalau ditekan
    box.style.animation = "none";
    void box.offsetWidth; // trik restart animasi
    box.style.animation = "popCheck 0.28s ease-out";

    updateProgress();
});

