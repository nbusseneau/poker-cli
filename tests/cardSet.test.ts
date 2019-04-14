import 'mocha';
import { expect } from 'chai';
import { Card, CardValue, CardSuit } from '../src/poker/Card';
import CardSet from '../src/poker/CardSet';

describe('CardSet', function() {
  let cardSet: CardSet;
  const card1 = new Card(CardValue.Ace, CardSuit.Clubs);
  const card2 = new Card(CardValue.Two, CardSuit.Diamonds);

  beforeEach('Reset CardSet to a new instance.', function() {
    cardSet = new CardSet();
  });

  describe('#add()', function() {
    it('should add an item to the set when it is not present yet', function() {
      cardSet.add(card1);
      cardSet.add(card2);
      expect(cardSet).to.deep.include(card1);
      expect(cardSet).to.deep.include(card2);
      expect(cardSet).to.have.lengthOf(2);
    });

    it('should throw when adding an already present item to the set', function() {
      cardSet.add(card1);
      expect(cardSet).to.deep.include(card1);
      expect(() => cardSet.add(card1)).to.throw(RangeError);
    });
  });
});
