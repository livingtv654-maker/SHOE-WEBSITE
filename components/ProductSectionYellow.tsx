import Image from "next/image";
import styles from "./ProductSectionYellow.module.css";

// Always index 1 (last state) in the Red->Yellow sequence — its CSS reads --entrance-1 only. Navbar
// and arc/color-picker moved out to the shared ProductSequence component. Every structural anchor
// (headline, paragraph, CTA, shoe box, vertical text, shadow) is shared 1:1 with ProductSectionRed —
// only background, shoe photo, streak overlay, and copy/color differ.
export default function ProductSectionYellow() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-yellow/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/product-yellow/streak.png" alt="" width={1116} height={727} priority className={styles.streak} />
      <Image src="/product-red/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      <Image src="/product-yellow/shoe.png" alt="Shoe" width={720} height={536} priority className={styles.shoe} />

      <div className={styles.headlineBlock}>
        <p className={styles.builtTo}>BUILT TO</p>
        <p className={styles.stand}>STAND</p>
        <p className={styles.out}>OUT.</p>
      </div>
      <p className={styles.airLabel}>YBD AIR 01</p>

      <div className={styles.paragraph}>
        <p>Iconic design.</p>
        <p>Premium craft.</p>
        <p>Timeless legacy.</p>
      </div>

      <a href="#" className={styles.cta}>
        <Image src="/product-yellow/button-bg.png" alt="" fill sizes="20vw" priority className={styles.ctaBg} />
        <span className={styles.ctaText}>EXPLORE THIS COLOR</span>
        <Image src="/product-red/button-arrow.png" alt="" width={60} height={20} priority className={styles.ctaArrow} />
      </a>

      <Image src="/product-yellow/vline-top.png" alt="" width={21} height={119} priority className={styles.vlineTop} />
      <span className={styles.verticalText}>BUILT TO STAND OUT.</span>
      <Image src="/product-yellow/vline-bottom.png" alt="" width={21} height={138} priority className={styles.vlineBottom} />
    </div>
  );
}
