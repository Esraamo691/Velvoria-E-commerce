"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "animate.css";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden min-h-[calc(100vh-5rem)] flex items-center pt-20 sm:pt-24 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* Left Column - Hero Content */}
        <div className="lg:col-span-6 w-full px-2 sm:px-6 md:px-8 flex flex-col justify-center">
          {/* Rating Badge */}
          <div className="flex gap-3 justify-center lg:justify-start items-center">
            <div className="bg-black text-white flex justify-center items-center size-9 sm:size-10 rounded-full shrink-0 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4.5 sm:size-5 text-amber-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-xs sm:text-sm">
              <p className="font-bold">5.0 Rated</p>
              <p className="opacity-90">
                Read Our{" "}
                <span className="underline font-bold">Success Stories</span>
              </p>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-bold my-4 sm:my-6 pb-4 sm:pb-6 border-b border-[#7f7861]/40 font-serif text-center lg:text-start text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-balance">
            Velvoria
          </h1>

          {/* Description & Testimonial */}
          <div className="py-4 border-b border-[#7f7861]/40 space-y-4">
            <p className="text-sm sm:text-base text-[#6d6852] dark:text-[#c4b998] font-semibold text-center lg:text-start leading-relaxed">
              Easily Add And Organize Events, With Notifications To Keep
              Everyone Engaged
            </p>
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-4">
              <Image
                src="/assests/person.jpg"
                width={48}
                height={48}
                className="size-11 sm:size-12 rounded-full border-2 border-[#7f7861] object-cover shrink-0"
                alt="Client feedback"
              />
              <div className="flex gap-6 items-center text-xs sm:text-sm">
                <p className="text-[#3f3c2f] dark:text-[#E8CFA8] font-semibold">
                  Loved the performance
                  <br />
                  100% Satisfied
                </p>
                <p className="font-bold flex items-center gap-1">
                  /{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4.5 sm:size-5 text-amber-500 inline"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4.9
                </p>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-6 sm:mt-8">
            <Link href="/products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer px-8 py-6 bg-transparent text-[#433f32] dark:text-[#E8CFA8] border-2 font-bold border-[#6d6852] hover:bg-[#6d6852]/10 rounded-full text-sm sm:text-[15px] transition-all">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer rounded-full text-sm sm:text-[15px] px-8 py-6 text-[#beb89a] bg-[#433f32] hover:bg-[#343026] transition-all shadow-md">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column - Hero Visuals */}
        <div className="lg:col-span-6 w-full flex justify-center items-center mt-6 lg:mt-0 relative px-4">
          <div className="w-full max-w-[340px] sm:max-w-[370px] relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/assests/welcome7.jpg"
              alt="Velvoria Collection"
              fill
              priority
              className="object-cover rounded-3xl animate__animated animate__fadeIn"
            />

            {/* Engagement floating badge */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto flex items-center backdrop-blur-xl bg-white/75 dark:bg-black/60 rounded-full border border-[#beb89a]/60 text-black dark:text-white p-2 sm:p-3 sm:px-4 shadow-lg animate__animated animate__fadeInDown">
              <span className="size-6 sm:size-7 rounded-full bg-black text-white flex justify-center items-center me-2.5 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-3.5 sm:size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </span>
              <span className="text-xs sm:text-sm font-semibold truncate">
                Increase in Engagement
              </span>
            </div>

            {/* Pill Badges on Bottom Left */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
              <div className="flex items-center backdrop-blur-xl bg-black/70 text-white rounded-full border border-white/20 py-1.5 px-3.5 shadow-md text-xs sm:text-sm font-medium">
                <span className="size-5 rounded-full bg-white text-black flex justify-center items-center me-2 text-xs font-bold">
                  +
                </span>
                Verno
              </div>
              <div className="flex items-center backdrop-blur-xl bg-black/70 text-white rounded-full border border-white/20 py-1.5 px-3.5 shadow-md text-xs sm:text-sm font-medium">
                <span className="size-5 rounded-full bg-white text-black flex justify-center items-center me-2 text-xs font-bold">
                  +
                </span>
                Wellness
              </div>
              <div className="flex items-center backdrop-blur-xl bg-black/70 text-white rounded-full border border-white/20 py-1.5 px-3.5 shadow-md text-xs sm:text-sm font-medium">
                <span className="size-5 rounded-full bg-white text-black flex justify-center items-center me-2 text-xs font-bold">
                  +
                </span>
                Fashion
              </div>
            </div>

            {/* Floating Thumbnails on Bottom Right */}
            <div className="absolute bottom-4 right-4 backdrop-blur-xl bg-white/40 dark:bg-black/40 p-2 rounded-2xl flex flex-col gap-2 shadow-lg border border-white/20">
              <div className="size-11 sm:size-13 rounded-xl overflow-hidden relative shadow-xs">
                <Image
                  src="/assests/welcopy.jpg"
                  alt="Thumb 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="size-11 sm:size-13 rounded-xl overflow-hidden relative shadow-xs">
                <Image
                  src="/assests/welcome11.jpg"
                  alt="Thumb 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="size-11 sm:size-13 rounded-xl overflow-hidden relative shadow-xs">
                <Image
                  src="/assests/welcome55.jpg"
                  alt="Thumb 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
