FROM node:26-alpine

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY schema ./schema
COPY tsconfig.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "-e", "console.log('Musical Intent Protocol library ready')"]
