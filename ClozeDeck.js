
// requiring the ClozeCard module exported from clozeCard.js
var ClozeCard = require("./clozeCard.js");

// constructor for creating deck of cloze card objects
var ClozeDeck = function () {
    this.cards = [];
    this.numCards = 0;

    this.addCard = function (text, cloze) {
        this.cards.push(new ClozeCard(text, cloze));
        this.numCards = this.cards.length;
    }
}

module.exports = ClozeDeck;