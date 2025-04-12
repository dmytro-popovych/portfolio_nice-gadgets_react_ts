import React, { useContext, useMemo } from 'react';
import styles from './ProductsList.module.scss';
import { Product } from '../../types/Product';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductCard } from '../ProductCard';

type ProductsListProps = {
  products: Product[];
  isLoading: boolean;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  isLoading,
}) => {
  const { state } = useContext(ProductsContext);
  const { isSortDropdownOpen, isItemDropdownOpen } = state;

  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      pointerEvents: isSortDropdownOpen || isItemDropdownOpen ? 'none' : 'all',
    }),
    [isSortDropdownOpen, isItemDropdownOpen],
  );

  return (
    <div style={containerStyle} className={`${styles['products-list']}`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} isLoading={isLoading} />
      ))}
    </div>
  );
};
