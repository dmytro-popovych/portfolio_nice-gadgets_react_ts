import React, { useCallback, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { HEADER_ICONS } from '../../utils/constants';
import { Navigation } from '../Navigation';
// eslint-disable-next-line max-len
import { useCartAndFavouritesCount } from '../../utils/hooks/useCartAndFavouritesCount';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleClickTopButton = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { cartCount, favouritesCount } = useCartAndFavouritesCount();
  const { pathname } = useLocation();

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === '/') {
        e.preventDefault();
        handleClickTopButton();
      }
    },
    [pathname],
  );

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMenuOpen);

    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, [setIsMenuOpen]);

  const renderIconLink = (icon: string, count: number) => {
    const displayCount = count > 0 ? count : null;
    const badgeText = displayCount
      ? displayCount > 99
        ? '99+'
        : displayCount
      : null;

    return (
      <NavLink
        to={icon}
        className={({ isActive }) =>
          classNames(styles.icons__item, {
            [styles['icons__item--active']]: isActive,
          })
        }
        key={icon}
      >
        <button>
          <img
            src={`./icons/${icon}.avif`}
            alt={`${icon} icon`}
            className={styles.icons__icon}
            loading="lazy"
          />
          {count ? (
            <span className={styles['icons__count-badge']}>{badgeText}</span>
          ) : null}
        </button>
      </NavLink>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <Link to="/" className={styles.logo} onClick={handleLogoClick}>
          <img
            className={styles.logo__img}
            src="./img/logo.avif"
            alt="Logo Nice Gadgets"
            loading="lazy"
          />
        </Link>
        <Navigation />
      </div>
      <div className={styles.icons}>
        {HEADER_ICONS.map(icon => {
          const count =
            icon === 'cart'
              ? cartCount
              : icon === 'favourites'
                ? favouritesCount
                : 0;

          return renderIconLink(icon, count);
        })}
        <div
          className={classNames(
            styles.icons__item,
            styles['icons__item--mobile'],
          )}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMenu();
            }
          }}
        >
          <img
            src={isMenuOpen ? './icons/close.avif' : './icons/menu.avif'}
            alt={isMenuOpen ? 'Close menu' : 'Open menu'}
            className={styles.icons__icon}
            loading="lazy"
          />
        </div>
      </div>
    </header>
  );
};
