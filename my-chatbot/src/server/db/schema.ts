// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  jsonb,
  foreignKey,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import type { Message } from "ai";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `my-chatbot_${name}`);

export const messagesTable = createTable(
  "messagesTable",
  (d) => ({
    id: d.integer().primaryKey(),
    chatId: d.varchar({ length: 256 }).notNull(),
    role: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    parts: jsonb("parts").notNull(),
    content: d.text().notNull(),
  }),
  (t) => [
    foreignKey({ columns: [t.chatId], foreignColumns: [userSession.id] }),
  ],
);

export const userSession = createTable("user-sessions-table", (d) => ({
  id: d.varchar({ length: 255 }).primaryKey(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

/*
"id": "msgc-JB45KvXzHBbK48eI",
"createdAt": "2025-06-10T17:39:03.493Z",
"role": "user",
"content": "Hi",
"parts": [
  {
    "type": "text",
    "text": "Hi"
  }
]
  */
