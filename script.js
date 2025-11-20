// =========================
// INITIAL STORAGE
// =========================
let cumulative = Number(localStorage.getItem("cumulative")) || 0;
let targetValue = Number(localStorage.getItem("targetValue")) || 0;
let dayChecks = JSON.parse(localStorage.getItem("dayChecks")) || Array(30).fill(false);

document.getElementById("cumulative").innerText = formatRupiah(cumulative);
document.getElementById("targetDisplay").innerText = formatRupiah(targetValue);

// Generate kotak 1–30
const dayContainer = document.getElementById("dayChecks");
dayContainer.innerHTML = "";
for (let i = 0; i < 30; i++) {
  const box = document.createElement("div");
  box.className = "day-box";
  box.innerText = i + 1;

  if (dayChecks[i]) {
    box.classList.add("checked");
  }

  dayContainer.appendChild(box);
}

// =========================
// FORMAT RUPIAH
// =========================
function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

// =========================
// UPDATE PROGRESS BAR
// =========================
function updateProgress() {
  const pct = targetValue ? Math.min((cumulative / targetValue) * 100, 100) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").innerText = Math.floor(pct) + "%";

  document.getElementById("cumulative").innerText = formatRupiah(cumulative);
  document.getElementById("targetDisplay").innerText = formatRupiah(targetValue);

  localStorage.setItem("cumulative", cumulative);
  localStorage
