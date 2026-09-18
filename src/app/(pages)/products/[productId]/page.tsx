import { ProductI } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StarIcon from "@/components/icons/starIcon";
import ProductSlider from "@/components/productSlider/productSlider";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function ProductDetails(props: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await props.params;
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId,
    { next: { revalidate: 10 * 60 } }
  );
  const { data: product }: { data: ProductI } = await response.json();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center pt-20">
        <p className="text-lg text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 sm:pt-24 pb-12">
      <Card className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-4 sm:p-8 bg-[#ece8d7]/70 dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 rounded-3xl shadow-lg items-start">
        {/* Images Carousel */}
        <div className="md:col-span-5 w-full">
          <ProductSlider
            images={product.images && product.images.length > 0 ? product.images : [product.imageCover]}
            altContent={product.title}
          />
        </div>

        {/* Details Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#433f32] text-[#E8CFA8]">
                {product.brand?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                Category: {product.category?.name}
              </span>
            </div>

            <CardTitle className="text-xl sm:text-3xl font-bold text-[#3f3c2f] dark:text-[#E8CFA8] leading-tight">
              {product.title}
            </CardTitle>

            <CardDescription className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/40 dark:bg-black/20">
              <div className="flex items-center gap-1.5">
                <StarIcon />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {product.ratingsAverage}
                </span>
                <span className="text-xs text-gray-500">
                  ({product.ratingsQuantity} ratings)
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                In Stock: <span className="font-semibold">{product.quantity} items</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#3f3c2f] dark:text-[#E8CFA8]">
                {product.price}
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
                EGP
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-0 pt-4 flex flex-row items-center gap-3">
            <div className="relative shrink-0">
              <AddToWishlist productId={product.id} />
            </div>
            <div className="flex-1">
              <AddToCart productId={product.id} />
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
