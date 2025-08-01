"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsername } from "../../UsernameContext";

export default function AccountPage() {
  const { username, setUsername } = useUsername();
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

 

  // Helper function to close both forms
  const closeAllForms = () => {
    setShowUsernameForm(false);
    setShowPasswordForm(false);
  };

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "newUsername":
        setNewUsername(value);
        break;
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      default:
        break;
    }
  };

  // Handle username update submission
  const handleUsernameSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage("");

  try {
    const res = await fetch("/api/account/username", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        storedUsername: username, // 发送当前用户名
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);

    setMessage(json.message);
    // Update the local username state and localStorage
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    closeAllForms(); // Close all forms after successful update
    } catch (err:any) {
    setMessage(err.message);
    } finally {
    setIsSubmitting(false);
    }
    };

    // Handle password update submission
    const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
        const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            oldPassword,
            newPassword,
            storedUsername: username, // 发送当前用户名
        }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        setMessage(json.message);
        closeAllForms(); // Close all forms after successful update
    } catch (err:any) {
        setMessage(err.message);
    } finally {
        setIsSubmitting(false);
    }
    };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Account Settings</h1>

      <div className="mb-6 text-center">
        <img src="/avatar.ico" alt="avatar" className="w-32 h-32 rounded-full mx-auto" />
        <p className="text-gray-700 dark:text-gray-200 text-center mt-2">{username}</p>
      </div>

      {/* Username Update Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-100">Username</h2>
          <button
            onClick={() => {
              setShowUsernameForm(!showUsernameForm);
              if (!showUsernameForm) setNewUsername(username); 
            }}
            className="text-blue-500 font-medium hover:underline"
          >
            {showUsernameForm ? "Cancel" : "Edit"}
          </button>
        </div>

        {showUsernameForm ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-2">
            <input
              type="text"
              name="newUsername"
              value={newUsername}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              className={`px-6 py-2 rounded-lg ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white w-full`}
              type="submit"
              disabled={isSubmitting}
              onClick={() => localStorage.setItem("username", newUsername)} // Update localStorage on submit
            >
              {isSubmitting ? "Processing..." : "Update Username"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Click "Edit" to change your username.</p>
        )}
      </div>

      {/* Password Update Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-100">Password</h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-blue-500 font-medium hover:underline"
          >
            {showPasswordForm ? "Cancel" : "Edit"}
          </button>
        </div>

        {showPasswordForm ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-2">
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Current Password"
            />
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="New Password"
            />
            <button
              className={`px-6 py-2 rounded-lg ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white w-full`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Update Password"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Click "Edit" to change your password.</p>
        )}
      </div>

      {message && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-100 rounded-lg text-blue-800">
          {message}
        </div>
      )}
    </div>
  );
}