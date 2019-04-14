import 'mocha';
import { expect } from 'chai';
import { Card, CardValue, CardSuit } from '../src/poker/Card';

describe('Card', function() {
  const card = new Card(CardValue.Ace, CardSuit.Clubs);

  describe('#equals()', function() {
    it('should return true if cards are equal', function() {
      const same = new Card(CardValue.Ace, CardSuit.Clubs);
      expect(card.equals(same)).to.be.true;
    });

    it('should return false if cards are not equal', function() {
      const other1 = new Card(CardValue.Ace, CardSuit.Diamonds);
      const other2 = new Card(CardValue.Two, CardSuit.Clubs);
      expect(card.equals(other1)).to.be.false;
      expect(card.equals(other2)).to.be.false;
    });
  });
});
