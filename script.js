
const form = document.getElementById('emotionForm');
const resultBox = document.getElementById('result');
const progressFill = document.getElementById('progressFill');
const progressPct = document.getElementById('progressPct');
const cumulativeEl = document.getElementById('cumulative');
const targetDisplay = document.getElementById('targetDisplay');
const monthChecks = document.getElementById('monthChecks');

const MONTH_BOXES = 12;

// load from storage
let cumulativeSaved = parseFloat(localStorage.getItem('cumulativeSaved')) || 0;
let savedTarget = parseFloat(localStorage.getItem('savedTarget')) || 0;

// helper: format rupiah
function fmt(n){ return 'Rp ' + (Math.round(n)).toLocaleString('id-ID'); }

// build month boxes
function buildMonthBoxes(){
  monthChecks.innerHTML = '';
  for(let i=1;i<=MONTH_BOXES;i++){
    const box = document.createElement('div');
    box.className = 'month-box';
    box.dataset.idx = i;
    box.innerHTML = `<div class="label">Bln ${i}</div><div class="tick">✓</div>`;
    monthChecks.appendChild(box);
  }
}

// mark boxes based on cumulativeSaved/target
function updateMonthChecks(){
  if(!savedTarget || savedTarget <= 0){
    // none checked
    document.querySelectorAll('.month-box').forEach(b => b.classList.remove('checked'));
    return;
  }
  const ratio = Math.min(1, cumulativeSaved / savedTarget);
  const boxesToCheck = Math.floor(ratio * MONTH_BOXES); // how many months filled
  const nodes = document.querySelectorAll('.month-box');
  nodes.forEach((n, i) => {
    if(i < boxesToCheck) n.classList.add('checked');
    else n.classList.remove('checked');
  });
}

// update progress bar visuals
function updateProgressUI(){
  const pct = savedTarget > 0 ? Math.min(100, (cumulativeSaved / savedTarget) * 100) : 0;
  progressFill.style.width = pct + '%';
  progressPct.textContent = Math.round(pct) + '%';
  cumulativeEl.textContent = fmt(cumulativeSaved);
  targetDisplay.textContent = fmt(savedTarget);
  updateMonthChecks();
  // show result box if any saved
  if(cumulativeSaved > 0) resultBox.style.display = 'block';
}

// generate motivational message (reuse)
function generateMessage(mood){
  if(mood === 1.2) return "Semangat banget hari ini! Teruskan energi positifmu ✨";
  if(mood === 1.0) return "Hari yang tenang cocok buat konsisten menabung 💗";
  if(mood === 0.9) return "Pelan tapi pasti, kamu tetap maju 🍃";
  if(mood === 0.8) return "Istirahat sebentar tidak apa-apa, kamu tetap hebat 💞";
  if(mood === 0.7) return "Gak apa-apa stress, yang penting tetap pelan-pelan ya 💗";
  return "";
}

// on submit: compute effective save & add to cumulative
form.addEventListener('submit', e => {
  e.preventDefault();
  const mood = parseFloat(document.getElementById('mood').value);
  const income = parseFloat(document.getElementById('income').value) || 0;
  const expense = parseFloat(document.getElementById('expense').value) || 0;
  const target = parseFloat(document.getElementById('target').value) || 0;

  const leftover = Math.max(0, income - expense);
  const effectiveSave = Math.max(0, leftover * mood);

  // update saved target if changed
  savedTarget = target;
  localStorage.setItem('savedTarget', savedTarget);

  // increment cumulativeSaved
  cumulativeSaved += effectiveSave;
  localStorage.setItem('cumulativeSaved', cumulativeSaved);

  // compute estimated months remaining (using effectiveSave average this submit)
  const monthsLeft = effectiveSave > 0 ? Math.ceil(Math.max(0, (savedTarget - cumulativeSaved) / effectiveSave)) : '∞';

  // display result
  resultBox.style.display = 'block';
  resultBox.innerHTML = `
    Mood: <strong>${document.querySelector('#mood option:checked').textContent}</strong><br>
    Sisa uang bulanan: <strong>${fmt(leftover)}</strong><br>
    Tabungan efektif bulan ini: <strong>${fmt(effectiveSave)}</strong><br>
    <br>
    Total terkumpul: <strong>${fmt(cumulativeSaved)}</strong><br>
    Target: <strong>${fmt(savedTarget)}</strong><br>
    <strong>${monthsLeft}</strong> bulan tersisa (perkiraan dengan simpanan saat ini).<br>
    <em>${generateMessage(mood)}</em>
  `;

  // refresh UI
  updateProgressUI();

  // small visual focus on progress bar
  progressFill.animate([{transform:'scaleX(0.98)'},{transform:'scaleX(1)'}], {duration:420, easing:'ease-out'});

  // reset inputs except target (so user can repeatedly press to simulate monthly saves)
  document.getElementById('income').value = '';
  document.getElementById('expense').value = '';
});

// initial render
buildMonthBoxes();
updateProgressUI();
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Girly Aesthetic Saving Tracker</title>
<style>
    body {
        font-family: "Poppins", sans-serif;
        background: #ffeef6;
        padding: 40px;
        color: #ff4f9a;
        text-align: center;
    }

    .container {
        background: white;
        width: 350px;
        margin: auto;
        padding: 25px;
        border-radius: 20px;
        box-shadow: 0 0 15px #ffbcd4;
    }

    h2 {
        margin-bottom: 15px;
    }

    input {
        padding: 10px;
        width: 80%;
        border-radius: 10px;
        border: 2px solid #ff9ec9;
        margin-bottom: 15px;
    }

    button {
        background: #ff69b4;
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 0 10px #ffbad7;
        transition: 0.2s;
    }

    button:hover {
        background: #ff4f9a;
    }

    .progress-box {
        background: #ffe3f2;
        border-radius: 15px;
        height: 25px;
        margin-top: 20px;
        overflow: hidden;
        border: 2px solid #ff9ec9;
    }

    .progress {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #ff4f9a, #ffb2d6);
        transition: 0.4s;
    }

    .checkmark {
        font-size: 22px;
        margin-top: 10px;
        display: none;
    }
</style>
</head>
<body>

<div class="container">
    <h2>🌸 Girly Savings Tracker 🌸</h2>

    <input type="number" id="target" placeholder="Masukkan target (Rp)" />
    <input type="number" id="inputTabung" placeholder="Masukkan jumlah nabung hari ini (Rp)" />

    <br>
    <button onclick="tambahTabungan()">Saya sudah menabung 💗</button>

    <p id="status"></p>

    <div class="checkmark" id="checkmark">✔ Hari ini sudah menabung!</div>

    <div class="progress-box">
        <div class="progress" id="progress"></div>
    </div>

    <p id="persen"></p>
</div>

<script>
    let totalTabungan = localStorage.getItem("tabungan") ? parseInt(localStorage.getItem("tabungan")) : 0;
    let targetTabungan = localStorage.getItem("target") ? parseInt(localStorage.getItem("target")) : 0;

    const progressBar = document.getElementById("progress");
    const persenText = document.getElementById("persen");
    const checkmark = document.getElementById("checkmark");

    function updateProgress() {
        if (targetTabungan === 0) return;

        let persen = (totalTabungan / targetTabungan) * 100;
        if (persen > 100) persen = 100;

        progressBar.style.width = persen + "%";
        persenText.innerHTML = Math.floor(persen) + "% menuju target 💖";
    }

    function tambahTabungan() {
        let targetInput = document.getElementById("target").value;
        let tabungInput = document.getElementById("inputTabung").value;

        if (targetInput) {
            targetTabungan = parseInt(targetInput);
            localStorage.setItem("target", targetTabungan);
        }

        if (!tabungInput) {
            alert("Isi jumlah tabungan hari ini!");
            return;
        }

        totalTabungan += parseInt(tabungInput);
        localStorage.setItem("tabungan", totalTabungan);

        checkmark.style.display = "block";   // muncul centang
        updateProgress();
    }

    updateProgress();
</script>

</body>
</html>
