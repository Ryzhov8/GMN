const refs = {
  startBtn: document.querySelector(".btn--start"),
  form: document.querySelector(".form"),
  formBtn: document.querySelector(".btn--check"),
  num: document.querySelector(".number"),
  message: document.querySelector(".message"),
  stats: document.querySelector(".stats"),
  score: document.querySelector(".score"),
  highscore: document.querySelector(".highscore"),
  lives: document.querySelector(".lives"),
};

let randomNumber;
let inputNumber;

let score = 0;
let highscore = localStorage.getItem("highscore");
updateScore();

let lives;

refs.startBtn.addEventListener("click", onStartBtnClick);
refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("change", onFormChange);

function onStartBtnClick() {
  lives = 5;
  updateLives();
  refs.num.textContent = "?";
  randomNumber = getRandomNumber(1, 20);
  document.body.style.backgroundColor = "#222";
  refs.message.textContent = "Start guessing...";
  refs.form.elements.number.value = "";
  refs.form.classList.remove("hide");
  refs.stats.classList.remove("hide");
  toggleBtns();
}

function onFormChange() {
  refs.message.classList.remove("message--wrong");
}

function onFormSubmit(e) {
  e.preventDefault();
  inputNumber = Number(e.target.elements.number.value);
  if (!inputNumber) {
    refs.message.textContent = "Please, input the number";
    refs.message.classList.add("message--wrong");
  } else if (inputNumber === randomNumber) {
    win();
  } else {
    wrongNumber();
  }
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function wrongNumber() {
  refs.message.textContent =
    inputNumber < randomNumber ? "📉 Too small!" : "📈 Too big!";
  refs.message.classList.add("message--wrong");
  lives--;
  updateLives();
}

function win() {
  document.body.style.backgroundColor = " #60b347";
  refs.message.textContent = "🎉 Corect number!";
  refs.num.textContent = randomNumber;
  score++;
  updateScore();
  toggleBtns();
}

function loss() {
  document.body.style.backgroundColor = "#e03131";
  refs.message.textContent = "Sorry, you lost... Try again!";
  score = 0;
  updateScore();
  toggleBtns();
}

function updateScore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", score);
  }
  refs.score.textContent = score;
  refs.highscore.textContent = highscore;
}

function updateLives() {
  refs.lives.textContent = "🤍".repeat(lives).concat("💔".repeat(5 - lives));
  if (lives === 0) {
    loss();
  }
}

function toggleBtns() {
  refs.startBtn.disabled = !refs.startBtn.disabled;
  refs.formBtn.disabled = !refs.formBtn.disabled;
}
