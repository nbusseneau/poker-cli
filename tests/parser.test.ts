import 'mocha';
import { expect } from 'chai';
import { Parser, ParseError } from '../src/Parser';
import { Card, CardValue, CardSuit } from '../src/poker/Card';
import { PokerHandType } from '../src/poker/PokerHandRanker';

describe('Parser', function() {
  describe('.parse()', function() {
    it('should return a hand with the proper cards', function() {
      let hand = Parser.parse("KS 2H 5C JD TD");
      expect(hand.cards).to.deep.include(new Card(CardValue.King, CardSuit.Spades));
      expect(hand.cards).to.deep.include(new Card(CardValue.Two, CardSuit.Hearts));
      expect(hand.cards).to.deep.include(new Card(CardValue.Five, CardSuit.Clubs));
      expect(hand.cards).to.deep.include(new Card(CardValue.Jack, CardSuit.Diamonds));
      expect(hand.cards).to.deep.include(new Card(CardValue.Ten, CardSuit.Diamonds));
    });

    it ('should throw when providing a wrong hand format', function() {
      expect(() => Parser.parse("KS 2H 5C JD")).to.throw(ParseError);
      expect(() => Parser.parse("KS 2H 5C JD TD TD")).to.throw(ParseError);
    });

    it ('should throw when providing a wrong card format', function() {
      expect(() => Parser.parse("KS 2H 5C3 JD TD")).to.throw(ParseError);
      expect(() => Parser.parse("KS 2H 5 JD TD")).to.throw(ParseError);
    });

    it ('should throw when providing a wrong CardValue value', function() {
      expect(() => Parser.parse("KS 2H BC JD TD")).to.throw(ParseError);
      });

    it ('should throw when providing a wrong CardSuit value', function() {
      expect(() => Parser.parse("KS 2H 5Z JD TD")).to.throw(ParseError);
    });

    it('should return a poker hand with the proper rank', function() {
      expect(Parser.parse("KS 2H 5C JD TD").type).to.be.equal(PokerHandType.HighCard);
      expect(Parser.parse("KS 2H JC JD TD").type).to.be.equal(PokerHandType.OnePair);
      expect(Parser.parse("KS TH JC JD TD").type).to.be.equal(PokerHandType.TwoPairs);
      expect(Parser.parse("KS JH JC JD TD").type).to.be.equal(PokerHandType.ThreeOfAKind);
      expect(Parser.parse("6S 2H 5C 3D 4D").type).to.be.equal(PokerHandType.Straight);
      expect(Parser.parse("AS 2H 5C 3D 4D").type).to.be.equal(PokerHandType.Straight);
      expect(Parser.parse("KS 2S 5S JS TS").type).to.be.equal(PokerHandType.Flush);
      expect(Parser.parse("TS KH KC KD TD").type).to.be.equal(PokerHandType.FullHouse);
      expect(Parser.parse("JS JH JC JD TD").type).to.be.equal(PokerHandType.FourOfAKind);
      expect(Parser.parse("6D 2D 5D 3D 4D").type).to.be.equal(PokerHandType.Straightflush);
      expect(Parser.parse("KD QD TD AD JD").type).to.be.equal(PokerHandType.RoyalFlush);
    });

    it('should return a poker hand with the proper tiebreaker', function() {
      expect(Parser.parse("KS 2H 5C JD TD").tiebreaker[0].value).to.be.deep.equal(CardValue.King);
      expect(Parser.parse("KS 2H JC JD TD").tiebreaker[0].value).to.be.deep.equal(CardValue.Jack);
      expect(Parser.parse("KS TH JC JD TD").tiebreaker[0].value).to.be.deep.equal(CardValue.Jack);
      expect(Parser.parse("KS JH JC JD TD").tiebreaker[0].value).to.be.deep.equal(CardValue.Jack);
      expect(Parser.parse("6S 2H 5C 3D 4D").tiebreaker[0].value).to.be.deep.equal(CardValue.Six);
      expect(Parser.parse("AS 2H 5C 3D 4D").tiebreaker[0].value).to.be.deep.equal(CardValue.Five);
      expect(Parser.parse("KS 2S 5S JS TS").tiebreaker[0].value).to.be.deep.equal(CardValue.King);
      expect(Parser.parse("TS 6H 6C 6D TD").tiebreaker[0].value).to.be.deep.equal(CardValue.Six);
      expect(Parser.parse("KS JH JC JD JS").tiebreaker[0].value).to.be.deep.equal(CardValue.Jack);
      expect(Parser.parse("6D 2D 5D 3D 4D").tiebreaker[0].value).to.be.deep.equal(CardValue.Six);
    });
  });
});
