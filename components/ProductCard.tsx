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
  edition = "SONIC RED 01",
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
      id: edition.toLowerCase().replace(/[^a-z0-9]/g, "-"),
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
    <div className={styles.editorialCard} style={cardStyle}>
      {/* Product Tag & Name */}
      <div className={styles.metaRow}>
        <span className={styles.editionTag}>{edition}</span>
      </div>
      <h3 className={styles.productTitle}>{name}</h3>
      <div className={styles.priceRow}>
        <span className={styles.priceVal}>{price}</span>
        <span className={styles.taxNotice}>INCL. TAX</span>
      </div>

      {/* Sleek Minimal Add to Bag Button */}
      <button
        type="button"
        className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
        onClick={handleAddToCart}
        aria-label={`Add ${name} to shopping bag`}
      >
        {added ? (
          <span className={styles.addedState}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            ADDED TO BAG
          </span>
        ) : (
          <span className={styles.defaultState}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.bagIcon}
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            ADD TO BAG
          </span>
        )}
      </button>
    </div>
  );
}
