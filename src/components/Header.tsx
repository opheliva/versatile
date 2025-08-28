"use client";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-[#fdfcf6] px-5 pt-1 pb-0">
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-5">
          <Image
            src="/logo.png"
            alt="Versatile Logo"
            width={200}
            height={200}
            priority
          />
          <span className="text-4xl font-bold text-[#505252]">
            Learn English In The Versatile Way
          </span>
        </div>
        {/* Login/Signup Button */}
        <button className="flex items-center gap-1 border border-[#cfd1ce] rounded-md px-5 py-2 bg-transparent text-[#a3a3a3] font-semibold text-xl hover:bg-[#f3f3f3]">
          <Image
            src="/user.png"
            alt="User icon"
            width={28}
            height={28}
          />
          Log in / Sign up
        </button>
      </div>
      {/* Navigation Bar */}
      <nav className="mt-1 bg-[#505252] py-5 flex justify-center gap-25 relative">
        <a className="flex items-center gap-0 text-white font-bold text-2xl tracking-wide" href="/">
          <Image
            src="/home.png"
            alt="Home icon"
            width={35}
            height={35}
            priority
          />
          HOME
        </a>
        <div
          className="relative"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <a className="text-white font-bold text-2xl tracking-wide cursor-pointer" href="#">MINDMAP</a>
          {showMenu && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white shadow-lg rounded-md py-2 px-6 flex flex-col min-w-[220px] z-10">
              <a href="#" className="text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">Grammar Mindmap</a>
              <a href="#" className="text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">Vocabulary Mindmap</a>
            </div>
          )}
        </div>
        <a className="text-white font-bold text-2xl tracking-wide" href="#">AI TUTOR</a>
        <a className="text-white font-bold text-2xl tracking-wide" href="#">PRACTICE</a>
        <a className="text-white font-bold text-2xl tracking-wide" href="#">COMMUNITY</a>
      </nav>
    </header>
  );
}
