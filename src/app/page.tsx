"use client";
import { useState } from "react";

export default function Home() {

  const isSignedIn = false; // Mock data for demo

  // Danh sách các bài viết blog
  const posts = [
    {
      slug: "tai-sao-ielts-band-7",
      title: "Tại sao bạn mãi CHỨNG ở IELTS Band 7 dù LUYỆN ĐỀ CẢ NĂM TRỜI (sự thật không ai nói)",
      description: "Khám phá 3 điểm chính mà những người Band 8 IELTS làm khác biệt so với những người mắc kẹt ở Band 7.",
      image: "/blog-post-1.jpg",
      readTime: "8 phút đọc",
      date: "31/7/2025"
    },
    {
      slug: "bi-quyet-giao-tiep-tu-tin",
      title: "Bí quyết để giao tiếp tiếng Anh tự tin như người bản xứ",
      description: "Giao tiếp tiếng Anh không chỉ là về ngữ pháp và từ vựng. Cùng khám phá các bí quyết để nói trôi chảy và tự nhiên hơn.",
      image: "/blog-post-2.jpg",
      readTime: "6 phút đọc",
      date: "25/7/2025"
    },
    {
      slug: "5-ung-dung-hoc-tu-vung",
      title: "5 ứng dụng học từ vựng hiệu quả nhất mà bạn nên dùng",
      description: "Đừng lãng phí thời gian, hãy tận dụng công nghệ để học từ vựng tiếng Anh một cách hiệu quả và thú vị hơn.",
      image: "/blog-post-3.jpg",
      readTime: "5 phút đọc",
      date: "18/7/2025"
    }
  ];

  // Chọn bài viết tiêu biểu để hiển thị
  const featuredPost = posts[0]; // Bạn có thể thay đổi index để chọn bài khác

  return (
    <main>
      {/* --- Phần 1: Giới thiệu chung --- */}
      <section className="relative w-full h-screen flex items-center justify-center p-8 bg-[#fffdfc]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Nội dung bên trái */}
          <div className="md:w-1/2 text-left mb-10 md:mb-0">
            <h1 className="text-6xl font-extrabold text-[#505252] mb-4 leading-tight">
              LEARN ENGLISH AS A FUN GAME
            </h1>
            <p className="text-3xl text-[#7ed957] font-semibold mb-8">
              ENJOYABLE, MEMORABLE AND EFFECTIVE
            </p>
            <a
              href={isSignedIn ? "/practice" : "/sign-in"}
              className="bg-[#ff6957] text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-[#ff4e3e] transition duration-300 transform hover:scale-105 inline-block"
            >
              Get started
              <span className="ml-2">🚀</span>
            </a>
          </div>

          {/* Video và các tính năng bên phải */}
          <div className="md:w-1/2 flex flex-col items-center">
            {/* Video */}
            <video
              src="/rabbit.mp4"
              autoPlay
              muted
              loop
              className="w-full max-w-lg mb-8 rounded-none border-0"
            />
          </div>
        </div>
      </section>

      {/* --- Phần 2: Các tính năng nổi bật --- */}
      <section className="w-full py-20 px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#505252] mb-12">
            Vì sao nên chọn Versatile?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Tính năng 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <img src="/feature1.png" alt="Feature 1" width={80} height={80} className="mx-auto mb-4 w-[80px] h-[80px]"/>
              <h3 className="text-2xl font-bold text-[#505252] mb-2">AI Tutor thông minh</h3>
              <p className="text-gray-600">Học cùng gia sư AI 24/7, luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</p>
            </div>
            {/* Tính năng 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <img src="/feature2.png" alt="Feature 2" width={80} height={80} className="mx-auto mb-4 w-[80px] h-[80px]"/>
              <h3 className="text-2xl font-bold text-[#505252] mb-2">Học mà chơi</h3>
              <p className="text-gray-600">Thách thức bạn bè, kiếm cà rốt và thăng hạng trên bảng xếp hạng.</p>
            </div>
            {/* Tính năng 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <img src="/feature3.png" alt="Feature 3" width={80} height={80} className="mx-auto mb-4 w-[80px] h-[80px]"/>
              <h3 className="text-2xl font-bold text-[#505252] mb-2">Cộng đồng sôi nổi</h3>
              <p className="text-gray-600">Kết nối với cộng đồng người học, chia sẻ kinh nghiệm và cùng nhau tiến bộ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Phần 3: Blog mới nhất --- */}
      <section className="w-full py-20 px-8 bg-[#fffdfc]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#505252] mb-4">Bài viết mới nhất</h2>
          <p className="text-xl text-gray-500 mb-12">Mẹo học tiếng Anh và cập nhật từ Versatile</p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:w-[700px] mx-auto transform transition-transform hover:scale-105">
            <a href={`/blog/${featuredPost.slug}`}>
              <img src={featuredPost.image} alt={featuredPost.title} width={700} height={400} className="w-full h-auto object-cover"/>
              <div className="p-8 text-left">
                <h3 className="text-3xl font-bold text-[#505252] mt-4 mb-2">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {featuredPost.description}
                </p>
                <div className="text-sm text-gray-400">
                  <span>{featuredPost.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </a>
          </div>
          
          <div className="mt-12">
            <a
              href="/blog"
              className="inline-flex items-center text-[#ff6957] font-semibold text-xl hover:text-[#ff4e3e]"
            >
              Xem tất cả bài viết 
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- Phần 4: Footer --- */}
      <footer className="w-full py-8 text-center text-gray-600">
        <p>&copy; 2025 Versatile. All rights reserved.</p>
        <p>Contact: zhaoweipv@gmail.com</p>
      </footer>
    </main>
  );
}
