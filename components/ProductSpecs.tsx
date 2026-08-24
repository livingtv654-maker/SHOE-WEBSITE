"use client";

import styles from "./ProductSpecs.module.css";

interface SpecItem {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  editionNumber?: string;
  specs?: SpecItem[];
  barcodeId?: string;
}

export default function ProductSpecs({
  editionNumber = "01 / 04",
  specs = [
    { label: "CUSHIONING", value: "DUAL NITROGEN AIR" },
    { label: "UPPER", value: "FULL-GRAIN LEATHER" },
    { label: "WEIGHT", value: "385 GRAMS" },
    { label: "TRACTION", value: "ALL-WEATHER GRIP" },
  ],
  barcodeId = "SNK-2026-AIR-01",
}: ProductSpecsProps) {
  return (
    <div className={styles.specsWrap}>
      {/* Index Counter */}
      <div className={styles.indexRow}>
        <span className={styles.indexBadge}>EDITION {editionNumber}</span>
        <span className={styles.statusLive}>● IN STOCK</span>
      </div>

      {/* Grid of Spec Items */}
      <div className={styles.specGrid}>
        {specs.map((item, idx) => (
          <div key={idx} className={styles.specCard}>
            <span className={styles.specLabel}>{item.label}</span>
            <span className={styles.specValue}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Technical Barcode Footer */}
      <div className={styles.barcodeRow}>
        <div className={styles.barcodeLines}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className={styles.barcodeCode}>{barcodeId}</span>
      </div>
    </div>
  );
}
