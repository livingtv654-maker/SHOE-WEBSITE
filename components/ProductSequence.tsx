"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./ProductSequence.module.css";

type Props = {
  states: ReactNode[];
  scrubViewportsPerTransition?: number;
};

export default function ProductSequence({ states, scrubViewportsPerTransition = 0.5 }: Props) {
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
      if (targetIndex === lastTargetIndex.current) return;
      lastTargetIndex.current = targetIndex;
      setActiveIndex(targetIndex);

      for (let i = 0; i < stateCount; i++) {
        const entrance = targetIndex >= i ? 1 : 0;
        const exit = targetIndex >= i + 1 ? 1 : 0;
        sticky.style.setProperty(`--entrance-${i}`, String(entrance));
        sticky.style.setProperty(`--exit-${i}`, String(exit));
        // Also published on <html> so the page-level, always-fixed <Navbar /> (which lives
        // outside this component and isn't a descendant of `.sticky`) can read --entrance-1 too,
        // for its Red -> Yellow underline color blend.
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

        {/* ---- Shared horizontal color carousel: the arc background never changes, and each of the
            four color dots slides between its two fixed slot positions (only Red and Yellow actually
            move between "active/center" and a side slot; Lime Green and Beige just shift one slot
            over) driven by the same --entrance-1 progress — so scrolling reads as Red sliding right
            while Yellow slides into center, left-to-right, not a page-style up/down swap. ---- */}
        <Image src="/product-red/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />
        <Image src="/product-red/triangle.png" alt="" width={40} height={60} priority className={styles.triangle} />

        {/* Each circle + its number now share one positioned box (.itemXSlot) so the number is
            centered with `inset: 0` + flex instead of being separately hand-placed — the previous
            independent left/top coordinates on the number span drifted from the circle's actual
            visual center once real font metrics were applied. */}
        <div className={styles.itemRedSlot}>
          <Image src="/product-red/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemRedNum}>01</span>
        </div>
        <span className={styles.itemRedLabel}>RED</span>

        <div className={styles.itemYellowSlot}>
          <Image src="/product-yellow/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemYellowNum}>02</span>
        </div>
        <span className={styles.itemYellowLabel}>YELLOW</span>

        <div className={styles.itemLimeSlot}>
          <Image src="/product-red/circle-small-b.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemLimeNum}>03</span>
        </div>
        <span className={styles.itemLimeLabel}>LIME GREEN</span>

        {/* Beige never slides across the whole arc anymore (that was the "magically teleports to
            the other side" bug) — it only ever occupies the two extreme slots (rightmost while Red
            is active, leftmost once Yellow takes over), so it's rendered as two independent,
            non-moving instances that simply crossfade: the rightmost copy fades out, the leftmost
            copy fades in. Neither one travels. */}
        <div className={`${styles.itemBeigeSlot} ${styles.itemBeigeSlotExit}`}>
          <Image src="/product-red/circle-small-c.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemBeigeNum}>04</span>
        </div>
        <span className={`${styles.itemBeigeLabel} ${styles.itemBeigeLabelExit}`}>BEIGE</span>

        <div className={`${styles.itemBeigeSlot} ${styles.itemBeigeSlotEnter}`}>
          <Image src="/product-red/circle-small-c.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemBeigeNum}>04</span>
        </div>
        <span className={`${styles.itemBeigeLabel} ${styles.itemBeigeLabelEnter}`}>BEIGE</span>
      </div>
    </div>
  );
}
