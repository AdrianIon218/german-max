import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";


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
