"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsername } from "../../UsernameContext";
import { useTranslation } from "react-i18next"; // 新增

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
  const { t } = useTranslation(); // 新增

  const closeAllForms = () => {
    setShowUsernameForm(false);
    setShowPasswordForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/account/username", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, storedUsername: username }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setMessage(json.message);
      setUsername(newUsername);
      localStorage.setItem("username", newUsername);
      closeAllForms();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword, storedUsername: username }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setMessage(json.message);
      closeAllForms();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const UpdateButton = ({
    onClick,
    text,
  }: {
    onClick: (e: React.FormEvent) => void | Promise<void>;
    text: string;
  }) => (
    <button
      onClick={onClick}
      type="submit"   
      className={`w-full px-4 py-2 rounded-lg text-white transition-colors
                  ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
      disabled={isSubmitting}
    >
      {text}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">{t("accountSettings")}</h1>

      <div className="mb-6 text-center">
        <img src="/avatar.ico" alt="avatar" className="w-32 h-32 rounded-full mx-auto" />
        <p className="text-gray-700 dark:text-gray-200 text-center mt-2">{username}</p>
      </div>

      {/* Username Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-100">{t("username")}</h2>
          <button
            onClick={() => {
              if (!showUsernameForm) setNewUsername(username);
              setShowUsernameForm(!showUsernameForm);
            }}
            className="px-3 py-1 text-sm rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            {showUsernameForm ? t("cancel") : t("edit")}
          </button>
        </div>

        <div
          className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden
                      ${showUsernameForm ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <form onSubmit={handleUsernameSubmit} className="space-y-2">
            <input
              type="text"
              name="newUsername"
              value={newUsername}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <UpdateButton onClick={handleUsernameSubmit} text={t("updateUsername")} />
          </form>
        </div>

        {!showUsernameForm && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{t("editUsernameTip")}</p>
        )}
      </div>

      {/* Password Section */}
      <div className="space-y-3 mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-100">{t("password")}</h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-3 py-1 text-sm rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            {showPasswordForm ? t("cancel") : t("edit")}
          </button>
        </div>

        <div
          className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden
                      ${showPasswordForm ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-2">
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              placeholder={t("currentPassword")}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder={t("newPassword")}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <UpdateButton onClick={handlePasswordSubmit} text={t("updatePassword")} />
          </form>
        </div>

        {!showPasswordForm && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{t("editPasswordTip")}</p>
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