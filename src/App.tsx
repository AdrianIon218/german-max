import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { lazy } from "react";

import { loader as mainPageLoader } from "./Pages/Home/MainPage";
import { supportAction, loader as supportLoader } from "./Pages/Other/Support";

const MainPage = lazy(() => import("./Pages/Home/MainPage"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const RegisterForm = lazy(() => import("./Pages/Auth/RegisterForm"));
const Support = lazy(() => import("./Pages/Other/Support"));
const NoPage = lazy(() => import("./Pages/Other/NoPage"));
const CoursesPage = lazy(() => import("./Pages/Home/CoursesSection"))

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    errorElement:<Navigate to="/page-not-found" replace />,
    children: [
      {
        path:"/",
        element: <MainPage />,
        loader: mainPageLoader
      },
      {
        path:'page-not-found',
        element:<NoPage />
      },
      {
        path:"login",
        element: <Login />
      },
      {
        path:"signup",
        element: <RegisterForm location="register" />
      },
      {
        path:"suport",
        element: <Support />,
        loader: supportLoader,
        action: supportAction
      },
      { 
        path:"courses",
        element: <CoursesPage location="own-page" />
      },
      {
        path:"password_reset",
        children:[
          {
            index:true,
            element:<p>Reset pass</p>,
          },
          {
            path:"verify_password",
            element:<p>Verificare cod de resetare</p>
          },
          {
            path:"new_password",
            element:<p>Formular setare new password</p>
          }
        ]
      }]
  }]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
