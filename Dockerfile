FROM node:14.15.0-alpine

WORKDIR /home/app

COPY package*.json .
COPY . .

RUN npm i

EXPOSE 3435
