"use client";

import { useLocale } from "@/contexts/locale";
import "./control-preview.css";

function SegmentedPreview({ t }: { t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="axctrl-segmented">
      <div className="axctrl-segment active">{t("탭 1", "Tab 1")}</div>
      <div className="axctrl-segment">{t("탭 2", "Tab 2")}</div>
      <div className="axctrl-segment">{t("탭 3", "Tab 3")}</div>
    </div>
  );
}

function TabsPreview({ t }: { t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="axctrl-tabs">
      <div className="axctrl-tab active">{t("탭 1", "Tab 1")}</div>
      <div className="axctrl-tab">{t("탭 2", "Tab 2")}</div>
      <div className="axctrl-tab">{t("탭 3", "Tab 3")}</div>
      <div className="axctrl-tab">{t("탭 4", "Tab 4")}</div>
    </div>
  );
}

function ChipsPreview({ t }: { t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="axctrl-chip selected">{t("칩", "Chip")}</div>
      <div className="axctrl-chip">{t("칩", "Chip")}</div>
      <div className="axctrl-chip">{t("칩", "Chip")}</div>
      <div className="axctrl-chip disabled">{t("칩", "Chip")}</div>
    </div>
  );
}

function CheckboxPreview({ t }: { t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="flex flex-wrap gap-4">
      <label className="axctrl-checkbox-wrap">
        <div className="axctrl-checkbox checked"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        {t("체크됨", "Checked")}
      </label>
      <label className="axctrl-checkbox-wrap">
        <div className="axctrl-checkbox"></div>
        {t("미체크", "Unchecked")}
      </label>
      <label className="axctrl-checkbox-wrap">
        <div className="axctrl-checkbox indeterminate"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6H9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
        {t("혼합", "Mixed")}
      </label>
      <label className="axctrl-checkbox-wrap disabled">
        <div className="axctrl-checkbox disabled"></div>
        {t("비활성화", "Disabled")}
      </label>
    </div>
  );
}

function RadioPreview({ t }: { t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="flex flex-wrap gap-4">
      <label className="axctrl-radio-wrap">
        <div className="axctrl-radio selected"><div className="axctrl-radio-dot" /></div>
        {t("선택됨", "Selected")}
      </label>
      <label className="axctrl-radio-wrap">
        <div className="axctrl-radio"></div>
        {t("미선택", "Unselected")}
      </label>
      <label className="axctrl-radio-wrap disabled">
        <div className="axctrl-radio disabled"></div>
        {t("비활성화", "Disabled")}
      </label>
    </div>
  );
}

function TogglePreview({ t }: { t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <div className="axctrl-toggle on"><div className="axctrl-toggle-thumb" /></div>
        <span className="text-sm">{t("켜짐", "On")}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="axctrl-toggle off"><div className="axctrl-toggle-thumb" /></div>
        <span className="text-sm">{t("꺼짐", "Off")}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="axctrl-toggle off disabled"><div className="axctrl-toggle-thumb" /></div>
        <span className="text-sm text-zinc-400">{t("비활성화", "Disabled")}</span>
      </div>
    </div>
  );
}

export function ControlPreview({ componentName }: { componentName: string }) {
  const { t } = useLocale();

  const previews: Record<string, React.ReactNode> = {
    "Segmented Control": <SegmentedPreview t={t} />,
    "Tabs": <TabsPreview t={t} />,
    "Chips": <ChipsPreview t={t} />,
    "Check box": <CheckboxPreview t={t} />,
    "Radio": <RadioPreview t={t} />,
    "Toggle": <TogglePreview t={t} />,
  };

  const preview = previews[componentName];
  if (!preview) return null;

  return (
    <div className="mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
      {preview}
    </div>
  );
}
