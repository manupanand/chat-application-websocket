FROM node:20-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 2500

CMD [ "npm","run","server" ]