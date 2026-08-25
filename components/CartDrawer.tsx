"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} (${item.edition}) - Quantity: ${item.quantity} - Total: ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const body = `Hello AEVUM Team,\n\nI visited your web showcase and would like to place an order inquiry for the following selected items:\n\n${itemsText}\n\nCalculated Order Subtotal: ₹${subtotal.toLocaleString(
      "en-IN"
    )}\n\nPlease contact me regarding order processing and availability.\n\nThank you!`;

    const mailtoUrl = `mailto:aevumofficial26@gmail.com?subject=AEVUM%20Order%20Inquiry&body=${encodeURIComponent(
      body
    )}`;

    setCheckoutSuccess(true);
    window.location.href = mailtoUrl;

    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  if (!isCartOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header matching exact reference */}
        <div className={styles.header}>
          <div className={styles.titleText}>Your Cart ({cartCount})</div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrapper}>
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999999"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div className={styles.emptyText}>Your cart is empty.</div>
              <button
                type="button"
                className={styles.continueBtn}
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className={styles.itemList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div
                    className={styles.itemImageBg}
                    style={{ backgroundColor: item.color }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={74}
                      height={64}
                      className={styles.itemImg}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemEdition}>{item.edition}</div>
                    <div className={styles.itemPrice}>₹{item.price.toLocaleString("en-IN")}</div>

                    <div className={styles.quantityRow}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className={styles.qtyText}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Minimal Footer */}
        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <span className={styles.subtotalVal}>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className={styles.shippingNotice}>
              Taxes and shipping calculated at checkout
            </div>

            <button
              type="button"
              className={`${styles.checkoutBtn} ${
                checkoutSuccess ? styles.successBtn : ""
              }`}
              onClick={handleCheckout}
            >
              {checkoutSuccess ? (
                <span>Order Placed Successfully! ✓</span>
              ) : (
                <span>Continue to Checkout</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
