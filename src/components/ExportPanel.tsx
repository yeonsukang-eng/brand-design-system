"use client";

import { useState } from "react";
import { BrandSystem } from "@/types/brand";

type ExportFormat = "css" | "json" | "tailwind";

function exportCSS(brand: BrandSystem): string {
  const lines = [`:root {`];
  brand.colors.forEach((c) => {
    lines.push(`  --color-${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`);
  });
  brand.spacing.forEach((s) => {
    lines.push(`  --spacing-${s.name.toLowerCase().replace(/\s+/g, "-")}: ${s.value};`);
  });
  brand.typography.forEach((t) => {
    const prefix = `--font-${t.name.toLowerCase().replace(/\s+/g, "-")}`;
    lines.push(`  ${prefix}-family: ${t.fontFamily};`);
    lines.push(`  ${prefix}-size: ${t.fontSize};`);
    lines.push(`  ${prefix}-weight: ${t.fontWeight};`);
    lines.push(`  ${prefix}-line-height: ${t.lineHeight};`);
  });
  lines.push(`}`);
  return lines.join("\n");
}

function exportJSON(brand: BrandSystem): string {
  return JSON.stringify(
    {
      name: brand.name,
      colors: Object.fromEntries(brand.colors.map((c) => [c.name, { hex: c.hex, category: c.category }])),
      typography: Object.fromEntries(
        brand.typography.map((t) => [
          t.name,
          { fontFamily: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, lineHeight: t.lineHeight },
        ])
      ),
      spacing: Object.fromEntries(brand.spacing.map((s) => [s.name, s.value])),
    },
    null,
    2
  );
}

function exportTailwind(brand: BrandSystem): string {
  const config = {
    theme: {
      extend: {
        colors: Object.fromEntries(brand.colors.map((c) => [c.name.toLowerCase().replace(/\s+/g, "-"), c.hex])),
        spacing: Object.fromEntries(brand.spacing.map((s) => [s.name.toLowerCase().replace(/\s+/g, "-"), s.value])),
        fontFamily: Object.fromEntries(
          brand.typography.map((t) => [t.name.toLowerCase().replace(/\s+/g, "-"), [t.fontFamily]])
        ),
      },
    },
  };
  return `// tailwind.config extension\n${JSON.stringify(config, null, 2)}`;
}

export default function ExportPanel({ brand }: { brand: BrandSystem }) {
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState(false);

  const exporters: Record<ExportFormat, (b: BrandSystem) => string> = {
    css: exportCSS,
    json: exportJSON,
    tailwind: exportTailwind,
  };

  const output = exporters[format](brand);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Export Tokens</h3>
        <div className="flex gap-1 bg-zinc-100 rounded-lg p-1 dark:bg-zinc-800">
          {(["css", "json", "tailwind"] as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                format === f
                  ? "bg-white shadow text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {f === "css" ? "CSS Variables" : f === "json" ? "JSON" : "Tailwind"}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <pre className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-mono overflow-x-auto whitespace-pre dark:border-zinc-700 dark:bg-zinc-900">
          {output}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1 text-xs rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
