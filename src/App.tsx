import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import StrainDetail from "./components/StrainDetail/StrainDetail";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { StrainProvider } from "./context/StrainsContext";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <StrainProvider>
        <ShoppingCart  />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/strains/:id" element={<StrainDetail />} />
          </Routes>
        </StrainProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
