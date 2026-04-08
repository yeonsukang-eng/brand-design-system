"use client";

import { useState } from "react";

interface Change {
  component: string;
  property: string;
  before: string;
  after: string;
  tailwind: string;
}

const CHANGES: Record<string, Change[]> = {
  typography: [
    { component: "H700-40px", property: "font-size", before: "40px", after: "36px", tailwind: "text-4xl" },
    { component: "H700-28px", property: "font-size", before: "28px", after: "30px", tailwind: "text-3xl" },
    { component: "T600-28px", property: "font-size", before: "28px", after: "30px", tailwind: "text-3xl" },
    { component: "L500-10px", property: "—", before: "10px (존재)", after: "삭제", tailwind: "L500-12px와 통합" },
  ],
  components: [
    { component: "Button medium", property: "height", before: "37px", after: "36px", tailwind: "h-9" },
    { component: "Button small", property: "height", before: "30px", after: "32px", tailwind: "h-8" },
    { component: "Button small", property: "padding-x", before: "14px", after: "12px", tailwind: "px-3" },
    { component: "Button base", property: "border-radius", before: "10px", after: "8px", tailwind: "rounded-lg" },
    { component: "Button large", property: "border-radius", before: "10px", after: "12px", tailwind: "rounded-xl" },
    { component: "Button gap", property: "gap", before: "6px", after: "8px", tailwind: "gap-2" },
    { component: "Icon button md", property: "size", before: "37px", after: "36px", tailwind: "size-9" },
    { component: "Icon button sm", property: "size", before: "30px", after: "32px", tailwind: "size-8" },
    { component: "Form label", property: "font-size", before: "13px", after: "14px", tailwind: "text-sm" },
    { component: "Segmented", property: "border-radius", before: "10px", after: "12px", tailwind: "rounded-xl" },
    { component: "Segmented", property: "gap", before: "2px", after: "4px", tailwind: "gap-1" },
    { component: "Chip", property: "padding", before: "5px 14px", after: "4px 16px", tailwind: "py-1 px-4" },
    { component: "Checkbox", property: "size", before: "18px", after: "16px", tailwind: "size-4" },
    { component: "Radio", property: "size", before: "18px", after: "16px", tailwind: "size-4" },
    { component: "Radio dot", property: "size", before: "8px", after: "6px", tailwind: "size-1.5" },
  ],
};

export function TailwindChangelog({ tab }: { tab: string }) {
  const changes = CHANGES[tab];
  const [open, setOpen] = useState(false);

  if (!changes || changes.length === 0) return null;

  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-blue-700 dark:text-blue-400"
      >
        <span>Tailwind 표준 적용 변경사항 ({changes.length}건)</span>
        <span className="text-xs">{open ? "접기" : "펼치기"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-blue-500 border-b border-blue-200 dark:border-blue-800">
                <th className="pb-2 font-medium">Component</th>
                <th className="pb-2 font-medium">Property</th>
                <th className="pb-2 font-medium">Before</th>
                <th className="pb-2 font-medium">After</th>
                <th className="pb-2 font-medium">Tailwind</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((c, i) => (
                <tr key={i} className="border-b border-blue-100 dark:border-blue-900 last:border-0">
                  <td className="py-2 text-blue-900 dark:text-blue-300">{c.component}</td>
                  <td className="py-2 text-blue-700 dark:text-blue-400">{c.property}</td>
                  <td className="py-2 text-red-500 line-through">{c.before}</td>
                  <td className="py-2 text-green-600 font-medium">{c.after}</td>
                  <td className="py-2 font-mono text-blue-600 dark:text-blue-400">{c.tailwind}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
