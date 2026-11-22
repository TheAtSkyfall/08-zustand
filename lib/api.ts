import { Note, NoteCreate } from "@/types/note";
import axios from "axios";

interface FetchNotesParams {
  tag?: string;
  query: string;
  page: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const tokenAutorizate = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

export async function fetchNotes({
  tag,
  query,
  page,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await noteApi.get<FetchNotesResponse>("/notes", {
    params: {
      tag: tag,
      search: query,
      page: page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${tokenAutorizate}`,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await noteApi.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenAutorizate}`,
    },
  });
  return data;
}

export async function createNote(noteData: NoteCreate): Promise<Note> {
  const { data } = await noteApi.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${tokenAutorizate}`,
    },
  });
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await noteApi.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${tokenAutorizate}`,
    },
  });

  return data;
}
