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
  name = "RED AIR EDITION",
  price = "$250",
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
      price: parseInt(price.replace(/[^0-9]/g, "")) || 250,
      color: accentColor,
      image: image,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const cardStyle = {
    "--accent": accentColor,
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={cardStyle}>
      {/* Clean Minimal Add to Cart Button (Price Removed) */}
      <button
        type="button"
        className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
        onClick={handleAddToCart}
      >
        <span className={styles.shimmer} />
        <span className={styles.btnLabel}>
          {added ? (
            <span className={styles.addedState}>
              <svg
                width="15"
                height="15"
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
  );
}
