FROM node:14

WORKDIR /node-back

COPY /node-back/package.json .

RUN npm install

COPY /node-back .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]