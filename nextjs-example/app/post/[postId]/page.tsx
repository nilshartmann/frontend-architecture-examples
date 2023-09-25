import { loadBlogPost, loadComments } from "@/app/api-queries";
import Comments from "@/app/post/[postId]/Comments";
import CommentForm from "@/app/post/[postId]/CommentForm";

type Params = { postId: string };
type BlogPostPageProps = { params: Params };
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postId = params.postId;

  const commentsPromise = loadComments(postId);
  const { post } = await loadBlogPost(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={`http://localhost:8080/${post.image}`} />
      <span dangerouslySetInnerHTML={{ __html: post.body }} />

      <Comments commentsPromise={commentsPromise} />
      <CommentForm />
    </div>
  );
}

export async function generateStaticParams() {
  console.log("Determinig post ids...");
  const response = await fetch("http://localhost:8080/api/post-ids");
  const body = (await response.json()) as { postIds: number[] };

  console.log("Current post ids", body);

  return body.postIds.map((postId) => ({
    postId: String(postId),
  }));
}
