"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMindmapMenu, setShowMindmapMenu] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/sign-in";
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleMindmapMenu = () => {
    setShowMindmapMenu(!showMindmapMenu);
  };

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
          <span className="text-4xl font-bold text-[#7ed957]">
            Learn English In A Versatile Way
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
            {/* User Info (Carrot & Streak) */}
            <div className="flex items-center gap-2 mr-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/carrot.png"
                  alt="Carrot icon"
                  width={50}
                  height={50}
                />
                <span className="text-[#505252] font-bold text-lg">3</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/treak.png"
                  alt="Streak icon"
                  width={50}
                  height={50}
                />
                <span className="text-[#505252] font-bold text-lg">3</span>
              </div>
            </div>
            
            {/* The main button that shows/hides the dropdown */}
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-2 border border-[#cfd1ce] rounded-md px-5 py-2 bg-transparent text-[#a3a3a3] font-semibold text-xl hover:bg-[#f3f3f3]"
            >
              {/* Bluebird is now part of the button and absolutely positioned */}
              <Image
                src="/bluebird.gif"
                alt="Bluebird"
                width={100}
                height={100}
                className="absolute -top-13 left-1/2 -translate-x-1/2 z-20"
              />
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
            
            {/* User dropdown menu */}
            {showUserMenu && (
              <div
                className="absolute right-0 top-full mt-3 bg-white shadow-lg rounded-md py-2 px-6 flex flex-col min-w-[220px] z-30"
              >
                <Link href="/my-profile" className="flex items-center gap-2 text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">
                  <Image src="/profile-icon.png" alt="Profile icon" width={30} height={30} />
                  My profile
                </Link>
                <Link href="/carrot-shop" className="flex items-center gap-2 text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">
                  <Image src="/carrot-icon.png" alt="Carrot icon" width={30} height={30} />
                  Carrot shop
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded text-left w-full"
                >
                  <Image src="/logout-icon.png" alt="Logout icon" width={30} height={30} />
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
            width={50}
            height={50}
            priority
          />
          HOME
        </Link>
        <div className="relative">
          <button
            onClick={toggleMindmapMenu}
            className="text-white font-bold text-2xl tracking-wide"
          >
            MINDMAP
          </button>
          {showMindmapMenu && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white shadow-lg rounded-md py-2 px-4 flex flex-col min-w-[220px] z-10">
              <Link href="/mindmap/grammar" className="text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">
                Grammar mindmap
              </Link>
              <Link href="/mindmap/vocabulary" className="text-[#505252] font-semibold py-2 hover:bg-gray-100 rounded">
                Vocabulary mindmap
              </Link>
            </div>
          )}
        </div>
        <Link href="/ai-tutor" className="text-white font-bold text-2xl tracking-wide">
          AI TUTOR
        </Link>
        <Link href="/practice" className="text-white font-bold text-2xl tracking-wide">
          PRACTICE
        </Link>
        <Link href="/community" className="text-white font-bold text-2xl tracking-wide">
          COMMUNITY
        </Link>
                <Link href="/community" className="text-white font-bold text-2xl tracking-wide">
          ABOUT ME
        </Link>
      </nav>
    </header>
  );
}
