import { CardValue, Card } from './card';
import Hand from './hand';

export enum PokerHandType {
  HighCard,
  OnePair,
  TwoPairs,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  Straightflush,
  RoyalFlush,
}

/**
 * Hand ranking strategy implementation.
 * Basically tries to match a hand with all known poker hands from highest to lowest rank.
 * Afterwards, compute tiebreaker cards for use in case of hand rank tie.
 * Note: tiebreaker data is computed based on the assumption that Hand#cards are ordered by value.
 */
export class PokerHandRanker {
  private static rankers = [
    PokerHandRanker.isRoyalFlush,
    PokerHandRanker.isStraightflush,
    PokerHandRanker.isFourOfAKind,
    PokerHandRanker.isFullHouse,
    PokerHandRanker.isFlush,
    PokerHandRanker.isStraight,
    PokerHandRanker.isThreeOfAKind,
    PokerHandRanker.isTwoPairs,
    PokerHandRanker.isOnePair,
  ]

  public static rank(hand: Hand): [PokerHandType, Card[]] {
    for (let ranker of this.rankers) {
      let rank = ranker(hand);
      if (rank) {
        return [rank[0], rank[1]];
      }
    }
    return [PokerHandType.HighCard, hand.cards];
  }

  private static isRoyalFlush(hand: Hand): [PokerHandType, Card[]] | false {
    if (hand.hasAllConsecutiveValues && hand.hasAllSameSuit && hand.cards[0].value === CardValue.Ace) {
      return [PokerHandType.RoyalFlush, hand.cards];
    }
    return false;
  }

  private static isStraightflush(hand: Hand): [PokerHandType, Card[]] | false {
    if (hand.hasAllConsecutiveValues && hand.hasAllSameSuit) {
      return [PokerHandType.Straightflush, hand.cards];
    }
    return false;
  }

  private static isFourOfAKind(hand: Hand): [PokerHandType, Card[]] | false {
    let fourOfAKind: Card[] = [];
    if (hand.identicalValues.size == 1) {
      let potentialFourOfAKind = hand.identicalValues.values().next().value;
      if (potentialFourOfAKind.length == 4) {
        fourOfAKind = potentialFourOfAKind;
      }
    }

    if (fourOfAKind.length === 4) {
      let tiebreaker = hand.cards.filter(c => !fourOfAKind.includes(c));
      tiebreaker.unshift(fourOfAKind[0]);
      return [PokerHandType.FourOfAKind, tiebreaker];
    }
    return false;
  }

  private static isFullHouse(hand: Hand): [PokerHandType, Card[]] | false {
    let fullHouse: Card[] = [];
    if (hand.identicalValues.size == 2) {
      hand.identicalValues.forEach((potentialThreeOfAKindOrPair, value) => {
        if (potentialThreeOfAKindOrPair.length == 3) {
          fullHouse.unshift(...potentialThreeOfAKindOrPair);
        }
        if (potentialThreeOfAKindOrPair.length == 2) {
          fullHouse.push(...potentialThreeOfAKindOrPair);
        }
      });
    }

    if (fullHouse.length === 5) {
      let tiebreaker = [fullHouse[0], fullHouse[3]];
      return [PokerHandType.FullHouse, tiebreaker];
    }
    return false;
  }

  private static isFlush(hand: Hand): [PokerHandType, Card[]] | false {
    if (hand.hasAllSameSuit) {
      return [PokerHandType.Flush, hand.cards];
    }
    return false;
  }

  private static isStraight(hand: Hand): [PokerHandType, Card[]] | false {
    if (hand.hasAllConsecutiveValues) {
      return [PokerHandType.Straight, hand.cards];
    }
    return false;
  }

  private static isThreeOfAKind(hand: Hand): [PokerHandType, Card[]] | false {
    let threeOfAKind: Card[] = [];
    if (hand.identicalValues.size == 1) {
      let potentialThreeOfAKind = hand.identicalValues.values().next().value;
      if (potentialThreeOfAKind.length == 3) {
        threeOfAKind = potentialThreeOfAKind;
      }
    }

    if (threeOfAKind.length === 3) {
      let tiebreaker = hand.cards.filter(c => !threeOfAKind.includes(c));
      tiebreaker.unshift(threeOfAKind[0]);
      return [PokerHandType.ThreeOfAKind, tiebreaker];
    }
    return false;
  }

  private static isTwoPairs(hand: Hand): [PokerHandType, Card[]] | false {
    let twoPairs: Card[] = [];
    if (hand.identicalValues.size == 2) {
      hand.identicalValues.forEach((potentialPairs, value) => {
        if (potentialPairs.length == 2) {
          twoPairs.push(...potentialPairs);
        }
      });
    }

    if (twoPairs.length === 4) {
      let tiebreaker = hand.cards.filter(c => !twoPairs.includes(c));
      tiebreaker.unshift(twoPairs[0], twoPairs[2]);
      return [PokerHandType.TwoPairs, tiebreaker];
    }
    return false;
  }

  private static isOnePair(hand: Hand): [PokerHandType, Card[]] | false {
    let onePair: Card[] = [];
    if (hand.identicalValues.size == 1) {
      let potentialPair = hand.identicalValues.values().next().value;
      if (potentialPair.length == 2) {
        onePair = potentialPair;
      }
    }

    if (onePair.length === 2) {
      let tiebreaker = hand.cards.filter(c => !onePair.includes(c));
      tiebreaker.unshift(onePair[0]);
      return [PokerHandType.OnePair, tiebreaker];
    }
    return false;
  }
}
