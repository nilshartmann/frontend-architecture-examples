import invariant from "tiny-invariant";
import { useParams } from "next/navigation";

export function usePostIdParam(): string {
  const params = useParams();
  const postId = params.postId;
  invariant(postId, "Param 'postId' missing.");
  invariant(typeof postId === "string", "Param 'postId' must be string");
  return postId;
}
