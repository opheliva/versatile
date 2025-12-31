"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Download, Plus, Trash2, BookOpen, Sparkles, Search, Languages, Quote, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

/**
 * Word Interface
 * term: The vocabulary item
 * definition: Meaning found via dictionary
 * partOfSpeech: Grammatical category (noun, verb, etc.)
 */
interface Word {
  term: string;
  definition: string;
  partOfSpeech: string;
}

export default function WordListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [myDictionary, setMyDictionary] = useState<Word[]>([]);
  const [preview, setPreview] = useState<Word | null>(null);

  // Default context for visual highlighting
  const rawParagraph = "I would describe myself as someone who always tries to stay positive and organized, even when I have a lot on my plate. Being a manager while raising a young son isn't easy, but keeping mental clarity helps me get through the day.";

  /**
   * Mock API effect: Simulates fetching word data.
   * In production, replace the timeout with a real call to:
   * https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}
   */
  useEffect(() => {
    const fetchPreview = async () => {
      if (searchTerm.length > 2) {
        setPreview({
          term: searchTerm,
          definition: "Fetching data from English database...",
          partOfSpeech: "Processing..."
        });
        
        const timer = setTimeout(() => {
          setPreview({
            term: searchTerm,
            definition: `The essential meaning of "${searchTerm}" in a modern linguistic context.`,
            partOfSpeech: "adj / noun"
          });
        }, 600);
        return () => clearTimeout(timer);
      } else {
        setPreview(null);
      }
    };
    fetchPreview();
  }, [searchTerm]);

  /**
   * Adds the current preview word to the user's dictionary
   */
  const addWord = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed || !preview) return;
    
    if (myDictionary.length >= 15) {
      alert("Study Goal reached! Master these 15 words before adding more. ✨");
      return;
    }
    
    if (myDictionary.some(w => w.term.toLowerCase() === trimmed.toLowerCase())) {
      alert("This word is already in your collection.");
      return;
    }

    setMyDictionary([...myDictionary, { ...preview, term: trimmed }]);
    setSearchTerm("");
  };

  const removeWord = (index: number) => {
    setMyDictionary(myDictionary.filter((_, i) => i !== index));
  };

  /**
   * Logic: Wraps matched terms in bold tags with custom styling
   */
  const highlightedParagraph = useMemo(() => {
    let text = rawParagraph;
    myDictionary.forEach((word) => {
      const regex = new RegExp(`(${word.term})`, "gi");
      text = text.replace(regex, `<b class="text-[#4B3621] border-b-4 border-orange-300 transition-all">$1</b>`);
    });
    return text;
  }, [myDictionary, rawParagraph]);

  /**
   * Export Feature: Converts the Journal Note component into a high-res PNG
   */
  const handleExport = async () => {
    const element = document.getElementById("journal-note");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#FDFCFB",
        scale: 3, // High-definition export
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `versatile-study-note-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export Error:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER AREA */}
        <header className="mb-16 text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
             <h1 className="text-6xl font-black text-[#4B3621] tracking-tighter flex items-center justify-center gap-4">
               Vocabulary <span className="text-[#7e8b43]">Studio</span>
             </h1>
             <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Analyze • Curate • Visualize</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: DICTIONARY MANAGEMENT */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Search Component with Auto-Preview */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#7e8b43] transition-colors">
                <Search size={24} />
              </div>
              <input 
                type="text"
                placeholder="Type a word to reveal definition..."
                className="w-full p-6 pl-16 pr-20 rounded-[2.5rem] border-2 border-transparent bg-white shadow-2xl shadow-gray-200/50 outline-none text-xl font-bold transition-all focus:border-[#7e8b43] placeholder:text-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addWord()}
              />
              <button 
                onClick={addWord}
                className="absolute right-3 top-3 bottom-3 px-6 bg-[#4B3621] text-white rounded-[2rem] hover:bg-black transition-all flex items-center gap-2 font-black active:scale-95"
              >
                <Plus size={20} /> ADD
              </button>

              <AnimatePresence>
                {preview && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute top-full mt-4 w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-50 z-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
                        <Info size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-800 capitalize">
                          {preview.term} <span className="text-xs text-gray-400 ml-2 font-medium italic">({preview.partOfSpeech})</span>
                        </h4>
                        <p className="text-gray-500 mt-1 leading-relaxed">{preview.definition}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vocabulary Inventory */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <Languages className="text-[#7e8b43]" /> Personal Dictionary
                </h2>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#7e8b43] animate-pulse" />
                  <span className="text-xs font-black text-gray-500">{myDictionary.length} / 15 WORDS</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {myDictionary.map((item, index) => (
                    <motion.div 
                      layout key={item.term} 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group flex flex-col p-6 bg-[#FDFCFB] rounded-[2rem] border border-gray-50 hover:border-[#7e8b43] transition-all relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-lg text-[#4B3621]">{item.term}</span>
                        <button 
                          onClick={() => removeWord(index)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all bg-white rounded-xl shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-medium">
                        {item.definition}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {myDictionary.length === 0 && (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl grayscale opacity-30">📖</div>
                  <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">Queue is empty</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: THE STUDIO NOTE (EXPORTABLE) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div 
              id="journal-note"
              whileHover={{ rotateY: -3, rotateX: 3 }}
              className="w-full max-w-[440px] aspect-[3/4.2] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(75,54,33,0.15)] flex flex-col relative overflow-hidden border border-gray-100 p-10"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center border-b-4 border-[#4B3621] pb-4">
                  <h3 className="font-black text-4xl tracking-tighter text-[#4B3621]">NOTES.</h3>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-300 uppercase leading-none">V-MOD</p>
                    <p className="text-[10px] font-black text-[#7e8b43] uppercase leading-none mt-1">DEC 2025</p>
                  </div>
                </div>
                
                <div className="space-y-3 min-h-[140px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Vocab:</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {myDictionary.map((w, i) => (
                      <span key={i} className="text-[#4B3621] font-black text-sm italic">
                         {w.term}.
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative pt-8 mt-4 border-t border-dashed border-gray-200">
                  <Quote className="absolute -top-2 -left-4 text-orange-100" size={48} />
                  <p 
                    className="text-[17px] leading-[1.8] text-gray-500 font-medium italic relative z-10"
                    dangerouslySetInnerHTML={{ __html: highlightedParagraph }}
                  />
                </div>
              </div>

              <div className="absolute bottom-10 left-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#4B3621] rounded-full flex items-center justify-center text-white text-[10px] font-black italic">V.</div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Powered by Versatile Studio</p>
              </div>
            </motion.div>

            <motion.button 
              onClick={handleExport}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="mt-12 w-full max-w-[440px] flex items-center justify-center gap-4 py-5 bg-[#4B3621] text-white rounded-[2rem] font-black shadow-2xl hover:shadow-orange-200/50 transition-all"
            >
              <Download size={22} /> EXPORT ARTWORK
            </motion.button>
          </div>

        </div>
      </div>
    </main>
  );
}