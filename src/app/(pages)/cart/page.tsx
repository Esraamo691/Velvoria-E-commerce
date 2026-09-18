"use client";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "@/app/loading";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatPrice";
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Checkout from "@/components/Checkout/Checkout";
import Image from "next/image";

export default function Cart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  useEffect(() => {
    if (
      typeof cartData?.data.products[0]?.product === "string" ||
      cartData == null
    ) {
      getCart();
    }
  }, []);

  async function removeCartItem(productId: string) {
    setRemovingId(productId);
    try {
      const response = await fetch(
        `/api/remove-cart-item?productId=${productId}`,
        { method: "DELETE" }
      );
      const data: CartResponse = await response.json();
      if (data.status === "success") {
        toast.success("Product removed from cart");
        setCartData(data);
      }
    } catch {
      toast.error("Failed to remove product");
    } finally {
      setRemovingId(null);
    }
  }

  async function clearCart() {
    setIsClearing(true);
    try {
      const response = await fetch(`/api/clear-cart`, {
        method: "DELETE",
      });
      const data: CartResponse = await response.json();
      if (data.message === "success") {
        toast.success("Cart cleared successfully");
        setCartData(null);
      }
    } catch {
      toast.error("Failed to clear cart");
    } finally {
      setIsClearing(false);
    }
  }

  async function updateCartItemCount(productId: string, count: number) {
    if (count === 0) {
      removeCartItem(productId);
    } else {
      setUpdateId(productId);
      try {
        const response = await fetch(`/api/update-cart-item`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, count }),
        });
        const data: CartResponse = await response.json();
        if (data.status === "success") {
          toast.success("Quantity updated");
          setCartData(data);
        }
      } catch {
        toast.error("Failed to update quantity");
      } finally {
        setUpdateId(null);
      }
    }
  }

  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 min-h-[75vh]">
      {isLoading || typeof cartData?.data.products[0]?.product === "string" ? (
        <Loading />
      ) : (cartData?.numOfCartItems ?? 0) > 0 ? (
        <div className="w-full max-w-7xl mx-auto px-1 sm:px-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#3f3c2f] dark:text-[#E8CFA8]">
                Shopping Cart
              </h1>
              <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mt-1">
                {cartData?.numOfCartItems} {cartData?.numOfCartItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer text-xs"
              onClick={clearCart}
              disabled={isClearing}
            >
              {isClearing ? (
                <Loader2 className="animate-spin size-3.5 mr-1" />
              ) : (
                <Trash2 className="size-3.5 mr-1" />
              )}
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 sm:gap-4 rounded-2xl border border-[#d8cfae]/50 dark:border-white/10 p-3 sm:p-4 bg-[#ece8d7]/70 dark:bg-[#201b16] shadow-xs hover:shadow-md transition-all"
                >
                  {/* Product Image */}
                  <div className="relative size-20 sm:size-24 shrink-0 rounded-xl overflow-hidden bg-white/50 dark:bg-black/20">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Controls */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm md:text-base text-[#3f3c2f] dark:text-[#E8CFA8] line-clamp-2 leading-tight">
                          {item.product.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#6d6852] dark:text-[#beb89a] truncate mt-0.5">
                          {item.product.brand?.name} • {item.product.category?.name}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                        <span className="font-bold text-xs sm:text-sm md:text-base text-[#3f3c2f] dark:text-[#E8CFA8]">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          disabled={item.count === 1}
                          onClick={() =>
                            updateCartItemCount(item.product._id, item.count - 1)
                          }
                          aria-label="Decrease quantity"
                          className="size-7 sm:size-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-sm hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs sm:text-sm">
                          {updateId === item.product._id ? (
                            <Loader2 className="animate-spin size-3.5 mx-auto" />
                          ) : (
                            item.count
                          )}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemCount(item.product._id, item.count + 1)
                          }
                          aria-label="Increase quantity"
                          className="size-7 sm:size-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-sm hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeCartItem(item.product._id || item.product.id)}
                        className="text-destructive hover:opacity-80 text-xs font-semibold flex items-center gap-1 cursor-pointer p-1.5 rounded-md hover:bg-destructive/10 transition-colors"
                        aria-label="Remove item"
                        disabled={removingId === (item.product._id || item.product.id)}
                      >
                        {removingId === (item.product._id || item.product.id) ? (
                          <Loader2 className="animate-spin size-3.5" />
                        ) : (
                          <FaTrashAlt className="size-3.5" />
                        )}
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="rounded-2xl bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 p-5 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-[#3f3c2f] dark:text-[#E8CFA8]">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal ({cartData?.numOfCartItems} items)</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(cartData?.data.totalCartPrice ?? 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-xs">
                      Free Delivery
                    </span>
                  </div>

                  <div className="border-t border-black/10 dark:border-white/10 pt-3 mt-3">
                    <div className="flex items-center justify-between text-base font-bold text-[#3f3c2f] dark:text-[#E8CFA8]">
                      <span>Total Amount</span>
                      <span className="text-lg">
                        {formatCurrency(cartData?.data.totalCartPrice ?? 0)}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 mt-4">
                      <Checkout cartId={cartData?.cartId!} />
                      <Link href="/products" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full py-5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-[#7f7861]/40 hover:bg-black/5 dark:hover:bg-white/10"
                        >
                          <ArrowLeft className="size-4" /> Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl font-bold font-serif mb-2 text-[#3f3c2f] dark:text-[#E8CFA8]">
            Your Cart Is Empty
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Looks like you haven't added anything to your cart yet. Explore our top products now!
          </p>
          <Link href="/products">
            <Button className="px-8 py-5 rounded-full bg-[#433f32] text-[#E8CFA8] font-bold text-sm">
              Discover Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
