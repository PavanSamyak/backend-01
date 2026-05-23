import { db } from ".";
import { logger } from "./schema/ main";

async function loghim() {
  await db.insert(logger).values({
    who: "me this time",
  });
}

loghim();
