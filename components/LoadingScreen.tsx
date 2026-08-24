"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("[ SYS_INIT ] LOADING CORE ENGINE...");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 10) + 6;
        const next = Math.min(prev + step, 100);

        if (next > 25 && next <= 60) {
          setStatusText("[ 3D_MESH ] RENDERING HIGH-TOP SILHOUETTE...");
        } else if (next > 60 && next <= 90) {
          setStatusText("[ AIR_NITRO ] SYNCING RESPONSIVE CUSHIONING...");
        } else if (next > 90) {
          setStatusText("[ STATUS ] RED AIR 01 // FEARLESS. READY.");
        }
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 300);

      const hideTimer = setTimeout(() => {
        setIsHidden(true);
        if (onComplete) onComplete();
      }, 1100);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, onComplete]);

  if (isHidden) return null;

  return (
    <div className={`${styles.loaderWrap} ${isFadingOut ? styles.exit : ""}`}>
      {/* Dual Curtain Shutters for Cinematic Opening */}
      <div className={`${styles.shutter} ${styles.shutterTop}`} />
      <div className={`${styles.shutter} ${styles.shutterBottom}`} />

      {/* Main HUD Center Content */}
      <div className={styles.hudBox}>
        {/* Outer Rotating HUD Ring */}
        <div className={styles.hudRingOuter} />
        <div className={styles.hudRingInner} />

        {/* Center Brand Identity */}
        <div className={styles.brandGroup}>
          <div className={styles.logoRow}>
            <span className={styles.logoLetter}>R</span>
            <span className={styles.logoLetter}>E</span>
            <span className={styles.logoLetter}>D</span>
            <span className={styles.logoStar}>★</span>
          </div>
          <span className={styles.subTag}>AIR 01 // HIGH PERFORMANCE</span>
        </div>

        {/* Tactical Progress Section */}
        <div className={styles.progressBlock}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
            <div className={styles.laserSweep} />
          </div>

          <div className={styles.telemetryRow}>
            <span className={styles.statusText}>{statusText}</span>
            <span className={styles.percentText}>
              {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
