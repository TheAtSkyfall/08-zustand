"use client";

import { create } from "zustand";

interface NotesState {
  query: string;
  searchValue: string;
  page: number;
  isModalOpen: boolean;
  setSearchValue: (searchValue: string) => void;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  query: "",
  searchValue: "",
  page: 1,
  isModalOpen: false,
  setSearchValue: (searchValue) => set({ searchValue }),
  setQuery: (query) => set({ query, page: 1 }),
  setPage: (page) => set({ page }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
