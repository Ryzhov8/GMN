const refs = {
  startBtn: document.querySelector(".btn--start"),
  form: document.querySelector(".form"),
  formBtn: document.querySelector(".btn--check"),
  num: document.querySelector(".number"),
  message: document.querySelector(".message"),
  stats: document.querySelector(".stats"),
  score: document.querySelector(".score__number"),
  highscore: document.querySelector(".highscore__number"),
};

let randomNumber;
let inputNumber;
let score = 0;
let highscore = 0;
refs.score.textContent = score;
refs.highscore.textContent = score;

refs.startBtn.addEventListener("click", onStartBtnClick);
refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("change", onFormChange);

function onStartBtnClick() {
  randomNumber = getRandomNumber(1, 20);
  refs.message.textContent = "Start guessing...";
  refs.form.elements.number.value = "";
  refs.form.classList.remove("hide");
  refs.stats.classList.remove("hide");
  refs.startBtn.disabled = true;
  refs.formBtn.disabled = false;
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
    correctNumber();
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
  document.body.style.backgroundColor = "red";
  refs.message.classList.add("message--wrong");
}

function correctNumber() {
  refs.message.textContent = "🎉 Corect number!";
  document.body.style.backgroundColor = "green";
  score++;
  updateScore();
  refs.startBtn.disabled = false;
  refs.formBtn.disabled = true;
}

function updateScore() {
  refs.score.textContent = score;

  if (score > highscore) {
    refs.highscore.textContent = score;
  }
}
