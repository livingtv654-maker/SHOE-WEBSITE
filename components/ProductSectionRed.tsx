import Image from "next/image";
import styles from "./ProductSectionRed.module.css";

// Always index 0 (the default/first-shown state) in the Red->Yellow sequence — its CSS reads
// --entrance-0/--exit-0 directly. Navbar and arc/color-picker now live once, shared, in
// ProductSequence — this only carries what's actually unique to Red: background, shoe photo,
// headline copy, paragraph, and CTA.
export default function ProductSectionRed() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-red/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/product-red/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      <Image src="/product-red/shoe.png" alt="Shoe" width={720} height={536} priority className={styles.shoe} />

      <div className={styles.headlineBlock}>
        <p className={styles.builtTo}>BUILT TO</p>
        <p className={styles.stand}>STAND</p>
        <p className={styles.out}>OUT.</p>
      </div>
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
    </div>
  );
}
