import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/pages/HomePage";
import ForumPage from './components/pages/ForumPage';
import PostPage from "./components/pages/PostPage";
import { UserProvider } from "./components/context/UserContext";
import './App.css'
import FavoritePage from "./components/pages/FavoritePage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/favoris/:id" element={<FavoritePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
