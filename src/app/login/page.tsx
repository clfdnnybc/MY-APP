"use client";
import  { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "">("");
  const [data, setData] = useState(
    {
      username: "",
      password: "",
      confirmPassword: "",
    }
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function changeOpen(m: "login" | "signup"){
    if(mode === m ){
      setIsOpen(!isOpen);
    }
    else{
      setIsOpen(true);
    }
    setMode(m);
    setMessage("");
  }

  function handleChange(e: any){
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 bg-opacity-80 flex items-center justify-center p-4">
    
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex space-x-2">
        <button
          onClick={() => changeOpen("login")}
          className={`flex-1 py-2 text-white rounded ${mode === "login" && isOpen ? "bg-gray-500" : "bg-blue-500"}`}
        >
          Login
        </button>
        <button
          onClick={() => changeOpen("signup")}
          className={`flex-1 py-2 text-white rounded ${mode === "signup" && isOpen ? "bg-gray-500" : "bg-blue-500"}`}
        >
          Sign Up
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
        <form onSubmit={handleSubmit} className="mt-4" >
          {/*username*/}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Username:
            <input 
              type="text" 
              name="username" 
              value={data.username} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required />
              </label>
          </div>
          {/*password*/}
          <div className="mb-4">  
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Password:
            <input 
              type="password" 
              name="password" 
              value={data.password} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required />
              </label>
          </div>
          {/*confirfm password*/}
          
          <div
            className={`transition-all duration-300 ease-in-out
              ${mode === "signup" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              overflow-hidden mb-4`}
              >
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required={mode === "signup"} 
              disabled={mode !== "signup"} 
              />
          </div>
          
          {/*submit button*/}
          <button 
            className={`w-full px-4 py-2 text-white rounded transition-colors ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : mode === "login" ? "Login" : "Create Account"}
          </button>
          {message && <p 
            className={`mt-3 p-2 rounded text-center ${
              message.includes("success") || message.includes("Registered")
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>}
          
        </form>
      </div>
    </div>
    </div>
  );
}