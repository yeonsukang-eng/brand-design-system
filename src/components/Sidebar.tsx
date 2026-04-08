"use client";

import { BookOpen, Layers } from "lucide-react";

type View = "guide" | "system";

export default function Sidebar({ activeView, onViewChange }: { activeView: View; onViewChange: (v: View) => void }) {
  return (
    <div className="w-56 border-r border-zinc-200 bg-zinc-50 flex flex-col dark:border-zinc-800 dark:bg-zinc-950">
      {/* Logo */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center dark:bg-zinc-100">
            <span className="text-white text-sm font-bold dark:text-zinc-900" style={{ fontFamily: "Outfit, sans-serif" }}>ax</span>
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>ax flow</span>
        </div>
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
    </div>
  );
}
