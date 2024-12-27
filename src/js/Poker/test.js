import { Card } from './Card.js';
import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Game } from './Game.js';

/* test cases for Card.js
const card = new Card();
const card2 = new Card();

console.log(card.toString());
console.log(card2.toString());

console.log(card.getRank());

console.log(Card.compareTo(card, card2));
*/

/* test cases for Deck.js
const deck = new Deck();
console.log(deck + "\n\n");

deck.shuffle();
console.log(deck);
*/

/* test cases for Deck.js
const p1 = new Player();
const p2 = new Player(100);

console.log(p1);
console.log(p2);

p1.bets(5);

console.log(p1);
console.log(p2);

p1.bets(5);

console.log(p1);
console.log(p2);
*/

/*
const buttons = document.querySelectorAll('.button');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        alert('Hello!');
        document.body.style.backgroundColor = 'red';
    });
});
*/ 

const g = new Game();
g.chooseMode();

function showModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function hideModal() {
  document.getElementById("modal").classList.add("hidden");
}
