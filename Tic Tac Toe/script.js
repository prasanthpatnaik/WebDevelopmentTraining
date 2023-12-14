let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let winMsgContainer = document.querySelector(".msg-container");
let winMsg = document.querySelector("#msg");
let clickCount = 0;

let turnO = true;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
  }
};

const showWinner = (winner) => {
  winMsg.innerText = `Player ${winner} wins!`;
  winMsgContainer.classList.remove("hide");
  disableBoxes();
};

const checkDrawCondition = (clickCount) => {
  if(clickCount === 9) {
    winMsg.innerText = `It's a draw! Better luck next time`;
    winMsgContainer.classList.remove("hide");
    for (box of boxes) {
      box.classList.add("draw-game");
      box.disabled = true;
    }
    clickCount = 0;
  }
};

const checkWinner = (clickCount) => {
  let gotWinner = false;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos1Val === pos3Val) {
        for(let i = 0; i<3; i++){
          boxes[pattern[i]].classList.add("winning-line");
        }
        gotWinner = true;
        showWinner(pos1Val);
      }
    }
  }
  if(!(gotWinner)) {
    checkDrawCondition(clickCount);
  }
};

const resetGame = () => {
  for (let box of boxes) {
    box.innerText = "";
    box.classList.remove("winning-line");
    box.classList.remove("draw-game");
  }
  clickCount = 0;
  enableBoxes();
  turnO = true;
  winMsgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "rgb(0, 100, 255)";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "rgb(255, 170, 0)";
      turnO = true;
    }
    clickCount++;
    box.disabled = true;
    checkWinner(clickCount);
  });
});

resetBtn.addEventListener("click", () => resetGame());

newGameBtn.addEventListener("click", () => resetGame());
