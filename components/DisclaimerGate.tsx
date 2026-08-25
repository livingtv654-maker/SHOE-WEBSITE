"use client";

import { useEffect, useState } from "react";
import styles from "./DisclaimerGate.module.css";

interface DisclaimerGateProps {
  onAccept: () => void;
}

export default function DisclaimerGate({ onAccept }: DisclaimerGateProps) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      onAccept();
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.closing : ""}`} role="dialog" aria-modal="true">
      <div className={styles.modalCard}>
        {/* Glow Accent Bar */}
        <div className={styles.accentBar} />

        {/* Brand Header Badge */}
        <div className={styles.badgeWrap}>
          <span className={styles.brandBadge}>AEVUM°</span>
        </div>

        {/* Modal Title */}
        <h2 className={styles.title}>Before You Continue</h2>

        {/* Exact Disclaimer Copy */}
        <p className={styles.disclaimerText}>
          This is an interactive web engineering &amp; design showcase created by AEVUM. The product concepts, 3D assets, and interfaces presented here were engineered purely for agency portfolio and demonstration purposes. No commercial sales are intended. By continuing, you acknowledge this is an interactive design &amp; development showcase by AEVUM.
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAccept}
          className={styles.acceptBtn}
        >
          <span>I Understand &mdash; Enter Site &rarr;</span>
        </button>
      </div>
    </div>
  );
}
