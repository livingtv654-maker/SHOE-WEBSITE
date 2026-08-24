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
      <Image src="/hero/shoe-1.png" alt="Shoe" width={1314} height={1696} priority className={styles.shoeLeft} />
      <Image src="/hero/shoe-2.png" alt="Shoe" width={1488} height={2020} priority className={styles.shoeRight} />

      {/* Navbar now lives once, page-level, in <Navbar /> (position: fixed) — it used to be
          duplicated here and again in ProductSequence, which read as a flicker/swap on scroll. */}

      <Image src="/hero/plus-dark.png" alt="" width={24} height={24} priority className={styles.plusDark} />

      <div className={styles.coords}>
        <span>40.712&deg; N</span>
        <span>74.060&deg; W</span>
      </div>

      <Image src="/hero/plus-red-1.png" alt="" width={24} height={24} priority className={styles.plusRed1} />

      <Image src="/hero/fearless.png" alt="Fearless" width={326} height={1754} priority className={styles.fearless} />

      <div className={styles.headline}>
        <span className={styles.tagBadge}>SERIES // 01</span>
        <p>PRECISION BUILT.</p>
        <p className={styles.headlineRed}>FEARLESSLY RED.</p>
      </div>

      <Image src="/hero/dashes.png" alt="" width={108} height={27} priority className={styles.dashes} />

      <div className={styles.paragraph}>
        <p>Full-grain leather frame.</p>
        <p>Responsive air cushioning.</p>
        <p>Street-tested traction.</p>
      </div>

      <a href="#products" className={styles.cta}>
        <span className={styles.ctaBracketTL} aria-hidden="true" />
        <span className={styles.ctaBracketBR} aria-hidden="true" />
        <span className={styles.ctaBg} aria-hidden="true" />
        <span className={styles.ctaText}>DISCOVER THE AIR 01</span>
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
