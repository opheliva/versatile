import React from "react";

export default function StudyPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-[#fffdfc] p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 pb-2">
          A Journey to Conquer English Grammar
        </h1>
        <p className="text-lg text-gray-500 mt-2 font-medium italic">
          Master grammar through structured visualization and interactive maps.
        </p>
      </div>

      {/* --- ENGLISH XMIND ANNOUNCEMENT BANNER --- */}
      <div className="w-full max-w-4xl mb-10 overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl">💡</div>
          <div>
            <h3 className="text-purple-900 font-bold text-lg">Full Grammar Map is available!</h3>
            <p className="text-purple-700/70 text-sm">
              Access the high-resolution map on XMind with <b>Password: 2526</b>
            </p>
          </div>
        </div>
        <a
          href="https://app.xmind.com/share/D3SRNsAm"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-200 flex items-center gap-2"
        >
          Open XMind Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Hero Image Section */}
      <div className="w-full max-w-5xl mb-12 group">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white">
            <img
            src="/grammar.png"
            alt="Grammar Mind Map Overview"
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-8 text-center">
            <div className="h-px bg-gray-200 flex-1"></div>
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-widest">
              Topics to Explore
            </h2>
            <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box for Parts of Speech */}
          <a
            href="/mindmap/grammar/pos"
            className="group flex flex-col items-center p-10 bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-purple-100 transition-all duration-500 border border-transparent hover:border-purple-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:w-32 group-hover:h-32"></div>
            
            <div className="p-5 rounded-3xl mb-6 bg-gradient-to-br from-purple-100 to-indigo-50 group-hover:from-purple-500 group-hover:to-indigo-500 transition-colors duration-500 shadow-inner">
              <svg className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M320 256c0 17.7-14.3 32-32 32H200.7l22.6 22.6c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-79-79c-12.5-12.5-12.5-32.8 0-45.3l79-79c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L200.7 224H288c17.7 0 32 14.3 32 32zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Parts of Speech</h2>
            <p className="text-gray-400 text-center mt-3 font-medium">
              Nouns, Verbs, Adjectives, and word classes.
            </p>
          </a>

          {/* Box for Sentence */}
          <a
            href="/mindmap/grammar/sentence"
            className="group flex flex-col items-center p-10 bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-pink-100 transition-all duration-500 border border-transparent hover:border-pink-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:w-32 group-hover:h-32"></div>
            
            <div className="p-5 rounded-3xl mb-6 bg-gradient-to-br from-pink-100 to-orange-50 group-hover:from-pink-500 group-hover:to-orange-500 transition-colors duration-500 shadow-inner">
              <svg className="w-10 h-10 text-pink-600 group-hover:text-white transition-colors duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path fill="currentColor" d="M480 320H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 128H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sentence</h2>
            <p className="text-gray-400 text-center mt-3 font-medium">
              Structures, Tenses, and Patterns.
            </p>
          </a>
        </div>
      </div>

      <footer className="mt-20 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
        D3.js & XMind Interactive Learning Project
      </footer>
    </main>
  );
}