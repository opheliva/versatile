"use client";
import { useState } from "react";

export default function Blog() {
  const [posts] = useState([
    {
      slug: "tai-sao-ielts-band-7",
      title: "Tại sao bạn mãi CHỨNG ở IELTS Band 7 dù LUYỆN ĐỀ CẢ NĂM TRỜI?",
      description: "Khám phá 3 điểm chính mà những người Band 8 IELTS làm khác biệt so với những người mắc kẹt ở Band 7.",
      image: "/blog-post-1.jpg",
      date: "31/7/2025"
    },
    {
      slug: "bi-quyet-giao-tiep-tu-tin",
      title: "Bí quyết để giao tiếp tiếng Anh tự tin như người bản xứ",
      description: "Giao tiếp tiếng Anh không chỉ là về ngữ pháp và từ vựng. Cùng khám phá các bí quyết để nói trôi chảy và tự nhiên hơn.",
      image: "/blog-post-2.jpg",
      date: "25/7/2025"
    },
    {
      slug: "5-ung-dung-hoc-tu-vung",
      title: "5 ứng dụng học từ vựng hiệu quả nhất mà bạn nên dùng",
      description: "Đừng lãng phí thời gian, hãy tận dụng công nghệ để học từ vựng tiếng Anh một cách hiệu quả và thú vị hơn.",
      image: "/blog-post-3.jpg",
      date: "18/7/2025"
    }
  ]);

  return (
    <div className="bg-gray-100 min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-[#505252] mb-4">Blog Versatile</h1>
        <p className="text-xl text-gray-500 mb-12">Nơi chia sẻ kiến thức và kinh nghiệm học tiếng Anh</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform hover:scale-105">
              <a href={`/blog/${post.slug}`}>
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
                <div className="p-6 text-left">
                  <h2 className="text-2xl font-bold text-[#505252] mt-2 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-md text-gray-600 mb-4">
                    {post.description}
                  </p>
                  <div className="text-sm text-gray-400">
                    <span>{post.date}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
