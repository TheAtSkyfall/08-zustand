import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";
import css from "./CreateNotePage.module.css";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in your NoteHub collection.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note in your NoteHub collection.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a note in NoteHub",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
