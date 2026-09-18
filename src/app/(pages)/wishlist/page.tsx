"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { WishlistContext } from "@/components/Context/WishlistContext";
import { Button } from "@/components/ui/button";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import AddToCart from "@/components/AddToCart/AddToCart";
import Image from "next/image";

export default function Wishlist() {
  const { wishlistData, isLoading, setWishlistData } =
    useContext(WishlistContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] pt-20">
        <p className="text-[#6d6852] dark:text-[#beb89a] text-lg font-medium">
          Loading wishlist...
        </p>
      </div>
    );
  }

  if (!wishlistData?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[70vh] pt-20 px-4">
        <div className="relative size-40 sm:size-52 mb-6 opacity-80">
          <Image
            src="/assests/cracked heart.svg"
            fill
            className="object-contain"
            alt="Empty wishlist"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-[#413c31] dark:text-[#E8CFA8]">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mb-6 max-w-sm">
          Looks like you haven’t saved any items yet. Explore our collections and find what you love!
        </p>
        <Link href="/products">
          <Button className="px-8 py-5 rounded-full bg-[#433f32] text-[#E8CFA8] font-bold text-sm">
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 min-h-[75vh]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#3f3c2f] dark:text-[#E8CFA8]">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mt-0.5">
            {wishlistData.data.length} saved {wishlistData.data.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-[#7f7861]/40 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
          onClick={() => setWishlistData(null)}
        >
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {wishlistData.data.map((item: any) => {
          const p = item.product || item;
          return (
            <div
              key={p._id || p.id}
              className="bg-[#ece8d7] dark:bg-[#201b16] text-[#3f3c2f] dark:text-[#E8CFA8] border border-[#d8cfae]/50 dark:border-white/10 shadow-xs hover:shadow-lg rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between relative transition-all duration-300"
            >
              <AddToWishlist productId={p._id || p.id} />
              <Link href={`/products/${p._id || p.id}`} className="block flex-1 flex flex-col">
                <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-white/40 dark:bg-black/20 mb-3">
                  <Image
                    src={p.imageCover}
                    alt={p.title || "Product"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-xs sm:text-sm md:text-base font-bold mb-1 line-clamp-2 leading-tight">
                  {p.title}
                </h2>
                <p className="text-xs sm:text-sm font-extrabold text-[#6d6852] dark:text-[#beb89a] mt-auto pb-3">
                  {p.price} EGP
                </p>
              </Link>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex gap-2 items-center">
                <Link
                  href={`/products/${p._id || p.id}`}
                  className="flex-1 text-center py-2 px-2 rounded-full text-xs font-semibold bg-[#ace8a8]/80 text-[#2c2921] hover:bg-[#ace8a8] transition-colors"
                >
                  Details
                </Link>
                <div className="flex-1">
                  <AddToCart productId={p._id || p.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
