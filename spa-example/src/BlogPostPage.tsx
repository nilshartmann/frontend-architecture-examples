import React from "react";
import { useBlogPostQuery } from "./blog-queries.ts";
import { usePostIdParam } from "./use-post-id-param.tsx";
import Comments from "./Comments.tsx";
import CommentForm from "./CommentForm.tsx";

export default function BlogPostPage() {
  const postId = usePostIdParam();
  const postQuery = useBlogPostQuery(postId);

  if (postQuery.isLoading) {
    return <h1>Blog Post loading...</h1>;
  }

  if (postQuery.isError) {
    console.error(postQuery.error);
    return <h1>Loading Post failed</h1>;
  }

  const { post } = postQuery.data;

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={`http://localhost:8080/${post.image}`} />
      <span dangerouslySetInnerHTML={{ __html: post.body }} />

      <section className="Comments">
        <h3>Comments</h3>
        <Comments />
      </section>
      <CommentForm />
    </div>
  );
}
