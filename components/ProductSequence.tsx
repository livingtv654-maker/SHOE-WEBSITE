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

        {/* ---- Shared navbar: one instance for the whole Red<->Yellow sequence instead of a
            per-color copy, so it never flickers/duplicates as the crossfade plays. The PRODUCTS
            underline colour slides between the two brand colours via the same --entrance-1 progress
            that drives everything else. ---- */}
        <div className={styles.navbar} aria-hidden="true" />
        <span className={styles.logo}>RED</span>
        <span className={styles.star} aria-hidden="true">
          &#9733;
        </span>
        <nav className={styles.nav} aria-label="Primary">
          <span className={`${styles.navItem} ${styles.navHome}`}>HOME</span>
          <span className={`${styles.navItem} ${styles.navProducts}`}>PRODUCTS</span>
          <span className={styles.navUnderline} aria-hidden="true" />
          <span className={`${styles.navItem} ${styles.navJournal}`}>JOURNAL</span>
          <span className={`${styles.navItem} ${styles.navAbout}`}>ABOUT</span>
        </nav>

        {/* ---- Shared horizontal color carousel: the arc background never changes, and each of the
            four color dots slides between its two fixed slot positions (only Red and Yellow actually
            move between "active/center" and a side slot; Lime Green and Beige just shift one slot
            over) driven by the same --entrance-1 progress — so scrolling reads as Red sliding right
            while Yellow slides into center, left-to-right, not a page-style up/down swap. ---- */}
        <Image src="/product-red/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />
        <Image src="/product-red/triangle.png" alt="" width={40} height={60} priority className={styles.triangle} />

        <Image src="/product-red/circle-big.png" alt="" width={100} height={99} priority className={styles.itemRedCircle} />
        <span className={styles.itemRedNum}>01</span>
        <span className={styles.itemRedLabel}>RED</span>

        <Image
          src="/product-yellow/circle-big.png"
          alt=""
          width={100}
          height={79}
          priority
          className={styles.itemYellowCircle}
        />
        <span className={styles.itemYellowNum}>02</span>
        <span className={styles.itemYellowLabel}>YELLOW</span>

        <Image
          src="/product-red/circle-small-b.png"
          alt=""
          width={61}
          height={59}
          priority
          className={styles.itemLimeCircle}
        />
        <span className={styles.itemLimeNum}>03</span>
        <span className={styles.itemLimeLabel}>LIME GREEN</span>

        <Image
          src="/product-red/circle-small-c.png"
          alt=""
          width={81}
          height={60}
          priority
          className={styles.itemBeigeCircle}
        />
        <span className={styles.itemBeigeNum}>04</span>
        <span className={styles.itemBeigeLabel}>BEIGE</span>
      </div>
    </div>
  );
}
