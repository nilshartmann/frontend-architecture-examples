import { useSubscribeToNewsletterMutation } from "./blog-queries.ts";
import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage.tsx";

export default function NewsletterForm() {
  const mutation = useSubscribeToNewsletterMutation();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    mutation.reset();
    e.preventDefault();
    await mutation.mutateAsync({ email });

    setEmail("");
  };

  return (
    <form action="#" method="post">
      <h2>✉️ Subscribe to newsletter</h2>
      <p>
        Don't want to miss new premium content? Register here to our newsletter, it's completly free and without ads
      </p>
      <div className="FormRow">
        <input
          type="text"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail"
          disabled={mutation.isLoading}
        />

        <button type="submit" disabled={mutation.isLoading} onClick={handleSubmit}>
          Register
        </button>
      </div>
      <ErrorMessage mutation={mutation} />
      {mutation.isSuccess && <p className={"success"}>Succesfully subscribed!</p>}
    </form>
  );
}
