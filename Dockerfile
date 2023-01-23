FROM node
WORKDIR /app
COPY ./package.json ./
RUN npm install -y
ADD . .
CMD node ./server.js
