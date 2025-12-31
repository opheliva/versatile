"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, Bot, MessageSquare, BookOpen, Languages, Lightbulb } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your Versatile AI Tutor. How can I help you with your English today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Giả lập AI phản hồi (Trong thực tế bạn sẽ gọi API OpenAI/Gemini ở đây)
    setTimeout(() => {
      const botMessage: Message = { 
        role: "assistant", 
        content: `That's a great question! Regarding "${input}", in English grammar, we usually focus on...` 
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const quickActions = [
    { icon: <Languages size={18} />, label: "Dịch sang tiếng Việt", color: "bg-blue-100 text-blue-600" },
    { icon: <BookOpen size={18} />, label: "Giải thích ngữ pháp", color: "bg-green-100 text-green-600" },
    { icon: <Lightbulb size={18} />, label: "Đặt câu ví dụ", color: "bg-yellow-100 text-yellow-600" },
  ];

  return (
    <main className="min-h-screen bg-[#F9F7F2] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl flex flex-col h-[85vh] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header của AI Tutor */}
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#7e8b43] rounded-full flex items-center justify-center text-white shadow-lg">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-800">Versatile AI Tutor</h1>
              <div className="flex items-center gap-2 text-xs text-green-500 font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
              </div>
            </div>
          </div>
          <Sparkles className="text-orange-400" />
        </div>

        {/* Khung chat */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FCFBF8]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`flex max-w-[80%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-500" : "bg-[#7e8b43] text-white"}`}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-blue-500 text-white rounded-tr-none" 
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Khu vực nhập liệu & Gợi ý */}
        <div className="p-6 bg-white border-t space-y-4">
          {/* Nút tác động nhanh */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {quickActions.map((action, i) => (
              <button 
                key={i} 
                onClick={() => setInput(action.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-transform active:scale-95 whitespace-nowrap ${action.color}`}
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>

          {/* Input chính */}
          <div className="relative flex items-center">
            <input 
              type="text"
              placeholder="Ask anything about English..."
              className="w-full p-4 pr-16 rounded-2xl border-2 border-gray-100 focus:border-[#7e8b43] outline-none transition-all bg-gray-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 p-3 bg-[#4B3621] text-white rounded-xl hover:bg-black transition-all"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 italic">
            AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </main>
  );
}