"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

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
        {/* Login/Signup Button or User Profile */}
        {!isLoaded || !isSignedIn ? (
          <Link href="/sign-in" className="flex items-center gap-1 border border-[#cfd1ce] rounded-md px-5 py-2 bg-transparent text-[#a3a3a3] font-semibold text-xl hover:bg-[#f3f3f3]">
            <Image
              src="/user.png"
              alt="User icon"
              width={28}
              height={28}
            />
            Log in / Sign up
          </Link>
        ) : (
          <div className="flex items-center gap-2 relative">
            <Image
              src="/bunny-ears.png"
              alt="Bunny ears"
              width={50}
              height={50}
              className="absolute -top-6 -right-2"
            />
            <button
              className="flex items-center gap-2 border border-[#cfd1ce] rounded-md px-5 py-2 bg-transparent text-[#a3a3a3] font-semibold text-xl hover:bg-[#f3f3f3]"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <Image
                src={user.imageUrl}
                alt="User avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-[#505252] font-semibold text-xl">
                {user.firstName ? user.firstName.toUpperCase() : "PROFILE"}
              </span>
            </button>
            {showMenu && (
              <div
                className="absolute right-0 top-full mt-3 bg-white shadow-lg rounded-md py-2 px-6 flex flex-col min-w-[220px] z-10"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
              >
                <Link href="/my-profile" className="flex items-center gap-2 text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">
                  <Image src="/profile-icon.png" alt="Profile icon" width={20} height={20} />
                  My profile
                </Link>
                <Link href="/carrot-shop" className="flex items-center gap-2 text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">
                  <Image src="/carrot-icon.png" alt="Carrot icon" width={20} height={20} />
                  Carrot shop
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded text-left w-full"
                >
                  <Image src="/logout-icon.png" alt="Logout icon" width={20} height={20} />
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Navigation Bar */}
      <nav className="mt-1 bg-[#505252] py-5 flex justify-center gap-25 relative">
        <Link href="/" className="flex items-center gap-0 text-white font-bold text-2xl tracking-wide">
          <Image
            src="/home.png"
            alt="Home icon"
            width={35}
            height={35}
            priority
          />
          HOME
        </Link>
        <Link href="/mindmap" className="text-white font-bold text-2xl tracking-wide">
          MINDMAP
        </Link>
        <Link href="/ai-tutor" className="text-white font-bold text-2xl tracking-wide">
          AI TUTOR
        </Link>
        <Link href="/practice" className="text-white font-bold text-2xl tracking-wide">
          PRACTICE
        </Link>
        <Link href="/community" className="text-white font-bold text-2xl tracking-wide">
          COMMUNITY
        </Link>
      </nav>
    </header>
  );
}
