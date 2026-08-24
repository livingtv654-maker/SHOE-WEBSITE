import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ProductSpecs from "@/components/ProductSpecs";
import styles from "./ProductSectionRed.module.css";

export default function ProductSectionRed() {
  return (
    <div className={styles.wrap}>
      <Image src="/product-red/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
      <Image src="/exact-red-splash.png" alt="" fill priority className={styles.splash} sizes="100vw" />
      <Image src="/product-red/shadow.png" alt="" width={538} height={60} priority className={styles.shadow} />
      
      {/* Giant Shoe Name Text BEHIND the Shoe */}
      <h2 className={styles.bgShoeName}>RED</h2>

      {/* Left Technical Specifications Card */}
      <ProductSpecs
        editionNumber="01 / 04"
        specs={[
          { label: "CUSHIONING", value: "DUAL NITROGEN AIR" },
          { label: "UPPER MATERIAL", value: "FULL-GRAIN LEATHER" },
          { label: "NET WEIGHT", value: "385 GRAMS" },
          { label: "TRACTION SYSTEM", value: "ALL-WEATHER GRIP" },
        ]}
        barcodeId="SNK-RED-ED01"
      />

      {/* Right Product Buy Card */}
      <ProductCard
        edition="RED AIR 01 // ED-01"
        name="HERITAGE RED"
        price="₹4,999"
        rating="4.9"
        reviews="142"
        description="Crafted with hand-burnished crimson full-grain leather, dual-nitrogen air cushioning, and street-tested high-traction outsoles."
        accentColor="#e31e24"
        accentRgb="227, 30, 36"
        image="/product-red/shoe.png"
      />
    </div>
  );
}
