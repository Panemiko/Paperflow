import { isMobilePhone } from "validator";
import { z } from "zod";

export const formFieldTypeSchema = z.enum([
  "text",
  "textarea",
  "email",
  "phone",
]);

export const alertChannelTypeSchema = z.enum(["whatsapp", "email"], {
  message: "Invalid type",
});

export const idSchema = z.string().trim().cuid2("Invalid ID");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Mandatory")
  .refine((value) => isMobilePhone(value), "Invalid phone number");

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

export const publicUserSchema = userSchema
  .pick({
    id: true,
    createdAt: true,
    updatedAt: true,
    email: true,
    emailVerified: true,
    firstName: true,
    lastName: true,
  })
  .extend({
    fullName: z.string().trim().min(1, "Mandatory"),
  });

export const signInCodeSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  userId: idSchema,
  code: z.string().length(6),
  expiresAt: z.date(),
});

export const alertChannelSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().trim().min(1, "Mandatory").max(100, "Max. 100 characters"),
  type: alertChannelTypeSchema,
  contact: z.string().trim(),
  isVerified: z.boolean(),
  userId: idSchema,
});

export function alertChannelSuperRefine(
  data: { type: z.infer<typeof alertChannelTypeSchema>; contact: string },
  ctx: z.RefinementCtx,
) {
  if (data.type === "email") {
    const emailSchema = z.string().email();
    const emailValidationResult = emailSchema.safeParse(data.contact);

    if (!emailValidationResult.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid e-mail",
        path: ["contact"],
      });
    }
  }

  if (data.type === "whatsapp") {
    const phoneValidationResult = phoneSchema.safeParse(data.contact);

    if (!phoneValidationResult.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone",
        path: ["contact"],
      });
    }
  }
}

export const alertChannelVerificationSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  alertChannelId: idSchema,
  code: z.string().length(6),
  expiresAt: z.date(),
});

export const formSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().trim().min(1, "Mandatory").max(100, "Max. 100 characters"),
  description: z.string().trim().max(500, "Max. 500 characters").nullable(),
  userId: idSchema,
});

export const formAlertSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  formId: idSchema,
  alertChannelId: idSchema,
});

export const formFieldSchema = z.object({
  id: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  order: z.number().int(),
  label: z.string().trim().min(1, "Mandatory").max(30, "Max. 30 caracteres"),
  isRequired: z.boolean(),
  description: z.string().trim().max(200, "Max. 200 caracteres").nullable(),
  placeholder: z.string().trim().max(50, "Max. 50 caracteres").nullable(),
  isShowDescription: z.boolean(),
  type: formFieldTypeSchema,
  formId: idSchema,
});
