FROM node:10-alpine

RUN mkdir -p /home/node/node_modules && chown -R node:node /home/node/
WORKDIR /home/node/

USER node
COPY ./package.json ./
RUN npm install
COPY --chown=node:node ./dist ./dist

ENTRYPOINT [ "node", "./dist/cli.js" ]
