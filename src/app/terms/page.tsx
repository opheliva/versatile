"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, ShieldAlert, UserCheck, Zap, Copyright, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const lastUpdated = "December 31, 2025";

  const terms = [
    {
      icon: <UserCheck size={24} />,
      title: "1. Acceptance of Terms",
      content: "By accessing or using Versatile Studio, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access our vocabulary tools or interactive mindmap features."
    },
    {
      icon: <Zap size={24} />,
      title: "2. Intellectual Property",
      content: "All content, including the unique design of our vocabulary studio, interactive mindmap engine, and AI-curated structures, is the property of Versatile Studio. Users retain ownership of the specific words they curate, but the platform's visual presentation remains ours."
    },
    {
      icon: <ShieldAlert size={24} />,
      title: "3. User Conduct",
      content: "You agree not to use the studio for any unlawful purpose. This includes attempting to reverse-engineer our mindmap software or using automated scripts to scrape vocabulary data from our platform."
    },
    {
      icon: <Copyright size={24} />,
      title: "4. Limitations of Liability",
      content: "Versatile Studio provides learning tools 'as is.' While we strive for 100% accuracy in our dictionary and AI features, we do not guarantee that our content is always error-free."
    },
    {
      icon: <Scale size={24} />,
      title: "5. Modifications",
      content: "We reserve the right to modify these terms at any time. Significant changes will be notified via our platform's dashboard. Continued use of the studio constitutes acceptance of the updated terms."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#4B3621] font-sans selection:bg-orange-100">
      
      {/* DECORATIVE TOP BAR */}
      <div className="h-2 bg-gradient-to-r from-[#4B3621] via-[#7e8b43] to-orange-200" />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* NAVIGATION */}
        <Link href="/">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#7e8b43] transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Back to Studio
          </motion.button>
        </Link>

        {/* HEADER SECTION */}
        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[#7e8b43] mb-4"
          >
            <Scale size={32} />
            <span className="h-[2px] w-12 bg-gray-100" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Legal Framework</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            Terms of <span className="text-gray-300 italic">Service.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium border-l-4 border-orange-100 pl-6"
          >
            Please read these terms carefully before using our studio. <br/>
            Current Version: <span className="text-[#4B3621] font-bold underline decoration-orange-200">v1.0.4</span> • Updated: {lastUpdated}
          </motion.p>
        </header>

        {/* TERMS GRID */}
        <div className="space-y-12">
          {terms.map((term, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 bg-orange-50 rounded-2xl text-orange-500 group-hover:bg-[#7e8b43] group-hover:text-white transition-colors duration-500">
                  {term.icon}
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black tracking-tight text-[#4B3621]">
                    {term.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {term.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HELP FOOTER */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 bg-gray-50 rounded-[3rem] text-center space-y-6 border border-white"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-gray-400">
            <HelpCircle size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black">Need Clarification?</h3>
            <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
              If you have any questions regarding these terms, please contact our legal team at:
            </p>
          </div>
          <p className="text-[#7e8b43] font-black text-lg">zhaoweipv@gmail.com</p>
        </motion.div>

        {/* COPYRIGHT DISCLOSURE */}
        <footer className="mt-20 py-10 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mb-4">
            Versatile Studio • All Rights Reserved 2025
          </p>
          <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-400">
            <Link href="/privacy" className="hover:text-[#4B3621]">PRIVACY POLICY</Link>
            <span className="text-gray-200">•</span>
            <span className="text-[#4B3621]">TERMS OF SERVICE</span>
            <span className="text-gray-200">•</span>
            <Link href="/cookies" className="hover:text-[#4B3621]">COOKIE SETTINGS</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}