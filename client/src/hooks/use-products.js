import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useProducts(category) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const params = category ? { category } : {};
      const { data } = await api.get("/products", { params });
      return data;
    },
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useSearchProducts(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data } = await api.get("/products/search", { params: { q: query } });
      return data;
    },
    enabled: !!query.trim(),
  });
}
