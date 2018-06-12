# ========================== Base Image ==========================
FROM node:8 AS base

LABEL maintainer="douglas.expalves@gmail.com"

# RUN apk update && apk add --no-cache nodejs && rm -rf /var/cache/apk/*

RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb && npm i npm@latest -g

# ========================== Build Image ==========================
FROM alpine:3.4 AS builder

RUN apk update && apk add --no-cache nodejs && rm -rf /var/cache/apk/* && mkdir /blu365-crawler

COPY ./package.json ./blu365-crawler/package.json

WORKDIR /blu365-crawler

RUN npm install --silent

COPY . .

RUN npm run build

# ========================== Runtime Image ==========================
FROM base AS runtime

RUN mkdir -p /blu365-crawler/dist

COPY ./package.json ./blu365-crawler/package.json

WORKDIR /blu365-crawler/

COPY --from=builder /blu365-crawler/dist ./dist/

COPY --from=builder /blu365-crawler/api-data.json ./

RUN npm install --production --silent

ENTRYPOINT ["npm", "start"]