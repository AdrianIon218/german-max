import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { lazy } from "react";

import { loader as mainPageLoader } from "./Pages/Home/MainPage";
import { loader as supportLoader } from "./Pages/Other/Support";

const MainPage = lazy(() => import("./Pages/Home/MainPage"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const RegisterForm = lazy(() => import("./Pages/Auth/RegisterForm"));
const Support = lazy(() => import("./Pages/Other/Support"));
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
        element: <Support />,
        loader: supportLoader
      }]
  }]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
