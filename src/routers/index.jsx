import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import PostPage from "../pages/PostPage.jsx";
import EditPostPage from "../pages/EditPostPage.jsx";
import CreatePostPage from "../pages/CreatePostPage.jsx";
import { MainLayout } from "../layouts/Mainlayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/post/:id/edit",
        element: <EditPostPage />,
      },
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
    ],
  },
]);

export default router;
