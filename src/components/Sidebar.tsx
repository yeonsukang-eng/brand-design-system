"use client";

import { BookOpen, Layers, Sun, Moon, Globe } from "lucide-react";

type View = "guide" | "system";

export default function Sidebar({
  activeView,
  onViewChange,
  dark,
  onToggleDark,
  locale,
  onToggleLocale,
}: {
  activeView: View;
  onViewChange: (v: View) => void;
  dark: boolean;
  onToggleDark: () => void;
  locale: "ko" | "en";
  onToggleLocale: () => void;
}) {
  return (
    <div className="w-56 border-r border-zinc-200 bg-zinc-50 flex flex-col dark:border-zinc-800 dark:bg-zinc-950">
      {/* Logo */}
      <div className="px-5 pt-5 pb-6">
        <img src="/logo-black.svg" alt="axflow" className="h-4 dark:hidden" />
        <img src="/logo-white.svg" alt="axflow" className="h-4 hidden dark:block" />
      </div>

      {/* Navigation */}
      <div className="px-3 pb-3 flex flex-col gap-1">
        <button
          onClick={() => onViewChange("guide")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
            activeView === "guide"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          <BookOpen size={18} />
          Design Guide
        </button>
        <button
          onClick={() => onViewChange("system")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
            activeView === "system"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          <Layers size={18} />
          Design System
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Locale Toggle + Dark Mode Toggle */}
      <div className="px-3 pb-4 flex flex-col gap-1">
        <button
          onClick={onToggleLocale}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe size={16} />
            {locale === "ko" ? "KO" : "EN"}
          </span>
          <div className={`w-8 h-[18px] rounded-full relative transition-colors ${locale === "en" ? "bg-zinc-600" : "bg-zinc-300"}`}>
            <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${locale === "en" ? "left-[16px]" : "left-[2px]"}`} />
          </div>
        </button>
        <button
          onClick={onToggleDark}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            {dark ? <Moon size={16} /> : <Sun size={16} />}
            {dark ? "Dark" : "Light"}
          </span>
          <div className={`w-8 h-[18px] rounded-full relative transition-colors ${dark ? "bg-zinc-600" : "bg-zinc-300"}`}>
            <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${dark ? "left-[16px]" : "left-[2px]"}`} />
          </div>
        </button>
      </div>
    </div>
  );
}
