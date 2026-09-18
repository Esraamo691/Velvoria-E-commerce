"use client";
import { ProductI } from "@/interfaces/product";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import StarIcon from "@/components/icons/starIcon";

export default function ProductsList({ products }: { products: ProductI[] }) {
  return (
    <div className="w-full pt-20 sm:pt-24 pb-12">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="h-full flex"
            >
              <Card className="relative w-full bg-[#ece8d7] dark:bg-[#25201a] border border-[#d8cfae]/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <AddToWishlist productId={product.id} />
                
                <Link
                  href={`/products/${product.id}`}
                  className="flex-1 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative w-full aspect-square bg-white/40 dark:bg-black/20 overflow-hidden">
                    <Image
                      src={product.imageCover}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      alt={product.title}
                    />
                  </div>

                  {/* Product Info */}
                  <CardHeader className="p-2.5 sm:p-3 pb-1 sm:pb-1">
                    <CardTitle className="text-xs sm:text-sm font-bold text-[#3f3c2f] dark:text-[#E8CFA8] line-clamp-1 leading-snug">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-[11px] sm:text-xs text-[#6d6852] dark:text-[#beb89a] truncate mt-0.5">
                      {product.category?.name}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-2.5 sm:p-3 pt-0 sm:pt-0 mt-auto flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <StarIcon />
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {product.ratingsAverage}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#3f3c2f] dark:text-[#E8CFA8] shrink-0">
                      {product.price}{" "}
                      <span className="text-[10px] sm:text-xs font-normal">
                        EGP
                      </span>
                    </p>
                  </CardContent>
                </Link>

                <AddToCart productId={product.id} />
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
          <p className="text-lg font-medium text-gray-500 mb-4">
            No products found.
          </p>
          <Link
            href="/products"
            className="px-6 py-2.5 rounded-full bg-[#433f32] text-[#E8CFA8] font-semibold text-sm"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
