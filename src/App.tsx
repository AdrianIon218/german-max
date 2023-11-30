import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { lazy } from "react";

import { loader as mainPageLoader } from "./Pages/Home/MainPage";
import Login from "./Pages/Auth/Login";

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
      }
      ]
  }]);

function App() {
  return <RouterProvider router={router} />
}

export default App
