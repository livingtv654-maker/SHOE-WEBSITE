import Image from "next/image";
import styles from "./ProductSectionYellow.module.css";

// Always index 1 (last state) in the Red->Yellow sequence — its CSS reads --entrance-1 only (never
// exits, there's nothing after it). Ported 1:1 from the "Yellow Product Section" Figma frame
// (1672x941), read back from the user's own hand-edited final state.
export default function ProductSectionYellow() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-yellow/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/product-yellow/streak.png" alt="" width={1116} height={727} priority className={styles.streak} />
      <Image src="/product-yellow/shoe.png" alt="Shoe" width={720} height={510} priority className={styles.shoe} />

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

      <p className={styles.builtTo}>BUILT TO</p>
      <p className={styles.stand}>STAND</p>
      <p className={styles.out}>OUT.</p>
      <p className={styles.airLabel}>YBD AIR 01</p>

      <div className={styles.paragraph}>
        <p>Iconic design.</p>
        <p>Premium craft.</p>
        <p>Timeless legacy.</p>
      </div>

      <a href="#" className={styles.cta}>
        <Image src="/product-yellow/button-bg.png" alt="" fill sizes="20vw" priority className={styles.ctaBg} />
        <span className={styles.ctaText}>EXPLORE THIS COLOR</span>
      </a>

      <Image src="/product-yellow/vline-top.png" alt="" width={21} height={119} priority className={styles.vlineTop} />
      <span className={styles.verticalText}>BUILT TO STAND OUT.</span>
      <Image src="/product-yellow/vline-bottom.png" alt="" width={21} height={138} priority className={styles.vlineBottom} />

      <Image src="/product-yellow/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />
      <Image src="/product-yellow/triangle.png" alt="" width={40} height={60} priority className={styles.triangle} />

      <Image src="/product-yellow/circle-big.png" alt="" width={100} height={79} priority className={styles.circleBig} />
      <span className={styles.circleBigNum}>02</span>
      <span className={styles.circleBigLabel}>YELLOW</span>

      <Image src="/product-yellow/circle-small-b.png" alt="" width={80} height={60} priority className={styles.circle01} />
      <span className={styles.circle01Num}>01</span>
      <span className={styles.circle01Label}>RED</span>

      <Image src="/product-yellow/circle-small-a.png" alt="" width={61} height={59} priority className={styles.circle03} />
      <span className={styles.circle03Num}>03</span>
      <span className={styles.circle03Label}>LIME GREEN</span>

      <Image src="/product-yellow/circle-small-a.png" alt="" width={61} height={59} priority className={styles.circle04} />
      <span className={styles.circle04Num}>04</span>
      <span className={styles.circle04Label}>BEIGE</span>
    </div>
  );
}
