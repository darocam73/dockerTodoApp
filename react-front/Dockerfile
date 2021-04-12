FROM node:14

WORKDIR /react-front

COPY /react-front/package.json .

RUN npm install

RUN npm rebuild node-sass

COPY /react-front .

EXPOSE 3000

CMD [ "npm", "start" ]