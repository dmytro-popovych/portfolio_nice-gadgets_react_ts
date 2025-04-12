import { Product } from '../../types/Product';

export const filterProductsByCategory = (
  products: Product[],
  category: string,
): Product[] => {
  const lowerCaseCategory = category?.toLowerCase() || '';

  return products.filter(
    product => product.category?.toLowerCase() === lowerCaseCategory,
  );
};
