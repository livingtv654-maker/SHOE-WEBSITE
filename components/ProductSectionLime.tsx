import Image from "next/image";
import styles from "./ProductSectionLime.module.css";

// Index 2 of 4 in the Red -> Yellow -> Lime -> Beige sequence — its CSS reads --entrance-2 (arriving
// from Yellow) and --exit-2 (leaving for Beige). Navbar and arc/color-picker live in the shared
// ProductSequence component; layout anchors are shared 1:1 with the other three colors.
export default function ProductSectionLime() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-lime/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/product-lime/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      <Image src="/product-lime/shoe.png" alt="Shoe" width={720} height={536} priority className={styles.shoe} />

      <div className={styles.headlineBlock}>
        <p className={styles.builtTo}>BUILT TO</p>
        <p className={styles.stand}>STAND</p>
        <p className={styles.out}>OUT.</p>
      </div>
      <p className={styles.airLabel}>RBD AIR 01</p>

      <a href="#" className={styles.cta}>
        <Image src="/product-lime/button-bg.png" alt="" fill sizes="20vw" priority className={styles.ctaBg} />
        <span className={styles.ctaText}>EXPLORE THIS COLOR</span>
        <Image src="/product-lime/button-arrow.png" alt="" width={60} height={20} priority className={styles.ctaArrow} />
      </a>

      <Image src="/product-lime/vline-top.png" alt="" width={21} height={119} priority className={styles.vlineTop} />
      <span className={styles.verticalText}>BUILT TO STAND OUT.</span>
      <Image src="/product-lime/vline-bottom.png" alt="" width={21} height={138} priority className={styles.vlineBottom} />

      {/* Distinctive extra chrome from the Lime mockup that Red/Yellow/Beige don't have. */}
      <div className={styles.coords}>
        <span>40.7128° N</span>
        <span>74.0060° W</span>
      </div>
      <div className={styles.tickScale} aria-hidden="true">
        <span className={styles.tickLabelTop}>01</span>
        <span className={styles.tickDot} />
        <span className={styles.tickLine} />
        <span className={styles.tickLabelBottom}>04</span>
      </div>
      <p className={styles.scrollHint}>
        SCROLL TO EXPLORE
        <br />↓
      </p>
      <span className={styles.slashMark} aria-hidden="true">
        ///
      </span>
    </div>
  );
}
