import { env } from "@/env";
import SignInEmail from "emails/sign-in";
import { generate } from "randomstring";
import { db } from "../db";
import { signInCodesTable } from "../db/schema";
import { resend } from "../email";

export async function sendSignInCode(user: { email: string; id: string }) {
  const randomCode = generate({
    length: 6,
    charset: "numeric",
  });

  await db.insert(signInCodesTable).values({
    code: randomCode,
    userId: user.id,
    expiresAt: new Date(Date.now() + 60 * 10 * 1000), // 10 minutes
  });

  if (env.NODE_ENV === "production") {
    const { error } = await resend.emails.send({
      from: `Accounts Paperflow <accounts@${env.RESEND_DOMAIN}>`,
      subject: "Sign in Paperflow",
      to: env.NODE_ENV === "production" ? user.email : "delivered@resend.dev",
      text: `Your sign in code form Paperflow is ${randomCode}`,
      react: SignInEmail({
        code: randomCode,
      }),
    });

    return !!error;
  }

  if (env.NODE_ENV === "development") {
    console.log(`Sign in code for ${user.email}: ${randomCode}`);
  }
}
