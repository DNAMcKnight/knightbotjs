FROM node:22.11-slim

WORKDIR /app

COPY ./package.json .
COPY pnpm-lock.yaml .

RUN apt-get update -y
RUN apt-get upgrade -y

RUN npm install -g pnpm && pnpm install

COPY ./src ./src

CMD ["node", "./src/index.js"]
