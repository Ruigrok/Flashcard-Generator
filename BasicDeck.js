
// requiring the BasicCard module exported from basicCard.js
var BasicCard = require("./basicCard.js");

// constructor for creating deck of basic card objects
var BasicDeck = function() {
    this.cards = [];
    this.numCards = 0;

    this.addCard = function(front, back) {
        this.cards.push(new BasicCard(front, back));
        this.numCards = this.cards.length
    }
}

module.exports = BasicDeck;

/*
BasicDeck.prototype.addCard = function() {
    this.cards.push(new BasicCard(answers.front, answers.back));
    this.numCards = this.cards.length
}
*/

