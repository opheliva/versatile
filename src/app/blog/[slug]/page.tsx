"use client";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  content: string;
}

const allPosts: Post[] = [
  {
    slug: "from-pharmacy-to-computer-science",
    title: "From Pharmacy to Computer Science: Why I am building Versatile",
    category: "MY JOURNEY",
    image: "/blog-pharmacy.jpg", 
    date: "Dec 31, 2025",
    content: `
      <p class="mb-6 text-xl italic border-l-4 border-[#7e8b43] pl-4">"Can a medicine researcher build software systems that revolutionize education?"</p>
      
      <p class="mb-6">I started my journey at Ton Duc Thang University, deeply immersed in Pharmaceutical sciences. However, the more I studied, the more I realized the transformative power of technology in bridging the educational gap.</p>
      
      <h3 class="text-2xl font-black text-[#505252] mt-10 mb-4 uppercase tracking-tighter">The Pivotal Shift</h3>
      <p class="mb-6">While researching piperlongumine derivatives for cancer treatment, I spent my late nights mastering CS50. I realized that while a new drug might take a decade to reach a patient, a single line of code could empower thousands of students instantly.</p>
      
      <h3 class="text-2xl font-black text-[#505252] mt-10 mb-4 uppercase tracking-tighter">My Mission at Stanford</h3>
      <p class="mb-6">This realization led me to apply for the Knight-Hennessy Scholars program. I aim to combine the rigorous logical thinking of Pharmacy with the scalability of Computer Science to build Versatile—a platform where financial limits never limit one's future.</p>
    `
  },
  {
    slug: "teaching-300-students",
    title: "What 300+ Students Across SE Asia Taught Me About Learning",
    category: "EDUCATION",
    image: "/blog-teaching.jpg",
    date: "Dec 25, 2025",
    content: `
      <p class="mb-6">From Kyna English classrooms to 1-on-1 sessions for students in Malaysia, Indonesia, and Taiwan, I’ve learned one fundamental truth: traditional learning methods are failing us by being too passive.</p>
      
      <h3 class="text-2xl font-black text-[#505252] mt-10 mb-4 uppercase tracking-tighter">Visual Memory & Interactive Mindmaps</h3>
      <p class="mb-6">Most students struggle because they try to memorize long, isolated lists of vocabulary. In the Versatile project, I implement Interactive Mindmaps to stimulate visual association—a method I’ve successfully used to help hundreds of my students master English naturally.</p>
      
      <h3 class="text-2xl font-black text-[#505252] mt-10 mb-4 uppercase tracking-tighter">Closing the Inequality Gap</h3>
      <p class="mb-6">Quality education should be a right, not a privilege. Having worked multiple part-time jobs to support my own studies, I’ve seen the hunger for knowledge in underserved communities. That is my motivation to keep Versatile completely free for everyone.</p>
    `
  },
  {
    slug: "self-taught-developer-tips",
    title: "Self-Taught React & Next.js: Lessons from a Pharmacy Student",
    category: "CODING",
    image: "/blog-cs50.jpg",
    date: "Dec 15, 2025",
    content: `
      <p class="mb-6">How did I manage to finish my pharmacology thesis while simultaneously completing the CS50 Web certification? The answer isn't brilliant talent—it's radical discipline.</p>
      
      <h3 class="text-2xl font-black text-[#505252] mt-10 mb-4 uppercase tracking-tighter">Project-Based Learning</h3>
      <p class="mb-6">Instead of just watching tutorials, I started building Versatile immediately. Every bug was a lesson; every crash was an opportunity to dive deeper into TypeScript and Framer Motion. This "learning by doing" approach is the fastest way to master any tech stack.</p>
      
      <h3 class="text-2xl font-black text-[#505252] mt-10 mb-4 uppercase tracking-tighter">Advice for Career Pivoters</h3>
      <p class="mb-6">Don't be afraid to start from zero. The skills from your previous field—like the meticulousness required in a Pharmacy lab—will be your secret weapon in writing clean, logical, and efficient code.</p>
    `
  }
];

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname.split('/').pop();
    const foundPost = allPosts.find((p) => p.slug === slug);
    setPost(foundPost || null);
  }, [pathname]);

  if (!post) {
    return (
      <div className="bg-[#fdfff2] min-h-screen flex items-center justify-center">
        <p className="text-[#7e8b43] font-black">Loading post...</p>
      </div>
    );
  }

  return (
    <main className="bg-[#fdfff2] min-h-screen py-20 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-[#7e8b43] font-black uppercase tracking-widest text-[10px] mb-12 hover:gap-3 transition-all">
          <span className="text-lg">←</span> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
             <span className="bg-[#7e8b43] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                {post.category}
             </span>
             <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#505252] leading-tight mb-8">
            {post.title}
          </h1>
        </div>

        {/* Image */}
        <div className="rounded-[40px] overflow-hidden shadow-2xl mb-16 border-8 border-white">
          <img src={post.image} alt={post.title} className="w-full h-auto" />
        </div>

        {/* Content Area */}
        <div 
          className="text-[#505252] text-lg leading-relaxed blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        {/* Decorative Footer */}
        <div className="mt-20 pt-10 border-t border-dashed border-[#7e8b43]/30 flex flex-col items-center">
           <p className="text-gray-400 text-sm italic mb-8 italic">"Passion is the only resource you truly need."</p>
           <Link href="/" className="bg-[#ff98a2] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all">
              Learn more about my journey
           </Link>
        </div>
      </article>

      {/* Tailwind Style Fix cho dangerouslySetInnerHTML */}
      <style jsx global>{`
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content h3 { 
          font-weight: 900; 
          color: #505252; 
          font-size: 1.5rem; 
          margin-top: 2.5rem; 
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: -0.025em;
        }
      `}</style>
    </main>
  );
}