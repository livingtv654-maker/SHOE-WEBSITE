"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inProductSection, setInProductSection] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      setInProductSection(window.scrollY > window.innerHeight - 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const viewportH = window.innerHeight;
    window.scrollTo({ top: viewportH + 50, behavior: "smooth" });
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        inProductSection ? styles.inProductSection : ""
      }`}
    >
      <div className={styles.container}>
        {/* Brand Logo */}
        <a href="#home" onClick={scrollToTop} className={styles.logoLink} aria-label="SONIC RED Shoes Home">
          <span className={styles.logoText}>RED</span>
          <span className={styles.logoStar} aria-hidden="true">★</span>
        </a>

        {/* Center Nav Links */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <a href="#home" onClick={scrollToTop} className={`${styles.navLink} ${styles.active}`}>
            HOME
          </a>
          <a href="#products" onClick={scrollToProducts} className={styles.navLink}>
            PRODUCTS
          </a>
          <a href="#collection" onClick={scrollToProducts} className={styles.navLink}>
            COLLECTION
          </a>
          <a href="#products" onClick={scrollToProducts} className={styles.navLink}>
            JOURNAL
          </a>
          <a href="#products" onClick={scrollToProducts} className={styles.navLink}>
            ABOUT
          </a>
        </nav>

        {/* Right Actions: Interactive Cart Pill Button */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cartPillBtn}
            aria-label="Shopping Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cartIcon}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className={styles.cartText}>CART</span>
            <span className={styles.cartBadge}>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
