'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: {
      translate: {
        TranslateElement: new (options: any, elementId: string) => void
      }
    }
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // 只在浏览器注入脚本
    const s = document.createElement('script')
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    s.async = true
    document.body.appendChild(s)

    // 初始化函数
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,fr,es,ar,ru,pt', layout: 0 },
        'google_translate_element'
      )
      
      // 隐藏 Google Translate 的默认 UI
      setTimeout(() => {
        const select = document.querySelector('.goog-te-combo')
        if (select) {
          const container = select.closest('#google_translate_element')
          if (container) {
            ;(container as HTMLElement).style.display = 'none'
          }
        }
        // 也隐藏可能出现的其他 Google Translate UI 元素
        const googTeBanner = document.querySelector('.goog-te-banner-frame')
        if (googTeBanner) {
          ;(googTeBanner as HTMLElement).style.display = 'none'
        }
        const googTeGadget = document.querySelector('.goog-te-gadget')
        if (googTeGadget) {
          ;(googTeGadget as HTMLElement).style.display = 'none'
        }
      }, 100)
    }

    return () => {
      if (document.body.contains(s)) {
        document.body.removeChild(s)
      }
      window.googleTranslateElementInit = undefined as any
    }
  }, [])

  // 返回隐藏的容器，用于 Google Translate 初始化
  return <div id="google_translate_element" style={{ display: 'none' }} />
}

// 导出切换语言的函数
export function changeLanguage(langCode: string) {
  if (typeof window !== 'undefined') {
    // 等待 Google Translate 加载完成
    const tryChangeLanguage = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select) {
        // Google Translate 使用特定的语言代码格式
        // 对于英语，使用空字符串
        const langValue = langCode === 'en' ? '' : langCode
        select.value = langValue
        // 触发 change 事件
        const event = new Event('change', { bubbles: true })
        select.dispatchEvent(event)
        // 也尝试直接调用 Google Translate 的 API
        if (window.google?.translate?.TranslateElement) {
          // 重新初始化以切换语言
          try {
            select.dispatchEvent(new Event('change'))
          } catch (e) {
            console.log('Language change triggered')
          }
        }
      } else {
        // 如果还没加载，等待一下再试（最多等待5秒）
        setTimeout(tryChangeLanguage, 100)
      }
    }
    
    // 如果 Google Translate 已经加载
    if (window.google?.translate) {
      tryChangeLanguage()
    } else {
      // 等待 Google Translate 初始化
      let attempts = 0
      const maxAttempts = 50 // 最多尝试5秒
      const checkInterval = setInterval(() => {
        attempts++
        if (window.google?.translate || attempts >= maxAttempts) {
          clearInterval(checkInterval)
          if (window.google?.translate) {
            tryChangeLanguage()
          }
        }
      }, 100)
    }
  }
}