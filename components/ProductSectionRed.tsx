import Image from "next/image";
import styles from "./ProductSectionRed.module.css";

// Always index 0 (the default/first-shown state) in the Red->Yellow sequence — its CSS reads
// --entrance-0/--exit-0 directly. Ported 1:1 from the "Red Product Section" Figma frame (1672x941),
// read back from the user's own hand-edited final state.
export default function ProductSectionRed() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-red/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/product-red/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      <Image src="/product-red/shoe.png" alt="Shoe" width={720} height={536} priority className={styles.shoe} />

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
      <p className={styles.airLabel}>ABD AIR 01</p>

      <div className={styles.paragraph}>
        <p>Iconic design.</p>
        <p>Premium craft.</p>
        <p>Timeless legacy.</p>
      </div>

      <a href="#" className={styles.cta}>
        <Image src="/product-red/button-bg.png" alt="" fill sizes="20vw" priority className={styles.ctaBg} />
        <span className={styles.ctaText}>EXPLORE THIS COLOR</span>
        <Image src="/product-red/button-arrow.png" alt="" width={60} height={20} priority className={styles.ctaArrow} />
      </a>

      <Image src="/product-red/vline-top.png" alt="" width={21} height={119} priority className={styles.vlineTop} />
      <span className={styles.verticalText}>BUILT TO STAND OUT.</span>
      <Image src="/product-red/vline-bottom.png" alt="" width={21} height={138} priority className={styles.vlineBottom} />

      <Image src="/product-red/arc.png" alt="" width={1414} height={118} priority className={styles.arc} />
      <Image src="/product-red/triangle.png" alt="" width={40} height={60} priority className={styles.triangle} />

      <Image src="/product-red/circle-big.png" alt="" width={100} height={99} priority className={styles.circleBig} />
      <span className={styles.circleBigNum}>01</span>
      <span className={styles.circleBigLabel}>RED</span>

      <Image src="/product-red/circle-small-a.png" alt="" width={60} height={59} priority className={styles.circle02} />
      <span className={styles.circle02Num}>02</span>
      <span className={styles.circle02Label}>YELLOW</span>

      <Image src="/product-red/circle-small-b.png" alt="" width={61} height={59} priority className={styles.circle03} />
      <span className={styles.circle03Num}>03</span>
      <span className={styles.circle03Label}>LIME GREEN</span>

      <Image src="/product-red/circle-small-c.png" alt="" width={81} height={60} priority className={styles.circle04} />
      <span className={styles.circle04Num}>04</span>
      <span className={styles.circle04Label}>BEIGE</span>
    </div>
  );
}
