FROM node:22.17-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY ./src ./src
COPY tsconfig.json ./
COPY eslint.config.mjs ./

EXPOSE 3000

CMD ["npm", "run", "start", "-L"]
