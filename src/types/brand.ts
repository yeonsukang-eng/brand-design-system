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

export interface BrandSystem {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  createdAt: string;
  updatedAt: string;
}
