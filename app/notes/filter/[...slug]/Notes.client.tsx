"use client";

import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import { useNotesStore } from "@/store/noteStore";
import css from "./Notes.module.css";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const query = useNotesStore((state) => state.query);
  const searchValue = useNotesStore((state) => state.searchValue);
  const page = useNotesStore((state) => state.page);
  const isModalOpen = useNotesStore((state) => state.isModalOpen);
  const setQuery = useNotesStore((state) => state.setQuery);
  const setSearchValue = useNotesStore((state) => state.setSearchValue);
  const setPage = useNotesStore((state) => state.setPage);
  const openModal = useNotesStore((state) => state.openModal);
  const closeModal = useNotesStore((state) => state.closeModal);

  const updateQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, query, page],
    queryFn: () => fetchNotes({ tag, query, page }),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  function getQuery(newQuery: string) {
    setSearchValue(newQuery);
    updateQuery(newQuery);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox getQuery={getQuery} query={searchValue} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm closeForm={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
