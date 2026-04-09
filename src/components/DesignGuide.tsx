"use client";

import { useState } from "react";
import LogoDownload from "./LogoDownload";

interface GuideSection {
  id: string;
  phase: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: GuideSection[] = [
  {
    id: "brand-identity",
    phase: "Phase 1",
    title: "Brand Identity — Logo Guide",
    content: (
      <div className="flex flex-col gap-8">
        {/* Designed Wordmark */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Designed Wordmark</h5>
          <div className="py-16 px-10 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-transparent flex flex-col items-center justify-center gap-6">
            <img src="/logo-black.svg" alt="axflow wordmark" className="h-24 dark:hidden" />
            <img src="/logo-white.svg" alt="axflow wordmark" className="h-24 hidden dark:block" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm leading-relaxed">
              &apos;a&apos;와 &apos;o&apos;는 같은 원형(Node)을 공유합니다.<br />
              &apos;x&apos;의 무한대 곡선과 &apos;w&apos;의 꺾임이 Flow의 방향성을 반복합니다.<br />
              전체 워드마크가 하나의 Graph 구조를 형성합니다.
            </p>
          </div>
        </div>

        {/* Logo + Slogan Lockup */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Logo + Slogan Lockup</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="py-10 px-8 rounded-xl bg-white border border-zinc-200 flex flex-col items-center justify-center gap-3">
              <img src="/logo-black.svg" alt="axflow" className="h-8" />
              <p className="text-[11px] font-medium uppercase text-zinc-500" style={{ fontFamily: "Outfit, sans-serif", letterSpacing: "0.18em" }}>Manufacturing AI OS</p>
            </div>
            <div className="py-10 px-8 rounded-xl bg-zinc-900 flex flex-col items-center justify-center gap-3">
              <img src="/logo-white.svg" alt="axflow" className="h-8" />
              <p className="text-[11px] font-medium uppercase text-zinc-400" style={{ fontFamily: "Outfit, sans-serif", letterSpacing: "0.18em" }}>Manufacturing AI OS</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <span className="text-[10px] text-zinc-400 text-center">Light Background</span>
            <span className="text-[10px] text-zinc-400 text-center">Dark Background</span>
          </div>
        </div>

        {/* Symbol Anatomy */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Symbol Anatomy</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-transparent flex items-center justify-center">
              <div className="relative w-full">
                <div className="px-8 py-12">
                  <img src="/logo-black.svg" alt="axflow anatomy" className="w-full dark:hidden" />
                  <img src="/logo-white.svg" alt="axflow anatomy" className="w-full hidden dark:block" />
                </div>
                {/* NODE — 'a' circle, ~9.2% from left, ~31% from top */}
                <div className="absolute" style={{ left: "9.2%", top: "18%" }}>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-semibold text-white px-2 py-0.5 rounded" style={{ backgroundColor: "#00E29E", color: "#1D1D1F" }}>NODE</span>
                    <div className="w-px h-6" style={{ backgroundColor: "#00E29E" }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00E29E" }} />
                  </div>
                </div>
                {/* EDGE — a-x connection, ~19% from left, ~78% from top */}
                <div className="absolute" style={{ left: "19%", top: "72%" }}>
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#6F36FF" }} />
                    <div className="w-px h-6" style={{ backgroundColor: "#6F36FF" }} />
                    <span className="text-[9px] font-semibold text-white px-2 py-0.5 rounded" style={{ backgroundColor: "#6F36FF" }}>EDGE</span>
                  </div>
                </div>
                {/* FLOW — 'x' cross, ~29% from left */}
                <div className="absolute" style={{ left: "29%", top: "18%" }}>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-semibold text-white px-2 py-0.5 rounded" style={{ backgroundColor: "#444CE7" }}>FLOW</span>
                    <div className="w-px h-10" style={{ backgroundColor: "#444CE7" }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#444CE7" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5">
              <h4 className="text-lg font-bold">Symbol Anatomy</h4>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#00E29E" }} />
                  <p className="text-sm dark:text-zinc-300"><strong>Node (a, o)</strong> — &apos;a&apos;의 counter와 &apos;o&apos;의 원형이 동일한 Graph Node를 반복합니다. 데이터의 핵심 단위.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#6F36FF" }} />
                  <p className="text-sm dark:text-zinc-300"><strong>Edge (stems, crossbars)</strong> — &apos;a&apos;의 stem, &apos;f&apos;의 crossbar, &apos;l&apos;의 수직선이 Node를 연결하는 Edge입니다.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#444CE7" }} />
                  <p className="text-sm dark:text-zinc-300"><strong>Flow (x, w)</strong> — &apos;x&apos;의 교차와 &apos;w&apos;의 꺾임이 데이터의 방향성과 흐름을 표현합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Primary Display */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Primary Logo</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 rounded-xl border border-zinc-200 bg-white flex items-center justify-center">
              <img src="/logo-black.svg" alt="axflow logo black" className="h-12" />
            </div>
            <div className="p-8 rounded-xl bg-zinc-900 flex items-center justify-center">
              <img src="/logo-white.svg" alt="axflow logo white" className="h-12" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <span className="text-[10px] text-zinc-400 text-center">Light Background</span>
            <span className="text-[10px] text-zinc-400 text-center">Dark Background</span>
          </div>
        </div>

        {/* Logo Download */}
        <LogoDownload />

        {/* Clear Space */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Clear Space</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">로고 주변에 최소 로고 높이의 1.5배 여백을 확보해야 합니다.</p>
          <div className="flex items-center justify-center p-8 rounded-xl border border-zinc-200 bg-white">
            <div className="relative">
              <div className="border-2 border-dashed p-8 rounded-lg" style={{ borderColor: "rgba(68, 76, 231, 0.3)" }}>
                <img src="/logo-black.svg" alt="axflow logo" className="h-10" />
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: "#444CE7", backgroundColor: "rgba(68, 76, 231, 0.08)" }}>1.5x</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: "#444CE7", backgroundColor: "rgba(68, 76, 231, 0.08)" }}>1.5x</span>
              </div>
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 -translate-x-full">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: "#444CE7", backgroundColor: "rgba(68, 76, 231, 0.08)" }}>1.5x</span>
              </div>
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 translate-x-full">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: "#444CE7", backgroundColor: "rgba(68, 76, 231, 0.08)" }}>1.5x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimum Size */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Minimum Size</h5>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <img src="/logo-black.svg" alt="120px" style={{ width: "120px" }} className="dark:hidden" />
              <img src="/logo-white.svg" alt="120px" style={{ width: "120px" }} className="hidden dark:block" />
              <div className="text-center">
                <p className="text-xs font-medium" style={{ color: "#15B79E" }}>120px (32mm)</p>
                <p className="text-[10px] text-zinc-400">권장</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <img src="/logo-black.svg" alt="90px" style={{ width: "90px" }} className="dark:hidden" />
              <img src="/logo-white.svg" alt="90px" style={{ width: "90px" }} className="hidden dark:block" />
              <div className="text-center">
                <p className="text-xs font-medium" style={{ color: "#444CE7" }}>90px (24mm)</p>
                <p className="text-[10px] text-zinc-400">표준</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <img src="/logo-black.svg" alt="60px" style={{ width: "60px" }} className="dark:hidden" />
              <img src="/logo-white.svg" alt="60px" style={{ width: "60px" }} className="hidden dark:block" />
              <div className="text-center">
                <p className="text-xs font-medium" style={{ color: "#FAC515" }}>60px (16mm)</p>
                <p className="text-[10px] text-zinc-400">최소</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border dark:border-zinc-700" style={{ backgroundColor: "rgba(240, 68, 56, 0.05)", borderColor: "rgba(240, 68, 56, 0.15)" }}>
              <img src="/logo-black.svg" alt="40px" style={{ width: "40px" }} className="opacity-40 dark:hidden" />
              <img src="/logo-white.svg" alt="40px" style={{ width: "40px" }} className="opacity-40 hidden dark:block" />
              <div className="text-center">
                <p className="text-xs font-medium" style={{ color: "#F04438" }}>40px</p>
                <p className="text-[10px]" style={{ color: "#F04438", opacity: 0.7 }}>사용 금지</p>
              </div>
            </div>
          </div>
        </div>

        {/* Do & Don't */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Do &amp; Don&apos;t</h5>
          <div className="grid grid-cols-2 gap-4">
            {/* Do */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "rgba(21, 183, 158, 0.06)", borderColor: "rgba(21, 183, 158, 0.2)" }}>
                <p className="text-xs font-semibold mb-3 flex items-center gap-1" style={{ color: "#15B79E" }}>
                  <span className="inline-flex w-4 h-4 rounded-full text-white text-[10px] items-center justify-center leading-none shrink-0" style={{ backgroundColor: "#15B79E" }}>&#10003;</span>
                  DO
                </p>
                <div className="flex flex-col gap-2 text-sm text-zinc-800 dark:text-zinc-200">
                  <p>로고 높이 1.5배 여백 확보</p>
                  <p>단색은 Black / White만 사용</p>
                  <p>원본 비율 유지</p>
                  <p>공식 배포 파일만 사용</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border bg-white flex items-center justify-center h-24 dark:bg-zinc-800" style={{ borderColor: "rgba(21, 183, 158, 0.2)" }}>
                <img src="/logo-black.svg" alt="correct usage" className="h-8 dark:hidden" />
                <img src="/logo-white.svg" alt="correct usage" className="h-8 hidden dark:block" />
              </div>
            </div>
            {/* Don't */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "rgba(240, 68, 56, 0.06)", borderColor: "rgba(240, 68, 56, 0.2)" }}>
                <p className="text-xs font-semibold mb-3 flex items-center gap-1" style={{ color: "#F04438" }}>
                  <span className="inline-flex w-4 h-4 rounded-full text-white text-[10px] items-center justify-center leading-none shrink-0" style={{ backgroundColor: "#F04438" }}>&#10007;</span>
                  DON&apos;T
                </p>
                <div className="flex flex-col gap-2 text-sm text-zinc-800 dark:text-zinc-200">
                  <p>비율 왜곡 금지</p>
                  <p>지정 외 컬러 적용 금지</p>
                  <p>그림자 / 3D 효과 금지</p>
                  <p>복잡한 배경 위 사용 금지</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg border flex items-center justify-center h-24 relative" style={{ backgroundColor: "rgba(240, 68, 56, 0.04)", borderColor: "rgba(240, 68, 56, 0.15)" }}>
                  <img src="/logo-black.svg" alt="wrong: stretched" className="h-8 dark:hidden" style={{ transform: "scaleX(1.4)" }} />
                  <img src="/logo-white.svg" alt="wrong: stretched" className="h-8 hidden dark:block" style={{ transform: "scaleX(1.4)" }} />
                  <span className="absolute bottom-1 text-[9px]" style={{ color: "#F04438" }}>비율 왜곡</span>
                </div>
                <div className="p-3 rounded-lg border flex items-center justify-center h-24 relative" style={{ backgroundColor: "rgba(240, 68, 56, 0.04)", borderColor: "rgba(240, 68, 56, 0.15)" }}>
                  <img src="/logo-black.svg" alt="wrong: colored" className="h-8 dark:hidden" style={{ filter: "invert(40%) sepia(90%) saturate(600%) hue-rotate(90deg)" }} />
                  <img src="/logo-white.svg" alt="wrong: colored" className="h-8 hidden dark:block" style={{ filter: "invert(40%) sepia(90%) saturate(600%) hue-rotate(90deg)" }} />
                  <span className="absolute bottom-1 text-[9px]" style={{ color: "#F04438" }}>지정 외 컬러</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "color-system",
    phase: "Phase 2",
    title: "Color System",
    content: (
      <div className="flex flex-col gap-8">
        {/* Branding Color */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Branding Color</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">브랜딩에는 White, Black, 그레이스케일 그라데이션만 사용합니다.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-xl border border-zinc-200" style={{ backgroundColor: "#FFFFFF" }} />
              <div className="text-center">
                <p className="text-xs font-medium">White</p>
                <p className="text-[10px] font-mono text-zinc-400">#FFFFFF</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-xl" style={{ backgroundColor: "#000000" }} />
              <div className="text-center">
                <p className="text-xs font-medium">Black</p>
                <p className="text-[10px] font-mono text-zinc-400">#000000</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-xl" style={{ background: "linear-gradient(135deg, #1D1D1F, #8E8E93, #DADAE0, #FFFFFF)" }} />
              <div className="text-center">
                <p className="text-xs font-medium">Grayscale Gradient</p>
                <p className="text-[10px] font-mono text-zinc-400">N900 → N0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Point Color */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Point Color</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">포인트 컬러는 최소한으로, 브랜드 강조가 필요한 곳에만 보수적으로 사용합니다. CTA, 핵심 인터랙션, 브랜딩 비주얼에 한정합니다.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-xl" style={{ backgroundColor: "#00E29E" }} />
              <div className="text-center">
                <p className="text-xs font-medium">Green</p>
                <p className="text-[10px] font-mono text-zinc-400">#00E29E</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-xl" style={{ backgroundColor: "#6F36FF" }} />
              <div className="text-center">
                <p className="text-xs font-medium">Violet</p>
                <p className="text-[10px] font-mono text-zinc-400">#6F36FF</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-xl" style={{ background: "linear-gradient(135deg, #00E29E, #6F36FF)" }} />
              <div className="text-center">
                <p className="text-xs font-medium">Gradient</p>
                <p className="text-[10px] font-mono text-zinc-400">Green → Violet</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <p className="text-xs font-medium mb-2">사용 원칙</p>
            <ul className="text-[11px] text-zinc-500 dark:text-zinc-400 flex flex-col gap-1.5">
              <li>UI 전체에 사용하지 않습니다. Neutral 팔레트가 기본입니다.</li>
              <li>CTA 버튼, 주요 액션, 활성 상태 등 강조가 필요한 곳에만 사용합니다.</li>
              <li>한 화면에 포인트 컬러는 1~2곳 이내로 제한합니다.</li>
              <li>그라데이션은 브랜딩 비주얼, 히어로 영역에만 사용합니다.</li>
            </ul>
          </div>
        </div>

        {/* Design System — Neutral Scale */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Design System — Neutral Scale</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">UI에 사용되는 Neutral 팔레트. 12단계 그레이스케일로 구성됩니다.</p>
          <div className="flex gap-1">
            {[
              { name: "N900", hex: "#1D1D1F" },
              { name: "N800", hex: "#3A3A3C" },
              { name: "N700", hex: "#48484A" },
              { name: "N600", hex: "#636366" },
              { name: "N500", hex: "#8E8E93" },
              { name: "N400", hex: "#AEAEB2" },
              { name: "N300", hex: "#C7C7CC" },
              { name: "N200", hex: "#DADAE0" },
              { name: "N100", hex: "#E8E8EE" },
              { name: "N75", hex: "#EDEDF3" },
              { name: "N50", hex: "#F9F9FB" },
              { name: "N0", hex: "#FFFFFF" },
            ].map((c) => (
              <div key={c.name} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full aspect-square rounded-lg"
                  style={{
                    backgroundColor: c.hex,
                    border: c.hex === "#FFFFFF" ? "1px solid #E8E8EE" : "none",
                  }}
                />
                <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300">{c.name}</span>
                <span className="text-[9px] font-mono text-zinc-400">{c.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Design System — Point Color */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Design System — Point Color</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">브랜드 강조에 사용되는 포인트 컬러. CTA, 핵심 인터랙션에 한정하여 보수적으로 사용합니다.</p>
          <div className="flex gap-4">
            {[
              { name: "Green", hex: "#00E29E" },
              { name: "Violet", hex: "#6F36FF" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1">
                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: c.hex, width: "120px" }} />
                <span className="text-[9px] font-medium text-zinc-600 dark:text-zinc-300">{c.name}</span>
                <span className="text-[9px] font-mono text-zinc-400">{c.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Design System — Semantic (Status) */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Design System — Status</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">상태 표시에 사용되는 시맨틱 컬러. 각 상태에 600(강조)과 100(배경) 쌍으로 구성됩니다.</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Error", hex600: "#F04438", hex100: "#FEF3F2", name600: "E600", name100: "E100" },
              { label: "Success", hex600: "#15B79E", hex100: "#E6FAF5", name600: "S600", name100: "S100" },
              { label: "Warning", hex600: "#FAC515", hex100: "#FEFDF0", name600: "W600", name100: "W100" },
              { label: "Info", hex600: "#444CE7", hex100: "#EEF4FF", name600: "I600", name100: "I100" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <p className="text-[11px] font-medium text-zinc-700">{s.label}</p>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full h-12 rounded-lg" style={{ backgroundColor: s.hex600 }} />
                    <span className="text-[9px] font-medium text-zinc-600">{s.name600}</span>
                    <span className="text-[9px] font-mono text-zinc-400">{s.hex600}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full h-12 rounded-lg border border-zinc-200" style={{ backgroundColor: s.hex100 }} />
                    <span className="text-[9px] font-medium text-zinc-600">{s.name100}</span>
                    <span className="text-[9px] font-mono text-zinc-400">{s.hex100}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design System — Data Visualization (hidden) */}
        <div className="hidden">
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Design System — Data Visualization</h5>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">차트, 그래프 등 데이터 시각화에 사용되는 컬러. 대시보드 내 시리즈 구분에 순서대로 적용합니다.</p>
          <div className="flex gap-2 mb-4">
            {[
              { name: "Indigo", hex: "#444CE7" },
              { name: "Violet", hex: "#7A5AF8" },
              { name: "Teal", hex: "#15B79E" },
              { name: "Orange", hex: "#EF6820" },
              { name: "Pink", hex: "#EE46BC" },
              { name: "Sky", hex: "#36BFFA" },
            ].map((c) => (
              <div key={c.name} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full h-14 rounded-lg" style={{ backgroundColor: c.hex }} />
                <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300">{c.name}</span>
                <span className="text-[9px] font-mono text-zinc-400">{c.hex}</span>
              </div>
            ))}
          </div>
          {/* Chart Preview */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
            <p className="text-[10px] font-medium text-zinc-400 uppercase mb-3">Chart Preview</p>
            <div className="flex items-end gap-3 h-28">
              {[
                { h: "75%", color: "#444CE7" },
                { h: "55%", color: "#7A5AF8" },
                { h: "90%", color: "#15B79E" },
                { h: "40%", color: "#EF6820" },
                { h: "65%", color: "#EE46BC" },
                { h: "50%", color: "#36BFFA" },
              ].map((bar, i) => (
                <div key={i} className="flex-1 rounded-t-md" style={{ backgroundColor: bar.color, height: bar.h }} />
              ))}
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Usage Guide</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1D1D1F" }} />
                <p className="text-xs font-medium">Text Primary</p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">N900 — 본문, 제목 등 주요 텍스트</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#636366" }} />
                <p className="text-xs font-medium">Text Secondary</p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">N600 — 보조 텍스트, 아이콘</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#AEAEB2" }} />
                <p className="text-xs font-medium">Placeholder / Disabled</p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">N400 — 비활성 텍스트, 플레이스홀더</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#DADAE0" }} />
                <p className="text-xs font-medium">Border / Divider</p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">N200 — 테두리, 구분선</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full border border-zinc-200" style={{ backgroundColor: "#F9F9FB" }} />
                <p className="text-xs font-medium">Surface / Background</p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">N50 — 비활성 배경, 호버 상태</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#444CE7" }} />
                <p className="text-xs font-medium">Data Visualization</p>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Chart 팔레트 — 차트, 그래프 시리즈 구분</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "slogan",
    phase: "Phase 3",
    title: "Slogan",
    content: (
      <div className="flex flex-col gap-6">
        <div className="py-12 px-10 rounded-xl bg-zinc-900 flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>Manufacturing AI OS</p>
          <p className="text-sm text-zinc-400 text-center">제조 산업을 위한 AI 운영 체제. axflow의 핵심 포지셔닝을 한 문장으로 전달합니다.</p>
        </div>
      </div>
    ),
  },
  {
    id: "typography",
    phase: "Phase 4",
    title: "Typography",
    content: (
      <div className="flex flex-col gap-6">
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400">
          <p className="font-medium text-zinc-900 mb-1 dark:text-zinc-100">Font Usage Rule</p>
          <p><strong>Outfit</strong> — 브랜딩 전용 (로고, 슬로건, 마케팅 비주얼). 한글 미지원.</p>
          <p><strong>Pretendard</strong> — UI 전체 (Headline, Title, Label, Body). 한영 혼합 지원.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="text-xs font-medium text-zinc-500 uppercase mb-1">Branding — Outfit</h5>
            <p className="text-sm text-zinc-500 mb-3">로고, 슬로건, 마케팅 비주얼에만 사용. 영문/숫자 전용.</p>
            <div className="flex flex-col gap-2">
              {["800", "700", "600", "500", "400", "300"].map((w) => (
                <p key={w} style={{ fontFamily: "Outfit, sans-serif", fontWeight: Number(w), fontSize: "20px" }}>
                  Aa Bb Cc 123 — {w}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-xs font-medium text-zinc-500 uppercase mb-1">UI — Pretendard</h5>
            <p className="text-sm text-zinc-500 mb-3">Headline, Title, Label, Body 전체. 한영 혼합 최적화.</p>
            <div className="flex flex-col gap-2">
              {["700", "600", "500", "400", "300"].map((w) => (
                <p key={w} style={{ fontFamily: "Pretendard, sans-serif", fontWeight: Number(w), fontSize: "20px" }}>
                  가나다 ABC 123 — {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "brand-objects",
    phase: "Phase 5",
    title: "Brand Objects",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Node/Edge/Flow 컨셉에서 추출한 비주얼 패턴. 명함, PPT, 웹사이트, 앱 아이콘 등에 활용합니다.</p>
        <div className="grid grid-cols-2 gap-4">
          {/* Orbital Nodes */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-zinc-900">
              <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
                <circle cx="70" cy="70" r="20" stroke="white" strokeWidth="0.7" opacity="0.6"/>
                <circle cx="85" cy="70" r="38" stroke="white" strokeWidth="0.6" opacity="0.4"/>
                <circle cx="100" cy="70" r="55" stroke="white" strokeWidth="0.5" opacity="0.25"/>
                <line x1="10" y1="70" x2="190" y2="70" stroke="white" strokeWidth="0.5" opacity="0.35"/>
                <circle cx="50" cy="70" r="3" fill="white" opacity="0.85"/>
                <circle cx="90" cy="70" r="3" fill="white" opacity="0.7"/>
                <circle cx="123" cy="70" r="3" fill="white" opacity="0.55"/>
                <circle cx="155" cy="70" r="3" fill="white" opacity="0.4"/>
              </svg>
            </div>
            <p className="font-medium text-sm dark:text-zinc-200">Orbital Nodes</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">동심원 구조의 레이어드 데이터 표현. 명함, PPT 배경에 활용.</p>
          </div>
          {/* Stream Lines */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-zinc-900">
              <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                <line x1="0" y1="40" x2="200" y2="40" stroke="white" strokeWidth="0.6" opacity="0.45"/>
                <line x1="0" y1="60" x2="200" y2="60" stroke="white" strokeWidth="0.8" opacity="0.6"/>
                <line x1="0" y1="80" x2="200" y2="80" stroke="white" strokeWidth="0.6" opacity="0.45"/>
                <circle cx="30" cy="60" r="3" fill="white" opacity="0.6"/>
                <circle cx="70" cy="40" r="3" fill="white" opacity="0.5"/>
                <circle cx="100" cy="60" r="3" fill="white" opacity="0.9"/>
                <circle cx="140" cy="80" r="3" fill="white" opacity="0.55"/>
                <circle cx="170" cy="60" r="3" fill="white" opacity="0.7"/>
              </svg>
            </div>
            <p className="font-medium text-sm dark:text-zinc-200">Stream Lines</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">수평 엣지와 흐르는 노드. 웹사이트 히어로, 배너에 활용.</p>
          </div>
          {/* Process Grid */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-zinc-900">
              <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                {/* Grid dots — 6x4 uniform grid */}
                {[25,55,85,115,145,175].map((x) => [20,45,70,95].map((y) => (
                  <circle key={`g${x}-${y}`} cx={x} cy={y} r="2.5" fill="white" opacity="0.25"/>
                )))}
                {/* Connection lines — straight lines on grid */}
                <line x1="55" y1="20" x2="55" y2="45" stroke="white" strokeWidth="0.7" opacity="0.5"/>
                <line x1="55" y1="45" x2="115" y2="45" stroke="white" strokeWidth="0.7" opacity="0.45"/>
                <line x1="115" y1="45" x2="145" y2="70" stroke="white" strokeWidth="0.7" opacity="0.4"/>
                <line x1="85" y1="45" x2="85" y2="70" stroke="white" strokeWidth="0.7" opacity="0.4"/>
                <line x1="85" y1="70" x2="145" y2="70" stroke="white" strokeWidth="0.7" opacity="0.35"/>
                <line x1="145" y1="70" x2="145" y2="95" stroke="white" strokeWidth="0.7" opacity="0.3"/>
                {/* Active nodes — on grid, brighter */}
                <circle cx="55" cy="45" r="3.5" fill="white" opacity="0.9"/>
                <circle cx="85" cy="45" r="3" fill="white" opacity="0.7"/>
                <circle cx="115" cy="45" r="3" fill="white" opacity="0.6"/>
                <circle cx="85" cy="70" r="3" fill="white" opacity="0.55"/>
                <circle cx="145" cy="70" r="3" fill="white" opacity="0.5"/>
                <circle cx="145" cy="95" r="3" fill="white" opacity="0.4"/>
              </svg>
            </div>
            <p className="font-medium text-sm dark:text-zinc-200">Process Grid</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">제조 워크플로우 추상화. 로딩 화면, 대시보드 배경에 활용.</p>
          </div>
          {/* Hub Radial */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-zinc-900">
              <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                <circle cx="100" cy="60" r="4" fill="white" opacity="0.95"/>
                {/* 8 radial lines */}
                <line x1="100" y1="60" x2="100" y2="12" stroke="white" strokeWidth="0.6" opacity="0.6"/>
                <line x1="100" y1="60" x2="100" y2="108" stroke="white" strokeWidth="0.6" opacity="0.4"/>
                <line x1="100" y1="60" x2="158" y2="60" stroke="white" strokeWidth="0.6" opacity="0.55"/>
                <line x1="100" y1="60" x2="42" y2="60" stroke="white" strokeWidth="0.6" opacity="0.5"/>
                <line x1="100" y1="60" x2="145" y2="22" stroke="white" strokeWidth="0.6" opacity="0.45"/>
                <line x1="100" y1="60" x2="55" y2="98" stroke="white" strokeWidth="0.6" opacity="0.35"/>
                <line x1="100" y1="60" x2="55" y2="22" stroke="white" strokeWidth="0.6" opacity="0.4"/>
                <line x1="100" y1="60" x2="145" y2="98" stroke="white" strokeWidth="0.6" opacity="0.35"/>
                {/* End nodes */}
                <circle cx="100" cy="12" r="3" fill="white" opacity="0.7"/>
                <circle cx="100" cy="108" r="3" fill="white" opacity="0.4"/>
                <circle cx="158" cy="60" r="3" fill="white" opacity="0.65"/>
                <circle cx="42" cy="60" r="3" fill="white" opacity="0.5"/>
                <circle cx="145" cy="22" r="3" fill="white" opacity="0.55"/>
                <circle cx="55" cy="98" r="3" fill="white" opacity="0.35"/>
                <circle cx="55" cy="22" r="3" fill="white" opacity="0.45"/>
                <circle cx="145" cy="98" r="3" fill="white" opacity="0.35"/>
              </svg>
            </div>
            <p className="font-medium text-sm dark:text-zinc-200">Hub Radial</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">중심 허브에서 방사형으로 확장. 파비콘, 앱 아이콘에 활용.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tone-voice",
    phase: "Phase 6",
    title: "Tone & Voice",
    content: (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Confident, Not Arrogant", desc: "팩트 기반 메시징. 과장하지 않는다." },
            { title: "Clear, Not Simple", desc: "기술적 신뢰를 유지하면서 명확하게." },
            { title: "Human, Not Casual", desc: "공감하되 전문적으로." },
            { title: "Forward, Not Hype", desc: "결과에 기반한 비전 제시." },
          ].map((t) => (
            <div key={t.title} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <p className="font-medium text-sm dark:text-zinc-200">{t.title}</p>
              <p className="text-xs text-zinc-500 mt-1 dark:text-zinc-400">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Do / Don&apos;t</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border" style={{ backgroundColor: "rgba(21, 183, 158, 0.08)", borderColor: "rgba(21, 183, 158, 0.2)" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#15B79E" }}>DO</p>
              <p className="text-sm text-zinc-800 dark:text-zinc-200">&quot;배치 문서화 시간을 3시간에서 20분으로 단축합니다.&quot;</p>
            </div>
            <div className="p-4 rounded-xl border" style={{ backgroundColor: "rgba(240, 68, 56, 0.06)", borderColor: "rgba(240, 68, 56, 0.2)" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#F04438" }}>DON&apos;T</p>
              <p className="text-sm text-zinc-800 dark:text-zinc-200">&quot;혁신적인 AI로 모든 것을 바꿉니다.&quot;</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function DesignGuide() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filtered = activeSection
    ? SECTIONS.filter((s) => s.id === activeSection)
    : SECTIONS;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Design Guide</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveSection(null)}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            activeSection === null
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          All
        </button>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              activeSection === s.id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {filtered.map((section) => (
          <div
            key={section.id}
            className="p-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded dark:bg-zinc-800">
                {section.phase}
              </span>
              <h4 className="font-semibold text-lg">{section.title}</h4>
            </div>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
