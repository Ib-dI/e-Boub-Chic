import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  images: string[] | null;
  sku: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  skip: number;
  take: number;
}

export const useProducts = (skip: number = 0, take: number = 12) => {
  return useQuery({
    queryKey: ["products", skip, take],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>("/products", {
        params: { skip, take },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${slug}`);
      return data;
    },
    staleTime: 5 * 60 * 1000, 
    enabled: !!slug,
  });
};

export const useProductsByCategory = (categorySlug: string, skip: number = 0, take: number = 12) => {
  return useQuery({
    queryKey: ["products-category", categorySlug, skip, take],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>(
        `/products/category/${categorySlug}`,
        {
          params: { skip, take },
        }
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!categorySlug,
  });
};

export const useSearchProducts = (query: string, skip: number = 0, take: number = 12) => {
  return useQuery({
    queryKey: ["products-search", query, skip, take],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>("/products/search", {
        params: { q: query, skip, take },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!query,
  });
};