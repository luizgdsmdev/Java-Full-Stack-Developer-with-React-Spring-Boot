import { useQuery } from '@tanstack/react-query';
import { fetchProductsAPI } from "../../API/product/ProductFetch";

export function useProducts() {
  return useQuery({
    queryKey: ['products'], // Unique key for cache
    queryFn: fetchProductsAPI,
  });
}