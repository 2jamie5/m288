// Referenzen auf HTML-Elemente holen
const buttons = document.querySelectorAll(".buttons button");
const playerChoiceText = document.getElementById("player-choice");
const computerChoiceText = document.getElementById("computer-choice");
const roundResultText = document.getElementById("round-result");

const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const drawScoreSpan = document.getElementById("draw-score");
const resetBtn = document.getElementById("reset-btn");

// Punktestand
let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

// Zufallswahl des Computers
function getComputerChoice() {
  const choices = ["stein", "papier", "schere"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Ermittelt das Ergebnis einer Runde
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  // Text aktualisieren
  playerChoiceText.textContent = "Du hast gewählt: " + formatChoice(playerChoice);
  computerChoiceText.textContent = "Computer hat gewählt: " + formatChoice(computerChoice);

  let result = "";

  if (playerChoice === computerChoice) {
    result = "Unentschieden!";
    drawScore++;
  } else if (
    (playerChoice === "stein" && computerChoice === "schere") ||
    (playerChoice === "papier" && computerChoice === "stein") ||
    (playerChoice === "schere" && computerChoice === "papier")
  ) {
    result = "Du hast diese Runde gewonnen!";
    playerScore++;
  } else {
    result = "Du hast diese Runde verloren.";
    computerScore++;
  }

  roundResultText.textContent = result;
  updateScoreboard();
}

// Zeigt den Score im HTML an
function updateScoreboard() {
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  drawScoreSpan.textContent = drawScore;
}

// Hilfsfunktion fuer schoenere Anzeige
function formatChoice(choice) {
  if (choice === "stein") return "Stein";
  if (choice === "papier") return "Papier";
  if (choice === "schere") return "Schere";
}

// Event Listener fuer Buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    playRound(playerChoice);
  });
});

// Reset Button
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
  updateScoreboard();
  playerChoiceText.textContent = "Du hast noch nichts gewaehlt.";
  computerChoiceText.textContent = "Computer hat noch nichts gewaehlt.";
  roundResultText.textContent = "Starte das Spiel mit einer Wahl.";
});
