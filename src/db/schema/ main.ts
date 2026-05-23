import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const logger = sqliteTable("logger", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  accessed_at: integer()
    .notNull()
    .$default(() => Date.now()),
});
