"use client";
import Image from "next/image";
import Link from "next/link";
import { Archivo_Black } from "next/font/google";
import { useState, useRef } from 'react';

const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });

export default function Home() {
  const isSignedIn = false;

  // --- LOGIC CHO AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

const posts = [
    {
      slug: "from-pharmacy-to-computer-science",
      title: "From Pharmacy to CS: Why I am building Versatile",
      description: "My journey of transitioning from a medical background to software development, driven by a passion to reduce educational inequality.",
      image: "/blog-pharmacy.jpg", 
      date: "DEC 26, 2025",
      tag: "MY STORY"
    },
    {
      slug: "teaching-300-students",
      title: "What 300+ Students Taught Me About English",
      description: "Insights from teaching English across Southeast Asia and why mindmaps are the future of learning.",
      image: "/blog-teaching.jpg",
      date: "DEC 20, 2025",
      tag: "TEACHING"
    },
    {
      slug: "self-taught-developer-tips",
      title: "Self-Taught Developer: Lessons from CS50",
      description: "How I managed to finish CS50 while maintaining a pharmacy degree and what it taught me about persistence.",
      image: "/blog-cs50.jpg",
      date: "DEC 15, 2025",
      tag: "CODING"
    }
  ];
  const featuredPost = posts[0];

  return (
    <main className="bg-[#fdfff2] min-h-screen overflow-x-hidden">
      {/* --- PHẦN 1: HERO SECTION --- */}
      <section className="relative max-w-[1300px] mx-auto py-16 px-6 z-0">
        <div className="text-center mb-16">
          <h1 className={`${archivoBlack.className} text-[#7e8b43] text-5xl md:text-6xl mb-4`}>
            Learn English as a fun game
          </h1>
          <p className="text-[#a1a1a1] text-lg font-bold tracking-[0.3em] uppercase">
            Enjoyable, Memorable and Effective
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
          {/* CỘT TRÁI: Tính năng 1 & 2 */}
          <div className="md:col-span-3 flex flex-col gap-24 text-right">
            <div className="relative group">
              <h3 className="text-[#7e8b43] text-2xl font-bold italic mb-2 flex items-center justify-end gap-2">
                Study Mindmap <span className="bg-[#7e8b43] text-white rounded-full w-8 h-8 flex items-center justify-center not-italic text-sm">1</span>
              </h3>
              <p className="text-gray-600 text-sm"><b>Visualize Success.</b> Organize complex topics into clear mindmaps.</p>
              <img src="/mindmap-icon.png" alt="Mindmap" className="w-32 h-32 ml-auto mt-4 object-contain" />
            </div>
            <div className="relative group">
              <h3 className="text-[#7e8b43] text-2xl font-bold italic mb-2 flex items-center justify-end gap-2">
                Vocab Deep Dive <span className="bg-[#7e8b43] text-white rounded-full w-8 h-8 flex items-center justify-center not-italic text-sm">2</span>
              </h3>
              <p className="text-gray-600 text-sm"><b>Beyond Vocab.</b> Deep dive into Collocations and Idioms.</p>
              <img src="/treasure-icon.png" alt="Vocab" className="w-32 h-32 ml-auto mt-4 object-contain" />
            </div>
          </div>

          {/* CỘT GIỮA: Chú thỏ & Nút Start */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative">
            <video src="/rabbit.mp4" autoPlay muted loop className="w-full max-w-[400px] z-10" />
            <Link
              href={isSignedIn ? "/practice" : "/sign-in"}
              className="mt-4 z-20 bg-[#d4e7b8] text-white text-4xl font-black py-4 px-12 rounded-full border-4 border-white shadow-xl hover:scale-105 transition-all uppercase tracking-tighter"
            >
              Get STARTED
            </Link>
            {/* Mũi tên cong dưới nút bấm (Nếu bạn có file ảnh) */}
            <div className="flex justify-between w-full max-w-[300px] mt-4 opacity-40">
               <span className="text-4xl text-[#7e8b43] rotate-[120deg]">➥</span>
               <span className="text-4xl text-[#7e8b43] -rotate-[30deg] scale-x-[-1]">➥</span>
            </div>
          </div>

          {/* CỘT PHẢI: Tính năng 3 & 4 */}
          <div className="md:col-span-3 flex flex-col gap-24 text-left">
            <div className="relative group">
              <h3 className="text-[#7e8b43] text-2xl font-bold italic mb-2 flex items-center gap-2">
                <span className="bg-[#7e8b43] text-white rounded-full w-8 h-8 flex items-center justify-center not-italic text-sm">3</span> Contextual Learning
              </h3>
              <p className="text-gray-600 text-sm"><b>AI Personalization.</b> Scenarios created by AI for you.</p>
              <img src="/ai-icon.png" alt="AI" className="w-32 h-32 mt-4 object-contain" />
            </div>
            <div className="relative group">
              <h3 className="text-[#7e8b43] text-2xl font-bold italic mb-2 flex items-center gap-2">
                <span className="bg-[#7e8b43] text-white rounded-full w-8 h-8 flex items-center justify-center not-italic text-sm">4</span> Practice for Fluency
              </h3>
              <p className="text-gray-600 text-sm"><b>Real-World Application.</b> Interactive exercises and shadowed videos.</p>
              <img src="/practice-icon.png" alt="Practice" className="w-32 h-32 mt-4 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: MẢNG NỀN CONG (Background Curve) --- */}
      <div className="relative w-full overflow-hidden leading-[0] mt-[-100px]">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#d4e7b8" fillOpacity="0.3" d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      {/* --- PHẦN 3: WHY I AM HERE --- */}
      <section className="bg-[#d4e7b8]/30 py-20 px-6">
        <div className="max-w-3xl mx-auto relative bg-white/80 border-2 border-dashed border-[#7e8b43] rounded-[40px] p-10 text-center shadow-sm">
          <h2 className="text-sm font-black text-black mb-6 tracking-[0.3em] uppercase">
            WHY I AM HERE
          </h2>
          <p className="text-[#505252] text-xl md:text-2xl leading-relaxed font-medium">
            Empowering the underserved through free, quality English education. 
            I am dedicated to closing the gap and ensuring that 
            <span className="text-[#7e8b43] font-bold"> financial limits never limit your future.</span>
            <br />
            Let’s learn, grow, and rise together.
          </p>
        </div>
      </section>

      {/* --- PHẦN 4: ABOUT ME --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Card Profile Trái */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-[50px] overflow-hidden border-4 border-white shadow-2xl rotate-[-3deg]">
                <img src="/your-avatar.jpg" alt="Vy Phuong Trieu" className="w-full h-full object-cover" />
              </div>
              {/* Trang trí xung quanh ảnh */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#ff98a2] rounded-full flex items-center justify-center text-white text-2xl shadow-lg">★</div>
            </div>
            
            <h3 className="text-[#ff98a2] text-3xl font-black mt-8 mb-1">Vy Phuong Trieu</h3>
            <p className="text-[#ff98a2] italic font-medium mb-6 text-lg">(She/her)</p>
            
            {/* Music Player Mockup */}
            <div className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-16 border border-gray-100 mb-8">
              <audio 
                ref={audioRef} 
                src="/intro-audio.mp3" 
                onEnded={() => setIsPlaying(false)} 
              />
              <span className="text-gray-400 select-none">⏮</span>
              <div 
                onClick={toggleAudio}
                className="w-12 h-12 bg-[#ff98a2]/10 hover:bg-[#ff98a2]/20 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all shadow-sm"
              >
                <span className="text-[#ff98a2] leading-none">
                  {isPlaying ? "⏸" : "▶"}
                </span>
              </div>
              <span className="text-gray-400 select-none">⏭</span>
            </div>

            <p className="text-[#ff98a2] font-black tracking-widest text-xs mb-4">CONNECT WITH ME</p>
            <div className="flex gap-5">
              {/* Link Email */}
              <a href="mailto:zhaoweipv@gmail.com" title="Send Email">
                <img src="/mail-icon.png" className="w-6 h-6 grayscale opacity-40 hover:grayscale-0 transition-all cursor-pointer" alt="Email" />
              </a>
              {/* Link YouTube */}
              <a href="https://www.youtube.com/@opheliva" target="_blank" rel="noopener noreferrer" title="Visit YouTube">
                <img src="/youtube-icon.png" className="w-6 h-6 grayscale opacity-40 hover:grayscale-0 transition-all cursor-pointer" alt="YouTube" />
              </a>
            </div>
          </div>

          {/* Info Box Phải */}
          <div className="bg-[#7e8b43] text-white p-10 md:p-14 rounded-[60px] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="uppercase tracking-[0.2em] text-xs font-bold mb-3 opacity-70">ABOUT ME</p>
              <h2 className="text-4xl font-black mb-6 leading-tight">More Than Just Learning</h2>
              <p className="text-lg leading-relaxed opacity-90 mb-10">
                I am Vy, a Pharmacy student turned self-taught developer and English tutor. 
                My journey taught me that passion is the only resource you truly need. 
                I built 'Versatile' to ensure that financial limits never limit your future.
              </p>

              <div className="space-y-10">
                <div className="border-t border-dashed border-white/20 pt-8">
                  <p className="uppercase tracking-widest text-xs font-bold mb-4 opacity-60">EDUCATION</p>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm">2020 - 2025</span>
                    <div className="text-right">
                      <p className="font-black text-lg leading-tight">Bachelor of Pharmacy</p>
                      <p className="text-sm opacity-70">Ton Duc Thang University</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-white/20 pt-8">
                  <p className="uppercase tracking-widest text-xs font-bold mb-4 opacity-60">EXPERIENCE</p>
                  <div className="space-y-8 text-sm">
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-bold shrink-0">2025 - present</span>
                      <div className="text-right">
                        <p className="font-black text-lg leading-tight">Founder & Developer</p>
                        <p className="opacity-70 italic">Versatile Web App - Interactive English Platform</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-bold shrink-0">2025 - present</span>
                      <div className="text-right">
                        <p className="font-black text-lg leading-tight">Online English Tutor</p>
                        <p className="opacity-70 italic">Taught over 300 students across SE Asia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút Resume Button */}
              <a 
                href="https://drive.google.com/file/d/1Dxbt42HnHPkj9NTpZKw64uMmYvhPBHMJ/view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full mt-12"
              >
                <button className="w-full bg-[#ff98a2] text-white font-black py-5 rounded-3xl uppercase tracking-widest hover:brightness-110 shadow-xl transition-all">
                  RESUME
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 5: BLOG SECTION (3 POSTS GRID) --- */}
      <section className="py-24 px-6 bg-[#fdfff2]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-4xl font-black text-[#505252] mb-4 uppercase tracking-tighter">Welcome to the Versatile Blog</h2>
          <p className="text-gray-500 font-medium mb-16 italic text-lg">Where I share my journey and practical English learning tips</p>
          
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {posts.map((post, index) => (
              <div key={index} className="bg-white rounded-[40px] shadow-lg overflow-hidden group cursor-pointer border border-gray-100 flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl">
                {/* Image Wrapper */}
                <div className="h-60 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-[#7e8b43] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                    {post.tag}
                  </div>
                  <img 
                    src={post.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={post.title} 
                  />
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-[#ff98a2] text-[10px] font-black uppercase tracking-widest mb-3">{post.date}</p>
                  <h3 className="text-xl font-black text-[#505252] mb-4 leading-tight group-hover:text-[#7e8b43] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 opacity-80">
                    {post.description}
                  </p>
                  
                  {/* Link ở dưới cùng */}
                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-2 text-[#7e8b43] font-black uppercase tracking-widest text-[10px] group/link"
                    >
                      Read Story <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nút Xem tất cả */}
          <Link href="/blog" className="inline-block mt-16">
            <button className="border-2 border-[#7e8b43] text-[#7e8b43] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#7e8b43] hover:text-white transition-all text-sm">
              View All Posts
            </button>
          </Link>
        </div>
      </section>

{/* --- PHẦN 6: METHODOLOGY (PHƯƠNG PHÁP HỌC) --- */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Trang trí nền - Hình tròn mờ */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4e7b8]/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff98a2]/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#505252] mb-4 uppercase tracking-tighter">The Versatile Way</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              I don't just give you words; I give you a system to remember them forever. 
              Based on my experience teaching 300+ students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mindmap Benefit */}
            <div className="flex gap-6 p-8 rounded-[40px] bg-[#f9fbf2] border border-[#d4e7b8]/30 transition-all hover:shadow-xl">
              <div className="w-16 h-16 shrink-0 bg-[#7e8b43] rounded-2xl flex items-center justify-center text-white text-3xl">🧠</div>
              <div>
                <h4 className="text-xl font-black text-[#505252] mb-2">Visual Memory (Mindmaps)</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our brains process images 60,000x faster than text. Versatile uses interactive mindmaps 
                  to connect vocabulary, synonyms, and idioms visually.
                </p>
              </div>
            </div>

            {/* Contextual Benefit */}
            <div className="flex gap-6 p-8 rounded-[40px] bg-[#fff9fa] border border-[#ff98a2]/20 transition-all hover:shadow-xl">
              <div className="w-16 h-16 shrink-0 bg-[#ff98a2] rounded-2xl flex items-center justify-center text-white text-3xl">🎭</div>
              <div>
                <h4 className="text-xl font-black text-[#505252] mb-2">Real-world Context</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Stop learning isolated words. I provide real-life scenarios and collocations 
                  so you know exactly how to use English in conversations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 7: FAQS (CÂU HỎI THƯỜNG GẶP) --- */}
      <section className="py-24 px-6 bg-[#e4edc9]"> 
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          
          {/* CỘT TRÁI: Tiêu đề FAQS */}
          <div className="md:col-span-5 text-left">
            <h2 className="text-7xl font-black text-[#7e8b43] mb-8 leading-[0.9] uppercase tracking-tighter">
              FAQS
            </h2>
            {/* Hình ảnh minh họa từ file của bạn */}
            <div className="relative w-full max-w-[280px] mt-20">
               <img 
                 src="/faq-illustration.png" 
                 alt="FAQ Illustration" 
                 className="w-full h-auto object-contain"
               />
            </div>
          </div>

          {/* CỘT PHẢI: Các ô câu hỏi màu Vàng, chữ Hồng */}
          <div className="md:col-span-7 grid grid-cols-1 gap-6">
            {[
              {
                q: "Is the Versatile app really free?",
                a: "Yes. My core mission is to ensure that financial limits never limit your future. All learning mindmaps and resources are free for the community."
              },
              {
                q: "Who is this platform for?",
                a: "It's designed for anyone starting from 'Level 1'. Whether you are a student or a worker, these interactive tools will help you build a solid foundation."
              },
              {
                q: "How can I support this project?",
                a: "As a solo developer, your feedback is my greatest support. You can join our learning group or share the app with those who need it most."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="bg-[#fffacd] p-10 rounded-[50px] shadow-sm border-none transition-all hover:rotate-1"
              >
                <h4 className="text-[#ffa4c5] font-black text-xl mb-4 leading-tight uppercase tracking-tight">
                  {faq.q}
                </h4>
                <p className="text-[#7e8b43] text-sm font-medium leading-relaxed opacity-90">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHẦN CUỐI: FINAL CTA (KÊU GỌI HÀNH ĐỘNG) --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#7e8b43] rounded-[60px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Hình trang trí phía sau */}
          <div className="absolute top-0 right-0 text-[200px] opacity-10 font-black pointer-events-none select-none">GO</div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight relative z-10">
            Ready to break your <br /> limits today?
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto relative z-10">
            Join a community of learners who believe that their background doesn't define their future.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10">
            <Link 
              href={isSignedIn ? "/practice" : "/sign-up"}
              className="bg-white text-[#7e8b43] px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Start Learning Now
            </Link>
            <a 
              href="https://www.youtube.com/@opheliva"
              target="_blank"
              className="bg-[#ff98a2] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Watch My Journey
            </a>
          </div>
        </div>
      </section>

      {/* --- CẬP NHẬT LẠI FOOTER CHO ĐỒNG BỘ --- */}
      <footer className="py-12 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] bg-[#fdfff2]">
        <div className="flex justify-center gap-8 mb-6">
          <Link href="/privacy" className="hover:text-[#7e8b43]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#7e8b43]">Terms of Service</Link>
          <a href="mailto:zhaoweipv@gmail.com" className="hover:text-[#7e8b43]">Contact</a>
        </div>
        <p>© 2025 Versatile. Built with ❤️ by Vy Phuong Trieu.</p>
      </footer>

    </main>
  );
}