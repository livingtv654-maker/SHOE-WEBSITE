import HeroSection from "@/components/HeroSection";
import ProductSequence from "@/components/ProductSequence";
import ProductSectionRed from "@/components/ProductSectionRed";
import ProductSectionYellow from "@/components/ProductSectionYellow";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.heroSlot}>
        <HeroSection />
      </div>
      <ProductSequence states={[<ProductSectionRed key="red" />, <ProductSectionYellow key="yellow" />]} />
    </main>
  );
}
