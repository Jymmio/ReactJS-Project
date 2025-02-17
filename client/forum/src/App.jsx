import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/pages/HomePage";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
