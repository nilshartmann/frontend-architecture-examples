import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./styles.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import BlogPostPage from "./BlogPostPage.tsx";
import { blogPostLoader } from "./BlogPostPage-loader.tsx";

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
        loader: blogPostLoader,
        id: "postIdRoute",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
