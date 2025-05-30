import styles from './HomePage.module.scss';
import { PictureSlider } from '../../components/PictureSlider';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Categories } from '../../components/Categories';
import { HotPrices } from '../../components/HotPrices';
import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>
        <span className={styles['home-page__title--part']}>
          Welcome to Nice
        </span>
        Gadgets store!
      </h1>

      <div className={styles['home-page__picture-slider']}>
        <PictureSlider />
      </div>

      <div className={styles['home-page__brands-new-models']}>
        <BrandNewModels />
      </div>

      <div className={styles['home-page__categories']}>
        <Categories />
      </div>

      <div className={styles['home-page__hot-prices']}>
        <HotPrices />
      </div>
    </div>
  );
};
