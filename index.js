let scoresSection = document.querySelector(".scores-section");
let choiceButtons = document.querySelectorAll(".choices");
let userCount = document.querySelector(".user-score");
let cpuCount = document.querySelector(".computer-score");
let crossButton = document.querySelector(".cross-wrapper");
let gameRules = document.querySelector(".game-rules-container");
let rulesButton = document.querySelector(".rules-btn");
let resultSection = document.querySelector(".result-section");
let winOrLoss = document.querySelector(".win-loss");
let userPicked = document.querySelector("#user-picked");
let pcPicked = document.querySelector("#pc-picked");
let pcPickedImg = document.querySelector(".pc-picked-img");
let userPickedImg = document.querySelector(".user-picked-img");
let playAgainButtons = document.querySelectorAll(".play-again-btn");
let nextButton = document.querySelector(".next-btn");
let winnerWrapper = document.querySelector(".winner-wrapper");
let userAnimation = document.querySelector(".user-animation");
let pcAnimation = document.querySelector(".pc-animation");
let againstPC = document.querySelector(".against-pc");

let scores = JSON.parse(localStorage.getItem("RPS_SCORES"));
let userScore = scores?.userScore || 0;
let cpuScore = scores?.cpuScore || 0;
userCount.textContent = userScore;
cpuCount.textContent = cpuScore;

function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * 3);
  return choices[index];
}

nextButton.addEventListener("click", () => {
  winnerWrapper.classList.remove("hide");
  resultSection.classList.add("hide");
  scoresSection.classList.add("hide");
  nextButton.classList.add("hide");
});

rulesButton.addEventListener("click", () => {
  gameRules.classList.remove("hide");
});
crossButton.addEventListener("click", () => {
  gameRules.classList.add("hide");
});
playAgainButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.reload();
  });
});

function showResult(userChoice, cpuChoice, userWinLoss) {
  let playAgainOrReplay = "PLAY AGAIN";
  let againstPcContent = "AGAINST PC";
  let spans = "";
  for (let n = 1; n <= 10; n++) {
    spans += `<span style="--i: ${n}"></span>`;
  }

  userCount.textContent = userScore;
  cpuCount.textContent = cpuScore;
  userPicked.classList.add(userChoice);
  pcPicked.classList.add(cpuChoice);
  userPickedImg.setAttribute("src", `assets/${userChoice}.svg`);
  pcPickedImg.setAttribute("src", `assets/${cpuChoice}.svg`);
  if (userWinLoss === "WIN") {
    nextButton.classList.remove("hide");
    winOrLoss.textContent = "YOU WIN";

    userAnimation.innerHTML += spans;
  }
  if (userWinLoss === "LOSS") {
    winOrLoss.textContent = "YOU LOSS";

    pcAnimation.innerHTML += spans;
  }
  if (userWinLoss === "TIE") {
    winOrLoss.textContent = "TIE UP";
    againstPcContent = "<span>&nbsp;</span>";
    playAgainOrReplay = "REPLAY";
  }
  againstPC.innerHTML = againstPcContent;
  playAgainButtons[0].textContent = playAgainOrReplay;
  let scores = { userScore, cpuScore };
  localStorage.setItem("RPS_SCORES", JSON.stringify(scores));
  document.querySelector(".controls").classList.add("hide");
  resultSection.classList.remove("hide");
}

function playGame(userChoice) {
  const cpuChoice = computerChoice();
  let userWinLoss = "";
  if (cpuChoice === userChoice) {
    userWinLoss = "TIE";
  } else if (
    (cpuChoice === "scissors" && userChoice === "rock") ||
    (cpuChoice === "paper" && userChoice === "scissors") ||
    (cpuChoice === "rock" && userChoice === "paper")
  ) {
    userScore++;
    userWinLoss = "WIN";
  } else {
    cpuScore++;
    userWinLoss = "LOSS";
  }

  showResult(userChoice, cpuChoice, userWinLoss);
}

for (let choiceButton of choiceButtons) {
  choiceButton.addEventListener("click", (e) => {
    const userChoice = choiceButton.textContent.trim();
    playGame(userChoice);
  });
}
