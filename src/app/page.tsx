// app/page.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center bg-[#fdfcf6]">
      {/* --- Phần 1: Giới thiệu chính --- */}
      <section className="flex flex-col items-center justify-center w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center p-8 max-w-4xl"
        >
          <h1 className="text-6xl font-extrabold text-[#505252] mb-4">
            Học ngoại ngữ miễn phí, vui nhộn và hiệu quả!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Versatile sẽ giúp bạn chinh phục tiếng Anh một cách dễ dàng.
          </p>

          {/* Các nút */}
          <div className="flex justify-center gap-6 mt-6">
            <Link href="/practice">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-green-600 transition-colors"
              >
                BẮT ĐẦU
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-500 font-bold py-4 px-10 rounded-full shadow-lg border-2 border-green-500 hover:bg-gray-100 transition-colors"
              >
                TÔI ĐÃ CÓ TÀI KHOẢN
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Thêm video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-10 max-w-xl mx-auto"
        >
          <video
            src="/rabbit.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </motion.div>
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
        <p>&copy; 2024 Versatile. All rights reserved.</p>
        <p>Liên hệ: zhaoweipv@gmail.com</p>
      </footer>
    </main>
  );
}