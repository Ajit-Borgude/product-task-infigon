import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  favorites: number[];
  search: string;
  category: string;

  setProducts: (products: Product[]) => void;
  toggleFavorite: (id: number) => void;
  loadFavorites: () => void;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  favorites: [],
  search: "",
  category: "all",

  setProducts: (products) => set({ products }),

  loadFavorites: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("favorites");
    if (!stored) {
      set({ favorites: [] });
      return;
    }

    try {
      set({ favorites: JSON.parse(stored) });
    } catch {
      set({ favorites: [] });
    }
  },

  toggleFavorite: (id) => {
    const favorites = get().favorites.includes(id)
      ? get().favorites.filter(f => f !== id)
      : [...get().favorites, id];

    localStorage.setItem("favorites", JSON.stringify(favorites));
    set({ favorites });
  },

  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
}));
