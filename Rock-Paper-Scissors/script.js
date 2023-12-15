let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScoreDisplay = document.querySelector("#user-score");
let compScoreDisplay = document.querySelector("#comp-score");

const genCompChoice = () => {
    let options = ["rock", "paper", "paper"];
    let randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScoreDisplay.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "darkgreen";
    } else {
        compScore++;
        compScoreDisplay.innerText = compScore;
        msg.innerText = `You lose. Your ${userChoice} beaten by ${compChoice}`;
        msg.style.backgroundColor = "darkred";
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw";
    msg.style.backgroundColor = "#081b31";
};

const playGame = (userChoice) => {
    let compChoice = genCompChoice();
    let userWin = true;
    let isDraw = false;

    if (userChoice === compChoice) {
        isDraw = true;
    } else if (userChoice === "rock") {
        // compChoice will be paper or scissors
        userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
        //compChoice will be rock or scissors
        userWin = compChoice === "scissors" ? false : true;
    } else {
        //userChoice is scissors
        //compChoice will be rock or paper
        userWin = compChoice === "rock" ? false : true;
    }

    if (!isDraw) {
        showWinner(userWin, userChoice, compChoice);
    } else {
        showDraw();
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        let userChoiceId = choice.getAttribute("id");
        playGame(userChoiceId);
    });
});
