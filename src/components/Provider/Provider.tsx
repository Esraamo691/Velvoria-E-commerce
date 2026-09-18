"use client";
import ScrollToTopButton from "../../ScrollToTop";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import WishlistContextProvider from "@/components/Context/WishlistContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode === "dark") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function changeMode() {
    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setMode("dark");
      localStorage.setItem("mode", "dark");
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <>
      <ScrollToTopButton />
      <SessionProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <Navbar mode={mode} changeMode={changeMode} />
            <div
              className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
                mode === "dark"
                  ? "bg-[#0F0B09] text-[#E8CFA8]"
                  : "bg-gradient-to-b from-[#968f6e] via-[#d8cfae] to-[#f9f8f0] text-[#2c2921]"
              }`}
            >
              <div className="pb-5 w-full">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
                  <Toaster />
                  {children}
                </div>
              </div>
            </div>
            <Footer />
          </WishlistContextProvider>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
