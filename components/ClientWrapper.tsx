"use client";

import { useEffect } from "react";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/productStore";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

interface Props {
  products: Product[];
}

export default function ClientWrapper({ products }: Props) {
  const setProducts = useProductStore(state => state.setProducts);
  const loadFavorites = useProductStore(state => state.loadFavorites);

  useEffect(() => {
    setProducts(products);
    loadFavorites();
  }, [products, setProducts, loadFavorites]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchBar />
        <CategoryFilter />
      </div>
      <ProductGrid />
    </div>
  );
}
