"use client";

import Link from "next/link";
import { Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/images/logo.png";
import Image from "next/image";
import { InputIcon } from "../InputIcon";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Nzenzu Logo" width={80} height={80} />
            <span className="text-xl text-gray-900 dark:text-white">Info<span className="font-bold ark:text-white">Nzenzu</span></span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/single-post" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Single Post
            </Link>
            <Link href="/pages" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Pages
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <InputIcon
                className='border-gray-200 rounded-4xl py-0.5'
                placeholder='Search'
                Icon={<Search />}
              />
            </div>

            <Button variant="ghost" size="icon">
              <Sun className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
