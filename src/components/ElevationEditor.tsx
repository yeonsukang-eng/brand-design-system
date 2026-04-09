"use client";

import { useEffect, useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { useCopy } from "@/hooks/useCopy";

function buildBoxShadow(x: string, y: string, blur: string, color: string, opacity: string, isDark = false) {
  let opacityNum = parseFloat(opacity) / 100;
  if (opacityNum === 0) return "none";
  if (isDark) opacityNum = Math.min(opacityNum * 2.5, 0.8);
  const r = isDark ? 0 : parseInt(color.slice(1, 3), 16);
  const g = isDark ? 0 : parseInt(color.slice(3, 5), 16);
  const b = isDark ? 0 : parseInt(color.slice(5, 7), 16);
  return `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacityNum})`;
}

function buildCSS(e: { name: string; x: string; y: string; blur: string; color: string; opacity: string; stroke?: string; borderRadius?: string }) {
  const lines = [`.${e.name.toLowerCase().replace(/[\s\/]+/g, "-")} {`];
  const shadow = buildBoxShadow(e.x, e.y, e.blur, e.color, e.opacity);
  if (shadow !== "none") lines.push(`  box-shadow: ${shadow};`);
  if (e.stroke) lines.push(`  border: 1px solid ${e.stroke};`);
  if (e.borderRadius) lines.push(`  border-radius: ${e.borderRadius};`);
  lines.push(`}`);
  return lines.join("\n");
}

export default function ElevationEditor({ brandId, search = "" }: { brandId: string; search?: string }) {
  const { brands } = useBrandStore();
  const brand = brands.find((b) => b.id === brandId);
  const { copiedId, copy } = useCopy();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!brand) return null;

  const q = search.toLowerCase();
  const elevations = (brand.elevations ?? []).filter((e) =>
    !q || e.name.toLowerCase().includes(q)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Elevation & Card</h3>
      </div>

      {elevations.length === 0 && (
        <p className="text-sm text-zinc-400">No elevation tokens defined yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {elevations.map((elev) => {
          const shadow = buildBoxShadow(elev.x, elev.y, elev.blur, elev.color, elev.opacity, isDark);
          const cssCode = buildCSS(elev);
          const darkStroke = elev.stroke ? "#3A3A3C" : undefined;

          return (
            <div
              key={elev.id}
              className="flex items-center gap-6 p-5 rounded-xl border border-zinc-200 bg-white cursor-pointer hover:ring-2 hover:ring-zinc-400 transition-all dark:border-zinc-700 dark:bg-zinc-900"
              onClick={() => copy(cssCode, elev.id)}
            >
              <div
                className="shrink-0 w-28 h-28 rounded-xl bg-white dark:bg-zinc-800"
                style={{
                  boxShadow: shadow !== "none" ? shadow : undefined,
                  border: elev.stroke ? `1px solid ${isDark ? darkStroke : elev.stroke}` : undefined,
                  borderRadius: elev.borderRadius,
                }}
              />
              <div className="flex-1">
                <div className="font-medium mb-2">{elev.name}</div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-500 font-mono">
                  {shadow !== "none" && (
                    <>
                      <span>X: {elev.x}</span>
                      <span>Y: {elev.y}</span>
                      <span>Blur: {elev.blur}</span>
                      <span>Color: {elev.color}</span>
                      <span>Opacity: {elev.opacity}</span>
                    </>
                  )}
                  {elev.stroke && <span>Stroke: {elev.stroke}</span>}
                  {elev.borderRadius && <span>Radius: {elev.borderRadius}</span>}
                </div>
                <div className="mt-2 text-xs text-zinc-400">
                  {copiedId === elev.id ? (
                    <span className="text-green-600">CSS copied!</span>
                  ) : (
                    "Click to copy CSS"
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
