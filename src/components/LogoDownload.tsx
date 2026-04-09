"use client";

import { useCallback } from "react";

function downloadFile(path: string, filename: string) {
  const link = document.createElement("a");
  link.href = path;
  link.download = filename;
  link.click();
}

function downloadPng(path: string, filename: string, scale = 4) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth * scale;
    canvas.height = img.naturalHeight * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
  };
  img.src = path;
}

type LogoVariant = {
  label: string;
  svgPath: string;
  previewBg: string;
  previewClass: string;
  filePrefix: string;
};

const VARIANTS: LogoVariant[] = [
  {
    label: "Dark Logo",
    svgPath: "/logo-black.svg",
    previewBg: "bg-white border border-zinc-100",
    previewClass: "",
    filePrefix: "axflow-logo-dark",
  },
  {
    label: "Light Logo",
    svgPath: "/logo-white.svg",
    previewBg: "bg-zinc-900",
    previewClass: "",
    filePrefix: "axflow-logo-light",
  },
  {
    label: "Dark Solid",
    svgPath: "/logo-black-solid.svg",
    previewBg: "bg-white border border-zinc-100",
    previewClass: "",
    filePrefix: "axflow-logo-dark-solid",
  },
  {
    label: "Light Solid",
    svgPath: "/logo-white-solid.svg",
    previewBg: "bg-zinc-900",
    previewClass: "",
    filePrefix: "axflow-logo-light-solid",
  },
];

export default function LogoDownload() {
  const handleDownload = useCallback((format: "svg" | "png", variant: LogoVariant) => {
    if (format === "svg") {
      downloadFile(variant.svgPath, `${variant.filePrefix}.svg`);
    } else {
      downloadPng(variant.svgPath, `${variant.filePrefix}@4x.png`);
    }
  }, []);

  return (
    <div>
      <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Logo Download</h5>

      {/* Gradient versions */}
      <p className="text-[11px] text-zinc-400 mb-2">Gradient (기본)</p>
      <div className="grid grid-cols-2 gap-4 mb-5">
        {VARIANTS.slice(0, 2).map((v) => (
          <div key={v.label} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className={`flex items-center justify-center h-16 mb-3 rounded-lg ${v.previewBg}`}>
              <img src={v.svgPath} alt={v.label} className="h-6" />
            </div>
            <p className="text-xs font-medium mb-2 text-center">{v.label}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(["svg", "png"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => handleDownload(f, v)}
                  className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-[11px] border border-zinc-200 hover:bg-zinc-100 transition-colors dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <span className="font-medium">{f.toUpperCase()}</span>
                  <span className="text-[9px] text-zinc-400">{f === "svg" ? "벡터 원본" : "4x 고해상도"}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Solid versions */}
      <p className="text-[11px] text-zinc-400 mb-2">Solid (단색)</p>
      <div className="grid grid-cols-2 gap-4">
        {VARIANTS.slice(2).map((v) => (
          <div key={v.label} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className={`flex items-center justify-center h-16 mb-3 rounded-lg ${v.previewBg}`}>
              <img src={v.svgPath} alt={v.label} className="h-6" />
            </div>
            <p className="text-xs font-medium mb-2 text-center">{v.label}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(["svg", "png"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => handleDownload(f, v)}
                  className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-[11px] border border-zinc-200 hover:bg-zinc-100 transition-colors dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <span className="font-medium">{f.toUpperCase()}</span>
                  <span className="text-[9px] text-zinc-400">{f === "svg" ? "벡터 원본" : "4x 고해상도"}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
