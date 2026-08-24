"use client";

import { useEffect, useRef } from "react";
import styles from "./StoryPage.module.css";
import Link from "next/link";

export default function StoryPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const sections = document.querySelectorAll(`.${styles.revealSection}`);
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>

      {/* ── Minimal Nav ── */}
      <nav className={styles.storyNav}>
        <Link href="/" className={styles.navBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          BACK
        </Link>
        <span className={styles.navBrand}>RED <span className={styles.navStar}>★</span></span>
        <span className={styles.navLabel}>OUR STORY</span>
      </nav>

      {/* ── 01 Opening Manifesto ── */}
      <section className={`${styles.panel} ${styles.panelOpener}`}>
        <div className={styles.panelInner}>
          <span className={`${styles.chapter} ${styles.revealSection}`}>01 — ORIGIN</span>
          <h1 className={`${styles.manifestoHead} ${styles.revealSection}`}>
            WE DIDN&apos;T<br />
            <em className={styles.italic}>FOLLOW</em><br />
            THE PATH.
          </h1>
          <p className={`${styles.manifestoSub} ${styles.revealSection}`}>
            We built our own.
          </p>
        </div>
        {/* Decorative vertical ticker */}
        <div className={styles.verticalTicker} aria-hidden="true">
          <span>FEARLESS · BUILT · RED · FEARLESS · BUILT · RED · </span>
        </div>
      </section>

      {/* ── 02 Origin Story ── */}
      <section className={`${styles.panel} ${styles.panelDark}`}>
        <div className={styles.storyGrid}>
          <div className={`${styles.storyLeft} ${styles.revealSection}`}>
            <span className={styles.chapter}>02 — THE BEGINNING</span>
            <h2 className={styles.sectionHead}>
              BORN IN<br />A GARAGE.
            </h2>
          </div>
          <div className={`${styles.storyRight} ${styles.revealSection}`}>
            <p className={styles.bodyText}>
              2019. Mumbai. A single sewing machine, two
              hands, and an obsession with perfection.
            </p>
            <p className={styles.bodyText}>
              The founders of RED weren&apos;t from the fashion
              world. They were engineers who believed your
              shoes should work as hard as you do.
            </p>
            <p className={styles.bodyText}>
              Every stitch was questioned. Every sole was
              rebuilt three times before it left the bench.
            </p>
            <div className={styles.statRow}>
              <div className={styles.stat}>
                <span className={styles.statNum}>2019</span>
                <span className={styles.statLabel}>Founded</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>01</span>
                <span className={styles.statLabel}>Garage</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>∞</span>
                <span className={styles.statLabel}>Prototypes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 The Colour ── */}
      <section className={`${styles.panel} ${styles.panelRed}`}>
        <div className={styles.panelInner}>
          <span className={`${styles.chapterLight} ${styles.revealSection}`}>03 — THE COLOUR</span>
          <h2 className={`${styles.colourHead} ${styles.revealSection}`}>
            RED ISN&apos;T<br />A COLOUR.<br />
            <em className={styles.italicLight}>IT&apos;S A DECISION.</em>
          </h2>
          <p className={`${styles.colourBody} ${styles.revealSection}`}>
            To wear red is to step forward when others step back.<br />
            To move first. To be seen. To be fearless.
          </p>
        </div>
      </section>

      {/* ── 04 The Craft ── */}
      <section className={`${styles.panel} ${styles.panelDark}`}>
        <div className={styles.craftGrid}>
          <div className={`${styles.craftNum} ${styles.revealSection}`}>
            <span className={styles.bigNum}>48</span>
            <span className={styles.bigNumLabel}>HOURS</span>
            <p className={styles.bigNumSub}>to hand-finish<br />every pair</p>
          </div>
          <div className={styles.craftLines}>
            {[
              { label: "UPPER", value: "Full-grain Italian Leather" },
              { label: "LINING", value: "Breathable Mesh + Microfibre" },
              { label: "MIDSOLE", value: "Nitrogen-Infused Foam Cell" },
              { label: "OUTSOLE", value: "Carbon-Rubber Traction Grid" },
              { label: "HARDWARE", value: "Brushed Stainless Eyelets" },
              { label: "STITCHING", value: "6-layer reinforced box stitch" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`${styles.craftLine} ${styles.revealSection}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className={styles.craftLineLabel}>{item.label}</span>
                <span className={styles.craftLineDivider} />
                <span className={styles.craftLineValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 The Mission ── */}
      <section className={`${styles.panel} ${styles.panelMission}`}>
        <div className={styles.panelInner}>
          <span className={`${styles.chapter} ${styles.revealSection}`}>05 — THE MISSION</span>
          <h2 className={`${styles.missionHead} ${styles.revealSection}`}>
            ENGINEERED<br />FOR THE<br />
            <em className={styles.italic}>FEARLESS.</em>
          </h2>
          <div className={`${styles.missionCta} ${styles.revealSection}`}>
            <Link href="/" className={styles.ctaBtn}>
              VIEW THE DROP 01 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <footer className={styles.storyFooter}>
        <span>© 2026 RED FOOTWEAR</span>
        <span>ENGINEERED FOR THE FEARLESS.</span>
        <span>18.975° N  72.825° E</span>
      </footer>

    </main>
  );
}
