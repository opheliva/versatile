"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Volume2, Star, Maximize2 } from "lucide-react";

const PRACTICE_DATA = [
  { term: "abide by sth", definition: "to accept or obey an agreement, rule, or decision" },
  { term: "accede to sth", definition: "to agree to something that someone has asked for, often after disagreeing" },
  // Bạn có thể thêm 15 từ từ My Dictionary vào đây
];

export default function PracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    if (currentIndex < PRACTICE_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const progress = ((currentIndex + 1) / PRACTICE_DATA.length) * 100;

  return (
    <main className="min-h-screen bg-[#F6F7FB] p-4 md:p-8 flex flex-col items-center font-sans">
      {/* Header Practice */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#303545]">Flashcards: Phrasal Verbs</h1>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-white rounded-lg transition-colors"><Maximize2 size={20} className="text-[#646970]" /></button>
        </div>
      </div>

      {/* Flashcard Area */}
      <div className="w-full max-w-4xl perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full h-[400px] md:h-[500px] cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Mặt trước (Term) */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] flex items-center justify-center p-12 text-center border-b-4 border-[#7e8b43]">
             <button className="absolute top-6 right-6 text-gray-400 hover:text-yellow-400"><Star /></button>
             <button className="absolute top-6 left-6 text-gray-400 hover:text-[#7e8b43]"><Volume2 /></button>
             <h2 className="text-4xl md:text-5xl font-bold text-[#303545] tracking-tight">
               {PRACTICE_DATA[currentIndex].term}
             </h2>
             <p className="absolute bottom-8 text-gray-400 text-sm font-medium uppercase tracking-widest">Click to flip</p>
          </div>

          {/* Mặt sau (Definition) - RotateY 180 */}
          <div className="absolute inset-0 backface-hidden bg-[#7e8b43] rounded-3xl shadow-xl flex items-center justify-center p-12 text-center rotate-y-180">
             <div className="text-white">
                <p className="text-lg opacity-80 mb-4 uppercase tracking-widest font-bold">Definition</p>
                <h3 className="text-2xl md:text-3xl font-medium leading-relaxed">
                  {PRACTICE_DATA[currentIndex].definition}
                </h3>
             </div>
             <p className="absolute bottom-8 text-white/60 text-sm font-medium uppercase tracking-widest">Click to flip back</p>
          </div>
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="w-full max-w-4xl mt-10 flex flex-col items-center gap-6">
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-8">
          <button 
            onClick={prevCard}
            disabled={currentIndex === 0}
            className={`p-4 rounded-full border-2 transition-all ${currentIndex === 0 ? 'border-gray-200 text-gray-200' : 'border-[#303545] text-[#303545] hover:bg-[#303545] hover:text-white'}`}
          >
            <ChevronLeft size={28} />
          </button>
          
          <span className="text-lg font-bold text-[#303545]">
            {currentIndex + 1} / {PRACTICE_DATA.length}
          </span>

          <button 
            onClick={nextCard}
            disabled={currentIndex === PRACTICE_DATA.length - 1}
            className={`p-4 rounded-full border-2 transition-all ${currentIndex === PRACTICE_DATA.length - 1 ? 'border-gray-200 text-gray-200' : 'border-[#303545] text-[#303545] hover:bg-[#303545] hover:text-white'}`}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-[#7e8b43] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Options */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-gray-200 hover:border-[#7e8b43] hover:text-[#7e8b43] transition-all bg-white font-bold text-gray-600">
            <RotateCw size={18} /> Shuffle
          </button>
        </div>
      </div>
    </main>
  );
}