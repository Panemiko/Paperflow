// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
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
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdByUserId: varchar("created_by_user_id", { length: 256 }).references(
    () => users.id,
  ),
  mainBranchId: varchar("main_branch_id", { length: 256 }).references(
    (): AnyPgColumn => branches.id,
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
  name: text("name").notNull(),
  ownerId: varchar("owner_id", { length: 256 })
    .notNull()
    .references(() => users.id),
  paperId: varchar("paper_id", { length: 256 })
    .notNull()
    .references(() => papers.id),
  content: json("content").notNull(),
  isEditable: boolean("is_editable").notNull(),
});

export const snapshots = createTable("snapshots", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  madeByUserId: varchar("made_by_user_id", { length: 256 })
    .notNull()
    .references(() => users.id),
  changes: json("changes").notNull(),
  branchId: varchar("branch_id", { length: 256 })
    .notNull()
    .references(() => branches.id),
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
  userId: varchar("user_id", { length: 256 })
    .notNull()
    .references(() => users.id),
  branchId: varchar("branch_id", { length: 256 })
    .notNull()
    .references(() => branches.id),
});

// Define relations for users table
export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions, { relationName: "user_sessions" }),
  accounts: many(accounts, { relationName: "user_accounts" }),
  papers: many(papers, { relationName: "created_papers" }),
  branches: many(branches, { relationName: "owned_branches" }),
  snapshots: many(snapshots, { relationName: "created_snapshots" }),
  decoupledBranches: many(decoupledBranch, {
    relationName: "user_decoupled_branches",
  }),
}));

// Define relations for sessions table
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
    relationName: "user_sessions",
  }),
}));

// Define relations for accounts table
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
    relationName: "user_accounts",
  }),
}));

// Define relations for papers table
export const papersRelations = relations(papers, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [papers.createdByUserId],
    references: [users.id],
    relationName: "created_papers",
  }),
  mainBranch: one(branches, {
    fields: [papers.mainBranchId],
    references: [branches.id],
    relationName: "paper_main_branch",
  }),
  branches: many(branches, {
    relationName: "paper_branches",
  }),
}));

// Define relations for branches table
export const branchesRelations = relations(branches, ({ one, many }) => ({
  paper: one(papers, {
    fields: [branches.paperId],
    references: [papers.id],
    relationName: "paper_branches",
  }),
  owner: one(users, {
    fields: [branches.ownerId],
    references: [users.id],
    relationName: "owned_branches",
  }),
  snapshots: many(snapshots, { relationName: "branch_snapshots" }),
  decoupledBranches: many(decoupledBranch, {
    relationName: "branch_decoupled",
  }),
  mainBranchForPaper: one(papers, {
    fields: [branches.id],
    references: [papers.mainBranchId],
    relationName: "paper_main_branch",
  }),
}));

// Define relations for snapshots table
export const snapshotsRelations = relations(snapshots, ({ one, many }) => ({
  branch: one(branches, {
    fields: [snapshots.branchId],
    references: [branches.id],
    relationName: "branch_snapshots",
  }),
  madeBy: one(users, {
    fields: [snapshots.madeByUserId],
    references: [users.id],
    relationName: "created_snapshots",
  }),
  parentSnapshot: one(snapshots, {
    fields: [snapshots.parentSnapshotId],
    references: [snapshots.id],
    relationName: "child_snapshots",
  }),
  parentSnapshot2: one(snapshots, {
    fields: [snapshots.parentSnapshotId2],
    references: [snapshots.id],
    relationName: "child_snapshots2",
  }),
  childSnapshots: many(snapshots, { relationName: "child_snapshots" }),
  childSnapshots2: many(snapshots, { relationName: "child_snapshots2" }),
}));

// Define relations for decoupled branches table
export const decoupledBranchRelations = relations(
  decoupledBranch,
  ({ one }) => ({
    user: one(users, {
      fields: [decoupledBranch.userId],
      references: [users.id],
      relationName: "user_decoupled_branches",
    }),
    branch: one(branches, {
      fields: [decoupledBranch.branchId],
      references: [branches.id],
      relationName: "branch_decoupled",
    }),
  }),
);
