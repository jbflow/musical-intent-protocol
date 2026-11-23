FROM node:26-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "-e", "console.log('Musical Intent Protocol library ready')"]
