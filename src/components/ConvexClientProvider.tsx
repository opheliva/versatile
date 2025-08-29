"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react";

// Khởi tạo Convex client với URL từ biến môi trường
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    // Bọc ứng dụng trong ClerkProvider để cung cấp thông tin người dùng
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      {/* Bọc trong ConvexProviderWithClerk để kết nối Convex với Clerk.
        Chúng ta truyền hook `useAuth` vào đây. Convex sẽ tự động 
        gọi hook này để lấy token xác thực của người dùng.
      */}
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
