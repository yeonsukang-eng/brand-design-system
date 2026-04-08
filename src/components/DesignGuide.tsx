"use client";

import { useState } from "react";

interface GuideSection {
  id: string;
  phase: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: GuideSection[] = [
  {
    id: "color-system",
    phase: "Phase 1",
    title: "Color System",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-sm text-zinc-600">Primary blue 팔레트와 accent neon green을 기반으로 한 컬러 시스템. WCAG AA 접근성 기준 준수.</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Primary</h5>
            <div className="flex gap-2">
              {["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF"].map((c) => (
                <div key={c} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: c }} />
                  <span className="text-[10px] font-mono text-zinc-500">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Accent</h5>
            <div className="flex gap-2">
              {["#00FF85", "#8B5CF6", "#F59E0B"].map((c) => (
                <div key={c} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: c }} />
                  <span className="text-[10px] font-mono text-zinc-500">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Gradients</h5>
          <div className="flex gap-3">
            <div className="flex-1 h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }} />
            <div className="flex-1 h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #3B82F6, #00FF85)" }} />
            <div className="flex-1 h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #8B5CF6, #00FF85)" }} />
          </div>
          <div className="flex gap-3 mt-1">
            <span className="flex-1 text-[10px] text-zinc-400 text-center">Flow Spectrum</span>
            <span className="flex-1 text-[10px] text-zinc-400 text-center">Data Stream</span>
            <span className="flex-1 text-[10px] text-zinc-400 text-center">Neural</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "brand-identity",
    phase: "Phase 2",
    title: "Brand Identity",
    content: (
      <div className="flex flex-col gap-6">
        <div className="p-6 rounded-xl bg-zinc-900 text-white">
          <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>ax flow</p>
          <p className="text-sm text-zinc-400 mt-2">&apos;a&apos;의 원은 Node, 꼬리는 Edge, &apos;x&apos;의 교차는 Flow를 상징합니다.</p>
        </div>
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Logo Variants</h5>
          <div className="grid grid-cols-3 gap-3">
            {[
              { bg: "#FFFFFF", color: "#000000", border: true },
              { bg: "#000000", color: "#FFFFFF", border: false },
              { bg: "#3B82F6", color: "#FFFFFF", border: false },
              { bg: "#00FF85", color: "#000000", border: false },
              { bg: "#8B5CF6", color: "#FFFFFF", border: false },
              { bg: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#FFFFFF", border: false },
            ].map((v, i) => (
              <div
                key={i}
                className="h-20 rounded-lg flex items-center justify-center text-lg font-bold tracking-tight"
                style={{
                  background: v.bg,
                  color: v.color,
                  border: v.border ? "1px solid #E8E8EE" : "none",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                ax flow
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-2">Minimum Size</h5>
          <p className="text-sm text-zinc-600">최소 사이즈: 60px. 비율 유지 필수. 단색 적용 시 black/white만 허용.</p>
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
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Direction A — AI / Ontology</h5>
          <div className="flex flex-col gap-2">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <p className="font-semibold">&quot;Knowledge Flows. AI Knows.&quot;</p>
              <p className="text-sm text-zinc-500 mt-1">Flow 컨셉을 자연스럽게 강조</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <p className="font-semibold">&quot;Ontology Drives. Agents Execute.&quot;</p>
              <p className="text-sm text-zinc-500 mt-1">핵심 아키텍처를 포지셔닝</p>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Direction B — Functional</h5>
          <div className="flex flex-col gap-2">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <p className="font-semibold">&quot;Connect Data. Unlock Insight.&quot;</p>
              <p className="text-sm text-zinc-500 mt-1">직관적, 비기술적 어필</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <p className="font-semibold">&quot;The Manufacturing Operating Layer.&quot;</p>
              <p className="text-sm text-zinc-500 mt-1">카테고리 리더십 포지셔닝</p>
            </div>
          </div>
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
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-sm text-zinc-600">
          <p className="font-medium text-zinc-900 mb-1">Font Usage Rule</p>
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
        <p className="text-sm text-zinc-600">Node/Edge/Flow 컨셉에서 추출한 비주얼 패턴.</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Orbital Nodes", desc: "동심원 구조의 레이어드 데이터 표현" },
            { name: "Stream Lines", desc: "수평 엣지와 흐르는 노드" },
            { name: "Process Grid", desc: "제조 워크플로우 추상화" },
            { name: "Hub Radial", desc: "중심 허브에서 방사형으로 확장" },
          ].map((obj) => (
            <div key={obj.name} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50">
              <div className="w-full h-24 rounded-lg bg-zinc-200 mb-3 flex items-center justify-center text-zinc-400 text-sm">
                Visual Pattern
              </div>
              <p className="font-medium text-sm">{obj.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{obj.desc}</p>
            </div>
          ))}
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
            <div key={t.title} className="p-4 rounded-xl border border-zinc-200">
              <p className="font-medium text-sm">{t.title}</p>
              <p className="text-xs text-zinc-500 mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <h5 className="text-xs font-medium text-zinc-500 uppercase mb-3">Do / Don&apos;t</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-xs font-medium text-green-700 mb-2">DO</p>
              <p className="text-sm text-green-900">&quot;배치 문서화 시간을 3시간에서 20분으로 단축합니다.&quot;</p>
            </div>
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-xs font-medium text-red-700 mb-2">DON&apos;T</p>
              <p className="text-sm text-red-900">&quot;혁신적인 AI로 모든 것을 바꿉니다.&quot;</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "product-family",
    phase: "Phase 7",
    title: "Product Family",
    content: (
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "AX Flow", desc: "Core Platform", color: "#3B82F6" },
          { name: "AX Guard", desc: "Trust Layer — 거버넌스", color: "#8B5CF6" },
          { name: "AX Portal", desc: "Knowledge Hub — 커뮤니티", color: "#00FF85" },
          { name: "AX Graph", desc: "Data Engine — 인프라", color: "#F59E0B" },
        ].map((p) => (
          <div key={p.name} className="p-4 rounded-xl border border-zinc-200 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: p.color }} />
            <div>
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "applications",
    phase: "Phase 8-10",
    title: "Applications",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-600">명함, 이메일 서명, 프레젠테이션, 아이콘, 모션 가이드라인.</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Business Card", desc: "명함 디자인 규격" },
            { name: "Email Signature", desc: "이메일 서명 템플릿" },
            { name: "Presentation", desc: "프레젠테이션 커버" },
            { name: "Icon System", desc: "1.5px stroke, 24×24 grid" },
            { name: "Motion", desc: "ease/spring/linear, 100-500ms" },
            { name: "Dark Mode", desc: "#09090B 배경 기반" },
          ].map((a) => (
            <div key={a.name} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50">
              <p className="font-medium text-sm">{a.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{a.desc}</p>
            </div>
          ))}
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
