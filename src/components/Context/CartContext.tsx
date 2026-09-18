"use client";
import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => Promise<void>;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();

  const getCart = useCallback(async () => {
    if (session.status === "authenticated") {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/get-cart`);
        if (response.ok) {
          const data: CartResponse = await response.json();
          setCartData(data);
          if (data?.data?.cartOwner) {
            localStorage.setItem("userId", data.data.cartOwner);
          }
        } else {
          setCartData(null);
        }
      } catch (err) {
        console.error("Cart error:", err);
      } finally {
        setIsLoading(false);
      }
    } else if (session.status === "unauthenticated") {
      setIsLoading(false);
      setCartData(null);
    }
  }, [session.status]);

  useEffect(() => {
    if (session.status === "authenticated") {
      getCart();
    } else if (session.status === "unauthenticated") {
      setIsLoading(false);
      setCartData(null);
    }
  }, [session.status, getCart]);

  return (
    <CartContext.Provider
      value={{ isLoading, setIsLoading, cartData, setCartData, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
