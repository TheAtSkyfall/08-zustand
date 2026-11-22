"use client";
export default function error({ error }: { error: Error }) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
