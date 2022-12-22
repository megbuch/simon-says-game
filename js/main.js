let sequence = [];
let userSequence = [];
let level = 0;

const startButton = document.getElementById("play");
const info = document.getElementById("info");

function getRandomColor() {
  const tiles = ["green", "red", "yellow", "blue"];
  const randomColor = tiles[Math.floor(Math.random() * tiles.length)];
  return randomColor;
}

function levelUp() {
  level = level + 1;
  const newSequence = [...sequence];
  newSequence.push(getRandomColor());
  sequence = [...newSequence];
  playSequence(newSequence);
}

function startGame() {
  startButton.classList.add("hidden");
  info.innerText = "Watch the sequence carefully!";
  level = 0;
  levelUp();
}

startButton.addEventListener("click", startGame);

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.remove("inactive");
  sound.play();

  setTimeout(() => {
    tile.classList.add("inactive");
  }, 500);
}

function playSequence(newSequence) {
  newSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, index * 800);
  });
}
