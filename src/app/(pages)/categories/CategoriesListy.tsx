"use client";

import { motion } from "framer-motion";
import { CategoryI } from "@/interfaces";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CategoriesClientProps {
  categories: CategoryI[];
}

export default function CategoriesListy({ categories }: CategoriesClientProps) {
  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 min-h-[75vh]">
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#3f3c2f] dark:text-[#E8CFA8]">
          Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mt-1">
          Explore our exclusive collections by category
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="h-full flex"
          >
            <Link
              href={`/products?category=${category._id}`}
              className="w-full block group"
            >
              <Card className="p-3 sm:p-4 h-56 sm:h-68 md:h-72 w-full bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 flex flex-col overflow-hidden rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-full h-36 sm:h-48 relative overflow-hidden rounded-xl bg-white/40 dark:bg-black/20">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="p-0 text-center mt-3 flex-1 flex items-center justify-center">
                  <CardTitle className="font-bold text-xs sm:text-sm md:text-base text-[#3f3c2f] dark:text-[#E8CFA8] line-clamp-1 group-hover:underline underline-offset-4">
                    {category.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
