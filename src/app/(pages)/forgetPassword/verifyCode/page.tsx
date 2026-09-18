"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) router.push("/forgetPassword");
  }, [email, router]);

  async function handleVerify() {
    if (!code) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: code }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid code");

      router.push(`/forgetPassword/resetPassword?email=${email}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!email) return null;

  return (
    <div className="min-h-[75vh] w-full pt-20 sm:pt-24 pb-12 flex flex-col justify-center items-center px-4">
      <Card className="p-6 sm:p-8 w-full max-w-md bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 rounded-3xl shadow-xl text-[#615c48] dark:text-[#E8CFA8]">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-center text-[#3f3c2f] dark:text-[#E8CFA8]">
          Enter Code
        </h1>
        <p className="text-xs sm:text-sm text-center text-[#6d6852] dark:text-[#beb89a] mb-6">
          We sent a verification code to <span className="font-semibold">{email}</span>
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-white/70 dark:bg-black/30 rounded-xl text-center tracking-widest text-lg font-mono font-bold"
          />
          <Button
            onClick={handleVerify}
            disabled={isLoading || !code}
            className="w-full py-5 rounded-full font-bold text-sm bg-[#433f32] text-[#cfc9ab] hover:bg-[#343026] cursor-pointer shadow-md"
          >
            {isLoading && <Loader2 className="animate-spin size-4 mr-2" />}
            Verify Code
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/forgetPassword"
              className="text-xs text-[#6d6852] dark:text-[#beb89a] hover:underline"
            >
              Change Email Address
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
