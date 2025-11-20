/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Pacifico&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

/* BODY & CONTAINER */
body {
  background: linear-gradient(135deg, #ffe6f2, #fce9ff, #fff1f7);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.container {
  width: 90%;
  max-width: 450px;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  padding: 30px 25px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(255, 150, 200, 0.25);
  animation: fadeIn 0.8s ease;
}

/* TITLE */
h1.title {
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  text-align: center;
  color: #ff6fb1;
  margin-bottom: 10px;
}

p.subtitle {
  text-align: center;
  margin-bottom: 25px;
  color: #4a3d45;
}

/* FORM INPUTS */
form.card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff0f7;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid #ffc2e1;
}

.input {
  padding: 12px;
  border-radius: 15px;
  border: 2px solid #ffb6d9;
  outline: none;
  transition: 0.25s ease;
  background: #fff5fb;
}

.input:focus {
  border-color: #ff6fb1;
  box-shadow: 0 0 8px #ffbfe5;
}

/* BUTTON */
button.btn {
  padding: 12px;
  border-radius: 15px;
  border: none;
  background: linear-gradient(90deg, #ff6fb1, #ffa7d7);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

button.btn:hover {
  transform: scale(1.03);
  opacity: 0.95;
}

/* RESULT BOX */
.result-box {
  margin-top: 20px;
  padding: 18px;
  border-radius: 15px;
  border: 2px solid #ffb6d9;
  background: #ffe4f2;
  color: #4a3d45;
  line-height: 1.6;
  display: none;
  animation: fadeInUp 0.6s ease;
}

/* PROGRESS BAR */
.progress-wrap {
  margin-top: 25px;
}

.progress-bar-outer {
  width: 100%;
  height: 20px;
  background: #ffe4f2;
  border-radius: 25px;
  border: 2px solid #ffb6d9;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
}

.progress-bar-inner {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #ff6fb1, #ffa7d7);
  border-radius: 25px;
  transition: width 0.5s ease;
}

.progress-percent {
  margin-top: 5px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a3d45;
}

/* PROGRESS INFO */
.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.95rem;
  color: #4a3d45;
}

/* DAILY TRACKER */
.daily-tracker {
  margin-top: 25px;
}

.month-heading {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff6fb1;
  margin-bottom: 8px;
}

.tracker-note {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #4a3d45;
}

#markToday {
  width: 100%;
  margin-bottom: 15px;
}

.day-checks {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-box {
  background: #fff0f7;
  border: 2px solid #ffc2e1;
  border-radius: 12px;
  text-align: center;
  padding: 8px 0;
  color: #ff6fb1;
  font-weight: 500;
  font-size: 0.85rem;
  position: relative;
  transition: all 0.25s;
}

.day-box.checked {
  background: #ff6fb1;
  border-color: #ff4a91;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(255, 110, 170, 0.3);
}

.day-box.checked::after {
  content: "✔";
  font-size: 16px;
  position: absolute;
  top: -4px;
  right: 4px;
  color: white;
}

/* ANIMATIONS */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
