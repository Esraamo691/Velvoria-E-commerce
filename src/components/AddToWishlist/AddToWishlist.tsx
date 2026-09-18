"use client";
import { useContext, useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { WishlistContext } from "@/components/Context/WishlistContext";
import { addToWishlistAction } from "@/app/(pages)/products/_action/addToWishlist.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddToWishlist({ productId }: { productId: string }) {
  const { wishlistData, getWishlist, removeProduct } =
    useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const found = wishlistData?.data?.some(
      (item: any) => item._id === productId
    );
    setIsInWishlist(!!found);
  }, [wishlistData, productId]);

  async function addProduct() {
    if (session.status === "authenticated") {
      try {
        const data = await addToWishlistAction(productId);
        if (data.status === "success") {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
          await getWishlist();
        } else {
          toast.error("Failed to add product");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    } else {
      router.push("/login");
    }
  }

  async function removeProductFromWishlist() {
    setIsInWishlist(false);
    try {
      await removeProduct(productId);
    } catch (error) {
      toast.error("Error removing product");
      console.error(error);
    }
  }

  async function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      await removeProductFromWishlist();
    } else {
      await addProduct();
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className="cursor-pointer absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xs hover:scale-110 transition-transform shadow-xs"
      aria-label="Add to wishlist"
    >
      {isInWishlist ? (
        <FaHeart className="size-4 sm:size-5 text-[#8c734b] dark:text-[#E8CFA8]" />
      ) : (
        <FaRegHeart className="size-4 sm:size-5 text-[#8c734b] dark:text-[#E8CFA8]" />
      )}
    </button>
  );
}
