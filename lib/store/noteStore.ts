"use client";

import { create } from "zustand";

interface NotesState {
  query: string;
  searchValue: string;
  page: number;
  setSearchValue: (searchValue: string) => void;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  query: "",
  searchValue: "",
  page: 1,
  setSearchValue: (searchValue) => set({ searchValue }),
  setQuery: (query) => set({ query, page: 1 }),
  setPage: (page) => set({ page }),
}));
