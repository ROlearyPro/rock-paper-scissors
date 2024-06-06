
var currentGame;
var currentGameType;
var playerCurrentWins;
var opponentCurrentWins;
var savedPlayers = [];
var choiceButtons = [];


var currentPlayers = {
    player1: null,
    player2: null,
};
var rpsThrow = {
    playerChoice: null,
    opponentChoice: null
}
var matchupArray = [
    // 0 = draw, 1 = win, 2 = loss
    [0, 2, 1, 1, 2, 0], [1, 0, 2, 0, 1, 2], [2, 1, 0, 2, 0, 1], [2, 0, 1, 0, 1, 2], [1, 2, 0, 2, 0, 1], [0, 1, 2, 1, 2, 0]
]
var randomChoiceHelperArray = ['rock', 'paper', 'scissors', 'lizard', 'alien', 'ufo'];




function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function onLoad() {
    for (var j = 0; j < 6; j++) {
        choiceButtons[j] = document.querySelector(`.rps-button-${j}`);
        choiceButtons[j].isLocked = false;
        choiceButtons[j].addEventListener('click', setPlayerChoice);
    }
    currentPlayers.player1 = createPlayer('You', '🐶', 0);
    currentPlayers.player2 = createPlayer('Computer', '🤖', 0);
    currentGame = createGame(currentPlayers.player1, currentPlayers.player2);
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

function chooseGameType(){

}


function createGame(p1, p2, gameType = 'advanced') {
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
    var playerSide = document.querySelector('.player-area');
    var opponentSide = document.querySelector('.opponent-area');
    playerSide.innerHTML = `<div>Wins:${currentGame.player1.wins}</div>`
    opponentSide.innerHTML = `<div>Wins:${currentGame.player2.wins}</div>`
    
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
        currentGame.player1.wins += 1;
        sideBarDisplay();
    }
    else {
        console.log("You lose...");
        currentGame.player2.wins += 1;
        sideBarDisplay();
    }

}
