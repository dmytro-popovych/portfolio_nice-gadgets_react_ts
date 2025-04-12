import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useCartAndFavourites } from '../../utils/hooks/useCartAndFavorites';

type ProductCardProps = {
  product: Product;
  key: number;
  isLoading: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  key,
  isLoading,
}) => {
  const { handleAddToCart, isFavorite, handleToggleFavorite } =
    useCartAndFavourites(product);
  const { pathname } = useLocation();
  const hotPrice = (product.fullPrice ?? 0) > (product.price ?? 0);

  const visibilityClass = isLoading ? styles['not-visible'] : '';
  const skeletonClass = isLoading ? styles.skeleton : '';
  const skeletonItemClass = isLoading ? styles.skeleton__item : '';

  return (
    <div
      key={key}
      className={classNames(styles['product-card'], skeletonClass)}
    >
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ from: pathname }}
        className={styles['product-card__link']}
        aria-label={`View details for ${product.name}`}
      >
        <div
          className={classNames(
            styles['product-card__img-container'],
            skeletonItemClass,
          )}
        >
          <img
            className={classNames(styles['product-card__img'], visibilityClass)}
            src={`./${product.image}`}
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className={classNames(skeletonItemClass)}>
          <h2
            className={classNames(
              styles['product-card__title'],
              visibilityClass,
            )}
          >
            {product.name}
          </h2>
        </div>
      </Link>

      <div
        className={classNames(
          styles['product-card__prices'],
          skeletonItemClass,
        )}
      >
        <span
          className={classNames(styles['product-card__price'], visibilityClass)}
        >
          ${product.price}
        </span>
        {hotPrice && (
          <span
            className={classNames(
              styles['product-card__hot-price'],
              visibilityClass,
            )}
          >
            ${product.fullPrice}
          </span>
        )}
      </div>

      <div
        className={classNames(
          styles['product-card__description'],
          skeletonItemClass,
        )}
      >
        <div
          className={classNames(
            styles['product-card__description-item'],
            visibilityClass,
          )}
        >
          <p className={styles['product-card__description-title']}>Screen</p>
          <p className={styles['product-card__description-value']}>
            {product.screen}
          </p>
        </div>

        <div
          className={classNames(
            styles['product-card__description-item'],
            visibilityClass,
          )}
        >
          <p className={styles['product-card__description-title']}>Capacity</p>
          <p className={styles['product-card__description-value']}>
            {product.capacity}
          </p>
        </div>

        <div
          className={classNames(
            styles['product-card__description-item'],
            visibilityClass,
          )}
        >
          <p className={styles['product-card__description-title']}>RAM</p>
          <p className={styles['product-card__description-value']}>
            {product.ram}
          </p>
        </div>
      </div>

      <div
        className={classNames(
          styles['product-card__buttons'],
          skeletonItemClass,
        )}
      >
        <button
          type="button"
          onClick={handleAddToCart}
          className={classNames(
            styles['product-card__button-add'],
            visibilityClass,
          )}
        >
          Add to cart
        </button>

        <button
          type="button"
          onClick={handleToggleFavorite}
          className={classNames(
            styles['product-card__button-favourites'],
            { [styles['product-card__button-favourites--active']]: isFavorite },
            visibilityClass,
          )}
          aria-label={
            isFavorite ? 'Remove from Favourites' : 'Add to Favourites'
          }
          aria-pressed={isFavorite ?? undefined}
        >
          <img
            src="./icons/favourites.avif"
            alt="Favourites icon"
            className={classNames(styles['product-card__button-icon'], {
              [styles['product-card__button-icon--active']]: !isFavorite,
            })}
            aria-hidden="true"
            loading="lazy"
          />

          <img
            src="./icons/favourites-active.avif"
            alt="Favourites icon"
            className={classNames(styles['product-card__button-icon'], {
              [styles['product-card__button-icon--active']]: isFavorite,
            })}
            aria-hidden="true"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
};
