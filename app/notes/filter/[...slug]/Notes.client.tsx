"use client";

import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { useState } from "react";
import css from "./Notes.module.css";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

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
