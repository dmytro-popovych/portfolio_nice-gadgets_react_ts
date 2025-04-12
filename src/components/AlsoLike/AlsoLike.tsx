import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';
import { ItemCardContext } from '../../contexts/ItemCardContext';

export const AlsoLike = () => {
  const { itemCardState } = useContext(ItemCardContext);
  const { product } = itemCardState;
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const title = 'You may also like';

  const preparedProducts = useMemo(() => {
    const filteredProducts = products.filter(p => p.itemId !== product?.id);

    const shuffled = [...filteredProducts].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 10);
  }, [products, product?.id]);

  return (
    <section aria-label={title}>
      {preparedProducts.length > 0 ? (
        <ProductsSlider products={preparedProducts} title={title} />
      ) : null}
    </section>
  );
};
