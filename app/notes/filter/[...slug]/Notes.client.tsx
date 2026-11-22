"use client";

import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import { useDebouncedCallback } from "use-debounce";
import { useNotesStore } from "@/lib/store/noteStore";
import Link from "next/link";
import css from "./Notes.module.css";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const query = useNotesStore((state) => state.query);
  const searchValue = useNotesStore((state) => state.searchValue);
  const page = useNotesStore((state) => state.page);
  const setQuery = useNotesStore((state) => state.setQuery);
  const setSearchValue = useNotesStore((state) => state.setSearchValue);
  const setPage = useNotesStore((state) => state.setPage);

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

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
