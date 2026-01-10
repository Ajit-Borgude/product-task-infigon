"use client";
import { useProductStore } from "@/store/productStore";
import ProductCard from "./ProductCard";
import { SearchX } from "lucide-react";

export default function ProductGrid() {
  const { products, search, category, favorites } = useProductStore();

  const filtered = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      (category === "favorites" && favorites.includes(product.id)) ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });


  if (!filtered.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <SearchX className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 text-lg font-medium">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
