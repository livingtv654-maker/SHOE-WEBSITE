"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Smooth, minimal brand reveal timer (1.2s reveal then slide shutter exit)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className={`${styles.loaderWrap} ${isFadingOut ? styles.exit : ""}`}>
      {/* Dual Shutter Curtain Shutters */}
      <div className={`${styles.shutter} ${styles.shutterTop}`} />
      <div className={`${styles.shutter} ${styles.shutterBottom}`} />

      {/* Ultra-Minimal Center Brand Reveal */}
      <div className={styles.brandCenter}>
        <div className={styles.logoRow}>
          <span className={styles.logoText}>RED</span>
          <span className={styles.logoStar} aria-hidden="true">★</span>
        </div>
      </div>
    </div>
  );
}
