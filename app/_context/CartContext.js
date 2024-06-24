"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  useEffect(() => {
    document.querySelector("html").className =
      window.localStorage.theme || "dark";
  }, []);
  const [cart, setCart] = useState({
    products: [],
    cartId: undefined,
    amount: 0,
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
