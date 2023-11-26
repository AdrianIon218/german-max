import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

function T(){
  return <p>hei</p>
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children: [{
      element: <p>hei</p>
    }]
  }]);

function App() {

  return <RouterProvider router={router} />
}

export default App
