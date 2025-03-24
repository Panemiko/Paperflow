// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import {
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
  description: text("description"),
  createdByUserId: varchar("created_by_user_id", { length: 256 }),
  mainBranchId: varchar("main_branch_id", { length: 256 }),
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
  content: json("content").notNull(),
  isEditable: boolean("is_editable").notNull(),
  ownerId: varchar("owner_id", { length: 256 }).notNull(),
  paperId: varchar("paper_id", { length: 256 }).notNull(),
  referencesCommitId: varchar("last_commit_id", { length: 256 }),
});

export const commits = createTable("commits", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 2048 }).notNull(),
  changes: json("changes").notNull(),
  madeByUserId: varchar("made_by_user_id", { length: 256 }).notNull(),
  previousCommitId: varchar("previous_commit_id", { length: 256 }),
  mergeCommitId: varchar("merge_commit_id", { length: 256 }),
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
  content: json("content").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  branchId: varchar("branch_id", { length: 256 }).notNull(),
});

// Define relations after all tables are defined
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  createdPapers: many(papers, { relationName: "creator" }),
  ownedBranches: many(branches, { relationName: "owner" }),
  createdCommits: many(commits, { relationName: "author" }),
  decoupledBranches: many(decoupledBranch, { relationName: "decoupledUser" }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const papersRelations = relations(papers, ({ one, many }) => ({
  creator: one(users, {
    fields: [papers.createdByUserId],
    references: [users.id],
    relationName: "creator",
  }),
  mainBranch: one(branches, {
    fields: [papers.mainBranchId],
    references: [branches.id],
    relationName: "mainBranchFor",
  }),
  branches: many(branches, { relationName: "paperBranches" }),
}));

export const branchesRelations = relations(branches, ({ one, many }) => ({
  paper: one(papers, {
    fields: [branches.paperId],
    references: [papers.id],
    relationName: "paperBranches",
  }),
  owner: one(users, {
    fields: [branches.ownerId],
    references: [users.id],
    relationName: "owner",
  }),
  mainBranchFor: one(papers, {
    fields: [branches.id],
    references: [papers.mainBranchId],
    relationName: "mainBranchFor",
  }),
  referencedCommit: one(commits, {
    fields: [branches.referencesCommitId],
    references: [commits.id],
    relationName: "referencingBranches",
  }),
  decoupled: many(decoupledBranch, { relationName: "originalBranch" }),
}));

export const commitsRelations = relations(commits, ({ one, many }) => ({
  author: one(users, {
    fields: [commits.madeByUserId],
    references: [users.id],
    relationName: "author",
  }),
  previousCommit: one(commits, {
    fields: [commits.previousCommitId],
    references: [commits.id],
    relationName: "nextCommit",
  }),
  nextCommit: many(commits, { relationName: "nextCommit" }),
  mergeCommit: one(commits, {
    fields: [commits.mergeCommitId],
    references: [commits.id],
    relationName: "mergedFrom",
  }),
  mergedFrom: many(commits, { relationName: "mergedFrom" }),
  referencingBranches: many(branches, { relationName: "referencingBranches" }),
}));

export const decoupledBranchRelations = relations(
  decoupledBranch,
  ({ one }) => ({
    decoupledUser: one(users, {
      fields: [decoupledBranch.userId],
      references: [users.id],
      relationName: "decoupledUser",
    }),
    originalBranch: one(branches, {
      fields: [decoupledBranch.branchId],
      references: [branches.id],
      relationName: "originalBranch",
    }),
  }),
);
