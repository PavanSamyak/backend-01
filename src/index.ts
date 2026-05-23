import { Elysia, status, t } from "elysia";
import openapi from "@elysia/openapi";
import { db } from "./db";
import { logger, todos } from "./db/schema/ main";

const app = new Elysia();

const jsonic = {
  key: "I'm up baby!",
};

async function logIt(name: string) {
  await db.insert(logger).values({
    who: name,
  });
}

async function createTask(newTask: {
  title: string;
  description: string;
  status: number;
}) {
  return await db
    .insert(todos)
    .values({
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    })
    .returning();
}

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
  .post(
    "/logger",
    (context) => {
      const userIp = context.server?.requestIP(context.request)?.address;
      const userName = context.body.name;
      const who = userName + userIp;
      logIt(who);
      return `you just got noted ${userName}, your ip is ${userIp}!`;
    },
    {
      body: t.Object({
        name: t.String(),
        ip: t.Any(),
      }),
    },
  )
  .listen(8080, ({ hostname, port }) => {
    console.log(`backend is running on http://${hostname}:${port}`);
  });

app
  .post(
    "/api/v1/todo",
    async ({ body, set }) => {
      const newTask = {
        title: body.title,
        description: body.description,
        status: body.status,
      };
      let returned = await createTask(newTask);
      set.status = 201;
      console.log(returned);
      return `created ${body.title}`;
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        status: t.Number({ default: 0 }),
      }),
    },
  )
  .get("/api/v1/todos", async () => {
    return await db.select().from(todos);
  })
  .listen(8080, ({ hostname, port }) => {
    console.log(`backend is running on http://${hostname}:${port}`);
  });
