"use client";

import styles from "./MarqueeBanner.module.css";

const MARQUEE_ITEMS = [
  "RED FOOTWEAR",
  "BUILT WITHOUT LIMITS",
  "NITROGEN CUSHIONED",
  "STREET PROVEN",
  "DROP 01 — 2026",
  "FEARLESS PERFORMANCE",
  "PREMIUM LEATHER",
];

export default function MarqueeBanner() {
  return (
    <div className={styles.bannerWrap} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {/* Track 1 */}
        <div className={styles.marqueeGroup}>
          {MARQUEE_ITEMS.map((item, idx) => (
            <span key={`group1-${idx}`} className={styles.item}>
              <span className={styles.text}>{item}</span>
              <span className={styles.star}>★</span>
            </span>
          ))}
        </div>
        {/* Track 2 (Duplicate for seamless infinite loop) */}
        <div className={styles.marqueeGroup}>
          {MARQUEE_ITEMS.map((item, idx) => (
            <span key={`group2-${idx}`} className={styles.item}>
              <span className={styles.text}>{item}</span>
              <span className={styles.star}>★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
