"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";

export default function BrandList() {
  const { brands, activeBrandId, setActiveBrand, createBrand, deleteBrand } = useBrandStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    createBrand(name.trim(), description.trim());
    setName("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="w-72 border-r border-zinc-200 bg-zinc-50 p-4 flex flex-col gap-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Brands</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-2 py-1 rounded bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + New
        </button>
      </div>

      {showForm && (
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <input
            type="text"
            placeholder="Brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button
            onClick={handleCreate}
            className="text-sm py-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Create
          </button>
        </div>
      )}

      <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
              activeBrandId === brand.id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
            onClick={() => setActiveBrand(brand.id)}
          >
            <div className="truncate">
              <div className="font-medium truncate">{brand.name}</div>
              <div className={`text-xs truncate ${activeBrandId === brand.id ? "text-zinc-300 dark:text-zinc-500" : "text-zinc-500"}`}>
                {brand.description || "No description"}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBrand(brand.id);
              }}
              className={`opacity-0 group-hover:opacity-100 text-xs px-1.5 py-0.5 rounded ${
                activeBrandId === brand.id
                  ? "hover:bg-zinc-700 dark:hover:bg-zinc-300"
                  : "hover:bg-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              ×
            </button>
          </div>
        ))}
        {brands.length === 0 && (
          <p className="text-sm text-zinc-400 text-center mt-8">No brands yet. Create one to get started.</p>
        )}
      </div>
    </div>
  );
}
