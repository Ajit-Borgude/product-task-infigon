"use client";
import { useProductStore } from "@/store/productStore";

const categories = [
  {
    label : "All", value : "all"
  },
  {
    label : "Favorites", value : "favorites"
  },
  {
    label : "Electronics", value : "electronics"
  },
  {
    label : "Jewelery", value : "jewelery"  
  },
  {
    label : "Men's Clothing", value : "men's clothing"
  },
  {
    label : "Women's Clothing", value : "women's clothing"
  }
];


export default function CategoryFilter() {
  const setCategory = useProductStore(state => state.setCategory);

  return (
    <select
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 border rounded"
      aria-label="Filter by category"
    >
      {categories.map(cat => (
        <option key={cat.value} value={cat.value}>{cat.label}</option>
      ))}
    </select>
  );
}
