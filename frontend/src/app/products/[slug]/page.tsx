"use client";

import { motion } from "framer-motion";
import { useProductBySlug } from "@/hooks/useProducts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { data: product, isLoading, isError } = useProductBySlug(slug);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-pulse text-neutral-400 text-lg">Chargement...</div>
      </div>
    );

  if (isError || !product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-2">
          Produit non trouvé
        </h1>
        <p className="text-neutral-600">Désolé, ce produit n'existe pas.</p>
        <Button
          onClick={() => router.back()}
          className="mt-6 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white hover:brightness-110"
        >
          ← Retour
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Bouton retour flottant */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-20 bg-white/70 backdrop-blur-md hover:bg-white shadow-md"
      >
        <ArrowLeft className="h-5 w-5 text-neutral-700" />
      </Button>

      <div className="max-w-6xl mx-auto py-16 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image principale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[480px] bg-neutral-200 rounded-3xl overflow-hidden shadow-sm group"
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">
                Pas d'image
              </div>
            )}
          </motion.div>

          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge
              className="mb-4 px-3 py-1 text-sm bg-amber-100 text-amber-800 font-medium"
            >
              {product.category.name}
            </Badge>

            <h1 className="text-4xl font-semibold font-bricolage text-neutral-900 mb-3">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-500 mb-6">SKU : {product.sku}</p>

            {product.description && (
              <p className="text-neutral-700 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>
            )}

            {/* Prix et stock */}
            <div className="border-t border-neutral-200 pt-6 pb-4 mb-6">
              <div className="flex items-end justify-between">
                <div className="text-5xl font-bold text-neutral-900">
                  {product.price.toFixed(2)}€
                </div>
                <Badge
                  className={`text-sm ${
                    product.stock > 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} en stock`
                    : "Rupture de stock"}
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                disabled={product.stock === 0}
                className="flex-1 text-lg py-6 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white hover:brightness-110 transition-all duration-300"
              >
                {product.stock > 0 ? "🛒 Ajouter au panier" : "Rupture"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                className="flex-1 text-lg py-6 border-neutral-700 text-neutral-800 hover:bg-neutral-100"
              >
                ← Retour
              </Button>
            </div>

            {/* Infos supplémentaires */}
            <div className="mt-10 space-y-4 border-t border-neutral-100 pt-6">
              <div>
                <h3 className="font-semibold text-neutral-900">🚚 Livraison</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Livraison gratuite dès 50€
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">↩️ Retours</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Retour gratuit sous 30 jours
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Galerie d'images */}
        {product.images && product.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {product.images.map((img, i) => (
              <div
                key={i}
                className="relative w-full h-32 rounded-xl overflow-hidden bg-neutral-200 cursor-pointer group"
              >
                <Image
                  src={img}
                  alt={`${product.name}-${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
