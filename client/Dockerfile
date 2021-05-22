FROM node:12-stretch
ENV CLIENT /usr/src/client
WORKDIR $CLIENT/api/
COPY package*.json $CLIENT/api/
RUN npm ci
COPY . $CLIENT/api/