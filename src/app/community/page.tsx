"use client";

import React, { useState } from "react";
import { 
  Users, MessageCircle, Share2, Heart, Award, 
  Search, TrendingUp, Filter, Plus, Flame, 
  Trophy, Bookmark, MoreHorizontal 
} from "lucide-react";
import { motion } from "framer-motion";

// Types for better maintainability
interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  time: string;
  isLiked?: boolean;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Phuong Vy",
      avatar: "🐰",
      content: "I've just finished a flashcard deck of the 50 most common Phrasal Verbs. Feel free to download and study with me! ✨",
      tags: ["PhrasalVerbs", "Cambridge", "Flashcards"],
      likes: 24,
      comments: 5,
      time: "2h ago",
      isLiked: true
    },
    {
      id: 2,
      author: "Quoc An",
      avatar: "🐻",
      content: "Could someone help me distinguish between 'Abide by' and 'Comply with' in a formal context? Which one is more common in legal English?",
      tags: ["GrammarHelp", "QA", "LegalEnglish"],
      likes: 12,
      comments: 8,
      time: "5h ago"
    }
  ]);

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-4 md:p-10 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (3/12): NAVIGATION & TRENDS */}
        <aside className="lg:col-span-3 space-y-8 hidden lg:block">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h2 className="font-black text-xl mb-6 flex items-center gap-3 text-[#4B3621]">
              <TrendingUp className="text-[#7e8b43]" size={24} /> Trending
            </h2>
            <div className="flex flex-wrap gap-2">
              {["#IELTS", "#Grammar", "#Slang", "#Pronunciation", "#Business", "#TOEFL"].map(tag => (
                <button key={tag} className="px-4 py-2 bg-gray-50 text-gray-500 rounded-2xl text-xs font-bold hover:bg-[#7e8b43] hover:text-white transition-all active:scale-95">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#4B3621] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="text-orange-400" size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-200">Active Challenge</span>
                </div>
                <h3 className="font-black text-xl mb-2 leading-tight">Vocabulary Master</h3>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">Master 100 new words this week to earn the Golden Badge!</p>
                <div className="w-full bg-white/10 h-2 rounded-full mb-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: "65%" }}
                    className="bg-gradient-to-r from-orange-400 to-yellow-300 h-full rounded-full" 
                  />
                </div>
                <button className="w-full py-3 bg-white text-[#4B3621] rounded-2xl text-sm font-black hover:bg-orange-50 transition-colors">
                  Join Now
                </button>
             </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN (6/12): FEED */}
        <section className="lg:col-span-6 space-y-8">
          {/* Enhanced Create Post */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 group">
            <div className="flex gap-5">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl shadow-inner border-2 border-white">🐰</div>
              <textarea 
                rows={2}
                placeholder="Share a tip, a word, or ask a question..."
                className="flex-1 bg-gray-50 rounded-[1.5rem] p-5 outline-none focus:ring-4 focus:ring-[#7e8b43]/5 transition-all resize-none text-sm font-medium"
              />
            </div>
            <div className="flex justify-between mt-6 border-t border-gray-50 pt-6">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-xs text-gray-400 font-bold hover:text-[#7e8b43] transition-colors">
                  <Plus className="bg-gray-100 rounded-md p-1" size={20}/> Add Deck
                </button>
                <button className="flex items-center gap-2 text-xs text-gray-400 font-bold hover:text-[#7e8b43] transition-colors">
                  <Bookmark className="bg-gray-100 rounded-md p-1" size={20}/> Save Draft
                </button>
              </div>
              <button className="px-8 py-3 bg-[#7e8b43] text-white rounded-2xl font-black shadow-lg shadow-[#7e8b43]/20 hover:scale-105 transition-all active:scale-95">
                Publish Post
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                key={post.id} 
                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm">{post.avatar}</div>
                    <div>
                      <h4 className="font-black text-sm text-gray-800">{post.author}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{post.time}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-gray-600 mb-6 font-medium">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black text-[#7e8b43] bg-[#7e8b43]/5 px-4 py-1.5 rounded-full">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-8 border-t border-gray-50 pt-6">
                  <button className={`flex items-center gap-2 text-xs font-black transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                    <Heart size={20} fill={post.isLiked ? "currentColor" : "none"} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle size={20} /> {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#7e8b43] transition-colors ml-auto">
                    <Share2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN (3/12): LEADERBOARD & STATS */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h2 className="font-black text-xl mb-8 flex items-center gap-3 text-[#4B3621]">
              <Award className="text-yellow-500" size={26} /> Top Learners
            </h2>
            <div className="space-y-6">
              {[
                { name: "Phuong Vy", score: "2,450 XP", rank: 1, color: "bg-yellow-100 text-yellow-600" },
                { name: "Alex J.", score: "2,120 XP", rank: 2, color: "bg-gray-100 text-gray-600" },
                { name: "Sarah K.", score: "1,980 XP", rank: 3, color: "bg-orange-100 text-orange-600" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${user.color}`}>
                      {user.rank}
                    </div>
                    <span className="text-sm font-black text-gray-700 group-hover:text-[#7e8b43] transition-colors">{user.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-300">{user.score}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 rounded-2xl border-2 border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition-all">
              Full Rankings
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] p-8 border border-blue-100 relative overflow-hidden">
             <Flame className="absolute -bottom-4 -right-4 text-blue-200/50 w-24 h-24 rotate-12" />
             <div className="relative z-10">
                <p className="text-[10px] font-black text-blue-600 mb-3 uppercase tracking-widest">Learning Fact</p>
                <p className="text-sm text-blue-900/80 leading-relaxed font-bold italic">
                  "Engaging with the community increases vocabulary retention by up to 40% compared to solo studying."
                </p>
             </div>
          </div>
        </aside>

      </div>
    </main>
  );
}