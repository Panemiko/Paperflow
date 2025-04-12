import { sql } from "drizzle-orm";
import { db } from "./src/server/db/index";

async function truncateDatabase(): Promise<void> {
  const ignoreUsers = process.env.IGNORE_USERS === "true";

  const query = sql<string>`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `;

  const tables = await db.execute(query); // retrieve tables

  for (const table of tables) {
    if (
      ignoreUsers &&
      (table.table_name === "paperflow_users" ||
        table.table_name === "paperflow_sessions" ||
        table.table_name === "paperflow_accounts" ||
        table.table_name === "paperflow_verifications")
    ) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query); // Truncate (clear all the data) the table
  }
}

void truncateDatabase();
