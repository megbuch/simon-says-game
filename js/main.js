let sequence = [];
let userSequence = [];
let level;

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

// starts the game.
function startGame() {
  startButton.classList.add("hidden");
  info.innerText = "Watch the sequence carefully!";
  level = 0;
  document.body.style.background =
    "linear-gradient(to top, #87b7ff, #6f7cf5) no-repeat";
  levelUp();
}

// increments level++ and pushes new random color to sequence array.
function levelUp() {
  level = level + 1;
  userSequence = [];
  board.classList.add("unclickable");
  info.innerText = "Watch the sequence!";
  levelText.innerText = `${level}`;

  const newSequence = [...sequence]; //copies sequence to newSequence
  newSequence.push(getRandomColor()); //pushes new color to newSequence
  sequence = [...newSequence]; //resets global sequence
  playSequence(sequence);

  setTimeout(() => {
    userTurn();
  }, level * 800 + 700);
}

// returns a random color from the tiles array.
function getRandomColor() {
  const randomColor = tiles[Math.floor(Math.random() * tiles.length)];
  return randomColor;
}

// iterates through the sequence array with a timer to delay the iteration of the next index.
function playSequence(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, index * 800);
  });
}

// selects tile element and makes the tile illuminate on a timer by removing/adding '.inactive' class. selects the sound element and plays the sound on a timer.
function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.remove("inactive");
  sound.play();

  setTimeout(() => {
    tile.classList.add("inactive");
  }, 500);
}

// allows the user to click the board.
function userTurn() {
  board.classList.remove("unclickable");
  info.innerText = "Your turn!";
}

// pushes clicked tile to user sequence, plays sound when clicked, checks clicks against game sequence.
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
    if (level === 20) {
      winGame();
    } else {
      info.innerText = "You're doing great! Keep it up!";
      setTimeout(levelUp, 1200);
      return;
    }
  }
}

// resets the game if loss.
function reset() {
  const sound = document.querySelector(`[data-sound='game-over']`);
  sound.play();
  sequence = [];
  userSequence = [];
  level = 0;

  startButton.classList.remove("hidden");
  board.classList.add("unclickable");

  document.body.style.background =
    "linear-gradient(to top, #EA8F8F, #C12727) no-repeat";
  info.innerText = "Game over! 😈 Play again?";
}

//resets the game if win.
function winGame() {
  const sound = document.querySelector(`[data-sound='game-win']`);
  sound.play();
  sequence = [];
  userSequence = [];
  level = 0;

  startButton.classList.remove("hidden");
  board.classList.add("unclickable");

  document.body.style.background =
    "linear-gradient(to top, #95EFAC, #34DB5E) no-repeat";
  info.innerText = "Amazing work! 🤩 You win!";
}
