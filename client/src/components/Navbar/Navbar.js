import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbarContainer}>
      <Link className={styles.navbarBrand} to="/">
        BlogByte.io
      </Link>
      <div className={styles.navbarCollapse}>
        <ul className={styles.navbarNav}>
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/">
              Blog Feed
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/editor">
              Create Blog
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/login">
              Login
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
