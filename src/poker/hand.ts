import { CardValue, Card } from './card';
import CardSet from './cardSet';

/**
 * A hand comprised of 5 cards ordered by value, with various helper methods to facilite hand ranking.
 */
export default class Hand {
  private _cards: Card[];
  private _identicalValues!: Map<CardValue, Card[]>;
  private _hasAllConsecutiveValues!: boolean;
  private _hasAllSameSuit!: boolean;

  constructor(cardSet: CardSet) {
    if (cardSet.size != 5) {
      throw new RangeError(`Wrong number of cards provided: must be exactly 5. Argument provided: ${cardSet}`)
    }
    this._cards = this.sortCardsByValue(Array.from(cardSet));
  }

  private sortCardsByValue(cards: Card[]): Card[] {
    return [...cards].sort((left, right): number => {
      if (left.value > right.value) { return -1; }
      if (left.value < right.value) { return 1; }
      return 0;
    });
  }

  public get cards(): Card[] {
    return this._cards;
  }

  public get identicalValues(): Map<CardValue, Card[]> {
    if (this._identicalValues) {
      return this._identicalValues;
    }

    this._identicalValues = new Map<CardValue, Card[]>();

    let values = Array.from(new Set(this.cards.map(c => c.value))); // List of values, without duplicates
    for (let value of values) {
      const cardsWithSameValue = this.cards.filter(c => c.value === value);
      if (cardsWithSameValue.length >= 2) {
        this._identicalValues.set(value, cardsWithSameValue);
      }
    }

    return this._identicalValues;
  }

  public get hasAllConsecutiveValues(): boolean {
    if (this._hasAllConsecutiveValues) {
      return this._hasAllConsecutiveValues;
    }

    // Special treatment for low Ace in Straight hands
    // If both an Ace and a Two are found in a hand with no identical values, then treat Ace as a One before checking if hand has all consecutive values
    if (this.cards[0].value === CardValue.Ace
      && this.cards[4].value === CardValue.Two
      && this.identicalValues.size === 0) {
      // Basically, this means moving Ace from high card to low card
      const lowAceCards = this.cards.slice(1);
      lowAceCards.push(new Card(CardValue.One, this.cards[0].suit));

      const hasAllConsecutiveValuesWithLowAce = this.internalHasAllConsecutiveValues(lowAceCards);
      if (hasAllConsecutiveValuesWithLowAce) {
        // If hand is found to be straight with low Ace rule, use re-ordered cards for tiebreaker data (low Ace straights are weaker than high Ace straights)
        this._cards = lowAceCards;
        this._hasAllConsecutiveValues = true;
        return this._hasAllConsecutiveValues;
      }
    }

    // Check if all card values are consecutive
    this._hasAllConsecutiveValues = this.internalHasAllConsecutiveValues(this.cards);
    return this._hasAllConsecutiveValues;
  }

  private internalHasAllConsecutiveValues(cards: Card[]): boolean {
    // Computations here work only if cards were sorted properly beforehand
    for (let i = 0; i < cards.length - 1; i++) {
      if (cards[i+1].value+1 !== cards[i].value) {
        return false;
      }
    }
    return true;
  }

  public get hasAllSameSuit(): boolean {
    if (this._hasAllSameSuit) {
      return this._hasAllSameSuit;
    }

    let suits = Array.from(new Set(this.cards.map(c => c.suit))); // List of suits, without duplicates
    this._hasAllSameSuit = suits.length === 1;
    return this._hasAllSameSuit;
  }

  toString(): string {
    return this.cards.map(c => c.toString()).join(" ");
  }
}
