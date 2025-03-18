import { z } from "zod";

export const userSchema = z.object({
  email: z.string().trim().email().min(1).max(255),
});
