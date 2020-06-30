FROM hayd/deno:alpine-1.1.1

WORKDIR /app

COPY . .

USER deno

CMD [ "run", "--allow-read", "--allow-net", "src/mod.ts" ]

EXPOSE 8080