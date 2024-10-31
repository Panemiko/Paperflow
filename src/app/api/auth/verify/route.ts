import { signInCodeSchema, userSchema } from "@/lib/schemas";
import { lucia } from "@/server/auth";
import { db } from "@/server/db";
import { signInCodesTable, usersTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function route(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse(undefined, {
      status: 405,
    });
  }

  const { code, email } = await userSchema
    .pick({ email: true })
    .merge(signInCodeSchema.pick({ code: true }))
    .parseAsync(await req.json());

  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (!existingUser) {
    return new NextResponse(undefined, { status: 409 });
  }

  const existingCode = await db.query.signInCodesTable.findFirst({
    where: and(
      eq(signInCodesTable.userId, existingUser.id),
      eq(signInCodesTable.code, code),
    ),
  });

  if (!existingCode || existingCode?.expiresAt.getTime() < Date.now()) {
    throw new NextResponse(undefined, { status: 409 });
  }

  await db.transaction(async (tx) => {
    await tx
      .update(usersTable)
      .set({
        emailVerified: true,
      })
      .where(eq(usersTable.id, existingUser.id));

    await tx
      .delete(signInCodesTable)
      .where(eq(signInCodesTable.id, existingCode.id));
  });

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return new NextResponse(undefined, { status: 200 });
}
