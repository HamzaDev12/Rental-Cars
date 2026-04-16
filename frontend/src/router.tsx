import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/pages/login";
import RegisterForm from "./components/pages/register";
import Router from "./components/Router";
import HomePage from "./components/pages/HomePage";
import Otp from "./components/pages/Otp";
import Cars from "./components/pages/Cars";
import Booking from "./components/pages/Booking";
import CarDetails from "./components/pages/CarDetails";
import MainPage from "./components/pages/mainPage";
import Dashboard from "./components/pages/dashboard";
import Car from "./components/layout/Car";
import Bookings from "./components/layout/Booking";
import Notification from "./components/layout/Notification";
import Settings from "./components/layout/Settings";
import Forget from "./components/pages/Forget";

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
      {
        path: "/carDetails/:id",
        element: <CarDetails />,
      },
      {
        path: "/forget",
        element: <Forget />,
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
      {
        path: "car",
        element: <Car />,
      },
      {
        path: "booking",
        element: <Bookings />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "otp",
        element: <Otp />,
      },
    ],
  },
]);
