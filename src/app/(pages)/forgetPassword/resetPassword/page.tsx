"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) router.push("/forgetPassword");
  }, [email, router]);

  function validatePassword(password: string) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return regex.test(password);
  }

  async function handleReset() {
    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be 8-15 chars and contain uppercase, lowercase, number, and special character"
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!email) return null;

  return (
    <div className="min-h-[75vh] w-full pt-20 sm:pt-24 pb-12 flex flex-col justify-center items-center px-4">
      <Card className="p-6 sm:p-8 w-full max-w-md bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 rounded-3xl shadow-xl text-[#615c48] dark:text-[#E8CFA8]">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-center text-[#3f3c2f] dark:text-[#E8CFA8]">
          New Password
        </h1>
        <p className="text-xs sm:text-sm text-center text-[#6d6852] dark:text-[#beb89a] mb-6">
          Set a strong new password for your account
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold block mb-1">Email</label>
            <Input
              value={email}
              readOnly
              className="bg-black/5 dark:bg-white/5 rounded-xl cursor-not-allowed opacity-80"
            />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1">
              New Password
            </label>
            <Input
              placeholder="Enter new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white/70 dark:bg-black/30 rounded-xl"
            />
          </div>

          <Button
            onClick={handleReset}
            disabled={isLoading || !newPassword}
            className="w-full py-5 rounded-full font-bold text-sm bg-[#433f32] text-[#cfc9ab] hover:bg-[#343026] mt-2 cursor-pointer shadow-md"
          >
            {isLoading && <Loader2 className="animate-spin size-4 mr-2" />}
            Reset Password
          </Button>
        </div>
      </Card>
    </div>
  );
}
