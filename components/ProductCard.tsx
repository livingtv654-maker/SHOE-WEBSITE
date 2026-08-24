"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  edition?: string;
  name?: string;
  price?: string;
  rating?: string;
  reviews?: string;
  description?: string;
  accentColor?: string;
  accentRgb?: string;
  image?: string;
}

export default function ProductCard({
  edition = "SERIES // 01",
  name = "HERITAGE RED",
  price = "₹4,999",
  accentColor = "#e31e24",
  image = "/product-red/shoe.png",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    addToCart({
      id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: name,
      edition: edition,
      price: parseInt(price.replace(/[^0-9]/g, "")) || 4999,
      color: accentColor,
      image: image,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const cardStyle = {
    "--accent": accentColor,
  } as React.CSSProperties;

  return (
    <div className={styles.glassCard} style={cardStyle}>
      {/* Top Tag & Title */}
      <div className={styles.headerRow}>
        <span className={styles.editionPill}>{edition}</span>
      </div>

      <h3 className={styles.shoeTitle}>{name}</h3>

      {/* Price & Add to Cart Action Row */}
      <div className={styles.actionRow}>
        <div className={styles.priceWrap}>
          <span className={styles.priceVal}>{price}</span>
          <span className={styles.taxTag}>INCL. TAX</span>
        </div>

        <button
          type="button"
          className={`${styles.cartBtn} ${added ? styles.addedBtn : ""}`}
          onClick={handleAddToCart}
          aria-label={`Add ${name} to shopping bag`}
        >
          {added ? (
            <span className={styles.addedState}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              ADDED
            </span>
          ) : (
            <span className={styles.defaultState}>
              ADD TO CART
              <svg
                className={styles.arrowIcon}
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
