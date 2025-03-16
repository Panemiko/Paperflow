// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  json,
  pgTableCreator,
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

export const usersTable = createTable("users", {
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

export const papersTable = createTable("papers", {
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

export const branchesTable = createTable("branches", {
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
  ownerId: varchar("owner_id", { length: 256 }).references(() => usersTable.id),
  paperId: varchar("paper_id", { length: 256 }).references(
    () => papersTable.id,
  ),
  content: json("content").notNull(),
});

export const snapshotsTable = createTable("snapshots", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  madeByUserId: varchar("made_by_user_id", { length: 256 }).references(
    () => usersTable.id,
  ),
  changes: json("changes").notNull(),
  branchId: varchar("branch_id", { length: 256 }).references(
    () => branchesTable.id,
  ),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 2048 }).notNull(),
  parentSnapshotId: varchar("parent_snapshot_id", { length: 256 }).references(
    (): AnyPgColumn => snapshotsTable.id,
  ),
  parentSnapshotId2: varchar("parent_snapshot_id_2", {
    length: 256,
  }).references((): AnyPgColumn => snapshotsTable.id),
});

export const decoupledBranchTable = createTable("decoupled_branches", {
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
    .references(() => usersTable.id),
  branchId: varchar("branch_id", { length: 256 })
    .notNull()
    .references(() => branchesTable.id),
});
