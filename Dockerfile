FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --only=production=false

COPY src/ ./src/

RUN npx tsc

FROM node:20-alpine AS production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/lib ./lib

COPY fiapsub1-firebase-sdk.json ./

RUN echo "NODE_ENV=production" > .env && \
    echo "PORT=3000" >> .env && \
    echo "HOST=0.0.0.0" >> .env && \
    echo "FIREBASE_PROJECT_ID=fiapsub1" >> .env && \
    echo "GOOGLE_APPLICATION_CREDENTIALS=/app/fiapsub1-firebase-sdk.json" >> .env

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV FIREBASE_PROJECT_ID=fiapsub1
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/fiapsub1-firebase-sdk.json

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["node", "./lib/index.js"]
