"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      {/* Top Banner Ticker */}
      <div className={styles.tickerWrap}>
        <div className={styles.tickerTrack}>
          <span>RED AIR 01</span>
          <span className={styles.bullet}>★</span>
          <span>FEARLESS MOVEMENT</span>
          <span className={styles.bullet}>★</span>
          <span>SERIES // 2024</span>
          <span className={styles.bullet}>★</span>
          <span>TOKYO // NEW YORK // LONDON // PARIS</span>
          <span className={styles.bullet}>★</span>
          <span>RED AIR 01</span>
          <span className={styles.bullet}>★</span>
          <span>FEARLESS MOVEMENT</span>
          <span className={styles.bullet}>★</span>
          <span>SERIES // 2024</span>
          <span className={styles.bullet}>★</span>
          <span>TOKYO // NEW YORK // LONDON // PARIS</span>
          <span className={styles.bullet}>★</span>
        </div>
      </div>

      <div className={styles.container}>
        {/* Main Footer Columns */}
        <div className={styles.grid}>
          {/* Brand Info & Newsletter */}
          <div className={styles.brandCol}>
            <div className={styles.logoWrap}>
              <span className={styles.logoText}>RED</span>
              <span className={styles.logoStar}>★</span>
            </div>
            <p className={styles.brandDesc}>
              Engineered for those who break the pattern. Iconic high-top silhouettes crafted with premium leather and responsive air cushioning.
            </p>

            {/* Newsletter Form */}
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className={styles.newsletterLabel}>
                JOIN THE MOVEMENT
              </label>
              <div className={styles.inputGroup}>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>COLLECTION</h4>
            <ul className={styles.linkList}>
              <li><a href="#products">RED AIR 01 (ORIGINAL)</a></li>
              <li><a href="#products">YELLOW THUNDER</a></li>
              <li><a href="#products">LIME PULSE</a></li>
              <li><a href="#products">BEIGE SAND</a></li>
              <li><a href="#products">LIMITED EDITIONS</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>COMPANY</h4>
            <ul className={styles.linkList}>
              <li><a href="#about">OUR STORY</a></li>
              <li><a href="#craft">THE CRAFT</a></li>
              <li><a href="#journal">JOURNAL</a></li>
              <li><a href="#careers">CAREERS</a></li>
              <li><a href="#press">PRESS ROOM</a></li>
            </ul>
          </div>

          {/* Support & Socials Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>SUPPORT</h4>
            <ul className={styles.linkList}>
              <li><a href="#faq">FAQ & SIZING</a></li>
              <li><a href="#shipping">SHIPPING & RETURNS</a></li>
              <li><a href="#order-status">ORDER STATUS</a></li>
              <li><a href="#contact">CONTACT US</a></li>
            </ul>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">TW</a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">YT</a>
              <a href="#" className={styles.socialLink} aria-label="Discord">DC</a>
            </div>
          </div>
        </div>

        {/* Big Watermark Display */}
        <div className={styles.watermarkWrap} aria-hidden="true">
          <span className={styles.watermarkText}>RED FOOTWEAR</span>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} RED FOOTWEAR INC. ALL RIGHTS RESERVED.
          </p>

          <div className={styles.legalLinks}>
            <a href="#privacy">PRIVACY POLICY</a>
            <span>//</span>
            <a href="#terms">TERMS OF SERVICE</a>
            <span>//</span>
            <a href="#cookies">COOKIE PREFERENCES</a>
          </div>

          <button onClick={scrollToTop} className={styles.topBtn} aria-label="Back to top">
            <span>BACK TO TOP</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
