"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { useCopy } from "@/hooks/useCopy";
import { useLocale } from "@/contexts/locale";

export default function TypographyEditor({ brandId, search = "" }: { brandId: string; search?: string }) {
  const { brands, addTypography, deleteTypography } = useBrandStore();
  const { t } = useLocale();
  const brand = brands.find((b) => b.id === brandId);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [fontSize, setFontSize] = useState("16px");
  const [fontWeight, setFontWeight] = useState("400");
  const [lineHeight, setLineHeight] = useState("1.5");
  const { copiedId, copy } = useCopy();

  if (!brand) return null;

  const typoCss = (t: typeof brand.typography[number]) =>
    `.text-${t.name.toLowerCase()} {\n  font-family: "${t.fontFamily}", sans-serif;\n  font-size: ${t.fontSize};\n  font-weight: ${t.fontWeight};\n  line-height: ${t.lineHeight};\n}`;

  const handleAdd = () => {
    if (!name.trim()) return;
    addTypography(brandId, { name: name.trim(), fontFamily, fontSize, fontWeight, lineHeight });
    setName("");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Typography</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Add Style
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
              placeholder="e.g. Heading 1"
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Font Family</label>
            <input
              type="text"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Size</label>
            <input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white w-24 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Weight</label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            >
              {["100", "200", "300", "400", "500", "600", "700", "800", "900"].map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Line Height</label>
            <input
              type="text"
              value={lineHeight}
              onChange={(e) => setLineHeight(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white w-20 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
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

      <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 mb-4 flex gap-4 dark:bg-zinc-900 dark:border-zinc-700">
        <span><strong className="text-zinc-700 dark:text-zinc-300">Pretendard</strong> — {t("UI 전체 (Headline, Title, Label, Body)", "All UI (Headline, Title, Label, Body)")}</span>
        <span><strong className="text-zinc-700 dark:text-zinc-300">Outfit</strong> — {t("브랜딩 전용 (로고, 슬로건)", "Branding only (Logo, Slogan)")}</span>
      </div>

      {brand.typography.length === 0 && !showForm && (
        <p className="text-sm text-zinc-400">No typography styles defined yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {brand.typography.filter((t) => {
          const q = search.toLowerCase();
          return !q || t.name.toLowerCase().includes(q) || t.fontFamily.toLowerCase().includes(q) || t.fontSize.includes(q);
        }).map((typo) => (
          <div
            key={typo.id}
            className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-white cursor-pointer hover:ring-2 hover:ring-zinc-400 transition-all dark:border-zinc-700 dark:bg-zinc-900"
            onClick={() => copy(typoCss(typo), typo.id)}
          >
            <div className="flex-1">
              <div
                className="mb-1"
                style={{
                  fontFamily: typo.fontFamily,
                  fontSize: typo.fontSize,
                  fontWeight: Number(typo.fontWeight),
                  lineHeight: typo.lineHeight,
                }}
              >
                {typo.name}
              </div>
              <div className="flex gap-4 text-xs text-zinc-500 font-mono">
                {copiedId === typo.id ? (
                  <span className="text-green-600">CSS copied!</span>
                ) : (
                  <>
                    <span>{typo.fontFamily}</span>
                    <span>{typo.fontSize}</span>
                    <span>{typo.fontWeight}</span>
                    <span>LH {typo.lineHeight}</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); deleteTypography(brandId, typo.id); }}
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
