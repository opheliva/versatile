"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

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
            <Link
              href={isSignedIn ? "/practice" : "/sign-in"}
              className="bg-[#ff6957] text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-[#ff4e3e] transition duration-300 transform hover:scale-105 inline-block"
            >
              Get started
              <span className="ml-2">🚀</span>
            </Link>
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
              <Image src="/feature1.png" alt="Feature 1" width={80} height={80} className="mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-[#505252] mb-2">AI Tutor thông minh</h3>
              <p className="text-gray-600">Học cùng gia sư AI 24/7, luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</p>
            </div>
            {/* Tính năng 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Image src="/feature2.png" alt="Feature 2" width={80} height={80} className="mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-[#505252] mb-2">Học mà chơi</h3>
              <p className="text-gray-600">Thách thức bạn bè, kiếm cà rốt và thăng hạng trên bảng xếp hạng.</p>
            </div>
            {/* Tính năng 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Image src="/feature3.png" alt="Feature 3" width={80} height={80} className="mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-[#505252] mb-2">Cộng đồng sôi nổi</h3>
              <p className="text-gray-600">Kết nối với cộng đồng người học, chia sẻ kinh nghiệm và cùng nhau tiến bộ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Phần 3: Footer --- */}
      <footer className="w-full py-8 text-center text-gray-600">
        <p>&copy; 2025 Versatile. All rights reserved.</p>
        <p>Contact: zhaoweipv@gmail.com</p>
      </footer>
    </main>
  );
}
