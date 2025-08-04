"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      setMessage("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/auth", {
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
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        setMode("login");
        setData({ username: "", password: "", confirmPassword: "" });
      }
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* 背景装饰：渐变+圆环 */}
      <div
        aria-hidden="true"
        className="decoration-bg pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full border-8 border-sky-400/20 dark:border-sky-600/20"
      />

      {/* 标题 */}
      <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-800 dark:text-gray-100 sm:text-3xl">
        My Dashboard
      </h1>

      {/* 原卡片 */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex space-x-2">
          <button
            onClick={() => changeOpen("login")}
            className={`flex-1 rounded py-2 text-white ${
              mode === "login" && isOpen ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => changeOpen("signup")}
            className={`flex-1 rounded py-2 text-white ${
              mode === "signup" && isOpen ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            Sign Up
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
                Username:
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
                Password:
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
                Confirm Password:
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
                ? "Processing..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
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