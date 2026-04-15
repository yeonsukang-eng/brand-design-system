"use client";

import { Plus } from "lucide-react";
import "./form-preview.css";

function MenuPreview({ size }: { size: "medium" | "large" }) {
  const isLarge = size === "large";
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-zinc-400 uppercase">{size}</span>
      <div
        className="axform-dropdown-list"
        style={{ width: isLarge ? 220 : 170, padding: 4 }}
      >
        <div className="axform-list-item" style={{ fontSize: isLarge ? 15 : 14, padding: isLarge ? "10px 14px" : "8px 12px" }}>
          <Plus size={isLarge ? 16 : 14} /> list field
        </div>
        <div className="axform-list-item hovered" style={{ fontSize: isLarge ? 15 : 14, padding: isLarge ? "10px 14px" : "8px 12px" }}>
          <Plus size={isLarge ? 16 : 14} /> list field
        </div>
        <div className="axform-list-item disabled" style={{ fontSize: isLarge ? 15 : 14, padding: isLarge ? "10px 14px" : "8px 12px" }}>
          <Plus size={isLarge ? 16 : 14} /> list field
        </div>
      </div>
    </div>
  );
}

export function NavPreview({ componentName, brandId }: { componentName: string; brandId?: string }) {
  const isSpire = brandId === "spire";
  if (componentName === "Menu") {
    return (
      <div className={`${isSpire ? "spire-preview bg-[#242424]" : "bg-zinc-50 dark:bg-zinc-800/50"} flex flex-wrap gap-6 mt-3 p-4 rounded-lg items-start`}>
        <MenuPreview size="medium" />
        <MenuPreview size="large" />
      </div>
    );
  }

  return null;
}
