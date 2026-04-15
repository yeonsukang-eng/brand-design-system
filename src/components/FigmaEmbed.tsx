"use client";

const SPIRE_FILE_KEY = "crTPXXRYZTTB8G8qg7wC5z";

const SPIRE_NODE_MAP: Record<string, string> = {
  "Solid/Primary": "29:242",
  "Solid/Secondary": "29:242",
  "Outlined/Primary": "29:242",
  "Outlined/Secondary": "29:242",
  "Outlined/Assistive": "29:242",
  Text: "29:242",
  "Icon/Normal": "33:322",
  "Icon/Background": "33:322",
  "Icon/Outlined": "33:322",
  "Icon/Solid": "33:322",
  "Text Input": "33:371",
  Textarea: "33:493",
  Dropdown: "33:444",
  "Segmented Control": "23:88",
  Tabs: "34:89",
  Chip: "34:106",
  Checkbox: "34:54",
  Radio: "34:73",
  Toggle: "34:32",
};

export function getFigmaNodeId(componentName: string): string | undefined {
  return SPIRE_NODE_MAP[componentName];
}

export function FigmaEmbed({ componentName, height = 420 }: { componentName: string; height?: number }) {
  const nodeId = getFigmaNodeId(componentName);
  if (!nodeId) return null;
  const url = `https://www.figma.com/design/${SPIRE_FILE_KEY}/?node-id=${nodeId.replace(":", "-")}`;
  const embedSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
      <iframe
        title={`Figma · ${componentName}`}
        src={embedSrc}
        width="100%"
        height={height}
        loading="lazy"
        allowFullScreen
        style={{ display: "block", border: 0 }}
      />
    </div>
  );
}
