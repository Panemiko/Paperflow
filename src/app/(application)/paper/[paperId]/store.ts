import {
  type commitSchema,
  type paperSchema,
  type sectionSchema,
} from "@/lib/schemas";
import { type z } from "zod";
import { create } from "zustand";

type Section = z.infer<typeof sectionSchema> | null;

type Commit = z.infer<typeof commitSchema>;

type Paper = z.infer<typeof paperSchema> | null;

export type EditorStore = {
  content: string;
  setContent: (content: string) => void;
  commitPopupOpen: boolean;
  setCommitPopupOpen: (commitPopupOpen: boolean) => void;
  section: Section;
  setSection: (section: Section) => void;
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
  section: null,
  setSection: (section) => set({ section }),
  commits: [],
  setCommits: (commits) => set({ commits }),
  paper: null,
  setPaper: (paper) => set({ paper }),
}));
