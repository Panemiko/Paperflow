import createPatch, { type Change } from "textdiff-create";
import applyPatch from "textdiff-patch";

export function changesToText(changes: Change[][], defaultText = "") {
  for (const change of changes) {
    defaultText = applyPatch(defaultText, change);
  }

  return defaultText;
}

export function textToChanges(old: string, text: string) {
  return createPatch(old, text);
}
