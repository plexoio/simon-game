let game = {
    score: 0,
    currentGame: [],
    playerMoves:[],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame () {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    showScore();
    addTurn();
}

function addTurn () {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]); // result of expression is the Index
    // showTurns();
}
function showScore () {
    document.getElementById('score').innerText = game.score;
}

function lightOn (curr) {
    document.getElementById(curr).classList.add('light');
    setTimeout(() => {
        document.getElementById(curr).classList.remove('light');
    }, 400);
}
module.exports = {game, newGame, showScore, addTurn, lightOn}; // Exports Object | Add curly braces if more than one Object, Function, etc.