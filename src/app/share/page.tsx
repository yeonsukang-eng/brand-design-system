"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BrandSystem } from "@/types/brand";

function ShareContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-400">
        <p>No design system data found.</p>
      </div>
    );
  }

  let brand: Partial<BrandSystem>;
  try {
    brand = JSON.parse(atob(decodeURIComponent(data)));
  } catch {
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-400">
        <p>Invalid share link.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-2">
          <a href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            &larr; Back to editor
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
        {brand.description && (
          <p className="text-zinc-500 mb-8">{brand.description}</p>
        )}

        {brand.colors && brand.colors.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Colors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {brand.colors.map((color, i) => (
                <div key={i} className="rounded-xl border border-zinc-200 overflow-hidden bg-white dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
                  <div className="p-3">
                    <div className="text-sm font-medium">{color.name}</div>
                    <div className="text-xs text-zinc-500 font-mono">{color.hex}</div>
                    <div className="text-xs text-zinc-400 mt-1">{color.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {brand.typography && brand.typography.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Typography</h2>
            <div className="flex flex-col gap-3">
              {brand.typography.map((typo, i) => (
                <div key={i} className="p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
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
                    <span>{typo.fontFamily}</span>
                    <span>{typo.fontSize}</span>
                    <span>{typo.fontWeight}</span>
                    <span>LH {typo.lineHeight}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {brand.spacing && brand.spacing.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Spacing</h2>
            <div className="flex flex-col gap-2">
              {brand.spacing.map((sp, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                  <div
                    className="rounded bg-zinc-900 dark:bg-zinc-100 shrink-0"
                    style={{ width: sp.value, height: sp.value, maxWidth: "64px", maxHeight: "64px" }}
                  />
                  <div>
                    <div className="text-sm font-medium">{sp.name}</div>
                    <div className="text-xs text-zinc-500 font-mono">{sp.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-zinc-400">Loading...</div>}>
      <ShareContent />
    </Suspense>
  );
}
