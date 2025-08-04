"use client";
import { useState, useEffect } from "react";
import { useUsername } from "../../UsernameContext";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { dark, toggleDark, font, setFont, zoom, setZoom, lang, setLang } = useUsername();
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 语言切换时同步 i18n
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // SSR 时返回空壳，避免 mismatch
  if (!mounted) {
    return <div className="max-w-lg mx-auto p-8 h-96" />; // 占位即可
  }

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">{t("settings")}</h1>

      {/* 下面所有内容现在保证只在客户端渲染 */}
      <div className="flex justify-between items-center">
        <span>{t("darkMode")}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={dark} onChange={toggleDark} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
        </label>
      </div>

      <div>
        <label className="block mb-1 font-medium">{t("language")}</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-800">
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">{t("fontSize")}</label>
        <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-800">
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">{t("zoomLevel")}</label>
        <select value={zoom} onChange={(e) => setZoom(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-800">
          <option value="90">90%</option>
          <option value="100">100%</option>
          <option value="110">110%</option>
        </select>
      </div>
    </div>
  );
}