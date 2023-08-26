FROM node:lts-bookworm

# The port that your application listens to.
EXPOSE ${API_PORT} 

WORKDIR /app

# Add the wait script to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

# Install and cache project dependencies
COPY package.json ./

RUN npm i

# Copy project files 
COPY . .

CMD /wait && npm run build && npm run start 
