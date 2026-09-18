"use client";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { RiUserHeartFill } from "react-icons/ri";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { CartContext } from "../Context/CartContext";
import { signOut, useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../Context/WishlistContext";

interface NavbarProps {
  mode: "light" | "dark";
  changeMode: () => void;
}

export default function Navbar({ mode, changeMode }: NavbarProps) {
  const { isLoading, cartData } = useContext(CartContext);
  const { wishlistData } = useContext(WishlistContext);
  const session = useSession();
  const wishlistCount = wishlistData?.data?.length || 0;
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-xl border-b shadow-xs ${
        mode === "dark"
          ? "bg-[#0F0B09]/85 border-[#2c2921]/50 text-[#E8CFA8]"
          : "bg-[#f5f1e4]/85 border-[#d8cfae]/60 text-[#2c2921]"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left: Mobile Menu Trigger + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleOpen}
              className="lg:hidden p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {open ? (
                <HiX className="size-6 text-current" />
              ) : (
                <HiMenuAlt1 className="size-6 text-current" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <Image
                src="/assests/logonav.png"
                width={40}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain rounded-lg"
                alt="Velvoria Icon"
                priority
              />
              <Image
                src="/assests/logo.png"
                width={110}
                height={35}
                className="h-6 sm:h-8 w-auto object-contain"
                alt="Velvoria"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1 xl:gap-2 text-[15px] font-medium">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/products"
                      className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      Products
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/categories"
                      className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      Categories
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/brands"
                      className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      Brands
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/allorders"
                      className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      Orders
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Actions (Theme toggle, Wishlist, Cart, Account) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={changeMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle dark/light mode"
            >
              {mode === "dark" ? (
                <IoSunny className="size-5 text-[#E8CFA8]" />
              ) : (
                <BsFillMoonStarsFill className="size-5 text-[#2c2921]" />
              )}
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Wishlist"
            >
              <FaHeart className="size-5 text-[#2c2921] dark:text-[#E8CFA8]" />
              {wishlistCount > 0 && (
                <span className="size-4.5 text-[11px] font-bold flex justify-center items-center rounded-full absolute top-0 right-0 bg-[#a99e7f] text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon (if authenticated) */}
            {session.status === "authenticated" && (
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCartIcon className="size-5 text-[#2c2921] dark:text-[#E8CFA8]" />
                <Badge className="size-4.5 text-[11px] font-bold flex justify-center items-center p-0 rounded-full absolute top-0 right-0 bg-[#2c2921] text-white dark:bg-[#a99e7f]">
                  {isLoading ? (
                    <Loader2 className="animate-spin size-3" />
                  ) : (
                    cartData?.numOfCartItems ?? 0
                  )}
                </Badge>
              </Link>
            )}

            {/* User Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer outline-hidden">
                <RiUserHeartFill className="size-6 text-[#2c2921] dark:text-[#E8CFA8]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-[#f5f1e4] dark:bg-[#1f1e17] border border-[#d8cfae]/50 dark:border-[#2c2921] text-[#2c2921] dark:text-[#E8CFA8] shadow-lg rounded-xl p-1.5"
              >
                <DropdownMenuLabel className="font-semibold text-xs tracking-wider uppercase text-[#6d6852]">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
                {session.status === "authenticated" ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/allorders"
                        className="cursor-pointer rounded-lg px-2.5 py-2 hover:bg-black/5 dark:hover:bg-white/10 w-full block text-sm"
                      >
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer rounded-lg px-2.5 py-2 hover:bg-red-500/10 text-red-600 font-medium text-sm"
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="cursor-pointer rounded-lg px-2.5 py-2 hover:bg-black/5 dark:hover:bg-white/10 w-full block text-sm"
                      >
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/register"
                        className="cursor-pointer rounded-lg px-2.5 py-2 hover:bg-black/5 dark:hover:bg-white/10 w-full block text-sm font-semibold"
                      >
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="lg:hidden pb-4 pt-2 border-t border-black/10 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col gap-1 text-[15px] font-medium">
              <li>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/allorders"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Orders
                </Link>
              </li>
              {session.status !== "authenticated" && (
                <li className="pt-2 mt-1 border-t border-black/10 dark:border-white/10 flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center px-3 py-2 rounded-lg border border-[#7f7861]/40 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center px-3 py-2 rounded-lg bg-[#433f32] text-[#beb89a] text-sm font-semibold"
                  >
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
