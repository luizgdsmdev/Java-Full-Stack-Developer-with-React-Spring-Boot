import { useState } from 'react';

type SortOption = '' | 'asc' | 'desc' | 'popularity';

interface UseProductSortReturn {
  sortByValue: SortOption;
  handleSortChange: (value: SortOption) => void;
  sortProducts: <T extends { price: number; popularity?: number }>(
    products: T[]
  ) => T[];
}

export function useProductSort(defaultSort: SortOption = 'popularity'): UseProductSortReturn {
  const [sortByValue, setSortByValue] = useState<SortOption>(defaultSort);

  const handleSortChange = (value: SortOption) => {
    setSortByValue(value);
  };

  const sortProducts = <T extends { price: number; popularity?: number }>(
    products: T[]
  ): T[] => {
    const copy = [...products]; // Avoid mutating the original array

    if (sortByValue === 'desc') {
      return copy.sort((a, b) => b.price - a.price);
    }
    if (sortByValue === 'asc') {
      return copy.sort((a, b) => a.price - b.price);
    }
    // default: popularity (highest → lowest)
    return copy.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  };

  return {
    sortByValue,
    handleSortChange,
    sortProducts,
  };
}