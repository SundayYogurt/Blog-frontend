import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetail from "../pages/PostDetail";
import Author from "../pages/Author";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "edit/:id", element: <EditPost /> },
      { path: "create", element: <CreatePost /> },
      { path: "login", element: <Login/>},
      { path: "register", element: <Register /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "author/:id", element: <Author /> },
    ],
  },
]);

export default router;
