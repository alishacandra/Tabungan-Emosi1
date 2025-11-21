// --- DATA EMOSI (WARNA & LABEL) ---
const emotions = {
    happy: { label: "Bahagia", color: "#FFD93D" },
    sad: { label: "Sedih", color: "#6ECFFF" },
    angry: { label: "Marah", color: "#FF6961" },
    calm: { label: "Tenang", color: "#A1E3A1" },
    grateful: { label: "Bersyukur", color: "#FFB6E6" }
};

// --- LOAD DATA DARI LOCAL STORAGE ---
let weeklyData = JSON.parse(localStorage.getItem("emotionWeek")) || {
    days: [null, null, null, null, null, null, null] // 7 hari
};

// --- STATISTIK EMOSI ---
let emotionStats = JSON.parse(localStorage.getItem("emotionStats")) || {
    happy: 0,
    sad: 0,
    angry: 0,
    calm: 0,
    grateful: 0
};

// --- RENDER PROGRESS MINGGUAN ---
function renderWeek() {
    const weekContainer = document.getElementById("week-progress");
    weekContainer.innerHTML = "";

    weeklyData.days.forEach((emo, i) => {
        const box = document.createElement("div");
        box.classList.add("day-box");

        if (emo) {
            box.style.background = emotions[emo].color;
            box.innerHTML = `<span class="check">✔</span>`;
        } else {
            box.innerHTML = `<span class="day-label">Hari ${i + 1}</span>`;
        }

        weekContainer.appendChild(box);
    });

    renderStats();
}

// --- RENDER STATISTIK ---
function renderStats() {
    const statBox = document.getElementById("stats-box");
    statBox.innerHTML = "";

    Object.keys(emotions).forEach(key => {
        const item = document.createElement("div");
        item.classList.add("stat-item");
        item.innerHTML = `
            <span class="stat-label">${emotions[key].label}</span>
            <span class="stat-count">${emotionStats[key]}x</span>
        `;
        statBox.appendChild(item);
    });
}

// --- CEK JIKA SUDAH ISI HARI INI ---
function hasFilledToday() {
    const todayIndex = new Date().getDay();
    return weeklyData.days[todayIndex] !== null;
}

// --- SIMPAN EMOSI HARI INI ---
function saveEmotion(emo) {
    const todayIndex = new Date().getDay();

    if (weeklyData.days[todayIndex] !== null) {
        alert("Kamu sudah menabung emosi hari ini!");
        return;
    }

    // simpan emosi mingguan
    weeklyData.days[todayIndex] = emo;
    localStorage.setItem("emotionWeek", JSON.stringify(weeklyData));

    // tambahkan statistik
    emotionStats[emo]++;
    localStorage.setItem("emotionStats", JSON.stringify(emotionStats));

    renderWeek();
    alert("Emosi hari ini berhasil disimpan!");
}

// --- EVENT LISTENER EMOSI ---
function setupButtons() {
    document.querySelectorAll(".emotion-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            saveEmotion(btn.dataset.emotion);
        });
    });
}

// --- RESET MINGGUAN ---
document.getElementById("reset-week").addEventListener("click", () => {
    if (confirm("Reset tabungan minggu ini?")) {
        weeklyData = { days: [null, null, null, null, null, null, null] };
        localStorage.setItem("emotionWeek", JSON.stringify(weeklyData));
        renderWeek();
    }
});

// --- RESET STATISTIK ---
document.getElementById("reset-stats").addEventListener("click", () => {
    if (confirm("Reset seluruh statistik emosi?")) {
        emotionStats = { happy: 0, sad: 0, angry: 0, calm: 0, grateful: 0 };
        localStorage.setItem("emotionStats", JSON.stringify(emotionStats));
        renderStats();
    }
});

// --- START ---
renderWeek();
setupButtons();
