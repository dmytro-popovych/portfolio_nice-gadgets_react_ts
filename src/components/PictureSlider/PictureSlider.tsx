import { useCallback, useEffect, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './PictureSlider.module.scss';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
import { useTouchSlider } from '../../utils/hooks/useTouchSlider';
import { TIMEOUT_LOADING_DURATION } from '../../utils/constants';

export const PictureSlider = () => {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const mobileSlides = useMemo(
    () => [
      {
        src: './img/banner-phones-small.avif',
        alt: 'Banner phones',
        link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
      },
      {
        src: './img/banner-tablets-small.avif',
        alt: 'Banner tablets',
        link: '/tablets',
      },
      {
        src: './img/banner-accesories-small.avif',
        alt: 'Banner accessories',
        link: '/accessories',
      },
    ],
    [],
  );

  const desktopSlides = useMemo(
    () => [
      {
        src: './img/banner-phones-large.avif',
        alt: 'Banner phones',
        link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
      },
      {
        src: './img/banner-tablets-large.avif',
        alt: 'Banner tablets',
        link: '/tablets',
      },
      {
        src: './img/banner-accesories-large.avif',
        alt: 'Banner accessories',
        link: '/accessories',
      },
    ],
    [],
  );

  const slides = isMobile ? mobileSlides : desktopSlides;
  const totalSlides = slides.length;

  const extendedSlides = useMemo(
    () => [slides[totalSlides - 1], ...slides, slides[0]],
    [slides, totalSlides],
  );

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (!isAnimating && !isDisabled) {
        setCurrentSlide(slideIndex);
        setIsAnimating(true);
        setIsDisabled(true);
      }
    },
    [isAnimating, isDisabled],
  );

  const nextSlide = useCallback(() => {
    if (!isDisabled) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide, isDisabled]);

  const prevSlide = useCallback(() => {
    if (!isDisabled) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide, isDisabled]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlider(
    nextSlide,
    prevSlide,
  );

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isAnimating) {
      timeoutId = setTimeout(() => {
        setIsAnimating(false);
        setIsDisabled(false);
      }, TIMEOUT_LOADING_DURATION);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating) {
      if (currentSlide === 0) {
        setCurrentSlide(totalSlides);
      } else if (currentSlide === totalSlides + 1) {
        setCurrentSlide(1);
      }
    }
  }, [currentSlide, isAnimating, totalSlides]);

  const transitionStyle = useMemo(
    () => ({
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: isAnimating
        ? `transform ${TIMEOUT_LOADING_DURATION}ms ease-in-out`
        : 'none',
    }),
    [currentSlide, isAnimating],
  );

  return (
    <section
      className={styles.slider}
      aria-roledescription="carousel"
      aria-label="Promotional banner carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slider__main}>
        <button
          type="button"
          className={styles.slider__button}
          onClick={prevSlide}
          aria-label="Previous Slide"
          disabled={isDisabled}
        >
          <img
            className={styles['slider__button-image']}
            src="./icons/chevron-arrow-left.avif"
            alt="Left arrow icon"
            aria-hidden="true"
            loading="lazy"
          />
        </button>

        <div className={styles.slider__slides}>
          {extendedSlides.map((slide, index) => (
            <div
              className={styles.slider__slide}
              key={index}
              style={transitionStyle}
              aria-hidden={index !== currentSlide}
            >
              <NavLink
                to={slide.link}
                tabIndex={index !== currentSlide ? -1 : 0}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={styles.slider__img}
                  loading={index === 1 ? 'eager' : 'lazy'}
                />
              </NavLink>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.slider__button}
          onClick={nextSlide}
          aria-label="Next Slide"
          disabled={isDisabled}
        >
          <img
            className={styles['slider__button-image']}
            src="./icons/chevron-arrow-right.avif"
            alt="Right arrow icon"
            aria-hidden="true"
            loading="lazy"
          />
        </button>
      </div>

      <ul
        className={styles['slider__dots-list']}
        role="tablist"
        aria-label="Slides Navigation"
      >
        {slides.map((_, index) => {
          const slideNumber = index + 1;
          const isActive =
            slideNumber === currentSlide ||
            (currentSlide === 0 && index === totalSlides - 1) ||
            (currentSlide === totalSlides + 1 && index === 0);

          return (
            <li
              key={slideNumber}
              className={classNames(styles['slider__dots-item'], {
                [styles['slider__dots-item--active']]: isActive,
              })}
              role="presentation"
            >
              <button
                type="button"
                className={classNames(styles.slider__dot, {
                  [styles['slider__dot--active']]: isActive,
                })}
                onClick={() => goToSlide(slideNumber)}
                aria-label={`Go to Slide ${slideNumber}`}
                aria-selected={isActive}
                role="tab"
                tabIndex={0}
                disabled={isDisabled}
              ></button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
