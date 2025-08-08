"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUsername } from "../UsernameContext";
import { useTranslation } from "react-i18next"; // 新增

export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "">("");
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const router = useRouter();
  const { setUsername, setAvatar } = useUsername();
  

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  // 语言切换


  function changeOpen(m: "login" | "signup") {
    if (mode === m) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
    }
    setMode(m);
    setMessage("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (mode === "signup" && data.password !== data.confirmPassword) {
      setMessage(t("passwordNotMatch") || "Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          mode,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setMessage(json.message);
      if (mode === "login") {
        localStorage.setItem("username", data.username);
        localStorage.setItem('avatar', json.avatar);
        setUsername(data.username);
        setAvatar(json.avatar);
        setTimeout(() => router.push("/dashboard"), 300);
      } else {
        setMode("login");
        setData({ username: "", password: "", confirmPassword: "" });
      }
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      {/* 炫酷多层渐变背景 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* 主渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-indigo-200 to-pink-200 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500" />
        {/* 彩色模糊光斑 */}
        <div className="absolute left-1/4 top-1/4 w-72 h-72 bg-pink-400 opacity-30 rounded-full blur-3xl dark:bg-pink-700" />
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-sky-400 opacity-30 rounded-full blur-3xl dark:bg-sky-700" />
        <div className="absolute left-1/2 top-2/3 w-60 h-60 bg-indigo-400 opacity-20 rounded-full blur-2xl dark:bg-indigo-700" />
        <div className="absolute animate-pulse left-1/3 top-1/2 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl dark:bg-yellow-700" /> 
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full border-8 border-sky-400/20 dark:border-sky-600/20"
      />

      {/* 标题和语言切换 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 sm:text-3xl">
          {t("myDashboard")}
        </h1>
      </div>
      {/* 右上角透明语言切换 */}
      <div className="absolute top-4 right-4 z-20">
        <select
          value={lang}
          onChange={(e) => {
            const lng = e.target.value;
            i18n.changeLanguage(lng);
            localStorage.setItem("i18nextLng", lng); // 保持持久化
          }}
          className="
            bg-white/50  backdrop-blur-sm
            border border-white/20
            rounded px-2 py-1 text-xs
            text-black
            dark:bg-gray-900/20 dark:border-white/30
            dark:text-white
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        >
          <option value="en">English</option>
          <option value="zh">简体中文</option>
        </select>
      </div>
      {/* 原卡片 */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex space-x-2">
          <button
            onClick={() => changeOpen("login")}
            className={`flex-1 rounded py-2 text-white ${
              mode === "login" && isOpen ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            {t("login")}
          </button>
          <button
            onClick={() => changeOpen("signup")}
            className={`flex-1 rounded py-2 text-white ${
              mode === "signup" && isOpen ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            {t("signup")}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <form onSubmit={handleSubmit} className="mt-4">
            {/* Username */}
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
                {t("username")}:
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
                {t("password")}:
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            {/* Confirm Password */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                mode === "signup"
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden mb-4`}
            >
              <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                {t("confirmPassword")}:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                required={mode === "signup"}
                disabled={mode !== "signup"}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded px-4 py-2 text-white transition-colors ${
                isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting
                ? t("processing")
                : mode === "login"
                ? t("login")
                : t("createAccount")}
            </button>

            {message && (
              <p
                className={`mt-3 rounded p-2 text-center ${
                  message.includes("success") ||
                  message.includes("Registered")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}