"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { IconToken } from "@/types/brand";
import { ICON_MAP } from "@/data/icon-map";
import { useCopy } from "@/hooks/useCopy";

const CATEGORIES: IconToken["category"][] = ["general", "action", "file", "data", "user", "social"];

export default function IconEditor({ brandId, search = "" }: { brandId: string; search?: string }) {
  const { brands, addIcon, deleteIcon } = useBrandStore();
  const brand = brands.find((b) => b.id === brandId);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<IconToken["category"]>("general");
  const [hasLine, setHasLine] = useState(true);
  const [hasFill, setHasFill] = useState(true);
  const [size, setSize] = useState("24px");

  const { copiedId, copy } = useCopy();

  if (!brand) return null;

  const handleAdd = () => {
    if (!name.trim()) return;
    const variants: ("line" | "fill")[] = [];
    if (hasLine) variants.push("line");
    if (hasFill) variants.push("fill");
    addIcon(brandId, { name: name.trim(), category, variants, size });
    setName("");
    setShowForm(false);
  };

  const q = search.toLowerCase();
  const icons = (brand.icons ?? []).filter((i) =>
    !q || i.name.toLowerCase().includes(q) || i.category.includes(q)
  );
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    icons: icons.filter((i) => i.category === cat),
  })).filter((g) => g.icons.length > 0);

  const figmaUrl = (icon: IconToken) =>
    icon.figmaNodeId && brand.figmaFileKey
      ? `https://www.figma.com/design/${brand.figmaFileKey}/axflow?node-id=${icon.figmaNodeId.replace(":", "-")}`
      : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Icons</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Add Icon
        </button>
      </div>

      {showForm && (
        <div className="flex flex-wrap items-end gap-3 mb-6 p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. arrow_right"
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IconToken["category"])}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Size</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white w-20 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Variants</label>
            <div className="flex items-center gap-3 py-2">
              <label className="flex items-center gap-1.5 text-sm">
                <input type="checkbox" checked={hasLine} onChange={(e) => setHasLine(e.target.checked)} />
                Line
              </label>
              <label className="flex items-center gap-1.5 text-sm">
                <input type="checkbox" checked={hasFill} onChange={(e) => setHasFill(e.target.checked)} />
                Fill
              </label>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add
          </button>
        </div>
      )}

      {grouped.length === 0 && !showForm && (
        <p className="text-sm text-zinc-400">No icons defined yet.</p>
      )}

      {grouped.map((group) => (
        <div key={group.category} className="mb-8">
          <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
            {group.category}
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {group.icons.map((icon) => {
              const LucideIcon = ICON_MAP[icon.name];
              const link = figmaUrl(icon);

              return (
                <div
                  key={icon.id}
                  className="group relative flex flex-col items-center gap-2 p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-400 transition-colors dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {LucideIcon ? (
                      <LucideIcon size={24} strokeWidth={1.5} />
                    ) : (
                      <span className="text-xs font-mono text-zinc-400">{icon.size}</span>
                    )}
                  </div>
                  <div
                    className="text-xs text-center truncate w-full cursor-pointer"
                    title={`Click to copy: ${icon.name}`}
                    onClick={() => copy(icon.name, icon.id)}
                  >
                    {copiedId === icon.id ? (
                      <span className="text-green-600">Copied!</span>
                    ) : (
                      icon.name
                    )}
                  </div>
                  <div className="flex gap-1">
                    {icon.variants.map((v) => (
                      <span
                        key={v}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center hover:bg-blue-600"
                      title="View in Figma"
                    >
                      F
                    </a>
                  )}
                  <button
                    onClick={() => deleteIcon(brandId, icon.id)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full bg-black/50 text-white text-[10px] flex items-center justify-center hover:bg-black/70"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
