FROM node:12-stretch
ENV SERVER /usr/src/server
WORKDIR $SERVER/api/
COPY package*.json $SERVER/api/
RUN npm ci
COPY . $SERVER/api/