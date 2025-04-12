import React, { useContext, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { ProductsContext, SearchOptions } from '../../contexts/ProductsContext';

type PaginationProps = {
  totalItems: number;
};

export const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const { state, dispatch } = useContext(ProductsContext);
  const { itemsPerPage, currentPage } = state;
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = useMemo(() => {
    if (itemsPerPage >= totalItems) {
      return 1;
    }

    if (itemsPerPage <= 0) {
      return 1;
    }

    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const isDisabled = useCallback(
    (page: number): boolean => page < 1 || page > totalPages,
    [totalPages],
  );

  const updatePageInURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      const pageParamKey = SearchOptions.Page;

      if (page > 1) {
        params.set(pageParamKey, String(page));
      } else {
        params.delete(pageParamKey);
      }

      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const changePage = useCallback(
    (newPage: number) => {
      if (!isDisabled(newPage)) {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
        updatePageInURL(newPage);
      }
    },
    [dispatch, isDisabled, updatePageInURL],
  );

  const renderPageNumbers = useMemo<JSX.Element[] | null>(() => {
    if (totalPages <= 1) {
      return null;
    }

    return [...Array(totalPages)].map((_, index) => {
      const page = index + 1;
      const isCurrent = currentPage === page;

      return (
        <button
          key={page}
          type="button"
          disabled={isCurrent}
          onClick={() => changePage(page)}
          className={classNames(styles.pagination__item, {
            [styles['pagination__item--active']]: isCurrent,
          })}
          aria-label={`Go to page ${page}`}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {page}
        </button>
      );
    });
  }, [currentPage, changePage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  const isPrevDisabled = isDisabled(currentPage - 1);
  const isNextDisabled = isDisabled(currentPage + 1);

  return (
    <nav
      className={classNames(styles.pagination, {
        'not-visible': totalPages <= 1,
      })}
      aria-label="Pagination navigation"
    >
      <button
        type="button"
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--disabled']]: isPrevDisabled,
        })}
        disabled={isPrevDisabled}
        onClick={() => changePage(currentPage - 1)}
        aria-label="Go to previous page"
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

      <div className={styles.pagination__items}>{renderPageNumbers}</div>

      <button
        type="button"
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--disabled']]: isNextDisabled,
        })}
        disabled={isNextDisabled}
        onClick={() => changePage(currentPage + 1)}
        aria-label="Go to next page"
      >
        <img
          src={
            isNextDisabled
              ? './icons/chevron-arrow-right-disabled.avif'
              : './icons/chevron-arrow-right.avif'
          }
          aria-hidden="true"
          loading="lazy"
        />
      </button>
    </nav>
  );
};
