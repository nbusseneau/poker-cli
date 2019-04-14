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
