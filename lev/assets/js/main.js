// DOM elements
const numContainer = document.getElementById("num-display");
const submitBtn = document.getElementById("enter-btn");
const input = document.getElementById("answer-input");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const timerContainer = document.getElementById("timer");
const scoreContainer = document.getElementById("score");

const correctSound = new Audio("assets/snd/ding.wav");
const incorrectSound = new Audio("assets/snd/wrong.wav");
const timesUpSound = new Audio("timesup.wav");

let currentScore = 0;
let secs = 10;
let secondsDisplay = document.getElementById("seconds-display");
secondsDisplay.textContent = `${secs}`;
const addPoint = () => (currentScore += 1);

const table2x2 = () => {
  let arr = [];
  for (i = 2; i <= 9; i++) {
    for (j = 1; j <= 9; j++) {
      arr.push([i, j]);
    }
  }
  return arr.sort(() => Math.random() - 0.5);
}

let arrnums = table2x2();

const a = () => generateNum(0, 12);
const b = () => generateNum(0, 12);

//Store numbers from current question
let getNumsFromQuestion = [];


//Timer function
function interval() {
  setInterval(() => {
    secs--;
    if (secs >= 0) {
      secondsDisplay.textContent = `${secs}`;
    } else {
      clearInterval();
      numContainer.innerHTML = `Вермя вышло!<br>Очки: ${currentScore}`;
      numContainer.style.fontSize =
        '2em';
      numContainer.style.paddingTop = '40px';
    }
  }, 1000);
}

//Hide start button and display question
startBtn.addEventListener("click", function () {
  scoreContainer.textContent = `Очки: ${currentScore}`;
  startBtn.display = "hidden";
  interval();
  displayQuestion();
});

//Display question using generated numbers 
function displayQuestion() {
  let popnum = arrnums.pop();
  if (popnum === undefined) {
    clearInterval();
    secs = 99;
    numContainer.innerHTML = `Игра окончена!<br>Ты набрал :<br> ${currentScore} из 72`;
    numContainer.style.fontSize =
      '2.2em';
    numContainer.style.paddingTop = '40px';
  }
  let num1 = popnum[0];
  let num2 = popnum[1];
  let nums = `${num1} x ${num2}`;
  getNumsFromQuestion.push(num1, num2);
  return (numContainer.textContent = nums);
}

//Assess user answer, play corresponding sound and update score
function result() {
  let userAnswer = document.getElementById("answer-input").value;
  if (
    parseInt(userAnswer) ===
    getNumsFromQuestion[0] * getNumsFromQuestion[1]
  ) {
    correctSound.play();
    addPoint();
    scoreContainer.textContent = `Очки: ${currentScore}`;
  } else {
    incorrectSound.play();
  }
}

//Restart button event - Reset timer and score
restartBtn.addEventListener("click", function () {
  numContainer.style.fontSize =
    '3.5em';
  secs = 10;
  secondsDisplay.textContent = `${secs}`;
  currentScore = 0;
  scoreContainer.textContent = `Очки: ${currentScore}`;
  arrnums = [];
  arrnums = table2x2();
  clearInterval();
  displayQuestion();
});


//Enter key event - Accept user input and empty imput value for next question
input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    alert('asd');
    result();
    getNumsFromQuestion = []; //reset array
    input.value = '';
    secs = 11;
    if (secs < 1) {
      correctSound.pause();
      incorrectSound.pause();
      return;
    }
    return displayQuestion();
  }
});

//Click event - Accept user input and empty imput value for next question
submitBtn.addEventListener("click", function () {
  result();
  getNumsFromQuestion = []; //reset array
  input.value = '';
  if (secs < 1) {
    correctSound.pause();
    incorrectSound.pause();
    return;
  }
  return displayQuestion();
});