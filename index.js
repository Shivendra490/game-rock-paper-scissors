let scoresSection = document.querySelector(".scores-section");
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
let playAgainButtons = document.querySelectorAll(".play-again-btn");
let nextButton = document.querySelector(".next-btn");
let winnerWrapper = document.querySelector(".winner-wrapper");
let userAnimation = document.querySelector(".user-animation");
let pcAnimation = document.querySelector(".pc-animation");


let scores = JSON.parse(localStorage.getItem("SCORES"));
let userScore = scores?.userScore || 0;
let cpuScore = scores?.cpuScore || 0;
uScore.textContent = userScore;
cScore.textContent = cpuScore;

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

// playAgainButtons[1].addEventListener("click", () => {
//   console.log("abc");
//   userPicked.className = "circle";
//   pcPicked.className = "circle";
//   nextButton.classList.add('hide')
//   document.querySelector(".controls").classList.remove("hide");
//   resultSection.classList.add("hide");
// });

playAgainButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("abc");
    location.reload();
    // userPicked.className = "circle";
    // pcPicked.className = "circle";
    // nextButton.classList.add('hide')
    // // userAnimation.innerHTML=userOld
    // // pcAnimation.innerHTML=pcOld;
    // document.querySelector(".controls").classList.remove("hide");
    // resultSection.classList.add("hide");
  });
});

rulesButton.addEventListener("click", () => {
  gameRules.classList.remove("hide");
});
crossButton.addEventListener("click", () => {
  gameRules.classList.add("hide");
});

function showResult(userChoice, cpuChoice, userWinLoss) {
  let spans = "";
  for (let n = 1; n <= 10; n++) {
    spans += `<span style="--i: ${n}"></span>`;
  }

  uScore.textContent = userScore;
  cScore.textContent = cpuScore;
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
    document.querySelector(".against-pc").innerHTML = "<span>&nbsp;</span>";
    playAgainButtons[0].textContent = "REPLAY";
  }
  let scores = { userScore, cpuScore };
  localStorage.setItem("SCORES", JSON.stringify(scores));
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
