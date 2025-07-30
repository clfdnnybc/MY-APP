"use client";
import  { useState } from "react";
export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(
    {
      username: "",
      password: ""
    }
  )
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function changeOpen(){
    setIsOpen(!isOpen);
    setMessage("");
  }

  function handleChange(e: any){
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  
  }

  async function isError(data: any){
    await new Promise(resolve => setTimeout(resolve, 500));
    if(data.username !== "1" || data.password !== "1") {
      throw new Error("Invalid credentials");
    }
    return true;
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await isError(data);
      setMessage("Successfully signed up")
    } catch (error) {
      setMessage("Invalid username or password");
    }finally{
      setIsSubmitting(false);
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <button 
        onClick={changeOpen}
        className="w-full py-2 bg-blue-500 text-white rounded"

      >
        {isOpen? "Close" : "Sign Up"}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
        <form onSubmit={handleSubmit} className="mt-4" >

          <div className="mb-4">
            <label className="block mb-2 font-medium">Username:
            <input 
              type="text" 
              name="username" 
              value={data.username} 
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required />
              </label>
          </div>

          <div className="mb-4">  
            <label className="block mb-2 font-medium">Password:
            <input 
              type="password" 
              name="password" 
              value={data.password} 
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required />
              </label>
          </div>
          <button 
            className={`w-full px-4 py-2 text-white rounded transition-colors ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>
          {message && <p 
            className={`mt-3 p-2 rounded text-center ${
              message === "Successfully signed up" 
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