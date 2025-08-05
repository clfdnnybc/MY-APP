"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import i18n from "../i18n";

type Ctx = {
  username: string;
  setUsername: (u: string) => void;
  dark: boolean;
  toggleDark: () => void;
  font: string;
  setFont: (f: string) => void;
  zoom: string;
  setZoom: (z: string) => void;
};

const UsernameContext = createContext<Ctx>({
  username: "Admin",
  setUsername: () => {},
  dark: false,
  toggleDark: () => {},
  font: "16",
  setFont: () => {},
  zoom: "100",
  setZoom: () => {},
});

export const useUsername = () => useContext(UsernameContext);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("Admin");
  const [dark, setDark]   = useState(false);
  const [font, setFont]   = useState("16");
  const [zoom, setZoom]   = useState("100");

  useEffect(() => {
    // 从 localStorage 读取设置
    const storedDark = localStorage.getItem("dark") === "true";
    setUsername(localStorage.getItem("username") || "Admin");
    setDark(storedDark);
    setFont(localStorage.getItem("font") || "16");
    setZoom(localStorage.getItem("zoom") || "100");
    
    // 立即应用暗模式类名
    document.documentElement.classList.toggle("dark", storedDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("dark", String(dark));
    localStorage.setItem("font", font);
    localStorage.setItem("zoom", zoom);
  }, [username, dark, font, zoom]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.setProperty("--user-font", `${font}px`);
    document.documentElement.style.setProperty("--user-zoom", `${zoom}%`);
  }, [dark, font, zoom]);

  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
        dark,
        toggleDark: () => setDark((d) => !d),
        font,
        setFont,
        zoom,
        setZoom,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};