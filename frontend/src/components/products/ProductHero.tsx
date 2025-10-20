"use client";

import { useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ProductHeroProps {
  onSearch: (query: string) => void;
}

export function ProductHero({ onSearch }: ProductHeroProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-slate-900 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      {/* ---- Effets de fond ---- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[90%] h-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(80,80,255,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-purple-400/10 blur-3xl rounded-full animate-pulse" />
      </div>

      {/* ---- Contenu principal ---- */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge d'accueil */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-8 hover:bg-white/20 transition-all duration-300"
        >
          <Sparkles className="h-4 w-4 text-blue-300" />
          <span className="text-sm font-medium text-white/90">Bienvenue sur E-Boub'Chic</span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bricolage font-black text-white mb-4 leading-tight tracking-tight"
        >
          L’élégance à portée de clic ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-blue-100 mb-3 max-w-2xl mx-auto"
        >
          Découvrez une sélection raffinée de produits tendance et exclusifs.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-blue-200/70 flex items-center justify-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Livraison gratuite dès 50 €
        </motion.p>

        {/* ---- Barre de recherche ---- */}
        <form onSubmit={handleSubmit} className="mt-12 relative">
          <div
            className={`relative group transition-all duration-500 ${
              isFocused ? "scale-[1.03]" : ""
            }`}
          >
            {/* Halo animé */}
            <div
              className={`absolute -inset-[2px] bg-gradient-to-r from-blue-500/70 via-indigo-400/60 to-blue-600/70 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-all`}
            />

            {/* Input */}
            <div className="relative flex items-center gap-2 bg-white/95 backdrop-blur-xl rounded-2xl p-1 shadow-2xl">
              <div className="pl-4">
                <Search className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-600" />
              </div>

              <input
                type="search"
                placeholder="Chercher un produit, une marque..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 bg-transparent px-4 py-4 text-gray-900 placeholder-gray-400 outline-none font-medium text-base"
              />

              <button
                type="submit"
                disabled={!query.trim()}
                className={`mr-1 px-6 sm:px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center gap-2 ${
                  query.trim()
                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Chercher</span>
              </button>
            </div>

            {/* Suggestions */}
            {isFocused && !query && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-24 left-0 right-0 mt-3 p-4 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 text-sm text-gray-700"
              >
                <p className="font-semibold text-gray-900 mb-2">Suggestions populaires</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["T-Shirt", "Robe", "Sneakers", "Accessoires"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setQuery(s);
                        onSearch(s);
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
