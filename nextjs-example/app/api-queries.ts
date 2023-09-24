import { z } from "zod";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const getBlogPostSlowdown = ``; // `?slowDown=1600`
const getCommentsSlowdown = ``; // `?slowDown=2400`

// ---------------------------------------------------------------------------------------------------
// -- GetBlogPost
// ---------------------------------------------------------------------------------------------------
const GetBlogPostResponse = z.object({
  nextPostId: z.number().nullish(),
  prevPostId: z.number().nullish(),
  post: z.object({
    id: z.number(),
    title: z.string(),
    image: z.string(),
    body: z.string(),
  }),
});

export async function loadBlogPost(postId: string) {
  // slowdown: add "?slowDown=2400" to url
  const r = await fetch(
    `http://localhost:8080/api/post/${postId}${getBlogPostSlowdown}`,
  );
  const json = await r.json();
  return GetBlogPostResponse.parse(json);
}

export type GetBlogPostResponsePromise = ReturnType<typeof loadBlogPost>;

// ---------------------------------------------------------------------------------------------------
// -- GetComments
// ---------------------------------------------------------------------------------------------------

const GetCommentsResponse = z
  .object({
    id: z.number(),
    postId: z.number(),
    name: z.string(),
    comment: z.string(),
  })
  .array();

export async function loadComments(postId: string) {
  // slowdown: add "?slowDown=2400" to url
  const r = await fetch(
    `http://localhost:8081/api/comments/${postId}${getCommentsSlowdown}`,
  );
  const json = await r.json();
  return GetCommentsResponse.parse(json);
}

export type GetBlogCommentsResponsePromise = ReturnType<typeof loadComments>;
