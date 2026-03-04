FROM node:22-slim

RUN apt-get update && apt-get install -y yt-dlp ffmpeg && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

RUN mkdir -p /tmp/ytsnatch

EXPOSE 4000
CMD ["pnpm", "start"]