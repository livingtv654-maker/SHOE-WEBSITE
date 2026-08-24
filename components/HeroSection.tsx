import Image from "next/image";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  isLoaded?: boolean;
}

export default function HeroSection({ isLoaded = true }: HeroSectionProps) {
  return (
    <div className={`${styles.wrap} ${isLoaded ? styles.loaded : ""}`}>
      <Image src="/hero/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />

      <Image src="/hero/circle.png" alt="" width={650} height={648} priority className={styles.circle} />
      <Image src="/hero/grid.png" alt="" width={260} height={238} priority className={styles.grid} />
      <Image src="/hero/shadow-1.png" alt="" width={210} height={84} priority className={styles.shadow1} />
      <Image src="/hero/shadow-2.png" alt="" width={340} height={99} priority className={styles.shadow2} />
      <Image src="/hero/shoe-1.png" alt="Shoe Left" width={1314} height={1696} priority className={styles.shoeLeft} />

      <Image src="/hero/plus-dark.png" alt="" width={24} height={24} priority className={styles.plusDark} />

      {/* Updated to Mumbai coords */}
      <div className={styles.coords}>
        <span>18.975&deg; N</span>
        <span>72.825&deg; E</span>
      </div>

      <Image src="/hero/plus-red-1.png" alt="" width={24} height={24} priority className={styles.plusRed1} />

      <Image src="/hero/fearless.png" alt="Fearless" width={326} height={1754} priority className={styles.fearless} />

      <div className={styles.headline}>
        {/* Updated badge */}
        <span className={styles.tagBadge}>DROP 01 — 2026</span>
        {/* Updated headline — staggered lines */}
        <p className={styles.headlineLine1}>BUILT WITHOUT</p>
        <p className={`${styles.headlineLine2} ${styles.headlineRed}`}>LIMITS.</p>
      </div>

      <Image src="/hero/dashes.png" alt="" width={108} height={27} priority className={styles.dashes} />

      {/* Updated sub-copy — tighter, punchier */}
      <div className={styles.paragraph}>
        <p className={styles.paraLine1}>Premium leather.</p>
        <p className={styles.paraLine2}>Nitrogen-cushioned.</p>
        <p className={styles.paraLine3}>Street-proven.</p>
      </div>

      {/* Updated CTA text */}
      <a href="#products" className={styles.cta}>
        <span className={styles.ctaBracketTL} aria-hidden="true" />
        <span className={styles.ctaBracketBR} aria-hidden="true" />
        <span className={styles.ctaBg} aria-hidden="true" />
        <span className={styles.ctaText}>EXPLORE THE COLLECTION</span>
        <span className={styles.ctaArrowWrap}>
          <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>

      <span className={styles.feel} aria-hidden="true">
        FEET
      </span>
    </div>
  );
}
