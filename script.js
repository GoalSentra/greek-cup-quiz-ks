let quiz = [];
let qIndex = 0;
let score = 0;

async function loadQuiz() {
  const res = await fetch("quiz.json");
  quiz = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = quiz[qIndex];
  document.getElementById("question-number").innerText = `Ερώτηση ${qIndex + 1} / ${quiz.length}`;
  document.getElementById("question-text").innerText = q["Ερώτηση"];

  // Εικόνα
  const img = document.getElementById("quiz-image");
  img.src = "images/" + q["Εικόνα_Ερώτησης"];
  img.style.display = q["Εικόνα_Ερώτησης"] ? "block" : "none";

  // Επιλογές
  const letters = ["Α", "Β", "Γ", "Δ"];
  const container = document.getElementById("choices");
  container.innerHTML = "";
  letters.forEach(letter => {
    const opt = q[`Επιλογή${letter}`];
    if (opt) {
      const btn = document.createElement("button");
      btn.innerText = `${letter}. ${opt}`;
      btn.onclick = () => selectAnswer(letter, opt, q);
      container.appendChild(btn);
    }
  });

  document.getElementById("feedback").innerText = "";
  document.getElementById("explanation").innerText = "";
  document.getElementById("next-btn").style.display = "none";
}

function selectAnswer(selected, answer, q) {
  const correct = q["Σωστή"].trim().toUpperCase();
  const feedback = document.getElementById("feedback");
  const explanation = document.getElementById("explanation");
  const img = document.getElementById("quiz-image");

  if (selected === correct) {
    score++;
    feedback.innerHTML = "✅ Σωστή απάντηση!";
    feedback.className = "correct";
  } else {
    feedback.innerHTML = `❌ Λάθος. Η σωστή απάντηση ήταν: ${correct}. ${q[`Επιλογή${correct}`]}`;
    feedback.className = "incorrect";
  }

  if (q["Επεξήγηση"]) {
    explanation.innerText = "ℹ️ " + q["Επεξήγηση"];
  }

  if (q["Εικόνα_Απάντησης"]) {
    img.src = "images/" + q["Εικόνα_Απάντησης"];
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

document.getElementById("next-btn").onclick = () => {
  qIndex++;
  if (qIndex < quiz.length) {
    showQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>🎉 Τέλος κουίζ!</h2>
    <p>Τελικό σκορ: ${score} / ${quiz.length}</p>
  `;
}

loadQuiz();
