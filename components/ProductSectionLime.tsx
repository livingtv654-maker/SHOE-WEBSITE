import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import styles from "./ProductSectionLime.module.css";

export default function ProductSectionLime() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-lime/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/exact-red-splash.png" alt="" fill priority className={styles.splash} sizes="100vw" />
      <Image src="/product-red/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      
      {/* Giant Shoe Name Text BEHIND the Shoe */}
      <h2 className={styles.bgShoeName}>LIME</h2>

      <Image src="/product-lime/shoe.png" alt="Lime Shoe" width={720} height={536} priority className={styles.shoe} />

      <ProductCard
        edition="PULSE AIR 01 // ED-03"
        name="NEO PULSE"
        price="$240"
        rating="4.8"
        reviews="115"
        description="Features 3D-sculpted bio-foam cushioning, luminescent pulse glow trim, and high-visibility nighttime reflective accents."
        accentColor="#76ff03"
        accentRgb="118, 255, 3"
      />
    </div>
  );
}
