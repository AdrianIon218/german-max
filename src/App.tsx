import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { lazy } from "react";

const MainPage = lazy(() => import("./Pages/Home/MainPage"));

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children: [
      {
        path:"/",
        element: <MainPage />
      },
      ]
  }]);

function App() {
  return <RouterProvider router={router} />
}

export default App
