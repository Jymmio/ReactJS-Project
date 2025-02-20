import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/pages/HomePage";
import { UserProvider } from "./components/context/UserContext";
import './App.css'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
