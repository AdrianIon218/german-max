import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { lazy } from "react";

import { loader as mainPageLoader } from "./Pages/Home/MainPage";
const MainPage = lazy(() => import("./Pages/Home/MainPage"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const RegisterForm = lazy(() => import("./Pages/Auth/RegisterForm"));
const Contacts = lazy(() => import("./Pages/Other/Contacts"));
const NoPage = lazy(() => import("./Pages/Other/NoPage"));

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    errorElement:<NoPage />,
    children: [
      {
        path:"/",
        element: <MainPage />,
        loader: mainPageLoader
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/signup",
        element: <RegisterForm location="register" />
      },
      {
        path:"/contacts",
        element: <Contacts />
      }
      ]
  }]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
