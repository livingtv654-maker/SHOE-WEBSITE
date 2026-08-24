"use client";

import { useState } from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  edition: string;
  name: string;
  price: string;
  rating?: string;
  reviews?: string;
  description: string;
  accentColor?: string;
  accentRgb?: string;
}

export default function ProductCard({
  price,
  accentColor = "#e31e24",
  accentRgb = "227, 30, 36",
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState("10");
  const [added, setAdded] = useState(false);

  const sizes = ["8", "9", "10", "11", "12"];

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const cardStyle = {
    "--accent": accentColor,
    "--accent-rgb": accentRgb,
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={cardStyle}>
      {/* Sleek Horizontal Size Selector */}
      <div className={styles.sizeRow}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`${styles.sizeBtn} ${
              selectedSize === size ? styles.selectedSize : ""
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Dynamic CTA Pill */}
      <button
        type="button"
        className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
        onClick={handleAddToCart}
      >
        <span className={styles.btnPrice}>{price}</span>
        <span className={styles.divider}>—</span>
        <span>{added ? "ADDED TO CART!" : "ADD TO CART"}</span>
      </button>
    </div>
  );
}
