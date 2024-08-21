import { diff_match_patch, type Diff } from "diff-match-patch";
import "diff-match-patch-line-and-word";

export function changesToText(changes: Diff[]) {
  const dmp = new diff_match_patch();
  console.log(changes);

  const patch = dmp.patch_make(changes);
  const oldText = dmp.patch_toText(patch);

  return oldText;
}

export function textToChanges(old: string, text: string) {
  const dmp = new diff_match_patch();

  // @ts-expect-error diff_wordMode is not in the types (but exists)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const changes = dmp.diff_wordMode(old, text) as unknown as Diff[];

  dmp.diff_cleanupSemantic(changes);

  return changes;
}
