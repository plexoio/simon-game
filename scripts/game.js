let game = {
    score: 0,
    currentGame: [],
    turnNumber: 0,
    playerMoves: [],
    lastButton: "",
    computerInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
}

/**
 * Starts a new game by resetting the game state and setting up event listeners.
 */
function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    game.lastButton = "";

    for (let circle of document.getElementsByClassName('circle')) {
        if (circle.getAttribute('data-listener') != 'true') {
            circle.addEventListener('click', (e) => {
                if (game.currentGame.length > 0 && !game.computerInProgress) {
                    let move = e.target.getAttribute('id');
                    game.lastButton = move; // Just for testing "&& !game.computerInProgress"
                    lightOn(move);
                    game.playerMoves.push(move); // to the game.playerMoves array
                    playerMove();
                };
            });
            circle.setAttribute('data-listener', 'true');
        };
    };

    addScore();
    addTurn();
}

/**
 * Adds a new turn to the game sequence.
 */
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]); // result of expression is the Index
    showCurrentGame();
}

/**
 * Updates the displayed score.
 */
function addScore() {
    document.getElementById('score').innerText = game.score;
}

/**
 * Lights up a button by adding a CSS class and removes it after a delay.
 * @param {string} curr - The ID of the button to be lit up.
 */
function lightOn(curr) {
    document.getElementById(curr).classList.add('light');
    setTimeout(() => {
        document.getElementById(curr).classList.remove('light');
    }, 400);
}

/**
 * Shows the current game sequence by lighting up the buttons in order.
 * - Iterates through the game sequence and triggers lightOn() for each element.
 * - Stops the iteration when all elements have been displayed.
 */
function showCurrentGame() {
    game.computerInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.computerInProgress = false;
        }

    }, 800);
}

/**
 * Handles the player's move and checks if it matches the game sequence.
 */
function playerMove() {
    let getSameIndexNumber = game.playerMoves.length - 1; // get last element - 2 , - 3 possible
    if (game.currentGame[getSameIndexNumber] === game.playerMoves[getSameIndexNumber]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            addScore();
            addTurn();
        }
    } else {
        alert('Wrong Move!')
        newGame();
    }
}

module.exports = { game, newGame, addScore, addTurn, lightOn, showCurrentGame, playerMove };