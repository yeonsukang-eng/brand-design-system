"use client";

import { ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import "./form-preview.css";

function TextInputPreview({ state }: { state: string }) {
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const isFocused = state === "focused";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <label className={`axform-label ${isError ? "axform-label-error" : ""} ${isDisabled ? "axform-label-disabled" : ""}`}>
        Label
      </label>
      <input
        type="text"
        className={`axform-input ${state}`}
        placeholder={isFilled ? "" : "Placeholder"}
        defaultValue={isFilled ? "Input text" : isError ? "Invalid value" : ""}
        disabled={isDisabled}
        autoFocus={isFocused}
        readOnly
      />
      {isError && <span className="axform-helper error">Error message</span>}
      {!isError && state === "normal" && <span className="axform-helper">Helper text</span>}
    </div>
  );
}

function TextareaPreview({ state }: { state: string }) {
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <label className={`axform-label ${isError ? "axform-label-error" : ""} ${isDisabled ? "axform-label-disabled" : ""}`}>
        Label
      </label>
      <textarea
        className={`axform-textarea ${state}`}
        placeholder={isFilled ? "" : "Placeholder"}
        defaultValue={isFilled ? "Textarea content" : isError ? "Invalid content" : ""}
        disabled={isDisabled}
        rows={3}
        readOnly
      />
      {isError && <span className="axform-helper error">Error message</span>}
    </div>
  );
}

function DropdownPreview({ state }: { state: string }) {
  const isDisabled = state === "disabled";
  const isFocused = state === "focused";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <label className={`axform-label ${isDisabled ? "axform-label-disabled" : ""}`}>
        Label
      </label>
      <div className={`axform-select ${state}`}>
        <span className={isFilled ? "axform-select-value" : "axform-select-placeholder"}>
          {isFilled ? "Selected item" : "Placeholder"}
        </span>
        {isFocused ? <ChevronUp size={16} className="axform-select-icon" /> : <ChevronDown size={16} className="axform-select-icon" />}
      </div>
      {isFocused && (
        <div className="axform-dropdown-list">
          <div className="axform-list-item">
            <Plus size={14} /> list field
          </div>
          <div className="axform-list-item hovered">
            <Plus size={14} /> list field
          </div>
          <div className="axform-list-item disabled">
            <Plus size={14} /> list field
          </div>
        </div>
      )}
    </div>
  );
}

function ListItemPreview({ state }: { state: string }) {
  return (
    <div className="axform-field" style={{ width: 200 }}>
      <div className={`axform-list-item-standalone ${state}`}>
        <Plus size={14} /> list field
      </div>
    </div>
  );
}

function SearchPreview({ state }: { state: string }) {
  const isDisabled = state === "disabled";
  const isFocused = state === "focused";
  const isFilled = state === "filled";

  return (
    <div className="axform-field">
      <div className={`axform-search ${state}`}>
        <Search size={16} className="axform-search-icon" />
        <span className={isFilled ? "axform-select-value" : "axform-select-placeholder"}>
          {isFilled ? "Search text" : "Placeholder"}
        </span>
      </div>
      {isFocused && (
        <div className="axform-dropdown-list">
          <div className="axform-list-item"><Plus size={14} /> list field</div>
          <div className="axform-list-item hovered"><Plus size={14} /> list field</div>
          <div className="axform-list-item disabled"><Plus size={14} /> list field</div>
        </div>
      )}
    </div>
  );
}

export function FormPreview({ componentName }: { componentName: string }) {
  if (componentName === "Search") {
    const states = ["normal", "focused", "filled", "disabled"];
    return (
      <div className="flex flex-wrap gap-4 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 items-start">
        {states.map((state) => (
          <div key={state} className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-400 uppercase">{state}</span>
            <SearchPreview state={state} />
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
            <DropdownPreview state={state} />
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
            <ListItemPreview state={state} />
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
            <TextInputPreview state={state} />
          ) : (
            <TextareaPreview state={state} />
          )}
        </div>
      ))}
    </div>
  );
}
