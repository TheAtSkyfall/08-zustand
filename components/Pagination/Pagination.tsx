"use client";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      className={css.pagination}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
