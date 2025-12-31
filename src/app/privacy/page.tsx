"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, Globe, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 31, 2025";

  const sections = [
    {
      icon: <Eye size={24} />,
      title: "Data Collection",
      content: "We collect information you provide directly to us, such as when you create an account, curate your vocabulary lists, or interact with our interactive mindmaps. This may include your name, email address, and learning preferences."
    },
    {
      icon: <Lock size={24} />,
      title: "How We Use Data",
      content: "Your data is used to personalize your learning experience, generate custom study notes, and improve our AI-driven vocabulary suggestions. We never sell your personal data to third parties."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your information. Your curated dictionary and mindmap progress are stored securely using encrypted cloud infrastructure."
    },
    {
      icon: <Globe size={24} />,
      title: "Cookies & Analytics",
      content: "We use essential cookies to maintain your session and analytical tools to understand how users interact with our studio. You can manage cookie preferences through your browser settings."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#4B3621] font-sans selection:bg-orange-100">
      
      {/* DECORATIVE BACKGROUND */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-orange-50/50 rounded-bl-[200px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* BACK BUTTON */}
        <Link href="/">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#7e8b43] transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Back to Studio
          </motion.button>
        </Link>

        {/* HEADER */}
        <header className="space-y-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm"
          >
            <ShieldCheck className="text-[#7e8b43]" size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Security & Trust</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            Privacy <span className="text-gray-300 italic">Policy.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium italic"
          >
            Last Updated: {lastUpdated}
          </motion.p>
        </header>

        {/* CONTENT SECTIONS */}
        <div className="grid grid-cols-1 gap-16">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative pl-12 md:pl-16 border-l-2 border-gray-100 hover:border-[#7e8b43] transition-colors"
            >
              <div className="absolute -left-[13px] top-0 p-1 bg-[#FDFCFB]">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-100 group-hover:border-[#7e8b43] transition-colors flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-[#7e8b43] transition-colors" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-[#4B3621]">
                <span className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                  {section.icon}
                </span>
                <h2 className="text-2xl font-black tracking-tight">{section.title}</h2>
              </div>
              
              <p className="text-gray-500 leading-relaxed text-lg font-medium">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* CONTACT SECTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-10 bg-[#4B3621] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Questions about Privacy?</h3>
            <p className="text-white/60 text-sm font-medium italic">Our support team is here to help you understand your rights.</p>
          </div>
          <a 
            href="mailto:zhaoweipv@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-[#7e8b43] hover:bg-white hover:text-[#4B3621] transition-all rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95"
          >
            <Mail size={18} /> Contact Support
          </a>
        </motion.div>

        {/* FOOTER DISCLOSURE */}
        <footer className="mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
            Versatile Studio © 2025 • Learning Reinvented
          </p>
        </footer>
      </div>
    </main>
  );
}