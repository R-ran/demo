"use client";

import { useState, useEffect, useRef } from "react";
import { Facebook, Linkedin, ChevronDown, Globe } from "lucide-react";
import { handleRTL, restoreToEnglish, changeLanguage } from "@/components/GoogleTranslate"; // 确保路径正确
import Image from "next/image";

export function TopHeader() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  ];

  return (
    <div className="bg-background border-b">
      {/* Top utility bar */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-10 sm:h-12 text-xs sm:text-sm">
            {/* Email */}
            <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
              <span className="hidden sm:inline">Email:</span>
              <a
                href="mailto:export@cnxhanchor.com"
                className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none"
              >
                <span className="hidden sm:inline">export@cnxhanchor.com</span>
                <span className="sm:hidden text-[10px]">Email</span>
              </a>
            </div>

            {/* Language / Social */}
            <div className="flex items-center gap-1 sm:gap-4">
              {/* Language switcher */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  aria-label="Select language"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Language</span>
                  <span className="sm:hidden">Lang</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Language dropdown */}
                {isLanguageOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg z-50 min-w-[180px] max-h-[300px] overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          if (lang.code === 'en') {
                            restoreToEnglish(); // Special handling for English
                          } else {
                            changeLanguage(lang.code); // Other languages use the original logic
                            handleRTL(lang.code);
                          }
                          setIsLanguageOpen(false); // Close the language dropdown after selection
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{lang.nativeName}</span>
                          <span className="text-xs text-muted-foreground">{lang.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and tagline section */}
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between py-3 sm:py-6">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-shrink-0">
              <Image
                src="/xinhong logo.png"
                alt="XINHONG"
                width={256}
                height={128}
                className="w-auto h-12 sm:h-16 md:h-20 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">
                XINHONG
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Hollow Anchor Bolts</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="hidden md:block text-center">
            <p
              className="text-2xl md:text-3xl text-primary"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              Authentic Quality
            </p>
            <p
              className="text-2xl md:text-3xl text-foreground"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              Consistent Stability
            </p>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://www.facebook.com/people/Xinhong-Hollow-Anchor-Bolt-China-Factory/61584574700620/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/wuxi-oriental-xinhong-hollow-anchor-bolt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
