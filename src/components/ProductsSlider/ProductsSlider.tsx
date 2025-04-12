import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { useWindowWidth } from '../../utils/hooks/useWindowWidth';
import { useTouchSlider } from '../../utils/hooks/useTouchSlider';
import { useLoading } from '../../utils/hooks/useLoading';
import { TIMEOUT_LOADING_DURATION } from '../../utils/constants';

type ProductsSliderProps = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products = [],
  title,
}) => {
  const cardsGap = 16;
  const windowWidth = useWindowWidth();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState<number>(272);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const isLoading = useLoading(TIMEOUT_LOADING_DURATION);

  const calculateVisibleCards = useCallback(
    (containerWidth: number): number => {
      if (containerWidth >= 1200) {
        return 4;
      } else if (containerWidth >= 640) {
        return 2.5;
      } else {
        return 1.5;
      }
    },
    [],
  );

  useEffect(() => {
    if (wrapperRef.current) {
      const containerWidth = wrapperRef.current.offsetWidth;
      const newVisibleCards = calculateVisibleCards(windowWidth);

      setVisibleCards(newVisibleCards);

      if (newVisibleCards > 0) {
        const totalGapSpace = cardsGap * (Math.ceil(newVisibleCards) - 1);
        const widthForCards = containerWidth - totalGapSpace;
        const newCardWidth = widthForCards / newVisibleCards;

        setCardWidth(newCardWidth);
      }

      setCurrentIndex(prevIndex =>
        Math.max(
          0,
          Math.min(
            prevIndex,
            Math.max(0, Math.ceil(products.length - newVisibleCards)),
          ),
        ),
      );
    }
  }, [windowWidth, calculateVisibleCards, cardsGap, products.length]);

  useEffect(() => {
    const maxIndex = Math.max(0, Math.ceil(products.length - visibleCards));

    setCanScrollNext(currentIndex < maxIndex);
  }, [currentIndex, visibleCards, products.length]);

  const handlePrevClick = useCallback(() => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
  }, []);

  const handleNextClick = useCallback(() => {
    if (canScrollNext) {
      const maxIndex = Math.max(0, Math.ceil(products.length - visibleCards));

      setCurrentIndex(prevIndex => Math.min(maxIndex, prevIndex + 1));
    }
  }, [canScrollNext, products.length, visibleCards]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlider(
    handleNextClick,
    handlePrevClick,
  );

  if (!products || products.length === 0) {
    return null;
  }

  const isPrevDisabled = currentIndex === 0;

  return (
    <section className={styles.slider} aria-label={title}>
      <div className={styles.slider__top}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            type="button"
            onClick={handlePrevClick}
            className={classNames(styles.slider__button, {
              [styles['slider__button--disabled']]: isPrevDisabled,
            })}
            disabled={isPrevDisabled}
            aria-label="Previous products"
          >
            <img
              src={
                isPrevDisabled
                  ? './icons/chevron-arrow-left-disabled.avif'
                  : './icons/chevron-arrow-left.avif'
              }
              aria-hidden="true"
              loading="lazy"
            />
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className={classNames(styles.slider__button, {
              [styles['slider__button--disabled']]: !canScrollNext,
            })}
            disabled={!canScrollNext}
            aria-label="Next products"
          >
            <img
              src={
                !canScrollNext
                  ? './icons/chevron-arrow-right-disabled.avif'
                  : './icons/chevron-arrow-right.avif'
              }
              aria-hidden="true"
              loading="lazy"
            />
          </button>
        </div>
      </div>

      <div
        className={styles.slider__slides}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={wrapperRef}
          className={styles.slider__wrapper}
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + cardsGap)}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              style={{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }}
            >
              <ProductCard
                product={product}
                key={product.id}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
