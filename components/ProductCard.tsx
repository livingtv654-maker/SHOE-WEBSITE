"use client";

import { useState } from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  edition?: string;
  name?: string;
  price: string;
  rating?: string;
  reviews?: string;
  description?: string;
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
    setTimeout(() => setAdded(false), 2200);
  };

  const cardStyle = {
    "--accent": accentColor,
    "--accent-rgb": accentRgb,
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={cardStyle}>
      {/* Unified Integrated Super-Pill Bar */}
      <div className={styles.superPill}>
        {/* Left Section: Embedded Size Selector */}
        <div className={styles.sizeSection}>
          <span className={styles.sizeLabel}>SIZE</span>
          <div className={styles.sizeList}>
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
        </div>

        {/* Elegant Vertical Divider */}
        <div className={styles.dividerLine} />

        {/* Right Section: Add to Cart CTA */}
        <button
          type="button"
          className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
          onClick={handleAddToCart}
        >
          <span className={styles.shimmer} />
          <span className={styles.btnPrice}>{price}</span>
          <span className={styles.dash}>—</span>
          <span className={styles.btnLabel}>
            {added ? (
              <span className={styles.addedState}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.checkIcon}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                ADDED
              </span>
            ) : (
              "ADD TO CART"
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
