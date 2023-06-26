/**
 * @jest-environment jsdom
 */
const exp = require('constants');
const { game, newGame, showScore, addTurn, lightOn, showTurns} = require('../game'); // Import Object

beforeAll(() => {
    let fs = require('fs'); // install library
    let myDOM = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(myDOM);
    document.close();
});

// Test suite 1 OBJECT
describe('Test Game Object: ', () => {
    test('Check for Key "game" in Object', () => {
        expect('score' in game).toBe(true); // Test imported object
    });
    test('Check for Key "currentGame" in Object', () => {
        expect('currentGame' in game).toBe(true); // Test imported object
    });
    test('Check for Key "playerMoves" in Object', () => {
        expect('playerMoves' in game).toBe(true); // Test imported object
    });
    test('Check for Key "choices" in Object', () => {
        expect('choices' in game).toBe(true); // Test imported object
    });
    test('Check for Values in "choices" key', () => {
        expect(game.choices).toStrictEqual(["button1", "button2", "button3", "button4"]); // Test imported object
    });
    test('Check for "game.turnNumber"', () => {
        expect('turnNumber' in game).toBe(true); // Test imported object
    });
});

// Test suite 2 FUNCTION
describe('Testing "newGame" function', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2", "button3", "button4"];
        game.currentGame = ["button1", "button2", "button3", "button4"];
        game.turnNumber = 1;
        newGame();
    })

    // test('Check if newGame() resets "currentGame" values', () => {
    //     expect(game.currentGame).toStrictEqual([]); // Or this way
    // })

    test('Add one move to the "currentGame" array', () => {
        expect(game.currentGame.length).toBe(1);
    })

    test('Check if newGame() resets "score" values', () => {
        expect(game.score).toEqual(0);
    })

    test('Check if newGame() resets "playerMoves" values', () => {
        expect(game.playerMoves.length).toBe(0); // This way
    })

    test('Check if score in DOM has been updated', () => {
        expect(document.getElementById('score').innerText).toEqual(0); // Or this way
    })

    test('Check if newGame() resets "game.turnNumber" values', () => {
        expect(game.turnNumber).toEqual(0);
    })
})

describe ('Gameplay functionality', () => {
    beforeEach(()=> {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    })
    afterEach(()=> {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    })
    
    test('addTurn check for 2 elements', () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    })
    test('Add light class', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    })
    test('Update game.turnNumber', () => {
        newGame();
        showTurns();
        expect(game.turnNumber).toBe(0);
    })
})