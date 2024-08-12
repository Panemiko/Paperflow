import { createUser, google } from "@/server/auth/oauth";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

interface GoogleUser {
  email: string;
  email_verified: boolean;
  name: string;
  sub: string;
}

export async function GET(req: Request) {
  const stateCookie = cookies().get("google_state")?.value;
  const codeVerifierCookie = cookies().get("google_code_verifier")?.value;

  const url = new URL(req.url);

  const state = url.searchParams.get("state");

  const code = url.searchParams.get("code");

  if (!code || !stateCookie || !codeVerifierCookie || state !== stateCookie) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      codeVerifierCookie,
    );

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const googleUser = (await response.json()) as GoogleUser;

    if (!googleUser) {
      throw new Error("Failed to fetch user data");
    }

    const splittedName = googleUser.name.split(" ");

    return await createUser({
      email: googleUser.email,
      emailVerified: googleUser.email_verified,
      firstName: splittedName.slice(0, -1).join(" "),
      lastName: splittedName.at(-1)!,
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
