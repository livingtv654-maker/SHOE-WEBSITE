import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import styles from "./ProductSectionBeige.module.css";

export default function ProductSectionBeige() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-beige/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/exact-red-splash.png" alt="" fill priority className={styles.splash} sizes="100vw" />
      <Image src="/product-beige/shadow.png" alt="" width={598} height={80} priority className={styles.shadow} />
      
      {/* Giant Shoe Name Text BEHIND the Shoe */}
      <h2 className={styles.bgShoeName}>BEIGE</h2>

      <Image src="/product-beige/shoe.png" alt="Beige Shoe" width={720} height={536} priority className={styles.shoe} />

      <ProductCard
        edition="SAND AIR 01 // ED-04"
        name="RAW SAND"
        price="$250"
        rating="4.9"
        reviews="164"
        description="Crafted with premium Italian nubuck suede, natural earth-tone hues, and an ergonomic memory-foam collar for luxury comfort."
        accentColor="#d4a373"
        accentRgb="212, 163, 115"
      />
    </div>
  );
}
