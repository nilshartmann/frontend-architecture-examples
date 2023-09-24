import Link from "next/link";
import { GetBlogPostResponsePromise, loadBlogPost } from "@/app/api-queries";
import { Suspense } from "react";

// Demo Purpose only
const enablePrefetch = false;

type HeaderProps = {
  postId: string;
};
export default async function Header({ postId }: HeaderProps) {
  const blogPostResponsePromise = loadBlogPost(postId);

  return (
    <Suspense fallback={<HeaderInternal />}>
      <HeaderLoader blogPostResponsePromise={blogPostResponsePromise} />
    </Suspense>
  );
}

type HeaderLoaderProps = {
  blogPostResponsePromise: GetBlogPostResponsePromise;
};
async function HeaderLoader({ blogPostResponsePromise }: HeaderLoaderProps) {
  const blogPostResponse = await blogPostResponsePromise;
  return <HeaderInternal blogPostResponse={blogPostResponse} />;
}

type HeaderInternalProps = {
  blogPostResponse?: Awaited<GetBlogPostResponsePromise>;
};
function HeaderInternal({ blogPostResponse }: HeaderInternalProps) {
  const getPostPath = (postId: number) => `/post/${encodeURIComponent(postId)}`;

  return (
    <header>
      <div style={{ width: "120px" }}>
        {!!blogPostResponse?.prevPostId && (
          <Link
            prefetch={enablePrefetch}
            href={getPostPath(blogPostResponse.prevPostId)}
          >
            <svg
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
            </svg>
          </Link>
        )}
      </div>

      <div>
        <h1>
          <Link prefetch={enablePrefetch} href="/">
            My personal blog
          </Link>
        </h1>
      </div>
      <div style={{ width: "120px", textAlign: "end" }}>
        {!!blogPostResponse?.nextPostId && (
          <Link
            prefetch={enablePrefetch}
            href={getPostPath(blogPostResponse.nextPostId)}
          >
            <svg
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
