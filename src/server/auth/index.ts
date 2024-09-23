import { env } from "@/env";
import { publicUserSchema } from "@/lib/schemas";
import {
  DrizzlePostgreSQLAdapter,
  type PostgreSQLSessionTable,
} from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "../db";
import { sessionsTable, usersTable } from "../db/schema";

const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionsTable as unknown as PostgreSQLSessionTable,
  usersTable,
);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"), // 2 weeks
  sessionCookie: {
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production", // set `Secure` flag in HTTPS
    },
  },
  getUserAttributes(ogUser) {
    return publicUserSchema.omit({ id: true }).parse(ogUser);
  },
});

export const authentication = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}

  return { user, session };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: typeof usersTable.$inferSelect;
  }
}
