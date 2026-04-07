// @axflow/design-tokens — auto-generated types

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
