let sequence = [];
let userSequence = [];
let level;
let win;

const board = document.querySelector(".board");
const startButton = document.getElementById("play");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");
let info = document.getElementById("info");

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
  levelUp();
}

// increments level++ and pushes new random color to sequence array.
function levelUp() {
  level = level + 1;
  board.classList.add("unclickable");
  info.innerText = "Watch the sequence!";

  const newSequence = [...sequence]; //copies sequence to newSequence
  newSequence.push(getRandomColor()); //pushes new color to newSequence
  sequence = [...newSequence]; //resets global sequence
  playSequence(sequence);

  setTimeout(() => {
    userTurn();
  }, level * 800 + 900);
}

// returns a random color from the tiles array.
function getRandomColor() {
  const tiles = ["green", "red", "yellow", "blue"];
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

function userTurn() {
  board.classList.remove("unclickable");
  info.innerText = "Your turn!";
}

function handleClick(tile) {
  const index = userSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  for (let i = 0; i < sequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      console.log("game over");
    }
  }

  if (userSequence.length === sequence.length) {
    levelUp(); //levelUp() firing after fist user click.. bad bad bad
  }
}
