"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./RedShoeTravel.module.css";

interface RedShoeTravelProps {
  isLoaded?: boolean;
}

export default function RedShoeTravel({ isLoaded = true }: RedShoeTravelProps) {
  const shoeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      if (!shoeRef.current) return;
      const viewportH = window.innerHeight;
      if (viewportH <= 0) return;

      // Real-time 1:1 continuous scroll progress between Hero (0) and Carousel (1)
      const heroProgress = Math.min(Math.max(window.scrollY / viewportH, 0), 1);
      shoeRef.current.style.setProperty("--hero-travel", String(heroProgress));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={shoeRef}
      className={`${styles.travelShoe} ${isLoaded ? styles.loaded : ""}`}
    >
      <div className={styles.shoeInner}>
        <Image
          src="/product-red/shoe.png"
          alt="Red Sneaker"
          fill
          priority
          sizes="(max-width: 1200px) 50vw, 43vw"
          className={styles.shoeImg}
        />
      </div>
    </div>
  );
}
