"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./ProductSequence.module.css";

type Props = {
  states: ReactNode[];
  scrubViewportsPerTransition?: number;
};

export default function ProductSequence({
  states,
  scrubViewportsPerTransition = 0.5,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastTargetIndex = useRef(-1);
  const stateCount = states.length;
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky} data-active-index={activeIndex}>
        {states}

        {/* Clean Black Arc Line Track spanning the bottom */}
        <Image src="/product-red/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />

        {/* Clean Black Circle Dots (Unified 100% identical pure CSS circles) */}
        <div className={styles.itemRedSlot}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemRedLabel}>RED</span>
        <div className={styles.itemRedSlotWrapped}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemRedLabelWrapped}>RED</span>

        <div className={styles.itemYellowSlot}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemYellowLabel}>YELLOW</span>
        <div className={styles.itemYellowSlotWrapped}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemYellowLabelWrapped}>YELLOW</span>

        <div className={styles.itemLimeSlot}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemLimeLabel}>LIME</span>

        <div className={styles.itemBeigeSlot}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemBeigeLabel}>BEIGE</span>
        <div className={styles.itemBeigeSlotWrapped}>
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemBeigeLabelWrapped}>BEIGE</span>
      </div>
    </div>
  );
}
