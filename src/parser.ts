import { CardValue, CardSuit, Card } from './poker/card';
import CardSet from './poker/cardSet';
import PokerHand from './poker/pokerHand';

/**
 * Parsing map used to match a string to its CardValue equivalent.
 */
const CardValueReverseMap = new Map<string, CardValue>([
  ['2', CardValue.Two],
  ['3', CardValue.Three],
  ['4', CardValue.Four],
  ['5', CardValue.Five],
  ['6', CardValue.Six],
  ['7', CardValue.Seven],
  ['8', CardValue.Eight],
  ['9', CardValue.Nine],
  ['T', CardValue.Ten],
  ['J', CardValue.Jack],
  ['Q', CardValue.Queen],
  ['K', CardValue.King],
  ['A', CardValue.Ace],
]);

/**
 * Parsing map used to match a string to its CardSuit equivalent.
 */
const CardSuitReverseMap = new Map<string, CardSuit>([
  ['S', CardSuit.Spades],
  ['H', CardSuit.Hearts],
  ['D', CardSuit.Diamonds],
  ['C', CardSuit.Clubs],
]);

/**
 * Wrapper class for handling parsing errors.
 */
export class ParseError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class Parser {
   /**
   * Helper method for parsing a string of cards with spec format "KS 2H 5C JD TD" into a PokerHand object.
   */
  static parse(handString: string): PokerHand {
    const cardStrings = handString.split(' ');
    if (cardStrings.length != 5) {
      throw new ParseError(`Wrong hand format provided: must be exactly 5 cards, separated by spaces. Value provided: ${cardStrings}`)
    }

    let cardSet: CardSet = new CardSet();
    for (let cardString of cardStrings) {
      if (cardString.length != 2) {
        throw new ParseError(`Wrong card format provided: must be exactly 2 characters. Value provided: ${cardString}`)
      }

      const cardValueString: string = cardString.charAt(0);
      const cardValue: CardValue | undefined = CardValueReverseMap.get(cardValueString);
      if (cardValue === undefined) {
        throw new ParseError(`Wrong card value provided: expected one of ${Array.from(CardValueReverseMap.keys()).join("|")}. Value provided: ${cardValueString}`);
      }

      const cardSuitString: string = cardString.charAt(1);
      const cardSuit: CardSuit | undefined = CardSuitReverseMap.get(cardSuitString);      
      if (cardSuit === undefined) {
        throw new ParseError(`Wrong card suit provided: expected one of ${Array.from(CardSuitReverseMap.keys()).join("|")}. Value provided: ${cardSuitString}`);
      }

      const card = new Card(cardValue, cardSuit);
      cardSet.add(card);
    }

    return new PokerHand(cardSet);
  }
}

export default Parser;
