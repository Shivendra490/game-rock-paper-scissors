let userScore = 0;
let cpuScore = 0;

let choiceButtons = document.querySelectorAll(".choices");
let uScore = document.querySelector(".user-score");
let cScore = document.querySelector(".computer-score");
let crossButton = document.querySelector(".cross-wrapper");
let gameRules = document.querySelector(".game-rules-container");
let rulesButton = document.querySelector(".rules-btn");
let resultSection = document.querySelector(".result-section");
let winOrLoss = document.querySelector(".win-loss");
let userPicked = document.querySelector("#user-picked");
let pcPicked = document.querySelector("#pc-picked");
let pcPickedImg = document.querySelector(".pc-picked-img");
let userPickedImg = document.querySelector(".user-picked-img");
let playAgainButton = document.querySelector(".play-again-btn");

playAgainButton.addEventListener("click", () => {
  console.log("abc");
  userPicked.className = "circle";
  pcPicked.className = "circle";
  document.querySelector(".controls").classList.remove("hide");
  resultSection.classList.add("hide");
});

rulesButton.addEventListener("click", () => {
  gameRules.classList.remove("hide");
});
crossButton.addEventListener("click", () => {
  gameRules.classList.add("hide");
});

function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * 3);
  return choices[index];
}

function showResult(userChoice, cpuChoice, userWinLoss) {
  uScore.textContent = userScore;
  cScore.textContent = cpuScore;
  userPicked.classList.add(userChoice);
  pcPicked.classList.add(cpuChoice);
  userPickedImg.setAttribute("src", `assets/${userChoice}.svg`);
  pcPickedImg.setAttribute("src", `assets/${cpuChoice}.svg`);
  if (userWinLoss === "WIN") {
    winOrLoss.textContent = "YOU WIN";
    userPicked.classList.add("won-animation");
  }
  if (userWinLoss === "LOSS") {
    winOrLoss.textContent = "YOU LOSS";
    pcPicked.classList.add("won-animation");
  }
  if (userWinLoss === "TIE") {
    winOrLoss.textContent = "TIE UP";
  }

  document.querySelector(".controls").classList.add("hide");
  resultSection.classList.remove("hide");
}

function playGame(userChoice) {
  const cpuChoice = computerChoice();
  let userWinLoss = "";
  console.log("CPU:", cpuChoice, "USER:", userChoice);
  if (cpuChoice === userChoice) {
    console.log("Game Tie");
    userWinLoss = "TIE";
  } else if (cpuChoice === "scissors" && userChoice === "rock") {
    console.log("user win");
    userScore++;
    userWinLoss = "WIN";
  } else if (cpuChoice === "scissors" && userChoice === "paper") {
    console.log("computer win");
    cpuScore++;
    userWinLoss = "LOSS";
  } else if (cpuChoice === "paper" && userChoice === "scissors") {
    console.log("user win");
    userScore++;
    userWinLoss = "WIN";
  } else if (cpuChoice === "paper" && userChoice === "rock") {
    console.log("computer win");
    cpuScore++;
    userWinLoss = "LOSS";
  } else if (cpuChoice === "rock" && userChoice === "scissors") {
    console.log("computer win");
    cpuScore++;
    userWinLoss = "LOSS";
  } else if (cpuChoice === "rock" && userChoice === "paper") {
    console.log("user win");
    userScore++;
    userWinLoss = "WIN";
  }

  showResult(userChoice, cpuChoice, userWinLoss);
}

for (let choiceButton of choiceButtons) {
  choiceButton.addEventListener("click", function (e) {
    const userChoice = choiceButton.textContent.trim();
    console.log("userrrrr choice", userChoice);
    playGame(userChoice);
  });
}
