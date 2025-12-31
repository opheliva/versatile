"use client";

import React, { useState, useMemo } from "react";
import { Download, Plus, Trash2, BookOpen, Sparkles } from "lucide-react";

interface Word {
  term: string;
}

export default function WordListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [myDictionary, setMyDictionary] = useState<Word[]>([]);
  
  // Đoạn văn mẫu - Bạn có thể thay đổi hoặc dùng AI để generate
  const rawParagraph = "I would describe myself as someone who always tries to stay positive and organized, even when I have a lot on my plate. Being a manager while raising a young son isn't easy, but keeping mental clarity helps me get through the day.";

  // Hàm thêm từ
  const addWord = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    if (myDictionary.length >= 15) {
      alert("Maximum 15 words reached! Focus on these first. ✨");
      return;
    }
    if (myDictionary.some(w => w.term.toLowerCase() === trimmed.toLowerCase())) {
      alert("Word already in list!");
      return;
    }
    setMyDictionary([...myDictionary, { term: trimmed }]);
    setSearchTerm("");
  };

  // Hàm xóa từ
  const removeWord = (index: number) => {
    setMyDictionary(myDictionary.filter((_, i) => i !== index));
  };

  // Logic Highlight từ vựng trong đoạn văn
  const highlightedParagraph = useMemo(() => {
    let text = rawParagraph;
    myDictionary.forEach((word) => {
      const regex = new RegExp(`(${word.term})`, "gi");
      text = text.replace(regex, `<b class="text-[#4B3621] border-b-2 border-orange-300">$1</b>`);
    });
    return text;
  }, [myDictionary, rawParagraph]);

  return (
    <main className="min-h-screen bg-[#F9F7F2] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-[#4B3621] flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10" /> SMART VOCAB BUILDER
          </h1>
          <p className="text-gray-500 mt-2 italic">Search, save, and visualize your daily English words.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* CỘT TRÁI: INTERACTIVE SEARCH & LIST */}
          <div className="space-y-8">
            <div className="group relative">
              <input 
                type="text"
                placeholder="Find a new word..."
                className="w-full p-5 pl-6 pr-16 rounded-[2rem] border-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] focus:ring-4 focus:ring-orange-100 outline-none text-lg transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addWord()}
              />
              <button 
                onClick={addWord}
                className="absolute right-3 top-3 p-3 bg-[#4B3621] text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/40">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#4B3621] flex items-center gap-2">
                  <Sparkles className="text-orange-400 w-5 h-5" /> My Dictionary
                </h2>
                <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold">
                  {myDictionary.length} / 15
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {myDictionary.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-3 px-4 bg-white rounded-2xl border border-gray-100 group animate-in fade-in slide-in-from-left-4"
                  >
                    <span className="font-medium text-gray-700">{item.term}</span>
                    <button 
                      onClick={() => removeWord(index)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              {myDictionary.length === 0 && (
                <p className="text-center py-10 text-gray-400 italic">Start adding words to see them here...</p>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: PREMIUM NOTE PREVIEW */}
          <div className="flex flex-col items-center">
            <div 
              id="capture-template" 
              className="w-full max-w-[420px] aspect-[3/4.5] bg-[#FCF8F0] rounded-2xl shadow-[0_30px_60px_-15px_rgba(75,54,33,0.2)] flex flex-col relative overflow-hidden border border-white"
            >
              {/* Coffee Decorative Bars */}
              <div className="h-10 bg-[#4B3621] w-full mb-8 flex items-center justify-center">
                <div className="flex gap-4">
                    {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/20" />)}
                </div>
              </div>

              <div className="px-10 flex-1">
                <div className="flex justify-between items-end mb-8 border-b-2 border-dashed border-gray-200 pb-2">
                  <h3 className="font-serif text-3xl italic text-[#4B3621]">Note.</h3>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Nov 7, 2025</span>
                </div>
                
                {/* Vocab Section */}
                <div className="mb-8 min-h-[120px]">
                  <ul className="grid grid-cols-1 gap-1">
                    {myDictionary.slice(0, 8).map((w, i) => (
                      <li key={i} className="text-[#8B4513] font-medium text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-300" /> {w.term}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Paragraph Section */}
                <div className="relative">
                  <span className="absolute -left-4 top-0 text-4xl text-orange-200 font-serif">“</span>
                  <p 
                    className="text-[15px] leading-loose text-gray-600 italic font-serif"
                    dangerouslySetInnerHTML={{ __html: highlightedParagraph }}
                  />
                </div>
              </div>

              {/* Coffee Icon Decor */}
              <div className="absolute bottom-6 right-8 text-4xl opacity-80 filter drop-shadow-md">☕</div>
              <div className="absolute bottom-6 left-8 text-sm font-black text-[#4B3621]/20 uppercase tracking-[0.3em]">
                Versatile Learning
              </div>
            </div>

            <button className="mt-10 group flex items-center gap-4 px-10 py-5 bg-[#4B3621] text-white rounded-full font-bold hover:bg-black transition-all shadow-2xl hover:shadow-orange-200/50 active:scale-95">
              <Download className="group-hover:bounce" size={20} />
              EXPORT MY NOTE
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}