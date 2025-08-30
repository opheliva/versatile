"use client";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

// Định nghĩa kiểu dữ liệu cho một bài viết để TypeScript nhận diện
interface Post {
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
}

// Mock data cho tất cả các bài viết blog
const allPosts: Post[] = [
  {
    slug: "tai-sao-ielts-band-7",
    title: "Tại sao bạn mãi CHỨNG ở IELTS Band 7 dù LUYỆN ĐỀ CẢ NĂM TRỜI?",
    image: "/blog-post-1.jpg",
    date: "31/7/2025",
    content: `
      <p className="mb-4">Bạn đã luyện đề cả năm trời, làm hàng trăm bài Listening, Reading, viết cả chục bài Essay nhưng điểm IELTS vẫn dậm chân tại chỗ ở Band 7? Bạn cảm thấy nản lòng và không biết mình sai ở đâu? Bài viết này sẽ giúp bạn hiểu rõ nguyên nhân và tìm ra lối thoát.</p>
      
      <h3 className="text-2xl font-bold text-[#505252] mt-8 mb-4">1. Chỉ luyện đề, không học lại từ gốc</h3>
      <p className="mb-4">Nhiều người học chỉ tập trung vào việc làm thật nhiều đề thi thử mà quên mất việc học lại kiến thức nền tảng. Luyện đề chỉ là bước cuối cùng để làm quen với cấu trúc đề thi và rèn luyện tốc độ. Nếu bạn không nắm vững ngữ pháp, từ vựng, và các chiến thuật làm bài cơ bản, bạn sẽ khó mà tiến bộ được.</p>
      
      <h3 className="text-2xl font-bold text-[#505252] mt-8 mb-4">2. Không có phản hồi chuyên sâu</h3>
      <p className="mb-4">Khi tự học, bạn có thể tự chấm điểm Listening và Reading. Tuy nhiên, với Writing và Speaking, việc tự đánh giá là rất khó khăn. Bạn cần có một người có trình độ chuyên môn cao để nhận xét và chỉ ra những lỗi sai cụ thể của mình. Một gia sư AI thông minh có thể giúp bạn làm điều này 24/7.</p>
      
      <h3 className="text-2xl font-bold text-[#505252] mt-8 mb-4">3. Thiếu sự đa dạng trong cách học</h3>
      <p className="mb-4">Học tiếng Anh không chỉ là làm bài tập. Hãy đa dạng hóa các hoạt động học của mình bằng cách xem phim, nghe nhạc, đọc sách, và tham gia vào các cộng đồng học tiếng Anh. Việc này không chỉ giúp bạn thư giãn mà còn giúp bạn tiếp xúc với ngôn ngữ một cách tự nhiên hơn.</p>
    `
  },
  {
    slug: "bi-quyet-giao-tiep-tu-tin",
    title: "Bí quyết để giao tiếp tiếng Anh tự tin như người bản xứ",
    image: "/blog-post-2.jpg",
    date: "25/7/2025",
    content: `
      <p className="mb-4">Nói tiếng Anh trôi chảy và tự tin là mục tiêu của rất nhiều người. Nhưng làm thế nào để đạt được điều đó? Sau đây là những bí quyết bạn không nên bỏ qua.</p>
      
      <h3 className="2xl font-bold text-[#505252] mt-8 mb-4">1. Luyện tập hàng ngày</h3>
      <p className="mb-4">Không có con đường tắt nào đến sự thành thạo. Hãy dành 15-30 phút mỗi ngày để luyện nói. Bạn có thể tự nói chuyện với chính mình, ghi âm lại giọng nói của mình, hoặc tìm một người bạn để luyện tập cùng.</p>
      
      <h3 className="2xl font-bold text-[#505252] mt-8 mb-4">2. Tập trung vào ngữ điệu và trọng âm</h3>
      <p className="mb-4">Ngữ điệu và trọng âm đóng vai trò quan trọng trong việc truyền đạt ý nghĩa. Thay vì chỉ tập trung vào từ vựng, hãy lắng nghe cách người bản xứ nói và cố gắng bắt chước ngữ điệu của họ.</p>
    `
  },
  {
    slug: "5-ung-dung-hoc-tu-vung",
    title: "5 ứng dụng học từ vựng hiệu quả nhất mà bạn nên dùng",
    image: "/blog-post-3.jpg",
    date: "18/7/2025",
    content: `
      <p className="mb-4">Từ vựng là nền tảng của mọi ngôn ngữ. Dưới đây là 5 ứng dụng tuyệt vời sẽ giúp bạn mở rộng vốn từ vựng của mình một cách nhanh chóng.</p>
      
      <h3 className="text-2xl font-bold text-[#505252] mt-8 mb-4">1. Duolingo</h3>
      <p className="mb-4">Với phương pháp học qua trò chơi, Duolingo giúp bạn học từ vựng một cách nhẹ nhàng và hiệu quả.</p>
      
      <h3 className="text-2xl font-bold text-[#505252] mt-8 mb-4">2. Anki</h3>
      <p className="mb-4">Anki sử dụng hệ thống lặp lại ngắt quãng để đảm bảo bạn ghi nhớ từ vựng lâu dài.</p>
      
      <h3 className="text-2xl font-bold text-[#505252] mt-8 mb-4">3. Quizlet</h3>
      <p className="mb-4">Bạn có thể tạo flashcard riêng của mình hoặc sử dụng hàng triệu bộ flashcard có sẵn từ cộng đồng.</p>
    `
  }
];

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const slug = pathSegments[pathSegments.length - 1];
    
    const foundPost = allPosts.find((p) => p.slug === slug);
    setPost(foundPost || null); // Dùng null nếu không tìm thấy
  }, [pathname]);

  if (!post) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-gray-700">Không tìm thấy bài viết này</h1>
        <a href="/blog" className="mt-4 text-blue-500 hover:underline">Quay lại Blog</a>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdfc] min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <a href="/blog" className="inline-flex items-center text-[#ff6957] font-semibold mb-8 hover:text-[#ff4e3e]">
          <span className="mr-2">←</span> Quay lại Blog
        </a>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#505252] mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="text-gray-500 mb-8">
          <span>{post.date}</span>
        </div>
        
        <img src={post.image} alt={post.title} className="w-full h-auto object-cover rounded-2xl shadow-lg mb-8" />
        
        <div className="prose max-w-none text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
