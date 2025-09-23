import React from 'react';
import DocCard from '../DocCard';
import styles from './styles.module.css';

export default function DocCardGrid({ children, cols = 2 }) {
  return (
    <div className={`${styles.grid} ${styles[`cols${cols}`]}`}>
      {children}
    </div>
  );
}