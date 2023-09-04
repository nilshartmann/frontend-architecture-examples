import { GetCommentResponse, useBlogPostPageRouteLoaderData } from "./BlogPostPage-loader.tsx";
import { Await, useAsyncValue } from "react-router-dom";
import React, { Suspense } from "react";

export default function BlogPostPage() {
  const { blogPostResponse, commentsResponse } = useBlogPostPageRouteLoaderData();
  const { post } = blogPostResponse;

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={`http://localhost:8080/${post.image}`} />
      <span dangerouslySetInnerHTML={{ __html: post.body }} />

      <section className="Comments">
        <h3>Comments</h3>
        <Suspense fallback={<p>Comments are loading</p>}>
          <Await resolve={commentsResponse} errorElement={<p>Could not load comments</p>}>
            <CommentList />
          </Await>
        </Suspense>
      </section>
      <form action="#" method="post">
        <h2>✍️ Leave a comment</h2>
        <p>I'm happy to hear from you, please leave your comment below</p>

        <div className="FormRow">
          <input type="text" name="name" placeholder="Your name here" aria-label="Your name" />
          <input type="text" name="comment" placeholder="Your comment here" aria-label="Comment" />
          <button type="submit">Add</button>
        </div>
        {/*<p className="error" th:if="${commentFormError != null}" th:text="${commentFormError}">Error, could not save*/}
        {/*  comment.</p>*/}
      </form>
    </div>
  );
}

function CommentList() {
  const comments = useAsyncValue() as GetCommentResponse;

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
