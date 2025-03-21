import { z } from "zod";

export const idSchema = z.string().cuid2().min(1);

export const userSchema = z.object({
  email: z.string().trim().email().min(1).max(255),
});

export const otpCodeSchema = z.string().trim().length(6).toUpperCase();

export const paperSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(2048),
});

export const branchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(32)
    .regex(/^[a-zA-Z0-9_-]+$/),
});
