import React, { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Aside.module.scss';
import { HEADER_ICONS, HEADER_NAVIGATION_LINKS } from '../../utils/constants';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
// eslint-disable-next-line max-len
import { useCartAndFavouritesCount } from '../../utils/hooks/useCartAndFavouritesCount';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const Aside: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const isMobile = useIsMobile();

  const { cartCount, favouritesCount } = useCartAndFavouritesCount();

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen, setIsMenuOpen]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  if (!isMobile) {
    return null;
  }

  const formatBadgeCount = (count: number): string | number | null => {
    if (count <= 0) {
      return null;
    }

    return count > 99 ? '99+' : count;
  };

  return (
    <aside
      className={classNames(styles.aside, {
        [styles['aside--open']]: isMenuOpen,
      })}
      aria-hidden={!isMenuOpen}
    >
      <nav className={styles.nav} aria-label="Mobile Navigation">
        <ul className={styles.nav__list}>
          {HEADER_NAVIGATION_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
                onClick={handleCloseMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.icons}>
        {HEADER_ICONS.map(icon => {
          let badgeText: string | number | null = null;
          let ariaLabel = '';

          if (icon === 'cart') {
            badgeText = formatBadgeCount(cartCount);
            ariaLabel = `View Cart${badgeText ? ` (${badgeText} items)` : ''}`;
          } else if (icon === 'favourites') {
            badgeText = formatBadgeCount(favouritesCount);
            ariaLabel = `View Favourites${badgeText ? ` (${badgeText} items)` : ''}`;
          } else {
            ariaLabel = `View ${icon}`;
          }

          return (
            <div key={icon} className={styles.icons__item}>
              <NavLink
                to={icon}
                className={({ isActive }) =>
                  classNames(styles.icons__link, {
                    [styles['icons__link--active']]: isActive,
                  })
                }
                onClick={handleCloseMenu}
                aria-label={ariaLabel}
              >
                <img
                  src={`./icons/${icon}.avif`}
                  alt={`${icon} icon`}
                  className={styles.icons__icon}
                  loading="lazy"
                  aria-hidden="true"
                />

                {icon === 'cart' && cartCount ? (
                  <span className={styles['icons__count-badge']}>
                    {formatBadgeCount(cartCount)}
                  </span>
                ) : null}

                {badgeText !== null && (
                  <span
                    className={styles['icons__count-badge']}
                    aria-hidden="true"
                  >
                    {badgeText}
                  </span>
                )}
              </NavLink>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
