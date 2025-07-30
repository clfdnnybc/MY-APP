"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const router = useRouter();
    const [showLogout, setShowLogout] = useState(false);
    const handleLogout = () => {
        setShowLogout(false);
        setTimeout(() => {
          router.push("/signin");
        }, 500);
        
    };

  return (
    <div className="flex flex-col h-screen">
        <header className="bg-blue-100 p-6 shadow-md flex items-center">
            <div className="ml-auto relative group">
                {/* 触发按钮 */}
                <button className="flex items-center space-x-2 bg-white p-2 rounded-lg">
                    <span className="text-sm text-gray-600">Admin</span>
                    <img src="/avatar.ico" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                </button>

                {/* 弹出卡片 */}
                <div
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl
                            invisible scale-0 origin-top-right
                            group-hover:visible group-hover:scale-100
                            transform transition-all duration-200 ease-out
                            p-4 space-y-3"
                >
                    {/* 头像 + Admin */}
                    <div className="flex items-center space-x-3">
                    <img src="/avatar.ico" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-medium text-gray-800">Admin</span>
                    </div>

                    {/* 菜单列表 */}
                    
                    <div className="flex flex-col space-y-1 text-sm">
                    {/* Account */}
                    <a href="/account" className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
                        <img src="/account.svg" alt="" className="w-4 h-4 mr-2" />
                        Account
                    </a>

                    {/* Settings */}
                    <a href="/settings" className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
                        <img src="/settings.svg" alt="" className="w-4 h-4 mr-2" />
                        Settings
                    </a>

                    {/* Log out */}
                    <button
                        onClick={() => setShowLogout(true)}
                        className="w-full flex items-center px-3 py-2 rounded text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        <img src="/logout.svg" alt="" className="w-4 h-4 mr-2" />
                        Log out
                    </button>
                </div>
            </div>
        </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}