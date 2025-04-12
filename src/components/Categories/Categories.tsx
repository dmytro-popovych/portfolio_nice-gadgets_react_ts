import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
// eslint-disable-next-line max-len
import { filterProductsByCategory } from '../../utils/functions/filterProductsByCategory';

interface CategoryProps {
  to: string;
  imgSrc: string;
  title: string;
  itemCount: number;
}

const Category: React.FC<CategoryProps> = ({
  to,
  imgSrc,
  title,
  itemCount,
}) => {
  const formatItemCount = (count: number): string => {
    if (count === 1) {
      return '1 model';
    }

    return `${count} models`;
  };

  return (
    <div className={styles.category__item}>
      <Link
        to={to}
        className={styles.category__link}
        aria-label={`View ${title}`}
      >
        <div className={styles['category__img-container']}>
          <img
            className={styles.category__img}
            src={imgSrc}
            alt={`${title} category`}
            loading="lazy"
          />
        </div>
      </Link>
      <Link className={styles.category__subtitle} to={to}>
        {title}
      </Link>
      <p
        className={styles['category__total-items']}
      >{`${formatItemCount(itemCount)} models`}</p>
    </div>
  );
};

export const Categories: React.FC = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const categoryCounts = useMemo(() => {
    const phones = filterProductsByCategory(products, 'phones');
    const tablets = filterProductsByCategory(products, 'tablets');
    const accessories = filterProductsByCategory(products, 'accessories');

    return {
      phones: phones.length,
      tablets: tablets.length,
      accessories: accessories.length,
    };
  }, [products]);

  return (
    <section className={styles.category} aria-labelledby="category-title">
      <h2 id="category-title" className={styles.category__title}>
        Shop by category
      </h2>
      <div className={styles.category__items}>
        <Category
          to="/phones"
          imgSrc="./img/mobile-phones-category.avif"
          title="Mobile phones"
          itemCount={categoryCounts.phones}
        />
        <Category
          to="/tablets"
          imgSrc="./img/tablets-category.avif"
          title="Tablets"
          itemCount={categoryCounts.tablets}
        />
        <Category
          to="/accessories"
          imgSrc="./img/accessories-category.avif"
          title="Accessories"
          itemCount={categoryCounts.accessories}
        />
      </div>
    </section>
  );
};
