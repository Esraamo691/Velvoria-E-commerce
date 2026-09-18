"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type FormFields = z.infer<typeof formSchema>;

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormFields) {
    setErrorMessage("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setIsLoading(false);

    if (res?.error) {
      setErrorMessage("Invalid email or password");
      return;
    }

    router.push("/");
  }

  return (
    <Card className="p-6 sm:p-8 w-full max-w-md mx-auto text-[#615c48] dark:text-[#E8CFA8] shadow-xl bg-[#ece8d7] dark:bg-[#201b16] border border-[#d8cfae]/50 dark:border-white/10 rounded-3xl">
      <h2 className="text-center text-2xl font-bold font-serif mb-6">
        Sign In
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    type="email"
                    className="bg-white/70 dark:bg-black/30 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    className="bg-white/70 dark:bg-black/30 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <p className="text-red-500 text-xs text-center font-medium">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="text-[#cfc9ab] bg-[#433f32] hover:bg-[#343026] w-full py-5 rounded-full font-bold text-sm cursor-pointer shadow-md"
          >
            {isLoading && <Loader2 className="animate-spin mr-2 size-4" />}
            Login
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs">
            <Link
              href="/forgetPassword"
              className="text-[#615c48] dark:text-[#beb89a] hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              href="/register"
              className="font-bold text-[#433f32] dark:text-[#E8CFA8] hover:underline"
            >
              Create an account
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
}
