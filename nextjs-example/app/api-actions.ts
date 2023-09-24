"use server";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const addCommentSlowdown = ``; // `?slowDown=2400`
const subscribeToNewsletterSlowdown = ``; // `?slowDown=2400`

// ---------------------------------------------------------------------------------------------------
// -- AddComment
// ---------------------------------------------------------------------------------------------------

type AddCommentRequestBody = {
  name: string;
  comment: string;
};

export type SaveCommentForPostResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      err: unknown;
    };

export async function saveCommentForPost(
  postId: string,
  newComment: AddCommentRequestBody,
): Promise<SaveCommentForPostResponse> {
  // THIS RUNS ON SERVER!
  // Next is here "Backend-for-frontend"
  // Imagine, we would have to add auth or api keys
  // here for the request to the "real" comment service

  const response = await fetch(
    `http://localhost:8081/api/comments/${postId}${addCommentSlowdown}`,
    {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: { "content-type": "application/json" },
    },
  );
  if (!response.ok) {
    const err = await response.json();
    console.log("ERR", err);
    return { status: "error", err } as const;
  }

  revalidatePath(`/post/${postId}`);

  return { status: "success" } as const;
}

// ---------------------------------------------------------------------------------------------------
// -- Subscribe to Newsletter
// ---------------------------------------------------------------------------------------------------

type SubscribeToNewsletterBody = {
  email: string;
};

export type SubscribeToNewsletterResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      err: unknown;
    };

export async function subscribeToNewsletter(
  email: string,
): Promise<SubscribeToNewsletterResponse> {
  // THIS RUNS ON SERVER!
  // Next is here "Backend-for-frontend"
  const response = await fetch(
    `http://localhost:8080/api/newsletter/subscription${subscribeToNewsletterSlowdown}`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "content-type": "application/json" },
    },
  );
  if (!response.ok) {
    const err = await response.json();
    console.log("NEWSLETTER ERR", err);
    return { status: "error", err } as const;
  }
  return { status: "success" } as const;
}
