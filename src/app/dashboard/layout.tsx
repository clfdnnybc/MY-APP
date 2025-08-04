"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useUsername } from "../UsernameContext";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 侧边栏开关

  const handleLogout = () => {
    setShowLogout(false);
    setTimeout(() => router.push("/login"), 500);
  };

  const { username } = useUsername();

  // 侧边栏与弹窗共用的菜单项
  const menuItems = [
    { label: "Home", href: "/dashboard", icon: "icon-[mynaui--home]" },
    { label: "Account", href: "/dashboard/account", icon: "icon-[mynaui--user]" },
    { label: "Settings", href: "/dashboard/settings", icon: "icon-[mynaui--cog-four]" },
    { label: "Logout", action: () => setShowLogout(true), icon: "icon-[mynaui--logout]" },
  ];

  return (
    <div className="flex h-screen">
      {/* 侧边栏 */}
      <aside
        className={`flex flex-col bg-white dark:bg-gray-800 transition-all duration-300 ${
          sidebarOpen ? "w-56" : "w-0"
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => (item.action ? item.action() : router.push(item.href))}
              title={item.label}
              className="flex items-center w-full px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              {sidebarOpen && <span className={`w-5 h-5 ${item.icon} dark:color-white`} />}
              {sidebarOpen && <span className="ml-3 text-sm text-gray-700 dark:text-gray-200">{item.label}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-100 dark:bg-gray-700 p-6 shadow-md flex items-center">
          {/* 侧边栏开关按钮 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 p-2 rounded hover:bg-blue-200 dark:hover:bg-gray-600"
          >
            <span className={`w-5 h-5 icon-[mynaui--menu] dark:color-white`} />
          </button>

          <div className="ml-auto relative group">
            {/* 头像按钮 */}
            <button className="flex items-center space-x-2 bg-white dark:bg-black p-2 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-200">{username}</span>
              <img src="/avatar.ico" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            </button>

            {/* 透明桥接层 */}
            <div className="absolute top-full left-0 right-0 h-2" />

            {/* 弹窗 */}
            <div
              className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50
                         opacity-0 scale-95 origin-top-right
                         group-hover:opacity-100 group-hover:scale-100
                         transition-all duration-200 ease-out
                         p-4 space-y-3 pointer-events-none group-hover:pointer-events-auto"
            >
              <div className="flex items-center space-x-3">
                <img src="/avatar.ico" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{username}</span>
              </div>

              {/* 弹窗菜单 */}
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => (item.action ? item.action() : router.push(item.href))}
                  className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200"
                >
                  <span className={`w-4 h-4 mr-2 ${item.icon} dark:color-white`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Logout 确认弹窗 */}
        {showLogout && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">Confirm logout</h2>
              <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowLogout(false)} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">No</button>
                <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}