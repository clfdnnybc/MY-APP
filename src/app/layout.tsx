"use client";
import { UsernameProvider } from "./UsernameContext";
import { ReactNode } from "react";
import './globals.css'; // 确保导入全局样式
import { ViewTransitions } from "next-view-transitions";
import "../i18n";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
    <html lang="en" translate="no">
      <body className="flex flex-col min-h-screen">
        {/* 使用一个不破坏布局的包装元素 */}
        
          <UsernameProvider>
            {children}
          </UsernameProvider>
        
      </body>
    </html>
    </ViewTransitions>
  );
}