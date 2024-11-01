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
import { eq } from "drizzle-orm";

export const auth = {
  sessionCookieName: "auth_token",
  sessionExpiresIn: new TimeSpan(2, "w"), // 2 weeks
  sessionCookie: {
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production", // set `Secure` flag in HTTPS
    },
  },
  getUserAttributes(user: typeof usersTable.$inferSelect) {
    return publicUserSchema.omit({ id: true }).parse(user);
  },
  validateSession: async (sessionId: string) => {
    const session = await db.query.sessionsTable.findFirst({
      where: eq(sessionsTable.id, sessionId),
    })

    const [data] = await db.select()
      .from(sessionsTable)
      .leftJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
      .where(eq(sessionsTable.id, sessionId))

    if (!data?.sessions || !data.users ) {
      return null
    }

    return {
      users: data?.users ?  auth.getUserAttributes(data?.users): undefined,
      session: data?.sessions
    }
  },
  authenticate : cache(async () => {
    const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null;
  
    if (!sessionId) return { user: null, session: null };
  
    const { user, session } = await auth.validateSession(sessionId);
    
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
};
