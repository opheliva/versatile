"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cookie, ShieldCheck, BarChart3, Settings2, ArrowLeft, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";

export default function CookiePolicyPage() {
  const lastUpdated = "December 31, 2025";

  const cookieTypes = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Essential Cookies",
      status: "Always Active",
      description: "These are necessary for the website to function. They handle secure log-ins, session management, and language preferences. You cannot disable these as the studio would not work without them."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytical Cookies",
      status: "Optional",
      description: "We use these to understand how you interact with our vocabulary mindmaps and search tools. This helps us optimize the studio performance and discover which features are most helpful."
    },
    {
      icon: <Settings2 size={24} />,
      title: "Preference Cookies",
      status: "Optional",
      description: "These allow the studio to remember choices you make, such as your UI theme (Light/Dark mode) or specific study goals, providing a more personalized experience."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#4B3621] font-sans selection:bg-orange-100">
      
      {/* DECORATIVE ELEMENT */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7e8b43]/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* BREADCRUMB NAVIGATION */}
        <Link href="/">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#7e8b43] transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Back to Studio
          </motion.button>
        </Link>

        {/* HERO HEADER */}
        <header className="mb-20 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
              <Cookie size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                Cookie <span className="text-gray-300 italic">Settings.</span>
              </h1>
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1">Transparency & Control</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
            At Versatile Studio, we value your privacy. This policy explains how we use cookies to enhance your vocabulary learning journey and optimize our digital workspace.
          </p>
        </header>

        {/* COOKIE CATEGORIES GRID */}
        <div className="grid grid-cols-1 gap-6">
          {cookieTypes.map((type, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-[#7e8b43] group-hover:text-white transition-all duration-500">
                  {type.icon}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black tracking-tight">{type.title}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${index === 0 ? 'bg-[#7e8b43]/10 text-[#7e8b43]' : 'bg-gray-100 text-gray-400'}`}>
                      {type.status}
                    </span>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">
                    {type.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MANAGEMENT SECTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-10 bg-[#4B3621] rounded-[3rem] text-white space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          
          <div className="flex items-start gap-4">
            <Info className="text-orange-300 shrink-0" size={24} />
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight">How to manage cookies?</h3>
              <p className="text-white/70 text-sm leading-relaxed font-medium">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <button className="px-6 py-3 bg-[#7e8b43] hover:bg-white hover:text-[#4B3621] transition-all rounded-xl font-black text-[10px] uppercase tracking-widest">
              Save Preferences
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/20">
              Accept All Cookies
            </button>
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer className="mt-24 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
            VERSATILE STUDIO © 2025
          </p>
          <div className="flex gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-[#4B3621] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#4B3621] transition-colors">Terms</Link>
            <span className="text-[#7e8b43] border-b border-[#7e8b43]">Cookies</span>
          </div>
        </footer>
      </div>
    </main>
  );
}