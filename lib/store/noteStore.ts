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
  query: string;
  searchValue: string;
  page: number;
  draft: NoteCreate;
  setSearchValue: (searchValue: string) => void;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  setDraft: (note: Partial<NoteCreate>) => void;
  clearDraft: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      query: "",
      searchValue: "",
      page: 1,
      draft: initialDraft,
      setSearchValue: (searchValue) => set({ searchValue }),
      setQuery: (query) => set({ query, page: 1 }),
      setPage: (page) => set({ page }),
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
