FROM mhart/alpine-node

WORKDIR /src
ADD . .

RUN npm install -g forever

EXPOSE 8080
CMD NODE_ENV=prod forever index.js
