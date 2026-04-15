import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BrandSystem, ColorToken, TypographyToken, SpacingToken, IconToken, ElevationToken, ComponentToken } from "@/types/brand";
import { axflowBrand } from "@/data/axflow-brand";
import { spireBrand } from "@/data/spire-brand";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

interface BrandStore {
  brands: BrandSystem[];
  activeBrandId: string | null;
  getActiveBrand: () => BrandSystem | undefined;

  createBrand: (name: string, description: string) => string;
  updateBrand: (id: string, updates: Partial<Pick<BrandSystem, "name" | "description" | "logoUrl">>) => void;
  deleteBrand: (id: string) => void;
  setActiveBrand: (id: string | null) => void;

  addColor: (brandId: string, color: Omit<ColorToken, "id">) => void;
  updateColor: (brandId: string, colorId: string, updates: Partial<Omit<ColorToken, "id">>) => void;
  deleteColor: (brandId: string, colorId: string) => void;

  addTypography: (brandId: string, typo: Omit<TypographyToken, "id">) => void;
  updateTypography: (brandId: string, typoId: string, updates: Partial<Omit<TypographyToken, "id">>) => void;
  deleteTypography: (brandId: string, typoId: string) => void;

  addSpacing: (brandId: string, spacing: Omit<SpacingToken, "id">) => void;
  updateSpacing: (brandId: string, spacingId: string, updates: Partial<Omit<SpacingToken, "id">>) => void;
  deleteSpacing: (brandId: string, spacingId: string) => void;

  addIcon: (brandId: string, icon: Omit<IconToken, "id">) => void;
  updateIcon: (brandId: string, iconId: string, updates: Partial<Omit<IconToken, "id">>) => void;
  deleteIcon: (brandId: string, iconId: string) => void;

  addComponent: (brandId: string, component: Omit<ComponentToken, "id">) => void;
  updateComponent: (brandId: string, componentId: string, updates: Partial<Omit<ComponentToken, "id">>) => void;
  deleteComponent: (brandId: string, componentId: string) => void;
}

function updateBrandTokens<T>(
  brands: BrandSystem[],
  brandId: string,
  field: keyof BrandSystem,
  updater: (items: T[]) => T[]
): BrandSystem[] {
  return brands.map((b) =>
    b.id === brandId
      ? { ...b, [field]: updater(b[field] as T[]), updatedAt: new Date().toISOString() }
      : b
  );
}

export const useBrandStore = create<BrandStore>()(
  persist(
    (set, get) => ({
      brands: [axflowBrand, spireBrand],
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
          icons: [],
          elevations: [],
          components: [],
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

      // Colors
      addColor: (brandId, color) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "colors", (items: ColorToken[]) => [...items, { ...color, id: generateId() }]),
        }));
      },
      updateColor: (brandId, colorId, updates) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "colors", (items: ColorToken[]) =>
            items.map((c) => (c.id === colorId ? { ...c, ...updates } : c))
          ),
        }));
      },
      deleteColor: (brandId, colorId) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "colors", (items: ColorToken[]) =>
            items.filter((c) => c.id !== colorId)
          ),
        }));
      },

      // Typography
      addTypography: (brandId, typo) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "typography", (items: TypographyToken[]) => [...items, { ...typo, id: generateId() }]),
        }));
      },
      updateTypography: (brandId, typoId, updates) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "typography", (items: TypographyToken[]) =>
            items.map((t) => (t.id === typoId ? { ...t, ...updates } : t))
          ),
        }));
      },
      deleteTypography: (brandId, typoId) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "typography", (items: TypographyToken[]) =>
            items.filter((t) => t.id !== typoId)
          ),
        }));
      },

      // Spacing
      addSpacing: (brandId, spacing) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "spacing", (items: SpacingToken[]) => [...items, { ...spacing, id: generateId() }]),
        }));
      },
      updateSpacing: (brandId, spacingId, updates) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "spacing", (items: SpacingToken[]) =>
            items.map((s) => (s.id === spacingId ? { ...s, ...updates } : s))
          ),
        }));
      },
      deleteSpacing: (brandId, spacingId) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "spacing", (items: SpacingToken[]) =>
            items.filter((s) => s.id !== spacingId)
          ),
        }));
      },

      // Icons
      addIcon: (brandId, icon) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "icons", (items: IconToken[]) => [...items, { ...icon, id: generateId() }]),
        }));
      },
      updateIcon: (brandId, iconId, updates) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "icons", (items: IconToken[]) =>
            items.map((i) => (i.id === iconId ? { ...i, ...updates } : i))
          ),
        }));
      },
      deleteIcon: (brandId, iconId) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "icons", (items: IconToken[]) =>
            items.filter((i) => i.id !== iconId)
          ),
        }));
      },

      // Components
      addComponent: (brandId, component) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "components", (items: ComponentToken[]) => [...items, { ...component, id: generateId() }]),
        }));
      },
      updateComponent: (brandId, componentId, updates) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "components", (items: ComponentToken[]) =>
            items.map((c) => (c.id === componentId ? { ...c, ...updates } : c))
          ),
        }));
      },
      deleteComponent: (brandId, componentId) => {
        set((state) => ({
          brands: updateBrandTokens(state.brands, brandId, "components", (items: ComponentToken[]) =>
            items.filter((c) => c.id !== componentId)
          ),
        }));
      },
    }),
    {
      name: "brand-design-system",
      version: 32,
      migrate: () => ({
        brands: [axflowBrand, spireBrand],
        activeBrandId: "axflow",
      }),
    }
  )
);
