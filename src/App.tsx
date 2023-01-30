import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import StrainDetail from "./components/StrainDetail/StrainDetail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/strains/:id" element={<StrainDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
