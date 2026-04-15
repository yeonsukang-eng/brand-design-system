"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Layers, Sun, Moon, Globe, ChevronDown, Check, Plus } from "lucide-react";
import { useBrandStore } from "@/store/brand-store";

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
  const t = <T,>(ko: T, en: T): T => (locale === "en" ? en : ko);

  const brands = useBrandStore((s) => s.brands);
  const activeBrandId = useBrandStore((s) => s.activeBrandId);
  const setActiveBrand = useBrandStore((s) => s.setActiveBrand);
  const createBrand = useBrandStore((s) => s.createBrand);
  const activeBrand = brands.find((b) => b.id === activeBrandId);

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleAdd = () => {
    const name = window.prompt(t("새 브랜드 이름을 입력하세요", "Enter new brand name"));
    if (!name?.trim()) return;
    createBrand(name.trim(), "");
    setOpen(false);
    onViewChange("system");
  };

  const renderBrandLabel = (name: string) => {
    if (name.toLowerCase() === "axflow") {
      return (
        <>
          <img src="/logo-black.svg" alt="axflow" className="h-4 dark:hidden" />
          <img src="/logo-white.svg" alt="axflow" className="h-4 hidden dark:block" />
        </>
      );
    }
    if (name.toLowerCase() === "spire") {
      return <img src="/spire-logo.svg" alt="spire" className="h-4" />;
    }
    return <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{name}</span>;
  };

  return (
    <div className="w-56 border-r border-zinc-200 bg-zinc-50 flex flex-col dark:border-zinc-800 dark:bg-zinc-950">
      {/* Brand Switcher */}
      <div className="px-3 pt-4 pb-4 relative" ref={wrapRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-between w-full px-2 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="flex items-center min-w-0">
            {activeBrand ? renderBrandLabel(activeBrand.name) : (
              <span className="text-sm text-zinc-500">{t("브랜드 선택", "Select brand")}</span>
            )}
          </span>
          <ChevronDown size={14} className={`text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute left-3 right-3 top-full mt-1 z-20 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900 py-1">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setActiveBrand(b.id);
                  setOpen(false);
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="truncate text-zinc-900 dark:text-zinc-100">{b.name}</span>
                {b.id === activeBrandId && <Check size={14} className="text-zinc-500 shrink-0" />}
              </button>
            ))}
            <div className="my-1 border-t border-zinc-200 dark:border-zinc-800" />
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Plus size={14} />
              {t("새 브랜드 추가", "Add brand")}
            </button>
          </div>
        )}
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
          {t("디자인 가이드", "Design Guide")}
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
          {t("디자인 시스템", "Design System")}
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
            {locale === "ko" ? "한국어" : "English"}
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
            {dark ? t("다크 모드", "Dark") : t("라이트 모드", "Light")}
          </span>
          <div className={`w-8 h-[18px] rounded-full relative transition-colors ${dark ? "bg-zinc-600" : "bg-zinc-300"}`}>
            <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${dark ? "left-[16px]" : "left-[2px]"}`} />
          </div>
        </button>
      </div>
    </div>
  );
}
