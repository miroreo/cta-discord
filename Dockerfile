FROM denoland/deno:1.40.0

ADD . /app
WORKDIR /app

RUN deno cache deps.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]