"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // 2.0s precision count-up for full visual impact
    const startTime = performance.now();
    const duration = 2000;
    let frameId: number;

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        frameId = requestAnimationFrame(animateProgress);
      } else {
        // Trigger hyper-velocity quad warp exit
        setTimeout(() => {
          setIsExiting(true);
        }, 180);

        setTimeout(() => {
          setIsHidden(true);
          window.scrollTo(0, 0);
          if (onComplete) onComplete();
        }, 1100);
      }
    };

    frameId = requestAnimationFrame(animateProgress);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  if (isHidden) return null;

  const formattedProgress = progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : `${progress}`;
  const strokeDashoffset = 380 - (380 * progress) / 100;

  return (
    <div className={`${styles.loaderWrap} ${isExiting ? styles.exit : ""}`}>
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow} />

      {/* 4 Corner Quad-Warp Panels */}
      <div className={`${styles.quadPane} ${styles.quadTL}`} />
      <div className={`${styles.quadPane} ${styles.quadTR}`} />
      <div className={`${styles.quadPane} ${styles.quadBL}`} />
      <div className={`${styles.quadPane} ${styles.quadBR}`} />

      {/* Central Kinetic Showcase */}
      <div className={styles.centerStage}>
        {/* Animated Neon Shoe Contour Trace */}
        <div className={styles.shoeContourWrap}>
          <svg
            viewBox="0 0 240 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.shoeSvg}
          >
            {/* Faint Base Guide */}
            <path
              d="M15 105 C 30 105, 45 110, 65 110 L 210 110 C 225 110, 230 100, 225 85 C 215 55, 185 30, 155 25 C 135 22, 115 35, 95 45 L 60 65 C 40 75, 25 80, 15 90 Z"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Glowing Neon Contour Line */}
            <path
              d="M15 105 C 30 105, 45 110, 65 110 L 210 110 C 225 110, 230 100, 225 85 C 215 55, 185 30, 155 25 C 135 22, 115 35, 95 45 L 60 65 C 40 75, 25 80, 15 90 Z"
              stroke="#e31e24"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="380"
              strokeDashoffset={strokeDashoffset}
              className={styles.neonPath}
            />
            {/* Laces Accents */}
            <path d="M100 45 L115 60 M120 40 L135 55 M140 35 L155 50" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Identity */}
        <div className={styles.brandRow}>
          <span className={styles.brandText}>RED</span>
          <span className={styles.brandStar}>★</span>
        </div>

        {/* Tech Monospace Status & Counter */}
        <div className={styles.metaBox}>
          <span className={styles.statusLabel}>INITIALIZING SHOWCASE</span>
          <span className={styles.pctCounter}>{formattedProgress}</span>
        </div>

        {/* Outer Orbital Pulse */}
        <div className={styles.orbitalRing} />
      </div>
    </div>
  );
}
