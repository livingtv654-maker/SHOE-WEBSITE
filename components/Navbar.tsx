import styles from "./Navbar.module.css";

// Single instance for the whole page, `position: fixed` — previously this markup was duplicated
// once inside HeroSection (scrolled away with the hero) and again inside ProductSequence (pinned
// only while scrolling through the product states), which read as a janky navbar swap/flicker as
// you crossed from one section into the next. Now there is exactly one navbar and it genuinely
// follows the user for the whole page. The underline color still tracks the shared `--entrance-1`
// scroll-progress custom property (set on <html> by ProductSequence) so it blends red -> yellow in
// step with the product crossfade, same as before.
export default function Navbar() {
  return (
    <header className={styles.navbar}>
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
    </header>
  );
}
