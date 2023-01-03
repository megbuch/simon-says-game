let sequence = [];
let userSequence = [];
let level;
let win;
let correct;

const board = document.querySelector(".board");
const startButton = document.getElementById("play");
const info = document.getElementById("info");
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
  levelUp();
}

// increments level++ and pushes new random color to sequence array.
function levelUp() {
  level = level + 1;
  userSequence = [];
  board.classList.add("unclickable");
  info.innerText = "Watch the sequence!";

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

// pushes the value of the clicked tile to userSequence array, plays sound of tile when clicked.
function handleClick(tile) {
  userSequence.push(tile);
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();
  if (userSequence.length === sequence.length) {
    checkSequence();
  }
}

//checks the user's sequence against simon's sequence.
function checkSequence() {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      console.log("game over");
      //attempt 1: would levelUp exponentially, because it was in the for loop.
      // } else {
      //   setTimeout(levelUp, 1200);
      // }
    }
  }
  setTimeout(levelUp, 1200); //attempt 2: levelUp invokes regardless of game over.. need to fix.
}
