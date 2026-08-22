import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.wrap}>
      <Image src="/hero/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />

      <Image src="/hero/circle.png" alt="" width={650} height={648} priority className={styles.circle} />
      <Image src="/hero/grid.png" alt="" width={260} height={238} priority className={styles.grid} />
      <Image src="/hero/shadow-1.png" alt="" width={210} height={84} priority className={styles.shadow1} />
      <Image src="/hero/shadow-2.png" alt="" width={340} height={99} priority className={styles.shadow2} />
      <Image src="/hero/shoe-1.png" alt="Shoe" width={329} height={424} priority className={styles.shoeLeft} />
      <Image src="/hero/shoe-2.png" alt="Shoe" width={372} height={505} priority className={styles.shoeRight} />

      <span className={styles.logo}>RED</span>
      <span className={styles.star} aria-hidden="true">
        &#9733;
      </span>

      <nav className={styles.nav} aria-label="Primary">
        <span className={`${styles.navItem} ${styles.navHome}`}>HOME</span>
        <span className={styles.navUnderline} aria-hidden="true" />
        <span className={`${styles.navItem} ${styles.navProducts}`}>PRODUCTS</span>
        <span className={`${styles.navItem} ${styles.navJournal}`}>JOURNAL</span>
        <span className={`${styles.navItem} ${styles.navAbout}`}>ABOUT</span>
      </nav>

      <Image src="/hero/plus-dark.png" alt="" width={24} height={24} priority className={styles.plusDark} />

      <div className={styles.coords}>
        <span>40.712&deg; N</span>
        <span>74.060&deg; W</span>
      </div>

      <Image src="/hero/plus-red-1.png" alt="" width={24} height={24} priority className={styles.plusRed1} />

      <span className={styles.fearless} aria-hidden="true">
        FEARLESS
      </span>

      <div className={styles.headline}>
        <p>FROM THE STREETS</p>
        <p>TO THE TOP,</p>
        <p className={styles.headlineRed}>WE MOVE DIFFERENT.</p>
      </div>

      <Image src="/hero/dashes.png" alt="" width={108} height={27} priority className={styles.dashes} />

      <div className={styles.paragraph}>
        <p>Engineered for those</p>
        <p>who break the pattern.</p>
        <p>This is not just a shoe.</p>
        <p>This is a movement.</p>
      </div>

      <a href="#" className={styles.cta}>
        <Image src="/hero/cta-button.png" alt="" width={316} height={60} priority className={styles.ctaBg} />
        <span className={styles.ctaText}>EXPLORE COLLECTION</span>
      </a>

      <span className={styles.feel} aria-hidden="true">
        FEEL
      </span>

      <Image src="/hero/barcode.png" alt="" width={138} height={51} priority className={styles.barcode} />
      <span className={styles.rbd}>RBD - 2024</span>
      <Image src="/hero/plus-red-2.png" alt="" width={24} height={24} priority className={styles.plusRed2} />
    </div>
  );
}
