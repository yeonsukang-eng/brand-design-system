"use client";

import { useState, useRef, useEffect } from "react";
import { useBrandStore } from "@/store/brand-store";
import { useLocale } from "@/contexts/locale";
import ColorEditor from "./ColorEditor";
import TypographyEditor from "./TypographyEditor";
import SpacingEditor from "./SpacingEditor";
import IconEditor from "./IconEditor";
import ElevationEditor from "./ElevationEditor";
import ComponentEditor from "./ComponentEditor";
import ExportPanel from "./ExportPanel";
import { TailwindChangelog } from "./TailwindChangelog";
import ShareLink from "./ShareLink";

type Tab = "colors" | "typography" | "icons" | "elevations" | "components" | "export";

export default function BrandEditor() {
  const { getActiveBrand } = useBrandStore();
  const brand = getActiveBrand();
  const { t } = useLocale();
  const [tab, setTab] = useState<Tab>("colors");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [tab]);

  if (!brand) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400">
        <div className="text-center">
          <div className="text-4xl mb-4">&#9670;</div>
          <p className="text-lg">{t("브랜드를 선택하거나 생성하세요", "Select or create a brand to get started")}</p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "colors", label: t("컬러", "Colors") },
    { key: "typography", label: t("타이포그래피", "Typography") },
    { key: "icons", label: t("아이콘", "Icons") },
    { key: "elevations", label: t("엘리베이션", "Elevation") },
    { key: "components", label: t("컴포넌트", "Components") },
    { key: "export", label: t("내보내기", "Export") },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="max-w-4xl mx-auto w-full px-8 pt-8 pb-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{brand.name}</h1>
            {brand.description && (
              <p className="text-sm text-zinc-500 mt-1">{brand.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={t("토큰 검색...", "Search tokens...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-transparent w-48 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600"
            />
            <ShareLink brand={brand} />
          </div>
        </div>

        <div className="flex gap-1 mb-0 border-b border-zinc-200 dark:border-zinc-700">
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
      </div>

      <div key={tab} className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 pt-8 pb-8">

        {tab === "colors" && <ColorEditor brandId={brand.id} search={search} />}
        {tab === "typography" && <>{brand.id === "axflow" && <TailwindChangelog tab="typography" />}<TypographyEditor brandId={brand.id} search={search} /></>}
{tab === "icons" && <IconEditor brandId={brand.id} search={search} />}
        {tab === "elevations" && <ElevationEditor brandId={brand.id} search={search} />}
        {tab === "components" && <>{brand.id === "axflow" && <TailwindChangelog tab="components" />}<ComponentEditor brandId={brand.id} search={search} /></>}
{tab === "export" && <ExportPanel brand={brand} />}
      </div>
      </div>
    </div>
  );
}
