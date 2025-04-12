import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <main className={styles['not-found-page']}>
    <h1 className={styles['not-found-page__title']}>Page not found</h1>

    <img
      className={styles['not-found-page__image']}
      src="./img/page-not-found.avif"
      alt="Illustration indicating page not found"
      loading="lazy"
    />
  </main>
);
