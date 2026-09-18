"use client";

import { useEffect, useState } from "react";
import { OrdersResponse, Order } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import Link from "next/link";
import { formatCurrency } from "@/Helpers/formatPrice";
import { PackageCheck, Clock, MapPin, Calendar, CreditCard } from "lucide-react";

export default function AllUserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getUserOrders() {
    let userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    
    if (!userId) {
      try {
        const cartRes = await fetch("/api/get-cart");
        if (cartRes.ok) {
          const cartData = await cartRes.json();
          if (cartData?.data?.cartOwner) {
            userId = cartData.data.cartOwner;
            localStorage.setItem("userId", userId as string);
          }
        }
      } catch (e) {
        console.error("Failed to recover userId:", e);
      }
    }

    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId
      );
      const data: OrdersResponse = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) return <Loading />;

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center flex-col text-center pt-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3 text-[#3f3c2f] dark:text-[#E8CFA8]">
          No Orders Found
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          You haven't placed any orders yet. Start shopping and your history will show up here.
        </p>
        <Link href="/products">
          <Button className="px-8 py-5 rounded-full bg-[#433f32] text-[#E8CFA8] font-semibold text-sm">
            Make An Order
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 min-h-[75vh]">
      <div className="flex items-center justify-between gap-3 mb-6 px-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#3f3c2f] dark:text-[#E8CFA8]">
            Order History
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mt-0.5">
            You have placed {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>
      </div>

      {/* Mobile Card View (< md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 rounded-2xl bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 shadow-xs space-y-3"
          >
            {/* Top row: Order ID + Total */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <div>
                <span className="text-xs font-mono font-semibold text-muted-foreground">
                  Order #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="font-extrabold text-sm text-[#3f3c2f] dark:text-[#E8CFA8]">
                {formatCurrency(order.totalOrderPrice)}
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                  order.isPaid
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/15 text-red-700 dark:text-red-400"
                }`}
              >
                <CreditCard className="size-3" />
                {order.isPaid ? "Paid" : "Not Paid"}
              </span>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                  order.isDelivered
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                }`}
              >
                {order.isDelivered ? (
                  <PackageCheck className="size-3" />
                ) : (
                  <Clock className="size-3" />
                )}
                {order.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>

            {/* Details */}
            <div className="text-xs space-y-1.5 pt-1 text-[#6d6852] dark:text-[#beb89a]">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 shrink-0 text-muted-foreground" />
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              {order.shippingAddress?.city && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                  <span>{order.shippingAddress.city}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-x-auto w-full rounded-2xl border border-[#d8cfae]/50 dark:border-white/10 shadow-xs bg-[#ece8d7]/50 dark:bg-[#201b16]">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#2c2921] text-[#E8CFA8] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3.5 font-semibold">Order ID</th>
              <th className="px-4 py-3.5 font-semibold">Customer</th>
              <th className="px-4 py-3.5 font-semibold">Total</th>
              <th className="px-4 py-3.5 font-semibold text-center">Payment</th>
              <th className="px-4 py-3.5 font-semibold text-center">Status</th>
              <th className="px-4 py-3.5 font-semibold">Date</th>
              <th className="px-4 py-3.5 font-semibold">City</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                  #{order._id.slice(-6).toUpperCase()}
                </td>

                <td className="px-4 py-3.5">
                  <span className="font-semibold text-foreground">
                    {order.user?.name}
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">
                    {order.user?.email}
                  </span>
                </td>

                <td className="px-4 py-3.5 font-bold text-foreground">
                  {formatCurrency(order.totalOrderPrice)}
                </td>

                <td className="px-4 py-3.5 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      order.isPaid
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-500/15 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      order.isDelivered
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3.5 text-xs">
                  {order.shippingAddress?.city || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
