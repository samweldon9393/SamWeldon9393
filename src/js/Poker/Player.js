/*****************************************************************************
 * Name: Sam Weldon
 * UNI: sw3927
 * Date: 03/24/2024
 * Translated: 12/23/24
 ***************************************************************************
 * Player.java - A class that represents a player for Video Poker.
 ****************************************************************************/

export class Player {
    
/*****************************************************************************
 * No arg constructor sets starting token balance to 50, otherwise...
 * @param - One arg is bet amount.
 ****************************************************************************/
    constructor(...args){
        if (args.length === 0){
            this.bankroll = 50;
            this.bet = 0;
        }
        else if (args.length === 1){
            this.bankroll = args[0];
            this.bet = 0;
        }
    }
		
/*****************************************************************************
 * Mutator method for placing bets. Remembers current bet and adjusts bank.
 ****************************************************************************/
    bets(amt){
        this.bet = amt;
        this.bankroll -= amt;
    }

/*****************************************************************************
 * Mutator method for adding winnings to bankroll.
 ****************************************************************************/
    winnings(odds){
        this.bankroll += (this.bet * odds);
    }
}


