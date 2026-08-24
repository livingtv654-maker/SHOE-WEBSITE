import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ProductSpecs from "@/components/ProductSpecs";
import styles from "./ProductSectionYellow.module.css";

export default function ProductSectionYellow() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-yellow/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/exact-red-splash.png" alt="" fill priority className={styles.splash} sizes="100vw" />
      <Image src="/product-red/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      
      {/* Giant Shoe Name Text BEHIND the Shoe */}
      <h2 className={styles.bgShoeName}>YELLOW</h2>

      <Image src="/product-yellow/shoe.png" alt="Yellow Shoe" width={720} height={536} priority className={styles.shoe} />

      {/* Left Technical Specifications Card */}
      <ProductSpecs
        editionNumber="02 / 04"
        specs={[
          { label: "CUSHIONING", value: "NITRO-FOAM RESPONSE" },
          { label: "UPPER MATERIAL", value: "CARBON-FUSED KNIT" },
          { label: "NET WEIGHT", value: "370 GRAMS" },
          { label: "TRACTION SYSTEM", value: "HIGH-SPEED PIVOT" },
        ]}
        barcodeId="SNK-VOLT-ED02"
      />

      {/* Right Product Buy Card */}
      <ProductCard
        edition="THUNDER AIR 01 // ED-02"
        name="VOLT THUNDER"
        price="₹5,299"
        rating="5.0"
        reviews="98"
        description="High-voltage neon volt accents fused with an ultralight carbon-fiber shank and energy-returning nitro foam sole."
        accentColor="#ffb800"
        accentRgb="255, 184, 0"
        image="/product-yellow/shoe.png"
      />
    </div>
  );
}
