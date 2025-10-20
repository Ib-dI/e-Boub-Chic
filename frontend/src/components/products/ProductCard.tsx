import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const stockStatus = product.stock > 0 ? "En stock" : "Rupture";
  const stockVariant = product.stock > 0 ? "default" : "destructive";
  const isLowStock = product.stock > 0 && product.stock < 5;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group h-full w-[205px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-300">
        
        {/* Image Container avec Overlay */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              {/* Overlay sombre au hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-gray-400 text-sm">Pas d'image</span>
            </div>
          )}

          {/* Badge Catégorie - Coin supérieur droit */}
          <div className="absolute top-3 right-3 z-10">
            <Badge 
              variant="secondary" 
              className="bg-white/95 backdrop-blur-sm text-gray-900 font-medium hover:bg-white"
            >
              {product.category.name}
            </Badge>
          </div>

          {/* Badge Stock - Coin supérieur gauche */}
          <div className="absolute top-3 left-3 z-10">
            <Badge 
              variant={stockVariant}
              className={isLowStock ? "bg-orange-500 text-white" : ""}
            >
              {isLowStock ? "Stock limité" : stockStatus}
            </Badge>
          </div>

          {/* Icône Wishlist - Coin inférieur droit au hover */}
          <button
            className="absolute bottom-3 right-3 z-10 p-2 bg-white rounded-full shadow-md opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-red-50"
            onClick={(e) => {
              e.preventDefault();
              // À implémenter plus tard
            }}
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex flex-col p-4">
          
          {/* Catégorie Texte (optionnel - peut être supprimé) */}
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
            {product.category.name}
          </p>

          {/* Nom du Produit */}
          <h3 className="line-clamp-2 font-bricolage truncate text-base font-bold text-gray-900 leading-tight mb-1">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-500 flex-grow">
              {product.description}
            </p>
          )}

          {/* Séparateur */}
          <div className="my-3 border-t border-gray-100" />

          {/* Prix et Stock */}
          <div className="flex items-center flex-col mb-3">
            <span className="text-2xl font-bricolage font-bold text-gray-900">
                {product.price.toFixed(2)}€
              </span>
            

            {/* Badge Stock Visuel */}
            <div className="flex items-center gap-1">
              {product.stock > 0 ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600">Stock ✓</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs text-gray-600">Rupture</span>
                </div>
              )}
              <div className="">
                {product.stock > 0 && (
                  <span className={`text-xs font-medium ${
                    isLowStock ? "text-orange-600" : "text-gray-500"
                  }`}>
                    {product.stock} disponible{product.stock > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bouton CTA */}
          <Button
            className={`w-full transition-all duration-300 font-semibold ${
              product.stock > 0
                ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter au panier
              </>
            ) : (
              "Stock épuisé"
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}