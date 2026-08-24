import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ProductSpecs from "@/components/ProductSpecs";
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

      {/* Left Technical Specifications Card */}
      <ProductSpecs
        editionNumber="04 / 04"
        specs={[
          { label: "CUSHIONING", value: "MEMORY-FOAM COLLAR" },
          { label: "UPPER MATERIAL", value: "ITALIAN NUBUCK SUEDE" },
          { label: "NET WEIGHT", value: "395 GRAMS" },
          { label: "TRACTION SYSTEM", value: "HERITAGE GUM RUBBER" },
        ]}
        barcodeId="SNK-SAND-ED04"
      />

      {/* Right Product Buy Card */}
      <ProductCard
        edition="SAND AIR 01 // ED-04"
        name="RAW SAND"
        price="₹4,999"
        rating="4.9"
        reviews="164"
        description="Crafted with premium Italian nubuck suede, natural earth-tone hues, and an ergonomic memory-foam collar for luxury comfort."
        accentColor="#d4a373"
        accentRgb="212, 163, 115"
        image="/product-beige/shoe.png"
      />
    </div>
  );
}
