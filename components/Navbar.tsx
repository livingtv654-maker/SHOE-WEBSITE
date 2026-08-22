import styles from "./Navbar.module.css";

// This is the hero's original navbar (transparent, dark text, red logo/underline-on-hover),
// promoted to a single page-level, `position: fixed` instance. It used to be duplicated: once
// here in its correct style (but scrolling away with the hero), and a second time inside
// ProductSequence in a completely different style (solid black bar, white text) for the product
// sections — that second one was the unnecessary duplicate and has been removed. This is the only
// navbar now, and it keeps the hero's look everywhere.
export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>RED</span>
      <span className={styles.star} aria-hidden="true">
        &#9733;
      </span>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#home" className={`${styles.navItem} ${styles.navHome}`}>
          HOME
        </a>
        <a href="#products" className={`${styles.navItem} ${styles.navProducts}`}>
          PRODUCTS
        </a>
        <span className={`${styles.navItem} ${styles.navJournal}`}>JOURNAL</span>
        <span className={`${styles.navItem} ${styles.navAbout}`}>ABOUT</span>
      </nav>
    </div>
  );
}
