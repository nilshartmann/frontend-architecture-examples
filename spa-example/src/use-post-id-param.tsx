import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";

export function usePostIdParam() {
  const params = useParams();
  const postId = params.postId;
  invariant(postId, "Param 'postId' missing.");
  return postId;
}
