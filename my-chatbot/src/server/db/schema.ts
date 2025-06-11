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
  pgEnum,
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
    id: d.varchar({ length: 256 }).primaryKey(),
    chatId: d.varchar({ length: 256 }).notNull(),
    role: d.varchar({ length: 256 }),
    createdAt: d.timestamp({ withTimezone: true }),
    parts: jsonb("parts").notNull(),
    content: d.text().notNull(),
  }),
  (t) => [
    foreignKey({ columns: [t.chatId], foreignColumns: [userSession.id] }),
  ],
);

export const userSession = createTable("user-sessions-table", (d) => ({
  id: d.varchar({ length: 256 }).primaryKey(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));
