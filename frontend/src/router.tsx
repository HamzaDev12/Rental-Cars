import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/pages/login";
import RegisterForm from "./components/pages/register";
import Router from "./components/Router";
import HomePage from "./components/pages/HomePage";
import Otp from "./components/pages/Otp";
import MainPage from "./components/pages/mainPage";
import Dashboard from "./components/pages/dashboard";
import Cars from "./components/pages/Cars";
import Booking from "./components/pages/Booking";

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
      {
        path: "/otp",
        element: <Otp />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
