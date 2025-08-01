// app/UsernameContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Ctx = {
  username: string;
  setUsername: (u: string) => void;
  dark: boolean;
  toggleDark: () => void;
  font: string;
  setFont: (f: string) => void;
  zoom: string;
  setZoom: (z: string) => void;
  lang: string;
  setLang: (l: string) => void;
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
  lang: "en",
  setLang: () => {},
});

export const useUsername = () => useContext(UsernameContext);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  /* 1. 先给服务端默认值，避免 localStorage 报错 */
  const [username, setUsername] = useState("Admin");
  const [dark, setDark]   = useState(false);
  const [font, setFont]   = useState("16");
  const [zoom, setZoom]   = useState("100");
  const [lang, setLang]   = useState("en");

  /* 2. 客户端挂载后读取 localStorage */
  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Admin");
    setDark(localStorage.getItem("dark") === "true");
    setFont(localStorage.getItem("font") || "16");
    setZoom(localStorage.getItem("zoom") || "100");
    setLang(localStorage.getItem("lang") || "en");
  }, []);

  /* 3. 任何改动持久化到 localStorage 并立即生效 */
  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("dark", String(dark));
    localStorage.setItem("font", font);
    localStorage.setItem("zoom", zoom);
    localStorage.setItem("lang", lang);
  }, [username, dark, font, zoom, lang]);

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
        lang,
        setLang,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};