// =============================
//       LOAD DATA LOCALSTORAGE
// =============================
let cumulative = Number(localStorage.getItem("cumulative")) || 0;
let targetValue = Number(localStorage.getItem("targetValue")) || 0;
let dayChecks = JSON.parse(localStorage.getItem("dayChecks")) || Array(30).fill(false);

// Update tampilan awal
document.getElementById("cumulative").innerText = formatRupiah(cumulative);
document.getElementById("targetDisplay").innerText = formatRupiah(targetValue);

// =============================
//       GENERATE TRACKER 1-30
// =============================
const dayContainer = document.getElementById("dayChecks");

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
//         FORMAT RUPIAH
// =============================
function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

// =============================
//      UPDATE PROGRESS BAR
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
//   FORM SUBMIT - HITUNG HARI INI
// =============================
document.getElementById("emotionForm").addEventListener("submit", function(e){
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
//   TOMBOL "SUDAH MENABUNG HARI INI"
// =============================
document.getElementById("markToday").addEventListener("click", function(){
  const today = new Date().getDate(); // misal hari ini tanggal ke-16
  const index = today - 1;

  if(!dayChecks[index]) {
    dayChecks[index] = true;
    localStorage.setItem("dayChecks", JSON.stringify(dayChecks));

    const box = dayContainer.children[index];
    box.classList.add("checked");
    // Tambah animasi centang
    box.style.transform = "scale(0.8)";
    setTimeout(()=>{ box.style.transform = "scale(1)"; }, 150);
  }
});
