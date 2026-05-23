import { Elysia } from "elysia";
import openapi from "@elysia/openapi";

const app = new Elysia();

app
  .use(openapi())
  .get("/", () => {
    return "hello from server";
  })
  .listen(3000);

console.log(`${app.server}:`);
