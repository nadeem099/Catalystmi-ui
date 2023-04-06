import React, { useState } from "react";

const CartContext = React.createContext();

export const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
