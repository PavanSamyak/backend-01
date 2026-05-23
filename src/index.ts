import { Elysia } from "elysia";
import openapi from "@elysia/openapi";

const app = new Elysia();

const jsonic = {
  key: "I'm up baby!",
};

app
  .use(openapi())
  .get("/", () => {
    return "system online";
  })
  .get("/api/v1/json", ({ set }) => {
    set.status = 200;
    set.headers = {
      "content-type": "application/json",
    };
    return jsonic;
  })
  .listen(8080, ({ hostname, port }) => {
    console.log(`backend is running on http://${hostname}:${port}`);
  });
