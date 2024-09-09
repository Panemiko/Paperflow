// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  json,
  pgTableCreator,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `paperflow_${name}`);

export const usersTable = createTable("users", {
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

export const sessionsTable = createTable("sessions", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const signInCodesTable = createTable("sign_in_codes", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  code: text("code").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const papersTable = createTable("papers", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
  abstract: text("abstract"),
  ownerId: text("owner_id")
    .notNull()
    .references(() => usersTable.id),
});

export const sectionsTable = createTable("sections", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at")
    .notNull()
    .$default(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
  title: text("title"),
  paperId: text("paper_id")
    .notNull()
    .references(() => papersTable.id),
});

export const commitsTable = createTable(
  "commits",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
    sectionId: text("section_id")
      .notNull()
      .references(() => sectionsTable.id),
    message: text("message").notNull(),
    description: text("description"),
    changes: json("changes").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => {
    return {
      lastAppliedCommitId: text("last_applied_commit_id").references(
        () => table.id,
      ),
    };
  },
);
