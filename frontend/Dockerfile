FROM node:20-alpine

RUN npm install -g @angular/cli

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY ./frontend ./

RUN ng build --prod

RUN npm install http-server --save-dev

EXPOSE 4200

CMD ["npx", "http-server", "dist/frontend", "-p", "4200"]
