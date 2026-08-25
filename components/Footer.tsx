"use client";

import { useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [visitorEmail, setVisitorEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = visitorEmail.trim() || "[Visitor Email]";
    const subject = "Project Inquiry for AEVUM";
    const body = `Hello AEVUM Team,\n\nI visited your web showcase and would like to get in touch regarding a web development / design project.\n\nMy Email: ${emailValue}`;
    const mailtoUrl = `mailto:aevumofficial26@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <footer className={styles.footer}>
      {/* Background Watermark */}
      <div className={styles.watermark} aria-hidden="true">
        AEVUM°
      </div>

      <div className={styles.container}>
        {/* Top Brand Header Row */}
        <div className={styles.brandRow}>
          <div className={styles.logoWrap}>
            <span className={styles.logoText}>AEVUM°</span>
            <span className={styles.logoDivider}>|</span>
            <span className={styles.agencyRole}>UI/UX &amp; Web Agency</span>
          </div>

          <div className={styles.headerRight}>
            <a
              href="mailto:aevumofficial26@gmail.com?subject=Inquiry%20for%20AEVUM%20Agency"
              className={styles.directEmailBadge}
              aria-label="Direct Email Badge to aevumofficial26@gmail.com"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.emailIcon}
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>aevumofficial26@gmail.com</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className={styles.backTopBtn}
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
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

        {/* Agency Tagline */}
        <div className={styles.taglineBox}>
          <p className={styles.taglineText}>
            An immersive, high-performance web experience engineered by AEVUM. Designed with Next.js 14, Framer Motion, and custom CSS design systems.
          </p>
        </div>

        {/* Main Grid: Work Inquiry + Tech Stack Pills + Agency Craft Highlights */}
        <div className={styles.mainGrid}>
          {/* Work Inquiry Section */}
          <div className={styles.inquiryCard}>
            <h3 className={styles.gridTitle}>Work With AEVUM</h3>
            <p className={styles.inquirySubtext}>
              Initiate a high-impact web project with our engineering &amp; UI/UX team.
            </p>
            <form onSubmit={handleInquirySubmit} className={styles.inquiryForm}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Your email address..."
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.submitBtn}>
                  <span>Submit Inquiry &rarr;</span>
                </button>
              </div>
            </form>
          </div>

          {/* Tech Stack Pills */}
          <div className={styles.gridCard}>
            <h3 className={styles.gridTitle}>Tech Stack</h3>
            <div className={styles.pillsGrid}>
              <span className={styles.stackPill}>Next.js 14</span>
              <span className={styles.stackPill}>Framer Motion</span>
              <span className={styles.stackPill}>TypeScript</span>
              <span className={styles.stackPill}>CSS Modules</span>
            </div>
          </div>

          {/* Agency Craft Highlights */}
          <div className={styles.gridCard}>
            <h3 className={styles.gridTitle}>Agency Craft</h3>
            <ul className={styles.craftList}>
              <li className={styles.craftItem}>
                <span className={styles.craftDot} />
                60 FPS Scroll Physics
              </li>
              <li className={styles.craftItem}>
                <span className={styles.craftDot} />
                Responsive &amp; Mobile Optimized
              </li>
              <li className={styles.craftItem}>
                <span className={styles.craftDot} />
                Zero Layout Shift (CLS)
              </li>
              <li className={styles.craftItem}>
                <span className={styles.craftDot} />
                Custom Component System
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar & Bottom Disclaimer Note */}
        <div className={styles.bottomSection}>
          <div className={styles.copyrightRow}>
            <p className={styles.copyrightText}>
              &copy; {new Date().getFullYear()} AEVUM Agency. All Rights Reserved. Engineered to showcase web design &amp; development excellence.
            </p>
          </div>
          <div className={styles.disclaimerRow}>
            <p className={styles.bottomDisclaimer}>
              Note: Concept Showcase by AEVUM &mdash; Designed for web development &amp; UI/UX portfolio presentation. All product assets are for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
