FROM node:21.4-alpine

WORKDIR /src

COPY package*.json ./

RUN apk add curl && npm install && npm update

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "start"]