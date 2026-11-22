"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function CreateNoteClient() {
  const router = useRouter();

  return <NoteForm closeForm={() => router.push("/notes/filter/all")} />;
}
