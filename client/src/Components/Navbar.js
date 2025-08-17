import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSSModule/NavBar.module.css';

export default function Navbar({ display }) {
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Link to="/" className={styles.link}>
          <h1>Internship</h1>
        </Link>
      </div>
      <ul className={`${styles.listContainer} ${styles.item}`}>
        <li className={styles.item2}>
          <Link to="/" className={styles.link}>
            <button className={`${styles.button} ${styles.buttonText}`}>Home</button>
          </Link>
        </li>
        {display.profile ? (
          <>
            <li className={styles.item2}>
              <Link to="/dashboard" className={styles.link}>
                <button className={`${styles.button} ${styles.buttonText}`}>Dashboard</button>
              </Link>
            </li>
            <li className={styles.item2}>
              <Link to="/profile" className={styles.link}>
                <button className={`${styles.button} ${styles.buttonText}`}>Profile</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.item2}>
              <Link to="/login" className={styles.link}>
                <button className={`${styles.button} ${styles.buttonContained}`}>Login</button>
              </Link>
            </li>
            <li className={styles.item2}>
              <Link to="/signup" className={styles.link}>
                <button className={`${styles.button} ${styles.buttonOutlined}`}>Sign up</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}