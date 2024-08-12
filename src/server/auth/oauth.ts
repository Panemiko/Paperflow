import { env } from "@/env";
import { Google } from "arctic";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia } from ".";
import { db } from "../db";
import { users } from "../db/schema";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.NEXT_PUBLIC_URL}/api/auth/google/callback`,
);

export async function createUser(params: {
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
}) {
  const existingUser = await db.query.users.findFirst({
    where: and(eq(users.email, params.email), eq(users.emailVerified, true)),
  });

  if (existingUser) {
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/app",
      },
    });
  }

  const [newUser] = await db
    .insert(users)
    .values({
      email: params.email,
      emailVerified: params.emailVerified,
      firstName: params.firstName,
      lastName: params.lastName,
    })
    .onConflictDoNothing()
    .returning({
      id: users.id,
    });

  if (!newUser) {
    throw new Error("Failed to create user");
  }

  const session = await lucia.createSession(newUser?.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/app",
    },
  });
}
