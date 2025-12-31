"use client";
import { useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [posts] = useState([
    {
      slug: "from-pharmacy-to-computer-science",
      title: "From Pharmacy to Computer Science: Why I am building Versatile",
      description: "My journey of transitioning from a medical background to software development, driven by a passion to reduce educational inequality.",
      image: "/blog-pharmacy.jpg",
      date: "DEC 31, 2025",
      tag: "MY JOURNEY"
    },
    {
      slug: "teaching-300-students",
      title: "What 300+ Students Across SE Asia Taught Me About English",
      description: "Insights from teaching English across Southeast Asia and why interactive mindmaps are the future of learning.",
      image: "/blog-teaching.jpg",
      date: "DEC 25, 2025",
      tag: "EDUCATION"
    },
    {
      slug: "self-taught-developer-tips",
      title: "Self-Taught React & Next.js: Lessons from a Pharmacy Student",
      description: "How I managed to finish my pharmacology thesis while mastering web development through project-based learning.",
      image: "/blog-cs50.jpg",
      date: "DEC 15, 2025",
      tag: "CODING"
    }
  ]);

  return (
    <main className="bg-[#fdfff2] min-h-screen py-24 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Nút quay lại trang chủ nhanh */}
        <Link href="/" className="inline-flex items-center text-[#7e8b43] font-black uppercase tracking-widest text-[10px] mb-8 hover:gap-2 transition-all">
          <span className="mr-2">←</span> Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-black text-[#505252] mb-4 uppercase tracking-tighter">
          The Versatile Blog
        </h1>
        <p className="text-gray-500 font-medium mb-20 italic text-lg max-w-2xl mx-auto">
          Insights on career pivoting, self-taught coding, and the mission to democratize quality education.
        </p>
        
        {/* Grid Container - 3 cột giống hệt phần trang chủ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {posts.map((post, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[40px] shadow-lg overflow-hidden group cursor-pointer border border-gray-100 flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image Wrapper */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute top-5 left-5 z-10 bg-[#7e8b43] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {post.tag}
                </div>
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={post.title} 
                />
              </div>
              
              {/* Content */}
              <div className="p-10 flex flex-col flex-grow">
                <p className="text-[#ff98a2] text-[10px] font-black uppercase tracking-widest mb-4">
                  {post.date}
                </p>
                <h3 className="text-2xl font-black text-[#505252] mb-4 leading-tight group-hover:text-[#7e8b43] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 opacity-80">
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

        {/* Footer của trang Blog */}
        <div className="mt-32 pt-12 border-t border-dashed border-[#7e8b43]/20">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                © 2025 Versatile • Built by Vy Phuong Trieu
            </p>
        </div>
      </div>
    </main>
  );
}