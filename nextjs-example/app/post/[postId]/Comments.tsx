import React, { Suspense } from "react";
import { GetBlogCommentsResponsePromise } from "@/app/api-queries";

type CommentsProps = {
  commentsPromise: GetBlogCommentsResponsePromise;
};
export default function Comments({ commentsPromise }: CommentsProps) {
  return (
    <section className="Comments">
      <h3>Comments</h3>
      <Suspense fallback={<h1>Comments loading...</h1>}>
        <CommentList commentsPromise={commentsPromise} />
      </Suspense>
    </section>
  );
}

type CommentListProps = {
  commentsPromise: GetBlogCommentsResponsePromise;
};
async function CommentList({ commentsPromise }: CommentListProps) {
  const comments = await commentsPromise;
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
