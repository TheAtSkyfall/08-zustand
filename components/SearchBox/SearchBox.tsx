"use client";

import css from "./SearchBox.module.css";
interface SearchBoxProps {
  query: string;
  getQuery: (query: string) => void;
}

function SearchBox({ query, getQuery }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={query}
      onChange={(e) => {
        const valueInput = e.target.value;
        getQuery(valueInput);
      }}
    />
  );
}

export default SearchBox;
