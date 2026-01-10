"use client"
import Link from "next/link"
import type { Product } from "@/types/product"
import { useProductStore } from "@/store/productStore"
import { Heart, ArrowRight } from "lucide-react"

export default function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useProductStore()
  const isFavorited = favorites.includes(product.id)

  return (
    <div className="group relative h-full rounded-lg overflow-hidden bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorited ? "bg-black text-red-700 shadow-md" : "bg-white/80 text-gray-700 hover:bg-white"
          }`}
          aria-label="Toggle favorite"
        >
          <Heart size={18} className={isFavorited ? "fill-current" : ""} />
        </button>
      </div>

      <div className="p-2 flex flex-col">
        <span className="capitalize inline-block w-fit px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-2">
          {product.category}
        </span>

        <h2 className="truncate text-base font-semibold text-card-foreground line-clamp-2 mb-2">{product.title}</h2>

        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="bg-black text-white w-full px-3 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:bg-primary/90 active:scale-95"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

