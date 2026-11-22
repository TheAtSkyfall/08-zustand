import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () => fetchNotes({ tag, query: "", page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
