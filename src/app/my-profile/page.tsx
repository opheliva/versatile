"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-[#505252]">Loading profile...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-[#505252]">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf6] p-10 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <div className="relative">
            <Image
              src={user.imageUrl}
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full border-4 border-[#7ed957] shadow-md"
            />
            {/* Vị trí để thêm "filter" như chim xanh */}
            <Image
              src="/bluebird.gif"
              alt="Bluebird"
              width={80}
              height={80}
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-10"
            />
          </div>
          <h1 className="text-4xl font-bold text-[#505252] mt-4">
            {user.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-[#a3a3a3] mt-1">
            {user.emailAddresses[0]?.emailAddress}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Image
                src="/treak.png"
                alt="Streak icon"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-[#505252]">3</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/carrot.png"
                alt="Carrot icon"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-[#505252]">150</span>
            </div>
          </div>
        </div>
        
        {/* Phần Thành Tích */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-[#505252] mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {/* Thẻ thành tích */}
            <div className="bg-[#f3f3f3] p-4 rounded-lg shadow">
              <span className="text-4xl">🏅</span>
              <p className="text-[#505252] font-semibold mt-2">First Lesson</p>
            </div>
            <div className="bg-[#f3f3f3] p-4 rounded-lg shadow">
              <span className="text-4xl">🔥</span>
              <p className="text-[#505252] font-semibold mt-2">7-Day Streak</p>
            </div>
            <div className="bg-[#f3f3f3] p-4 rounded-lg shadow">
              <span className="text-4xl">⭐</span>
              <p className="text-[#505252] font-semibold mt-2">Perfect Score</p>
            </div>
          </div>
        </section>

        {/* Phần Thống kê học tập */}
        <section>
          <h2 className="text-2xl font-bold text-[#505252] mb-4">Learning Progress</h2>
          <div className="bg-[#f3f3f3] p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold text-[#505252]">Lessons Completed</p>
                <span className="text-3xl text-[#7ed957] font-extrabold">12</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold text-[#505252]">Words Learned</p>
                <span className="text-3xl text-[#7ed957] font-extrabold">250</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
