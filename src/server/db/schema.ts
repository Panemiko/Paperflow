// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  pgTableCreator,
  text,
  timestamp
} from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `paperflow_${name}`);

export const users = createTable("users", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
  email: text("email").unique().notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
});

export const sessions = createTable("sessions", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const signInCode = createTable("sign_in_code", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  code: text("code").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
