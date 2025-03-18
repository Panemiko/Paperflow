import { db } from "@/server/db"; // your drizzle instance
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    emailOTP({
      otpLength: 6,
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`Sending OTP ${otp} to ${email} for ${type}`);
      },
    }),
    nextCookies(), // next cookies should be the last in the array
  ],
});
