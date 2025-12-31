"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Bot, User, ArrowLeft, Loader2, 
  Sparkles, MessageSquare, Lightbulb, Zap, HelpCircle 
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to the Studio. I'm your AI Language Tutor. How can I help you master your vocabulary today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const suggestions = [
    { label: "Analyze context", icon: <Zap size={14} /> },
    { label: "Synonym search", icon: <Sparkles size={14} /> },
    { label: "Grammar check", icon: <Lightbulb size={14} /> },
  ];

  const handleSendMessage = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting to the brain. Please check your API settings." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-[#FDFCFB] flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <nav className="hidden md:flex w-20 flex-col items-center py-8 bg-white border-r border-gray-100 space-y-8">
        <Link href="/">
          <div className="w-12 h-12 bg-[#4B3621] rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
            <ArrowLeft size={20} />
          </div>
        </Link>
        <div className="flex-1 space-y-6 pt-12">
          <MessageSquare className="text-[#7e8b43] cursor-pointer" />
          <HelpCircle className="text-gray-300 hover:text-gray-500 cursor-pointer" />
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <section className="flex-1 flex flex-col relative">
        
        {/* TOP BAR */}
        <header className="p-6 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center z-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden">
              <ArrowLeft className="text-gray-400" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-[#4B3621] tracking-tight flex items-center gap-2">
                VERSATILE <span className="text-[#7e8b43]">AI TUTOR</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pedagogical Assistant v2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#7e8b43]/10 rounded-full">
            <span className="w-2 h-2 bg-[#7e8b43] rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-[#7e8b43] uppercase tracking-tighter">System Ready</span>
          </div>
        </header>

        {/* CHAT DISPLAY */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-[#FDFCFB]">
          <AnimatePresence mode="popLayout">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-4 max-w-[90%] md:max-w-[75%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                    m.role === "user" 
                      ? "bg-[#4B3621] border-[#4B3621] text-white" 
                      : "bg-white border-gray-100 text-[#7e8b43]"
                  }`}>
                    {m.role === "user" ? <User size={16} /> : <Bot size={18} />}
                  </div>
                  <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm font-medium ${
                    m.role === "user" 
                      ? "bg-[#4B3621] text-white rounded-tr-none" 
                      : "bg-white text-gray-700 border border-gray-50 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#7e8b43]">
                    <Loader2 className="animate-spin" size={18} />
                 </div>
                 <div className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">Processing Request...</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INPUT FOOTER */}
        <footer className="p-6 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* QUICK SUGGESTIONS */}
            {!isLoading && messages.length < 3 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(`Can you help me ${s.label.toLowerCase()}?`)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-transparent hover:border-orange-100"
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me about a word, phrase, or grammar rule..."
                className="w-full p-5 pr-32 bg-[#FDFCFB] border-2 border-gray-50 rounded-2xl text-sm font-bold focus:border-[#7e8b43]/30 transition-all outline-none placeholder:text-gray-300"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 px-6 py-3 bg-[#4B3621] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 disabled:opacity-20"
              >
                Send <Send size={14} />
              </button>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}