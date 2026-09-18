"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function Checkout({ cartId }: { cartId: string }) {
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const [checkoutVisa, setCheckoutVisa] = useState<boolean>(false);
  const [checkoutCash, setCheckoutCash] = useState<boolean>(false);

  async function checkoutSession() {
    setCheckoutVisa(true);
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };
    try {
      const response = await fetch("/api/checkout-visa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, shippingAddress }),
      });

      const data = await response.json();
      if (data.status === "success") {
        location.href = data.session.url;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckoutVisa(false);
    }
  }

  async function createCashOrder() {
    setCheckoutCash(true);
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };

    try {
      const response = await fetch("/api/checkout-cash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, shippingAddress }),
      });
      const data = await response.json();
      if (data.status === "success") {
        location.href = "/allorders";
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckoutCash(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-11 text-xs sm:text-sm text-[#433f32] dark:text-[#E8CFA8] border-2 font-bold border-[#6d6852] rounded-xl bg-transparent hover:text-[#E8CFA8] hover:bg-[#363326] cursor-pointer shadow-xs transition-colors">
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[92vw] rounded-2xl bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 p-5 sm:p-6 text-[#3f3c2f] dark:text-[#E8CFA8]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold font-serif">
            Shipping Details
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a]">
            Enter your address and contact details to proceed with your order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3.5 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="city" className="text-xs font-semibold">
              City
            </Label>
            <Input
              ref={cityInput}
              id="city"
              placeholder="e.g. Cairo"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="details" className="text-xs font-semibold">
              Address Details
            </Label>
            <Input
              ref={detailsInput}
              id="details"
              placeholder="Street, building, apartment"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Phone Number
            </Label>
            <Input
              ref={phoneInput}
              id="phone"
              placeholder="01xxxxxxxxx"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-xs rounded-xl border-[#7f7861]/40"
            >
              Cancel
            </Button>
          </DialogClose>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              onClick={createCashOrder}
              disabled={checkoutCash || checkoutVisa}
              className="flex-1 sm:w-auto bg-[#635d4a] hover:bg-[#433f32] text-[#E8CFA8] rounded-xl text-xs font-bold py-2"
            >
              {checkoutCash ? <Loader2 className="animate-spin size-4" /> : "Cash"}
            </Button>
            <Button
              type="button"
              onClick={checkoutSession}
              disabled={checkoutCash || checkoutVisa}
              className="flex-1 sm:w-auto bg-[#433f32] hover:bg-[#343026] text-[#beb89a] rounded-xl text-xs font-bold py-2"
            >
              {checkoutVisa ? <Loader2 className="animate-spin size-4" /> : "Visa / Card"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
