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
  edition,
  name,
  price,
  rating = "4.9",
  reviews = "128",
  description,
  accentColor = "#e31e24",
  accentRgb = "227, 30, 36",
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState("10");
  const [added, setAdded] = useState(false);

  const sizes = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

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
      {/* Header Info */}
      <div className={styles.header}>
        <div>
          <span className={styles.editionTag}>{edition}</span>
          <h3 className={styles.productName}>{name}</h3>
        </div>
        <span className={styles.price}>{price}</span>
      </div>

      {/* Rating & Stock */}
      <div className={styles.metaRow}>
        <div className={styles.ratingGroup}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.ratingText}>
            {rating} ({reviews})
          </span>
        </div>
        <span className={styles.stockBadge}>IN STOCK</span>
      </div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Size Selector */}
      <div className={styles.sizeSection}>
        <div className={styles.sizeHeader}>
          <span className={styles.sizeTitle}>SELECT SIZE (US)</span>
          <span className={styles.sizeGuide}>SIZE GUIDE</span>
        </div>
        <div className={styles.sizeGrid}>
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

      {/* Add To Cart Button */}
      <button
        type="button"
        className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
        onClick={handleAddToCart}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.cartIcon}
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span>{added ? "ADDED TO CART!" : "ADD TO CART"}</span>
      </button>
    </div>
  );
}
