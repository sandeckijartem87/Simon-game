const startButton = document.querySelector("#start-button");
const statusText = document.querySelector("#status");
const roundDisplay = document.querySelector("#round-display");
const scoreText = document.querySelector("#score");
const highScoreText = document.querySelector("#high-score");
const pads = document.querySelectorAll(".pad");

const sequence = [];
let playerStep = 0;
let canClick = false;
let score = 0;
let highScore = Number(localStorage.getItem("simonHighScore")) || 0;

highScoreText.textContent = highScore;

function updateScore(newScore) {
  score = newScore;
  scoreText.textContent = score;

  if (score > highScore) {
    highScore = score;
    highScoreText.textContent = highScore;
    localStorage.setItem("simonHighScore", highScore);
  }
}

function randomPad() {
  return Math.floor(Math.random() * pads.length);
}

function flashPad(padNumber) {
  const pad = pads[padNumber];

  pad.classList.add("active");

  setTimeout(function () {
    pad.classList.remove("active");
  }, 500);
}

function startRound() {
  canClick = false;
  playerStep = 0;
  sequence.push(randomPad());

  roundDisplay.textContent = "Round " + sequence.length;
  statusText.textContent = "Watch";

  sequence.forEach(function (padNumber, index) {
    setTimeout(function () {
      flashPad(padNumber);
    }, 700 * (index + 1));
  });

  setTimeout(function () {
    canClick = true;
    statusText.textContent = "Your turn";
  }, 700 * (sequence.length + 1));
}

function startGame() {
  sequence.length = 0;
  updateScore(0);
  startButton.textContent = "Restart";
  startRound();
}

function handlePadClick(event) {
  if (!canClick) {
    return;
  }

  const clickedPad = Number(event.currentTarget.dataset.pad);
  flashPad(clickedPad);

  if (clickedPad === sequence[playerStep]) {
    playerStep++;

    if (playerStep === sequence.length) {
      updateScore(sequence.length);
      statusText.textContent = "Nice!";
      canClick = false;

      setTimeout(startRound, 900);
    }
  } else {
    statusText.textContent = "Oops! Press start to try again.";
    roundDisplay.textContent = "Game over";
    canClick = false;
  }
}

startButton.addEventListener("click", startGame);

pads.forEach(function (pad) {
  pad.addEventListener("click", handlePadClick);
});
