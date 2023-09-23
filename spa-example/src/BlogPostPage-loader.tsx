// import { defer, Params, useRouteLoaderData } from "react-router-dom";
// import { z } from "zod";
//
// const GetBlogPostResponse = z.object({
//   nextPostId: z.number().nullish(),
//   prevPostId: z.number().nullish(),
//   post: z.object({
//     id: z.number(),
//     title: z.string(),
//     image: z.string(),
//     body: z.string(),
//   }),
// });
//
// export type GetBlogPostResponse = z.infer<typeof GetBlogPostResponse>;
//
// const GetCommentResponse = z
//   .object({
//     id: z.number(),
//     postId: z.number(),
//     name: z.string(),
//     comment: z.string(),
//   })
//   .array();
//
// export type GetCommentResponse = z.infer<typeof GetCommentResponse>;
//
// export async function blogPostLoader({ params }: { params: Params }) {
//   console.log("Loading Post with id", params.postId);
//   const commentsResponse = fetch(`http://localhost:8081/api/comments/${params.postId}`).then((cr) => cr.json());
//   const r = await fetch(`http://localhost:8080/api/post/${params.postId}`);
//   const blogPostResponse = await r.json();
//   return defer({
//     blogPostResponse: GetBlogPostResponse.parse(blogPostResponse),
//     commentsResponse: commentsResponse,
//   });
// }
//
// type BlogPostLoaderResult = {
//   blogPostResponse: GetBlogPostResponse;
//   commentsResponse: Promise<GetCommentResponse>;
// };
//
// export function useBlogPostPageRouteLoaderData() {
//   const data = useRouteLoaderData("postIdRoute") as BlogPostLoaderResult;
//   return data;
// }
