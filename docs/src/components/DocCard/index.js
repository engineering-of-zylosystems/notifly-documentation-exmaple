import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function DocCard({ title, description, href, icon }) {
  return (
    <Link to={href} className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardIcon}>{icon}</span>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </Link>
  );
}