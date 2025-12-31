"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ShoppingBag, Star, Coins, ArrowRight, Lock, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types & Interfaces
interface ShopItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "Outfit" | "Accessory" | "Hat";
}

// Optimized Sample Data
const SHOP_ITEMS: ShopItem[] = [
  { id: 1, name: "Royal Blue Shirt", price: 100, image: "/bunny/shirt.png", category: "Outfit" },
  { id: 2, name: "Worker Overalls", price: 150, image: "/bunny/overalls.png", category: "Outfit" },
  { id: 3, name: "Winter Beanie", price: 80, image: "/bunny/beanie.png", category: "Hat" },
  { id: 4, name: "Summer Shades", price: 120, image: "/bunny/sunglasses.png", category: "Accessory" },
];

export default function CarrotShopPage() {
  const { isSignedIn } = useUser();
  const [carrots, setCarrots] = useState<number>(500);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [outfit, setOutfit] = useState<ShopItem[]>([]);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" | null }>({ text: "", type: null });

  // Auto-hide notifications after 3 seconds
  useEffect(() => {
    if (notification.text) {
      const timer = setTimeout(() => setNotification({ text: "", type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handlePurchase = (item: ShopItem) => {
    if (outfit.some(owned => owned.id === item.id)) {
      setNotification({ text: "This item is already in your wardrobe!", type: "error" });
      return;
    }

    if (carrots >= item.price) {
      setCarrots(prev => prev - item.price);
      setOutfit(prev => [...prev, item]);
      setNotification({ text: `Great choice! ${item.name} purchased.`, type: "success" });
    } else {
      setNotification({ text: "Oops! You need more carrots. Keep practicing!", type: "error" });
    }
  };

  const filteredItems = activeTab === "All" ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.category === activeTab);

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg border border-orange-50/50"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-400">
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-4 tracking-tight">Carrot Shop</h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">Sign in to customize your learning buddy with exclusive outfits and accessories!</p>
          <SignInButton mode="modal">
            <button className="w-full bg-[#4B3621] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:bg-black transition-all active:scale-95">
              Get Started
            </button>
          </SignInButton>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-4 md:p-10 text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-[#7e8b43] font-bold tracking-widest text-sm uppercase">
              <Sparkles size={18} /> Style Your Buddy
            </div>
            <h1 className="text-6xl font-black text-[#4B3621]">The Shop</h1>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white pl-6 pr-2 py-2 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Your Balance</p>
              <p className="text-3xl font-black text-orange-500">{carrots} <span className="text-sm font-medium text-gray-400">🥕</span></p>
            </div>
            <button className="bg-orange-100 p-4 rounded-2xl text-orange-600 hover:bg-orange-200 transition-colors">
              <Coins size={24} />
            </button>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: LIVE PREVIEW CABINET */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f2f0e9] rounded-[4rem] p-12 aspect-square flex items-center justify-center relative shadow-inner overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                <Image src="/bunny/base.png" alt="Buddy" fill className="object-contain" priority />
                <AnimatePresence>
                  {outfit.map((item) => (
                    <motion.div key={item.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
              {notification.text && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center gap-3 p-5 rounded-[2rem] shadow-lg border ${
                    notification.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
                  }`}
                >
                  {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span className="font-bold text-sm">{notification.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: SHOP CATALOG */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tabs Filter */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {["All", "Outfit", "Hat", "Accessory"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${
                    activeTab === tab ? "bg-[#4B3621] text-white shadow-xl" : "bg-white text-gray-400 hover:text-gray-600 border border-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid Catalog */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => {
                const isOwned = outfit.some(o => o.id === item.id);
                return (
                  <motion.div
                    layout key={item.id}
                    className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all"
                  >
                    <div className="bg-[#FAF9F6] rounded-[2rem] aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
                      <Image src={item.image} alt={item.name} width={160} height={160} className="object-contain drop-shadow-xl" />
                    </div>
                    
                    <div className="px-6 pb-6 pt-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-black text-[#7e8b43] uppercase mb-1">{item.category}</p>
                          <h3 className="text-xl font-black text-gray-800 tracking-tight">{item.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-orange-500 font-black">
                          <Coins size={16} /> {item.price}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={isOwned}
                        className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                          isOwned 
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed" 
                          : "bg-[#7ed957] text-white hover:bg-[#6ab948] shadow-md hover:shadow-lg active:scale-95"
                        }`}
                      >
                        {isOwned ? "Equipped" : "Get It Now"} <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}