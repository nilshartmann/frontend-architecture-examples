import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ApiError = z.object({
  msg: z.string(),
});

type ApiError = z.infer<typeof ApiError>;

export function isApiError(e: unknown): e is ApiError {
  return ApiError.safeParse(e).success;
}

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

export function useBlogPostQuery(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    async queryFn() {
      // slowdown: add "?slowDown=2400" to url
      const r = await fetch(`http://localhost:8080/api/post/${postId}?slowDown=1600`);
      const json = await r.json();
      return GetBlogPostResponse.parse(json);
    },
  });
}

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

export function useCommentsQuery(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    async queryFn() {
      // slowdown: add "?slowDown=2400" to url
      const r = await fetch(`http://localhost:8081/api/comments/${postId}?slowDown=2400`);
      const json = await r.json();
      return GetCommentsResponse.parse(json);
    },
  });
}

// ---------------------------------------------------------------------------------------------------
// -- AddComment
// ---------------------------------------------------------------------------------------------------

type AddCommentRequestBody = {
  name: string;
  comment: string;
};

export function useAddCommentMutation(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(newComment: AddCommentRequestBody) {
      const response = await fetch(`http://localhost:8081/api/comments/${postId}?slowDown=2400`, {
        method: "POST",
        body: JSON.stringify(newComment),
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
    },
  });
}

// ---------------------------------------------------------------------------------------------------
// -- Subscribe to Newsletter
// ---------------------------------------------------------------------------------------------------

type SubscribeToNewsletterBody = {
  email: string;
};

export function useSubscribeToNewsletterMutation() {
  return useMutation({
    async mutationFn(newsletterSubscription: SubscribeToNewsletterBody) {
      const response = await fetch(`http://localhost:8080/api/newsletter/subscription?slowDown=2400`, {
        method: "POST",
        body: JSON.stringify(newsletterSubscription),
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        console.log("NEWSLETTER RESPONSE: ", response.status);
        const err = await response.json();
        console.log("NEWSLETTER ERR", err);
        throw err;
      }
      return null;
    },
  });
}
