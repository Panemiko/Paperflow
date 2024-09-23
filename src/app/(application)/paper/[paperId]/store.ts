import { type commitSchema, type paperSchema } from "@/lib/schemas";
import { type z } from "zod";
import { create } from "zustand";

type Commit = z.infer<typeof commitSchema>;

type Paper = z.infer<typeof paperSchema> | null;

export type EditorStore = {
  content: string;
  setContent: (content: string) => void;
  commitPopupOpen: boolean;
  setCommitPopupOpen: (commitPopupOpen: boolean) => void;
  commits: Commit[];
  setCommits: (commits: Commit[]) => void;
  paper: Paper;
  setPaper: (paper: Paper) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  content: "",
  setContent: (content) => set({ content }),
  commitPopupOpen: false,
  setCommitPopupOpen: (commitPopupOpen) => set({ commitPopupOpen }),
  commits: [],
  setCommits: (commits) => set({ commits }),
  paper: null,
  setPaper: (paper) => set({ paper }),
}));
