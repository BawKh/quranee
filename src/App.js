import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/MyNavbar";
import Home from "./components/Home";
import AppFooter from "./components/Footer";
import Moshaph from "./components/Moshaph";
import Surahs from "./components/Surah";
import GoToTopButton from "./components/GoToTop";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/moshaph" element={<Moshaph />}></Route>
        <Route path="/moshaph/:surahID" element={<Surahs />}></Route>
      </Routes>
      <GoToTopButton />
      <AppFooter />
    </>
  );
}

export default App;
