"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { schema, RegisterFormData } from "./RegisterSchema";
import { sendRegisterData } from "./AuthServices";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    setApiError(null);

    try {
      const res = await sendRegisterData(data);

      if (res.message === "success") {
        router.push("/login");
      } else {
        setApiError(res.message || res.error || "Unexpected error occurred");
      }
    } catch (err: any) {
      setApiError(err?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[75vh] w-full pt-20 sm:pt-24 pb-12 flex flex-col justify-center items-center px-4">
      <div className="bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif mb-6 text-center text-[#3f3c2f] dark:text-[#E8CFA8]">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-xs font-semibold">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01xxxxxxxxx"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-xs font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rePassword" className="text-xs font-semibold">
              Confirm Password
            </Label>
            <Input
              id="rePassword"
              type="password"
              placeholder="••••••••"
              className="bg-white/70 dark:bg-black/30 rounded-xl"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-xs">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          {apiError && (
            <p className="text-center text-red-500 text-xs font-medium mt-1">
              {apiError}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-full font-bold text-sm bg-[#433f32] text-[#cfc9ab] hover:bg-[#343026] mt-2 cursor-pointer shadow-md"
          >
            {loading && <Loader2 className="animate-spin size-4 mr-2" />}
            {loading ? "Registering..." : "Register"}
          </Button>

          <p className="text-center text-xs text-[#6d6852] dark:text-[#beb89a] mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#433f32] dark:text-[#E8CFA8] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
