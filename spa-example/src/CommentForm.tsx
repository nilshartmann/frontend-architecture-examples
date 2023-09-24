import React from "react";
import { useAddCommentMutation } from "./blog-queries.ts";
import { usePostIdParam } from "./use-post-id-param.tsx";
import ErrorMessage from "./ErrorMessage.tsx";
import { useFormState } from "./store.ts";

export default function CommentForm() {
  const postId = usePostIdParam();
  const mutation = useAddCommentMutation(postId);

  const name = useFormState((state) => state.forms[postId]?.name || "");
  const updateName = useFormState((state) => state.updateName);

  const comment = useFormState((state) => state.forms[postId]?.comment || "");
  const updateComment = useFormState((state) => state.updateComment);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    mutation.reset();
    e.preventDefault();
    await mutation.mutateAsync({ name, comment });

    updateName(postId, "");
    updateComment(postId, "");
  };

  return (
    <form>
      <h2>✍️ Leave a comment</h2>
      <p>I'm happy to hear from you, please leave your comment below</p>

      <div className="FormRow">
        <input
          type="text"
          value={name}
          onChange={(e) => updateName(postId, e.target.value)}
          placeholder="Your name here"
          aria-label="Your name"
          disabled={mutation.isLoading}
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => updateComment(postId, e.target.value)}
          placeholder="Your comment here"
          aria-label="Comment"
          disabled={mutation.isLoading}
        />
        <button type="submit" disabled={mutation.isLoading} onClick={handleSubmit}>
          Add
        </button>
      </div>
      {mutation.isLoading && <p>Blog post saving...</p>}
      <ErrorMessage mutation={mutation} />
      {/*<p className="error" th:if="${commentFormError != null}" th:text="${commentFormError}">Error, could not save*/}
      {/*  comment.</p>*/}
    </form>
  );
}
