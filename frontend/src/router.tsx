import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/pages/login";
import RegisterForm from "./components/pages/register";
import Router from "./components/Router";
import HomePage from "./components/pages/HomePage";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Router />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
]);
