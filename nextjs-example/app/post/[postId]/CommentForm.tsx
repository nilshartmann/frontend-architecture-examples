"use client";
import React, { ChangeEvent, useState } from "react";
import { usePostIdParam } from "@/app/use-post-id-param";
import { useRequestState } from "@/app/post/[postId]/use-request-state";
import { saveCommentForPost } from "@/app/api-actions";
import ErrorMessage from "@/app/post/[postId]/ErrorMessage";

export default function CommentForm() {
  const postId = usePostIdParam();
  const mutation = useRequestState<void>();

  const [name, setName] = useState("");
  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    mutation.reset();
    setName(e.target.value);
  };

  const [comment, setComment] = useState("");
  const updateComment = (e: ChangeEvent<HTMLInputElement>) => {
    mutation.reset();
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    mutation.reset();
    e.preventDefault();
    const response = await saveCommentForPost(postId, { name, comment });
    console.log("REsPONSE", response);
    if (response.status === "success") {
      mutation.requestSucceed();
      setName("");
      setComment("");
    } else {
      mutation.requestFailed(response.err);
    }
  };

  return (
    <form>
      <h2>✍️ Leave a comment</h2>
      <p>I'm happy to hear from you, please leave your comment below</p>

      <div className="FormRow">
        <input
          type="text"
          value={name}
          onChange={updateName}
          placeholder="Your name here"
          aria-label="Your name"
          disabled={mutation.state.isLoading}
        />
        <input
          type="text"
          value={comment}
          onChange={updateComment}
          placeholder="Your comment here"
          aria-label="Comment"
          disabled={mutation.state.isLoading}
        />
        <button
          type="submit"
          disabled={mutation.state.isLoading}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      {mutation.state.isLoading && <p>Blog post saving...</p>}
      <ErrorMessage err={mutation.state.isError ? mutation.state.err : null} />
    </form>
  );
}
