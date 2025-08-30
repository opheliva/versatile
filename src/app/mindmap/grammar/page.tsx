import React from "react";

export default function StudyPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-[#fffdfc] p-6">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          A Journey to Conquer English Grammar
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Learn grammar scientifically and easily through a mind map.
        </p>
      </div>

      {/* Image section */}
      <div className="w-full max-w-6xl mb-8 flex justify-center mt-4">
        <img
          src="/grammar.png"
          alt="Grammar Mind Map Overview"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      <div className="mt-8 text-center w-full max-w-4xl">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Choose a topic to explore
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Box for Parts of Speech with Tailwind gradient */}
          <a
            href="/mindmap/grammar/pos"
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            {/* Icon background with gradient matching original image */}
            <div className="p-4 rounded-full mb-8 bg-gradient-to-br from-[#f3e8ff] to-[#ded3f6]">
              <svg
                className="w-10 h-10 text-[#a048fe]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M320 256c0 17.7-14.3 32-32 32H200.7l22.6 22.6c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-79-79c-12.5-12.5-12.5-32.8 0-45.3l79-79c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L200.7 224H288c17.7 0 32 14.3 32 32zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 48a208 208 0 1 0 0 416 208 208 0 1 0 0-416z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Parts of Speech</h2>
            <p className="text-gray-500 text-center mt-2">
              Learn all parts of speech in English.
            </p>
          </a>

          {/* Box for Sentence with Tailwind gradient */}
          <a
            href="/mindmap/grammar/sentence"
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            {/* Icon background with gradient matching original image */}
            <div className="p-4 rounded-full mb-4 bg-gradient-to-br from-[#ffe6f1] to-[#e6d3e8]">
              <svg
                className="w-10 h-10 text-[#f5469b]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M480 320H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 128H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32zm160-128c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0s256 114.6 256 256zm-160-32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32h-64zm-192 0v64c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32zm0 128v64c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Sentence</h2>
            <p className="text-gray-500 text-center mt-2">
              Explore sentence structure and tenses.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
