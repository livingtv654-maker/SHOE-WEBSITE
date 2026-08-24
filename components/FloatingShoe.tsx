"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./FloatingShoe.module.css";

export default function FloatingShoe() {
  const shoeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!shoeRef.current) return;
      const viewportH = window.innerHeight;
      if (viewportH <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / viewportH, 0), 1);
      shoeRef.current.style.setProperty("--travel", String(progress));

      // Opacity: fade in 0→15%, visible 15→80%, fade out 80→100%
      let opacity = 0;
      if (progress < 0.15) {
        opacity = progress / 0.15;
      } else if (progress < 0.8) {
        opacity = 1;
      } else {
        opacity = (1 - progress) / 0.2;
      }
      shoeRef.current.style.opacity = String(Math.max(opacity, 0));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={shoeRef} className={styles.floatingShoe}>
      <Image
        src="/hero/shoe-2.png"
        alt=""
        fill
        priority
        className={styles.img}
      />
    </div>
  );
}
