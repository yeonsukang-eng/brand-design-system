"use client";

import "./control-preview.css";

function SegmentedPreview() {
  return (
    <div className="axctrl-segmented">
      <div className="axctrl-segment active">Tab 1</div>
      <div className="axctrl-segment">Tab 2</div>
      <div className="axctrl-segment">Tab 3</div>
    </div>
  );
}

function TabsPreview() {
  return (
    <div className="axctrl-tabs">
      <div className="axctrl-tab active">Tab 1</div>
      <div className="axctrl-tab">Tab 2</div>
      <div className="axctrl-tab">Tab 3</div>
      <div className="axctrl-tab">Tab 4</div>
    </div>
  );
}

function ChipsPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="axctrl-chip selected">Chip</div>
      <div className="axctrl-chip">Chip</div>
      <div className="axctrl-chip">Chip</div>
      <div className="axctrl-chip disabled">Chip</div>
    </div>
  );
}

function CheckboxPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <label className="axctrl-checkbox-wrap">
        <div className="axctrl-checkbox checked"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        Checked
      </label>
      <label className="axctrl-checkbox-wrap">
        <div className="axctrl-checkbox"></div>
        Unchecked
      </label>
      <label className="axctrl-checkbox-wrap">
        <div className="axctrl-checkbox indeterminate"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6H9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
        Mixed
      </label>
      <label className="axctrl-checkbox-wrap disabled">
        <div className="axctrl-checkbox disabled"></div>
        Disabled
      </label>
    </div>
  );
}

function RadioPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <label className="axctrl-radio-wrap">
        <div className="axctrl-radio selected"><div className="axctrl-radio-dot" /></div>
        Selected
      </label>
      <label className="axctrl-radio-wrap">
        <div className="axctrl-radio"></div>
        Unselected
      </label>
      <label className="axctrl-radio-wrap disabled">
        <div className="axctrl-radio disabled"></div>
        Disabled
      </label>
    </div>
  );
}

function TogglePreview() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <div className="axctrl-toggle on"><div className="axctrl-toggle-thumb" /></div>
        <span className="text-sm">On</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="axctrl-toggle off"><div className="axctrl-toggle-thumb" /></div>
        <span className="text-sm">Off</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="axctrl-toggle off disabled"><div className="axctrl-toggle-thumb" /></div>
        <span className="text-sm text-zinc-400">Disabled</span>
      </div>
    </div>
  );
}

export function ControlPreview({ componentName }: { componentName: string }) {
  const previews: Record<string, React.ReactNode> = {
    "Segmented Control": <SegmentedPreview />,
    "Tabs": <TabsPreview />,
    "Chips": <ChipsPreview />,
    "Check box": <CheckboxPreview />,
    "Radio": <RadioPreview />,
    "Toggle": <TogglePreview />,
  };

  const preview = previews[componentName];
  if (!preview) return null;

  return (
    <div className="mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
      {preview}
    </div>
  );
}
