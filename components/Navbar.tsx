"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

// This is the hero's original navbar (transparent, dark text, red logo/underline-on-hover),
// promoted to a single page-level, `position: fixed` instance that stays visible for the whole
// page. Once the hero has scrolled past and the colored product sections are behind it, dark text
// stops being legible — so it switches to white (and inverts to black on hover) once we're past
// one viewport height, the same "scrolled" threshold pattern the SONIC site's SiteHeader used.
export default function Navbar() {
  const [inProductSection, setInProductSection] = useState(false);

  useEffect(() => {
    function onScroll() {
      setInProductSection(window.scrollY > window.innerHeight - 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.navbar} ${inProductSection ? styles.inProductSection : ""}`}>
      <span className={styles.logo}>RED</span>
      <span className={styles.star} aria-hidden="true">
        &#9733;
      </span>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#home" className={`${styles.navItem} ${styles.navHome}`}>
          HOME
        </a>
        <a href="#products" className={`${styles.navItem} ${styles.navProducts}`}>
          PRODUCTS
        </a>
        <span className={`${styles.navItem} ${styles.navJournal}`}>JOURNAL</span>
        <span className={`${styles.navItem} ${styles.navAbout}`}>ABOUT</span>
      </nav>
    </div>
  );
}
