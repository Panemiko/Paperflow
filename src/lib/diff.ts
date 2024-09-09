import createPatch, { type Change } from "textdiff-create";
import applyPatch from "textdiff-patch";

export function changesToText(changes: Change[], defaultText = "") {
  return applyPatch(defaultText, changes);
}

export function textToChanges(old: string, text: string) {
  return createPatch(old, text);
}
