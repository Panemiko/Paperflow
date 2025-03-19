// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  json,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `paperflow_${name}`);

// authentication related

export const users = createTable("users", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
});

export const sessions = createTable("sessions", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = createTable("accounts", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
});

export const verifications = createTable("verifications", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// papers and versioning related

export const papers = createTable("papers", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const branches = createTable("branches", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  ownerId: varchar("owner_id", { length: 256 }).references(() => users.id),
  paperId: varchar("paper_id", { length: 256 }).references(() => papers.id),
  content: json("content").notNull(),
});

export const snapshots = createTable("snapshots", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  madeByUserId: varchar("made_by_user_id", { length: 256 }).references(
    () => users.id,
  ),
  changes: json("changes").notNull(),
  branchId: varchar("branch_id", { length: 256 }).references(() => branches.id),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 2048 }).notNull(),
  parentSnapshotId: varchar("parent_snapshot_id", { length: 256 }).references(
    (): AnyPgColumn => snapshots.id,
  ),
  parentSnapshotId2: varchar("parent_snapshot_id_2", {
    length: 256,
  }).references((): AnyPgColumn => snapshots.id),
});

export const decoupledBranch = createTable("decoupled_branches", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  user: varchar("user", { length: 256 })
    .notNull()
    .references(() => users.id),
  branchId: varchar("branch_id", { length: 256 })
    .notNull()
    .references(() => branches.id),
});
