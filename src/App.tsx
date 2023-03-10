import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";

import NavBar from "./components/NavBar/NavBar";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import SignUp from "./components/SignUp/SignUp";
import StrainDetail from "./components/StrainDetail/StrainDetail";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { StrainProvider } from "./context/StrainsContext";

import Home from "./pages/Home";
import { useToken } from "./zustand/store";

function App() {
  const token = useToken();
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <StrainProvider>
          <ShoppingCart />
          <NavBar />
          <Routes>
            {token ? (
              <Route path="/" element={<Home />} />
            ) : (
              <Route path="/" element={<Navigate replace to="/login" />} />
            )}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/strains/:id" element={<StrainDetail />} />
          </Routes>
        </StrainProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
