FROM alpine

COPY database /root/.database

COPY youtube_api_key /root/.youtube_api_key

RUN apk add curl

WORKDIR /app

COPY . .

CMD ls -la
