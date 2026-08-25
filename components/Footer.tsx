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
      {/* Background Watermark */}
      <div className={styles.watermark} aria-hidden="true">
        RED
      </div>

      <div className={styles.container}>
        {/* Top Header Row */}
        <div className={styles.brandRow}>
          <div className={styles.logoWrap}>
            <span className={styles.logoText}>RED</span>
            <span className={styles.logoStar}>★</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.coordsBadge}>
              <span className={styles.greenDot} />
              18.975&deg; N, 72.825&deg; E &bull; MUMBAI
            </span>
            <span className={styles.badgeText}>PORTFOLIO SHOWCASE</span>
          </div>
        </div>

        {/* Hero Banner Statement */}
        <div className={styles.statementBox}>
          <div className={styles.titleWrap}>
            <h2 className={styles.headline}>FEET WITHOUT LIMITS.</h2>
            <p className={styles.subtext}>
              Interactive 3D footwear showcase built as a personal portfolio project demonstrating high-performance web animations, scroll-locked sequence scrubbing, and responsive physics.
            </p>
          </div>

          <div className={styles.ctaBox}>
            <button type="button" onClick={scrollToTop} className={styles.primaryBtn}>
              <span>BACK TO TOP</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
            <a href="#products" onClick={scrollToProducts} className={styles.secondaryBtn}>
              EXPLORE COLLECTION
            </a>
          </div>
        </div>

        {/* 4 Color Edition Badges */}
        <div className={styles.editionsGrid}>
          <div className={`${styles.editionCard} ${styles.redCard}`}>
            <span className={styles.editionDot} style={{ background: "#c21a1f" }} />
            <div className={styles.editionInfo}>
              <span className={styles.editionTitle}>RED EDITION</span>
              <span className={styles.editionSpec}>NITROGEN FOAM / 340G</span>
            </div>
          </div>

          <div className={`${styles.editionCard} ${styles.yellowCard}`}>
            <span className={styles.editionDot} style={{ background: "#e8b400" }} />
            <div className={styles.editionInfo}>
              <span className={styles.editionTitle}>YELLOW EDITION</span>
              <span className={styles.editionSpec}>LIMITED RELEASE 01</span>
            </div>
          </div>

          <div className={`${styles.editionCard} ${styles.limeCard}`}>
            <span className={styles.editionDot} style={{ background: "#c4e23a" }} />
            <div className={styles.editionInfo}>
              <span className={styles.editionTitle}>LIME EDITION</span>
              <span className={styles.editionSpec}>STREET PERFORMANCE</span>
            </div>
          </div>

          <div className={`${styles.editionCard} ${styles.beigeCard}`}>
            <span className={styles.editionDot} style={{ background: "#d9c6a3" }} />
            <div className={styles.editionInfo}>
              <span className={styles.editionTitle}>BEIGE EDITION</span>
              <span className={styles.editionSpec}>ITALIAN LEATHER</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Specs */}
        <div className={styles.specsGrid}>
          <div className={styles.specItem}>
            <span className={styles.specKey}>FRAMEWORK</span>
            <span className={styles.specVal}>NEXT.JS 14 (APP ROUTER)</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specKey}>STYLING SYSTEM</span>
            <span className={styles.specVal}>VANILLA CSS MODULES</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specKey}>ANIMATIONS</span>
            <span className={styles.specVal}>SCROLL SCRUB + GSAP BEZIER</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specKey}>TYPOGRAPHY</span>
            <span className={styles.specVal}>ANTONIO &bull; ROBOTO MONO</span>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} RED FOOTWEAR &bull; DESIGNED & DEVELOPED AS A PORTFOLIO SHOWCASE
          </p>
          <span className={styles.taglineText}>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
