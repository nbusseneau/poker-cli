import { CardValue, Card } from './card';
import CardSet from './cardSet';

/**
 * A hand comprised of 5 cards ordered by value, with various helper methods to facilite hand ranking.
 */
export default class Hand {
  public readonly cards!: Card[];
  private _identicalValues!: Map<CardValue, Card[]>;
  private _hasAllConsecutiveValues!: boolean;
  private _hasAllSameSuit!: boolean;

  constructor(cardSet: CardSet) {
    if (cardSet.size != 5) {
      throw new RangeError(`Wrong number of cards provided: must be exactly 5. Argument provided: ${cardSet}`)
    }
    this.cards = this.sortCardsByValue(Array.from(cardSet));
  }

  private sortCardsByValue(cards: Card[]): Card[] {
    return [...cards].sort((left, right): number => {
      if (left.value > right.value) { return -1; }
      if (left.value < right.value) { return 1; }
      return 0;
    });
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

    // Works only if cards were sorted properly beforehand
    for (let i = 0; i < this.cards.length - 1; i++) {
      if (this.cards[i+1].value+1 !== this.cards[i].value) {
        this._hasAllConsecutiveValues = false;
        return this._hasAllConsecutiveValues;
      }
    }
    this._hasAllConsecutiveValues = true;
    return this._hasAllConsecutiveValues;
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
