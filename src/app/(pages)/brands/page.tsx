import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { brandI } from "@/interfaces";

export default async function Brands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    { next: { revalidate: 10 * 60 } }
  );
  const { data: brands }: { data: brandI[] } = await response.json();

  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 min-h-[75vh]">
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#3f3c2f] dark:text-[#E8CFA8]">
          Featured Brands
        </h1>
        <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mt-1">
          Top tier quality from authentic global brands
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {brands && brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand._id} className="h-full">
              <Link
                href={`/products?brand=${brand._id}`}
                className="w-full block group"
              >
                <Card className="p-3 sm:p-4 h-52 sm:h-64 md:h-68 w-full flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 shadow-xs hover:shadow-lg text-[#3f3c2f] dark:text-[#E8CFA8] bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10">
                  <div className="w-full h-32 sm:h-44 relative bg-white/70 dark:bg-black/30 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader className="p-0 text-center mt-2 flex-1 flex items-center justify-center">
                    <CardTitle className="font-bold text-xs sm:text-sm md:text-base line-clamp-1 group-hover:underline underline-offset-4">
                      {brand.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No brands found.
          </div>
        )}
      </div>
    </div>
  );
}
