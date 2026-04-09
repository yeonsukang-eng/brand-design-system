"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import BrandEditor from "@/components/BrandEditor";
import DesignGuide from "@/components/DesignGuide";

export default function Home() {
  const [view, setView] = useState<"guide" | "system">("system");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("axflow-dark-mode");
    if (saved === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("axflow-dark-mode", String(next));
      return next;
    });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar activeView={view} onViewChange={setView} dark={dark} onToggleDark={toggleDark} />
      {view === "system" ? (
        <BrandEditor />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="max-w-4xl mx-auto w-full px-8 pt-8 pb-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">ax flow</h1>
              <p className="text-sm text-zinc-500 mt-1">Brand Guide</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-8 pb-8">
              <DesignGuide />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
