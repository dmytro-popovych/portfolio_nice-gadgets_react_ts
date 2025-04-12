import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const BrandNewModels = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const title = 'Brand new models';

  const preparedProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    const sortedProducts = [...products].sort((a, b) => {
      const yearDiff = b.year - a.year;

      if (yearDiff !== 0) {
        return yearDiff;
      }

      return a.id - b.id;
    });

    return sortedProducts.slice(0, 10);
  }, [products]);

  return (
    <div>
      <ProductsSlider products={preparedProducts} title={title} />
    </div>
  );
};
