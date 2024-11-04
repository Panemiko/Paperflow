import { authentication, lucia } from "@/server/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse(undefined, {
      status: 405,
    });
  }

  const auth = await authentication();

  if (!auth?.session) {
    return new NextResponse(undefined, { status: 401 });
  }

  await lucia.invalidateSession(auth.session.id);

  const blankSession = lucia.createBlankSessionCookie();
  cookies().set(blankSession.name, blankSession.value, blankSession.attributes);

  return new NextResponse(undefined, { status: 200 });
}
