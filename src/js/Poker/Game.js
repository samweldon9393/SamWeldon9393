/*****************************************************************************
 * Name: Sam Weldon
 * UNI: sw3927
 * Date: 03/24/2024
 ***************************************************************************
 * Game.java - A Video Poker game. Features Normal and Deuces Wild modes.
 ****************************************************************************/

import { Card } from './Card.js';
import { Deck } from './Deck.js';
import { Player } from './Player.js';

export class Game {
	
/*****************************************************************************
 * Constructor used for testing
 * @param testHand - String[] of 5 cards in format ex. "s2" or "d13"
 ****************************************************************************/
    constructor(){
        this.p = new Player();
        this.cards = new Deck();
        this.cards.shuffle();  this.cards.shuffle();
        this.hand = [];
        this.mode = 1;
        //create a container for dynamic elements
        this.gameContainer = document.getElementById('game-container');
    }

    chooseMode(){
        document.addEventListener('DOMContentLoaded', () => {

            //attach event listeners to the initial buttons
            const buttons = document.querySelectorAll('.button');
            buttons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const buttonId = event.target.id;
                    const gameModeElement = document.querySelector('.game-mode');
                    if (buttonId === 'normal'){
                        gameModeElement.textContent = 'Straight 5 Card';
                        this.mode = 1;
                        this.play();
                    }
                    else if (buttonId === 'wild'){
                        gameModeElement.textContent = 'Dueces Wild!';
                        this.mode = 2;
                        this.play();
                    }
                    else
                        console.log('Unknown button click');
                });
            });
        });
    }


/*****************************************************************************
 * Principal method for playing the game. Prompts user to select game mode.
 * Calls helper methods. Loops as long as user wishes to continue playing.
 ****************************************************************************/
    play(){

        this.newHand();
        this.takeBets();

    }

/*****************************************************************************
 * Deals a new hand of cards. If there's not enough cards in the deck to
 * accommodate most possible cards needed to play a hand, resests the deck.
 ****************************************************************************/
    newHand(){
        if (this.cards.top <= 10){
            this.cards.resetDeck(); this.cards.shuffle();
        }
        if (this.hand.length > 0){
            for (let i = this.hand.length - 1 ; i >= 0 ; i--){
                this.hand.pop();
            }
        }
        for (let i = 0 ; i < 5 ; i++){
            this.hand.push(this.cards.deal());
        }
        this.hand.sort(Card.compareTo);
    }


/*****************************************************************************
 * Helper method for play(). Displays token balance, takes bets.
 ****************************************************************************/
    takeBets(){
        
        this.gameContainer.innerHTML = '';

        const form = document.createElement('form');
        form.id = 'bet-form';

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter bet?';
        inputField.name = 'bet';
        inputField.style.width = '100%';
        form.appendChild(inputField);  

        inputField.style.color = 'black';

        //add a submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.classList.add('button');
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

        this.gameContainer.appendChild(form);

        // Add form submit event listener
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form from refreshing the page
            const bet = inputField.value;
            
            while (bet > this.p.bankroll || bet <= 0){
                alert('No free rides or debt allowed!');
                return;
            }

            this.p.bets(bet);
            this.showHand();
        });

    }
/*****************************************************************************
 * Helper method for play(). Deals + displays hand, prompts to replace cards.
 ****************************************************************************/
    showHand(){

        //clear the buttons away
        this.gameContainer.innerHTML = '';

        this.printBankroll();

        const form = document.createElement('form');
        form.classList.add('py-2', 'text-black');
        form.id = 'card-form';
        
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flex', 'flex-row');

        for (let i = 0 ; i < 5 ; i++){
            const card = document.createElement('div');
            card.className = 'card';

            //add a checkbox to each card
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `card-${i}`;
            checkbox.name = 'selected-cards';
            checkbox.value = `${i}`;

            //add the image of the card 
            const img = document.createElement('img');
            img.src = `./pub/images/Cards/${this.hand[i]}.PNG`;
            img.alt = `${this.hand[i]}`;
            img.className = 'card-image';  

            //append the checkbox and label to the card
            card.appendChild(checkbox);
            card.appendChild(img);

            cardDiv.appendChild(card);
        }

        form.appendChild(cardDiv);

        const exchangePrompt = document.createElement('div');
        exchangePrompt.textContent = 'Select the cards you would like to exchange';
        form.appendChild(exchangePrompt);

        //add a submit button to the form
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.classList.add('button');
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

        this.gameContainer.appendChild(form);

        //add form submit event listener
        form.addEventListener('submit', (event) => {
            event.preventDefault(); //prevent form from refreshing the page
            const selectedCards = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
                .map((checkbox) => checkbox.value);
            this.replaceCards(selectedCards);
        });
        
        //TODO add this text:    System.out.print("How many cards would you like to exchange? ");
    }

/*****************************************************************************
 * Prints the bankroll and bet 
 ****************************************************************************/
    printBankroll(){
        
        const br = document.createElement('div');
        br.className = 'bankroll';
        br.textContent = `Bankroll: ${this.p.bankroll}`;
        this.gameContainer.appendChild(br);
        
        const bet = document.createElement('div');
        bet.className = 'bet';
        bet.textContent = `Bet: ${this.p.bet}`;
        this.gameContainer.appendChild(bet);
    }

/*****************************************************************************
 * @param selectedCards - array of cards to replace
 ****************************************************************************/
    replaceCards(selectedCards){
        for (let i = 0 ; i < selectedCards.length ; i++){
            this.hand[selectedCards[i]] = this.cards.deal();
        }
        this.hand.sort(Card.compareTo);
        this.showFinalHand();
    }

    showFinalHand(){

        //clear the buttons away
        this.gameContainer.innerHTML = '';

        this.printBankroll();

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flex', 'flex-row');
        
        for (let i = 0; i < 5; i++) {
            //add the image of the card 
            const img = document.createElement('img');
            img.src = `./pub/images/Cards/${this.hand[i]}.PNG`;
            img.alt = `${this.hand[i]}`;
            img.className = 'card-image';  
            cardDiv.appendChild(img);
        }

        this.gameContainer.appendChild(cardDiv);

        this.payOut();
    }

/*****************************************************************************
 * Helper method for play(). Evaluates and prints new hand, pays out.
 * Prompts user to continue playing. @return user input, or breaks play Loops
 * if user is out of tokens.
 ****************************************************************************/
    payOut(){ //TODO this should take mode as a param
        

        let bestHand;

        if (this.mode === 2)
            bestHand = Wild.checkHand(this.hand);
        else 
            bestHand = Poker.checkHand(this.hand);
        

        this.p.winnings(bestHand);
        const payout = this.p.bet * bestHand;
        

        const result = document.createElement('div');
        result.className = 'result';
        
        const printHand = document.createElement('h3');
        printHand.textContent = `You had a ${Poker.stringHand(bestHand)}`;
        result.appendChild(printHand);
        
        const printPayout = document.createElement('div');
        printPayout.textContent = `Payout: ${payout} tokens  You have ${this.p.bankroll} tokens left`;
        result.appendChild(printPayout);

        this.gameContainer.appendChild(result);

        if (this.p.bankroll > 0){

            //add a submit button to the form
            const submitButton = document.createElement('button');
            submitButton.type = 'button';
            submitButton.classList.add('button');
            submitButton.textContent = 'Next Hand';

            this.gameContainer.appendChild(submitButton);
            //add form submit event listener
            submitButton.addEventListener('click', (event) => {
                event.preventDefault(); //prevent form from refreshing the page
                this.play();
            });

            
        }
        else{
            const gameOver = document.createElement('h1');
            gameOver.textContent = 'You ran out of tokens, game over!';
            this.gameContainer.appendChild(gameOver);

        }
    }
}

/****************************************************************************
  ---------------------------------------------------------------------------
  --- Poker Class - Collection of static methods containing poker logic. ---
  ---------------------------------------------------------------------------
 ******************************************************************************/
 
class Poker{

/**--------------------------------------------------------------------------
 --------------------------------CONSTANTS-----------------------------------
 --------------------------------------------------------------------------**/
    static NO_PAIR = 0;
    static PAIR = 1;
    static TWO_PAIR = 2;   
    static THREE_OF_A_KIND = 3;
    static STRAIGHT = 4;
    static FLUSH = 5;
    static FULL_HOUSE = 6;
    static FOUR_OF_A_KIND = 25;
    static STRAIGHT_FLUSH = 50;
    static ROYAL_FLUSH = 250;

/*****************************************************************************
 * Evaluates hand of cards, creates a String of evaluated hand, prints
 * that string.
 * @param hand - ArrayList of cards. @return evaluated hand's bet multiplier.
 ****************************************************************************/
	static checkHand(hand){
        const bestHand = Poker.checkPairs(hand);
        return bestHand;
    }

/*****************************************************************************
 * First in a series of methods for evaluating hands. Adds up duplicates in
 * hand, calls helper methods if needed.
 * @param hand - ArrayList of cards. @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkPairs(hand){
        let pair = 0;
        for (let i = 0 ; i < hand.length - 1 ; i++){
            if (hand[i].rank === hand[i+1].rank){
                pair++;
            }
        }
        if (pair === 3){
            return Poker.checkFullHouse(hand);
        }
        else if (pair === 2){
            return Poker.checkTwoPair(hand);
        }
        else if (pair === 1){
            return Poker.PAIR;
        }
        else{
            return Poker.checkStraight(hand);
        }
    }

/*****************************************************************************
 * If there were enough duplicates in a hand, evaluates for a Full House.
 * @param hand - ArrayList of cards. @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkFullHouse(hand){
        if (hand[0].rank === hand[3].rank||
            hand[1].rank === hand[4].rank){
                return Poker.FOUR_OF_A_KIND;
            }
        return Poker.FULL_HOUSE;
    }

/*****************************************************************************
 * If there were enough duplicates in a hand, evalutes for Two Pair.
 * @param hand - ArrayList of cards. @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkTwoPair(hand){
        if (hand[0].rank === hand[2].rank ||
            hand[1].rank === hand[3].rank ||
            hand[2].rank === hand[4].rank){
                return Poker.THREE_OF_A_KIND;
            }
        return Poker.TWO_PAIR;
    }

/*****************************************************************************
 * If hand had no duplicates, evaluates for a Straight then calls checkFlush.
 * @param hand - ArrayList of cards. @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkStraight(hand){
        let straight = 0;
        for (let i = 0 ; i < hand.length - 1 ; i++){
            if (hand[i].rank - hand[i+1].rank === -1){
                straight++;
            }
        }
        if (straight === hand.length - 1 || straight === hand.length - 2 &&
            hand[0].rank - hand[1].rank === -9){
            return Poker.checkFlush(hand, true);
        }
        return Poker.checkFlush(hand, false);
    }

/*****************************************************************************
 * If hand had no duplicates, evaluates for a Flush. 
 * @param hand - an ArrayList of 5 cards. @param Straight - boolean that reps
 * if a hand is a Straight. @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkFlush(hand, Straight){
        let flush = 0;
        for (let i = 0 ; i < hand.length - 1 ; i++){
            if (hand[i].suit === hand[i+1].suit){
                flush++;
            }
        }
        if (flush === 4 && Straight && hand[4].rank === 13 &&
            hand[0].rank === 1){
            return Poker.ROYAL_FLUSH;
        }
        else if (flush === 4 && Straight){
            return Poker.STRAIGHT_FLUSH;
        }
        else if (flush === 4){
            return Poker.FLUSH;
        }
        else if (flush < 4 && Straight){
            return Poker.STRAIGHT;
        }
        return Poker.NO_PAIR;
    }

/*****************************************************************************
 * Creates a String out of evaluated best hand. @return that String.
 * @param bestHand - the integer multiplier constant for a given hand type.
 ****************************************************************************/
    static stringHand(bestHand){
        if (bestHand === Poker.NO_PAIR){
            return "No Pair";
        }
        else if (bestHand === Poker.PAIR){
            return "Pair";
        }
        else if (bestHand === Poker.TWO_PAIR){
            return "Two Pair";
        }
        else if (bestHand === Poker.THREE_OF_A_KIND){
            return "Three of a Kind";
        }
        else if (bestHand === Poker.STRAIGHT){
            return "Straight";
        }
        else{
            return Poker.stringHand_Two(bestHand);
        }
    }

/*****************************************************************************
 * Helper method for creating a String from best hand. @return that String.
 * @param bestHand - the integer multiplier constant for a given hand type.
 ****************************************************************************/
    static stringHand_Two(bestHand){
        if (bestHand === Poker.FLUSH){
            return "Flush";
        }
        else if (bestHand === Poker.FULL_HOUSE){
            return "Full House";
        }
        else if (bestHand === Poker.FOUR_OF_A_KIND){
            return "Four of a Kind";
        }
        else if (bestHand === Poker.STRAIGHT_FLUSH){
            return "Stright Flush";
        }
        else {
            return "Royal FLush";
        }
    }
}

/****************************************************************************
 ----------------------------------------------------------------------------
 ---  Wild Class - Collection of static methods containing 2s Wild logic. ---
 ----------------------------------------------------------------------------
 ****************************************************************************/

class Wild{

/*****************************************************************************
 * Evaluates hand of cards, creates a String of evaluated hand, prints
 * that string, @param hand - an ArrayList of 5 cards.
 * @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkHand(hand){
        const bestHand = Wild.wildCheckTwos(hand);
        return bestHand;
    }

/*****************************************************************************
 * Removes all 2s from hand, places them into a new ArrayList. Evaluates hand
 * by calling helper methods. If hand has no 2s, uses Poker class' methods
 * instead. Puts 2s back into hand, sorts hand.
 * @param hand - ArrayList of cards. @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static wildCheckTwos(hand){
        let twos = [];
        for (let i = hand.length - 1 ; i >= 0  ; i--){
            if (hand[i].rank === 2){
                twos.push(hand[i]);
                hand.splice(i, 1);
            }
        }
        if (twos.length === 0){
            return Poker.checkPairs(hand);
        }
        return Wild.wildCheck(hand, twos);
    }


/*****************************************************************************
 * Evaluates hands with 3 or more 2s. Otherwise calls next helper method.
 * @param hand - an ArrayList of cards. @param twos - ArrayList of two-cards.
 * @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static wildCheck(hand, twos){
        if (twos.length === 4){
            if (hand[0].rank > 9 || hand[0].rank === 1){
                return Poker.ROYAL_FLUSH;
            }
            return Poker.STRAIGHT_FLUSH;
        }
        else if (twos.length === 3){
            if (hand[0].suit === hand[1].suit){
                if (hand[0].rank > 9 || hand[0].rank === 1
                    && hand[1].rank > 9){
                    return Poker.ROYAL_FLUSH;
                }
                else if (hand[1].rank - hand[0].rank <= 4){
                    return Poker.STRAIGHT_FLUSH;
                }
                return Poker.FOUR_OF_A_KIND;
            }
        }
        return Wild.wildCheckPairs(hand, twos);
    }

/*****************************************************************************
 * Counts duplicates (without 2s). Checks certain hands. Calls next method.
 * @param hand - an ArrayList of cards. @param twos - ArrayList of two-cards.
 * @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static wildCheckPairs(hand, twos){
        let pair = 0;
        for (let i = 0 ; i < hand.length - 1 ; i++){
            if (hand[i].rank === hand[i+1].rank){
                pair++;
            }
        }
        pair += twos.length;
        if (pair >= 4){
            return Poker.FOUR_OF_A_KIND;
        }
        return Wild.wildCheckPairs_2(hand, twos, pair);
    }

/*****************************************************************************
 * Checks certain hand configurations. Calls next helper method accordingly.
 * @param hand - an ArrayList of cards. @param twos - ArrayList of two-cards.
 * @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static wildCheckPairs_2(hand, twos, pairs){
        if (pairs === 3 && twos.length === 1){
            if (hand[1].rank != hand[2].rank){
                return Poker.FULL_HOUSE;
            }
            return Poker.FOUR_OF_A_KIND;
        }      
        else if (pairs === 3 && twos.length === 2){
            return Poker.FOUR_OF_A_KIND;
        }
        else if (pairs === 2 && twos.length === 1){
            return Poker.THREE_OF_A_KIND;
        }
        return Wild.wildCheckPairs_3(hand, twos, pairs);
    }

/*****************************************************************************
 * Checks certain hand configurations. Calls next helper method accordingly.
 * @param hand - an ArrayList of cards. @param twos - ArrayList of two-cards.
 * @param pairs - @ of pairs in hand @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static wildCheckPairs_3(hand, twos, pairs){
        let bestHand = Poker.NO_PAIR;
        if (pairs === 2 && twos.length === 2){
            bestHand = Poker.THREE_OF_A_KIND;
        }
        else if (pairs === 1 && twos.length === 1){
            bestHand = Poker.PAIR;
        }
        return Wild.checkWildStraight(hand, twos, bestHand);
    }

/*****************************************************************************
 * Checks for Straights. Calls next helper method.
 * @param hand - an ArrayList of cards. @param twos - ArrayList of two-cards.
 * @param bestHand & @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkWildStraight(hand, twos, bestHand){
        let straight = 0;
        for (let i = 0 ; i < hand.length - 1 ; i++){
            if (hand[i].rank - hand[i+1].rank === -1){
                straight++;
            }
        }                                     
        if (straight === hand.length - 1 || straight === hand.length - 2 &&
            hand[0].rank === 1 && hand[1].rank >= 10  ||
            straight === hand.length - 2 && hand[hand.length - 1].rank
            - hand[0].rank === hand.length){
            bestHand = Poker.STRAIGHT;
        }
        return Wild.checkWildFlush(hand, twos, bestHand);
    }

/*****************************************************************************
 * Checks for Flushes.
 * @param hand - an ArrayList of cards. @param twos - ArrayList of two-cards.
 * @param bestHand & @return evaluated hand's bet multiplier.
 ****************************************************************************/
    static checkWildFlush(hand, twos, bestHand){
        let flush = 0;
        for (let i = 0 ; i < hand.length - 1 ; i++){
            if (hand[i].suit === hand[i+1].suit){
                flush++;
            }
        }
        if (flush === hand.length - 1 && bestHand === Poker.STRAIGHT  &&
            hand[hand.length - 1].rank >= 13 - twos.length ||
            flush === hand.length - 1 && hand[0].rank === 1  &&
            hand[1].rank > 9){
            return Poker.ROYAL_FLUSH;
        }
        if (flush === hand.length - 1 && bestHand === Poker.STRAIGHT){
            return Poker.STRAIGHT_FLUSH;
        }
        if (flush === hand.length - 1){
            return Poker.FLUSH;
        }
        if (bestHand != Poker.STRAIGHT && twos.length === 0){
            return Poker.NO_PAIR;
        }
        return bestHand;
    } 
}
