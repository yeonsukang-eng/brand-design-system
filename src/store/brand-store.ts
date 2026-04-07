import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BrandSystem, ColorToken, TypographyToken, SpacingToken } from "@/types/brand";
import { axflowBrand } from "@/data/axflow-brand";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

interface BrandStore {
  brands: BrandSystem[];
  activeBrandId: string | null;
  getActiveBrand: () => BrandSystem | undefined;

  // Brand CRUD
  createBrand: (name: string, description: string) => string;
  updateBrand: (id: string, updates: Partial<Pick<BrandSystem, "name" | "description" | "logoUrl">>) => void;
  deleteBrand: (id: string) => void;
  setActiveBrand: (id: string | null) => void;

  // Color tokens
  addColor: (brandId: string, color: Omit<ColorToken, "id">) => void;
  updateColor: (brandId: string, colorId: string, updates: Partial<Omit<ColorToken, "id">>) => void;
  deleteColor: (brandId: string, colorId: string) => void;

  // Typography tokens
  addTypography: (brandId: string, typo: Omit<TypographyToken, "id">) => void;
  updateTypography: (brandId: string, typoId: string, updates: Partial<Omit<TypographyToken, "id">>) => void;
  deleteTypography: (brandId: string, typoId: string) => void;

  // Spacing tokens
  addSpacing: (brandId: string, spacing: Omit<SpacingToken, "id">) => void;
  updateSpacing: (brandId: string, spacingId: string, updates: Partial<Omit<SpacingToken, "id">>) => void;
  deleteSpacing: (brandId: string, spacingId: string) => void;
}

export const useBrandStore = create<BrandStore>()(
  persist(
    (set, get) => ({
      brands: [axflowBrand],
      activeBrandId: "axflow",

      getActiveBrand: () => {
        const state = get();
        return state.brands.find((b) => b.id === state.activeBrandId);
      },

      createBrand: (name, description) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newBrand: BrandSystem = {
          id,
          name,
          description,
          colors: [],
          typography: [],
          spacing: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          brands: [...state.brands, newBrand],
          activeBrandId: id,
        }));
        return id;
      },

      updateBrand: (id, updates) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
          ),
        }));
      },

      deleteBrand: (id) => {
        set((state) => ({
          brands: state.brands.filter((b) => b.id !== id),
          activeBrandId: state.activeBrandId === id ? null : state.activeBrandId,
        }));
      },

      setActiveBrand: (id) => set({ activeBrandId: id }),

      addColor: (brandId, color) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? { ...b, colors: [...b.colors, { ...color, id: generateId() }], updatedAt: new Date().toISOString() }
              : b
          ),
        }));
      },

      updateColor: (brandId, colorId, updates) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? {
                  ...b,
                  colors: b.colors.map((c) => (c.id === colorId ? { ...c, ...updates } : c)),
                  updatedAt: new Date().toISOString(),
                }
              : b
          ),
        }));
      },

      deleteColor: (brandId, colorId) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? { ...b, colors: b.colors.filter((c) => c.id !== colorId), updatedAt: new Date().toISOString() }
              : b
          ),
        }));
      },

      addTypography: (brandId, typo) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? { ...b, typography: [...b.typography, { ...typo, id: generateId() }], updatedAt: new Date().toISOString() }
              : b
          ),
        }));
      },

      updateTypography: (brandId, typoId, updates) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? {
                  ...b,
                  typography: b.typography.map((t) => (t.id === typoId ? { ...t, ...updates } : t)),
                  updatedAt: new Date().toISOString(),
                }
              : b
          ),
        }));
      },

      deleteTypography: (brandId, typoId) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? { ...b, typography: b.typography.filter((t) => t.id !== typoId), updatedAt: new Date().toISOString() }
              : b
          ),
        }));
      },

      addSpacing: (brandId, spacing) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? { ...b, spacing: [...b.spacing, { ...spacing, id: generateId() }], updatedAt: new Date().toISOString() }
              : b
          ),
        }));
      },

      updateSpacing: (brandId, spacingId, updates) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? {
                  ...b,
                  spacing: b.spacing.map((s) => (s.id === spacingId ? { ...s, ...updates } : s)),
                  updatedAt: new Date().toISOString(),
                }
              : b
          ),
        }));
      },

      deleteSpacing: (brandId, spacingId) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === brandId
              ? { ...b, spacing: b.spacing.filter((s) => s.id !== spacingId), updatedAt: new Date().toISOString() }
              : b
          ),
        }));
      },
    }),
    {
      name: "brand-design-system",
      version: 1,
      migrate: () => ({
        brands: [axflowBrand],
        activeBrandId: "axflow",
      }),
    }
  )
);
