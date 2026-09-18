"use client";
import { CardFooter } from "../ui/card";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartData } = useContext(CartContext);

  const session = useSession();
  const router = useRouter();

  async function addProductToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (session.status === "authenticated") {
      setIsLoading(true);
      const data = await addToCartAction(productId);
      setCartData(data);
      if (data.status === "success") {
        toast.success(data.message);
      }
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }

  return (
    <CardFooter className="p-2 sm:p-3 pt-0 sm:pt-0">
      <Button
        disabled={isLoading}
        onClick={addProductToCart}
        className="w-full cursor-pointer rounded-full text-xs sm:text-sm font-semibold h-9 sm:h-10 py-1.5 px-3 flex items-center justify-center gap-1.5 text-[#E8CFA8] bg-[#635d4a] hover:bg-[#433f32] transition-colors shadow-xs"
      >
        {isLoading ? (
          <Loader2 className="animate-spin size-3.5 sm:size-4" />
        ) : (
          <ShoppingCartIcon className="size-3.5 sm:size-4" />
        )}
        <span>Add to Cart</span>
      </Button>
    </CardFooter>
  );
}
