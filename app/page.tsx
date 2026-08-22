import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSequence from "@/components/ProductSequence";
import ProductSectionRed from "@/components/ProductSectionRed";
import ProductSectionYellow from "@/components/ProductSectionYellow";
import ProductSectionLime from "@/components/ProductSectionLime";
import ProductSectionBeige from "@/components/ProductSectionBeige";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className={styles.heroSlot}>
          <HeroSection />
        </div>
        <ProductSequence
          states={[
            <ProductSectionRed key="red" />,
            <ProductSectionYellow key="yellow" />,
            <ProductSectionLime key="lime" />,
            <ProductSectionBeige key="beige" />,
          ]}
        />
      </main>
    </>
  );
}
