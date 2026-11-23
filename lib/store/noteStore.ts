"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteCreate } from "@/types/note";

const initialDraft: NoteCreate = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NotesState {
  draft: NoteCreate;
  setDraft: (note: Partial<NoteCreate>) => void;
  clearDraft: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
