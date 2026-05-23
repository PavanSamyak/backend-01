import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const logger = sqliteTable("logger", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  accessed_at: integer()
    .notNull()
    .$default(() => Date.now()),
  who: text(),
});

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  title: text().notNull(),
  description: text(),
  status: integer().notNull().default(0),
});
