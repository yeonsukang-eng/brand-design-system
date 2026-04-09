"use client";

import { useState } from "react";
import { BrandSystem } from "@/types/brand";

type ExportFormat = "json" | "tailwind";

const FORMAT_LABELS: Record<ExportFormat, string> = {
  json: "JSON",
  tailwind: "Tailwind",
};

function toKebab(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

function exportCSSClasses(brand: BrandSystem): string {
  const lines: string[] = [];

  if (brand.colors.length > 0) {
    lines.push("/* ===================== */");
    lines.push("/*        Colors         */");
    lines.push("/* ===================== */\n");
    brand.colors.forEach((c) => {
      lines.push(`.color-${toKebab(c.name)} {`);
      lines.push(`  color: ${c.hex};`);
      lines.push(`}\n`);
      lines.push(`.bg-${toKebab(c.name)} {`);
      lines.push(`  background-color: ${c.hex};`);
      lines.push(`}\n`);
    });
  }

  if (brand.typography.length > 0) {
    lines.push("/* ===================== */");
    lines.push("/*      Typography       */");
    lines.push("/* ===================== */\n");
    brand.typography.forEach((t) => {
      lines.push(`.text-${toKebab(t.name)} {`);
      lines.push(`  font-family: "${t.fontFamily}", -apple-system, BlinkMacSystemFont, sans-serif;`);
      lines.push(`  font-size: ${t.fontSize};`);
      lines.push(`  font-weight: ${t.fontWeight};`);
      lines.push(`  line-height: ${t.lineHeight};`);
      lines.push(`}\n`);
    });
  }

  if (brand.spacing.length > 0) {
    lines.push("/* ===================== */");
    lines.push("/*        Spacing        */");
    lines.push("/* ===================== */\n");
    brand.spacing.forEach((s) => {
      lines.push(`.gap-${toKebab(s.name)} { gap: ${s.value}; }`);
      lines.push(`.p-${toKebab(s.name)} { padding: ${s.value}; }`);
      lines.push(`.m-${toKebab(s.name)} { margin: ${s.value}; }\n`);
    });
  }

  return lines.join("\n");
}

function exportCSSVariables(brand: BrandSystem): string {
  const lines = [`:root {`];

  if (brand.colors.length > 0) {
    lines.push("  /* Colors */");
    brand.colors.forEach((c) => {
      lines.push(`  --color-${toKebab(c.name)}: ${c.hex};`);
    });
    lines.push("");
  }

  if (brand.typography.length > 0) {
    lines.push("  /* Typography */");
    brand.typography.forEach((t) => {
      const prefix = `--font-${toKebab(t.name)}`;
      lines.push(`  ${prefix}-family: "${t.fontFamily}", -apple-system, BlinkMacSystemFont, sans-serif;`);
      lines.push(`  ${prefix}-size: ${t.fontSize};`);
      lines.push(`  ${prefix}-weight: ${t.fontWeight};`);
      lines.push(`  ${prefix}-line-height: ${t.lineHeight};`);
    });
    lines.push("");
  }

  if (brand.spacing.length > 0) {
    lines.push("  /* Spacing */");
    brand.spacing.forEach((s) => {
      lines.push(`  --spacing-${toKebab(s.name)}: ${s.value};`);
    });
  }

  lines.push(`}`);
  return lines.join("\n");
}

const DARK_COLOR_MAP: Record<string, string> = {
  "N900": "#EDEDF3",
  "N800": "#DADAE0",
  "N700": "#C7C7CC",
  "N600": "#AEAEB2",
  "N500": "#8E8E93",
  "N400": "#636366",
  "N300": "#48484A",
  "N200": "#3A3A3C",
  "N100": "#2C2C2E",
  "N75": "#1D1D1F",
  "N50": "#141414",
  "N0": "#0A0A0A",
};

function exportJSON(brand: BrandSystem): string {
  const lightColors = Object.fromEntries(brand.colors.map((c) => [c.name, { hex: c.hex, category: c.category }]));
  const darkColors = Object.fromEntries(
    brand.colors.map((c) => [c.name, { hex: DARK_COLOR_MAP[c.name] || c.hex, category: c.category }])
  );

  return JSON.stringify(
    {
      name: brand.name,
      colors: {
        light: lightColors,
        dark: darkColors,
      },
      typography: Object.fromEntries(
        brand.typography.map((t) => [
          t.name,
          { fontFamily: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, lineHeight: t.lineHeight },
        ])
      ),
      spacing: Object.fromEntries(brand.spacing.map((s) => [s.name, s.value])),
      icons: Object.fromEntries(
        brand.icons.map((i) => [i.name, { category: i.category, variants: i.variants, size: i.size }])
      ),
      components: Object.fromEntries(
        brand.components.map((c) => [c.name, { category: c.category, description: c.description, variants: c.variants }])
      ),
    },
    null,
    2
  );
}

function exportTailwind(brand: BrandSystem): string {
  const lines: string[] = [
    "/* axflow Design Tokens — Tailwind CSS */",
    "",
    "@theme {",
    "  /* Colors — Light */",
  ];

  brand.colors.forEach((c) => {
    lines.push(`  --color-ax-${toKebab(c.name)}: ${c.hex};`);
  });

  lines.push("");
  lines.push("  /* Typography */");
  brand.typography.forEach((t) => {
    lines.push(`  --font-size-ax-${toKebab(t.name)}: ${t.fontSize};`);
  });

  lines.push("}");
  lines.push("");
  lines.push("/* Colors — Dark */");
  lines.push(".dark {");

  brand.colors.forEach((c) => {
    const darkHex = DARK_COLOR_MAP[c.name] || c.hex;
    lines.push(`  --color-ax-${toKebab(c.name)}: ${darkHex};`);
  });

  lines.push("}");

  return lines.join("\n");
}

const EXPORTERS: Record<ExportFormat, (b: BrandSystem) => string> = {
  json: exportJSON,
  tailwind: exportTailwind,
};

const FORMAT_ORDER: ExportFormat[] = ["json", "tailwind"];

export default function ExportPanel({ brand }: { brand: BrandSystem }) {
  const [format, setFormat] = useState<ExportFormat>("json");
  const [copied, setCopied] = useState(false);

  const output = EXPORTERS[format](brand);

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
          {FORMAT_ORDER.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                format === f
                  ? "bg-white shadow text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {FORMAT_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <pre className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-mono overflow-x-auto whitespace-pre max-h-[600px] overflow-y-auto dark:border-zinc-700 dark:bg-zinc-900">
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
