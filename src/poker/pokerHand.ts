import { Card } from './card';
import CardSet from './cardSet';
import Hand from './hand';
import { PokerHandType, PokerHandRanker } from './pokerHandRanker';
import PokerHandComparer from './pokerHandComparer';

/**
 * A ranked poker hand, with tiebreaker card data.
 */
export default class PokerHand extends Hand {
  public type: PokerHandType;
  public tiebreaker: Card[];

  constructor(cardSet: CardSet) {
    super(cardSet);
    [this.type, this.tiebreaker] = PokerHandRanker.rank(this);
  }

  compareWith(other: PokerHand) {
    return PokerHandComparer.compare(this, other);
  }
}
