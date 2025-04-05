import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 max-w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-4 shadow-white/40 font-bold flex items-center justify-between">
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="text-[24px] font-bold text-gray-400 flex items-center opacity-100 transition-colors py-2 px-3 cursor-pointer text-nowrap">
          Student Hub
          <span className="material-symbols-outlined text-[34px] text-gray-400 ml-2">
            school
          </span>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="relative hidden lg:flex items-center justify-center w-full h-full">
        <input
          type="text"
          className="pl-8 pr-4 py-4 lg:w-[600px] bg-black/40 border-[0.1rem] border-gray-900/70 font-normal text-gray-200 placeholder-gray-300 focus:outline-none rounded-full"
          placeholder="Search resources..."
        />
      </div> */}

      {/* Menu Button for Mobile */}
      <button
        className="lg:hidden text-gray-400 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="material-symbols-outlined text-3xl">menu</span>
      </button>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-4">
        {/* <Link href="/feedback" className="hover:underline">
          Feedback
        </Link> */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden -z-10 fixed left-0 w-full bg-black/80 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "top-[85px] backdrop-blur-lg"
            : "top-0 -translate-y-full backdrop-blur-sm"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 h-[calc(100vh-80px)]">
          <li onClick={() => setMenuOpen(!menuOpen)}>
            <Link href="/dashboard" className="text-white text-lg">
              Dashboard
            </Link>
          </li>
          <li onClick={() => setMenuOpen(!menuOpen)}>
            <Link href="/courses" className="text-white text-lg">
              My Courses
            </Link>
          </li>
          <li onClick={() => setMenuOpen(!menuOpen)}>
            <Link href="/account" className="text-white text-lg">
              Account
            </Link>
          </li>
          {/* <li onClick={() => setMenuOpen(!menuOpen)}>
            <Link href="/feedback" className="text-white text-lg">
              Feedback
            </Link>
          </li> */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
