import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const HotPrices = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const title = 'Hot prices';

  const preparedProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    const discountedProducts = products.filter(
      product => product.fullPrice > product.price,
    );

    const sortedByDiscount = [...discountedProducts].sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      const discountDiff = discountB - discountA;

      if (discountDiff !== 0) {
        return discountDiff;
      }

      return a.id - b.id;
    });

    return sortedByDiscount.slice(0, 10);
  }, [products]);

  return (
    <div>
      <ProductsSlider products={preparedProducts} title={title} />
    </div>
  );
};
