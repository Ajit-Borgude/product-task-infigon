"use client";

import { useProductStore } from "@/store/productStore";

export default function SearchBar() {
  const setSearch = useProductStore(state => state.setSearch);

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 border rounded"
      aria-label="Search products"
    />
  );
}
