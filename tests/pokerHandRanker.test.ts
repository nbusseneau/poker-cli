import 'mocha';
import { expect } from 'chai';
import { Card, CardValue, CardSuit } from '../src/poker/Card';
import CardSet from '../src/poker/CardSet';
import Hand from '../src/poker/Hand';
import { PokerHandType, PokerHandRanker } from '../src/poker/PokerHandRanker';

describe('PokerHandRanker', function() {
  const highCard = new Hand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const onePair = new Hand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const twoPairs = new Hand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const threeOfAKind = new Hand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const straight1 = new Hand(new CardSet([
    new Card(CardValue.Four, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Five, CardSuit.Hearts),
    new Card(CardValue.Six, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const straight2 = new Hand(new CardSet([
    new Card(CardValue.Four, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Five, CardSuit.Hearts),
    new Card(CardValue.Ace, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const flush = new Hand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Jack, CardSuit.Diamonds),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Diamonds),
  ]));

  const fullHouse = new Hand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const fourOfAKind = new Hand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const straightflush = new Hand(new CardSet([
    new Card(CardValue.Four, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Five, CardSuit.Diamonds),
    new Card(CardValue.Six, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Diamonds),
  ]));

  const royalFlush = new Hand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Ace, CardSuit.Diamonds),
    new Card(CardValue.Jack, CardSuit.Diamonds),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Ten, CardSuit.Diamonds),
  ]));

  describe('.rank()', function() {
    it('should return a poker hand with the proper rank', function() {
      expect(PokerHandRanker.rank(highCard)[0]).to.be.equal(PokerHandType.HighCard);
      expect(PokerHandRanker.rank(onePair)[0]).to.be.equal(PokerHandType.OnePair);
      expect(PokerHandRanker.rank(twoPairs)[0]).to.be.equal(PokerHandType.TwoPairs);
      expect(PokerHandRanker.rank(threeOfAKind)[0]).to.be.equal(PokerHandType.ThreeOfAKind);
      expect(PokerHandRanker.rank(straight1)[0]).to.be.equal(PokerHandType.Straight);
      expect(PokerHandRanker.rank(straight2)[0]).to.be.equal(PokerHandType.Straight);
      expect(PokerHandRanker.rank(flush)[0]).to.be.equal(PokerHandType.Flush);
      expect(PokerHandRanker.rank(fullHouse)[0]).to.be.equal(PokerHandType.FullHouse);
      expect(PokerHandRanker.rank(fourOfAKind)[0]).to.be.equal(PokerHandType.FourOfAKind);
      expect(PokerHandRanker.rank(straightflush)[0]).to.be.equal(PokerHandType.Straightflush);
      expect(PokerHandRanker.rank(royalFlush)[0]).to.be.equal(PokerHandType.RoyalFlush);
    });

    it('should return a poker hand with the proper tiebreaker', function() {
      expect(PokerHandRanker.rank(highCard)[1][0].value).to.be.deep.equal(CardValue.King);
      expect(PokerHandRanker.rank(onePair)[1][0].value).to.be.deep.equal(CardValue.Two);
      expect(PokerHandRanker.rank(twoPairs)[1][0].value).to.be.deep.equal(CardValue.Three);
      expect(PokerHandRanker.rank(threeOfAKind)[1][0].value).to.be.deep.equal(CardValue.Three);
      expect(PokerHandRanker.rank(straight1)[1][0].value).to.be.deep.equal(CardValue.Six);
      expect(PokerHandRanker.rank(straight2)[1][0].value).to.be.deep.equal(CardValue.Five);
      expect(PokerHandRanker.rank(flush)[1][0].value).to.be.deep.equal(CardValue.King);
      expect(PokerHandRanker.rank(fullHouse)[1][0].value).to.be.deep.equal(CardValue.Three);
      expect(PokerHandRanker.rank(fourOfAKind)[1][0].value).to.be.deep.equal(CardValue.Three);
      expect(PokerHandRanker.rank(straightflush)[1][0].value).to.be.deep.equal(CardValue.Six);
    });
  });
});
