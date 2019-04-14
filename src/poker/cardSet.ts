import { Card } from './card';

/**
 * Wrapper class representing a set of Cards.
 * Overrides Set<Card>.add() using Card.equals(), forbidding Card duplicates.
 */
export default class CardSet extends Set<Card> {
  add(value: Card): this {
    let found: boolean = false;
    for (let item of this) {
      if (value.equals(item)) { found = true; break; }
    }
    if (!found) { super.add(value); }
    else { throw new RangeError(`Invalid card provided: card is already in hand. Card provided: ${value}`) }
    return this;
  }
}
