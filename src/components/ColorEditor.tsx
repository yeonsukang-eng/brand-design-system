"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { ColorToken } from "@/types/brand";

const CATEGORIES: ColorToken["category"][] = ["primary", "secondary", "accent", "neutral", "semantic"];

export default function ColorEditor({ brandId }: { brandId: string }) {
  const { brands, addColor, updateColor, deleteColor } = useBrandStore();
  const brand = brands.find((b) => b.id === brandId);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#000000");
  const [category, setCategory] = useState<ColorToken["category"]>("primary");

  if (!brand) return null;

  const handleAdd = () => {
    if (!name.trim()) return;
    addColor(brandId, { name: name.trim(), hex, category });
    setName("");
    setHex("#000000");
    setShowForm(false);
  };

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    colors: brand.colors.filter((c) => c.category === cat),
  })).filter((g) => g.colors.length > 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Colors</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Add Color
        </button>
      </div>

      {showForm && (
        <div className="flex items-end gap-3 mb-6 p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Brand Blue"
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white w-28 font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ColorToken["category"])}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
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
        <p className="text-sm text-zinc-400">No colors defined yet.</p>
      )}

      {grouped.map((group) => (
        <div key={group.category} className="mb-6">
          <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
            {group.category}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {group.colors.map((color) => (
              <div
                key={color.id}
                className="group relative rounded-xl border border-zinc-200 overflow-hidden bg-white dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div
                  className="h-20 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-3">
                  <div className="text-sm font-medium truncate">{color.name}</div>
                  <div className="text-xs text-zinc-500 font-mono">{color.hex}</div>
                </div>
                <button
                  onClick={() => deleteColor(brandId, color.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
