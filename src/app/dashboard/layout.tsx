"use client";
import { ReactNode, useState, useEffect } from "react";
import { useUsername } from "../UsernameContext";
import { useTransitionRouter } from 'next-view-transitions'
import { useTranslation } from "react-i18next";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [showLogout, setShowLogout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutPos, setLogoutPos] = useState<{ x: number; y: number } | null>(null);
  const router = useTransitionRouter();
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false); // 新增

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setShowLogout(false);
    setTimeout(() => router.push("/login"), 500);
  };

  const { username } = useUsername();

  const handleLogoutClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setLogoutPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    } else {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setLogoutPos({ x, y });
    }
    setShowLogout(true);
  };

  type MenuItem = 
    | { label: string; href: string; icon: string; action?: undefined }
    | { label: string; icon: string; action: (e: React.MouseEvent) => void; href?: undefined };

  // 只在 mounted 后渲染依赖 t 的内容，避免 hydration mismatch
  if (!mounted) return <div />;

  const menuItems: MenuItem[] = [
    { label: t("dashboard"), href: "/dashboard", icon: "icon-[mynaui--home]" },
    { label: t("account"), href: "/dashboard/account", icon: "icon-[mynaui--user]" },
    { label: t("settings"), href: "/dashboard/settings", icon: "icon-[mynaui--cog-four]" },
    { label: t("logout"), action: handleLogoutClick, icon: "icon-[mynaui--logout]" },
  ];

  const getPopupStyle = () => {
    if (!logoutPos) return {};
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = logoutPos.x - centerX;
    const dy = logoutPos.y - centerY;
    return {
      ["--popup-transform-from" as any]: `scale(0) translate(${dx}px, ${dy}px)`,
      animation: "popup-move-scale 0.4s cubic-bezier(.4,2,.6,1) forwards",
    } as React.CSSProperties;
  };

  return (
    <div className="flex h-screen">
      {/* 侧边栏 */}
      <aside
        className={`flex flex-col bg-white dark:bg-gray-800 transition-all duration-300  ${
          sidebarOpen ? "w-56" : "w-0"
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={
                item.action
                  ? (e) => item.action && item.action(e)
                  : () => item.href && router.push(item.href)
              }
              title={item.label}
              className={`w-full flex items-center px-3 py-2 rounded
                ${item.label === t('logout')
                  ? 'bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900'
                }
                ${!sidebarOpen && 'hidden'}
              `}
            >
              {sidebarOpen && <span className={`w-5 h-5 ${item.icon} dark:color-white`} />}
              {sidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-100 dark:bg-gray-700 p-6 h-16 shadow-md flex items-center">
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
                  onClick={
                    item.action
                      ? (e) => item.action && item.action(e)
                      : () => item.href && router.push(item.href)
                  }
                  className={`w-full flex items-center px-3 py-2 rounded
                    ${item.label === t('logout')
                      ? 'bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900'
                    }`}
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
          <div className="fixed inset-0 bg-black/40 z-50">
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80"
              style={{
                ...getPopupStyle(),
                position: "fixed",
                left: "50%",
                top: "50%",
              }}
              key={logoutPos ? `${logoutPos.x},${logoutPos.y}` : "center"}
            >
              <h2 className="text-lg font-semibold mb-4">{t("confirmLogout")}</h2>
              <p className="text-sm text-gray-600 mb-6">{t("confirmTips")}</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowLogout(false)} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">{t("cancel")}</button>
                <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">{t("confirm")}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}