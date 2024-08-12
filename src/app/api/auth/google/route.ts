import { env } from "@/env";
import { google } from "@/server/auth/oauth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  cookies().set("google_state", state, {
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
  });

  cookies().set("google_code_verifier", codeVerifier, {
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
  });

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  return Response.redirect(url, 302);
}
