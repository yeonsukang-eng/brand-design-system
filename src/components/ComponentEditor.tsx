"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { ButtonPreview } from "./ButtonPreview";
import { FormPreview } from "./FormPreview";
import { NavPreview } from "./NavPreview";
import { ControlPreview } from "./ControlPreview";

export default function ComponentEditor({ brandId, search = "" }: { brandId: string; search?: string }) {
  const { brands, addComponent, deleteComponent } = useBrandStore();
  const brand = brands.find((b) => b.id === brandId);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variantsInput, setVariantsInput] = useState("");

  if (!brand) return null;

  const handleAdd = () => {
    if (!name.trim()) return;
    const variants = variantsInput
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    addComponent(brandId, {
      name: name.trim(),
      category: category.trim() || "general",
      description: description.trim(),
      variants,
    });
    setName("");
    setCategory("");
    setDescription("");
    setVariantsInput("");
    setShowForm(false);
  };

  const q = search.toLowerCase();
  const components = (brand.components ?? []).filter((c) =>
    !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  );
  const allCategories = [...new Set(components.map((c) => c.category))];

  const filtered = activeCategory
    ? components.filter((c) => c.category === activeCategory)
    : components;

  const visibleCategories = [...new Set(filtered.map((c) => c.category))];
  const grouped = visibleCategories.map((cat) => ({
    category: cat,
    components: filtered.filter((c) => c.category === cat),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Components</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Add Component
        </button>
      </div>

      {showForm && (
        <div className="flex flex-col gap-3 mb-6 p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
              <label className="text-xs text-zinc-500">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Button"
                className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
              <label className="text-xs text-zinc-500">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. input, feedback, navigation"
                className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Component usage guidelines..."
              rows={2}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Variants (comma-separated)</label>
            <input
              type="text"
              value={variantsInput}
              onChange={(e) => setVariantsInput(e.target.value)}
              placeholder="e.g. primary, secondary, ghost, disabled"
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <button
            onClick={handleAdd}
            className="self-end px-4 py-2 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add
          </button>
        </div>
      )}

      {/* 1단계: 카테고리 칩 */}
      {allCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              activeCategory === null
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && !showForm && (
        <p className="text-sm text-zinc-400">No components found.</p>
      )}

      {grouped.map((group) => (
        <div key={group.category} className="mb-8">
          {!activeCategory && (
            <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
              {group.category}
            </h4>
          )}
          <div className="flex flex-col gap-3">
            {group.components.map((comp) => (
              <div
                key={comp.id}
                className="group flex items-start justify-between p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="flex-1">
                  <div className="font-medium">{comp.name}</div>
                  {comp.description && (
                    <p className="text-sm text-zinc-500 mt-1">{comp.description}</p>
                  )}
                  {comp.category === "button" && (
                    <ButtonPreview componentName={comp.name} />
                  )}
                  {comp.category === "form" && (
                    <FormPreview componentName={comp.name} />
                  )}
                  {comp.category === "dropdown" && (
                    <FormPreview componentName={comp.name} />
                  )}
                  {comp.category === "search" && (
                    <FormPreview componentName={comp.name} />
                  )}
                  {comp.category === "navigation" && (
                    <NavPreview componentName={comp.name} />
                  )}
                  {comp.category === "control" && (
                    <ControlPreview componentName={comp.name} />
                  )}
                  {comp.variants.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {comp.variants.map((v) => (
                        <span
                          key={v}
                          className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteComponent(brandId, comp.id)}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:bg-zinc-800"
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
