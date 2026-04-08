"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BrandEditor from "@/components/BrandEditor";
import DesignGuide from "@/components/DesignGuide";

export default function Home() {
  const [view, setView] = useState<"guide" | "system">("system");

  return (
    <div className="flex h-screen">
      <Sidebar activeView={view} onViewChange={setView} />
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
