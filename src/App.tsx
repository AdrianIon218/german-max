import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { lazy } from "react";

import { loader as mainPageLoader } from "./Pages/Home/MainPage";
import Login from "./Pages/Auth/Login";
import RegisterForm from "./Pages/Auth/RegisterForm";
import Contacts from "./Pages/Other/Contacts";

const MainPage = lazy(() => import("./Pages/Home/MainPage"));

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
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

export default App
