// Variables
var currentGame;
var currentGameType;
var playerCurrentWins;
var opponentCurrentWins;
var savedPlayers = [];
var choiceButtons = [];
var simpleButton;
var advancedButton;
var clearBoard;
var storedPlayer;
var storedOpponent;

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
var imageArea = document.querySelector('.boxes-wrap');
var buttonsArea = document.querySelector('.button-hide-container');
var playerInnerWrap = document.querySelector('.player-inner-wrap');
var opponentInnerWrap = document.querySelector('.opponent-inner-wrap');

// Functions
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
    playerInnerWrap.innerHTML = `<h3>${currentGame.player1.name}</h3><h3>${currentGame.player1.token} </h3>
                                    <div class="player-area">
                                    <div>Wins:${currentGame.player1.wins}</div>
                                </div>`;
    opponentInnerWrap.innerHTML = `<h3>${currentGame.player2.name}</h3><h3> ${currentGame.player2.token}</h3>
                                <div class="opponent-area">
                                <div>Wins:${currentGame.player2.wins}</div>
                            </div>`;
    playerSide = document.querySelector('.player-area');
    opponentSide = document.querySelector('.opponent-area');
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
    if (typeof (Storage)) {
        if (sessionStorage.playerData) {
            storedPlayer = JSON.parse(sessionStorage.getItem('playerData'));
            gameObject.player1 = storedPlayer;
        } else { }
        if (sessionStorage.opponentData) {
            storedOpponent = JSON.parse(sessionStorage.getItem('opponentData'));
            gameObject.player2 = storedOpponent;
        }
        else { }
    }
    return gameObject;
}

function makeOpponentChoice() {
    if (currentGame.rpsType === 'advanced') {
        var computerThrow = randomChoiceHelperArray[getRandomIndex(randomChoiceHelperArray)];
        rpsThrow.opponentChoice = computerThrow;
    }
    else {
        var computerThrow = randomChoiceHelperArraySimple[getRandomIndex(randomChoiceHelperArraySimple)];
        rpsThrow.opponentChoice = computerThrow;
    }
    return computerThrow;
}

function setPlayerChoice() {
    rpsThrow.playerChoice = this.title;
    clearTimeout(clearBoard);
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
    buttonsArea.classList.add('hidden');
    imageArea.classList.remove('hidden');
    var playerMatchup = matchupArray[randomChoiceHelperArray.indexOf(rpsThrow.playerChoice)];
    var resolutionVal = playerMatchup[randomChoiceHelperArray.indexOf(rpsThrow.opponentChoice)];
    displayThrow(rpsThrow.playerChoice, rpsThrow.opponentChoice);
    if (!resolutionVal) {
        announcementText.innerText = "Draw!";
    }
    else if (resolutionVal === 1) {
        announcementText.innerText = "YOU WIN!";
        currentGame.player1.wins += 1;
        sideBarDisplay();
    }
    else {
        announcementText.innerText = "You lose...";
        currentGame.player2.wins += 1;
        sideBarDisplay();
    }

    if (typeof (Storage)) {
        sessionStorage.setItem('playerData', JSON.stringify(currentGame.player1));
        sessionStorage.setItem('opponentData', JSON.stringify(currentGame.player2));
    }
    clearBoard = setTimeout(clearGameDisplay, 2000);
}

function clearGameDisplay() {
    playerChoiceImage.innerHTML = ``;
    opponentChoiceImage.innerHTML = ``;
    announcementText.innerText = `Make your choice!`;
    imageArea.classList.add('hidden');
    buttonsArea.classList.remove('hidden');
}