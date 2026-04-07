import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Read the brand data source
const brandSource = readFileSync(
  resolve(__dirname, "../../../src/data/axflow-brand.ts"),
  "utf-8"
);

// Extract color data
const colorRegex = /\{ id: "([^"]+)", name: "([^"]+)", hex: "([^"]+)", category: "([^"]+)" \}/g;
const colors = [];
let match;
while ((match = colorRegex.exec(brandSource)) !== null) {
  colors.push({ id: match[1], name: match[2], hex: match[3], category: match[4] });
}

// Extract typography data
const typoRegex = /\{ id: "([^"]+)", name: "([^"]+)", fontFamily: "([^"]+)", fontSize: "([^"]+)", fontWeight: "([^"]+)", lineHeight: "([^"]+)" \}/g;
const typography = [];
while ((match = typoRegex.exec(brandSource)) !== null) {
  typography.push({
    id: match[1],
    name: match[2],
    fontFamily: match[3],
    fontSize: match[4],
    fontWeight: match[5],
    lineHeight: match[6],
  });
}

// Extract icon data
const iconRegex = /\{ id: "([^"]+)", name: "([^"]+)", category: "([^"]+)", variants: \[([^\]]*)\], size: "([^"]+)"/g;
const icons = [];
while ((match = iconRegex.exec(brandSource)) !== null) {
  const variants = match[4].replace(/"/g, "").split(", ").filter(Boolean);
  icons.push({ id: match[1], name: match[2], category: match[3], variants, size: match[5] });
}

function toKebab(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

// ============================================================
// 1. CSS Variables
// ============================================================
let css = `:root {\n`;
css += `  /* Colors */\n`;
colors.forEach((c) => {
  css += `  --color-${toKebab(c.name)}: ${c.hex};\n`;
});
css += `\n  /* Typography */\n`;
typography.forEach((t) => {
  const prefix = `--font-${toKebab(t.name)}`;
  css += `  ${prefix}-family: "${t.fontFamily}", -apple-system, BlinkMacSystemFont, sans-serif;\n`;
  css += `  ${prefix}-size: ${t.fontSize};\n`;
  css += `  ${prefix}-weight: ${t.fontWeight};\n`;
  css += `  ${prefix}-line-height: ${t.lineHeight};\n`;
});
css += `}\n`;

writeFileSync(resolve(root, "css/variables.css"), css);

// ============================================================
// 2. CSS Utility Classes
// ============================================================
let classes = `/* axflow Design System — Utility Classes */\n\n`;

classes += `/* Colors */\n`;
colors.forEach((c) => {
  classes += `.color-${toKebab(c.name)} { color: ${c.hex}; }\n`;
  classes += `.bg-${toKebab(c.name)} { background-color: ${c.hex}; }\n`;
});

classes += `\n/* Typography */\n`;
typography.forEach((t) => {
  classes += `.text-${toKebab(t.name)} {\n`;
  classes += `  font-family: "${t.fontFamily}", -apple-system, BlinkMacSystemFont, sans-serif;\n`;
  classes += `  font-size: ${t.fontSize};\n`;
  classes += `  font-weight: ${t.fontWeight};\n`;
  classes += `  line-height: ${t.lineHeight};\n`;
  classes += `}\n`;
});

writeFileSync(resolve(root, "css/classes.css"), classes);

// ============================================================
// 3. JavaScript/TypeScript module
// ============================================================
const jsColors = {};
colors.forEach((c) => {
  jsColors[toKebab(c.name)] = c.hex;
});

const jsTypography = {};
typography.forEach((t) => {
  jsTypography[toKebab(t.name)] = {
    fontFamily: `"${t.fontFamily}", -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: t.fontSize,
    fontWeight: t.fontWeight,
    lineHeight: t.lineHeight,
  };
});

const jsIcons = {};
icons.forEach((i) => {
  jsIcons[i.name] = { category: i.category, variants: i.variants, size: i.size };
});

const jsContent = `// @axflow/design-tokens — auto-generated
// Do not edit manually. Rebuild with: npm run build

export const colors = ${JSON.stringify(jsColors, null, 2)};

export const typography = ${JSON.stringify(jsTypography, null, 2)};

export const icons = ${JSON.stringify(jsIcons, null, 2)};

export const tokens = { colors, typography, icons };

export default tokens;
`;

writeFileSync(resolve(root, "dist/index.js"), `"use strict";\n${jsContent.replace(/^export /gm, "module.exports.")}`
  .replace(/module\.exports\.const /g, "const ")
  .replace(/const colors/g, "const colors")
  + "\nmodule.exports = { colors, typography, icons, tokens: { colors, typography, icons } };\nmodule.exports.default = module.exports;\n"
);

writeFileSync(resolve(root, "dist/index.mjs"), jsContent);

// ============================================================
// 4. TypeScript declarations
// ============================================================
const dts = `// @axflow/design-tokens — auto-generated types

export declare const colors: Record<string, string>;

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

export declare const typography: Record<string, TypographyToken>;

export interface IconToken {
  category: string;
  variants: string[];
  size: string;
}

export declare const icons: Record<string, IconToken>;

export declare const tokens: {
  colors: typeof colors;
  typography: typeof typography;
  icons: typeof icons;
};

export default tokens;
`;

writeFileSync(resolve(root, "dist/index.d.ts"), dts);

// ============================================================
// 5. Tailwind preset
// ============================================================
const tailwindPreset = `// @axflow/design-tokens — Tailwind CSS preset
// Usage: add to tailwind.config.js → presets: [require('@axflow/design-tokens/dist/tailwind-preset')]

module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(jsColors, null, 6).replace(/^/gm, "      ").trim()},
      fontFamily: ${JSON.stringify(
        Object.fromEntries(typography.map((t) => [toKebab(t.name), [t.fontFamily]])),
        null,
        6
      ).replace(/^/gm, "      ").trim()},
    },
  },
};
`;

writeFileSync(resolve(root, "dist/tailwind-preset.js"), tailwindPreset);

console.log("✓ Built @axflow/design-tokens");
console.log(`  ${colors.length} colors, ${typography.length} typography, ${icons.length} icons`);
console.log("  → css/variables.css");
console.log("  → css/classes.css");
console.log("  → dist/index.js (CJS)");
console.log("  → dist/index.mjs (ESM)");
console.log("  → dist/index.d.ts");
console.log("  → dist/tailwind-preset.js");
