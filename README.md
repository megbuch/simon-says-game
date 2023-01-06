# simon-says-game

### <b><a href="https://bardirl.github.io/simon-says-game">Play the game here!</a></b> 🟢🔴🔵🟡

<h3>About</h3>
<p>This is my take on the classic game of Simon Says! <em>Beat all 12 levels and brag to your friends.</em></p>
<p>This was my first project intended for General Assembly's Software Engineering Immersive. It is coded in HTML5, CSS3, and vanilla JavaScript. This game primarily showcases my understanding of asynchronous timing as well as DOM manipulation.</p>

<h3>How to Play</h3>
<ul>
  <li>Click "PLAY" button to begin the game.</li>
  <li>The computer sequence will play.</li>
  <li>Once the computer's sequence ends, it is the user's turn. Click the tiles in the order it was displayed.</li>
  <li>If the sequence matches the computer's, you will move to the next round. Each round will add one more tile to the sequence.</li>
</ul>

<h3>Screenshots</h3>
 
![1](https://user-images.githubusercontent.com/115611931/211066390-4d9c82c6-e37e-464e-b869-5aa74adea9c4.png)

![2](https://user-images.githubusercontent.com/115611931/211066718-1107d2e1-0ed9-4728-9100-65e6f1babd9f.png)

![3](https://user-images.githubusercontent.com/115611931/211066830-224ce5b7-0b66-4d7b-95bc-6967a10b760b.png)

<b>Win Screen</b>

![4](https://user-images.githubusercontent.com/115611931/211066876-1bc143b7-fe2f-4089-998f-97bd7b05e9d8.png)

<b>Loss Screen</b>

![5](https://user-images.githubusercontent.com/115611931/211066903-de1048d7-a85a-4d3c-b1e9-6a9b940d5bc7.png)

<h3>User Stories</h3>

1. AAU, I want to click a button to start the game.

```js
  startButton.addEventListener("click", startGame);
  startButton.classList.add("hidden");
  info.innerText = "Watch the sequence carefully!";
  level = 0;
  
```
2. AAU, I want every level up to add one tile to the computer sequence.

```js
  sequence.push(getRandomColor());
  playSequence(sequence);
```

3. AAU, I want a randomly generated computer sequence to play.

```js
  const randomColor = tiles[Math.floor(Math.random() * tiles.length)];
  return randomColor;
```

4. AAU, I want the computer's sequence to illuminate tiles and play a corresponding sound at a timed interval.

```js
  function playSequence(sequence) {
    sequence.forEach((color, index) => {
      setTimeout(() => {
        activateTile(color);
      }, index * 650);
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
```

5. AAU, I want to click the tiles, only when it is my turn.

```js
  function userTurn() {
    board.classList.remove("unclickable");
    info.innerText = "Your turn!";
  }
```

6. AAU, I want my clicks' values be stored.

```js
  board.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;
  if (tile) handleClick(tile);
});

  userSequence.push(tile);
```

7. AAU, If my sequence is wrong at any point, then I want the game to end.

```js
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      reset();
      return;
    }
  }

```

8. AAU, If I enter the correct sequence, then I want to level up. If I have beaten a specific number of rounds, then I want to win the game.

```js
  if (userSequence.length === sequence.length) {
    if (level === 5) {
      winGame();
    } else {
      info.innerText = "You're doing great! Keep it up!";
      setTimeout(levelUp, 1200);
      return;
    }
  }
```

9. AAU, I want to see the screen change upon a win and a loss. I want my high score to be recorded. I also want to be able to replay.

```js
//loss
    const sound = document.querySelector(`[data-sound='game-over']`);
    sound.play();
    
    document.body.style.background = "linear-gradient(to top, #EA8F8F, #C12727)";
    info.innerText = "Game over! 😈 Play again?";
    
//win
    const sound = document.querySelector(`[data-sound='game-win']`);
    sound.play();
    
    document.body.style.background = "linear-gradient(to top, #BEF1CB, #60BC77)";
    info.innerText = "Amazing work! 🤩 You win!";
    
//reset
    sequence = [];
    userSequence = [];
    level = 0;
    
//start button appears, board unclickable
    startButton.classList.remove("hidden");
    board.classList.add("unclickable");
```

10. AAU, I want my high score to be updated and recorded.

```js
    if (highScore < level) {
      highScore = level;
    }
    
    highScoreText.innerText = highScore;
```

