FROM node
WORKDIR /app
COPY ./package.json ./
ADD . .
RUN npm install
CMD node ./server.js
