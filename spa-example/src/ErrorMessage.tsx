import React from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { isApiError } from "./blog-queries.ts";

type ErrorMessageProps = {
  mutation: UseMutationResult<any, any, any, any>;
};

export default function ErrorMessage({ mutation }: ErrorMessageProps) {
  if (!mutation.isError) {
    return null;
  }

  const msg = isApiError(mutation.error) ? mutation.error.msg : "Unknown error";

  return <p className="error">Error occured while saving: {msg}</p>;
}
