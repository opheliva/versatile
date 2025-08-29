"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react";
import { useAuth } from "@clerk/nextjs";

// Khởi tạo Convex client với URL từ biến môi trường
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    // Sử dụng ConvexProviderWithClerk để kết nối Convex với Clerk.
    // Component này đã tự động bao gồm chức năng của ClerkProvider.
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export default ConvexClientProvider;
