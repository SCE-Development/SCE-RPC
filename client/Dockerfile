FROM node:8.10.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY ./client /app/

COPY ./client/config/config.js /app/config/config.js

EXPOSE 8083

EXPOSE 50052

ENV DOCKER true

ENV NODE_ENV production

RUN ls

RUN ls api

CMD [ "node", "./api/SceRpcApiServer.js" ]

