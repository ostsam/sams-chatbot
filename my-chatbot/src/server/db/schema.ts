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
  pgTable,
  text,
  boolean,
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
    messageId: d.varchar({ length: 256 }).primaryKey(),
    chatId: d.varchar({ length: 256 }).notNull(),
    role: d.varchar({ length: 256 }),
    createdAt: d.timestamp({ withTimezone: true }),
    parts: jsonb("parts").notNull(),
    content: d.text().notNull(),
  }),
  (t) => [
    foreignKey({ columns: [t.chatId], foreignColumns: [userSession.chatId] }),
  ],
);

export const userSession = createTable("user-sessions-table", (d) => ({
  chatId: d.varchar({ length: 256 }).primaryKey(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  userId: d.varchar({ length: 256 }),
}));

export const user = pgTable("user", {
id: text('id').primaryKey(),
name: text('name').notNull(),
email: text('email').notNull().unique(),
emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
image: text('image'),
createdAt: timestamp('created_at').$defaultFn(() => new Date()).notNull(),
updatedAt: timestamp('updated_at').$defaultFn(() => new Date()).notNull()
				});

export const session = pgTable("session", {
					id: text('id').primaryKey(),
					expiresAt: timestamp('expires_at').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 ipAddress: text('ip_address'),
 userAgent: text('user_agent'),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
				});

export const account = pgTable("account", {
					id: text('id').primaryKey(),
					accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
 accessToken: text('access_token'),
 refreshToken: text('refresh_token'),
 idToken: text('id_token'),
 accessTokenExpiresAt: timestamp('access_token_expires_at'),
 refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
 scope: text('scope'),
 password: text('password'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
				});

export const verification = pgTable("verification", {
					id: text('id').primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at').$defaultFn(() => new Date()),
 updatedAt: timestamp('updated_at').$defaultFn(() => new Date())
				});
