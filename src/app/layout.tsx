"use client";
import { ReactNode } from "react";
import { UsernameProvider } from "./UsernameContext";
import './globals.css';
import "../i18n";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" translate="no">
      <body className="flex flex-col min-h-screen">
        <UsernameProvider>
          {children}
        </UsernameProvider>
      </body>
    </html>
  );
}