import { usePostIdParam } from "./use-post-id-param.tsx";
import { useCommentsQuery } from "./blog-queries.ts";
import React from "react";

export default function Comments() {
  const postId = usePostIdParam();

  const commentsQuery = useCommentsQuery(postId);

  if (commentsQuery.isLoading) {
    return <h1>Comments loading...</h1>;
  }

  if (commentsQuery.isError) {
    console.error(commentsQuery.error);
    return <h1>Loading Comments failed</h1>;
  }

  const comments = commentsQuery.data;

  return (
    <>
      {comments.map((c) => (
        <p key={c.id}>
          {c.comment} ({c.name})
        </p>
      ))}
    </>
  );
}
