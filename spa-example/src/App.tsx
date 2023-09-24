import { generatePath, Link, Outlet } from "react-router-dom";
import { useBlogPostQuery } from "./blog-queries.ts";
import { usePostIdParam } from "./use-post-id-param.tsx";
import NewsletterForm from "./NewsletterForm.tsx";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

export default function App() {
  const [runningSinceDate, setRunningSinceDate] = useState<Date | null>(null);

  useEffect(() => {
    setRunningSinceDate(new Date());
  }, []);

  return (
    <>
      <Header runningSinceDate={runningSinceDate} />

      <div className="Content">
        <main>
          <Outlet />
        </main>

        <aside>
          <NewsletterForm />
        </aside>
      </div>
    </>
  );
}

function Header({ runningSinceDate }: { runningSinceDate: Date | null }) {
  const postId = usePostIdParam();
  const query = useBlogPostQuery(postId);

  const blogPostResponse = query.data;

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
        {runningSinceDate && (
          <>
            Reading since: <ReactTimeAgo date={runningSinceDate} locale="en-US" timeStyle={"twitter"} />
          </>
        )}
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
