import { BrandSystem } from "@/types/brand";
import { axflowBrand } from "@/data/axflow-brand";

export const spireBrand: BrandSystem = {
  id: "spire",
  name: "spire",
  description: "후평산단 디자인 가이드 (spire brand design system)",
  figmaFileKey: "4ZX1ImJ96OTwmlWOHf6hl0",
  colors: [
    // Grayscale (N900 → N0, dark-first)
    { id: "n900", name: "N900 · Header", hex: "#1E1E1E", category: "neutral" },
    { id: "n850", name: "N850 · Bg Layer", hex: "#242424", category: "neutral" },
    { id: "n800", name: "N800 · Input Bg", hex: "#303133", category: "neutral" },
    { id: "n750", name: "N750 · Bg Color", hex: "#3A3A3A", category: "neutral" },
    { id: "n700", name: "N700 · Input Border", hex: "#3F3F3F", category: "neutral" },
    { id: "n650", name: "N650 · Bg Layer Border", hex: "#494949", category: "neutral" },
    { id: "n500", name: "N500", hex: "#8E8E93", category: "neutral" },
    { id: "n400", name: "N400", hex: "#AEAEB2", category: "neutral" },
    { id: "n300", name: "N300", hex: "#C7C7CC", category: "neutral" },
    { id: "n200", name: "N200 · Sub", hex: "#DADADA", category: "neutral" },
    { id: "n100", name: "N100", hex: "#E8E8EE", category: "neutral" },
    { id: "n50", name: "N50 · Font Main", hex: "#F3F3F3", category: "primary" },
    { id: "n0", name: "N0 · White", hex: "#FFFFFF", category: "primary" },

    // Font
    { id: "font-sub", name: "Font Sub (#1E1E1E)", hex: "#1E1E1E", category: "primary" },

    // Point (accent with light tint pair)
    { id: "pt-primary", name: "Color_p", hex: "#FF5F2C", category: "accent" },
    { id: "pt-primary-100", name: "Color_p/100", hex: "#FFE5DC", category: "accent" },

    // System Colors (600 solid + 100 tint pairs)
    { id: "sys-critical", name: "심각/상승", hex: "#E20000", category: "semantic" },
    { id: "sys-critical-100", name: "심각/상승/100", hex: "#FCE5E5", category: "semantic" },
    { id: "sys-warning", name: "경계", hex: "#FF5F2C", category: "semantic" },
    { id: "sys-caution", name: "주의", hex: "#FFCA28", category: "semantic" },
    { id: "sys-caution-100", name: "주의/100", hex: "#FFF8E1", category: "semantic" },
    { id: "sys-info", name: "관심/하락", hex: "#0077FF", category: "semantic" },
    { id: "sys-info-100", name: "관심/하락/100", hex: "#E1EEFF", category: "semantic" },
    { id: "sys-normal", name: "정상", hex: "#00BA16", category: "semantic" },
    { id: "sys-normal-100", name: "정상/100", hex: "#E0F7E3", category: "semantic" },
    { id: "sys-abnormal", name: "이상", hex: "#DADADA", category: "semantic" },
  ],
  // Typography / Icons / Components share axflow's structure (Pretendard).
  typography: axflowBrand.typography.map((t) => ({ ...t })),
  spacing: [
    { id: "sp-4", name: "spacing-4", value: "4px" },
    { id: "sp-8", name: "spacing-8", value: "8px" },
    { id: "sp-12", name: "spacing-12 (Frame margin 최소)", value: "12px" },
    { id: "sp-16", name: "spacing-16", value: "16px" },
    { id: "sp-20", name: "spacing-20", value: "20px" },
    { id: "sp-24", name: "spacing-24", value: "24px" },
    { id: "sp-36", name: "filter-height", value: "36px" },
    { id: "sp-48", name: "menu-height", value: "48px" },
    { id: "radius-12", name: "frame-radius", value: "12px" },
  ],
  icons: axflowBrand.icons.map((i) => ({ ...i })),
  elevations: axflowBrand.elevations.map((e) => ({ ...e })),
  // Components mirror the spire Figma library (crTPXXRYZTTB8G8qg7wC5z) 1:1.
  // Variant axes are spelled as `Axis=Value1|Value2` so designers and devs can cross-reference Figma variants.
  components: [
    // ===== Button =====
    {
      id: "btn-solid-primary",
      name: "Solid/Primary",
      category: "button",
      description: "주 액션 버튼. 배경은 Color_p(#FF5F2C), 텍스트는 White(#FFFFFF).",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "btn-solid-secondary",
      name: "Solid/Secondary",
      category: "button",
      description: "보조 solid 버튼. 배경은 Bg Layer Border, 텍스트는 Font Main.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "btn-outlined-primary",
      name: "Outlined/Primary",
      category: "button",
      description: "Primary outlined 버튼. 보더/텍스트는 Color_p.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "btn-outlined-secondary",
      name: "Outlined/Secondary",
      category: "button",
      description: "Secondary outlined 버튼. 보더는 Bg Layer Border, 텍스트는 Font Main.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "btn-outlined-assistive",
      name: "Outlined/Assistive",
      category: "button",
      description: "보조적 outlined 버튼. 보더는 Input Border, 텍스트는 muted.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "btn-text",
      name: "Text",
      category: "button",
      description: "배경/보더 없는 텍스트 전용 버튼. 텍스트는 Color_p.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },

    // ===== Icon Button =====
    {
      id: "ic-btn-normal",
      name: "Icon/Normal",
      category: "button",
      description: "배경 없는 아이콘 버튼.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "ic-btn-background",
      name: "Icon/Background",
      category: "button",
      description: "Bg Layer Border 배경의 아이콘 버튼.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "ic-btn-outlined",
      name: "Icon/Outlined",
      category: "button",
      description: "Bg Layer Border 보더의 아이콘 버튼.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },
    {
      id: "ic-btn-solid",
      name: "Icon/Solid",
      category: "button",
      description: "Color_p 배경의 아이콘 버튼. 아이콘은 White.",
      variants: ["Size=XL|L|M|S", "State=Normal|Hover|Focus|Pressed|Disabled"],
    },

    // ===== Form =====
    {
      id: "form-text-input",
      name: "Text Input",
      category: "form",
      description: "단일 행 텍스트 입력 필드. 배경은 Input Bg(#303133), 보더는 Input Border.",
      variants: ["Size=XL|L|M|S", "State=Default|Hover|Focus|Filled|Error|Disabled"],
    },
    {
      id: "form-textarea",
      name: "Textarea",
      category: "form",
      description: "멀티라인 텍스트 입력 필드.",
      variants: ["Size=XL|L|M|S", "State=Default|Hover|Focus|Filled|Error|Disabled"],
    },
    {
      id: "form-dropdown",
      name: "Dropdown",
      category: "dropdown",
      description: "셀렉트 드롭다운. 우측 chevron 아이콘, Focus 시 보더는 Color_p.",
      variants: ["Size=XL|L|M|S", "State=Default|Hover|Focus|Filled|Error|Disabled"],
    },

    // ===== Control =====
    {
      id: "ctrl-segmented",
      name: "Segmented Control",
      category: "control",
      description: "관련 뷰/모드 간 전환 토글. Items 수로 분기.",
      variants: ["Items=2|3|4|5"],
    },
    {
      id: "ctrl-tabs",
      name: "Tabs",
      category: "control",
      description: "콘텐츠를 서로 다른 뷰로 구분하는 탭 내비게이션. 선택 시 하단 인디케이터 Color_p.",
      variants: ["State=Selected|Unselected|Hover|Focus|Disabled"],
    },
    {
      id: "ctrl-chip",
      name: "Chip",
      category: "control",
      description: "태그/필터용 캡슐 컴포넌트.",
      variants: ["Style=Solid|Outlined", "State=Default|Selected|Hover|Disabled"],
    },
    {
      id: "ctrl-checkbox",
      name: "Checkbox",
      category: "control",
      description: "다중 선택 체크박스. Checked는 Color_p 배경, ✓ 마크.",
      variants: ["Size=L|M|S", "State=Unchecked|Checked|Hover|Focus|Disabled"],
    },
    {
      id: "ctrl-radio",
      name: "Radio",
      category: "control",
      description: "단일 선택 라디오. Selected 시 보더/도트 Color_p.",
      variants: ["Size=L|M|S", "State=Unselected|Selected|Hover|Focus|Disabled"],
    },
    {
      id: "ctrl-toggle",
      name: "Toggle",
      category: "control",
      description: "온/오프 스위치. On 상태 배경 Color_p.",
      variants: ["Size=L|M|S", "State=Off|On|Hover|Focus|Disabled"],
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
