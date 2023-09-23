import { defer, Params, useParams, useRouteLoaderData } from "react-router-dom";
import { z } from "zod";
import { Query, QueryClient, useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import invariant from "tiny-invariant";

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

export type GetBlogPostResponse = z.infer<typeof GetBlogPostResponse>;

const GetCommentResponse = z
  .object({
    id: z.number(),
    postId: z.number(),
    name: z.string(),
    comment: z.string(),
  })
  .array();

export type GetCommentResponse = z.infer<typeof GetCommentResponse>;

type QueryConfig<TData> = {
  queryKey: NonNullable<UseQueryOptions["queryKey"]>;
  queryFn: UseQueryOptions<TData>["queryFn"];
};

function blogPostQuery(postId: string): QueryConfig<GetBlogPostResponse> {
  return {
    queryKey: ["post", postId],
    queryFn() {
      // slowdown: add "?slowDown=2400" to url
      return fetch(`http://localhost:8080/api/post/${postId}`).then((r) => r.json());
    },
  };
}

function commentsQuery(postId: string): QueryConfig<GetCommentResponse> {
  return {
    queryKey: ["comments", postId],
    queryFn() {
      // slowdown: add "?slowDown=2400" to url
      return fetch(`http://localhost:8081/api/comments/${postId}`).then((r) => r.json());
    },
  } as const;
}

export function blogPostLoader(queryClient: QueryClient) {
  return async function ({ params }: { params: Params }) {
    console.log("Loading Post with id", params.postId);
    return defer({
      commentsResponse: queryClient.ensureQueryData(commentsQuery(params.postId!)),
      blogPostResponse: queryClient.ensureQueryData(blogPostQuery(params.postId!)),
    });
  };
}

export function blogPostAction(queryClient: QueryClient) {
  return async function ({ params, request }: { params: Params; request: Request }) {
    const { postId } = params;
    console.log("ADD COMMENT FOR POST", postId);
    const formdata = await request.formData();
    console.log("FORM DATA", formdata);
    const response = await fetch(`http://localhost:8081/api/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formdata)),
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      console.log("RESPONSE: ", response.status);
      const err = await response.json();
      console.log("ERR", err);
      throw err;
    }
    queryClient.invalidateQueries({
      queryKey: ["comments", postId],
    });
    return null;
  };
}

type BlogPostLoaderResult = {
  blogPostResponse: Promise<GetBlogPostResponse>;
  commentsResponse: Promise<GetCommentResponse>;
};

export function useBlogPostPageRouteLoaderData() {
  const data = useRouteLoaderData("postIdRoute") as BlogPostLoaderResult;
  return data;
}
