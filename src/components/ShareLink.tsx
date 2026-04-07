"use client";

import { useState } from "react";
import { BrandSystem } from "@/types/brand";

export default function ShareLink({ brand }: { brand: BrandSystem }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const data = encodeURIComponent(
      btoa(
        JSON.stringify({
          name: brand.name,
          description: brand.description,
          colors: brand.colors,
          typography: brand.typography,
          spacing: brand.spacing,
        })
      )
    );
    const url = `${window.location.origin}/share?data=${data}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="text-sm px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-100 transition-colors dark:border-zinc-600 dark:hover:bg-zinc-800"
    >
      {copied ? "Link Copied!" : "Share Link"}
    </button>
  );
}
