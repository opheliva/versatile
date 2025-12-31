"use client";

import React, { useState } from "react";
import { Users, MessageCircle, Share2, Heart, Award, Search, TrendingUp, Filter } from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  time: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Phuong Vy",
      avatar: "🐰",
      content: "Mình vừa hoàn thành bộ Flashcard 50 Phrasal Verbs thông dụng nhất, mọi người tải về học chung nhé! ✨",
      tags: ["Phrasal Verbs", "Cambridge"],
      likes: 24,
      comments: 5,
      time: "2h ago"
    },
    {
      id: 2,
      author: "Quoc An",
      avatar: "🐻",
      content: "Có ai giải thích giúp mình cách phân biệt 'Abide by' và 'Comply with' trong văn cảnh trang trọng không?",
      tags: ["Grammar Help", "Q&A"],
      likes: 12,
      comments: 8,
      time: "5h ago"
    }
  ]);

  return (
    <main className="min-h-screen bg-[#F9F7F2] p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CỘT TRÁI (3/12): NAVIGATION & CATEGORIES */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="text-[#7e8b43]" size={20} /> Trending Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {["#IELTS", "#Grammar", "#Slang", "#Pronunciation", "#BusinessEnglish"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-medium cursor-pointer hover:bg-[#7e8b43] hover:text-white transition-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#4B3621] text-white rounded-3xl p-6 shadow-lg">
            <h3 className="font-bold mb-2">Weekly Challenge 🏆</h3>
            <p className="text-xs text-white/70 mb-4">Học xong 100 từ mới để nhận huy hiệu "Vocabulary Master"!</p>
            <div className="w-full bg-white/20 h-2 rounded-full mb-4">
              <div className="bg-orange-400 h-full w-[65%] rounded-full"></div>
            </div>
            <button className="w-full py-2 bg-white text-[#4B3621] rounded-xl text-sm font-bold hover:scale-105 transition-transform">
              Join Challenge
            </button>
          </div>
        </div>

        {/* CỘT GIỮA (6/12): FEED (BÀI ĐĂNG) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Create Post */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">🐰</div>
              <input 
                placeholder="Share a word, a tip, or a question..."
                className="flex-1 bg-gray-50 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#7e8b43]/20 transition-all"
              />
            </div>
            <div className="flex justify-between mt-4 border-t pt-4">
              <button className="flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-[#7e8b43]"><Share2 size={18}/> Share Deck</button>
              <button className="px-6 py-2 bg-[#7e8b43] text-white rounded-full font-bold shadow-md hover:bg-opacity-90">Post</button>
            </div>
          </div>

          {/* Feed Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">{post.avatar}</div>
                  <div>
                    <h4 className="font-bold text-sm">{post.author}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{post.time}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Filter size={16} className="text-gray-300" /></button>
              </div>

              <p className="text-sm leading-relaxed text-gray-700 mb-4">{post.content}</p>

              <div className="flex gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-[#7e8b43] bg-[#7e8b43]/10 px-3 py-1 rounded-md lowercase">#{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 border-t pt-4">
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={18} /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-500 transition-colors">
                  <MessageCircle size={18} /> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CỘT PHẢI (3/12): TOP LEARNERS (LEADERBOARD) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Award className="text-yellow-500" size={22} /> Top Learners
            </h2>
            <div className="space-y-5">
              {[
                { name: "Phuong Vy", score: "2,450 XP", rank: 1, color: "bg-yellow-100 text-yellow-600" },
                { name: "Alex J.", score: "2,120 XP", rank: 2, color: "bg-gray-100 text-gray-600" },
                { name: "Sarah", score: "1,980 XP", rank: 3, color: "bg-orange-100 text-orange-600" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${user.color}`}>{user.rank}</span>
                    <span className="text-sm font-semibold">{user.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400">{user.score}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-xs font-bold text-[#7e8b43] hover:underline">View Full Leaderboard</button>
          </div>

          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
             <p className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-widest">Did you know?</p>
             <p className="text-xs text-blue-800 leading-relaxed italic">"Giao tiếp với cộng đồng giúp bạn nhớ từ vựng lâu hơn 40% so với học một mình."</p>
          </div>
        </div>

      </div>
    </main>
  );
}