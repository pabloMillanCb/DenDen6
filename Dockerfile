FROM node:21.4-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install && npm update

COPY src/. ./

COPY test/. ./

CMD ["npm", "run", "test"]