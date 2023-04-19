FROM node:slim

WORKDIR /app

RUN apt update
RUN apt install -y libdrm2 libnss3 libatk1.0-0 libatk-bridge2.0-0 libasound2 libcairo2 && \
    apt install -y libcups2 libxcomposite1 libxdamage1 libx11-xcb1 libdbus-1-3 libexpat1 && \
    apt install -y libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 && \
    apt install -y libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 && \
    apt install -y libxcursor1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 && \
    rm -rf /var/lib/apt/lists/*
RUN apt update && apt install -y chromium

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

RUN chmod +x ./commands.sh

# node dist/scraper.js && 
CMD /wait && ./commands.sh
