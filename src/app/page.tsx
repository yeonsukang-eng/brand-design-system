"use client";

import BrandList from "@/components/BrandList";
import BrandEditor from "@/components/BrandEditor";

export default function Home() {
  return (
    <div className="flex h-screen">
      <BrandList />
      <BrandEditor />
    </div>
  );
}
