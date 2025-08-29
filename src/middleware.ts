import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Bỏ qua các file tĩnh và các route API của Next.js
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Bảo vệ tất cả các route, trừ những route được loại trừ.
    // Các route đăng nhập và đăng ký của Clerk được tự động loại trừ.
    "/",
  ],
};
