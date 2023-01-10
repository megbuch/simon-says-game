const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let sequence = [];
let userSequence = [];
let level;
let highScore = 0;

const board = document.querySelector(".board");
const startButton = document.getElementById("play");
const info = document.getElementById("info");
const highScoreText = document.getElementById("high-score");
const levelText = document.getElementById("level");

const tiles = ["green", "red", "yellow", "blue"];

startButton.addEventListener("click", startGame);
board.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;
  if (tile) handleClick(tile);
});

function startGame() {
  startButton.classList.add("hidden");
  info.innerText = "Watch the sequence carefully!";
  level = 0;
  document.body.style.background = "linear-gradient(to top, #87b7ff, #6f7cf5)";
  levelUp();
}

function levelUp() {
  level = level + 1;
  userSequence = [];
  board.classList.add("unclickable");
  info.innerText = "Watch the sequence!";
  levelText.innerText = level;

  sequence.push(getRandomColor());
  playSequence(sequence);

  setTimeout(() => {
    userTurn();
  }, level * 700 + 200);
}

function getRandomColor() {
  const randomColor = tiles[Math.floor(Math.random() * tiles.length)];
  return randomColor;
}

function playSequence(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, index * 700);
  });
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.remove("inactive");
  sound.play();

  setTimeout(() => {
    tile.classList.add("inactive");
  }, 300);
}

function userTurn() {
  board.classList.remove("unclickable");
  info.innerText = "Your turn!";
}

function handleClick(tile) {
  userSequence.push(tile);
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      reset();
      return;
    }
  }

  if (userSequence.length === sequence.length) {
    if (level === 12) {
      winGame();
    } else {
      info.innerText = "You're doing great! Keep it up!";
      setTimeout(levelUp, 1300);
      return;
    }
  }
}

function reset() {
  const sound = document.querySelector(`[data-sound='game-over']`);
  sound.play();

  if (highScore < level) {
    highScore = level;
  }

  sequence = [];
  userSequence = [];
  level = 0;

  startButton.classList.remove("hidden");
  board.classList.add("unclickable");

  document.body.style.background = "linear-gradient(to top, #EA8F8F, #C12727)";
  info.innerText = "Game over! 😈 Play again?";
  highScoreText.innerText = highScore;
}

function winGame() {
  const sound = document.querySelector(`[data-sound='game-win']`);
  sound.play();

  if (highScore < level) {
    highScore = level;
  }

  sequence = [];
  userSequence = [];
  level = 0;

  startButton.classList.remove("hidden");
  board.classList.add("unclickable");

  document.body.style.background = "linear-gradient(to top, #BEF1CB, #60BC77)";
  info.innerText = "Amazing work! 🤩 You win!";
  highScoreText.innerText = highScore;
}
