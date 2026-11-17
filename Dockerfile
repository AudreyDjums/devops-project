FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --omit=dev

COPY backend/ .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]