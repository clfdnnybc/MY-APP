(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/UsernameContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
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
    const [dark, setDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [font, setFont] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("16");
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("100");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsernameProvider.useEffect": ()=>{
            // 从 localStorage 读取设置
            const storedDark = localStorage.getItem("dark") === "true";
            setUsername(localStorage.getItem("username") || "Admin");
            setDark(storedDark);
            setFont(localStorage.getItem("font") || "16");
            setZoom(localStorage.getItem("zoom") || "100");
            // 立即应用暗模式类名
            document.documentElement.classList.toggle("dark", storedDark);
        }
    }["UsernameProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsernameProvider.useEffect": ()=>{
            localStorage.setItem("username", username);
            localStorage.setItem("dark", String(dark));
            localStorage.setItem("font", font);
            localStorage.setItem("zoom", zoom);
        }
    }["UsernameProvider.useEffect"], [
        username,
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
        lineNumber: 61,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(UsernameProvider, "HUiqlpH44mZ3wcx7fHdBfjUvhr4=");
_c = UsernameProvider;
var _c;
__turbopack_context__.k.register(_c, "UsernameProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/locales/en.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"dashboard\":\"Home\",\"logout\":\"Logout\",\"settings\":\"Settings\",\"account\":\"Account\",\"confirmTips\":\"Are you sure you want to log out?\",\"confirmLogout\":\"Confirm Logout\",\"cancel\":\"Cancel\",\"confirm\":\"Yes\",\"login\":\"Login\",\"signup\":\"Sign Up\",\"username\":\"Username\",\"password\":\"Password\",\"passwordNotMatch\":\"Passwords do not match\",\"confirmPassword\":\"Confirm Password\",\"processing\":\"Processing...\",\"createAccount\":\"Create Account\",\"myDashboard\":\"My Dashboard\",\"darkMode\":\"Dark Mode\",\"language\":\"Language\",\"fontSize\":\"Font Size\",\"zoomLevel\":\"Zoom Level\",\"accountSettings\":\"Account Settings\",\"edit\":\"Edit\",\"updateUsername\":\"Update Username\",\"updatePassword\":\"Update Password\",\"currentPassword\":\"Current Password\",\"newPassword\":\"New Password\",\"editUsernameTip\":\"Click \\\"Edit\\\" to change your username.\",\"editPasswordTip\":\"Click \\\"Edit\\\" to change your password.\",\"newsManagement\":\"News Management\"}"));}),
"[project]/src/locales/zh.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"dashboard\":\"主页\",\"logout\":\"退出登录\",\"settings\":\"设置\",\"account\":\"账户\",\"confirmTips\":\"你确定要退出登录吗？\",\"confirmLogout\":\"确认退出登录\",\"cancel\":\"取消\",\"confirm\":\"确定\",\"login\":\"登录\",\"signup\":\"注册\",\"username\":\"用户名\",\"password\":\"密码\",\"passwordNotMatch\":\"两次密码输入不一致\",\"confirmPassword\":\"确认密码\",\"processing\":\"处理中...\",\"createAccount\":\"创建账户\",\"myDashboard\":\"我的仪表盘\",\"darkMode\":\"深色模式\",\"language\":\"语言\",\"fontSize\":\"字体大小\",\"zoomLevel\":\"缩放比例\",\"accountSettings\":\"账户设置\",\"edit\":\"编辑\",\"updateUsername\":\"更新用户名\",\"updatePassword\":\"更新密码\",\"currentPassword\":\"当前密码\",\"newPassword\":\"新密码\",\"editUsernameTip\":\"点击“编辑”修改用户名。\",\"editPasswordTip\":\"点击“编辑”修改密码。\",\"newsManagement\":\"新闻管理\"}"));}),
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