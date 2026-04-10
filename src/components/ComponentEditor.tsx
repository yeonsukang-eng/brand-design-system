"use client";

import { useState } from "react";
import { useBrandStore } from "@/store/brand-store";
import { useLocale } from "@/contexts/locale";
import { ButtonPreview } from "./ButtonPreview";
import { FormPreview } from "./FormPreview";
import { NavPreview } from "./NavPreview";
import { ControlPreview } from "./ControlPreview";
import { ToastPreview } from "./ToastPreview";
import { TooltipPreview } from "./TooltipPreview";

const DESCRIPTION_KO: Record<string, string> = {
  "btn-solid-primary": "기본 배경이 채워진 주요 액션 버튼. 페이지에서 가장 중요한 액션에 사용합니다.",
  "btn-outlined-primary": "테두리가 있는 주요 아웃라인 버튼. 솔리드 버튼과 함께 보조 강조용으로 사용합니다.",
  "btn-outlined-secondary": "보조 아웃라인 버튼. 덜 강조되는 액션에 사용합니다.",
  "btn-outlined-assistive": "어시스티브 아웃라인 버튼. 3차 액션에 사용합니다.",
  "btn-icon-normal": "투명 배경의 아이콘 전용 버튼.",
  "btn-icon-background": "밝은 배경이 채워진 아이콘 버튼.",
  "btn-icon-outlined": "테두리가 있는 아이콘 버튼.",
  "btn-icon-solid": "배경이 채워진 아이콘 버튼.",
  "btn-text": "배경이나 테두리 없는 텍스트 전용 버튼. 인라인 또는 최소한의 액션에 사용합니다.",
  "form-text-input": "라벨, 플레이스홀더, 도움말 텍스트를 지원하는 한 줄 텍스트 입력 필드.",
  "form-textarea": "라벨, 플레이스홀더, 도움말 텍스트를 지원하는 여러 줄 텍스트 입력 필드.",
  "form-dropdown": "라벨, 리스트 항목, 아이콘을 지원하는 선택 드롭다운. 열림/닫힘 상태 포함.",
  "form-list-item": "드롭다운 메뉴 내부에 사용되는 개별 리스트 항목. 왼쪽 아이콘 지원.",
  "form-search": "드롭다운 결과 리스트가 있는 검색 입력. 검색 아이콘, 라벨, 스크롤 인디케이터, 열림/닫힘 상태 포함.",
  "nav-menu": "리스트 항목이 있는 플로팅 메뉴 패널. 컨텍스트 메뉴, 액션 메뉴, 팝오버 내비게이션에 사용.",
  "ctrl-segmented": "관련 뷰나 모드를 전환하기 위한 탭 스타일 토글.",
  "ctrl-tabs": "콘텐츠를 별도의 뷰로 구성하기 위한 탭 내비게이션.",
  "ctrl-chips": "선택 및 분류를 위한 컴팩트 필터 또는 태그 요소.",
  "ctrl-checkbox": "다중 선택을 위한 체크박스. 체크, 미체크, 불확정 상태 지원.",
  "ctrl-radio": "옵션 그룹에서 단일 선택을 위한 라디오 버튼.",
  "ctrl-toggle": "이진 설정을 위한 켜기/끄기 스위치 토글.",
  "feedback-toast": "알림 메시지를 화면 우측 상단에 표시하는 컴포넌트. 3개 이상일 경우 전체 삭제 버튼이 노출되며, hover 시 개별 삭제 버튼이 나타남.",
  "feedback-tooltip": "요소에 대한 보조 설명을 말풍선 형태로 보여주는 컴포넌트. 4방향(상/하/좌/우) 화살표를 지원.",
};

export default function ComponentEditor({ brandId, search = "" }: { brandId: string; search?: string }) {
  const { brands, addComponent, deleteComponent } = useBrandStore();
  const brand = brands.find((b) => b.id === brandId);
  const { t } = useLocale();
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variantsInput, setVariantsInput] = useState("");

  if (!brand) return null;

  const handleAdd = () => {
    if (!name.trim()) return;
    const variants = variantsInput
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    addComponent(brandId, {
      name: name.trim(),
      category: category.trim() || "general",
      description: description.trim(),
      variants,
    });
    setName("");
    setCategory("");
    setDescription("");
    setVariantsInput("");
    setShowForm(false);
  };

  const q = search.toLowerCase();
  const components = (brand.components ?? []).filter((c) =>
    !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  );
  const allCategories = [...new Set(components.map((c) => c.category))];

  const filtered = activeCategory
    ? components.filter((c) => c.category === activeCategory)
    : components;

  const visibleCategories = [...new Set(filtered.map((c) => c.category))];
  const grouped = visibleCategories.map((cat) => ({
    category: cat,
    components: filtered.filter((c) => c.category === cat),
  }));

  const getDescription = (comp: { id: string; description: string }) => {
    const ko = DESCRIPTION_KO[comp.id];
    return ko ? t(ko, comp.description) : comp.description;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t("컴포넌트", "Components")}</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {t("+ 컴포넌트 추가", "+ Add Component")}
        </button>
      </div>

      {showForm && (
        <div className="flex flex-col gap-3 mb-6 p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
              <label className="text-xs text-zinc-500">{t("이름", "Name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("예: Button", "e.g. Button")}
                className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
              <label className="text-xs text-zinc-500">{t("카테고리", "Category")}</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={t("예: input, feedback, navigation", "e.g. input, feedback, navigation")}
                className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">{t("설명", "Description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("컴포넌트 사용 가이드...", "Component usage guidelines...")}
              rows={2}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">{t("변형 (쉼표로 구분)", "Variants (comma-separated)")}</label>
            <input
              type="text"
              value={variantsInput}
              onChange={(e) => setVariantsInput(e.target.value)}
              placeholder={t("예: primary, secondary, ghost, disabled", "e.g. primary, secondary, ghost, disabled")}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
            />
          </div>
          <button
            onClick={handleAdd}
            className="self-end px-4 py-2 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {t("추가", "Add")}
          </button>
        </div>
      )}

      {/* 카테고리 칩 */}
      {allCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              activeCategory === null
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {t("전체", "All")}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && !showForm && (
        <p className="text-sm text-zinc-400">{t("컴포넌트를 찾을 수 없습니다.", "No components found.")}</p>
      )}

      {grouped.map((group) => (
        <div key={group.category} className="mb-8">
          {!activeCategory && (
            <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
              {group.category}
            </h4>
          )}
          <div className="flex flex-col gap-3">
            {group.components.map((comp) => (
              <div
                key={comp.id}
                className="group flex items-start justify-between p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="flex-1">
                  <div className="font-medium">{comp.name}</div>
                  {comp.description && (
                    <p className="text-sm text-zinc-500 mt-1">{getDescription(comp)}</p>
                  )}
                  {comp.category === "button" && (
                    <ButtonPreview componentName={comp.name} />
                  )}
                  {comp.category === "form" && (
                    <FormPreview componentName={comp.name} />
                  )}
                  {comp.category === "dropdown" && (
                    <FormPreview componentName={comp.name} />
                  )}
                  {comp.category === "search" && (
                    <FormPreview componentName={comp.name} />
                  )}
                  {comp.category === "navigation" && (
                    <NavPreview componentName={comp.name} />
                  )}
                  {comp.category === "control" && (
                    <ControlPreview componentName={comp.name} />
                  )}
                  {comp.category === "feedback" && comp.name === "Toast" && (
                    <ToastPreview />
                  )}
                  {comp.category === "feedback" && comp.name === "Tooltip" && (
                    <TooltipPreview />
                  )}
                  {comp.variants.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {comp.variants.map((v) => (
                        <span
                          key={v}
                          className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteComponent(brandId, comp.id)}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:bg-zinc-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
