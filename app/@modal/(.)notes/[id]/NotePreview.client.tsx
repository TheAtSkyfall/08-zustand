"use client";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const route = useRouter();
  function onClose() {
    route.back();
  }
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
        <button className={css.backBtn} onClick={onClose}>
          Back
        </button>
      </div>
    </Modal>
  );
}
