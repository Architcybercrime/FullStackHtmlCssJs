const choices = ["Paththarr", "Kaagaz", "Kenchiiii"];
const speeds = {
    easy: 1500,
    medium: 900,
    hard: 350
};
const statusMessage = document.querySelector("#status");
const resultMessage = document.querySelector("#result");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const choiceButtons = document.querySelectorAll("[data-choice]");
const difficultyButtons = document.querySelectorAll("[data-level]");

let selectedSpeed = "medium";
let playerWins = 0;
let computerWins = 0;
let roundInProgress = false;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playerWon(player, computer) {
    return (
        (player === "Paththarr" && computer === "Kenchiiii") ||
        (player === "Kaagaz" && computer === "Paththarr") ||
        (player === "Kenchiiii" && computer === "Kaagaz")
    );
}

function setChoiceButtonsDisabled(disabled) {
    choiceButtons.forEach((button) => {
        button.disabled = disabled;
    });
}

function playRound(player) {
    if (roundInProgress || !choices.includes(player)) {
        return;
    }

    roundInProgress = true;
    setChoiceButtonsDisabled(true);
    resultMessage.textContent = "";
    statusMessage.textContent = `Computer is choosing... (${selectedSpeed})`;

    window.setTimeout(() => {
        const computer = getComputerChoice();

        if (player === computer) {
            resultMessage.textContent = `Both chose ${computer}. It's a tie!`;
        } else if (playerWon(player, computer)) {
            playerWins += 1;
            resultMessage.textContent = `You win! The computer chose ${computer}.`;
        } else {
            computerWins += 1;
            resultMessage.textContent = `Computer wins! It chose ${computer}.`;
        }

        playerScore.textContent = playerWins;
        computerScore.textContent = computerWins;
        statusMessage.textContent = "Choose your move.";
        roundInProgress = false;
        setChoiceButtonsDisabled(false);
    }, speeds[selectedSpeed]);
}

difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (roundInProgress) {
            return;
        }

        selectedSpeed = button.dataset.level;
        difficultyButtons.forEach((levelButton) => {
            levelButton.classList.toggle("active", levelButton === button);
        });
        statusMessage.textContent = `${button.textContent} speed selected. Choose your move.`;
    });
});

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => playRound(button.dataset.choice));
});
