import { Await, generatePath, Link, Outlet } from "react-router-dom";
import { GetBlogPostResponse, useBlogPostPageRouteLoaderData } from "./blog-queries.ts";
import { Suspense } from "react";

export default function App() {
  const { blogPostResponse } = useBlogPostPageRouteLoaderData();

  return (
    <>
      <Suspense fallback={<Header />}>
        <Await resolve={blogPostResponse}>{(r) => <Header blogPostResponse={r} />}</Await>
      </Suspense>

      <div className="Content">
        <main>
          <Outlet />
        </main>

        <aside>
          <form action="#" method="post">
            <h2>✉️ Subscribe to newsletter</h2>
            <p>
              Don't want to miss new premium content? Register here to our newsletter, it's completly free and without
              ads
            </p>
            <div className="FormRow">
              <input type="text" placeholder="E-Mail" name="email" aria-label="E-Mail" />

              <button type="submit">Register</button>
            </div>
            {/*<p th:if="${newsletterFormDataMsg != null}" th:text="${newsletterFormDataMsg}">Success!</p>*/}
          </form>
        </aside>
      </div>
    </>
  );
}

type HeaderProps = {
  blogPostResponse?: GetBlogPostResponse;
};
function Header({ blogPostResponse }: HeaderProps) {
  const getPostPath = (postId: number) => generatePath("/post/:postId", { postId: String(postId) });

  return (
    <header>
      <div>
        {!!blogPostResponse?.prevPostId && (
          <Link to={getPostPath(blogPostResponse.prevPostId)}>
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
          <Link to="/">My personal blog</Link>
        </h1>
      </div>
      <div style={{ textAlign: "end" }}>
        {!!blogPostResponse?.nextPostId && (
          <Link to={getPostPath(blogPostResponse.nextPostId)}>
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
