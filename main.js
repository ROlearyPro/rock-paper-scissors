var rpsThrow = {
    playerChoice: null,
    opponentChoice: null
}

var randomChoiceHelperArray = ['rock', 'paper', 'scissors', 'lizard', 'alien', 'ufo'];

var currentGameType;
var playerCurrentWins;
var opponentCurrentWins;

var savedPlayers = [];
var currentPlayers = {
    player1: null,
    player2: null,
};
choiceButtons = [];


matchupArray = [
    // 0 = draw, 1 = win, 2 = loss
    [0, 2, 1, 1, 2, 0], [1, 0, 2, 0, 1, 2], [2, 1, 0, 2, 0, 1], [2, 0, 1, 0, 1, 2], [1, 2, 0, 2, 0, 1], [0, 1, 2, 1, 2, 0]
]




function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function onLoad() {
    for (var j = 0; j < 6; j++) {
        choiceButtons[j] = document.querySelector(`.rps-button-${j}`);
        choiceButtons[j].isLocked = false;
        choiceButtons[j].addEventListener('click', setPlayerChoice);
    }
}
onLoad();

function createPlayer(playerName = 'human', playerToken = '👩🏻', playerWins = 0) {
    var player =
    {
        name: playerName,
        token: playerToken,
        wins: playerWins
    }
    return player;
}


function createGame(p1, p2, gameType) {
    gameObject =
    {
        player1: p1,
        player2: p2,
        rpsType: gameType,
        currentThrows: rpsThrow,
    }
    return gameObject;
}

function makeOpponentChoice() {
    var computerThrow = randomChoiceHelperArray[getRandomIndex(randomChoiceHelperArray)];
    console.log(computerThrow);
    rpsThrow.opponentChoice = computerThrow;
    return computerThrow;
}
function setPlayerChoice() {
    // console.log(this.title);
    // if (this.classList.contains('rock')){

    // }
    rpsThrow.playerChoice = this.title;
    makeOpponentChoice();
    resolveThrow();
}
function sideBarDisplay() {

}

function resolveThrow() {
    var playerMatchup = matchupArray[randomChoiceHelperArray.indexOf(rpsThrow.playerChoice)];
    var resolutionVal = playerMatchup[randomChoiceHelperArray.indexOf(rpsThrow.opponentChoice)];
    console.log(rpsThrow.playerChoice+ " vs. " + rpsThrow.opponentChoice + "...")

    if (!resolutionVal) {
        console.log("Draw!");
    }
    else if (resolutionVal === 1) {
        console.log("YOU WIN!");
    }
    else {
        console.log("You lose...");
    }

}
