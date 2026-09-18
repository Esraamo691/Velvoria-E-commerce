"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
});

type FormFields = z.infer<typeof formSchema>;

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormFields) {
    if (!values.email) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      router.push(`/forgetPassword/verifyCode?email=${values.email}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[75vh] w-full pt-20 sm:pt-24 pb-12 flex flex-col justify-center items-center px-4">
      <Card className="p-6 sm:p-8 w-full max-w-md bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 rounded-3xl shadow-xl text-[#615c48] dark:text-[#E8CFA8]">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-center text-[#3f3c2f] dark:text-[#E8CFA8]">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-center text-[#6d6852] dark:text-[#beb89a] mb-6">
          Enter your registered email address to receive a verification code
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      className="bg-white/70 dark:bg-black/30 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-full font-bold text-sm bg-[#433f32] text-[#cfc9ab] hover:bg-[#343026] mt-2 cursor-pointer shadow-md"
            >
              {isLoading && <Loader2 className="animate-spin size-4 mr-2" />}
              Send Verification Code
            </Button>
            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-xs text-[#6d6852] dark:text-[#beb89a] hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
