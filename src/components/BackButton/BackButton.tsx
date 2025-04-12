import React from 'react';
import styles from './BackButton.module.scss';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button
    type="button"
    className={styles['back-button']}
    onClick={onClick}
    aria-label="Go back"
  >
    <img
      src="./icons/chevron-arrow-left.avif"
      alt="Chevron arrow left"
      aria-hidden="true"
      loading="lazy"
    />
    <span className={styles['back-button__text']}>Back</span>
  </button>
);
