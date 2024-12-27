FROM node:18-alpine
RUN apk update
RUN apk upgrade
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY package*.json .
RUN npm install
COPY index.js .
CMD ["node", "index.js"]
