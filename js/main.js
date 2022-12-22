let sequence = [];
let userSequence = [];
let level = 0;

const startButton = document.getElementById("play");
const green = document.querySelector("green-default");
const red = document.querySelector("red-default");
const yellow = document.querySelector("yellow-default");
const blue = document.querySelector("blue-default");

// 1 green, 2 red, 3 yellow, 4 blue
const tiles = [1, 2, 3, 4];

function getRandomNum() {
  const randomNum = Math.floor(Math.random() * 4 + 1);
  return randomNum;
}

function levelUp() {
  level = level + 1;
  const newSequence = [...sequence];
  newSequence.push(getRandomNum());
  sequence = [...newSequence];
}
