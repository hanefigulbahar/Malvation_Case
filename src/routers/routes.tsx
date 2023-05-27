import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/Login";
import ErrorPage from "../pages/Error";
import Layout from "../pages/Layout";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
