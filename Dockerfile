FROM denoland/deno:latest

ADD . /app
WORKDIR /app

RUN deno cache deps.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]