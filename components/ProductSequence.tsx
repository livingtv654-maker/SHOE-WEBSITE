"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./ProductSequence.module.css";

type Props = {
  states: ReactNode[];
  scrubViewportsPerTransition?: number;
};

const COLORS = [
  { id: "red", label: "RED" },
  { id: "yellow", label: "YELLOW" },
  { id: "lime", label: "LIME GREEN" },
  { id: "beige", label: "BEIGE" },
];

// The arc has exactly 4 physical slots (leftmost, center-left, active/center, rightmost), fixed in
// screen space. As scrolling advances, every color's *occupied slot* shifts by one position — this
// is a conveyor, not a rotating ring: a color enters from beyond the leftmost slot (off-canvas,
// enlarging in) and exits beyond the rightmost slot (off-canvas, shrinking out). `offset` is each
// color's position relative to whichever color is currently active (0 = active/center, positive =
// slots to the left, negative = slots to the right). The two extra anchors at offset 3 and -2 are
// virtual off-canvas rest points (opacity 0) that entering/exiting colors interpolate from/to, so
// motion is always a smooth slide through adjacent anchors — never a jump across the whole arc,
// which was the original "magically teleports to the other side" bug.
const SLOT_ANCHORS = [
  { offset: 3, left: 5.4, top: 87.2, width: 3.649, height: 6.271, opacity: 0 }, // off-canvas, not yet entered
  { offset: 2, left: 18.24, top: 85.548, width: 3.649, height: 6.271, opacity: 1 }, // leftmost
  { offset: 1, left: 31.1, top: 83.528, width: 3.589, height: 6.271, opacity: 1 }, // center-left
  { offset: 0, left: 47.01, top: 78.746, width: 5.981, height: 10.521, opacity: 1 }, // active/center
  { offset: -1, left: 72.368, top: 83.847, width: 4.845, height: 6.376, opacity: 1 }, // rightmost
  { offset: -2, left: 97.7, top: 87.4, width: 4.845, height: 6.376, opacity: 0 }, // off-canvas, already exited
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Linearly interpolates every numeric field of SLOT_ANCHORS at a continuous `offset` by finding
// the two bracketing anchors (anchors are sorted high-to-low) and blending between them.
function anchorAt(offset: number) {
  const clamped = Math.min(3, Math.max(-2, offset));
  for (let i = 0; i < SLOT_ANCHORS.length - 1; i++) {
    const a = SLOT_ANCHORS[i];
    const b = SLOT_ANCHORS[i + 1];
    if (clamped <= a.offset && clamped >= b.offset) {
      const t = a.offset === b.offset ? 0 : (a.offset - clamped) / (a.offset - b.offset);
      return {
        left: lerp(a.left, b.left, t),
        top: lerp(a.top, b.top, t),
        width: lerp(a.width, b.width, t),
        height: lerp(a.height, b.height, t),
        opacity: lerp(a.opacity, b.opacity, t),
      };
    }
  }
  return SLOT_ANCHORS[SLOT_ANCHORS.length - 1];
}

function wrapOffset(raw: number) {
  // Wraps into (-2, 2] on a period of 4 (4 colors cycling through 4 identities of slot).
  let o = raw % 4;
  if (o > 2) o -= 4;
  if (o <= -2) o += 4;
  return o;
}

export default function ProductSequence({ states, scrubViewportsPerTransition = 0.5 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
        for (let i = 0; i < stateCount; i++) {
          const entrance = targetIndex >= i ? 1 : 0;
          const exit = targetIndex >= i + 1 ? 1 : 0;
          sticky.style.setProperty(`--entrance-${i}`, String(entrance));
          sticky.style.setProperty(`--exit-${i}`, String(exit));
          document.documentElement.style.setProperty(`--entrance-${i}`, String(entrance));
          document.documentElement.style.setProperty(`--exit-${i}`, String(exit));
        }
      }

      // Continuous (not step-quantized) position drives the arc so it slides smoothly between
      // scroll ticks instead of snapping only at the rounded target index.
      COLORS.forEach((_, i) => {
        const offset = wrapOffset(i - rawProgress);
        const a = anchorAt(offset);
        const slot = slotRefs.current[i];
        if (slot) {
          slot.style.left = `${a.left}%`;
          slot.style.top = `${a.top}%`;
          slot.style.width = `${a.width}%`;
          slot.style.height = `${a.height}%`;
          slot.style.opacity = String(a.opacity);
        }
        const label = labelRefs.current[i];
        if (label) {
          const proximity = Math.max(0, 1 - Math.abs(offset));
          label.style.color = `color-mix(in srgb, #111111 ${(1 - proximity) * 100}%, #ffffff ${proximity * 100}%)`;
        }
      });
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

        {/* Shared arc: the curved line and pointer never move — the pointer always sits above the
            active/center slot, and which color occupies each of the 4 slots is what animates. */}
        <Image src="/product-red/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />
        <Image src="/product-red/triangle.png" alt="" width={40} height={60} priority className={styles.triangle} />

        {COLORS.map((color, i) => {
          // Rendered (and SSR'd) with the rest-state position already correct, so there's no
          // flash of stacked/unstyled circles before the scroll handler's first frame runs — the
          // effect above then takes over via the refs on every subsequent frame.
          const restAnchor = anchorAt(wrapOffset(i));
          return (
            <div
              key={color.id}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className={styles.slot}
              style={{
                left: `${restAnchor.left}%`,
                top: `${restAnchor.top}%`,
                width: `${restAnchor.width}%`,
                height: `${restAnchor.height}%`,
                opacity: restAnchor.opacity,
              }}
            >
              <Image
                src="/product-red/circle-small-b.png"
                alt=""
                fill
                priority
                sizes="80px"
                className={styles.slotCircleImg}
              />
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className={styles.label}
              >
                {color.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
