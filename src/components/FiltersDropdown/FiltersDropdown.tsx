import React, { useContext, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './FiltersDropdown.module.scss';
import {
  ItemsPerPageOptions,
  ProductsContext,
  SortOptions,
} from '../../contexts/ProductsContext';

const URL_PARAMS = {
  SORT: 'sort',
  ITEMS: 'items',
  PAGE: 'page',
} as const;

export type DropdownOption = {
  value: SortOptions | ItemsPerPageOptions;
  label: string;
};

type DropdownProps = {
  label: string;
  options: DropdownOption[];
  isOpen: boolean;
  onClick: () => void;
  onBlur: () => void;
  currentValue: SortOptions | ItemsPerPageOptions;
  onOptionSelect: (value: SortOptions | ItemsPerPageOptions) => void;
  getSelectedLabel: (
    options: DropdownOption[],
    selectedValue: SortOptions | ItemsPerPageOptions,
  ) => React.ReactNode;
  getOptionStyles: (
    value: SortOptions | ItemsPerPageOptions,
    currentValue: SortOptions | ItemsPerPageOptions,
  ) => React.CSSProperties;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  isOpen,
  onClick,
  onBlur,
  currentValue,
  onOptionSelect,
  getSelectedLabel,
  getOptionStyles,
}) => (
  <div tabIndex={0} onBlur={onBlur}>
    <p className={styles.button__label}>{label}</p>
    <div
      className={classNames(styles.button__select, {
        [styles['button__select--active']]: isOpen,
      })}
      onClick={onClick}
    >
      {getSelectedLabel(options, currentValue)}
      <div
        className={styles.button__icon}
        style={
          isOpen
            ? { backgroundImage: 'url(./icons/chevron-arrow-up.avif)' }
            : { backgroundImage: 'url(./icons/chevron-arrow-down.avif)' }
        }
        aria-hidden="true"
      ></div>
    </div>
    <div
      className={classNames(styles.button__items, { 'not-visible': !isOpen })}
    >
      {options.map(option => (
        <p
          key={option.value}
          className={styles.button__option}
          onClick={e => {
            e.stopPropagation();
            onOptionSelect(option.value);
          }}
          style={getOptionStyles(option.value, currentValue)}
        >
          {option.label}
        </p>
      ))}
    </div>
  </div>
);

export const FiltersDropdown: React.FC = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { sortOption, itemsPerPage, isSortDropdownOpen, isItemDropdownOpen } =
    state;
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions: DropdownOption[] = useMemo(
    () => [
      { value: SortOptions.Newest, label: 'Newest' },
      { value: SortOptions.NameAsc, label: 'Name: A to Z' },
      { value: SortOptions.NameDesc, label: 'Name: Z to A' },
      { value: SortOptions.PriceAsc, label: 'Price: Low to High' },
      { value: SortOptions.PriceDesc, label: 'Price: High to Low' },
    ],
    [],
  );

  const itemsPerPageOptions: DropdownOption[] = useMemo(
    () => [
      { value: ItemsPerPageOptions.Sixteen, label: '16' },
      { value: ItemsPerPageOptions.TwentyFour, label: '24' },
      { value: ItemsPerPageOptions.ThirtyTwo, label: '32' },
      { value: ItemsPerPageOptions.Forty, label: '40' },
      { value: ItemsPerPageOptions.FortyEight, label: '48' },
    ],
    [],
  );

  const handleDropdownChange = useCallback(
    (value: SortOptions | ItemsPerPageOptions) => {
      const params = new URLSearchParams(searchParams);
      const isSortValue = typeof value === 'string';

      if (isSortValue) {
        const sortValue = value as SortOptions;

        dispatch({ type: 'SET_SORT_OPTION', payload: sortValue });

        if (sortValue !== SortOptions.Newest) {
          params.set(URL_PARAMS.SORT, sortValue);
        } else {
          params.delete(URL_PARAMS.SORT);
        }

        dispatch({ type: 'SET_IS_SORT_DROPDOWN_OPEN', payload: false });
      } else {
        const itemsValue = value as ItemsPerPageOptions;

        dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsValue });
        if (itemsValue !== ItemsPerPageOptions.Sixteen) {
          params.set(URL_PARAMS.ITEMS, String(itemsValue));
        } else {
          params.delete(URL_PARAMS.ITEMS);
        }

        params.delete(URL_PARAMS.PAGE);

        dispatch({ type: 'SET_IS_ITEM_DROPDOWN_OPEN', payload: false });
      }

      setSearchParams(params, { replace: true });
    },
    [dispatch, searchParams, setSearchParams],
  );

  const getSelectedLabel = useCallback(
    (
      options: DropdownOption[],
      selectedValue: SortOptions | ItemsPerPageOptions,
    ): React.ReactNode => {
      const selectedOption = options.find(
        option => option.value === selectedValue,
      );

      return (
        <span className={styles['button__content-value']}>
          {selectedOption?.label ?? selectedValue}
        </span>
      );
    },
    [],
  );

  const getOptionStyles = useCallback(
    (
      value: SortOptions | ItemsPerPageOptions,
      currentValue: SortOptions | ItemsPerPageOptions,
    ): React.CSSProperties => {
      return value === currentValue
        ? { pointerEvents: 'none', opacity: 0.5, cursor: 'default' }
        : {};
    },
    [],
  );

  const toggleSortDropdown = useCallback(() => {
    dispatch({
      type: 'SET_IS_SORT_DROPDOWN_OPEN',
      payload: !isSortDropdownOpen,
    });
  }, [dispatch, isSortDropdownOpen]);

  const closeSortDropdown = useCallback(() => {
    dispatch({ type: 'SET_IS_SORT_DROPDOWN_OPEN', payload: false });
  }, [dispatch]);

  const toggleItemDropdown = useCallback(() => {
    dispatch({
      type: 'SET_IS_ITEM_DROPDOWN_OPEN',
      payload: !isItemDropdownOpen,
    });
  }, [dispatch, isItemDropdownOpen]);

  const closeItemDropdown = useCallback(() => {
    dispatch({ type: 'SET_IS_ITEM_DROPDOWN_OPEN', payload: false });
  }, [dispatch]);

  return (
    <div className={styles.buttons}>
      <div className={classNames(styles.button, styles.button__sort)}>
        <Dropdown
          label="Sort by"
          options={sortOptions}
          isOpen={isSortDropdownOpen}
          onClick={toggleSortDropdown}
          onBlur={closeSortDropdown}
          currentValue={sortOption}
          onOptionSelect={handleDropdownChange}
          getSelectedLabel={getSelectedLabel}
          getOptionStyles={getOptionStyles}
        />
      </div>

      <div className={classNames(styles.button, styles.button__quantity)}>
        <Dropdown
          label="Items on page"
          options={itemsPerPageOptions}
          isOpen={isItemDropdownOpen}
          onClick={toggleItemDropdown}
          onBlur={closeItemDropdown}
          currentValue={itemsPerPage}
          onOptionSelect={handleDropdownChange}
          getSelectedLabel={getSelectedLabel}
          getOptionStyles={getOptionStyles}
        />
      </div>
    </div>
  );
};
