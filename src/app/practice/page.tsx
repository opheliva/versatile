"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, ChevronRight, RotateCw, Volume2, 
  Star, Maximize2, PenTool, Layers, CheckCircle2, 
  XCircle, Keyboard, Trophy 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Practice data
const PRACTICE_DATA = [
  { term: "abide by sth", definition: "to accept or obey an agreement, rule, or decision", example: "You must abide by the rules of the game." },
  { term: "accede to sth", definition: "to agree to something that someone has asked for", example: "He graciously acceded to our request." },
  { term: "bear with sb", definition: "to be patient with someone", example: "Please bear with me while I finish this report." },
];

type PracticeMode = "flashcard" | "write" | "summary";

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>("flashcard");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const currentItem = PRACTICE_DATA[currentIndex];
  const progress = ((currentIndex + 1) / PRACTICE_DATA.length) * 100;

  // Handle Next Card logic
  const handleNext = () => {
    if (currentIndex < PRACTICE_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setUserInput("");
      setIsCorrect(null);
    } else {
      setMode("summary");
    }
  };

  // Check writing answer
  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase().trim() === currentItem.term.toLowerCase().trim()) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      setTimeout(handleNext, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-4 md:p-10 flex flex-col items-center font-sans text-gray-800">
      
      {/* MODE SELECTOR */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-10">
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setMode("flashcard")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${mode === "flashcard" ? "bg-[#4B3621] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
          >
            <Layers size={18} /> Flashcards
          </button>
          <button 
            onClick={() => {setMode("write"); setCurrentIndex(0); setScore(0);}}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${mode === "write" ? "bg-[#4B3621] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
          >
            <PenTool size={18} /> Writing Practice
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accuracy</p>
            <p className="font-black text-[#7e8b43]">{Math.round((score / PRACTICE_DATA.length) * 100)}%</p>
          </div>
          <div className="w-10 h-10 bg-[#7e8b43]/10 rounded-full flex items-center justify-center text-[#7e8b43]">
            <Trophy size={20} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* FLASHCARD MODE */}
        {mode === "flashcard" && (
          <motion.div 
            key="flashcard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <div className="perspective-2000 group">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full h-[450px] cursor-pointer transition-transform duration-700 transform-style-3d shadow-2xl rounded-[3rem] ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* Front: Term */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] flex flex-col items-center justify-center p-12 text-center border border-gray-100">
                  <div className="absolute top-8 w-full px-10 flex justify-between text-gray-300">
                    <Volume2 className="hover:text-[#7e8b43] transition-colors" />
                    <Star className="hover:text-yellow-400 transition-colors" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-[#4B3621] tracking-tight mb-4">
                    {currentItem.term}
                  </h2>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mt-8 animate-pulse">Click to reveal definition</p>
                </div>

                {/* Back: Definition */}
                <div className="absolute inset-0 backface-hidden bg-[#7e8b43] rounded-[3rem] flex flex-col items-center justify-center p-12 text-center rotate-y-180 shadow-inner">
                  <span className="bg-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">Definition</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-2xl">
                    {currentItem.definition}
                  </h3>
                  <div className="mt-8 p-4 bg-black/10 rounded-2xl border border-white/10">
                    <p className="text-white/60 text-sm italic">"{currentItem.example}"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* WRITE MODE (Active Learning) */}
        {mode === "write" && (
          <motion.div 
            key="write" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Keyboard size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">{currentItem.definition}</h3>
              <p className="text-gray-400 text-sm italic">Type the phrasal verb below</p>
            </div>

            <form onSubmit={checkAnswer} className="space-y-6">
              <div className="relative">
                <input 
                  autoFocus
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className={`w-full p-6 bg-gray-50 rounded-2xl border-2 outline-none text-2xl font-bold text-center transition-all ${
                    isCorrect === true ? "border-green-500 bg-green-50 text-green-700" : 
                    isCorrect === false ? "border-red-500 bg-red-50 animate-shake" : "border-gray-100 focus:border-[#7e8b43]"
                  }`}
                  placeholder="..."
                />
                {isCorrect === true && <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500" size={32} />}
                {isCorrect === false && <XCircle className="absolute right-6 top-1/2 -translate-y-1/2 text-red-500" size={32} />}
              </div>

              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-[#4B3621] text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  Check Answer
                </button>
                <button 
                  type="button"
                  onClick={() => setUserInput(currentItem.term)}
                  className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  I don't know
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* SUMMARY MODE */}
        {mode === "summary" && (
          <motion.div 
            key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-black text-[#4B3621]">Session Complete!</h2>
            <p className="text-gray-500">You've practiced {PRACTICE_DATA.length} words today.</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => {setCurrentIndex(0); setMode("flashcard"); setScore(0);}}
                className="px-8 py-3 bg-[#7e8b43] text-white rounded-2xl font-black shadow-lg"
              >
                Practice Again
              </button>
              <button className="px-8 py-3 bg-white border border-gray-200 rounded-2xl font-black shadow-sm">
                Return Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER CONTROLS (Only for learning modes) */}
      {mode !== "summary" && (
        <div className="w-full max-w-4xl mt-12 flex flex-col items-center gap-8">
          <div className="flex items-center gap-10">
            <button 
              onClick={() => {if(currentIndex > 0) {setCurrentIndex(prev => prev - 1); setIsFlipped(false);}}}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-[#4B3621] hover:shadow-md transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex flex-col items-center">
               <span className="text-2xl font-black text-[#4B3621]">{currentIndex + 1} / {PRACTICE_DATA.length}</span>
               <div className="w-32 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <motion.div className="h-full bg-[#7e8b43]" animate={{ width: `${progress}%` }} />
               </div>
            </div>

            <button 
              onClick={handleNext}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-[#4B3621] hover:shadow-md transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 hover:border-[#7e8b43] text-xs font-black text-gray-400 transition-all bg-white uppercase tracking-widest">
              <RotateCw size={14} /> Shuffle Deck
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 hover:border-[#7e8b43] text-xs font-black text-gray-400 transition-all bg-white uppercase tracking-widest">
              <Maximize2 size={14} /> Fullscreen
            </button>
          </div>
        </div>
      )}

      {/* Tailwind Style Extension for Perspective */}
      <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .backface-hidden { backface-visibility: hidden; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </main>
  );
}