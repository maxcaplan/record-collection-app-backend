#
# Builder Stage
# Compiles typescript source to javascript
#
FROM node:18.17.1-bookworm AS builder

WORKDIR /usr/src/app/

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci && npm run build

#
# Production Stage
#
FROM node:18.17.1-bookworm

EXPOSE ${API_PORT} 

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

# Add the wait script to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

CMD /wait && npm run start 
