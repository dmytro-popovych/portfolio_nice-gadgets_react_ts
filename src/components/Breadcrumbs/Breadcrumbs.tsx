import { Link, useLocation } from 'react-router-dom';
import { PATH_OPTIONS } from '../../utils/constants';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import classNames from 'classnames';
import { ItemCard } from '../../types/ItemCard';

type BreadcrumbsProps = {
  filteredProduct?: ItemCard | null;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  filteredProduct,
}) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/');

  const currentPath = PATH_OPTIONS.find(
    option => option.label === `/${pathSegments[1]}`,
  );

  const renderBreadcrumbLink = () => (
    <Link
      to={currentPath?.label ?? '/'}
      className={classNames(styles.breadcrumbs__path, {
        [styles['breadcrumbs__path--disabled']]: !filteredProduct,
      })}
      aria-label={`Go to ${currentPath?.value}`}
    >
      {currentPath?.value}
    </Link>
  );

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link
        to="/"
        className={styles.breadcrumbs__path}
        aria-label="Go to Homepage"
      >
        <img
          src="./icons/home.avif"
          alt="Home icon"
          aria-hidden="true"
          loading="lazy"
        />
      </Link>

      {currentPath && (
        <>
          <img
            src="./icons/chevron-arrow-right-disabled.avif"
            alt="Right arrow icon"
            aria-hidden="true"
            loading="lazy"
          />
          {renderBreadcrumbLink()}
        </>
      )}

      {filteredProduct && (
        <>
          <img
            src="./icons/chevron-arrow-right-disabled.avif"
            alt="Right arrow icon"
            aria-hidden="true"
            loading="lazy"
          />
          <span
            className={classNames(
              styles.breadcrumbs__path,
              styles['breadcrumbs__path--disabled'],
            )}
            aria-current="page"
          >
            {filteredProduct.name}
          </span>
        </>
      )}
    </nav>
  );
};
