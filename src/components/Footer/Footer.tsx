import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useCallback } from 'react';

const handleClickTopButton = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
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

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles['footer__logo-container']}>
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Nice Gadgets Homepage"
          >
            <img
              className={styles.footer__logo}
              src="./img/logo.avif"
              alt="Nice Gadgets Logo"
              loading="lazy"
            />
          </Link>
        </div>

        <nav
          className={styles.footer__navigation}
          aria-label="Footer Navigation"
        >
          <ul className={styles['footer__navigation-list']}>
            <li className={styles['footer__navigation-item']}>
              <a
                // eslint-disable-next-line max-len
                href="https://github.com/dmytro-popovych/portfolio_nice-gadgets_react_ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className={styles['footer__navigation-item']}>
              <a
                href="https://www.linkedin.com/in/dmytro-popovych-b40924293/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </li>
            <li className={styles['footer__navigation-item']}>
              <Link to="/rights">Rights</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={handleClickTopButton}
          className={styles.footer__button}
          aria-label="Scroll back to top"
        >
          <span className={styles['footer__button-text']}>Back to top</span>
          <img
            className={styles['footer__button-icon']}
            src="./icons/chevron-arrow-right.avif"
            aria-hidden="true"
            loading="lazy"
          />
        </button>
      </div>
    </footer>
  );
};
