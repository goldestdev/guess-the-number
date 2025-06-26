"use strict";
const guessInputEl = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const guessCount = document.getElementById("guessCount");
const restartButton = document.getElementById("restartButton");
const gameContainer = document.querySelector(".game-container");
const thinkingMessage = document.getElementById("thinkingMessage");
let count = 0;
const max = 100;
const min = 1;
thinkingMessage.textContent = `1 and ${max}`;
let randomNumber = Math.trunc(Math.random() * max) + 1;
// event listener for guess button
const gameLogic = function () {
  const guessValue = Number(guessInputEl.value);
  //  check for no input, zero, negative number and greater than max
  if (guessValue > max || guessValue < min) {
    message.textContent = `Enter number between 1 and ${max}`;
  }
  //  check if the guess is correct, too high and too low
  // input type has sent to number in html and empty string will converted which is already covered below
  if (guessValue === randomNumber) {
    message.textContent = "Correct. you win!";
    gameContainer.classList.add("win");
    guessButton.disabled = true;
    guessInputEl.disabled = true;
  } else if (guessValue > randomNumber && guessValue <= max) {
    message.textContent = "Too high";
  } else if (guessValue < randomNumber && guessValue >= min) {
    message.textContent = "Too Low";
  }
  //  store number of guesses
  if (guessValue !== randomNumber && guessValue <= max && guessValue >= min) {
    count++;
    guessCount.textContent = count;
  }
  // lose game condition
  if (count >= 10) {
    message.textContent = `Game Over, you suck brother. The number was ${randomNumber}`;
    guessButton.disabled = true;
    guessInputEl.disabled = true;
    gameContainer.classList.add("lose");
  }
  console.log(randomNumber);
};
guessButton.addEventListener("click", gameLogic);

// reset the game
const resetGame = function () {
  guessButton.disabled = false;
  guessInputEl.disabled = false;
  gameContainer.classList.remove("win", "lose");
  randomNumber = Math.trunc(Math.random() * max) + 1;
  guessInputEl.value = "";
  message.textContent = "";
  count = 0;
  guessCount.textContent = count;
};
restartButton.addEventListener("click", resetGame);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    gameLogic();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    resetGame();
  }
});
