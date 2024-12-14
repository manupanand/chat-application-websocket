FROM node:20-alpine

WORKDIR /app

COPY package* .
COPY package-lock* .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]