export enum CardValue {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

export enum CardSuit {
  Spades,
  Hearts,
  Diamonds,
  Clubs,
}

/**
 * A card with its value and suit.
 */
export class Card {
  constructor(public value: CardValue, public suit: CardSuit) {}
  
  equals(other: Card): boolean {
    return this.value === other.value && this.suit === other.suit;
  }

  toString(): string {
    let value = this.value >= 10 ? CardValue[this.value].toString().substr(0,1) : this.value;
    let suit = CardSuit[this.suit].toString().substr(0,1);
    return `${value}${suit}`;
  }
}
