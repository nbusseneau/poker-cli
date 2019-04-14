# Poker hand ranking and comparison

Following [Texas Hold'em rules](https://en.wikipedia.org/wiki/Texas_hold_%27em#Hand_values).

## Prerequisites

- Make sure `npm` is available. If not, install [Node.js](https://nodejs.org/).
- Make sure `tsc` is available. If not install [TypeScript](https://www.typescriptlang.org/): `npm install -g typescript`
- Install dependencies: `npm install`

## Running app

### Docker Node.js

- Make sure `docker` is available. If not, install [Docker](https://docs.docker.com/install/).
- Build image: `npm run build:docker`
- Run app and see usage: `docker run poker-cli`
- Example: `docker run poker-cli compare "TS JS QS KS AS" "KS 2H 2D JD TD"`

### Local Node.js

- Build app: `npm run build`
- Install app: `npm install -g .`
- Run app and see usage: `poker-cli`
- Example: `poker-cli compare "TS JS QS KS AS" "KS 2H 2D JD TD"`

## Running tests

- No build required (tests are ran directly through `ts-node`).
- Run tests: `npm run test`

## Potential improvements

- Tests are not actually unit tests. No mocking was done to isolate units, we directly use interconnected objects/methods, so these are more like integration tests (if something breaks somewhere, a whole lot of tests are going to break).
- Hand ranking could be optimized further by reversing the algorithm: right now we test a hand against each hand type ruleset in order from highest to lowest rank to determine its type (this has already been sped up thanks to precomputation of values, see `Hand` class). It would be faster to pre-filter which hand type to test depending on these values (e.g. if we know we have no identical values thanks to the precomputation, don't bother checking hand types with rulesets with identical values).
