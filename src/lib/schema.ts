import { z } from "zod";

export const idSchema = z.string().cuid2().min(1);
export const timestampSchema = z.date().min(new Date(0));

export const otpCodeSchema = z.string().trim().length(6).toUpperCase();

export const baseModelSchema = z.object({
  id: idSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const userSchema = baseModelSchema.extend({
  name: z.string().trim().min(1).max(32),
  email: z.string().trim().email().min(1).max(255),
  emailVerified: z.boolean(),
  image: z.string(),
});

export const paperSchema = baseModelSchema.extend({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/),
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2048),
  createdByUserId: idSchema,
  mainBranchId: idSchema,
});

export const branchSchema = baseModelSchema.extend({
  name: z
    .string()
    .trim()
    .min(1)
    .max(32)
    .regex(/^[a-zA-Z0-9_-]+$/),
  isEditable: z.boolean(),
  ownerId: idSchema,
  paperId: idSchema,
  referencesCommitId: idSchema.nullish(),
});

// the commit does not have a baseModelSchema because it does not have an updatedAt field
export const commitSchema = z.object({
  id: idSchema,
  createdAt: timestampSchema,
  name: z.string().trim().min(1).max(64),
  description: z.string().trim().max(2048),
  contentState: z.any(),
  madeByUserId: idSchema,
  previousCommitId: idSchema.nullish(),
  mergeCommitId: idSchema.nullish(),
});

export const decoupledBranchSchema = baseModelSchema.extend({
  contentState: z.any(),
  userId: idSchema,
  branchId: idSchema,
});
