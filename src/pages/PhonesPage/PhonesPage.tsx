import { useContext, useEffect } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { Products } from '../../components/Products/Products';
// eslint-disable-next-line max-len
import { filterProductsByCategory } from '../../utils/functions/filterProductsByCategory';

export const PhonesPage = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const preparedProducts = filterProductsByCategory(products, 'phones');

  return <Products products={preparedProducts} />;
};
