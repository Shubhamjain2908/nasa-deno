import { Application, send } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const app = new Application();
const PORT = 8080;

app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${end}ms`);
});

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index/html",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/images/favicon.png",
  ];
  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

app.use(async (ctx, next) => {
  ctx.response.body = "CKMB";
  await next();
});

console.log(`Server running on port ${PORT}`);

await app.listen({
  port: PORT,
});
