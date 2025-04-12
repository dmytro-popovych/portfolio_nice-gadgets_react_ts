import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div
    className={styles.loader}
    role="status"
    aria-live="polite"
    aria-label="Loading content"
  >
    <div className={styles.loader__spinner} aria-hidden="true"></div>
  </div>
);
