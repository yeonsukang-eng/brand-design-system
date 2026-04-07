export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  category: "primary" | "secondary" | "accent" | "neutral" | "semantic";
}

export interface TypographyToken {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

export interface SpacingToken {
  id: string;
  name: string;
  value: string;
}

export interface IconToken {
  id: string;
  name: string;
  category: "general" | "action" | "file" | "data" | "user" | "social";
  variants: ("line" | "fill")[];
  size: string;
  figmaNodeId?: string;
}

export interface ComponentToken {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: string[];
}

export interface BrandSystem {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  figmaFileKey?: string;
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  icons: IconToken[];
  components: ComponentToken[];
  createdAt: string;
  updatedAt: string;
}
