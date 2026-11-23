FROM node:26-alpine

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY schema ./schema
COPY tsconfig.json ./

# For local development, node_modules come from docker-compose volume mount
# This just sets up the app structure
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "-e", "console.log('Musical Intent Protocol library ready')"]
