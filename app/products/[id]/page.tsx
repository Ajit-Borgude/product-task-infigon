// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { fetchProductById } from "@/lib/api";
// import { Product } from "@/types/product";

// export default function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     fetchProductById(String(id))
//       .then(setProduct)
//       .catch(() => setError("Failed to load product"));
//   }, [id]);

//   if (error) return <p className="p-4 text-red-500">{error}</p>;
//   if (!product) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
//       {/* Image */}
//       <div className="flex justify-center">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="max-h-96 object-contain"
//         />
//       </div>

//       {/* Details */}
//       <div className="space-y-4">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>

//         <p className="text-gray-500 capitalize">
//           Category: {product.category}
//         </p>

//         <p className="text-xl font-bold">₹ {product.price}</p>

//         <p className="text-sm text-gray-700">{product.description}</p>

//         {/* Rating */}
//         <div className="flex items-center gap-2">
//           <span className="font-medium">
//             ⭐ {product.rating.rate}
//           </span>
//           <span className="text-sm text-gray-500">
//             ({product.rating.count} reviews)
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { fetchProductById } from "@/lib/api"
import type { Product } from "@/types/product"
import { Heart, ChevronLeft, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchProductById(String(id))
      .then(setProduct)
      .catch(() => setError("Failed to load product"))
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black">Loading product details...</p>
        </div>
      </div>
    )
  }

  const originalPrice = Math.round(product.price * 1.4)
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100)

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="w-full bg-card rounded-lg flex items-center justify-center overflow-hidden border border-border sticky top-24">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-contain p-6 aspect-square"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <span className="capitalize inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold tracking-wide rounded-sm">
                {product.category}
              </span>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  } transition-all`}
                />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-black mb-4 text-balance">{product.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-black">{product.rating.rate}</span>
              <span className="text-sm text-muted-foreground">({product.rating.count.toLocaleString()} reviews)</span>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-end gap-4 mb-3">
                <span className="text-4xl font-bold text-black">${product.price.toLocaleString()}</span>
                <span className="text-xl text-muted-foreground line-through">${originalPrice.toLocaleString()}</span>
                <span className="bg-red-500 text-white px-2 py-1 text-sm font-bold rounded-sm">
                  {discountPercent}% off
                </span>
              </div>
              <p className="text-sm text-green-600 font-semibold">Inclusive of all taxes</p>
            </div>

            <div className="space-y-3 mb-8 text-black">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-sm">
                <Truck className="w-5 h-5 text-black mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-black">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">on orders above $999</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-sm">
                <RotateCcw className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">30 Days Return</p>
                  <p className="text-xs text-muted-foreground">Change of mind? No problem</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-sm">
                <Shield className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold ">Secure Checkout</p>
                  <p className="text-xs ">Your payment information is safe</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors text-base">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded transition-colors text-base">
                Buy Now
              </button>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold text-black mb-3">About this item</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-black">Brand:</span> Premium Quality
                </p>
                <p>
                  <span className="font-semibold text-black">Category:</span> {product.category}
                </p>
                <p>
                  <span className="font-semibold text-black">Stock:</span> In Stock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

