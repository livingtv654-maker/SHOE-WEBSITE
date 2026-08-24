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
        // outside this component and isn't a descendant of `.sticky`) can read these too, for its
        // color-blended underline as the sequence advances through all four colors.
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

        {/* ---- Shared horizontal color carousel: the arc background never changes, and all four
            color dots cycle through the same 4 fixed slots (each arriving at the big/active center
            slot during its own turn) driven by the --entrance-N progress values above — so scrolling
            reads as a genuine left-to-right carousel, not a page-style up/down swap. Each item uses
            only its own "circle-big" image (a plain filled circle), scaled down via the slot's own
            interpolated width/height when inactive rather than swapping to a separate small asset.

            Red, Yellow, and Beige each cross the arc's right-to-left wrap boundary once within this
            4-state sequence — rather than sliding all the way across (which read as "flying to the
            other side"), each renders as two instances: one that's fixed at the rightmost slot and
            shrinks/fades out, and a second that appears already-small at the leftmost slot and
            grows/fades in — a real corner circle disappearing off one edge while a new one grows in
            from the other, never traveling the distance between. Lime's path never crosses that
            boundary within these 4 states, so it stays a single sliding instance. See
            ProductSequence.module.css for the exact per-item blend math. */}
        <Image src="/product-red/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />

        {/* Each circle + its number share one positioned box (.itemXSlot) so the number is centered
            with `inset: 0` + flex instead of being separately hand-placed. */}
        <div className={styles.itemRedSlot}>
          <Image src="/product-red/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemRedNum}>01</span>
        </div>
        <span className={styles.itemRedLabel}>RED</span>
        <div className={styles.itemRedSlotWrapped}>
          <Image src="/product-red/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemRedNum}>01</span>
        </div>
        <span className={styles.itemRedLabelWrapped}>RED</span>

        <div className={styles.itemYellowSlot}>
          <Image src="/product-yellow/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemYellowNum}>02</span>
        </div>
        <span className={styles.itemYellowLabel}>YELLOW</span>
        <div className={styles.itemYellowSlotWrapped}>
          <Image src="/product-yellow/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemYellowNum}>02</span>
        </div>
        <span className={styles.itemYellowLabelWrapped}>YELLOW</span>

        <div className={styles.itemLimeSlot}>
          <Image src="/product-lime/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemLimeNum}>03</span>
        </div>
        <span className={styles.itemLimeLabel}>LIME GREEN</span>

        <div className={styles.itemBeigeSlot}>
          <Image src="/product-beige/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemBeigeNum}>04</span>
        </div>
        <span className={styles.itemBeigeLabel}>BEIGE</span>
        <div className={styles.itemBeigeSlotWrapped}>
          <Image src="/product-beige/circle-big.png" alt="" fill priority sizes="80px" className={styles.slotCircleImg} />
          <span className={styles.itemBeigeNum}>04</span>
        </div>
        <span className={styles.itemBeigeLabelWrapped}>BEIGE</span>
      </div>
    </div>
  );
}
