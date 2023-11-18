import { useState } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/a" element={<p>a</p>} />
        <Route path="/" element={<p>b</p>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
