
var currentGame;
var currentGameType;
var playerCurrentWins;
var opponentCurrentWins;
var savedPlayers = [];
var choiceButtons = [];
var simpleButton;
var advancedButton;

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
var randomChoiceHelperArraySimple = ['rock', 'paper', 'scissors'];

var startPage = document.querySelector('.start-page');
var gamePage = document.querySelector('.game-page');
var playerSide = document.querySelector('.player-area');
var opponentSide = document.querySelector('.opponent-area');
var playerChoiceImage = document.querySelector('.image-box1');
var opponentChoiceImage = document.querySelector('.image-box2');
var announcementText = document.querySelector('.announcement');



function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function onLoad() {

    for (var j = 0; j < 6; j++) {
        choiceButtons[j] = document.querySelector(`.rps-button-${j}`);
        choiceButtons[j].isLocked = false;
        choiceButtons[j].addEventListener('click', setPlayerChoice);
    }
    simpleButton = document.querySelector('.classic-rps');
    simpleButton.gameTypeChosen = 'simple';
    simpleButton.addEventListener('click', chooseGameType);

    advancedButton = document.querySelector('.advanced-rps');
    advancedButton.gameTypeChosen = 'advanced';
    advancedButton.addEventListener('click', chooseGameType);
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

function chooseGameType() {
    if (this.gameTypeChosen === 'advanced') {
        currentPlayers.player1 = createPlayer('You', '🐶', 0);
        currentPlayers.player2 = createPlayer('Computer', '🤖', 0);
        currentGame = createGame(currentPlayers.player1, currentPlayers.player2);
    }
    else {
        currentPlayers.player1 = createPlayer('You', '🐶', 0);
        currentPlayers.player2 = createPlayer('Computer', '🤖', 0);
        currentGame = createGame(currentPlayers.player1, currentPlayers.player2, 'simple');
        for (var i = 3; i < 6; i++) {
            choiceButtons[i].classList.add('hidden');
        }
    }
    startPage.classList.add('hidden');
    gamePage.classList.remove('hidden');

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
    if (currentGame.rpsType === 'advanced') {
        var computerThrow = randomChoiceHelperArray[getRandomIndex(randomChoiceHelperArray)];
        console.log(computerThrow);
        rpsThrow.opponentChoice = computerThrow;
    }
    else {
        var computerThrow = randomChoiceHelperArraySimple[getRandomIndex(randomChoiceHelperArraySimple)];
        console.log(computerThrow);
        rpsThrow.opponentChoice = computerThrow;
    }
    return computerThrow;
}
function setPlayerChoice() {
    rpsThrow.playerChoice = this.title;
    makeOpponentChoice();
    resolveThrow();
}

function sideBarDisplay() {
    playerSide.innerHTML = `<div>Wins:${currentGame.player1.wins}</div>`
    opponentSide.innerHTML = `<div>Wins:${currentGame.player2.wins}</div>`

}
function displayThrow(p1Choice, p2Choice) {
    var thrownImageArray = ['', ''];
    var tempArray = [p1Choice, p2Choice];
    for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === 'rock') {
            thrownImageArray[i] = 'assets/happy-rocks.png';
        }
        else if (tempArray[i] === 'paper') {
            thrownImageArray[i] = 'assets/happy-paper.png';
        }
        else if (tempArray[i] === 'scissors') {
            thrownImageArray[i] = 'assets/happy-scissors.png';
        }
        else if (tempArray[i] === 'lizard') {
            thrownImageArray[i] = 'assets/flat-lizard.png';
        }
        else if (tempArray[i] === 'alien') {
            thrownImageArray[i] = 'assets/happy-alien.png';
        }
        else {
            thrownImageArray[i] = 'assets/ufo.png';
        }
    }
    playerChoiceImage.innerHTML = `<img src=${thrownImageArray[0]} alt="player 1 image">`
    opponentChoiceImage.innerHTML = `<img src=${thrownImageArray[1]} alt="player 2 image">`

}

function resolveThrow() {
    var playerMatchup = matchupArray[randomChoiceHelperArray.indexOf(rpsThrow.playerChoice)];
    var resolutionVal = playerMatchup[randomChoiceHelperArray.indexOf(rpsThrow.opponentChoice)];
    console.log(rpsThrow.playerChoice + " VS " + rpsThrow.opponentChoice + "...")
    displayThrow(rpsThrow.playerChoice, rpsThrow.opponentChoice);
    if (!resolutionVal) {
        console.log("Draw!");
        announcementText.innerText = "Draw!";
    }
    else if (resolutionVal === 1) {
        console.log("YOU WIN!");
        announcementText.innerText = "YOU WIN!";

        currentGame.player1.wins += 1;
        sideBarDisplay();
    }
    else {
        console.log("You lose...");
        announcementText.innerText = "You lose...";

        currentGame.player2.wins += 1;
        sideBarDisplay();
    }

}
