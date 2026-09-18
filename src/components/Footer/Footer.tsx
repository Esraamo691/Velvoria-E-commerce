import React from "react";
import Image from "next/image";
import { ImLinkedin } from "react-icons/im";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { IoHeartCircleSharp } from "react-icons/io5";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#7f7861]/30 bg-[#1f1e17] text-[#beb89a] px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">
      <div className="container max-w-7xl mx-auto py-10 sm:py-12 border-b border-[#beb89a]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assests/logo.png"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                alt="Velvoria"
              />
            </Link>
            <p className="text-[#beb89a] text-sm sm:text-base max-w-md leading-relaxed">
              Discover the latest technology, fashion, and lifestyle products.
              Quality guaranteed with fast shipping and excellent customer
              service.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/esraa-mohamed-955222320"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#beb89a] hover:text-white transition-colors"
              >
                <ImLinkedin className="size-4.5" />
              </a>
              <a
                href="https://github.com/Esraamo691"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#beb89a] hover:text-white transition-colors"
              >
                <FaGithub className="size-4.5" />
              </a>
              <a
                href="https://www.facebook.com/share/1FWEW1EWN4/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#beb89a] hover:text-white transition-colors"
              >
                <FaFacebookF className="size-4.5" />
              </a>
              <a
                href="https://www.instagram.com/esraa5238mohamed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#beb89a] hover:text-white transition-colors"
              >
                <FaInstagram className="size-4.5" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
            <div>
              <h2 className="text-[#d8cfae] font-semibold text-base mb-3">
                Product
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:text-white transition-colors"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="hover:text-white transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#d8cfae] font-semibold text-base mb-3">
                Resources
              </h2>
              <ul className="space-y-2">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Documentation
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Tutorials
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Support
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[#d8cfae] font-semibold text-base mb-3">
                Company
              </h2>
              <ul className="space-y-2">
                <li className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Partners
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container max-w-7xl mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center sm:text-left text-[#beb89a]/80">
        <p className="flex items-center justify-center gap-1.5">
          <IoHeartCircleSharp className="text-lg text-[#d8cfae]" /> © 2025
          Velvoria, All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:underline cursor-pointer">Cookies Settings</span>
        </div>
      </div>
    </footer>
  );
}
