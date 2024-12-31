const colors = ["red", "blue", "green"];
let score = 0;
let timeLeft = 5; // Start with 5 seconds for each round
let difficultyMultiplier = 1.0; // Controls the speed/difficulty
let isGameRunning = true; // To prevent actions after losing

const colorName = document.getElementById("color-name");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const modal = document.getElementById("game-over-modal");
const finalScore = document.getElementById("final-score");
const reasonDisplay = document.getElementById("reason");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");

function startGame() {
  isGameRunning = true; // Reset the game status
  updateColor();
  const timer = setInterval(() => {
    if (!isGameRunning) {
      clearInterval(timer);
      return;
    }
    timeLeft -= 0.1; // Slower decrease for an easier experience
    timerDisplay.textContent = `Time Left: ${timeLeft.toFixed(1)}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame("Time's up! ⏳");
    }
  }, 100); // Update every 100ms for a smoother countdown
}

function updateColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorName.textContent = randomColor.toUpperCase();
  colorName.style.color = randomColor;
}

function endGame(reason) {
  isGameRunning = false; // Stop the game
  finalScore.textContent = score;
  reasonDisplay.textContent = reason;

  // Show the popup for a brief moment
  popupMessage.textContent = reason;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
    modal.classList.add("show");
  }, 1000); // Delay before showing the modal
}

function resetGame() {
  score = 0;
  timeLeft = 5; // Reset time to 5 seconds
  difficultyMultiplier = 1.0; // Reset difficulty multiplier
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  modal.classList.remove("show");
  startGame();
}

document.querySelectorAll(".color-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!isGameRunning) return; // Prevent actions if the game is over
    if (button.id === colorName.textContent.toLowerCase()) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      timeLeft = 5; // Reset timer after correct answer
      updateColor();
    } else {
      endGame("Wrong color clicked! ❌");
    }
  });
});

startGame();
