import React from "react";
import { isApiError } from "@/app/api-error";

type ErrorMessageProps = {
  err: unknown;
};

export default function ErrorMessage({ err }: ErrorMessageProps) {
  if (!err) {
    return null;
  }

  const msg = isApiError(err) ? err.msg : "Unknown error";

  return <p className="error">Error occured while saving: {msg}</p>;
}
