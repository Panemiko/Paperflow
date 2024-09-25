import { z } from "zod";

export const idSchema = z.string().trim().cuid2("Invalid ID");

export const paperPermissionRoleSchema = z.enum(["author"]);

export const paperPermissionFeatureSchema = z.enum([
  "commit",
  "review",
  "comment",
  "update_metadata",
  "invite",
  "delete",
]);

export const paperContentSchema = z.string();

export const userPasswordSchema = z
  .string()
  .trim()
  .min(8, "Min 8 characters")
  .max(100, "Max 100 characters");

export const userSignInCodeSchema = z.string().length(6);

export const userSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().trim().email(),
  emailVerified: z.boolean(),
  firstName: z
    .string()
    .trim()
    .min(1, "Mandatory")
    .max(30, "Max. 30 characters"),
  lastName: z.string().trim().min(1, "Mandatory").max(30, "Max. 30 characters"),
});

export const publicUserSchema = userSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
  emailVerified: true,
  firstName: true,
  lastName: true,
});

export const signInCodeSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  userId: idSchema,
  code: z.string().length(6),
  expiresAt: z.date(),
});

export const paperSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string().trim().min(1, "Mandatory").max(100, "Max. 100 characters"),
  abstract: z.string().trim().max(5000, "Max. 5000 characters").nullable(),
});

export const paperPermissionsSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  paperId: idSchema,
  userId: idSchema,
  role: paperPermissionRoleSchema,
});

export const commitChangeSchema = z.unknown();

export const commitSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  paperId: idSchema,
  message: z.string().min(1, "Mandatory").max(100, "Max. 100 characters"),
  description: z.string().max(500, "Max. 500 characters").nullable(),
  changes: commitChangeSchema,
  userId: idSchema,
});
