import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/Login";
import ErrorPage from "../pages/Error";
import Layout from "../pages/Layout";
import UserDetail from "../pages/UserDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users/:id",
        errorElement: <ErrorPage />,
        element: <UserDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
