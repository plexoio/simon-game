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
    game.turnNumber = 0;
    game.playerMoves = [];
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]); // result of expression is the Index
    showTurns();
}

function showScore() {
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
 */

function showTurns() {
    let turns = setInterval(() => {
        lightOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }

    }, 800);
}
module.exports = { game, newGame, showScore, addTurn, lightOn, showTurns }; // Exports Object | Add curly braces if more than one Object, Function, etc.