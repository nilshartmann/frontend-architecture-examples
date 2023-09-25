import { loadBlogPost, loadComments } from "@/app/api-queries";
import Comments from "@/app/post/[postId]/Comments";
import CommentForm from "@/app/post/[postId]/CommentForm";

type Params = { postId: string };
type BlogPostPageProps = { params: Params };
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postId = params.postId;

  console.log(` *** Rendering Blog Post Page for Post-Id ${postId} ***`);

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
  const response = await fetch("http://localhost:8080/api/post-ids");
  const body = (await response.json()) as { postIds: number[] };

  return body.postIds.map((postId) => ({
    postId: String(postId),
  }));
}
