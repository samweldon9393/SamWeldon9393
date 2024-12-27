/*****************************************************************************
 * Name: Sam Weldon
 * UNI: sw3927
 * Date: 03/11/2024
 * Translated: 12/22/2024
 ***************************************************************************
 * Deck.java - A class that simulates a deck of cards.
 ****************************************************************************/

import { Card } from './Card.js';

export class Deck {
	
/**--------------------------------------------------------------------------
 --------------------------------CONSTANTS-----------------------------------
 --------------------------------------------------------------------------**/
    static SUITS = 4;
    static RANKS = 13;
    static MAX_SIZE = 52;

/*****************************************************************************
 * Constructs a deck of cards (comes ordered, like a real life deck)
 ****************************************************************************/
    constructor(){
        this.cards = [];
        this.top = Deck.MAX_SIZE;
        this.constructDeck();
    }

/*****************************************************************************
 * Helper method that generates one of each card to fill deck
 ****************************************************************************/
    constructDeck(){
        let count = 0;
        for (let i = 1 ; i <= Deck.SUITS ; i++){
            for (let j = 1 ; j <= Deck.RANKS ; j++){
                this.cards[count] = new Card(i, j);
                count++;
            }
        }
    }
	
/*****************************************************************************
 * Shuffles the deck
 ****************************************************************************/
    shuffle(){
        for (let i = 0 ; i < this.top ; i++){
            let temp = this.cards[i];
            let random = Math.floor(Math.random() * this.top);
            this.cards[i] = this.cards[random];
            this.cards[random] = temp;
        }
    }

/*****************************************************************************
 * Mutator method that resets the deck back to 52 cards and shuffles
 ****************************************************************************/
    resetDeck(){
        this.top = Deck.MAX_SIZE;
        this.shuffle();
    }

/*****************************************************************************
 * @return the top card of the deck
 ****************************************************************************/
    deal(){
        if (this.top === 0){
            this.top = Deck.MAX_SIZE;
            this.shuffle();  this.shuffle();
        }
        this.top--;
        return this.cards[this.top];
    }

/*****************************************************************************
 * @return a specific card, removes that card from the deck. If Card provided
 * as arguemnt is not in the deck, @return a Joker Card.
 ****************************************************************************/
    dealSpecific(specCard){
        this.deal();
        if (Card.compareTo(this.cards[this.top], specCard) !== 0){
            let i = this.top - 1;
            while (Card.compareTo(this.cards[i], specCard) !== 0 && i > 0){i--;}
            if (i === 0 && Card.compareTo(this.cards[i], specCard) !== 0){ 
                return new Card(0); // if card's not in deck, deal a Joker
            } 
            let temp = this.cards[i];
            for (let j = i+1 ; j <= this.top ; j++){
                this.cards[j-1] = this.cards[j];
            }
            this.cards[this.top] = temp;
        }
        return this.cards[this.top];
    }

/*****************************************************************************
 * @return String of all cards remaining in deck
 ****************************************************************************/
    toString(){
        let str = "";
        for (let i = 0 ; i < this.top ; i++){
            str += this.cards[i] + "\n";
        }
        return str;
    }
}
