import React from "react";
import { LoginForm } from "./_Components/LoginForm/LoginForm";

export default function Login() {
  return (
    <div className="min-h-[75vh] w-full pt-20 sm:pt-24 pb-12 flex flex-col justify-center items-center px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#3f3c2f] dark:text-[#E8CFA8]">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-[#6d6852] dark:text-[#beb89a] mt-1">
          Sign in to your Velvoria account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
