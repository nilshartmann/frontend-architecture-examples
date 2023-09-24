"use client";
import React, { useState } from "react";
import { subscribeToNewsletter } from "@/app/api-actions";
import ErrorMessage from "@/app/post/[postId]/ErrorMessage";
import { useRequestState } from "@/app/post/[postId]/use-request-state";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const requestState = useRequestState<void>();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    requestState.requestStarted();
    e.preventDefault();
    const response = await subscribeToNewsletter(email);
    console.log("REsPONSE", response);
    if (response.status === "success") {
      requestState.requestSucceed();
      setEmail("");
    } else {
      requestState.requestFailed(response.err);
    }
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    requestState.reset();
    setEmail(e.target.value);
  };

  return (
    <form>
      <h2>✉️ Subscribe to newsletter</h2>
      <p>
        Don't want to miss new premium content? Register here to our newsletter,
        it's completly free and without ads
      </p>
      <div className="FormRow">
        <input
          type="text"
          placeholder="E-Mail"
          value={email}
          onChange={onEmailChange}
          aria-label="E-Mail"
          disabled={requestState.state.isLoading}
        />

        <button
          type="submit"
          disabled={requestState.state.isLoading}
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
      <ErrorMessage
        err={requestState.state.isError ? requestState.state.err : null}
      />
      {requestState.state.isSuccess && (
        <p className={"success"}>Succesfully subscribed!</p>
      )}
    </form>
  );
}

function NewsletterFormForm() {}
