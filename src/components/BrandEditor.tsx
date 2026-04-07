"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import ColorEditor from "./ColorEditor";
import TypographyEditor from "./TypographyEditor";
import SpacingEditor from "./SpacingEditor";
import IconEditor from "./IconEditor";
import ComponentEditor from "./ComponentEditor";
import ExportPanel from "./ExportPanel";
import ShareLink from "./ShareLink";

type Tab = "colors" | "typography" | "spacing" | "icons" | "components" | "export";

export default function BrandEditor() {
  const { getActiveBrand } = useBrandStore();
  const brand = getActiveBrand();
  const [tab, setTab] = useState<Tab>("colors");

  if (!brand) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400">
        <div className="text-center">
          <div className="text-4xl mb-4">&#9670;</div>
          <p className="text-lg">Select or create a brand to get started</p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "colors", label: "Colors" },
    { key: "typography", label: "Typography" },
    { key: "spacing", label: "Spacing" },
    { key: "icons", label: "Icons" },
    { key: "components", label: "Components" },
    { key: "export", label: "Export" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{brand.name}</h1>
            {brand.description && (
              <p className="text-sm text-zinc-500 mt-1">{brand.description}</p>
            )}
          </div>
          <ShareLink brand={brand} />
        </div>

        <div className="flex gap-1 mb-8 border-b border-zinc-200 dark:border-zinc-700 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
                tab === t.key
                  ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "colors" && <ColorEditor brandId={brand.id} />}
        {tab === "typography" && <TypographyEditor brandId={brand.id} />}
        {tab === "spacing" && <SpacingEditor brandId={brand.id} />}
        {tab === "icons" && <IconEditor brandId={brand.id} />}
        {tab === "components" && <ComponentEditor brandId={brand.id} />}
        {tab === "export" && <ExportPanel brand={brand} />}
      </div>
    </div>
  );
}
