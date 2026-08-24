"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const viewportH = window.innerHeight;
    window.scrollTo({ top: viewportH + 50, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand & Tagline */}
        <div className={styles.brandRow}>
          <div className={styles.logoWrap}>
            <span className={styles.logoText}>RED</span>
            <span className={styles.logoStar}>★</span>
          </div>
          <p className={styles.brandTagline}>
            PRECISION BUILT. FEARLESSLY RED.
          </p>
        </div>

        {/* Minimal Nav Links */}
        <nav className={styles.navRow} aria-label="Footer Navigation">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className={styles.footerLink}>
            HOME
          </a>
          <a href="#products" onClick={scrollToProducts} className={styles.footerLink}>
            COLLECTION
          </a>
          <a href="#products" onClick={scrollToProducts} className={styles.footerLink}>
            SPECIFICATIONS
          </a>
        </nav>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} RED FOOTWEAR. ALL RIGHTS RESERVED.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.topBtn}
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
