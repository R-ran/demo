"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (o: any, e: string) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,ar,ru,pt,zh-CN,zh-TW,de,it,ja,ko",
          layout: 0,
        },
        "google_translate_element"
      );

      handleRTL("en");

      // 隐藏原生 UI
      setTimeout(() => {
        const container = document.getElementById("google_translate_element");
        if (container) container.style.display = "none";
        const banner = document.querySelector(".goog-te-banner-frame") as HTMLElement;
        if (banner) banner.style.display = "none";
      }, 100);
    };

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      window.googleTranslateElementInit = undefined as any;
    };
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}

// 彻底回到英文的方法（清除 cookie）
export function restoreToEnglish() {
  if (typeof window === "undefined") return;

    // 清除所有与翻译相关的存储
    const cookieName = "googtrans";
    const cookiePath = "; path=/";
    const cookieDomain = "; domain=" + location.hostname
    const cookieDomain2 = "; domain=" + location.hostname.substring(location.hostname.indexOf("."));
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + cookiePath + cookieDomain;
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + cookiePath + cookieDomain2;
    // document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + cookiePath;
    // document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  
    sessionStorage.removeItem("googtrans");
    localStorage.removeItem("googtrans");
  
    // 清空下拉框
    setTimeout(() => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        select.value = "";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
  
      // 清除 goog-te-gadget 添加的 class
      document.documentElement.removeAttribute("class");
  
      // 最后 reload 一次
      location.reload();
    }, 100);
  }

// 切换语言
export function changeLanguage(langCode: string) {
  if (typeof window === "undefined") return;

  const tryChange = () => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (!select) {
      setTimeout(tryChange, 100);
      return;
    }

    select.value = langCode === "en" ? "" : langCode;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    handleRTL(langCode);
  };

  if (window.google?.translate) tryChange();
  else {
    let i = 0;
    const t = setInterval(() => {
      if (window.google?.translate || ++i > 50) {
        clearInterval(t);
        tryChange();
      }
    }, 100);
  }
}

// RTL 处理
export function handleRTL(langCode: string) {
  document.body.style.direction = langCode === "ar" ? "rtl" : "ltr";
}