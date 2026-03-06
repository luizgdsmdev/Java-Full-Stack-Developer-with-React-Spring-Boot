import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';

interface UseProductSearchReturn {
  searchValue: string;
  handleSearchChange: (value: string) => void;
  searchTerm: string;
}

export function useProductSearch(debounceDelay = 100): UseProductSearchReturn {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSetSearch = useMemo(
    () =>
      debounce((newValue: string) => {
        if (typeof newValue === 'string') {
          setSearchValue(newValue);
        } else {
          console.warn('Non-string value received in debounce:', newValue);
          setSearchValue('');
        }
      }, debounceDelay),
    [debounceDelay]
  );

  const handleSearchChange = (value: string) => {
    debouncedSetSearch(value);
  };

  const searchTerm = (searchValue || '').toLowerCase().trim();

  return {
    searchValue,
    handleSearchChange,
    searchTerm,
  };
}