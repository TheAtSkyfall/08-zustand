"use client";

import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
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

  function openForm() {
    setIsModalOpen(true);
  }

  function closeForm() {
    setIsModalOpen(false);
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

        <button className={css.button} onClick={openForm}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeForm}>
          <NoteForm closeForm={closeForm} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
