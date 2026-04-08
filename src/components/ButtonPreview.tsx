"use client";

import { Star } from "lucide-react";
import "./button-preview.css";

const SIZES = ["large", "medium", "small"] as const;
type Size = (typeof SIZES)[number];

const SIZE_CLASS: Record<Size, string> = {
  large: "btn-lg",
  medium: "btn-md",
  small: "btn-sm",
};

function BaseButton({ label, size, variant, disabled }: {
  label: string;
  size: Size;
  variant: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`axbtn ${variant} ${SIZE_CLASS[size]} ${disabled ? "axbtn-disabled" : ""}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

function IconBtn({ size, variant, disabled }: {
  size: Size;
  variant: string;
  disabled?: boolean;
}) {
  const iconSize = size === "large" ? 20 : size === "medium" ? 18 : 16;
  return (
    <button
      className={`axbtn-icon ${variant} ${SIZE_CLASS[size]} ${disabled ? "axbtn-disabled" : ""}`}
      disabled={disabled}
    >
      <Star size={iconSize} />
    </button>
  );
}

export function ButtonPreview({ componentName }: { componentName: string }) {
  const isIcon = componentName.startsWith("Icon/");

  const variantMap: Record<string, string> = {
    "Solid/Primary": "solid-primary",
    "Outlined/Primary": "outlined-primary",
    "Outlined/Secondary": "outlined-secondary",
    "Outlined/Assistive": "outlined-assistive",
    "Icon/Normal": "icon-normal",
    "Icon/Background": "icon-background",
    "Icon/Outlined": "icon-outlined",
    "Icon/Solid": "icon-solid",
    "Text": "text-btn",
  };

  const variant = variantMap[componentName];
  if (!variant) return null;

  return (
    <div className="flex items-center gap-3 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 flex-wrap">
      {SIZES.map((size) =>
        isIcon ? (
          <IconBtn key={size} size={size} variant={variant} />
        ) : (
          <BaseButton key={size} label="Button" size={size} variant={variant} />
        )
      )}
      <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700 mx-1" />
      {isIcon ? (
        <IconBtn size="large" variant={variant} disabled />
      ) : (
        <BaseButton label="Disabled" size="large" variant={variant} disabled />
      )}
    </div>
  );
}
