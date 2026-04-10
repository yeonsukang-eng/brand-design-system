"use client";

import { ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import { useLocale } from "@/contexts/locale";
import "./form-preview.css";

function TextInputPreview({ state, t }: { state: string; t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const isFocused = state === "focused";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <label className={`axform-label ${isError ? "axform-label-error" : ""} ${isDisabled ? "axform-label-disabled" : ""}`}>
        {t("라벨", "Label")}
      </label>
      <input
        type="text"
        className={`axform-input ${state}`}
        placeholder={isFilled ? "" : t("플레이스홀더", "Placeholder")}
        defaultValue={isFilled ? t("입력 텍스트", "Input text") : isError ? t("잘못된 값", "Invalid value") : ""}
        disabled={isDisabled}
        autoFocus={isFocused}
        readOnly
      />
      {isError && <span className="axform-helper error">{t("오류 메시지", "Error message")}</span>}
      {!isError && state === "normal" && <span className="axform-helper">{t("도움말 텍스트", "Helper text")}</span>}
    </div>
  );
}

function TextareaPreview({ state, t }: { state: string; t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <label className={`axform-label ${isError ? "axform-label-error" : ""} ${isDisabled ? "axform-label-disabled" : ""}`}>
        {t("라벨", "Label")}
      </label>
      <textarea
        className={`axform-textarea ${state}`}
        placeholder={isFilled ? "" : t("플레이스홀더", "Placeholder")}
        defaultValue={isFilled ? t("텍스트 내용", "Textarea content") : isError ? t("잘못된 내용", "Invalid content") : ""}
        disabled={isDisabled}
        rows={3}
        readOnly
      />
      {isError && <span className="axform-helper error">{t("오류 메시지", "Error message")}</span>}
    </div>
  );
}

function DropdownPreview({ state, t }: { state: string; t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  const isDisabled = state === "disabled";
  const isFocused = state === "focused";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <label className={`axform-label ${isDisabled ? "axform-label-disabled" : ""}`}>
        {t("라벨", "Label")}
      </label>
      <div className={`axform-select ${state}`}>
        <span className={isFilled ? "axform-select-value" : "axform-select-placeholder"}>
          {isFilled ? t("선택된 항목", "Selected item") : t("플레이스홀더", "Placeholder")}
        </span>
        {isFocused ? <ChevronUp size={16} className="axform-select-icon" /> : <ChevronDown size={16} className="axform-select-icon" />}
      </div>
      {isFocused && (
        <div className="axform-dropdown-list">
          <div className="axform-list-item">
            <Plus size={14} /> {t("목록 항목", "list field")}
          </div>
          <div className="axform-list-item hovered">
            <Plus size={14} /> {t("목록 항목", "list field")}
          </div>
          <div className="axform-list-item disabled">
            <Plus size={14} /> {t("목록 항목", "list field")}
          </div>
        </div>
      )}
    </div>
  );
}

function ListItemPreview({ state, t }: { state: string; t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  return (
    <div className="axform-field" style={{ width: 200 }}>
      <div className={`axform-list-item-standalone ${state}`}>
        <Plus size={14} /> {t("목록 항목", "list field")}
      </div>
    </div>
  );
}

function SearchPreview({ state, t }: { state: string; t: <T extends React.ReactNode>(ko: T, en: T) => T }) {
  const isFocused = state === "focused";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <div className={`axform-search ${state}`}>
        <Search size={16} className="axform-search-icon" />
        <span className={isFilled ? "axform-select-value" : "axform-select-placeholder"}>
          {isFilled ? t("검색 텍스트", "Search text") : t("플레이스홀더", "Placeholder")}
        </span>
      </div>
      {isFocused && (
        <div className="axform-dropdown-list">
          <div className="axform-list-item"><Plus size={14} /> {t("목록 항목", "list field")}</div>
          <div className="axform-list-item hovered"><Plus size={14} /> {t("목록 항목", "list field")}</div>
          <div className="axform-list-item disabled"><Plus size={14} /> {t("목록 항목", "list field")}</div>
        </div>
      )}
    </div>
  );
}

export function FormPreview({ componentName }: { componentName: string }) {
  const { t } = useLocale();

  if (componentName === "Search") {
    const states = ["normal", "focused", "filled", "disabled"];
    return (
      <div className="flex flex-wrap gap-4 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 items-start">
        {states.map((state) => (
          <div key={state} className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-400 uppercase">{state}</span>
            <SearchPreview state={state} t={t} />
          </div>
        ))}
      </div>
    );
  }

  if (componentName === "Dropdown") {
    const states = ["normal", "focused", "filled", "disabled"];
    return (
      <div className="flex flex-wrap gap-4 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 items-start">
        {states.map((state) => (
          <div key={state} className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-400 uppercase">{state}</span>
            <DropdownPreview state={state} t={t} />
          </div>
        ))}
      </div>
    );
  }

  if (componentName === "List Item") {
    const states = ["normal", "hovered", "disabled"];
    return (
      <div className="flex flex-wrap gap-4 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 items-start">
        {states.map((state) => (
          <div key={state} className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-400 uppercase">{state}</span>
            <ListItemPreview state={state} t={t} />
          </div>
        ))}
      </div>
    );
  }

  const states = ["normal", "focused", "filled", "error", "disabled"];
  return (
    <div className="flex flex-wrap gap-4 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
      {states.map((state) => (
        <div key={state} className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 uppercase">{state}</span>
          {componentName === "Text Input" ? (
            <TextInputPreview state={state} t={t} />
          ) : (
            <TextareaPreview state={state} t={t} />
          )}
        </div>
      ))}
    </div>
  );
}
