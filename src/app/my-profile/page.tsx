"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Coins, 
  BookOpen, 
  Target, 
  Settings, 
  Calendar,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function MyProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);

  // Handle loading state from Clerk
  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  // Loading Screen Component
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#FDFCFB] gap-4">
        <div className="w-12 h-12 border-4 border-[#7ed957] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Loading Profile...</p>
      </div>
    );
  }

  // Auth Guard
  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FDFCFB]">
        <div className="text-center p-10 bg-white rounded-[3rem] shadow-xl border border-gray-100 max-w-sm">
          <p className="text-xl font-bold text-gray-800 mb-6">Please sign in to view your profile analytics.</p>
          <button className="bg-[#4B3621] text-white px-8 py-3 rounded-2xl font-bold transition-transform active:scale-95">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-4 md:p-10 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* PROFILE HEADER CARD */}
        <section className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-600 transition-colors">
              <Settings size={20} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            {/* Avatar Section with Accessory Slot */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-[#7ed957]/10 p-2 relative">
                <Image
                  src={user.imageUrl}
                  alt="User Avatar"
                  width={160}
                  height={160}
                  className="rounded-full shadow-inner object-cover"
                />
              </div>
              {/* Pet/Accessory Overlay (e.g., Bluebird) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 drop-shadow-xl"
              >
                <Image src="/bluebird.gif" alt="Pet Accessory" width={70} height={70} />
              </motion.div>
            </div>

            {/* Identity Info */}
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-[#4B3621] tracking-tight">
                {user.fullName || "Versatile Learner"}
              </h1>
              <p className="text-gray-400 font-medium flex items-center justify-center md:justify-start gap-2">
                <Calendar size={16} /> Member since {new Date(user.createdAt!).getFullYear()}
              </p>
              
              {/* Currency & Streak Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
                <div className="flex items-center gap-3 bg-orange-50 px-5 py-2 rounded-2xl">
                  <Flame className="text-orange-500" fill="currentColor" size={20} />
                  <span className="text-xl font-black text-orange-600">3 <span className="text-xs uppercase">Days</span></span>
                </div>
                <div className="flex items-center gap-3 bg-yellow-50 px-5 py-2 rounded-2xl">
                  <Coins className="text-yellow-600" size={20} />
                  <span className="text-xl font-black text-yellow-700">150 <span className="text-xs uppercase">Carrots</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT: ACHIEVEMENTS (7/12) */}
          <section className="md:col-span-7 space-y-6">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-2xl font-black text-[#4B3621]">Achievements</h2>
              <button className="text-sm font-bold text-[#7ed957] hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🏅", label: "First Lesson", desc: "Started the journey", color: "bg-blue-50" },
                { icon: "🔥", label: "7-Day Streak", desc: "Consistency king", color: "bg-red-50" },
                { icon: "⭐", label: "Perfect Score", desc: "No mistakes made", color: "bg-yellow-50" },
              ].map((badge, idx) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={idx} 
                  className={`${badge.color} p-6 rounded-[2.5rem] text-center border border-white shadow-sm`}
                >
                  <span className="text-5xl block mb-4">{badge.icon}</span>
                  <p className="font-black text-sm text-gray-800">{badge.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{badge.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* RIGHT: PROGRESS STATS (5/12) */}
          <section className="md:col-span-5 space-y-6">
            <h2 className="text-2xl font-black text-[#4B3621] px-4">Learning Stats</h2>
            <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 space-y-8">
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#7ed957]">
                  <BookOpen size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Completed Lessons</p>
                  <p className="text-3xl font-black">12</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Target size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Words Mastered</p>
                  <p className="text-3xl font-black">250</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black">Weekly Goal</span>
                  <span className="text-xs font-bold text-[#7ed957]">85%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "85%" }}
                    className="h-full bg-gradient-to-r from-[#7ed957] to-[#b4ec94] rounded-full" 
                  />
                </div>
              </div>

            </div>
          </section>
        </div>

      </div>
    </main>
  );
}