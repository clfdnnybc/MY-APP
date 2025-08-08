// app/contexts/UsernameContext.tsx  （路径可保持原样）
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Ctx = {
  username: string;
  setUsername: (u: string) => void;
  avatar: string;                 
  setAvatar: (a: string) => void; 
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
  avatar: "/avatar.ico",         
  setAvatar: () => {},
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
  const [avatar, setAvatar]   = useState("/avatar.ico"); 
  const [dark, setDark]       = useState(false);
  const [font, setFont]       = useState("16");
  const [zoom, setZoom]       = useState("100");

  useEffect(() => {
    /* 从 localStorage 读取 */
    setUsername(localStorage.getItem("username") || "Admin");
    setAvatar(localStorage.getItem("avatar") || "/avatar.ico");
    setDark(localStorage.getItem("dark") === "true");
    setFont(localStorage.getItem("font") || "16");
    setZoom(localStorage.getItem("zoom") || "100");
    document.documentElement.classList.toggle("dark", localStorage.getItem("dark") === "true");
  }, []);

  useEffect(() => {
    /* 写入 localStorage */
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("dark", String(dark));
    localStorage.setItem("font", font);
    localStorage.setItem("zoom", zoom);
  }, [username, avatar, dark, font, zoom]);

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
        avatar,       
        setAvatar,    
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