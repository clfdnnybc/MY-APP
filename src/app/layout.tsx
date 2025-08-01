"use client";
import { UsernameProvider } from "./UsernameContext";
import { ReactNode } from "react";
import './globals.css'; // 确保导入全局样式

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* 使用一个不破坏布局的包装元素 */}
        
          <UsernameProvider>
            {children}
          </UsernameProvider>
        
      </body>
    </html>
  );
}