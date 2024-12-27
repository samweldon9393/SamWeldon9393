/*****************************************************************************
 * Name: Sam Weldon
 * UNI: sw3927
 * Date: 03/11/2024
 * Translated: 12/22/2024
 ****************************************************************************
 * Card.js - Simulates a playing card.
 ****************************************************************************/

export class Card{

/**--------------------------------------------------------------------------
 --------------------------------CONSTANTS-----------------------------------
 --------------------------------------------------------------------------**/
    static CLUBS = 1;
    static DIAMONDS = 2;
    static HEARTS = 3;
    static SPADES = 4;

    static ACE = 1;
    static JACK = 11;
    static QUEEN = 12;
    static KING = 13;

/*****************************************************************************
 * No arguments creates random card. One argument or more than 2 creates a 
 * Joker. Two arguments creates a specific card.
 * @param suit - an int - 1 = Clubs, 2 = Diamonds, 3 = Hearts, 4 = Spades.
 * @param rank - an int
 ****************************************************************************/
    constructor(...args){
        if (args.length === 0){
            this.suit = Math.floor(Math.random() * 4 + 1);
            this.rank = Math.floor(Math.random() * 13 + 1);
        }
        if (args.length === 1 || args.length > 2){
            this.suit = 0;
            this.rank = 0;
        }
        if (args.length === 2){
            this.suit = args[0];
            this.rank = args[1];
        }
    }

    /*
     * A comparison functin to pass to sort
     * @param a, b - objects of type Card.
     */
    static compareTo(a, b){
        if (a.rank === b.rank)
            return a.suit - b.suit;
        return a.rank - b.rank;
    }

    /*
     * @return - A printable string representing a Card.
     */
    toString(){
        if (this.rank === 0)
            return 'Joker';
        return `${this.rankString()} of ${this.suitString()}`;
    }

/*****************************************************************************
 * Helper method for toString(), @return rank as a String
 ****************************************************************************/

    rankString(){
        switch (this.rank){
            case Card.ACE: {return "Ace"; break;}
            case 2: {return "Two"; break;}
            case 3: {return "Three"; break;}
            case 4: {return "Four"; break;}
            case 5: {return "Five"; break;}
            case 6: {return "Six"; break;}
            case 7: {return "Seven"; break;}
            case 8: {return "Eight"; break;}
            case 9: {return "Nine"; break;}
            case 10: {return "Ten"; break;}
            case Card.JACK: {return "Jack"; break;}
            case Card.QUEEN: {return "Queen"; break;}
            case Card.KING: {return "King"; break;}
            default: return "Joker";
        }
    }

/*****************************************************************************
 * Helper method for toString(), @return suit as a String
 ****************************************************************************/

    suitString(){
        switch (this.suit){
            case Card.CLUBS: {return "Clubs"; break;}
            case Card.DIAMONDS: {return "Diamonds"; break;}
            case Card.HEARTS: {return "Hearts"; break;}
            case Card.SPADES: {return "Spades"; break;}
            default: return "Joker";
        }
    }
}
