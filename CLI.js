var inquirer = require('inquirer');
var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");
var BasicDeck = require("./basicDeck.js");
var ClozeDeck = require("./clozeDeck.js");

var newBasicDeck = new BasicDeck();
var front;
var back;

var newClozeDeck = new ClozeDeck();
var text;
var cloze;

var count = 0;
var correct = 0;
var incorrect = 0;

var start = function () {
    inquirer.prompt([
        {
            type: "list",
            name: "choose",
            message: "Welcome to the Flashcard Generator!"
            + "\nWould you like create new basic flashcards or new cloze-deleted flashcards?",
            choices: ["Basic Cards", "Cloze Cards"]
        }

    ]).then(function (answers) {

        if (answers.choose === "Basic Cards") {

            //lookup["my-tweets"]();
            createBasic();

        } else if (answers.choose === "Cloze Cards") {

            createCloze();
        }
    })
}
start();


// =====CREATING USER'S BASIC DECK=========================

var basicQuestions = [
    {
        type: "input",
        name: "front",
        message: "What's the question for the card?",
    },
    {
        type: "input",
        name: "back",
        message: "What's the answer for the card?",
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to add another card to the deck?',
        default: true
    }
];

function createBasic() {
    inquirer.prompt(basicQuestions).then(function (answers) {
        front = answers.front;
        back = answers.back;

        newBasicDeck.addCard(front, back)

        if (answers.askAgain) {
            createBasic();

        } else {

            inquirer.prompt([
                {
                    type: "confirm",
                    name: "startBasic",
                    message: "Would you like to study your flashcard deck?"
                }

            ]).then(function (answers) {

                if (answers.startBasic) {
                    playBasic();
                }
            })
            //console.log(newBasicDeck)
            //console.log(newBasicDeck.cards)
        }
    });
}

// =====CREATING USER'S CLOZE DECK=========================

var clozeQuestions = [
    {
        type: "input",
        name: "fullTxt",
        message: "What's the full question for the card?",
    },
    {
        type: "input",
        name: "toCloze",
        message: "What's the part you want to guess (replaced with '...'?",
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to add another card to the deck?',
        default: true
    }
];

function createCloze() {
    inquirer.prompt(clozeQuestions).then(function (answers) {
        text = answers.fullTxt;
        cloze = answers.toCloze;

        newClozeDeck.addCard(text, cloze)

        if (answers.askAgain) {
            createCloze();

        } else {
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "startCloze",
                    message: "Would you like to study your flashcard deck?"
                }

            ]).then(function (answers) {
                if (answers.startCloze) {
                    playCloze();
                }
            })
        }
    });
}


// =====PLAY GAME WITH BASIC DECK=========================

function playBasic() {

    inquirer.prompt([
        {
            type: "input",
            name: "front",
            message: "Card " + (count + 1) + ": " + newBasicDeck.cards[count].front
        }

    ]).then(function (answers) {

        if (answers.front.toLowerCase() === newBasicDeck.cards[count].back.toLowerCase()) {
            console.log("You got it!"
            + "\n================================");
            correct++;

        } else {
            console.log("The correct answer was: " + newBasicDeck.cards[count].back)
            console.log("You'll get the next one!"
            + "\n================================");
            incorrect++;
        }

        if (count < newBasicDeck.cards.length - 1) {
            count++;
            playBasic();

        } else {
            console.log("Game Over!"
                + "\n================================"
                + "\nCorrect: " + correct
                + "\nIncorrect Answers: " + incorrect
                + "\n++++++++++++++++++++++++++++++++");

            inquirer.prompt([
                {
                    type: "confirm",
                    name: "playAgain",
                    message: "Would you like to review your deck again?"

                }
            ]).then(function (answers) {
                if (answers.playAgain) {

                    count = 0;
                    correct = 0;
                    incorrect = 0;

                    playBasic();
                } else {
                    console.log("See you next time!");
                }
            })

        }
    })
}

// =====PLAY GAME WITH CLOZE DECK=========================

function playCloze() {

    inquirer.prompt([
        {
            type: "input",
            name: "partial",
            message: "Card " + (count + 1) + ": " + newClozeDeck.cards[count].partial
        }

    ]).then(function (answers) {

        if (answers.partial.toLowerCase() === newClozeDeck.cards[count].cloze.toLowerCase()) {
            console.log("You got it!");
            correct++;

        } else {
            console.log("The correct answer was: " + newClozeDeck.cards[count].cloze);
            console.log("You'll get the next one!");
            incorrect++;
        }

        if (count < newClozeDeck.cards.length - 1) {
            count++;

            playCloze();

        } else {

            console.log("Game Over!"
                + "\n================================"
                + "\nCorrect: " + correct
                + "\nIncorrect Answers: " + incorrect
                + "\n++++++++++++++++++++++++++++++++");

            inquirer.prompt([
                {
                    type: "confirm",
                    name: "playAgain",
                    message: 'Would you like to review your deck again?',

                }
            ]).then(function (answers) {
                if (answers.playAgain) {

                    count = 0;
                    correct = 0;
                    incorrect = 0;

                    playBasic();
                } else {
                    console.log("See you next time!");
                }
            })

        }
    })
}
