import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout />}>
        
        </Route>
        <Route path="/a" element={<p>a</p>} />
        <Route path="/" element={<p>b</p>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
