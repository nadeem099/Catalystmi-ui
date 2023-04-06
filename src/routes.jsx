import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import { MasterLayout } from "./layout";
import { CartContextProvider } from "./contexts/CartContext";

const Routers = () => {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <MasterLayout>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/products" element={<App />} />
              <Route path="/featured" element={<App />} />
            </Route>
          </Routes>
        </MasterLayout>
      </CartContextProvider>
    </BrowserRouter>
  );
};

export default Routers;
