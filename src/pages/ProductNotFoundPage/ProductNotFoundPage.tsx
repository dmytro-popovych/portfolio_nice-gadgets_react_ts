import styles from './ProductNotFoundPage.module.scss';
import React from 'react';

export const ProductNotFoundPage: React.FC = () => (
  <section
    className={styles['product-not-found-page']}
    aria-label="Product Not Found Section"
  >
    <div className={styles['product-not-found-page__content']}>
      <h1 className={styles['product-not-found-page__title']}>
        Product Not Found
      </h1>

      <div className={styles['product-not-found-page__image-container']}>
        <img
          src="./img/product-not-found.avif"
          className={styles['product-not-found-page__image']}
          alt="Illustration indicating product not found"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);
