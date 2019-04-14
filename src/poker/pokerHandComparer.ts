import { CardValue } from './card';
import { PokerHandType } from './pokerHandRanker';
import PokerHand from './pokerHand';

/**
 * Poker hand comparison strategy.
 */
export default class PokerHandComparer {
  static compare(leftHand: PokerHand, rightHand: PokerHand) {
    console.debug(`[Comparison] Left hand: ${leftHand} vs. Right hand: ${rightHand}`);
    console.debug(`[Processing] Hand type: ${PokerHandType[leftHand.type]} vs. ${PokerHandType[rightHand.type]}`);

    // Compare hand types first
    if (leftHand.type > rightHand.type) {
      console.debug(`[Result] Left hand wins.`);
      return 1;
    }
    else if (leftHand.type < rightHand.type) {
      console.debug(`[Result] Right hand wins.`);
      return 2;
    }
    // Use tiebreaker when dealing with identical hand types
    else if (leftHand.type == rightHand.type) {
      // Tiebreaker cards are already sorted, so we can compare them in order
      for (let i = 0; i < leftHand.tiebreaker.length; i++) {
        const leftTiebreakerCard = leftHand.tiebreaker[i];
        const rightTiebreakerCard = rightHand.tiebreaker[i];
        console.debug(`[Processing] Tiebreaker card ${i+1}: ${leftTiebreakerCard} vs. ${rightTiebreakerCard}`);
        if (leftTiebreakerCard.value > rightTiebreakerCard.value) {
          console.debug(`[Result] Left hand wins.`);
          return 1;
        }
        else if (leftTiebreakerCard.value < rightTiebreakerCard.value) {
          console.debug(`[Result] Right hand wins.`);
          return 2;
        }
      }
      console.debug(`[Result] Tie.`);
      return 3;
    }
  }
}
