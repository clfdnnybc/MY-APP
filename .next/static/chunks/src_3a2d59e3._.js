(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/UsernameContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/contexts/UsernameContext.tsx  （路径可保持原样）
__turbopack_context__.s({
    "UsernameProvider": ()=>UsernameProvider,
    "useUsername": ()=>useUsername
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const UsernameContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    username: "Admin",
    setUsername: ()=>{},
    avatar: "/avatar.ico",
    setAvatar: ()=>{},
    dark: false,
    toggleDark: ()=>{},
    font: "16",
    setFont: ()=>{},
    zoom: "100",
    setZoom: ()=>{}
});
const useUsername = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(UsernameContext);
};
_s(useUsername, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const UsernameProvider = (param)=>{
    let { children } = param;
    _s1();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Admin");
    const [avatar, setAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("/avatar.ico");
    const [dark, setDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [font, setFont] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("16");
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("100");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsernameProvider.useEffect": ()=>{
            /* 从 localStorage 读取 */ setUsername(localStorage.getItem("username") || "Admin");
            setAvatar(localStorage.getItem("avatar") || "/avatar.ico");
            setDark(localStorage.getItem("dark") === "true");
            setFont(localStorage.getItem("font") || "16");
            setZoom(localStorage.getItem("zoom") || "100");
            document.documentElement.classList.toggle("dark", localStorage.getItem("dark") === "true");
        }
    }["UsernameProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsernameProvider.useEffect": ()=>{
            /* 写入 localStorage */ localStorage.setItem("username", username);
            localStorage.setItem("avatar", avatar);
            localStorage.setItem("dark", String(dark));
            localStorage.setItem("font", font);
            localStorage.setItem("zoom", zoom);
        }
    }["UsernameProvider.useEffect"], [
        username,
        avatar,
        dark,
        font,
        zoom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsernameProvider.useEffect": ()=>{
            document.documentElement.classList.toggle("dark", dark);
            document.documentElement.style.setProperty("--user-font", "".concat(font, "px"));
            document.documentElement.style.setProperty("--user-zoom", "".concat(zoom, "%"));
        }
    }["UsernameProvider.useEffect"], [
        dark,
        font,
        zoom
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsernameContext.Provider, {
        value: {
            username,
            setUsername,
            avatar,
            setAvatar,
            dark,
            toggleDark: ()=>setDark((d)=>!d),
            font,
            setFont,
            zoom,
            setZoom
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/UsernameContext.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(UsernameProvider, "tJTQ+EZYCW6PkEd7nOPZq4R9Ubw=");
_c = UsernameProvider;
var _c;
__turbopack_context__.k.register(_c, "UsernameProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/locales/en.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"account\":\"Account\",\"accountSettings\":\"Account Settings\",\"addNews\":\"Add News\",\"avatar\":\"Avatar\",\"cancel\":\"Cancel\",\"confirm\":\"Confirm\",\"confirmLogout\":\"Confirm Logout\",\"confirmPassword\":\"Confirm Password\",\"confirmTips\":\"Are you sure you want to log out?\",\"content\":\"Content\",\"createAccount\":\"Create Account\",\"createFirstNews\":\"Create your first news\",\"currentPassword\":\"Current Password\",\"dashboard\":\"Home\",\"darkMode\":\"Dark Mode\",\"date\":\"Date\",\"delete\":\"Delete\",\"edit\":\"Edit\",\"editAvatarTip\":\"Click \\\"Edit\\\" to change your avatar.\",\"editNews\":\"Edit News\",\"editPasswordTip\":\"Click \\\"Edit\\\" to change your password.\",\"editUsernameTip\":\"Click \\\"Edit\\\" to change your username.\",\"fetchError\":\"Failed to load data\",\"fontSize\":\"Font Size\",\"language\":\"Language\",\"latestNews\":\"Latest News\",\"loading\":\"Loading...\",\"login\":\"Login\",\"logout\":\"Logout\",\"myDashboard\":\"My Dashboard\",\"newPassword\":\"New Password\",\"newsManagement\":\"News Management\",\"noNews\":\"No news yet\",\"noNewsDescription\":\"Start by creating your first piece of news.\",\"noNewsTitle\":\"No news available\",\"notFound\":\"News not found\",\"password\":\"Password\",\"passwordNotMatch\":\"Passwords do not match\",\"processing\":\"Processing...\",\"published\":\"Published\",\"retry\":\"Retry\",\"save\":\"Save\",\"saveError\":\"Failed to save\",\"saving\":\"Saving...\",\"settings\":\"Settings\",\"signup\":\"Sign Up\",\"status\":\"Status\",\"title\":\"Title\",\"updateAvatar\":\"Update Avatar\",\"updatePassword\":\"Update Password\",\"updateUsername\":\"Update Username\",\"username\":\"Username\",\"view\":\"View\",\"zoomLevel\":\"Zoom Level\"}"));}),
"[project]/src/locales/zh.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"account\":\"账户\",\"accountSettings\":\"账户设置\",\"addNews\":\"添加新闻\",\"avatar\":\"头像\",\"cancel\":\"取消\",\"confirm\":\"确定\",\"confirmLogout\":\"确认退出登录\",\"confirmPassword\":\"确认密码\",\"confirmTips\":\"你确定要退出登录吗？\",\"content\":\"内容\",\"createAccount\":\"创建账户\",\"createFirstNews\":\"创建你的第一条新闻\",\"currentPassword\":\"当前密码\",\"dashboard\":\"主页\",\"darkMode\":\"深色模式\",\"date\":\"日期\",\"delete\":\"删除\",\"edit\":\"编辑\",\"editAvatarTip\":\"点击“编辑”修改头像。\",\"editNews\":\"编辑新闻\",\"editPasswordTip\":\"点击“编辑”修改密码。\",\"editUsernameTip\":\"点击“编辑”修改用户名。\",\"fetchError\":\"加载失败\",\"fontSize\":\"字体大小\",\"language\":\"语言\",\"latestNews\":\"最新新闻\",\"loading\":\"加载中...\",\"login\":\"登录\",\"logout\":\"退出登录\",\"myDashboard\":\"我的仪表盘\",\"newPassword\":\"新密码\",\"newsManagement\":\"新闻管理\",\"noNews\":\"暂无新闻\",\"noNewsDescription\":\"开始创建你的第一条新闻吧。\",\"noNewsTitle\":\"暂无新闻\",\"notFound\":\"新闻不存在\",\"password\":\"密码\",\"passwordNotMatch\":\"两次密码输入不一致\",\"processing\":\"处理中...\",\"published\":\"已发布\",\"retry\":\"重试\",\"save\":\"保存\",\"saveError\":\"保存失败\",\"saving\":\"保存中...\",\"settings\":\"设置\",\"signup\":\"注册\",\"status\":\"状态\",\"title\":\"标题\",\"updateAvatar\":\"更新头像\",\"updatePassword\":\"更新密码\",\"updateUsername\":\"更新用户名\",\"username\":\"用户名\",\"view\":\"查看\",\"zoomLevel\":\"缩放比例\"}"));}),
"[project]/src/i18n.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$zh$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/zh.json (json)");
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]) // 加上这一行
.use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
    resources: {
        en: {
            translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__["default"]
        },
        zh: {
            translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$zh$2e$json__$28$json$29$__["default"]
        }
    },
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    detection: {
        // 优先级：localStorage > navigator > html lang
        order: [
            "localStorage",
            "navigator",
            "htmlTag"
        ],
        caches: [
            "localStorage"
        ]
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>RootLayout
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$UsernameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/UsernameContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function RootLayout(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        translate: "no",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: "flex flex-col min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$UsernameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UsernameProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_3a2d59e3._.js.map