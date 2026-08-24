"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./ProductSequence.module.css";

type Props = {
  states: ReactNode[];
  scrubViewportsPerTransition?: number;
};

const editions = [
  { id: 0, num: "01", name: "RED", color: "#e31e24", rgb: "227, 30, 36" },
  { id: 1, num: "02", name: "YELLOW", color: "#ffb800", rgb: "255, 184, 0" },
  { id: 2, num: "03", name: "LIME", color: "#76ff03", rgb: "118, 255, 3" },
  { id: 3, num: "04", name: "BEIGE", color: "#d4a373", rgb: "212, 163, 115" },
];

export default function ProductSequence({
  states,
  scrubViewportsPerTransition = 0.5,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastTargetIndex = useRef(-1);
  const stateCount = states.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const viewportH = window.innerHeight;
      if (viewportH <= 0) return;

      const totalScrubViewports = (stateCount - 1) * scrubViewportsPerTransition;
      wrapper.style.height = `${viewportH * (1 + totalScrubViewports)}px`;

      const rect = wrapper.getBoundingClientRect();
      const scrubDistance = wrapper.offsetHeight - viewportH;
      const normalized = scrubDistance > 0 ? Math.min(Math.max(-rect.top / scrubDistance, 0), 1) : 0;
      const rawProgress = normalized * (stateCount - 1);

      setProgress(rawProgress);

      const targetIndex = Math.round(rawProgress);
      if (targetIndex !== lastTargetIndex.current) {
        lastTargetIndex.current = targetIndex;
        setActiveIndex(targetIndex);
      }

      for (let i = 0; i < stateCount; i++) {
        const entrance = targetIndex >= i ? 1 : 0;
        const exit = targetIndex >= i + 1 ? 1 : 0;
        sticky.style.setProperty(`--entrance-${i}`, String(entrance));
        sticky.style.setProperty(`--exit-${i}`, String(exit));
        document.documentElement.style.setProperty(`--entrance-${i}`, String(entrance));
        document.documentElement.style.setProperty(`--exit-${i}`, String(exit));
      }
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    const rafId = requestAnimationFrame(update);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [stateCount, scrubViewportsPerTransition]);

  // Compute 3D Laser Bead position along arc curve
  // Curve: P0 (16%, 86%) -> P1 (50%, 74%) -> P2 (84%, 86%)
  const t = Math.min(Math.max(progress / (stateCount - 1), 0), 1);
  const beadX = (1 - t) * (1 - t) * 16 + 2 * (1 - t) * t * 50 + t * t * 84;
  const beadY = (1 - t) * (1 - t) * 86 + 2 * (1 - t) * t * 74 + t * t * 86;

  // Active theme color
  const activeColor = editions[activeIndex]?.color || "#e31e24";
  const activeRgb = editions[activeIndex]?.rgb || "227, 30, 36";

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div
        ref={stickyRef}
        className={styles.sticky}
        data-active-index={activeIndex}
        style={{
          "--active-accent": activeColor,
          "--active-accent-rgb": activeRgb,
        } as React.CSSProperties}
      >
        {states}

        {/* ---- Laser Arc Track & 3D Glowing Bead Ride ---- */}
        <div className={styles.laserArcDock}>
          {/* Glowing SVG Arc Track Line */}
          <svg className={styles.svgTrack} viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="laserGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e31e24" stopOpacity="0.8" />
                <stop offset="33%" stopColor="#ffb800" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#76ff03" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4a373" stopOpacity="0.8" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Background Track Arc */}
            <path
              d="M 120 95 Q 500 20 880 95"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Active Filled Laser Track */}
            <path
              d="M 120 95 Q 500 20 880 95"
              fill="none"
              stroke="url(#laserGlowGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="900"
              strokeDashoffset={900 * (1 - t)}
              filter="url(#neonGlow)"
              className={styles.activeLaserLine}
            />
          </svg>

          {/* 4 Fixed Edition Nodes on Arc Track */}
          {editions.map((ed, idx) => {
            const nodePositions = [
              { x: 16, y: 86 },
              { x: 38.3, y: 78.5 },
              { x: 61.7, y: 78.5 },
              { x: 84, y: 86 },
            ];
            const pos = nodePositions[idx];
            const isActive = activeIndex === idx;

            return (
              <div
                key={ed.id}
                className={`${styles.nodeBox} ${isActive ? styles.activeNode : ""}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  "--node-color": ed.color,
                  "--node-rgb": ed.rgb,
                } as React.CSSProperties}
              >
                <div className={styles.nodeCircle}>
                  <span className={styles.nodeNum}>{ed.num}</span>
                </div>
                <span className={styles.nodeLabel}>{ed.name}</span>
              </div>
            );
          })}

          {/* 3D Glowing Bead gliding along the laser arc path */}
          <div
            className={styles.glowingBead}
            style={{
              left: `${beadX}%`,
              top: `${beadY}%`,
              background: activeColor,
              boxShadow: `0 0 20px ${activeColor}, 0 0 40px rgba(${activeRgb}, 0.7)`,
            }}
          >
            <span className={styles.beadCore} />
          </div>
        </div>
      </div>
    </div>
  );
}
