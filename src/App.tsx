import "./App.css";
import Strains from "./components/Strains/Strains";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import StrainDetail from "./components/StrainDetail/StrainDetail";

const Home = () => (
  <div className="App">
    <h1>Fake Cannabis Shop</h1>
    <p>Click on strains below and start shopping now!</p>
    <Strains />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/strains/:id" element={<StrainDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
