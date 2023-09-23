import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./styles.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import BlogPostPage from "./BlogPostPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { blogPostAction, blogPostLoader } from "./blog-queries.ts";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect("/post/1"),
      },
      {
        path: "post/:postId",
        element: <BlogPostPage />,
        id: "postIdRoute",

        loader: blogPostLoader(queryClient),
        action: blogPostAction(queryClient),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    {/*<ReactQueryDevtools position="bottom-right" />*/}
  </QueryClientProvider>,
);
