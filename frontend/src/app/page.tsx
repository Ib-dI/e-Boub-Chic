"use client";

import { useState } from "react";
import { useProducts, useSearchProducts } from "@/hooks/useProducts";
import { ProductHero } from "@/components/products/ProductHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Utilise le hook approprié selon qu'on cherche ou non
  const productsQuery = useProducts(skip, 12);
  const searchQuery_hook = useSearchProducts(searchQuery, skip, 12);

  // Choisis les données appropriées
  const isSearching = searchQuery.length > 0;
  const { data, isLoading } = isSearching ? searchQuery_hook : productsQuery;

  const products = data?.data || [];
  const total = data?.total || 0;
  const hasNextPage = skip + 12 < total;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ProductHero onSearch={setSearchQuery} />

      {/* Produits */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {isSearching && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Résultats pour "{searchQuery}" ({total} trouvé{total > 1 ? "s" : ""})
            </h2>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-2"
            >
              Réinitialiser la recherche
            </Button>
          </div>
        )}

        {/* Grille de produits */}
        <ProductGrid products={products} isLoading={isLoading} />

        {/* Pagination */}
        {!isSearching && (
          <div className="mt-12 flex justify-center gap-4">
            <Button
              onClick={() => setSkip(Math.max(0, skip - 12))}
              disabled={skip === 0}
              variant="outline"
            >
              Précédent
            </Button>

            <div className="flex items-center">
              <span className="text-sm text-gray-600">
                Page {Math.floor(skip / 12) + 1} sur {Math.ceil(total / 12)}
              </span>
            </div>

            <Button
              onClick={() => setSkip(skip + 12)}
              disabled={!hasNextPage}
              variant="outline"
            >
              Suivant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}