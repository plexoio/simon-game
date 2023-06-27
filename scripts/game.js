let game = {
    score: 0,
    currentGame: [],
    turnNumber: 0,
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];

    for (let circle of document.getElementsByClassName('circle')) {
        if (circle.getAttribute('data-listener') != 'true') {
            circle.addEventListener('click', (e) => {
                let move = e.target.getAttribute('id');
                lightOn(move);
                game.playerMoves.push(move); // to the array
                playerMove();
            })
            circle.setAttribute('data-listener', 'true');
        }
    }
    
    addScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]); // result of expression is the Index
    showCurrentGame();
}

function addScore() {
    document.getElementById('score').innerText = game.score;
}

function lightOn(curr) {
    document.getElementById(curr).classList.add('light');
    setTimeout(() => {
        document.getElementById(curr).classList.remove('light');
    }, 400);
}

/**
 * 1) Setting interval (iterative).
 * 
 * 2) Turning lights on by incrementing 'game.turnNumber' for the array.
 * 
 * 3) Turning off the interval if the condition is met. 
 * 
 * Insight: 'let turns = setInterval(() => { ... }, 800);
 * 
 * Defines a setInterval function that executes a callback function repeatedly at a specified interval 
 * of 800 milliseconds. The interval is stored in the turns variable, which allows 
 * the interval to be cleared later.'
 * 
 * => THIS FUNCTION WILL LIGHT UP THE GAME PLAY INCREMENT (DIFFICULTY)
 */

function showCurrentGame() {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }

    }, 800);
}

function playerMove() {
    let getSameIndexNumber = game.playerMoves.length - 1; // get last element - 2 , - 3 possible
    if (game.currentGame[getSameIndexNumber] === game.playerMoves[getSameIndexNumber]) {
        if (game.currentGame.length == game.playerMoves.length){
            game.score++;
            addScore();
            addTurn();
        }
    }
}

module.exports = { game, newGame, addScore, addTurn, lightOn, showCurrentGame, playerMove }; // Exports Object | Add curly braces if more than one Object, Function, etc.