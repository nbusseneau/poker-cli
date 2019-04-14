import 'mocha';
import { expect } from 'chai';
import { Card, CardValue, CardSuit } from '../src/poker/Card';
import CardSet from '../src/poker/CardSet';
import Hand from '../src/poker/Hand';

describe('Hand', function() {
  describe('#constructor()', function() {
    it('should return a hand with cards ordered by value', function() {
      const cardSet = new CardSet([
        new Card(CardValue.King, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Clubs),
        new Card(CardValue.Jack, CardSuit.Hearts),
        new Card(CardValue.Queen, CardSuit.Diamonds),
        new Card(CardValue.Three, CardSuit.Spades),
      ]);
      const hand = new Hand(cardSet);
      expect(hand.cards.map(c => c.value)).to.have.deep.ordered.members([CardValue.King, CardValue.Queen, CardValue.Jack, CardValue.Three, CardValue.Two]);
    });

    it('should throw when providing a wrong number of cards', function() {
      const cardSet = new CardSet([
        new Card(CardValue.King, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Clubs),
        new Card(CardValue.Jack, CardSuit.Hearts),
        new Card(CardValue.Queen, CardSuit.Diamonds),
      ]);
      const cardSet2 = new CardSet([
        new Card(CardValue.King, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Clubs),
        new Card(CardValue.Jack, CardSuit.Hearts),
        new Card(CardValue.Queen, CardSuit.Diamonds),
        new Card(CardValue.Three, CardSuit.Spades),
        new Card(CardValue.Four, CardSuit.Clubs),
      ]);
      expect(() => new Hand(cardSet)).to.throw(RangeError);
      expect(() => new Hand(cardSet2)).to.throw(RangeError);
    });
  });

  describe('#identicalValues', function() {
    it('should return a map with cards grouped by values', function() {
      const cardSet = new CardSet([
        new Card(CardValue.Three, CardSuit.Diamonds),
        new Card(CardValue.Queen, CardSuit.Clubs),
        new Card(CardValue.Jack, CardSuit.Hearts),
        new Card(CardValue.Queen, CardSuit.Diamonds),
        new Card(CardValue.Three, CardSuit.Spades),
      ]);
      const hand = new Hand(cardSet);
      expect(hand.identicalValues).to.have.lengthOf(2);
      expect(hand.identicalValues).to.include.keys(CardValue.Queen);
      expect(hand.identicalValues).to.include.keys(CardValue.Three);
    });
  });

  describe('#hasAllConsecutiveValues', function() {
    it('should return true if card values are all consecutive', function() {
      const straight = new CardSet([
        new Card(CardValue.Three, CardSuit.Diamonds),
        new Card(CardValue.Four, CardSuit.Clubs),
        new Card(CardValue.Six, CardSuit.Hearts),
        new Card(CardValue.Five, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Spades),
      ]);
      const straightLowAce = new CardSet([
        new Card(CardValue.Three, CardSuit.Diamonds),
        new Card(CardValue.Four, CardSuit.Clubs),
        new Card(CardValue.Ace, CardSuit.Hearts),
        new Card(CardValue.Five, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Spades),
      ]);
      const hand = new Hand(straight);
      const handLowAce = new Hand(straightLowAce);
      expect(hand.hasAllConsecutiveValues).to.be.true;
      expect(handLowAce.hasAllConsecutiveValues).to.be.true;
    });

    it('should return false if card values are not all consecutive', function() {
      const straight = new CardSet([
        new Card(CardValue.Seven, CardSuit.Diamonds),
        new Card(CardValue.Four, CardSuit.Clubs),
        new Card(CardValue.Six, CardSuit.Hearts),
        new Card(CardValue.Five, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Spades),
      ]);
      const straightLowAce = new CardSet([
        new Card(CardValue.Three, CardSuit.Diamonds),
        new Card(CardValue.Four, CardSuit.Clubs),
        new Card(CardValue.Ace, CardSuit.Hearts),
        new Card(CardValue.Two, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Spades),
      ]);
      const hand = new Hand(straight);
      const handLowAce = new Hand(straightLowAce);
      expect(hand.hasAllConsecutiveValues).to.be.false;
      expect(handLowAce.hasAllConsecutiveValues).to.be.false;
    });
  });

  describe('#hasAllSameSuit', function() {
    it('should return true if cards are all of the same suit', function() {
      const cardSet = new CardSet([
        new Card(CardValue.King, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Diamonds),
        new Card(CardValue.Jack, CardSuit.Diamonds),
        new Card(CardValue.Queen, CardSuit.Diamonds),
        new Card(CardValue.Three, CardSuit.Diamonds),
      ]);
      const hand = new Hand(cardSet);
      expect(hand.hasAllSameSuit).to.be.true;
    });

    it('should return false if cards are not all of the same suit', function() {
      const cardSet = new CardSet([
        new Card(CardValue.King, CardSuit.Diamonds),
        new Card(CardValue.Two, CardSuit.Diamonds),
        new Card(CardValue.Jack, CardSuit.Spades),
        new Card(CardValue.Queen, CardSuit.Diamonds),
        new Card(CardValue.Three, CardSuit.Diamonds),
      ]);
      const hand = new Hand(cardSet);
      expect(hand.hasAllSameSuit).to.be.false;
    });
  });
});
