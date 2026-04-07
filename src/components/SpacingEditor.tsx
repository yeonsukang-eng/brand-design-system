"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { useCopy } from "@/hooks/useCopy";

export default function SpacingEditor({ brandId }: { brandId: string }) {
  const { brands, addSpacing, deleteSpacing } = useBrandStore();
  const brand = brands.find((b) => b.id === brandId);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("8px");

  const { copiedId, copy } = useCopy();

  if (!brand) return null;

  const handleAdd = () => {
    if (!name.trim()) return;
    addSpacing(brandId, { name: name.trim(), value });
    setName("");
    setValue("8px");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Spacing</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Add Spacing
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
              placeholder="e.g. spacing-sm"
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 8px"
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white w-28 font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add
          </button>
        </div>
      )}

      {brand.spacing.length === 0 && !showForm && (
        <p className="text-sm text-zinc-400">No spacing tokens defined yet.</p>
      )}

      <div className="flex flex-col gap-2">
        {brand.spacing.map((sp) => (
          <div
            key={sp.id}
            className="group flex items-center gap-4 p-3 rounded-xl border border-zinc-200 bg-white cursor-pointer hover:ring-2 hover:ring-zinc-400 transition-all dark:border-zinc-700 dark:bg-zinc-900"
            onClick={() => copy(sp.value, sp.id)}
          >
            <div
              className="rounded bg-zinc-900 dark:bg-zinc-100 shrink-0"
              style={{ width: sp.value, height: sp.value, maxWidth: "64px", maxHeight: "64px" }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium">{sp.name}</div>
              <div className="text-xs text-zinc-500 font-mono">
                {copiedId === sp.id ? <span className="text-green-600">Copied!</span> : sp.value}
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); deleteSpacing(brandId, sp.id); }}
              className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:bg-zinc-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
