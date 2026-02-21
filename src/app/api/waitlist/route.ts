import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = waitlistSchema.parse(body);

    // Insert to database
    try {
      await db.insert(waitlist).values({ email });
    } catch (dbError: any) {
      if (
        dbError.message?.includes("unique constraint") ||
        dbError.cause?.message?.includes("unique constraint")
      ) {
        return NextResponse.json(
          { error: "This email is already on the waitlist!" },
          { status: 409 },
        );
      }
      throw dbError;
    }

    // Send Discord webhook notification
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (DISCORD_WEBHOOK_URL) {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `🎉 New waitlist registration: **${email}**`,
          }),
        });
      } catch (webhookError) {
        console.error("Failed to send webhook:", webhookError);
        // We don't want to fail the request to the user if webhook fails
      }
    }

    return NextResponse.json(
      { message: "Successfully registered on the waitlist!" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
