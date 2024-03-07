FROM denoland/deno:1.41.1

ADD . /app
WORKDIR /app

RUN deno cache deps.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./src/bot/bot.ts"]