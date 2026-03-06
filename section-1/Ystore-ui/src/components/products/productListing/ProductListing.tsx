import styles from "./ProductListing.module.css";
import ProductCard from "../productCard/ProductCard";
import SearchBox from "../../searchBox/SearchBox";
import { useMemo } from 'react';
import NoProductsMessage from "./NoProductsMessage";
import { useProductSearch } from '../../../hooks/products/useProductSearch';
import { useProductSort } from '../../../hooks/products/useProductSort';

type Product = {
  productId: string;
  name: string;
  description?: string;
  price: number;
  popularity?: number;
};

// Type the component props
interface ProductListingProps {
  products: Product[];
}


function ProductListing({ products }: ProductListingProps) {
  const { searchValue, handleSearchChange, searchTerm } = useProductSearch(100);

  const { sortByValue, handleSortChange, sortProducts } = useProductSort('popularity');

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      String(product?.name || '').toLowerCase().includes(searchTerm) ||
      String(product?.description || '').toLowerCase().includes(searchTerm)
    );

    return sortProducts(filtered);
  }, [products, searchTerm, sortByValue, sortProducts]);

  return (
    <div className={styles.listingsContainer}>
      <SearchBox
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        sortByValue={sortByValue}
        onSortByChange={handleSortChange}
      />
      <div className={styles.productListingsContainer}>
        <div className={styles.productListingsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <NoProductsMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;