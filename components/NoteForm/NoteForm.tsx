"use client";

import type { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNotesStore } from "@/lib/store/noteStore";
import type { NoteCreate, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNotesStore((state) => state.draft);
  const setDraft = useNotesStore((state) => state.setDraft);
  const clearDraft = useNotesStore((state) => state.clearDraft);
  const { mutateAsync, isPending } = useMutation({ mutationFn: createNote });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setDraft({ [name]: value } as Partial<NoteCreate>);
  }

  async function formAction(formData: FormData) {
    const note: NoteCreate = {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: String(formData.get("tag") ?? "Todo") as NoteTag,
    };

    await mutateAsync(note);
    await queryClient.invalidateQueries({ queryKey: ["notes"] });
    clearDraft();
    router.push("/notes/filter/all");
  }

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          className={css.input}
          defaultValue={draft.title}
          id="title"
          maxLength={50}
          minLength={3}
          name="title"
          onChange={handleChange}
          required
          type="text"
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          className={css.textarea}
          defaultValue={draft.content}
          id="content"
          maxLength={500}
          name="content"
          onChange={handleChange}
          rows={8}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          className={css.select}
          defaultValue={draft.tag}
          id="tag"
          name="tag"
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          className={css.cancelButton}
          onClick={() => router.back()}
          type="button"
        >
          Cancel
        </button>
        <button className={css.submitButton} disabled={isPending} type="submit">
          Create note
        </button>
      </div>
    </form>
  );
}
