"use client";
export default function error({ error }: { error: Error }) {
  return <p>Could not fetch note details. {error.message}</p>;
}
