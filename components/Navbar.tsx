"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inProductSection, setInProductSection] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      setInProductSection(window.scrollY > window.innerHeight - 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        inProductSection ? styles.inProductSection : ""
      }`}
    >
      <div className={styles.container}>
        {/* Brand Logo */}
        <a href="#home" className={styles.logoLink} aria-label="RED Shoes Home">
          <span className={styles.logoText}>RED</span>
          <span className={styles.logoStar} aria-hidden="true">★</span>
        </a>

        {/* Center Nav Links */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <a href="#home" className={`${styles.navLink} ${styles.active}`}>
            HOME
          </a>
          <a href="#products" className={styles.navLink}>
            PRODUCTS
          </a>
          <a href="#collection" className={styles.navLink}>
            COLLECTION
          </a>
          <a href="#journal" className={styles.navLink}>
            JOURNAL
          </a>
          <a href="#about" className={styles.navLink}>
            ABOUT
          </a>
        </nav>

        {/* Right Actions: Cart Pill Button */}
        <div className={styles.actions}>
          <button className={styles.cartPillBtn} aria-label="Shopping Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cartIcon}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className={styles.cartText}>CART</span>
            <span className={styles.cartBadge}>2</span>
          </button>
        </div>
      </div>
    </header>
  );
}
