'use client';

import { useEffect } from 'react';

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
    // Only load the Google Translate script if it's not English
    if (localStorage.getItem('lang') !== 'en') {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,ar,ru,pt',
            layout: 0,
          },
          'google_translate_element'
        );

        handleRTL('en');

        // Hide default Google Translate UI
        setTimeout(() => {
          const container = document.getElementById('google_translate_element');
          if (container) container.style.display = 'none';
          const banner = document.querySelector('.goog-te-banner-frame') as HTMLElement;
          if (banner) banner.style.display = 'none';
        }, 100);
      };

      return () => {
        if (document.body.contains(script)) document.body.removeChild(script);
        window.googleTranslateElementInit = undefined as any;
      };
    }
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }} />;
}

// Method to restore to English (clear cookie and storage)
export function restoreToEnglish() {
  if (typeof window === 'undefined') return;

  // Clear all translation-related storage
  const cookieName = 'googtrans';
  const cookiePath = '; path=/';
  const cookieDomain = location.hostname.startsWith('www.')
    ? '; domain=' + location.hostname
    : '; domain=' + location.hostname.substring(location.hostname.indexOf('.'));

  // Clear all googtrans cookies
  document.cookie =
    cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + cookiePath + cookieDomain;
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + cookiePath;
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  // Clear storage
  sessionStorage.removeItem('googtrans');
  localStorage.removeItem('googtrans');

  // Clear the dropdown
  setTimeout(() => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = '';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Remove goog-te-gadget class
    document.documentElement.removeAttribute('class');

    // Finally, reload
    location.reload();
  }, 100);
}

// Change Language Method
export function changeLanguage(langCode: string) {
  if (typeof window === 'undefined') return;

  const tryChange = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (!select) {
      setTimeout(tryChange, 100);
      return;
    }

    // Clear `googtrans` cookie when selecting English and refresh the page
    if (langCode === 'en') {
      // Clear `googtrans` cookie
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // Clear google translate cache

      // Force reload to show English content
      localStorage.setItem('lang', 'en');
      window.location.reload();
    }

    select.value = langCode === 'en' ? '' : langCode;
    select.dispatchEvent(new Event('change', { bubbles: true }));
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

// RTL handling
export function handleRTL(langCode: string) {
  document.body.style.direction = langCode === 'ar' ? 'rtl' : 'ltr';
}
