import { type z } from "zod";
import {
  type paperPermissionFeatureSchema,
  type paperPermissionRoleSchema,
} from "./schemas";

export const features: Record<
  z.infer<typeof paperPermissionRoleSchema>,
  z.infer<typeof paperPermissionFeatureSchema>[]
> = {
  author: [
    "comment",
    "commit",
    "delete",
    "invite",
    "review",
    "update_metadata",
  ],
};

export function featuresByRole(
  role: z.infer<typeof paperPermissionRoleSchema>,
): z.infer<typeof paperPermissionFeatureSchema>[] {
  return features[role];
}

export function hasFeature(
  role: z.infer<typeof paperPermissionRoleSchema> | undefined,
  feature: z.infer<typeof paperPermissionFeatureSchema>,
): boolean {
  if (role === undefined) {
    return false
  }

  return featuresByRole(role).includes(feature);
}
