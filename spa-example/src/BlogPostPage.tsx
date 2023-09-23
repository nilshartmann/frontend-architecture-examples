import { Await, Form, useAsyncValue } from "react-router-dom";
import React, { Suspense } from "react";
import { GetCommentResponse, useBlogPostPageRouteLoaderData } from "./blog-queries.ts";

export default function BlogPostPage() {
  const { blogPostResponse, commentsResponse } = useBlogPostPageRouteLoaderData();

  return (
    <Suspense fallback={<h1>Blog Post loading...</h1>}>
      <Await resolve={blogPostResponse}>
        {({ post }) => {
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
              <Form method="post">
                <h2>✍️ Leave a comment</h2>
                <p>I'm happy to hear from you, please leave your comment below</p>

                <div className="FormRow">
                  <input type="text" name="name" placeholder="Your name here" aria-label="Your name" />
                  <input type="text" name="comment" placeholder="Your comment here" aria-label="Comment" />
                  <button type="submit">Add</button>
                </div>
                {/*<p className="error" th:if="${commentFormError != null}" th:text="${commentFormError}">Error, could not save*/}
                {/*  comment.</p>*/}
              </Form>
            </div>
          );
        }}
      </Await>
    </Suspense>
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
