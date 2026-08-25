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
  scrubViewportsPerTransition = 0.18,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastTargetIndex = useRef(-1);
  const stateCount = states.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToState = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const isMobile = window.innerWidth <= 768;
    const effectiveScrub = isMobile ? 0.65 : 0.35;
    const viewportH = isMobile ? window.innerWidth * (16 / 9) : window.innerHeight;
    const activeScrubDistance = viewportH * (stateCount - 1) * effectiveScrub;
    const targetTop = wrapper.offsetTop + (index / (stateCount - 1)) * activeScrubDistance;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const isMobile = window.innerWidth <= 768;
      const effectiveScrub = isMobile ? 0.65 : 0.35;
      const viewportH = isMobile ? window.innerWidth * (16 / 9) : window.innerHeight;
      if (viewportH <= 0) return;

      const terminalHoldViewports = 0.5;
      const totalScrubViewports = (stateCount - 1) * effectiveScrub + terminalHoldViewports;
      wrapper.style.height = `${viewportH * (1 + totalScrubViewports)}px`;

      const rect = wrapper.getBoundingClientRect();
      const totalScrubDistance = wrapper.offsetHeight - viewportH;
      const activeScrubDistance = totalScrubDistance > 0 ? (viewportH * (stateCount - 1) * effectiveScrub) : 1;
      const currentScroll = Math.max(-rect.top, 0);
      const normalized = Math.min(Math.max(currentScroll / activeScrubDistance, 0), 1);
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

        {/* Clean Black Circle Dots (Clickable to jump directly to edition) */}
        <div
          className={styles.itemRedSlot}
          onClick={() => scrollToState(0)}
          style={{ cursor: "pointer" }}
          title="Jump to RED Edition"
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemRedLabel}>RED</span>
        <div
          className={styles.itemRedSlotWrapped}
          onClick={() => scrollToState(0)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemRedLabelWrapped}>RED</span>

        <div
          className={styles.itemYellowSlot}
          onClick={() => scrollToState(1)}
          style={{ cursor: "pointer" }}
          title="Jump to YELLOW Edition"
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemYellowLabel}>YELLOW</span>
        <div
          className={styles.itemYellowSlotWrapped}
          onClick={() => scrollToState(1)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemYellowLabelWrapped}>YELLOW</span>

        <div
          className={styles.itemLimeSlot}
          onClick={() => scrollToState(2)}
          style={{ cursor: "pointer" }}
          title="Jump to LIME Edition"
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemLimeLabel}>LIME</span>

        <div
          className={styles.itemBeigeSlot}
          onClick={() => scrollToState(3)}
          style={{ cursor: "pointer" }}
          title="Jump to BEIGE Edition"
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemBeigeLabel}>BEIGE</span>
        <div
          className={styles.itemBeigeSlotWrapped}
          onClick={() => scrollToState(3)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.blackDot} />
        </div>
        <span className={styles.itemBeigeLabelWrapped}>BEIGE</span>
      </div>
    </div>
  );
}
