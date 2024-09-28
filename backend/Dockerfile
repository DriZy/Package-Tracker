FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && \
     npm install bcryptjs

COPY . .

RUN npm run build

CMD ["npm", "start"]