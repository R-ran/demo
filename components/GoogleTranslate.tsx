

'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: {
      translate: {
        TranslateElement: new (o: any, e: string) => void
      }
    }
  }
}

/* -------------- 组件：隐藏的原生容器 -------------- */
export default function GoogleTranslate() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr,es,ar,ru,pt,zh-CN,zh-TW,de,it,ja,ko',
          layout: 0,

          // 关键：把两个域名都放进来
  allowedDomains: [
    'xionghong-web.vercel.app',
    'www.cnxhanchor.com'
  ]
        },
        'google_translate_element'
      )

      handleRTL('en')

      // 隐藏原生 UI
      setTimeout(() => {
        const container = document.getElementById('google_translate_element')
        if (container) container.style.display = 'none'
        const banner = document.querySelector('.goog-te-banner-frame') as HTMLElement
        if (banner) banner.style.display = 'none'
      }, 100)
    }

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
      window.googleTranslateElementInit = undefined as any
    }
  }, [])

  return <div id="google_translate_element" style={{ display: 'none' }} />
}

/* -------------- 彻底回到原始英文（推荐方案） -------------- */
export function restoreToEnglish() {
  if (typeof window === 'undefined') return

  // 方法一：最狠最有效的方式 —— 直接改 cookie + reload
  const cookieName = 'googtrans'
  const cookiePath = '; path=/'
  const cookieDomain = location.hostname.startsWith('www.')
    ? '; domain=' + location.hostname
    : '; domain=' + location.hostname.substring(location.hostname.indexOf('.') )

  // 彻底清除三种可能的 googtrans 存储方式
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + cookiePath + cookieDomain
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + cookiePath
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

  // 同时清除 sessionStorage（部分新版 Google 用这个）
  sessionStorage.removeItem('googtrans')
  localStorage.removeItem('googtrans')

  // 再强制把下拉框清空（保险）
  setTimeout(() => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (select) {
      select.value = ''
      select.dispatchEvent(new Event('change', { bubbles: true }))
    }

    // 清除 goog-te-gadget 添加的 class
    document.documentElement.removeAttribute('class')

    // 最后再 reload 一次，确保新页面读不到任何翻译痕迹
    location.reload()
  }, 100)
}

/* -------------- 其它语言切换（保持原逻辑） -------------- */
export function changeLanguage(langCode: string) {
  if (typeof window === 'undefined') return

  const tryChange = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (!select) { setTimeout(tryChange, 100); return }

    select.value = langCode === 'en' ? '' : langCode
    select.dispatchEvent(new Event('change', { bubbles: true }))
    handleRTL(langCode)
  }

  if (window.google?.translate) tryChange()
  else {
    let i = 0
    const t = setInterval(() => {
      if (window.google?.translate || ++i > 50) {
        clearInterval(t)
        tryChange()
      }
    }, 100)
  }
}

/* -------------- RTL 处理 -------------- */
export function handleRTL(langCode: string) {
  document.body.style.direction = langCode === 'ar' ? 'rtl' : 'ltr'
}