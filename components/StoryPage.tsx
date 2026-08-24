"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./StoryPage.module.css";

/* ── Typewriter hook ── */
function useTypewriter(text: string, active: boolean, speed = 38) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return displayed;
}

/* ── Counter hook ── */
function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

const CRAFT_ITEMS = [
  { label: "UPPER", value: "Full-grain Italian Leather" },
  { label: "LINING", value: "Breathable Mesh + Microfibre" },
  { label: "MIDSOLE", value: "Nitrogen-Infused Foam Cell" },
  { label: "OUTSOLE", value: "Carbon-Rubber Traction Grid" },
  { label: "HARDWARE", value: "Brushed Stainless Eyelets" },
  { label: "STITCHING", value: "6-layer Reinforced Box Stitch" },
];

export default function StoryPage() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [sections, setSections] = useState({ s1: false, s2: false, s3: false, s4: false, s5: false });

  const mainRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);
  const s4Ref = useRef<HTMLElement>(null);
  const s5Ref = useRef<HTMLElement>(null);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const cur = window.scrollY;
      const max = el.scrollHeight - el.clientHeight;
      setScrollY(cur);
      setProgress(max > 0 ? (cur / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cursor follower
  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Intersection for each section
  useEffect(() => {
    const map: Record<string, keyof typeof sections> = {};
    const refs = [s1Ref, s2Ref, s3Ref, s4Ref, s5Ref];
    const keys: (keyof typeof sections)[] = ["s1", "s2", "s3", "s4", "s5"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const key = map[e.target.id];
          if (key && e.isIntersecting) setSections((p) => ({ ...p, [key]: true }));
        });
      },
      { threshold: 0.25 }
    );
    refs.forEach((r, i) => {
      if (r.current) {
        r.current.id = `sec-${i}`;
        map[`sec-${i}`] = keys[i];
        obs.observe(r.current);
      }
    });
    return () => obs.disconnect();
  }, []);

  // Counters
  const yr = useCounter(2019, sections.s2, 1600);
  const hrs = useCounter(48, sections.s4, 1400);

  // Typewriters
  const tw1 = useTypewriter("WE DIDN'T FOLLOW THE PATH.", sections.s1, 42);
  const tw3 = useTypewriter("RED ISN'T A COLOUR.\nIT'S A DECISION.", sections.s3, 38);

  // Parallax
  const parallax = (depth: number) => ({
    transform: `translateY(${scrollY * depth}px)`,
  });

  return (
    <>
      {/* ── Cursor ── */}
      <div
        className={styles.cursorBall}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />

      {/* ── Grain overlay ── */}
      <div className={styles.grain} aria-hidden="true" />

      {/* ── Progress bar ── */}
      <div className={styles.progressBar} style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className={styles.storyNav}>
        <Link href="/" className={styles.navBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          BACK
        </Link>
        <span className={styles.navBrand}>
          RED <span className={styles.navStar}>★</span>
        </span>
        <span className={styles.navLabel}>OUR STORY</span>
      </nav>

      <main ref={mainRef} className={styles.main}>

        {/* ══════════════════════════════════════════
            01 — MANIFESTO  (full-bleed cinematic opener)
        ══════════════════════════════════════════ */}
        <section ref={s1Ref} className={`${styles.panel} ${styles.panelOpener}`}>
          {/* Parallax BG layers */}
          <div className={styles.openerBg} style={parallax(0.18)} aria-hidden="true">
            <div className={styles.bgCircle1} />
            <div className={styles.bgCircle2} />
          </div>

          <div className={styles.openerContent}>
            <span className={`${styles.chapterTag} ${sections.s1 ? styles.tagIn : ""}`}>
              01 &mdash; ORIGIN
            </span>

            {/* Giant typewriter heading */}
            <h1 className={styles.manifestoHead}>
              {tw1.split("").map((ch, i) => (
                <span key={i} className={ch === "\n" ? styles.br : styles.char}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>

            <p className={`${styles.manifestoSub} ${sections.s1 ? styles.subIn : ""}`}>
              We built our own.
            </p>

            {/* Scroll hint */}
            <div className={`${styles.scrollHint} ${sections.s1 ? styles.hintIn : ""}`}>
              <span className={styles.scrollLine} />
              <span className={styles.scrollText}>SCROLL</span>
            </div>
          </div>

          {/* Vertical text ticker */}
          <div className={styles.vertTicker} aria-hidden="true">
            FEARLESS·BUILT·RED·FEARLESS·BUILT·RED·FEARLESS·BUILT·RED·
          </div>

          {/* Big background word */}
          <span className={styles.bgWord} style={parallax(-0.05)} aria-hidden="true">ORIGIN</span>
        </section>

        {/* ══════════════════════════════════════════
            02 — THE BEGINNING
        ══════════════════════════════════════════ */}
        <section ref={s2Ref} className={`${styles.panel} ${styles.panelDark}`}>
          <div className={styles.twoCol}>
            {/* Left: sticky number */}
            <div className={styles.stickyLeft}>
              <span className={styles.bigNumRed}>{yr}</span>
              <span className={styles.bigNumUnit}>FOUNDED</span>
              <span className={styles.bigNumSub}>Mumbai, India</span>
              <div className={styles.coordPill}>18.975° N &nbsp;72.825° E</div>
            </div>

            {/* Right: story body */}
            <div className={`${styles.storyBody} ${sections.s2 ? styles.bodyIn : ""}`}>
              <span className={styles.chapterTag}>02 &mdash; THE BEGINNING</span>
              <h2 className={styles.sectionHead}>
                BORN IN<br />
                <em className={styles.italicRed}>A GARAGE.</em>
              </h2>
              <p className={styles.bodyText}>
                A single sewing machine. Two hands. An obsession
                with perfection that most people call madness.
              </p>
              <p className={styles.bodyText}>
                The founders of RED weren&apos;t from fashion.
                They were engineers who believed your shoes
                should work as hard as you do.
              </p>
              <p className={styles.bodyText}>
                Every stitch was questioned. Every sole rebuilt
                three times before it left the bench.
              </p>

              <div className={styles.pillRow}>
                <span className={styles.pill}>01 Garage</span>
                <span className={styles.pill}>∞ Prototypes</span>
                <span className={styles.pill}>Zero Compromise</span>
              </div>
            </div>
          </div>

          <span className={styles.bgWordDark} style={parallax(-0.04)} aria-hidden="true">BEGIN</span>
        </section>

        {/* ══════════════════════════════════════════
            03 — THE COLOUR  (full RED immersion)
        ══════════════════════════════════════════ */}
        <section ref={s3Ref} className={`${styles.panel} ${styles.panelRed}`}>
          {/* Animated red particles */}
          <div className={styles.redBg} aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={styles.redOrb} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>

          <div className={styles.colourContent}>
            <span className={`${styles.chapterTagLight} ${sections.s3 ? styles.tagIn : ""}`}>
              03 &mdash; THE COLOUR
            </span>

            <h2 className={styles.colourHead}>
              {tw3.split("\n").map((line, li) => (
                <span key={li} className={styles.colourLine}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>

            <p className={`${styles.colourBody} ${sections.s3 ? styles.bodyIn : ""}`}>
              To wear red is to step forward when others step back.<br />
              To move first. To be seen. To be fearless.
            </p>

            {/* Glitch badge */}
            <div className={`${styles.glitchBadge} ${sections.s3 ? styles.glitchIn : ""}`} aria-label="RED">
              <span aria-hidden="true">RED</span>
              <span aria-hidden="true">RED</span>
              RED
            </div>
          </div>

          <span className={styles.bgWordRed} style={parallax(-0.03)} aria-hidden="true">RED</span>
        </section>

        {/* ══════════════════════════════════════════
            04 — THE CRAFT  (horizontal scroll strip)
        ══════════════════════════════════════════ */}
        <section ref={s4Ref} className={`${styles.panel} ${styles.panelCraft}`}>
          <div className={styles.craftTop}>
            <span className={styles.chapterTag}>04 &mdash; THE CRAFT</span>
            <h2 className={styles.sectionHead}>
              <em className={styles.italicRed}>{hrs}</em> HOURS<br />
              PER PAIR.
            </h2>
            <p className={styles.bodyText} style={{ maxWidth: 340 }}>
              Hand-finished. Obsessively tested. Never rushed.
            </p>
          </div>

          {/* Horizontal scroll rail */}
          <div className={styles.craftRail}>
            {CRAFT_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`${styles.craftCard} ${sections.s4 ? styles.cardIn : ""}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className={styles.craftCardIndex}>0{i + 1}</span>
                <span className={styles.craftCardLabel}>{item.label}</span>
                <span className={styles.craftCardDivider} />
                <span className={styles.craftCardValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            05 — THE MISSION  (closer)
        ══════════════════════════════════════════ */}
        <section ref={s5Ref} className={`${styles.panel} ${styles.panelMission}`}>
          <div className={styles.missionBg} style={parallax(0.12)} aria-hidden="true">
            <div className={styles.missionGlow} />
          </div>

          <div className={styles.missionContent}>
            <span className={`${styles.chapterTag} ${sections.s5 ? styles.tagIn : ""}`}>
              05 &mdash; THE MISSION
            </span>
            <h2 className={`${styles.missionHead} ${sections.s5 ? styles.missionIn : ""}`}>
              ENGINEERED<br />
              FOR THE<br />
              <em className={styles.italicRed}>FEARLESS.</em>
            </h2>
            <p className={`${styles.bodyText} ${sections.s5 ? styles.bodyIn : ""}`} style={{ maxWidth: 440, color: "#888" }}>
              DROP 01 is available now. Limited run. Zero restocks.
            </p>
            <Link
              href="/"
              className={`${styles.ctaBtn} ${sections.s5 ? styles.ctaIn : ""}`}
            >
              VIEW DROP 01 →
            </Link>
          </div>

          <span className={styles.bgWordDark} style={{ ...parallax(-0.04), right: "3%", left: "auto" }} aria-hidden="true">
            FEARLESS
          </span>
        </section>

      </main>

      {/* Footer strip */}
      <footer className={styles.storyFooter}>
        <span>© 2026 RED FOOTWEAR</span>
        <span className={styles.footerDot}>●</span>
        <span>ENGINEERED FOR THE FEARLESS.</span>
        <span className={styles.footerDot}>●</span>
        <span>18.975° N &nbsp;72.825° E</span>
      </footer>
    </>
  );
}
